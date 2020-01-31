import React, { Component } from 'react';
import { Platform, Text, View, Image, TouchableHighlight, ImageBackground, TouchableOpacity, ScrollView, TextInput, Alert, AsyncStorage, Modal as ModelReact } from 'react-native'
import styles from './styles'
import Modals from 'react-native-modalbox'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Col, Row, Grid } from "react-native-easy-grid";
import Swiper from 'react-native-swiper';
import { Button, Item, Input, Label, Container, Content } from 'native-base';
import moment from 'moment'
import { BackHandler } from "react-native";
import RF from 'react-native-responsive-fontsize';
import * as Location from 'expo-location';
import { MapView } from 'expo';
import * as Permissions from 'expo-permissions';

import { GetFavouriteBannerOnService, getDefaultAddresses, insertAddress, updateAddress, setLogoutState, getAddressFromGeoCode } from './action';
import { Ionicons } from '@expo/vector-icons';
import i18n from 'react-native-i18n';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { LogoutConfirmation } from '../../partial/LogoutConfirmation';

const mapStateToProps = (state) => ({
    languageCode: state.provider.languageCode,
    isLoginPressed: state.dashBoard.isLoginPressed,
})
const mapDispatchToProps = (dispatch) => bindActionCreators({
    setLogoutState
}, dispatch);

class Provider extends Component {
    constructor(props) {
        var loggedInResponse;
        super(props);
        this.state = {
            scrollHeight: 0,
            smallScrollHeight: 0,
            from: null,
            hourArray: [],
            dateArray: [],
            open: false,
            expLatitude: null,
            expLongitude: null,
            isModalVisible: false,
            isAddressConfirmModalVisible: false,
            AddressErr: false,
            AddressData: '',
            AddressErrMessage: '',
            addressTypeArr: Platform.OS === 'ios' ? [
                "Work", "Other", "Home"
            ] : ["Home", "Work", "Other"],
            AddressTypeSelectedIndex: 0,
            selectedDate: null,
            selectedTime: null,
            locationAccess: false,
            locationData: null,
            IsMapViewmodalDisplay: false,
            selectedService: null,
            companyDetails: null,
            categoryDetails: null,
            scrollTo: 0,
            isFinalAddress: false,
            setAddress: null,
            confirmModal: false,
            modalTitleMessage: '',
            IsLoginExpired: false,
            lastUpdatedAddressData: '',
            selectedLocationAddress: '',
            tempLatitude: null,
            tempLongitude: null,
            defaultAddresses: [],
            price: '',
        }
        this.rednerHours = this.rednerHours.bind(this);
        this.onMapPress = this.onMapPress.bind(this);
        this.setServiceAndUser = this.setServiceAndUser.bind(this);
        this.setTImeArray = this.setTImeArray.bind(this);
        this.pageLoadCall = this.pageLoadCall.bind(this);
        this.checkUncheck = this.checkUncheck.bind(this);
        this.setAddress = this.setAddress.bind(this);
        this.setLocationType = this.setLocationType.bind(this);
        this.scrollTo = this.scrollTo.bind(this);
        this.onBackPress = this.onBackPress.bind(this);
        this.closeAddressConfirmationModal = this.closeAddressConfirmationModal.bind(this);
        this.setConfirmAddress = this.setConfirmAddress.bind(this);
        this.openConfirmModal = this.openConfirmModal.bind(this);
        this.closeConfirmModal = this.closeConfirmModal.bind(this);
        this.logout = this.logout.bind(this);
        this.unAuthorized = this.unAuthorized.bind(this);
        this.renderAlertModel = this.renderAlertModel.bind(this);
        this.removeLocationFromSelection = this.removeLocationFromSelection.bind(this);

        this.getDefaultAddressData = this.getDefaultAddressData.bind(this);
        this.showAddressTypeDefaultAddress = this.showAddressTypeDefaultAddress.bind(this);
    }
    componentWillMount() {
        AsyncStorage.setItem("screenName", "provider");
        this.setServiceAndUser();
        this.getDefaultAddressData(this.props.navigation.state.params && this.props.navigation.state.params.from && this.props.navigation.state.params.from == "reviewRequest" ? false : true);
    }

    changeAddressAsPerSwiper(id) {
        var defaultAddresses = this.state.defaultAddresses;
        var isMatched = false;
        var type = this.state.addressTypeArr[id];
        for (let index = 0; index < defaultAddresses.length; index++) {
            const element = this.state.defaultAddresses[index];
            if (element.location == type.toLowerCase()) {
                this.setState({ selectedLocationAddress: defaultAddresses[index].address, AddressData: defaultAddresses[index].address });
                isMatched = true;
            }
        }
        if (!isMatched) {
            this.setState({ selectedLocationAddress: '', AddressData: '' });
        }
    }


    showAddressTypeDefaultAddress(selectedDafaultAddressIndex) {
        console.log("showAddressTypeDefaultAddress", selectedDafaultAddressIndex);
        if (selectedDafaultAddressIndex === null) {
            selectedDafaultAddressIndex = this.state.scrollTo;
        }
        console.log("showAddressTypeDefaultAddress", selectedDafaultAddressIndex);
        var defaultAddresses = this.state.defaultAddresses;
        for (var addressIndex = 0; addressIndex < defaultAddresses.length; addressIndex++) {
            var defaultSelectedAddressByUser = this.state.selectedLocationAddress;
            if ((selectedDafaultAddressIndex == 0) && (defaultAddresses[addressIndex].location == "work")) {
                this.setState({ selectedLocationAddress: defaultAddresses[addressIndex].address, AddressData: defaultAddresses[addressIndex].address });
            }
            else if ((selectedDafaultAddressIndex == 1) && (defaultAddresses[addressIndex].location == "other")) {
                this.setState({ selectedLocationAddress: defaultAddresses[addressIndex].address, AddressData: defaultAddresses[addressIndex].address });
            }
            else if ((selectedDafaultAddressIndex == 2) && (defaultAddresses[addressIndex].location == "home")) {
                this.setState({ selectedLocationAddress: defaultAddresses[addressIndex].address, AddressData: defaultAddresses[addressIndex].address });
                console.log("home");
            }
        }
    }

