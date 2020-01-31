import React, { Component } from 'react'
import { BackHandler } from "react-native";
import { View, Text, Image, TextInput, FlatList, ScrollView, TouchableOpacity, AsyncStorage, } from 'react-native'
import styles from './styles'
import { AgentFooterTab } from '../../partial/agentFooter'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getNotifications, acceptBooking, cancelBooking } from './action';
import RF from 'react-native-responsive-fontsize';
import { Spinner } from 'native-base';
import { Ionicons, Entypo } from '@expo/vector-icons';
import Modal from 'react-native-modalbox';
import Toast, { DURATION } from 'react-native-easy-toast-fixed';
import i18n from 'react-native-i18n';
import { Row, Grid, Col } from "react-native-easy-grid";

const mapStateToProps = (state) => ({
    languageCode: state.agentNotification.languageCode
})
const mapDispatchToProps = (dispatch) => bindActionCreators({
    getNotifications,
}, dispatch)
class AgentNotification extends Component {
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
            modalTitleMessage: '',
            thisLanguageCode: '',
        }
        this.acceptBookingData = this.acceptBookingData.bind(this);
        this.accptBookingOnState = this.accptBookingOnState.bind(this);
        this.removeNotification = this.removeNotification.bind(this);
        this.isCloseToBottom = this.isCloseToBottom.bind(this);
        this.getUserNotifications = this.getUserNotifications.bind(this);
        this.renderNotificationItem = this.renderNotificationItem.bind(this);
        this.handleLoadMore = this.handleLoadMore.bind(this);
        this.onBackPress = this.onBackPress.bind(this);
        this.openConfirmModel = this.openConfirmModel.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.openCancelBookingModal = this.openCancelBookingModal.bind(this);
        this.closeCancelBookingModal = this.closeCancelBookingModal.bind(this);
        this.cancelBookingOnState = this.cancelBookingOnState.bind(this);
    }

    componentWillMount() {
        AsyncStorage.setItem("screenName", "agentNotification");
        AsyncStorage.getItem('loggedInUserObj').then((data) => {
            this.loggedInResponse = JSON.parse(data);
            this.getUserNotifications();
        });
    }
    onBackPress() {
        this.props.navigation.navigate('agentScheduleCalendar');
        return true;
    }
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    }
    openModal = async (text) => {
        this.setState({ modalStatus: true });
        this.modalText = (text === "" || text === null || text == undefined) ? i18n.t("confirmAcceptBooking") : text;
        this.setState({ modalTitleMessage: this.modalText }, () => {
            this.refs.modal4.open();
        });

    }
    openCancelBookingModal(item) {
        this.setState({ modalStatus: true, selectedItem: item }, () => {
            this.openCancelBooking();
        });
    }
    openCancelBooking = async () => {
        this.refs.modal5.open();
    }
    closeModal = async () => {

        this.setState({ modalStatus: false });
        this.refs.modal4.close();
    }
    closeCancelBookingModal = async () => {
        this.setState({ modalStatus: false });
        this.refs.modal5.close();
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
            this.loggedInResponse = JSON.parse(data);
            this.getUserNotifications();
        });
    }
    render() {
        return (
            <View style={styles.container}>
                {this.state.thisLanguageCode != i18n.locale ? this.renderNotificationAgain() : null}
                <Modal style={[styles.modal, styles.modal3]}
                    backdrop={true}
                    position={"top"}
                    ref={"modal4"}
                    visible={this.state.modalStatus}>

                    <View style={styles.camModal}>
                        <View style={styles.camModalHeader}>
                            <View style={styles.camModalTitle}>
                                <Text style={styles.camModalTitleText}>{i18n.t("Alert!")}</Text>
                            </View>
                            <View style={styles.camModalCloseButton}>
                                <TouchableOpacity onPress={() => this.closeModal()}>
                                    <Ionicons name="ios-close-circle" size={32} color="#ffaa1a" />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={[styles.mainStyle.hundredHeightWidth, styles.mainStyle.center, { height: RF(5) }]} >
                            <Text style={[styles.fontStyle.Medium, { color: '#ffaa1a', fontSize: RF(2), marginLeft: RF(1) }]}>{this.state.modalTitleMessage}</Text>
                        </View>
                        <View style={styles.camModalContent}>
                            <TouchableOpacity onPress={() => { this.state.modalTitleMessage === "Are you sure you want to accept this booking?" ? this.acceptBookingData() : this.closeModal(); }} style={styles.camOpenCamera}>
                                <Text style={styles.camOpenCameraText}>{this.state.modalTitleMessage != "Are you sure you want to accept this booking?" ? i18n.t("Ok") : i18n.t("Yes")}</Text>
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
                {/* <View style={styles.ImageParentView}>
                    <View style={styles.ImageUpperView}></View>
                    <View style={styles.ImageView}>
                        <TouchableOpacity style={{ marginLeft: 15 }} onPress={() => {
                            this.onBackPress();
                        }} hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                            <Image source={require('../../../assets/images/back_arrow.png')} style={{ height: 20, width: 20 }} />
                        </TouchableOpacity>
                        {this.state.fontLoaded ? <Text style={{ color: 'white', fontSize: 22, fontFamily: 'Quicksand-Medium' }}>{i18n.t('Notification')}</Text> : null}
                        <View style={{ width: '10%', height: '100%' }}>
                        </View>
                    </View>
                </View> */}
                <View style={{ marginTop: '10%' }}></View>
                <ScrollView ref={ref => this.scrollView = ref}
                    onContentSizeChange={(contentWidth, contentHeight) => {
                        //this.scrollView.scrollToEnd({ animated: true });
                    }}
                    onScroll={({ nativeEvent }) => { if ((this.isCloseToBottom(nativeEvent)) === true || (this.isCloseToBottom(nativeEvent)) == true) { this.handleLoadMore(); } }}
                >
                    <View style={{ marginLeft: '5%', marginRight: '5%', alignItems: 'flex-start', justifyContent: 'flex-start', }}>
                        <View style={{ width: '100%' }}>
                            {/* <FlatList data={this.state.notifications}
                                // onContentSizeChange={() => this.flatList.scrollToEnd({ animated: true })}
                                // onLayout={() => this.flatList.scrollToEnd({ animated: true })}
                                renderItem={this.renderFlastListItems}
                                onEndThreshold={0}
                                // automaticallyAdjustContentInsets={true}
                                // onRefresh={() => this.onRefresh()}
                                // refreshing={this.state.isFetching}
                                // onEndReachedThreshold={0.5}
                                // onEndReached={({ distanceFromEnd }) => {//Call API to fetch next page of data
                                //     this.onRefresh();
                                // }}
                                onEndReached={this.handleLoadMore}

                                keyExtractor={(item) => item.id.toString()}
                            // renderItem={({ item }) => <Text style={styles.item}>{item.key}</Text>}
                            /> */}
                            <FlatList data={this.state.notifications}
                                renderItem={this.renderFlastListItems}
                                legacyImplementation={true}
                                keyExtractor={(item) => {
                                    console.log("===========================Item " + item.id + " =======================");
                                    item.id.toString();
                                    console.log("=======================================================================");
                                }}
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
                <AgentFooterTab ref="footer"{...this.props} />
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
    renderNotificationItem() {
        if (this.state.notifications && this.state.notifications.length > 0) {
            var rows = [];
            for (let index = 0; index < this.state.notifications.length; index++) {
                const item = this.state.notifications[index];
                rows.push(
                    <View key={"Page" + this.state.pageIndex + "INdex" + index}>
                        <View style={{ width: '100%', borderBottomWidth: 1, borderBottomColor: '#E1E1E1' }}>

                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                                <View style={{ width: '86%', }}>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('bookingDetails', { data: item, from: "agentNotification" })}>
                                        <Text style={styles.item}>
                                            {item.title}
                                            {/* <Image source={require('../../../assets/images/green-circle.png')} style={{ height: 30, width: 30 }} /> */}
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('bookingDetails', { data: item, from: "agentNotification" })}>
                                        <Text numberOfLines={2} style={styles.itemChild}>{item.description}</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ width: '7%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                                    {item.booking[0].status === "pending" ? <Image source={require('../../../assets/images/red-circle.png')} style={{ height: 20, width: 20, }} resizeMode={'contain'} /> : null}
                                    {item.booking[0].status === "accepted" ? <Image source={require('../../../assets/images/orange-circle.png')} style={{ height: 20, width: 20, }} resizeMode={'contain'} /> : null}
                                    {item.booking[0].status === "completed " ? <Image source={require('../../../assets/images/green-circle.png')} style={{ height: 20, width: 20, }} resizeMode={'contain'} /> : null}
                                    {item.booking[0].status === "cancel" ? <Image source={require('../../../assets/images/blue-circle.png')} style={{ height: 20, width: 20, }} resizeMode={'contain'} /> : null}
                                </View>
                                <View style={{ width: '7%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                                    {item.booking[0].status === "pending" ?
                                        <TouchableOpacity
                                            onPress={() => {
                                                //this.acceptBookingData(item);
                                                this.openConfirmModel(item);
                                            }}
                                            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                            <Ionicons name="ios-checkmark-circle" size={RF(4)} color="green" />
                                        </TouchableOpacity>
                                        : null}
                                    {/* {
                                        item.booking.status === "accepted" ?
                                            <TouchableOpacity
                                                onPress={() => {
                                                    //this.acceptBookingData(item);
                                                    // this.openConfirmModel(item);
                                                    this.openCancelBookingModal(item);
                                                }}
                                                style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                                <Ionicons name="ios-close-circle" size={RF(4)} color="#808080" />
                                            </TouchableOpacity>
                                            : null
                                    } */}
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

    openConfirmModel(item) {
        this.setState({ modalStatus: true, selectedItem: item }, () => {
            this.openModal();
        });
    }
    acceptBookingData() {
        var item = this.state.selectedItem;
        this.closeModal();
        this.setState({ spinnerVisible: true });
        AsyncStorage.multiGet(['loggedInUserObj', 'accessToken']).then((data) => {
            //console.log("line number 584 ", data);
            var userId = JSON.parse(data[0][1]);
            var accessToken = data[1][1];
            console.log("user data", userId, item.booking);
            //console.log("Before accept booking called", userId, accessToken, item);
            acceptBooking(userId.id, item.booking[0].id, accessToken, i18n.locale,
                (scs) => {
                    console.log("scs of accept booking ", scs);
                    this.setState({ spinnerVisible: false });
                    // alert("Booking accepted successfully.");
                    this.openModal(i18n.t("bookingSuccess"));
                    //console.log("Booking accepted log ", scs);
                    this.accptBookingOnState(item, scs.success_data);
                    this.removeNotification(item);
                }, (err) => {
                    var accepted = i18n.t("alreadyAccepted");
                    this.setState({ spinnerVisible: false });
                    console.log("Booking accpted error log ", err);
                    if (err.status === "error")
                        //alert(err.error_data);
                        this.refs.toast.show(err.error_data, DURATION.LENGTH_SHORT);
                    else if (err.error_data === accepted) {
                        if (userId.id === err.booking_data.agent_id) {
                            // alert("You have already accepted booking.");
                            this.refs.toast.show(i18n.t("youAccepted"), DURATION.LENGTH_SHORT);
                            this.accptBookingOnState(item, null);
                        }
                        else {
                            // alert("Other agent has accepted booking before you.");
                            this.refs.toast.show(i18n.t("otherAccepted"), DURATION.LENGTH_SHORT);
                            this.removeNotification(item);
                        }
                    }
                    else {
                        this.refs.toast.show(i18n.t("acceptBookingErr"), DURATION.LENGTH_SHORT);
                    }

                });
        });
    }
    cancelBookingRequest() {
        var item = this.state.selectedItem;
        this.closeCancelBookingModal();
        this.setState({ spinnerVisible: true });
        AsyncStorage.multiGet(['loggedInUserObj', 'accessToken']).then((data) => {
            var userId = JSON.parse(data[0][1]);
            var accessToken = data[1][1];
            cancelBooking(userId.id, item.booking.id, accessToken, i18n.locale,
                (data) => {
                    this.setState({ spinnerVisible: false });
                    this.openModal(i18n.t("cancelSuccess"));
                    // alert('Booking cancelled successfully.');
                    this.cancelBookingOnState(item, data.success_data);

                },
                (err) => {
                    var bookingAcceptedError = i18n.t("alreadyAccepted");
                    this.setState({ spinnerVisible: false });
                    console.log("Booking accpted error log ", err);
                    if (err.status === "error")
                        //alert(err.error_data);
                        this.refs.toast.show(err.error_data, DURATION.LENGTH_SHORT);
                    else if (err.error_data === bookingAcceptedError) {
                        if (userId.id === err.booking_data.agent_id) {
                            // alert("You have already accepted booking.");
                            this.refs.toast.show(i18n.t("cancelAlready"), DURATION.LENGTH_SHORT);
                            this.cancelBookingOnState(item, null);
                        }
                        else {
                            // alert("Other agent has accepted booking before you.");
                            this.refs.toast.show(i18n.t("cancelBefore"), DURATION.LENGTH_SHORT);
                            this.removeNotification(item);
                        }
                    }
                    else {
                        this.refs.toast.show(i18n.t("Server error while cancelling booking request."), DURATION.LENGTH_SHORT);
                    }
                });
        });
    }
    accptBookingOnState(item, newNotification) {
        //console.log("Itemn and notification ", item, newNotification);
        //return null;
        var bookingData = this.state.notifications;
        var newArray = [];
        console.log(newNotification);
        if (newNotification) {
            // var bookingObject = { booking_id: newNotification[0].booking_id, title:  newNotification[0].title, description:  newNotification[0].description, booking: { booking_date: newNotification[0].booking[0].booking_date, address: newNotification[0].booking[0].address, image: newNotification[0].booking[0].image, instruction: newNotification[0].booking[0].instruction, amount: newNotification[0].booking[0].amount, user: newNotification[0].booking[0].user, agent: newNotification[0].booking[0].agent != undefined ? newNotification[0].booking[0].agent : null, service: newNotification[0].booking[0].service, status: newNotification[0].booking[0].status, rating: newNotification[0].booking[0].rating, is_dispatch: newNotification[0].booking[0].is_dispatch, reminder_notification: newNotification[0].booking[0].reminder_notification } }
            newArray.push(newNotification[0]);
        }
        if (bookingData && bookingData.length > 0) {
            for (let index = 0; index < bookingData.length; index++) {
                var element = bookingData[index];
                if (item.id === element.id) {
                    element.booking.status = "accepted";
                }
                newArray.push(element);
            }
        }
        this.setState({ notifications: newArray });
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
                
                if (item.id == element.id) {
                    element.booking[0].status = "accepted";
                }
                newArray.push(element);
            }
        }
        this.setState({ notifications: newArray });
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
    renderFlastListItems = ({ item }) => {
        var bookingObject = { booking_id: item.booking_id, title: item.title, description: item.description, booking: { booking_date: item.booking[0].booking_date, address: item.booking[0].address, image: item.booking[0].image, instruction: item.booking[0].instruction, amount: item.booking[0].amount, user: item.booking[0].user, agent: item.booking[0].agent != undefined ? item.booking[0].agent : null, service: item.booking[0].service, status: item.booking[0].status, rating: item.booking[0].rating, is_dispatch: item.booking[0].is_dispatch, reminder_notification: item.booking[0].reminder_notification } }
        return (
            <View>
                <View style={{ flex: 1, width: '100%', borderBottomWidth: 1, borderBottomColor: '#E1E1E1', padding: RF(1.5) }}>

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                        <View style={{ width: '86%', }}>
                            <TouchableOpacity onPress={() => {
                                this.props.navigation.navigate('bookingDetails', { data: bookingObject, from: 'agentNotification' })
                            }}>
                                <Text style={styles.item}>
                                    {item.title}
                                    {/* <Image source={require('../../../assets/images/green-circle.png')} style={{ height: 30, width: 30 }} /> */}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('bookingDetails', { data: bookingObject, from: 'agentNotification' })}>
                                <Text numberOfLines={2} style={styles.itemChild}>{item.description}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: '7%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                            {item.booking[0].status === "pending" ? <Image source={require('../../../assets/images/red-circle.png')} style={{ height: 20, width: 20, }} resizeMode={'contain'} /> : null}
                            {item.booking[0].status === "accepted" ? <Image source={require('../../../assets/images/orange-circle.png')} style={{ height: 20, width: 20, }} resizeMode={'contain'} /> : null}
                            {item.booking[0].status === "completed " ? <Image source={require('../../../assets/images/green-circle.png')} style={{ height: 20, width: 20, }} resizeMode={'contain'} /> : null}
                            {item.booking[0].status === "cancel" ? <Image source={require('../../../assets/images/blue-circle.png')} style={{ height: 20, width: 20, }} resizeMode={'contain'} /> : null}
                        </View>
                        <View style={{ width: '7%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                            {item.booking[0].status === "pending" ?
                                <TouchableOpacity
                                    onPress={() => {
                                        //this.acceptBookingData(item);
                                        this.openConfirmModel(item);
                                    }}
                                    style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                    <Ionicons name="ios-checkmark-circle" size={RF(4)} color="green" />
                                </TouchableOpacity>
                                : null}
                            {/* {
                                        item.booking.status === "accepted" ?
                                            <TouchableOpacity
                                                onPress={() => {
                                                    //this.acceptBookingData(item);
                                                    // this.openConfirmModel(item);
                                                    this.openCancelBookingModal(item);
                                                }}
                                                style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                                <Ionicons name="ios-close-circle" size={RF(4)} color="#808080" />
                                            </TouchableOpacity>
                                            : null
                                    } */}
                        </View>
                    </View>
                </View>
                {/* <View>
                    <Text style={styles.itemChild}>{item.value}</Text>
                </View> */}
            </View>
        );
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(AgentNotification)