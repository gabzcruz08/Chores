import React, { Component } from 'react'
import styles from './styles'
import { View, Text, Image, ScrollView, TouchableOpacity, AsyncStorage } from 'react-native'
import moment from 'moment'
import { BackHandler } from "react-native";
import RF from 'react-native-responsive-fontsize';
import { Rating } from 'react-native-elements';
import { Col, Row, Grid } from "react-native-easy-grid";
import { rateService, dispatchBookingService, completeBookingService } from './action';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Spinner, Button } from 'native-base';
import Toast, { DURATION } from 'react-native-easy-toast-fixed';
import i18n from 'react-native-i18n';
const mapStateToProps = (state) => ({
    languageCode: state.bookingDetails.languageCode
});
const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch);
class BookingDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fontLoaded: true,
            from: null,
            spinnerVisible: false,
            roleName: '',
            dispatched: false,
        }
        this.setPageData = this.setPageData.bind(this);
        this.onBackPress = this.onBackPress.bind(this);
        this.ratingCompleted = this.ratingCompleted.bind(this);
        this.dispatchBooking = this.dispatchBooking.bind(this);
    }
    componentWillMount() {
        if (typeof this.props.navigation.state.params.data !== undefined && this.props.navigation.state.params.data !== null) {
            this.notificationObj = this.props.navigation.state.params.data;
            let bookingDate = this.notificationObj.booking.booking_date;
            let today = moment();
            this.isBookingDatePast = moment(bookingDate) < today;
        }
        if (typeof this.props.navigation.state.params && this.props.navigation.state.params.from) {
            // this.notificationObj = this.props.navigation.state.params.data;
            this.setPageData(this.props.navigation.state.params.from);

        }
        AsyncStorage.getItem('loggedInUserObj').then((value) => {
            this.loggedInResponse = JSON.parse(value);
            console.log("Role name ", this.loggedInResponse.role[0].name);
            this.setState({ roleName: this.loggedInResponse.role[0].name });
        });
        // if (typeof this.props.navigation.state.params.from !== undefined && this.props.navigation.state.params.from !== null) {
        //     console.log("Current page data is", this.props.navigation.state.params.from);
        //     this.setPageData(this.props.navigation.state.params.from);
        // }
        // AsyncStorage.setItem("screenName", "reviewRequest");
    }
    onBackPress() {
        if (this.state.from) {
            this.props.navigation.navigate(this.state.from);
        }
        else if (this.loggedInResponse.role[0].name == "Agent") {
            this.props.navigation.navigate('agentScheduleCalendar');
        }
        else {
            this.props.navigation.navigate('scheduleCalendar');
        }
        return true;
    }
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    }
    setPageData(from) {
        this.setState({ from: from });
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.ImageParentView}>
                    <View style={styles.ImageUpperView}></View>
                    <View style={styles.ImageView}>
                        <Grid style={styles.hundredHeightWidth}>
                            <Col size={15} style={[styles.AllCenter]}>
                                <TouchableOpacity onPress={() => {
                                    this.onBackPress();
                                }} hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                                    <Image source={require('../../../assets/images/back_arrow.png')} style={styles.headerBackArrow} />
                                </TouchableOpacity>
                            </Col>
                            <Col size={65} style={styles.CenterStart}>
                                <Text style={styles.headerText}>{i18n.t("bookingDetails")}</Text>
                            </Col>
                            <Col size={30} style={[styles.CenterStart]}>
                                <View style={styles.priceView}>
                                    <Text style={{ color: 'orange', fontSize: RF(2.2), fontFamily: 'Quicksand-Medium' }}>{parseInt(this.notificationObj.booking.amount) + ' AED'}</Text>
                                </View>
                            </Col>
                        </Grid>
                    </View>
                </View>
                {/* <View style={styles.ImageParentView}>
                    <View style={styles.ImageUpperView}></View>
                    <View style={styles.ImageView}>
                        <View style={[styles.headeCenterView]}>
                            <TouchableOpacity onPress={() => {
                                this.onBackPress();
                            }} hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                                <Image source={require('../../../assets/images/back_arrow.png')} style={styles.headerBackArrow} />
                            </TouchableOpacity>
                            <Grid>
                                <Row></Row>
                                <Row style={styles.rowHeaderText}>
                                    {this.state.fontLoaded ? <Text style={styles.headerText}>{i18n.t("bookingDetails")}</Text> : null}
                                </Row>
                                <Row>
                                </Row>
                            </Grid>
                        </View>
                        <View style={styles.tenPercentWidth}>
                            <View style={styles.priceView}>
                                <Text style={{ color: 'orange', fontSize: RF(2.2), fontFamily: 'Quicksand-Bold' }}>{this.notificationObj.booking.amount + ' AED'}</Text>
                            </View>
                        </View>
                    </View>
                </View> */}
                <View style={{ marginTop: '5%' }}></View>
                <ScrollView style={{ width: '100%' }}>

                    <View style={styles.content}>
                        {this.notificationObj.booking.is_dispatch == "1" ?
                            <View style={styles.viewSection}>
                                <Text style={styles.titleText}>Name:</Text>
                                <Text style={styles.titleDescription}>{(this.notificationObj.booking.agent != null && this.notificationObj.booking.agent[0].company != undefined) ? this.notificationObj.booking.agent[0].company[0].name : ''}</Text>
                            </View>
                            : null}
                        {this.notificationObj.booking.is_dispatch == "1" ? <View style={{ width: '100%', height: RF(2) }}></View> : null}
                        {this.notificationObj.booking.is_dispatch == 1 ?
                            <View style={styles.viewSection}>
                                <Text style={styles.titleText}>Phone:</Text>
                                <Text style={styles.titleDescription}>{this.notificationObj.booking.user[0].phone}</Text>
                            </View>
                            : null}
                        {this.notificationObj.booking.is_dispatch == 1 ? <View style={{ width: '100%', height: RF(2) }}></View> : null}
                        {this.notificationObj.booking.agent && this.notificationObj.booking.agent[0].company ?
                            <View style={styles.viewSection}>
                                <Text style={styles.titleText}>Selected Compnay:</Text>
                                <Text style={styles.titleDescription}>{(this.notificationObj.booking.agent != null && this.notificationObj.booking.agent[0].company != undefined) ? this.notificationObj.booking.agent[0].company[0].name : ''}</Text>
                            </View>
                            : null}

                        {this.notificationObj.booking.agent == 1 ? <View style={{ width: '100%', height: RF(2) }}></View> : null}
                        <View style={styles.viewSection}>
                            <Text style={styles.titleText}>Category:</Text>
                            <Text style={styles.titleDescription}>{this.notificationObj.booking.service[0].parentcategory[0].name}</Text>
                        </View>
                        <View style={{ width: '100%', height: RF(1) }}></View>
                        <View style={styles.viewSection}>
                            <Text style={styles.titleText}>Service:</Text>
                            <Text style={styles.titleDescription}>{this.notificationObj.booking.service[0].name}</Text>
                        </View>
                        <View style={{ width: '100%', height: RF(1) }}></View>
                        <View style={styles.viewSection}>
                            <Text style={styles.titleText}>Location:</Text>
                            <Text style={styles.titleDescription}>{this.notificationObj.booking.address}</Text>
                        </View>
                        <View style={{ width: '100%', height: RF(1) }}></View>
                        <View style={styles.viewSection}>
                            <Text style={styles.titleText}>Date & Time:</Text>
                            <Text style={styles.titleDescription}>{moment(this.notificationObj.booking.booking_date).format("ddd D MMM YYYY h:mm:ss a")}</Text>
                        </View>
                        <View style={{ width: '100%', height: RF(1) }}></View>
                        {this.notificationObj.booking.instruction ?
                            <View style={styles.viewSection}>
                                <Text style={styles.titleText}>Instruction:</Text>
                                <Text style={styles.titleDescription}>{this.notificationObj.booking.instruction}</Text>
                            </View>
                            : null}
                        {this.notificationObj.booking.instruction ? <View style={{ width: '100%', height: RF(1) }}></View> : null}
                        {(this.notificationObj && this.notificationObj.booking && this.notificationObj.booking.image && this.notificationObj.booking.image != "") ?
                            <View style={styles.viewSection}>
                                <Text style={[styles.titleText, { marginBottom: RF(1) }]}>Image:</Text>
                                <View style={{ height: RF(20), width: RF(20) }}>

                                    <Image source={{ uri: this.notificationObj.booking.image }} style={{ height: '80%', width: '80%' }}
                                        resizeMode={'contain'}
                                    ></Image>

                                </View>
                            </View>
                            : null}
                        {(this.notificationObj && this.notificationObj.booking && this.notificationObj.booking.image && this.notificationObj.booking.image != "") ? <View style={{ width: '100%', height: RF(1) }}></View> : null}
                        {this.notificationObj.description ?
                            <View style={styles.viewSection}>
                                <Text style={styles.titleText}>Description:</Text>
                                <Text style={styles.titleDescription}>{this.notificationObj.description}</Text>
                            </View>
                            : null}
                        <View style={styles.viewSection}>
                            <Text style={styles.titleText}>Status:</Text>
                            <Text style={styles.titleDescription}>{this.notificationObj.booking.status}</Text>
                        </View>
                        {this.notificationObj.description ? <View style={{ width: '100%', height: RF(1) }}></View> : null}
                        <View style={styles.viewSection}>
                            <Text style={styles.titleText}>{'Service Cost: ' + parseInt(this.notificationObj.booking.amount) + ' AED'}</Text>
                            <Text style={styles.titleDescription}>A minimum amount will be charged as a service fee. Any additional works to be performed will therefore cost extra charges.</Text>
                        </View>
                        <View style={{ width: '100%', height: RF(1) }}></View>
                        <View style={{ marginBottom: RF(1) }}>
                            {
                                (this.state.roleName === "Customer" && this.notificationObj && this.notificationObj.booking && this.notificationObj.booking.status === "completed") ? //|| this.notificationObj.booking.status === "accepted")) ?
                                    <View>
                                        <Text style={styles.titleText}>Rating:</Text>
                                        <Rating
                                            readonly={this.notificationObj.booking.rating != null ? true : false}
                                            type="star"
                                            fractions={1}
                                            startingValue={this.notificationObj.booking.rating != null ? this.notificationObj.booking.rating : 0}
                                            imageSize={20}
                                            onFinishRating={this.ratingCompleted}
                                            style={{ paddingVertical: 10 }}
                                        />
                                    </View>
                                    : null}
                        </View>
                        {this.state.dispatched || (this.state.roleName == "Agent" &&
                            this.notificationObj.booking.is_dispatch &&
                            this.notificationObj.booking.is_dispatch == 1) ?
                            <View style={[styles.center]}>
                                <Button onPress={() => {
                                }}
                                    style={styles.btnDispatched}
                                    rounded
                                    disabled={true}
                                >
                                    <Text style={styles.txtCallUsNow}>
                                        {i18n.t("dispachedBtn")}
                                    </Text>
                                </Button>
                            </View>
                            : null}
                        {
                            this.state.roleName == "Agent" &&
                                this.notificationObj.booking.reminder_notification &&
                                this.notificationObj.booking.reminder_notification == 1 &&
                                this.notificationObj.booking.is_dispatch &&
                                this.notificationObj.booking.is_dispatch == 0
                                ?
                                <View style={[styles.center]}>
                                    <Button onPress={() => {
                                        this.dispatchBooking();
                                    }}
                                        style={styles.btnDispatch}
                                        rounded
                                    >
                                        <Text style={styles.txtCallUsNow}>
                                            {i18n.t("dispachBtn")}
                                        </Text>
                                    </Button>
                                </View>
                                : null
                        }
                        {
                            this.state.roleName == "Agent" && this.isBookingDatePast === true && this.notificationObj.booking.agent != null && this.notificationObj.booking.agent.length > 0 && this.notificationObj.booking.agent[0].id == this.loggedInResponse.id && this.notificationObj.booking.status != 'completed' ?
                                <View style={[styles.center]}>
                                    <Button onPress={() => {
                                        this.completeBooking();
                                    }}
                                        style={styles.btnDispatch}
                                        rounded
                                    >
                                        <Text style={styles.txtCallUsNow}>
                                            {i18n.t("completeBookingBtn")}
                                        </Text>
                                    </Button>
                                </View>
                                :
                                null
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
                    </View>
                </ScrollView>

                {/* <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', paddingBottom: 10 }}>

                    <Text style={{ color: 'rgb(152,152,152)' }}>choose payment method</Text>
                    <Image source={require('../../../assets/images/down-arrow.png')} style={{ height: 20, width: 20, marginTop: 10 }} />
                </View> */}
                {this.state.spinnerVisible ?
                    <View style={styles.loading}>
                        <Spinner color='#fff' />
                    </View>
                    : null}
            </View>
        )
    }
    ratingCompleted(rating) {
        //console.log("Rating is: " + rating);
        this.setState({ spinnerVisible: true });
        rateService(this.loggedInResponse.remember_token, this.loggedInResponse.id, this.notificationObj.booking_id, rating, i18n.locale,
            (data) => {
                this.setState({ spinnerVisible: false });
                if (data.success_data) {
                    this.refs.toast.show(data.success_data, DURATION.LENGTH_LONG);
                }
            },
            (error) => {
                var alreadyRated = i18n.t("alreadyRated");
                var unAuthorized = i18n.t("Unauthorised");
                this.setState({ spinnerVisible: false });
                if (error.error_data === alreadyRated || error.error_data === unAuthorized) {
                    this.refs.toast.show(error.error_data, DURATION.LENGTH_LONG);
                    return;
                }

                if (error.response.status == 401) {
                    AsyncStorage.removeItem('loggedInUserObj');
                    this.props.navigation.navigate('start');
                    return;
                }
                else {
                    this.refs.toast.show(error.error_data, DURATION.LENGTH_LONG);
                }
                console.log(error.error_data);
            });
        // this.setState({ spinnerVisible: true });

        // this.refs.toast.show('You rated ' + rating + ' to this service successfully.', DURATION.LENGTH_SHORT);
        // this.refs.toast.show('Something went wrong. Please try again.', DURATION.LENGTH_SHORT);
    }
    completeBooking() {
        this.setState({ spinnerVisible: true });
        completeBookingService(this.loggedInResponse.remember_token, this.loggedInResponse.id, this.notificationObj.booking_id, i18n.locale,
            (data) => {
                this.setState({ spinnerVisible: false });
                if (data) {
                    this.refs.toast.show(data, DURATION.LENGTH_LONG);
                    this.notificationObj.booking.status = 'completed';
                    this.setState(this.state)
                }
            },
            (error) => {
                var unAuthorized = i18n.t("Unauthorised");
                this.setState({ spinnerVisible: false });
                if (error.error_data === alreadyRated || error.error_data === unAuthorized) {
                    this.refs.toast.show(error.error_data, DURATION.LENGTH_LONG);
                    return;
                }

                if (error.response.status == 401) {
                    AsyncStorage.removeItem('loggedInUserObj');
                    this.props.navigation.navigate('start');
                    return;
                }
                else {
                    this.refs.toast.show(error.error_data, DURATION.LENGTH_LONG);
                }
                console.log(error.error_data);
            });
    }
    dispatchBooking() {
        //console.log("Rating is: " + rating);
        this.setState({ spinnerVisible: true });
        dispatchBookingService(this.loggedInResponse.remember_token, this.loggedInResponse.id, this.notificationObj.booking_id, i18n.locale,
            (data) => {
                this.setState({ spinnerVisible: false });
                if (data) {
                    this.refs.toast.show(data, DURATION.LENGTH_LONG);
                    this.notificationObj.booking.is_dispatch = "1";
                }
                this.setState({ dispatched: true });
            },
            (error) => {
                var alreadyRated = i18n.t("alreadyRated");
                var unAuthorized = i18n.t("Unauthorised");
                this.setState({ spinnerVisible: false });
                if (error.error_data === alreadyRated || error.error_data === unAuthorized) {
                    this.refs.toast.show(error.error_data, DURATION.LENGTH_LONG);
                    return;
                }

                if (error.response.status == 401) {
                    AsyncStorage.removeItem('loggedInUserObj');
                    this.props.navigation.navigate('start');
                    return;
                }
                else {
                    this.refs.toast.show(error.error_data, DURATION.LENGTH_LONG);
                }
                console.log(error.error_data);
            });
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(BookingDetails)