    getDefaultAddressData(changeswiper) {
        try {
            AsyncStorage.multiGet(["loggedInUserObj", "cetegoryDetails"]).then((data) => {
                var userData = data[0][1] ? JSON.parse(data[0][1]) : "";
                if (userData !== "") {
                    getDefaultAddresses(userData.id, userData.remember_token,
                        (scs) => {
                            console.log("Get favourite success", scs);
                            if (scs.length > 0) {
                                console.log('default add', scs)
                                this.setState({
                                    defaultAddresses: scs
                                }, () => {
                                    //this.afterSetStateFinished();
                                    if (changeswiper) {
                                        this.changeAddressAsPerSwiper(Platform.OS === 'ios' ? 2 : 0);
                                    }
                                });
                            }
                        }, (err) => {
                            if (err.status === "error") {
                                console.log(err.error_data);
                            }
                        });
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    componentDidMount() {
        console.log('did mount called ' + this.state.AddressTypeSelectedIndex);
        //this.showAddressTypeDefaultAddress(this.state.AddressTypeSelectedIndex);
        if (this.props.navigation.state.params && this.props.navigation.state.params.from) {
            //console.log("Current page data is", this.props.navigation.state.params.from);
            if (this.props.navigation.state.params.from == "reviewRequest") {

                AsyncStorage.multiGet(["bookingObj", "dateObj", "loggedInUserObj"], (err, result) => {

                    if (err) {
                        console.log(err);
                    }
                    else {
                        if (result[0][1] && result[1][1]) {
                            var bookingObj = JSON.parse(result[0][1]);
                            var userData = result[2][1] ? JSON.parse(result[2][1]) : "logout";
                            var dateObj = JSON.parse(result[1][1]);
                            var time = moment(bookingObj.booking_date, "YYYY-MM-DD mm:ss").format("mm:ss");
                            this.setTImeArray(true, time);
                            this.checkDates(true, dateObj);
                            console.log("Address is ", bookingObj.address);
                            this.setAddress(bookingObj.address, bookingObj.longitude, bookingObj.latitude, bookingObj.longitude, userData);
                            this.setLocationType(bookingObj.location);
                        }
                    }
                })
            }
            else {
                this.pageLoadCall();
            }
        }
        else {
            this.pageLoadCall();
        }
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    }

    removeLocationFromSelection() {
        this.confirmAddress = "";
        //this.setState({ IsMapViewmodalDisplay: false });
    }

    onBackPress() {
        this.props.navigation.navigate('categoriesDetailsNew', { from: "provider" });
        return true;
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    }
    pageLoadCall() {
        this.checkDates(false, null);
        this.setTImeArray(false, null);
    }
    setAddress(address, islocation, latitude, longitude, userData) {
        if (islocation && islocation != "") {
            var locationData = {
                coords: {
                    latitude: latitude,
                    longitude: longitude
                }
            }
            //console.log("Location data ", address, locationData);
            this.setState({ selectedLocationAddress: address, AddressData: address, locationAccess: true, locationData: locationData });

        }
        else { this.setState({ selectedLocationAddress: address, AddressData: address }); }
        if (userData === "logout") {
            this.setState({});
        }

    }
    checForInsertUpdateAddress() {
        console.log("checForInsertUpdateAddress");

        if (this.state.AddressData !== "") {
            if (this.state.defaultAddresses != null && this.state.defaultAddresses.length > 0) {
                var type = this.state.addressTypeArr[this.state.AddressTypeSelectedIndex];
                var currentAddress = this.state.AddressData;
                var isMatch = false;
                for (let index = 0; index < this.state.defaultAddresses.length; index++) {
                    const element = this.state.defaultAddresses[index];
                    if (element.location == type.toLowerCase() && element.address != currentAddress) {
                        this.updateLocationWithtype(element.id);
                        isMatch = true;
                    }
                }
                if (!isMatch) {
                    this.insertLocationWithtype();
                }
            }
            else {
                this.insertLocationWithtype();
            }
        }
    }
    insertLocationWithtype() {
        try {
            console.log("insertLocationWithtype");
            AsyncStorage.multiGet(["loggedInUserObj", "cetegoryDetails"]).then((data) => {
                var userData = data[0][1] ? JSON.parse(data[0][1]) : "";
                if (userData !== "") {
                    console.log("in async insert data user logged in", userData);
                    insertAddress(userData.id, userData.remember_token, this.state.AddressData, this.state.addressTypeArr[this.state.AddressTypeSelectedIndex],
                        (scs) => {
                            console.log("insertLocationWithtype success", scs);
                            // if (scs.status > 0) {
                            //     //this.setState({ defaultAddresses: scs })
                            //     // this.setState({
                            //     //     defaultAddresses: scs
                            //     // }, () => {
                            //     //     //this.afterSetStateFinished();
                            //     //     this.showAddressTypeDefaultAddress(this.state.AddressTypeSelectedIndex);
                            //     // });
                            // }
                            this.getDefaultAddressData(false);
                        }, (err) => {
                            if (err.status === "error") {
                                console.log('insertLocationWithtype', err.error_data);
                            }
                        });
                }
            });
        } catch (error) {
            console.log(error);
        }
    }
    updateLocationWithtype(id) {
        try {
            console.log("updateLocationWithtype");
            AsyncStorage.multiGet(["loggedInUserObj", "cetegoryDetails"]).then((data) => {
                var userData = data[0][1] ? JSON.parse(data[0][1]) : "";
                if (userData !== "") {
                    console.log("in async update data", userData);
                    updateAddress(userData.id, userData.remember_token, this.state.AddressData, this.state.addressTypeArr[this.state.AddressTypeSelectedIndex], id,
                        (scs) => {
                            console.log("updateLocationWithtype success", scs);
                            this.getDefaultAddressData(false);
                            // if (scs.length > 0) {
                            //     //this.setState({ defaultAddresses: scs })
                            //     // this.setState({
                            //     //     defaultAddresses: scs
                            //     // }, () => {
                            //     //     //this.afterSetStateFinished();
                            //     //     this.showAddressTypeDefaultAddress(this.state.AddressTypeSelectedIndex);
                            //     // });
                            // }
                        }, (err) => {
                            if (err.status === "error") {
                                console.log('updateLocationWithtype', err.error_data);
                            }
                        });
                }
            });
        } catch (error) {
            console.log(error);
        }
    }
    setLocationType(name) {
        var selectedIndex = 0;
        for (let index = 0; index < this.state.addressTypeArr.length; index++) {
            if (name.toLowerCase() == this.state.addressTypeArr[index].toLowerCase()) {
                //console.log("Scrol to index ", index);
                this.setState({ scrollTo: index }, () => {
                    this.scrollTo();
                });
            }
        }
    }
    scrollTo() {
        if (this.state.scrollTo !== 0) {
            //console.log("Scroll by called", this.state.scrollTo);
            this.refs.swiper.scrollBy(this.state.scrollTo, true);
        }
        this.showAddressTypeDefaultAddress(null);
    }
    //#region Page load
    setServiceAndUser() {

        try {
            AsyncStorage.multiGet(["selectedService", "loggedInUserObj", "cetegoryDetails", "selectedCompany", "price", "companyInfo"]).then((data) => {

                var serviceData = data[0][1] ? JSON.parse(data[0][1]) : "";
                var userData = data[1][1] ? JSON.parse(data[1][1]) : "";
                var categoryDetails = data[2][1] ? JSON.parse(data[2][1]) : "";
                var companyData = data[3][1] ? JSON.parse(data[3][1]) : "";
                var price = data[4][1] ? data[4][1] : '';
                var companyInfo = data[5][1] ? JSON.parse(data[5][1]) : "";
                console.log("Async data1 ", companyData);

                if (serviceData != "" && categoryDetails != "") {
                    console.log("Service", serviceData.SelectedService);
                    this.setState({ selectedService: serviceData.SelectedService, categoryDetails: categoryDetails, price: price });
                }
                if (companyData != "") {
                    console.log("Async data ", companyData);
                    this.setState({ companyDetails: companyData.SelectedCompany.text });
                }
                else if (companyInfo != "") {
                    this.setState({ companyDetails: companyInfo.SelectedCompany });
                }
                else if (serviceData != "" && userData != "") {
                    GetFavouriteBannerOnService(userData.id, serviceData.SelectedService.id, userData.remember_token, (scs) => {
                        if (scs && scs.length > 0 && scs[0].company) {
                            AsyncStorage.setItem("favCompanyId", JSON.stringify(scs[0].company.id));
                            this.setState({ companyDetails: scs[0].company.name });
                        }
                    }, (err) => {
                        if (err.status === "error") {
                            console.log(err.error_data);
                        }
                    });
                }

            });
        } catch (error) {
            console.log(error);
        }
    }
    renderPopup() {
        this.props.navigation.navigate('DrawerClose');
        this.refs.logoutConfirmation.openModal();
        this.props.setLogoutState(false, (data) => {

        });
    }
    //#region 
    render() {

        return (
            <View style={styles.container}>

                <LogoutConfirmation isOpen="false" ref="logoutConfirmation" {...this.props} />
                {this.props.isLoginPressed == true ? this.renderPopup() : null}

                <View style={styles.header.ImageParentView}>
                    <View style={styles.header.ImageUpperView}></View>
                    <View style={styles.header.ImageView}>
                        <Grid style={styles.hundredHeightWidth}>
                            <Col size={15} style={[styles.AllCenter]}>
                                <TouchableOpacity onPress={() => {
                                    this.onBackPress();
                                }} hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                                    <Image source={require('../../../assets/images/back_arrow.png')} style={styles.headerBackArrow} />
                                </TouchableOpacity>
                            </Col>
                            <Col size={65} style={styles.CenterStart}>
                                <Text style={styles.headerText}>{i18n.t("choosePlaceTime")}</Text>
                            </Col>
                            <Col size={30} style={[styles.CenterStart]}>
                                <View style={styles.priceView}>
                                    <Text style={{ color: 'orange', fontSize: RF(2.2), fontFamily: 'Quicksand-Medium' }}>{(this.state.selectedService) ? (this.state.price != undefined ? this.state.price : this.state.selectedService.price) : '0'} AED</Text>
                                </View>
                            </Col>
                        </Grid>
                    </View>
                </View>
                <Grid>
                    <Row size={6}>
                        <Grid>
                            <Row size={.5}>
                            </Row>
                            <Row size={.7} style={[styles.mainStyle.hundredHeightWidth, styles.mainStyle.center]}>
                                <Text style={[
                                    styles.fontStyle.Medium,
                                    styles.fontStyle.smallFont,
                                    styles.fontStyle.lowSpacing
                                ]}>
                                    {i18n.t("locationSelect")}
                                </Text>
                            </Row>
                            <Row size={.3}>
                            </Row>
                            <Row size={9}>
                                <Grid>
                                    <Col size={1}>
                                    </Col>
                                    <Col size={8}>
                                        <View style={[styles.mainStyle.hundredHeightWidth, styles.mainStyle.center]}>
                                            <ImageBackground style={[styles.imageStyle.swiperLeftImage, styles.mainStyle.start]} source={require('../../../assets/images/slide_rt_w-o-arrow_left.png')}>
                                                <TouchableOpacity style={[styles.mainStyle.center, styles.swiperStyle.TouchableOpecity]}
                                                    onPress={() => {
                                                        this.refs.swiper.scrollBy(-1);
                                                    }}
                                                >
                                                    <Image style={[styles.imageStyle.sliderButtonBasic, styles.swiperStyle.previousButton]} source={require('../../../assets/images/arrow-left.png')}></Image>
                                                </TouchableOpacity>
                                            </ImageBackground>
                                            <ImageBackground style={[styles.imageStyle.mainImage, styles.mainStyle.center]} source={require('../../../assets/images/slide_name.png')}>
                                                <Swiper ref={'swiper'}
                                                    dot={<View style={styles.swiperStyle.dot}></View>}
                                                    activeDot={<View style={styles.swiperStyle.dot}></View>}
                                                    onMomentumScrollEnd={(e, state, context) => {
                                                        //this.showAddressTypeDefaultAddress(context.state.index);
                                                        //this.setState({ AddressTypeSelectedIndex: context.state.index })
                                                        this.setState({
                                                            AddressTypeSelectedIndex: context.state.index
                                                        }, () => {
                                                            this.changeAddressAsPerSwiper(context.state.index);
                                                        });
                                                    }}
                                                    onScrollBeginDrag={(e, state, context) => {
                                                        //this.showAddressTypeDefaultAddress(context.state.index);
                                                        this.setState({
                                                            AddressTypeSelectedIndex: context.state.index
                                                        }, () => {
                                                            this.changeAddressAsPerSwiper(context.state.index);
                                                        });
                                                    }}
                                                //scrollEnabled={false}
                                                //     {
                                                //     //this.showAddressTypeDefaultAddress(context.state.index);
                                                //     this.setState({ AddressTypeSelectedIndex: context.state.index })
                                                //     this.changeAddressAsPerSwiper(context.state.index);
                                                // }}
                                                //scrollEnabled={false}
                                                //autoplay={false}
                                                // onTouchStartCapture={(e, state, context) => {
                                                //     this.showAddressTypeDefaultAddress(context.state.index);
                                                // }}
                                                //autoplay={false}
                                                >
                                                    {this.renderSwipweData()}
                                                    {/* <View style={[styles.mainStyle.hundredHeightWidth, styles.mainStyle.center]}>
                                                        <Text style={[styles.fontStyle.Medium, styles.fontStyle.SliderMainFont]}>Home</Text>
                                                    </View>
                                                    <View style={[styles.mainStyle.hundredHeightWidth, styles.mainStyle.center]}>
                                                        <Text style={[styles.fontStyle.Medium, styles.fontStyle.SliderMainFont]}>Work</Text>
                                                    </View> */}
                                                </Swiper>

                                            </ImageBackground>
                                            <ImageBackground style={[styles.imageStyle.swiperRightImage, styles.mainStyle.end]} source={require('../../../assets/images/slide_rt_w-o-arrow_right.png')}>
                                                <TouchableOpacity style={[styles.mainStyle.center, styles.swiperStyle.TouchableOpecity]}
                                                    onPress={() => {
                                                        this.refs.swiper.scrollBy(1);
                                                    }}
                                                >
                                                    <Image style={[styles.imageStyle.sliderButtonBasic, styles.swiperStyle.nextButton]} source={require('../../../assets/images/arrow-right.png')}></Image>
                                                </TouchableOpacity>
                                            </ImageBackground>
                                        </View>
                                    </Col>
                                    <Col size={1}>
                                    </Col>
                                </Grid>
                            </Row>
                            <Row size={1.5}>
                                <Grid>
                                    <Col size={0.5}></Col>
                                    <Col>
                                        <Grid>
                                            <Row>
                                                <TouchableOpacity style={[styles.mainStyle.center, styles.mainStyle.hundredHeightWidth]}
                                                    onPress={() => { this.openModal() }}
                                                >
                                                    <Text style={[styles.fontStyle.Medium, styles.fontStyle.smallFont, styles.fontStyle.lowSpacing]}>{i18n.t("location")}</Text>
                                                </TouchableOpacity>
                                            </Row>
                                            <Row size={0.1}>
                                                <Grid>
                                                    <Col size={0.5}></Col>
                                                    <Col >
                                                        <Grid>
                                                            <Row size={1}></Row >
                                                            <Row style={{ borderTopColor: '#ff9a00', borderTopWidth: 1 }}>
                                                            </Row >
                                                            <Row size={1}></Row >
                                                        </Grid>
                                                    </Col>
                                                    <Col size={0.5}></Col>
                                                </Grid>
                                            </Row>
                                        </Grid>
                                    </Col>
                                    <Col size={0.5}></Col>
                                </Grid>
                            </Row>
                            <Row size={3} style={{ alignItems: 'center' }}>
                                {/* For Gmap text show */}
                                <View style={[{ alignSelf: 'center', alignItems: 'center', paddingLeft: 5, paddingEnd: 5, flex: 1 }]}>
                                    <Text style={[styles.fontStyle.Medium, { color: '#ffaa1a', fontSize: RF(2), textAlign: 'center', }]}>{this.state.selectedLocationAddress}</Text>
                                </View>
                            </Row>
                            <Row size={0.25}></Row>
                            <Row size={2.75}>
                                <Grid>
                                    <Col>
                                    </Col>
                                    <Col size={8}>
                                        <ScrollView horizontal style={styles.mainStyle.hundredHeightWidth}
                                            onLayout={(event) => {
                                                var { x, y, width, height } = event.nativeEvent.layout;
                                                this.setState({ scrollHeight: height })
                                            }}>
                                            {this.renderDates()}
                                        </ScrollView>
                                    </Col>
                                    <Col>
                                    </Col>
                                </Grid>
                            </Row>
                        </Grid>
                    </Row>
                    <Row size={4}>
                        <Grid>
                            <Row size={0.5}></Row>
                            <Row size={1.7}>
                                <Grid>
                                    <Col size={2}>
                                    </Col>
                                    <Col size={7}>
                                        <ScrollView horizontal style={styles.mainStyle.hundredHeightWidth}
                                            onLayout={(event) => {
                                                var { x, y, width, height } = event.nativeEvent.layout;
                                                this.setState({ smallScrollHeight: height })
                                            }}>
                                            {this.rednerHours()}
                                        </ScrollView>
                                    </Col>
                                    <Col size={2}>
                                    </Col>
                                </Grid>
                            </Row>
                            <Row size={.4}></Row>
                            <Row size={0.5} style={styles.mainStyle.center}>
                                {/* <Text style={[styles.fontStyle.Medium, styles.fontStyle.lowSpacing, styles.fontStyle.smallFont]}>
                                    {this.state.companyDetails ? this.state.companyDetails : null}
                                </Text> */}
                            </Row>
                            <Row size={0.4}></Row>
                            <Row size={2.5}>
                                {/* <Grid>
                                    <Col size={1}></Col>
                                    <Col size={8}>
                                        <ImageBackground source={require('../../../assets/images/header_bg.png')} style={[styles.mainStyle.hundredHeightWidth]}>
                                            <Grid>
                                                <Col>
                                                    <Row></Row>
                                                    <Row>
                                                        <Grid>
                                                            <Col size={1}></Col>
                                                            <Col size={10} style={styles.mainStyle.start}>
                                                                <Text style={[styles.fontStyle.Medium, styles.fontStyle.MediumWhite]}>
                                                                    {this.state.categoryDetails ? this.state.categoryDetails.name : null}
                                                                </Text>
                                                            </Col>
                                                            <Col size={1}></Col>
                                                        </Grid>
                                                    </Row>
                                                    <Row>
                                                        <Grid>
                                                            <Col size={1}></Col>
                                                            <Col size={10} style={styles.mainStyle.start}>
                                                                <Text style={[styles.fontStyle.Medium, styles.fontStyle.MediumPlusWhite]}>
                                                                    {this.state.selectedService ? this.state.selectedService.name : ""}
                                                                </Text>
                                                            </Col>
                                                            <Col size={1}></Col>
                                                        </Grid>
                                                    </Row>
                                                    <Row></Row>
                                                </Col>
                                                <Col>
                                                    <Row></Row>
                                                    <Row>
                                                        <Grid>
                                                            <Col size={4}></Col>
                                                            <Col size={6} style={styles.mainStyle.center}>
                                                                <Text style={[styles.fontStyle.Medium, styles.fontStyle.LargePlusWhite]}>
                                                                    AED {this.state.selectedService ? this.state.selectedService.price : null}
                                                                </Text>
                                                            </Col>
                                                            <Col size={1}></Col>
                                                        </Grid>
                                                    </Row>
                                                    <Row></Row>
                                                </Col>
                                            </Grid>
                                        </ImageBackground>
                                    </Col>
                                    <Col size={1}></Col>
                                </Grid> */}
                            </Row>
                            {/* <Row size={0.5}></Row> */}
                            <Row size={1.5}>
                                <Grid>
                                    <Col size={4}></Col>
                                    <Col size={6}>
                                        <Button rounded transparent style={[styles.mainStyle.hundredHeightWidth, styles.btnCheckOut, styles.mainStyle.center]}
                                            onPress={() => {

                                                if (!this.state.AddressData && !this.state.locationData) {
                                                    // Alert.alert('Please enter your address or select on map.');
                                                    this.openConfirmModal(i18n.t("addressErr"));
                                                }
                                                else if (this.state.AddressData && this.state.AddressData.length > 300) {
                                                    // Alert.alert('Maximum 300 cherecter allowed in address.');
                                                    this.openConfirmModal(i18n.t("addressLengthErr"));
                                                }
                                                else if (this.state.selectedDate === null) {
                                                    // Alert.alert('Please select date.');
                                                    this.openConfirmModal(i18n.t("dateErr"));
                                                }
                                                else if (this.state.selectedTime === null) {
                                                    // Alert.alert('Please select time.');
                                                    this.openConfirmModal(i18n.t("timeErr"));
                                                }
                                                else {
                                                    AsyncStorage.multiGet(['bookingObj']).then((data) => {
                                                        //console.log("Data of async", data);

                                                        var bookingObj = data[0][1] ? JSON.parse(data[0][1]) : "";
                                                        if (bookingObj === "") {
                                                            this.props.navigation.navigate('dashBoard');
                                                        }
                                                        else {
                                                            var selectedDate = moment(this.state.selectedDate).format("YYYY-MM-DD");
                                                            var selectedTime = selectedDate + " " + this.state.selectedTime;
                                                            var locationData = this.state.locationData ? this.state.locationData : null;
                                                            var addressData = this.state.AddressData ? this.state.AddressData : null;
                                                            bookingObj.booking_date = selectedTime;
                                                            if (addressData) {
                                                                bookingObj.address = addressData;
                                                            }
                                                            if (locationData) {
                                                                //console.log("Location exist", locationData);
                                                                bookingObj.latitude = locationData.coords.latitude;
                                                                bookingObj.longitude = locationData.coords.longitude;
                                                            }
                                                            else {
                                                                //console.log("Location did not exist");
                                                            }
                                                            bookingObj.location = this.state.addressTypeArr[this.state.AddressTypeSelectedIndex].toLowerCase();
                                                            bookingObj.payment_method = "cash_on_delivery";
                                                            //console.log("Booking obj", bookingObj);
                                                            AsyncStorage.setItem("bookingObj", JSON.stringify(bookingObj), (error) => {
                                                                //console.log("Async storage result and error ", error);
                                                                if (error) {
                                                                    this.props.navigation.navigate('dashBoard');
                                                                }
                                                                else {
                                                                    //console.log("In review request");
                                                                    this.props.navigation.navigate('reviewRequest', { from: 'provider' });
                                                                }
                                                            })
                                                        }
                                                    });
                                                }
                                            }}>
                                            <Text style={[styles.fontStyle.Medium, styles.fontStyle.MediumPlusWhite]}>
                                                {i18n.t("CheckOut")}
                                            </Text>
                                        </Button>
                                    </Col>
                                    <Col size={4}></Col>
                                </Grid>
                            </Row>
                            <Row size={0.7}></Row>
                        </Grid>
                    </Row>
                </Grid>
                {this.renderModel()}
                {this.renderMap()}
                {this.renderAlertModel()}
            </View>
        )
    }

    //#region hours logic
    rednerHours() {
        if (this.state.hourArray.length <= 0) {
            return null;
        }
        else {
            var rows = [];
            for (let index = 0; index < this.state.hourArray.length; index++) {
                const element = this.state.hourArray[index];
                if (element.IsEnable) {
                    rows.push(
                        <View key={index} style={[styles.mainStyle.center, { width: this.state.smallScrollHeight ? this.state.smallScrollHeight : 0, height: '100%' }]}>
                            <TouchableOpacity
                                style={[styles.scrollStyle.TouchableOpecitySmallSelected, styles.mainStyle.center]}
                                resizeMode='center'
                                onPress={() => {
                                    this.checkUncheck(element, null);
                                }}
                            >
                                <ImageBackground source={require('../../../assets/images/time_circle_yellow.png')}
                                    style={[styles.mainStyle.hundredHeightWidth, styles.mainStyle.center]}
                                    resizeMode='center'
                                >
                                    <Text style={[styles.fontStyle.smallScrollViewInnerFontSelected]}>{element.Time}</Text>
                                </ImageBackground>
                            </TouchableOpacity>
                        </View>
                    );
                }
                else {
                    rows.push(
                        <View key={index} style={[styles.mainStyle.center, { width: this.state.smallScrollHeight ? this.state.smallScrollHeight : 0, height: '100%' }]}>
                            <TouchableOpacity
                                style={[styles.scrollStyle.TouchableOpecitySmall, styles.mainStyle.center]}
                                resizeMode='center'
                                onPress={() => {
                                    this.checkUncheck(element, null);
                                }}>
                                <Text style={[styles.fontStyle.smallScrollViewInnerFont]}>{element.Time}</Text>
                            </TouchableOpacity>
                        </View>
                    );
                }


            }
            return rows;
        }

    }
    setTImeArray(isBack, objTime) {
        var time = [];
        for (let index = 0; index < 24; index = index + .5) {
            time.push({
                'Time': ((parseInt(index) < 10) ? '0' : '') + (parseInt(index)) + ':' + ((index % 1 == 0) ? '00' : '30'),
                'IsEnable': false
            });
        }

        for (let i = 0; i < 16; i++) {
            time.push(time.shift());
        }

        if (isBack) {
            this.checkUncheck({ 'Time': objTime, 'IsEnable': false }, time)
        }
        else {
            this.setState({ hourArray: time });
        }
    }
    checkUncheck(element, timeList) {
        if (timeList) {

            var data = [];
            for (let index = 0; index < timeList.length; index++) {
                let arrelement = timeList[index];
                //console.log("Is back time only", arrelement.Time, element.Time, arrelement.Time === element.Time);
                if (arrelement.Time === element.Time) {
                    arrelement.IsEnable = !element.IsEnable;
                }
                else {
                    arrelement.IsEnable = false;
                }
                data.push(arrelement);
            }
            this.setState({ hourArray: data, selectedTime: element.Time });
        }
        else if (this.state.hourArray.length > 0) {
            var data = [];
            for (let index = 0; index < this.state.hourArray.length; index++) {
                let arrelement = this.state.hourArray[index];
                if (arrelement.Time === element.Time) {
                    arrelement.IsEnable = true;
                }
                else {
                    arrelement.IsEnable = false;
                }
                data.push(arrelement);
            }
            this.setState({ hourArray: data, selectedTime: element.Time });
        }
    }
    //#endregion
    //#region Date Logic
    renderDates() {
        if (!this.state.dateArray) {
            return null;
        }
        else {
            var rows = [];
            for (let index = 0; index < this.state.dateArray.length; index++) {
                const element = this.state.dateArray[index];
                rows.push(
                    <View key={index} style={[styles.mainStyle.centerCol, { width: this.state.scrollHeight, height: '100%' }]}>
                        <Grid>
                            <Row size={0.3}></Row>
                            <Row size={5.4} style={styles.mainStyle.center}>
                                {element.IsSelected ?
                                    <TouchableOpacity style={[styles.scrollStyle.TouchableOpecitySelected, styles.mainStyle.center]}
                                        onPress={() => {
                                            this.checkUncheckDate(element, null);
                                        }}
                                    >
                                        <ImageBackground source={require('../../../assets/images/date_circle_bordered.png')}
                                            style={[styles.mainStyle.hundredHeightWidth, styles.mainStyle.center]}>
                                            <Text style={[styles.fontStyle.Medium, styles.fontStyle.scrollViewInnerBigFontSelected]}>
                                                {element.DayNumber}
                                            </Text>
                                        </ImageBackground>
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity style={[styles.scrollStyle.TouchableOpecity, styles.mainStyle.center]}
                                        onPress={() => {
                                            this.checkUncheckDate(element, null);
                                        }}
                                    >
                                        <Text style={[styles.fontStyle.Medium, styles.fontStyle.scrollViewInnerBigFont]}>
                                            {element.DayNumber}
                                        </Text>
                                    </TouchableOpacity>
                                }
                            </Row>
                            <Row size={0.3}></Row>
                            <Row size={1} style={styles.mainStyle.center}>
                                <Text style={[styles.fontStyle.Medium, styles.fontStyle.scrollViewInnerSmallFont]}>
                                    {element.MonthName}/{element.DayName}
                                </Text>
                            </Row>
                        </Grid>
                    </View>
                );
            }
            return rows;
        }
    }
    enumerateDaysBetweenDates = function (startDate, endDate) {
        var now = startDate, dates = [];

        while (now.isSameOrBefore(endDate)) {
            dates.push(
                {
                    "Date": moment(now),
                    "DayNumber": moment(now).date(),
                    "DayName": moment(now).format('ddd'),
                    "MonthName": moment(now).format('MMM '),
                    "IsSelected": false
                }
            );
            now.add(1, 'days');
        }
        return dates;
    };
    checkDates(isEdit, dateObj) {
        var fromDate = moment();
        var toDate = moment().add(1, 'M');
        var results = this.enumerateDaysBetweenDates(fromDate, toDate);

        if (isEdit) {
            this.checkUncheckDate(dateObj, results);
        }
        else {
            this.setState({ dateArray: results });
        }
    }
    checkUncheckDate(element, dateList) {
        if (dateList) {
            var data = [];
            for (let index = 0; index < dateList.length; index++) {
                var arrelement = dateList[index];
                if (moment(arrelement.Date).format("DD-MM-YYYY") === moment(element.Date).format("DD-MM-YYYY")) {
                    arrelement.IsSelected = !element.IsSelected;
                }
                else {
                    arrelement.IsSelected = false;
                }
                data.push(arrelement);
            }
            this.setState({ dateArray: data, selectedDate: element.Date });
        }
        else if (this.state.dateArray.length > 0) {
            AsyncStorage.setItem("dateObj", JSON.stringify(element));
            var data = [];
            for (let index = 0; index < this.state.dateArray.length; index++) {
                var arrelement = this.state.dateArray[index];
                if (arrelement.Date == element.Date) {
                    arrelement.IsSelected = true;
                }
                else {
                    arrelement.IsSelected = false;
                }
                data.push(arrelement);
            }
            this.setState({ dateArray: data, selectedDate: element.Date });
        }
    }
    openModal() {

        this.setState({ isModalVisible: true });
        this.refs.modal4.open();

    }
    closeModel() {

        this.setState({ isModalVisible: false });
        this.refs.modal4.close();

    }
    closeAddressConfirmationModal() {
        this.setState({ isAddressConfirmModalVisible: false });
        this.refs.modal5.close();
        this.setState({ IsMapViewmodalDisplay: true });
        //this.removeLocationFromSelection();
    }
    closeModelEnableLocation() {
        this.setState({ isLocationDisabled: false });
        this.refs.modelEnableLocation.close();
    }
    modalDidOpen = () => console.log("Modal did open.");
    modalDidClose = () => {
        this.setState({ isModalVisible: false });
    };

    renderModel() {
        return (
            <Modals style={[styles.modal, styles.modal3]}
                backdrop={true}
                position={"top"}
                ref={"modal4"}
                visible={this.state.isModalVisible}>
                <View style={styles.addressModal}>

                    <View style={styles.addressModalHeader}>
                        <View style={styles.addressModalTitle}>
                            <Text style={styles.addressModalTitleText}>{i18n.t("Address")}</Text>
                        </View>
                        <View style={styles.addressModalCloseButton}>
                            <TouchableOpacity onPress={() => this.closeModel()}>
                                <Ionicons name="ios-close-circle" size={32} color="#ffaa1a" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.addressModalContent}>
                        <TextInput style={[styles.ModalStyle.textInput, { borderBottomColor: '#ffaa1a', borderBottomWidth: 1 }]}
                            underlineColorAndroid={'transparent'}
                            onChangeText={(Address1) => {
                                if (Address1) {
                                    this.setState({ AddressData: Address1 })
                                }
                                else {
                                    this.setState({ AddressData: "" })
                                }
                            }}
                            placeholder="Address"
                            placeholderTextColor="#ffaa1a"
                            value={this.state.AddressData}
                        />
                    </View>
                    {this.state.AddressErr ? <Text style={styles.addressErrorText}>{this.state.AddressErrMessage}</Text> : null}

                    <View style={styles.addressText}>
                        <TouchableOpacity onPress={() => {
                            if (!this.state.AddressData) {
                                this.setState({ AddressErr: true, AddressErrMessage: 'Address required' });
                            }
                            else if (this.state.AddressData.length > 300) {
                                this.setState({ AddressErr: true, AddressErrMessage: 'maximum 300 cherecter allowed' });
                            }
                            else {
                                this.setState({ AddressErr: false, AddressErrMessage: '', selectedLocationAddress: this.state.AddressData });
                                this.closeModel();
                            }
                            this.checForInsertUpdateAddress();
                        }} style={styles.submitAddressBtn}>
                            <Text style={styles.submitAddressBtnText}>{i18n.t("Submit")}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modals>
        );
    }

    //#endregion
    //#region Swiper logic
    renderSwipweData() {
        var rows = [];
        for (let index = 0; index < this.state.addressTypeArr.length; index++) {
            const element = this.state.addressTypeArr[index];
            rows.push(
                <View key={index + element} style={[styles.mainStyle.hundredHeightWidth, styles.mainStyle.centerCol]}>
                    {/* <Image style={[styles.imageStyle.mapSize, styles.swiperStyle.previousButton]} source={require('../../../assets/images/icon_location_pin.png')}></Image> */}

                    <TouchableOpacity style={[styles.mainStyle.center]}
                        // <TouchableOpacity style={[styles.mainStyle.hundredHeightWidth, styles.mainStyle.center]}
                        onPress={() => {
                            if ((this.props.navigation.state.params && this.props.navigation.state.params.from && this.props.navigation.state.params.from === "reviewRequest") || this.state.locationData !== null) {
                                this._getLocationAsync(true);
                            }
                            else {
                                this._getLocationAsync(false);
                            }

                            //this.setState({ IsMapViewmodalDisplay: true })
                        }}
                    >
                        {/* <Text style={[styles.fontStyle.Medium, styles.fontStyle.smallFont, styles.fontStyle.lowSpacing]}>/ {i18n.t("map")}</Text> */}
                        <Image style={[styles.imageStyle.mapSize, styles.swiperStyle.previousButton]} source={require('../../../assets/images/location_pin.png')}></Image>
                    </TouchableOpacity>


                    <Text style={[styles.fontStyle.Medium, styles.fontStyle.SliderMainFont]}>{element}</Text>
                </View>
            );
        }
        return rows;
    }
    //#endregion
    //#region Location and map view code
    _getLocationAsync = async (isBack) => {
        //console.log("get location in");
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                locationAccess: false, IsMapViewmodalDisplay: true
            });
        }
        //console.log("Permission status", status);
        if (!isBack) {
            setTimeout(() => {
                this.setState({ IsMapViewmodalDisplay: true });
            }, 5000);
            let location = await Location.getCurrentPositionAsync();
            //console.log("location data", location);


            this.setState({ locationAccess: true, locationData: location, IsMapViewmodalDisplay: true });
            //this.setState({ IsMapViewmodalDisplay: true });
            //this.getReverseLoation(location.coords);
            return null;
        }
        else {
            this.setState({ IsMapViewmodalDisplay: true });
            return null;
        }

    };

    _mapReady() {
        if (this.state.locationAccess && this.state.locationData) {
            let latitude = Number(this.state.locationData.coords.latitude)
            let longitude = Number(this.state.locationData.coords.longitude)
            let region = {
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: 0.000922 * 3,
                longitudeDelta: 0.000421 * 3,
            }
            if (this.mapView)
                this.mapView.animateToRegion(region, 500)
        }
    }
    _mapCurrentReady = async () => {
        let isLocationServiceEnabled = await Expo.Location.getProviderStatusAsync();
        if (!isLocationServiceEnabled.locationServicesEnabled) {
            this.setState({ isLocationDisabled: true, locationAccess: false });
            this.refs.modelEnableLocation.open();
            return;
        }
        else {
            let location = await Location.getCurrentPositionAsync();
            this.setState({ locationData: location, locationAccess: true });

            let latitude = Number(location.coords.latitude)
            let longitude = Number(location.coords.longitude)
            let region = {
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: 0.000922 * 3,
                longitudeDelta: 0.000421 * 3,
            }
            if (this.mapView) {
                this.mapView.animateToRegion(region, 500)
            }
            this.setState({ isAddressConfirmModalVisible: true });
            this.getReverseLoationMapPress(location.coords);
            this.setState({ lastUpdatedAddressData: this.state.AddressData });
            this.setState({ setAddress: location.coords });
            this.refs.modal5.open();
        }
    }

    renderMap() {
        return (
            <ModelReact visible={this.state.IsMapViewmodalDisplay}
                onRequestClose={() => {
                    // Alert.alert('Modal has been closed.');
                }}
            >
                <Modals style={[styles.modal, styles.modal3]}
                    backdrop={true}
                    position={"top"}
                    ref="modal5"
                    visible={this.state.isAddressConfirmModalVisible}>
                    <View style={styles.addressModal}>

                        <View style={styles.addressModalHeader}>
                            <View style={styles.addressModalTitle}>
                                <Text style={styles.addressConfirmModalTitleText}>Selected Location</Text>
                            </View>
                            <View style={styles.addressModalCloseButton}>
                                <TouchableOpacity onPress={() => this.closeAddressConfirmationModal()}>
                                    <Ionicons name="ios-close-circle" size={32} color="#ffaa1a" />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={[styles.addressConfirmModalText, { alignItems: 'center', alignSelf: 'center' }]}>
                            <Text style={[styles.fontStyle.Medium, { color: '#ffaa1a', fontSize: RF(2), marginLeft: RF(1) }]}>{this.confirmAddress}</Text>
                        </View>
                        <View style={styles.addressText}>
                            <TouchableOpacity onPress={() => {
                                // this.setState({ isAddressConfirmModalVisible: true });
                                // this.refs.addressModal.open();
                                this.setConfirmAddress()
                            }} style={styles.submitAddressBtn}>
                                <Text style={styles.submitAddressBtnText}>Accept</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modals>

                <Modals style={[styles.modal, styles.modal3]}
                    backdrop={true}
                    position={"top"}
                    ref="modelEnableLocation"
                    visible={this.state.isLocationDisabled}>
                    <View style={styles.addressModal}>
                        <View style={styles.addressModalHeader}>
                            <View style={styles.addressModalTitle}>
                                <Text style={styles.addressConfirmModalTitleText}>Enable Location</Text>
                            </View>
                            <View style={styles.addressModalCloseButton}>
                                <TouchableOpacity onPress={() => this.closeModelEnableLocation()}>
                                    <Ionicons name="ios-close-circle" size={32} color="#ffaa1a" />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={[styles.addressConfirmModalText, { alignItems: 'center', alignSelf: 'center' }]}>
                            <Text style={[styles.fontStyle.Medium, { color: '#ffaa1a', fontSize: RF(2), marginLeft: RF(1) }]}>Please enable location to detact your current location</Text>
                        </View>
                        <View style={styles.addressText}>
                            <TouchableOpacity onPress={() => {
                                this.closeModelEnableLocation()
                            }} style={styles.submitAddressBtn}>
                                <Text style={styles.submitAddressBtnText}>Ok</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modals>
                <Grid>
                    <Row size={1.5} style={styles.mainStyle.center}>
                        <Grid>
                            <Row style={styles.MapClose}>
                                <Grid>
                                    <Col size={2} style={styles.MapClose}></Col>
                                    <Col size={8} style={[
                                        styles.mainStyle.center,
                                        styles.mainStyle.hundredHeightWidth,
                                        styles.MapClose]}>
                                        <Text style={[styles.fontStyle.bold, styles.fontStyle.LargePlusWhite]}>Tap to select your location</Text>
                                    </Col>
                                    <Col size={2}>
                                        <TouchableOpacity style={[
                                            styles.mainStyle.center,
                                            styles.mainStyle.hundredHeightWidth,
                                            styles.MapClose
                                        ]}
                                            onPress={() => {
                                                this.setState({ IsMapViewmodalDisplay: false });
                                                //this.removeLocationFromSelection();
                                            }}>
                                            <Text style={[styles.fontStyle.bold, styles.fontStyle.LargePlusWhite]}>X</Text>
                                        </TouchableOpacity>
                                    </Col>
                                </Grid>
                            </Row>
                        </Grid>
                    </Row>
                    <Row size={8.5}>
                        <MapView
                            style={{ flex: 1 }}
                            provider='google'
                            ref={ref => { this.mapView = ref; }}
                            initialRegion={{
                                latitude: 23.4241,
                                longitude: 53.8478,
                                latitudeDelta: 9.22,
                                longitudeDelta: 4.21,
                            }}
                            onPress={this.onMapPress}
                            onLayout={() => {
                                //console.log("Layout is ready called")
                                this._mapReady()
                            }}
                            onMapReady={() => {
                                //console.log("Map is ready")
                                this._mapReady()
                            }}
                        >

                            {this.state.locationAccess && this.state.locationData ?
                                <MapView.Marker
                                    key={1}
                                    coordinate={{
                                        latitude: this.state.locationData.coords.latitude,
                                        longitude: this.state.locationData.coords.longitude,
                                    }}
                                />
                                : null}
                        </MapView>
                        <View style={styles.locationBtnView}>
                            {this.renderCurrentMarker()}
                        </View>
                    </Row>
                </Grid>
            </ModelReact>

        );
    }
    renderCurrentMarker() {
        return (
            <View>
                <TouchableHighlight underlayColor={'transparent'} style={styles.backLocationLnk} onPress={() => {
                    this._mapCurrentReady()
                }}>
                    <MaterialIcon style={styles.locationBtn} name="gps-fixed" />
                </TouchableHighlight>
            </View >
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
                                this.logout();
                            }
                            //console.log('clicked.')
                            this.closeConfirmModal();

                        }} style={styles.camOpenCamera}>
                            <Text style={styles.camOpenCameraText}>{this.state.modalTitleMessage != "Are you sure you want to accept this booking?" ? i18n.t("Ok") : i18n.t("Yes")}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modals>
        );
    }
    async onMapPress(e) {
        console.log('onMapPress1', e.nativeEvent)
        //console.log(e.nativeEvent.coordinate);
        var datas = {
            coords: e.nativeEvent.coordinate
        }
        console.log('onMapPress2', e.nativeEvent)
        this.setState({ locationAccess: true, locationData: datas });
        //console.log(e.nativeEvent.coordinate);
        this.setState({ isAddressConfirmModalVisible: true });
        this.setState({ lastUpdatedAddressData: this.state.AddressData });
        // console.log('getReverseLoation called1', e)
        this.getReverseLoationMapPress(datas.coords);

        this.setState({ setAddress: e.nativeEvent.coordinate });
        this.refs.modal5.open();
    }
    getReverseLoationMapPress(cordinate) {
        console.log('getReverseLoation called', cordinate)
        getAddressFromGeoCode(cordinate.latitude, cordinate.longitude, (data) => {
            //let data = await Location.reverseGeocodeAsync(cordinate);
            //var address = (data[0].name ? data[0].name + ', ' : "") + (data[0].street ? data[0].street + ', ' : "") + (data[0].region ? data[0].region + ', ' : "") + (data[0].city ? data[0].city + ', ' : "") + (data[0].country ? data[0].country : "");
            let address = data.results[0].formatted_address;
            this.confirmAddress = address;
            this.setState({ AddressData: address });
        });
    }
    async getReverseLoation(cordinate) {
        getAddressFromGeoCode(cordinate.latitude, cordinate.longitude, (data) => {
            //let data = await Location.reverseGeocodeAsync(cordinate);
            //var address = (data[0].name ? data[0].name + ', ' : "") + (data[0].street ? data[0].street + ', ' : "") + (data[0].region ? data[0].region + ', ' : "") + (data[0].city ? data[0].city + ', ' : "") + (data[0].country ? data[0].country : "");
            let address = data.results[0].formatted_address;
            this.confirmAddress = address;
            this.setState({ AddressData: address });
            this.setState({ selectedLocationAddress: address }, () => {
                this.checForInsertUpdateAddress();
            });
        });
    }
    async setConfirmAddress() {

        this.setState({ isFinalAddress: true });
        this.refs.modal5.close();
        this.setState({ tempLatitude: this.state.setAddress.latitude })
        this.setState({ tempLongitude: this.state.setAddress.longitude })
        this.getReverseLoation(this.state.setAddress);
        this.setState({ IsMapViewmodalDisplay: false });
        //this.setState({ IsMapViewmodalDisplay: false });
        //this.removeLocationFromSelection();
    }
    //#endregion
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
    //#endregion
    //#region Logout
    unAuthorized() {
        this.setState({ IsLoginExpired: true }, () => {
            this.openConfirmModal(i18n.t("loginExpired"));
        });
    }
    logout() {
        AsyncStorage.removeItem("userId", (err, scs) => {
            AsyncStorage.removeItem("loggedInUserObj", (err1, scs1) => {
                AsyncStorage.removeItem("accessToken", (err2, scs2) => {
                    this.props.navigation.navigate('start');
                });
            });
        });
    }
    //#endregion

}
export default connect(mapStateToProps, mapDispatchToProps)(Provider)