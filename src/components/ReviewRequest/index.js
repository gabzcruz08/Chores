import React, { Component } from 'react'
import styles from './styles'
import { View, Text, Image, ScrollView, TouchableOpacity, AsyncStorage } from 'react-native'
import { BackHandler } from "react-native";
import { CustomReviewRequestFooterTab } from '../../partial/customReviewRequestFooter';
import RF from "react-native-responsive-fontsize";
import { Row, Grid, Col } from "react-native-easy-grid";
import moment from 'moment'

import { GetFavouriteBannerOnService } from '../Provider/action';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { CreateBooking, setLogoutState } from './action'
import Toast, { DURATION } from 'react-native-easy-toast-fixed';
import Modals from 'react-native-modalbox'
import { Ionicons } from '@expo/vector-icons';
import { Spinner } from 'native-base';
import i18n from 'react-native-i18n';
import { LogoutConfirmation } from '../../partial/LogoutConfirmation';
import axios from 'axios';
window.DOMParser = require('xmldom').DOMParser;

const mapStateToProps = (state) => ({
    languageCode: state.reviewRequest.languageCode,
    isLoginPressed: state.dashBoard.isLoginPressed,
})
const mapDispatchToProps = (dispatch) => bindActionCreators({
    GetFavouriteBannerOnService,
    setLogoutState,
}, dispatch)
class ReviewRequest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fontLoaded: true,
            from: null,
            bookingObj: null,
            serviceData: {},
            companyData: {},
            cetegoryDetails: null,
            companyDetails: null,
            finalHeight: null,
            confirmModal: false,
            modalTitleMessage: '',
            IsLoginExpired: false,
            conversionCharge: 0.0,
            userObj: {},
            spinnerVisible: false,
            price: '',
        }
        this.setCompanyData = this.setCompanyData.bind(this);
        this.onBackPress = this.onBackPress.bind(this);
        this.openConfirmModal = this.openConfirmModal.bind(this);
        this.closeConfirmModal = this.closeConfirmModal.bind(this);
        this.renderAlertModel = this.renderAlertModel.bind(this);
        this.setStateLogintrue = this.setStateLogintrue.bind(this);
        this.getBookingData = this.getBookingData.bind(this);
        this.executePayment = this.executePayment.bind(this);
        this.displayToast = this.displayToast.bind(this);
    }
    componentWillMount() {
        if (typeof this.props.navigation.state.params && this.props.navigation.state.params.from) {
            this.setPageData(this.props.navigation.state.params.from);
        }
        console.log("Current url is", this.props.navigation.state.params);
        if ((typeof this.props.navigation.state.params && this.props.navigation.state.params.successUrl) && (typeof this.props.navigation.state.params && this.props.navigation.state.params.flag)) {
            this.successUrl = this.props.navigation.state.params.successUrl.split('?')[1];
            this.flag = this.props.navigation.state.params.flag;
            this.accessToken = this.props.navigation.state.params.accessToken;
            //console.log('Payment ID =>' + this.paymentId + '------>' + 'Payer ID =>' + this.payerId);
            if (this.flag === "success") {
                this.getBookingData();
                this.setState({ auth: this.telerKey, store: this.telerStore }, () => {
                    this.code = this.props.navigation.state.params.code;
                    this.executePayment();
                });
            }

        }
        AsyncStorage.setItem("screenName", "reviewRequest");
        this.getBookingData();
    }
    displayToast() {
        this.refs.toast.show('Your payment was not successful. Please try again.', DURATION.LENGTH_LONG);
    }
    executePayment() {
        this.setState({ spinnerVisible: true });
        console.log('Execute payment');
        AsyncStorage.multiGet(["telr_store_id", "telr_mobile_api_auth_key"], (err, success) => {
            this.storeId = success[0][1] ? success[0][1] : null;
            this.authKey = success[1][1] ? success[1][1] : null;
            const url = `https://secure.innovatepayments.com/gateway/mobile_complete.xml`;
            let param = `
            <?xml version="1.0" encoding="UTF-8"?>
            <mobile>
            <store>${this.storeId}</store>
            <key>${this.authKey}</key>
            <complete>${this.code}</complete>
            </mobile>`;
            const request = axios.post(url, param, { headers: { "Content-Type": "text/xml" } }
            ).then(data => {
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(data.data);
                var status = xmlDoc.getElementsByTagName('status')[0].childNodes[0].nodeValue;
                console.log('Status', JSON.stringify(data.data));
                if (status != 'A') {
                    this.setState({ spinnerVisible: false });
                    this.refs.toast.show('Payment was not successful, please try again.', DURATION.LENGTH_LONG);
                    return;
                }
                else {
                    this.state.bookingObj.user_id = this.state.userObj.id;
                    this.state.bookingObj.transaction_id = xmlDoc.getElementsByTagName('tranref')[0].childNodes[0].nodeValue;
                    this.state.bookingObj.payment_status = 'Completed';
                    this.state.bookingObj.payment_method = 'telr';
                    this.state.bookingObj.price = parseInt(this.state.price);
                    CreateBooking(this.state.bookingObj, this.state.userObj.remember_token, i18n.locale,
                        (data) => {
                            this.setState({ spinnerVisible: false });
                            AsyncStorage.removeItem('companyInfo');
                            this.props.navigation.state.params.flag = "";
                            this.props.navigation.setParams({ flag: "" });
                            this.props.navigation.navigate('thankYou');
                        },
                        (error) => {
                            this.setState({ spinnerVisible: false });
                            console.error(error);
                            this.refs.toast.show(error.error_data, DURATION.LENGTH_LONG);
                        });

                }

            })
                .catch(error => {
                    console.log("telrPayment", error);
                });
        });
    }

    onBackPress() {
        this.props.navigation.navigate(this.state.from, { from: 'reviewRequest' });
        return true;
    }
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
        if (this.flag !== undefined && this.flag == "fail") {
            this.displayToast();
        }
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    }
    getBookingData() {
        AsyncStorage.multiGet(["bookingObj", "selectedService", "cetegoryDetails", "conversationCharge", "loggedInUserObj", "selectedCompany", "price", "companyInfo"], (err, result) => {
            if (err) {
                console.log("Error occur while gettingn data", err);

            }
            else {
                var bookgObj = result[0][1] ? JSON.parse(result[0][1]) : null;
                var serviceData = result[1][1] ? JSON.parse(result[1][1]) : null;
                var companyData = result[5][1] ? JSON.parse(result[5][1]) : null;
                var cetegoryDetails = result[2][1] ? JSON.parse(result[2][1]) : null;
                var conversationCharge = result[3][1] ? result[3][1] : 0;
                var loogedInUserData = result[4][1] ? JSON.parse(result[4][1]) : null;
                var price = result[6][1] ? result[6][1] : '';
                var companyInfo = result[7][1] ? JSON.parse(result[7][1]) : null;
                this.setState({ bookingObj: bookgObj, serviceData: serviceData.SelectedService, cetegoryDetails: cetegoryDetails, conversionCharge: conversationCharge, userObj: loogedInUserData, price: price }, () => {
                    if (companyData != null) {
                        this.setState({ companyDetails: companyData.SelectedCompany.text });
                    }
                    else if (companyInfo != null) {
                        console.log(companyInfo.SelectedCompany);
                        this.setState({ companyDetails: companyInfo.SelectedCompany });
                    }
                    else {

                    }
                    this.setCompanyData();
                });
            }
        });
    }
    setCompanyData() {
        try {
            AsyncStorage.multiGet(["selectedService", "loggedInUserObj", "selectedCompany", "companyInfo"]).then((data) => {
                var serviceData = data[0][1] ? JSON.parse(data[0][1]) : "";
                var userData = data[1][1] ? JSON.parse(data[1][1]) : "";
                var companyData = data[2][1] ? JSON.parse(data[2][1]) : "";
                var companyInfo = data[3][1] ? JSON.parse(data[3][1]) : "";
                if (companyData != "") {
                    this.setCompanyDetails(companyData.SelectedCompany.text);
                    // this.setState({ companyDetails: companyData.SelectedCompany.text });
                }
                else if (companyInfo != "") {
                    this.setCompanyDetails(companyInfo.SelectedCompany);
                }
                else if (serviceData != "" && userData != "") {
                    this.props.GetFavouriteBannerOnService(userData.id, serviceData.SelectedService.id, userData.remember_token, (scs) => {
                        if (scs && scs.length > 0 && scs[0].company) {
                            AsyncStorage.setItem("favCompanyId", JSON.stringify(scs[0].company.id));
                            this.setState({ companyDetails: scs[0].company.name });
                        }
                    }, (err) => {
                        if (err) {
                            console.log(err);
                            this.refs.toast.show(i18n.t('somethingWrong'), DURATION.LENGTH_SHORT);
                        }
                    });
                }
            });
        } catch (error) {
            console.log(error);
            this.refs.toast.show(i18n.t('somethingWrong'), DURATION.LENGTH_SHORT);
        }
    }
    setPageData(from) {
        this.setState({ from: from });
    }
    setCompanyDetails(company) {
        this.setState({ companyDetails: company }, () => {
            console.log('updated');
        });
    }
    renderPopup() {
        this.props.navigation.navigate('DrawerClose');
        this.refs.logoutConfirmation.openModal();
        this.props.setLogoutState(false, (data) => { });
    }
    render() {
        return (
            <View style={styles.container}>
                <LogoutConfirmation isOpen="false" ref="logoutConfirmation" {...this.props} />
                {this.props.isLoginPressed == true ? this.renderPopup() : null}

                <View style={styles.ImageParentView}>
                    <View style={styles.ImageUpperView}></View>
                    <View style={styles.ImageView}>
                        <Grid style={styles.hundredHeightWidth}>
                            <Col size={15} style={[styles.AllCenter]}>
                                <TouchableOpacity onPress={() => {
                                    // if (this.state.from) {
                                    this.onBackPress();
                                    //this.props.navigation.goBack();
                                    // }
                                    // else {
                                    //     this.props.navigation.navigate('dashBoard');
                                    // }
                                }} hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                                    <Image source={require('../../../assets/images/back_arrow.png')} style={styles.headerBackArrow} />
                                </TouchableOpacity>
                            </Col>
                            <Col size={65} style={styles.CenterStart}>
                                <Text style={styles.headerText}>{i18n.t("reviewRequest")}</Text>
                            </Col>
                            <Col size={30} style={[styles.CenterStart]}>
                                <View style={styles.priceView}>
                                    <Text style={{ color: 'orange', fontSize: RF(2.2), fontFamily: 'Quicksand-Bold' }}>{this.state.price != '' ? this.state.price : '0'} AED</Text>
                                </View>
                            </Col>
                        </Grid>
                    </View>
                </View>


                <View style={{ marginTop: '5%' }}></View>
                <ScrollView style={{ width: '100%' }}>
                    <View style={styles.content}>
                        {this.state.companyDetails ?
                            <View style={styles.viewSection}>
                                {this.state.companyDetails ? <Text style={styles.titleText}>Selected Compnay:</Text> : null}
                                {this.state.companyDetails ? <Text style={styles.titleDescription}>{this.state.companyDetails}</Text> : null}
                            </View>
                            : null}
                        <View style={styles.viewSection}>
                            <Text style={styles.titleText}>Category:</Text>
                            <Text style={styles.titleDescription}>{this.state.cetegoryDetails ? this.state.cetegoryDetails.name : ""}</Text>
                        </View>
                        <View style={styles.viewSection}>
                            <Text style={styles.titleText}>Service: </Text>
                            <Text style={styles.titleDescription}>{this.state.serviceData ? this.state.serviceData.name : ""}</Text>
                        </View>
                        <View style={styles.viewSection}>
                            <Text style={styles.titleText}>Location:</Text>
                            <Text style={styles.titleDescription}>{this.state.bookingObj ? this.state.bookingObj.address : ""}</Text>
                        </View>
                        <View style={styles.viewSection}>
                            <Text style={styles.titleText}>Date & Time:</Text>
                            <Text style={styles.titleDescription}>{this.state.bookingObj ? moment(this.state.bookingObj.booking_date).format("LLLL") : ""}</Text>
                        </View>
                        {this.state.bookingObj && this.state.bookingObj.image ?
                            <View style={styles.viewSection}>
                                <Grid style={[{ height: RF(20), width: RF(20) }]}>
                                    <Row size={2}>
                                        <Text style={styles.titleText}>Image:</Text>
                                    </Row>
                                    <Row size={8} style={styles.mainStyle.start}>
                                        <Image source={{ uri: `${this.state.bookingObj.image}` }} style={[styles.backGroundColor.colorBlue, { height: '80%', width: this.state.finalHeight ? this.state.finalHeight : '80%' }]} resizeMode='contain' onLayout={(event) => {
                                            var { x, y, width, height } = event.nativeEvent.layout;
                                            if (!this.state.finalHeight) {
                                                this.setState({ finalHeight: height })
                                            }
                                        }} />
                                    </Row>
                                </Grid>
                            </View>
                            : null}
                        <View style={styles.viewSection}>
                            <Text style={styles.titleText}>Description:</Text>
                            <Text style={styles.titleDescription}>{this.state.bookingObj ? this.state.bookingObj.instruction : ""}</Text>
                        </View>
                        <View style={styles.viewSection}>
                            <Text style={styles.titleText}>Service Cost: {this.state.price} AED</Text>
                            <Text style={styles.titleDescription}>A minimum amount will be charged as a service fee. Any additional works to be performed will therefore cost extra charges.</Text>
                        </View>
                        {/* <View style={styles.viewSection}>
                            <Text style={styles.titleText}>Note:</Text>
                            <Text style={styles.titleDescription}>{'You have to pay ' + (this.state.price) + '/' + this.state.conversionCharge + ' = $' + parseInt(parseInt(this.state.price) / this.state.conversionCharge) + ' if you are paying with PayPal'}</Text>
                        </View> */}
                    </View>
                </ScrollView>

                <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', paddingTop: 10, paddingBottom: 10 }}>

                    <Text style={{ color: 'rgb(152,152,152)' }}>choose payment method</Text>
                    <Image source={require('../../../assets/images/down-arrow.png')} style={{ height: 20, width: 20, marginTop: 10 }} />
                </View>
                {
                    this.state.spinnerVisible ?
                        <View style={styles.loading}>
                            <Spinner color='#fff' />
                        </View>
                        : null
                }
                <Toast
                    ref="toast"
                    style={{ backgroundColor: '#000' }}
                    position='bottom'
                    positionValue={130}
                    fadeInDuration={750}
                    fadeOutDuration={1000}
                    opacity={0.8}
                    textStyle={{ color: '#fff' }}
                />
                <CustomReviewRequestFooterTab
                    openConfirmModal={this.openConfirmModal}
                    closeConfirmModal={this.closeConfirmModal}
                    renderAlertModel={this.renderAlertModel}
                    setStateLogintrue={this.setStateLogintrue}
                    styles={this.styles}
                    ref="requestView" {...this.props} />
                {this.renderAlertModel()}
            </View>
        )
    }
    renderAlertModel() {
        return (
            <Modals style={[styles.modal, styles.modal3]}
                backdrop={true}
                position={"top"}
                ref={"modal6"}
                visible={this.state.confirmModal}>

                <View style={styles.camModal}>
                    <View style={styles.camModalHeader}>
                        <View style={styles.camModalTitle}>
                            <Text style={styles.camModalTitleText}>{i18n.t("Alert!")}</Text>
                        </View>
                        <View style={styles.camModalCloseButton}>
                            <TouchableOpacity onPress={() => this.closeConfirmModal()}>
                                <Ionicons name="ios-close-circle" size={32} color="#ffaa1a" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.modalBody}>
                        <Text style={styles.modalBodyText}>{this.state.modalTitleMessage}</Text>
                    </View>
                    <View style={styles.camModalContent}>
                        <TouchableOpacity onPress={() => {
                            if (this.state.IsLoginExpired) {
                                //this.logout();
                                this.props.navigation.navigate('start', { from: 'reviewRequest' });
                            }
                            //console.log('clicked.')
                            this.closeConfirmModal();

                        }} style={styles.camOpenCamera}>
                            <Text style={styles.camOpenCameraText}>{this.state.modalTitleMessage != i18n.t("confirmAcceptBooking") ? i18n.t("Ok") : i18n.t("Yes")}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modals>
        );
    }
    //#region Alert model managenment
    openConfirmModal = async (text) => {
        this.setState({ confirmModal: true });
        this.modalText = (text === "" || text === null || text == undefined) ? i18n.t("loginExpired") : text;
        this.setState({ modalTitleMessage: this.modalText }, () => {
            this.refs.modal6.open();
        });
    }
    closeConfirmModal = async () => {
        this.setState({ confirmModal: false });
        this.refs.modal6.close();
    }
    setStateLogintrue() {
        this.setState({ IsLoginExpired: true }, () => {
            this.openConfirmModal(i18n.t("loginToBook"));
        })
    }
    //#endregion

}
export default connect(mapStateToProps, mapDispatchToProps)(ReviewRequest)