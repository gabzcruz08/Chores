import React, { Component } from 'react'
import { BackHandler } from "react-native";
import { View, Text, Image, TextInput, FlatList, ScrollView, TouchableOpacity, AsyncStorage } from 'react-native'
import styles from './styles'
import { CustomeFooterTab } from '../../partial/footer'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getNotifications, cancelBooking } from './action';
import { Spinner } from 'native-base';
import { setLogoutState } from './action';
import Toast, { DURATION } from 'react-native-easy-toast-fixed';
import RF from 'react-native-responsive-fontsize'
import Ionicons from '@expo/vector-icons/Ionicons';
import Modal from 'react-native-modalbox';
import i18n from 'react-native-i18n';
import { Grid, Col } from "react-native-easy-grid";
import { LogoutConfirmation } from '../../partial/LogoutConfirmation';

const mapStateToProps = (state) => ({
    languageCode: state.notification.languageCode,
    isLoginPressed: state.dashBoard.isLoginPressed,
})
const mapDispatchToProps = (dispatch) => bindActionCreators({
    getNotifications,
    cancelBooking,
    setLogoutState
}, dispatch)
class Notification extends Component {
    constructor(props) {
        super(props);
        var loggedInResponse;
        this.state = {
            fontLoaded: true,
            notifications: [],
            pageIndex: 0,
            refreshing: false,
            isFetching: false,
            spinnerVisible: false,
            IsPagingEnable: true,
            modalStatus: false,
            selectedItem: null,
            thisLanguageCode: '',
            price: '',
        }
        this.isCloseToBottom = this.isCloseToBottom.bind(this);
        this.getUserNotifications = this.getUserNotifications.bind(this);
        this.renderNotificationItem = this.renderNotificationItem.bind(this);
        this.handleLoadMore = this.handleLoadMore.bind(this);
        this.onBackPress = this.onBackPress.bind(this);
        this.closeCancelBookingModal = this.closeCancelBookingModal.bind(this);
        this.cancelBookingRequest = this.cancelBookingRequest.bind(this);
    }

    componentWillMount() {

        AsyncStorage.setItem("screenName", "notification");
        AsyncStorage.getItem('loggedInUserObj').then((data) => {

            if (data != null) {
                this.loggedInResponse = JSON.parse(data);
                this.getUserNotifications();
            }
            else {

                this.refs.toast.show(i18n.t('loginContinue'), DURATION.LENGTH_SHORT);
                this.props.navigation.navigate('dashBoard');
            }
        });
        AsyncStorage.getItem('price').then((data) => {
            if (data != null) {
                this.setState({ price: data });
            }
        });
    }
    onBackPress() {
        this.props.navigation.navigate('dashBoard');
        return true;
    }
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    }
    getUserNotifications() {
        this.setState({ spinnerVisible: true });
        this.props.getNotifications(this.loggedInResponse.id, this.loggedInResponse.remember_token, this.state.pageIndex, i18n.locale,
            (data) => {
                this.setState({ spinnerVisible: false });
                //this.setState({ notifications: data });
                if (this.state.pageIndex == 0) {
                    this.setState({ notifications: data });
                }
                else if (data.length > 0) {
                    //console.log("Bind another page");
                    var rows = this.state.notifications;
                    for (var i = 0; i < data.length; i++) {
                        //console.log("Index", i, data[i]);
                        rows.push(data[i]);
                    }
                    this.setState({ notifications: rows });
                }
                else {
                    this.setState({ IsPagingEnable: false })
                }
            },
            (error) => {
                this.setState({ spinnerVisible: false });
                if (error.response.status == 401) {
                    AsyncStorage.removeItem('loggedInUserObj');
                    this.props.navigation.navigate('start');
                    return;
                }

                console.log(error);
                this.refs.toast.show(i18n.t('somethingWrong'), DURATION.LENGTH_SHORT);
            });
    }
    renderNotificationAgain() {
        this.setState({ thisLanguageCode: i18n.locale });
        AsyncStorage.getItem('loggedInUserObj').then((data) => {

            if (data != null) {
                this.loggedInResponse = JSON.parse(data);
                this.getUserNotifications();
            }
            else {

                this.refs.toast.show(i18n.t('loginContinue'), DURATION.LENGTH_SHORT);
                this.props.navigation.navigate('dashBoard');
            }
        });
    }
    renderPopup() {
        this.props.navigation.navigate('DrawerClose');
        this.refs.logoutConfirmation.openModal();
        this.props.setLogoutState(false, (data) => {

        });
    }
    render() {
        return (
            <View style={styles.container}>

                <LogoutConfirmation isOpen="false" ref="logoutConfirmation" {...this.props} />
                {this.props.isLoginPressed == true ? this.renderPopup() : null}

                {this.state.thisLanguageCode != i18n.locale ? this.renderNotificationAgain() : null}
                <Modal style={[styles.modal, styles.modal3]}
                    backdrop={true}
                    position={"top"}
                    ref={"modal5"}
                    visible={this.state.modalStatus}>

                    <View style={styles.camModal}>
                        <View style={styles.camModalHeader}>
                            <View style={styles.camModalTitle}>
                                <Text style={styles.camModalTitleText}>{i18n.t("Alert!")}</Text>
                            </View>
                            <View style={styles.camModalCloseButton}>
                                <TouchableOpacity onPress={() => this.closeCancelBookingModal()}>
                                    <Ionicons name="ios-close-circle" size={32} color="#ffaa1a" />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={[styles.mainStyle.hundredHeightWidth, styles.mainStyle.center, { height: RF(7), width: '90%', alignSelf: 'center' }]} >
                            <Text style={[styles.fontStyle.Medium, { color: '#ffaa1a', fontSize: RF(2), marginLeft: RF(1) }]}>{i18n.t("confirmCancelBooking")}</Text>
                        </View>
                        <View style={styles.camModalContent}>
                            <TouchableOpacity onPress={() => { this.cancelBookingRequest() }} style={styles.camOpenCamera}>
                                <Text style={styles.camOpenCameraText}>{i18n.t("Yes")}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <View style={styles.ImageParentView}>
                    <View style={styles.ImageUpperView}></View>
                    <View style={styles.ImageView}>
                        <Grid style={styles.hundredHeightWidth}>
                            <Col size={15} style={[styles.AllCenter]}>
                                <TouchableOpacity style={{ marginLeft: 15 }} onPress={() => {
                                    this.onBackPress();
                                }} hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                                    <Image source={require('../../../assets/images/back_arrow.png')} style={{ height: 25, width: 25 }} />
                                </TouchableOpacity>
                            </Col>
                            <Col size={60} style={styles.CenterStart}>
                                <Text style={styles.headerText}>{i18n.t("Notification")}</Text>
                            </Col>
                            <Col size={15}>
                            </Col>
                        </Grid>
                    </View>
                </View>
                <View style={{ marginTop: '10%' }}></View>
                <ScrollView ref={ref => this.scrollView = ref}
                    onContentSizeChange={(contentWidth, contentHeight) => {
                        //this.scrollView.scrollToEnd({ animated: true });
                    }}
                    onScroll={({ nativeEvent }) => { if ((this.isCloseToBottom(nativeEvent)) === true || (this.isCloseToBottom(nativeEvent)) == true) { this.handleLoadMore(); } }}
                >
                    <View style={{ marginLeft: '5%', marginRight: '5%', alignItems: 'flex-start', justifyContent: 'flex-start', width: '90%' }}>

                        <View style={{ width: '100%' }}>
                            <FlatList data={this.state.notifications}
                                renderItem={this.renderFlastListItems}
                                keyExtractor={(item) => item.id.toString()}
                            />
                            {/* {this.renderNotificationItem()} */}
                        </View>

                    </View>
                </ScrollView>
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
                <CustomeFooterTab ref="footer"{...this.props} />
                {this.state.spinnerVisible ?
                    <View style={styles.loading}>
                        <Spinner color='#fff' />
                    </View>
                    : null}
            </View>
        );
    }
    onRefresh() {
        this.state.pageIndex = this.state.pageIndex + 1;
        this.getUserNotifications();
    }
    openCancelBookingModal(item) {
        this.setState({ modalStatus: true, selectedItem: item }, () => {
            this.openCancelBooking();
        });
    }
    openCancelBooking = async () => {
        this.refs.modal5.open();
    }
    closeCancelBookingModal() {
        this.setState({ modalStatus: false });
        this.refs.modal5.close();
    }
    renderNotificationItem() {

        if (this.state.notifications && this.state.notifications.length > 0) {
            var rows = [];
            for (let index = 0; index < this.state.notifications.length; index++) {
                const item = this.state.notifications[index];

                var bookingObject = { booking_id: item.booking_id, title: item.title, description: item.description, booking: { booking_date: item.booking[0].booking_date, address: item.booking[0].address, image: item.booking[0].image, instruction: item.booking[0].instruction, amount: item.booking[0].amount, user: item.booking[0].user, agent: item.booking[0].agent, service: item.booking[0].service, status: item.booking[0].status, rating: item.booking[0].rating } }
                rows.push(
                    <View key={"INdex" + this.state.pageIndex + "I" + index}>
                        <View style={{ flex: 1, width: '100%', borderBottomWidth: 1, borderBottomColor: '#E1E1E1', padding: RF(1.5) }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                                <View style={{ width: '86%', }}>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('bookingDetails', { data: bookingObject, from: 'notification' })}>
                                        <Text style={styles.item}>
                                            {item.title}
                                            {/* <Image source={require('../../../assets/images/green-circle.png')} style={{ height: 30, width: 30 }} /> */}
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('bookingDetails', { data: bookingObject, from: 'notification' })}>
                                        <Text numberOfLines={2} style={[styles.itemChild]}>{item.description}</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ width: '7%', alignItems: 'flex-start', justifyContent: 'flex-start', marginBottom: 20 }}>
                                    <Image source={this.renderFullPath(item.booking[0].status)} style={{ height: 20, width: 20, }} />
                                    {/* source={item.status == "completed" ?
                                require('../../../assets/images/green-circle.png') :
                                require('../../../assets/images/red-circle.png')} */}
                                </View>
                                <View style={{ width: '7%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                                    {(item.booking[0].status != "completed" && item.booking[0].status != "cancel") ?
                                        <TouchableOpacity
                                            onPress={() => {
                                                //this.acceptBookingData(item);
                                                // this.openConfirmModel(item);
                                                this.openCancelBookingModal(item);
                                            }}
                                            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                            <Ionicons name="ios-close-circle" size={RF(3.5)} color="#808080" />
                                        </TouchableOpacity>
                                        : null}
                                </View>
                            </View>
                        </View>
                        {/* <View>
                    <Text style={styles.itemChild}>{item.value}</Text>
                </View> */}
                    </View>
                );
            }
            return rows;
        }
        else {
            return null;
        }
    }

    renderFlastListItems = ({ item }) => {
        var bookingObject = { booking_id: item.booking_id, title: item.title, description: item.description, booking: { booking_date: item.booking[0].booking_date, address: item.booking[0].address, image: item.booking[0].image, instruction: item.booking[0].instruction, amount: item.booking[0].amount, user: item.booking[0].user, agent: item.booking[0].agent != undefined ? item.booking[0].agent : null, service: item.booking[0].service, status: item.booking[0].status, rating: item.booking[0].rating } }
        return (
            <View>
                <View style={{ flex: 1, width: '100%', borderBottomWidth: 1, borderBottomColor: '#E1E1E1', padding: RF(1.5) }}>

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                        <View style={{ width: '86%', }}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('bookingDetails', { data: bookingObject, from: 'notification' })}>
                                <Text style={styles.item}>
                                    {item.title}
                                    {/* <Image source={require('../../../assets/images/green-circle.png')} style={{ height: 30, width: 30 }} /> */}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('bookingDetails', { data: bookingObject, from: 'notification' })}>
                                <Text numberOfLines={2} style={styles.itemChild}>{item.description}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: '7%', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', marginBottom: 20 }}>
                            {(item.booking[0].status != "completed" && item.booking[0].status != "cancel") ?
                                <TouchableOpacity
                                    onPress={() => {
                                        //this.acceptBookingData(item);
                                        // this.openConfirmModel(item);
                                        this.openCancelBookingModal(item);
                                    }}
                                    style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                    <Ionicons name="ios-close-circle" size={RF(3.5)} color="#808080" />
                                </TouchableOpacity>
                                : null}
                        </View>
                        <View style={{ width: '7%', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                            <Image source={this.renderFullPath(item.booking[0].status)} style={{ height: 20, width: 20, }} />
                            {/* source={item.status == "completed" ?
                                require('../../../assets/images/green-circle.png') :
                                require('../../../assets/images/red-circle.png')} */}
                        </View>

                    </View>
                </View>
                {/* <View>
                    <Text style={styles.itemChild}>{item.value}</Text>
                </View> */}
            </View>
        );
    }
    renderFullPath(status) {
        switch (status) {
            case 'accepted':
                return require('../../../assets/images/orange-circle.png')
            case 'cancel':
                return require('../../../assets/images/blue-circle.png')
            case 'completed':
                return require('../../../assets/images/green-circle.png')
            case 'pending':
                return require('../../../assets/images/red-circle.png')
        }
    }
    handleLoadMore = () => {
        if (this.state.IsPagingEnable) {
            this.setState({
                pageIndex: this.state.pageIndex + 1
            }, () => {
                this.getUserNotifications();
            });
        }
    }
    isCloseToBottom(layoutMeasurement) {
        //console.log("On layout", layoutMeasurement);
        var flag = false;
        contentOffset = layoutMeasurement.contentOffset;
        contentSize = layoutMeasurement.contentSize;
        var contentSizeHeight = contentSize.height.toFixed(4);
        var layoutMeasurementAndContentOffset = layoutMeasurement.layoutMeasurement.height + contentOffset.y;
        layoutMeasurementAndContentOffset = layoutMeasurementAndContentOffset.toFixed(4);
        if (parseFloat(layoutMeasurementAndContentOffset) >= parseFloat(contentSizeHeight)) {
            flag = true;
        }
        return flag;
    }
    cancelBookingRequest() {
        var item = this.state.selectedItem;
        this.closeCancelBookingModal();
        this.setState({ spinnerVisible: true });
        AsyncStorage.multiGet(['loggedInUserObj', 'accessToken']).then((data) => {
            var userId = JSON.parse(data[0][1]);
            var accessToken = data[1][1];
            cancelBooking(userId.id, item.booking_id, accessToken, i18n.locale,
                (data) => {
                    this.setState({ spinnerVisible: false });
                    alert(i18n.t('cancelSuccess'));
                    this.getUserNotifications();
                },
                (err) => {
                    var unauthorized = i18n.t("Unauthorised");
                    var alreadyAccepted = i18n.t("alreadyAccepted");
                    this.setState({ spinnerVisible: false });
                    console.log("Booking accpted error log ", err);
                    if (err.status === "error" && err.error_data === unauthorized)
                        //alert(err.error_data);
                        this.refs.toast.show(err.error_data, DURATION.LENGTH_SHORT);
                    else if (err.error_data === alreadyAccepted) {
                        if (userId.id === err.booking_data.agent_id) {
                            // alert("You have already accepted booking.");
                            this.refs.toast.show(i18n.t("cancelAlready"), DURATION.LENGTH_SHORT);
                            this.getUserNotifications();
                        }
                        else {
                            // alert("Other agent has accepted booking before you.");
                            this.refs.toast.show(i18n.t("cancelBefore"), DURATION.LENGTH_SHORT);
                            this.getUserNotifications();
                        }
                    }
                    else {
                        // alert("Some error occure while booking request accpept")
                        this.refs.toast.show(i18n.t("cancelBookingErr"), DURATION.LENGTH_SHORT);
                        this.getUserNotifications();
                    }
                });
        });
    }
    cancelBookingOnState(item, newNotification) {
        //console.log("Itemn and notification ", item, newNotification);
        //return null;
        var bookingData = this.state.notifications;
        var newArray = [];
        if (newNotification) {
            newArray.push(newNotification);
        }
        if (bookingData && bookingData.length > 0) {
            for (let index = 0; index < bookingData.length; index++) {
                var element = bookingData[index];
                if (item.id === element.id) {
                    element.booking.status = "cancel";
                }
                newArray.push(element);
            }
        }
        this.setState({ notifications: newArray });
    }
    removeNotification(item) {
        var bookingData = this.state.notifications;
        var newArray = [];
        if (bookingData && bookingData.length > 0) {
            for (let index = 0; index < bookingData.length; index++) {
                var element = bookingData[index];
                if (item.id != element.id) {
                    //element.booking.status = "accepted";
                }
                else {
                    newArray.push(element);
                }
            }
        }
        this.setState({ notifications: newArray });
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Notification)