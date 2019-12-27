import React, { Component } from 'react';
import { Container, Content, Button, Icon, Spinner } from 'native-base';
import { View, ScrollView, TouchableOpacity, Image, Text, FlatList, ImageBackground, AsyncStorage, ActivityIndicator } from 'react-native';
import styles from './styles';
import { BackHandler } from "react-native";
import { Grid, Col, Row } from 'react-native-easy-grid'
// import BigCalendar from 'react-big-calendar'
// import BigCalendar from 'react-big-calendar'
import * as Font from 'expo-font';
import moment from 'moment'
import { CustomeFooterTab } from '../../partial/footer'
import Icons from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { getSchedules } from './action';
import { bindActionCreators } from 'redux';
import RF from 'react-native-responsive-fontsize';
import Toast, { DURATION } from 'react-native-easy-toast-fixed';
import i18n from 'react-native-i18n';

const mapStateToProps = (state) => ({
    user: state.start.user,
    languageCode: state.customerSchedule.languageCode,
});
const mapDispatchToProps = (dispatch) => bindActionCreators({
    getSchedules
}, dispatch);


const daysInMonth = moment().format("YYYY-MM")
const currentMonthName = moment(moment().year + ' ,' + moment().month, "MMM,YYYY");
const totalCurrentMonthDays = moment().daysInMonth();

class ScheduleCalendar extends Component {
    constructor(props) {
        super(props);
        var loggedInResponse;
        this.state = {
            fontLoaded: true,
            events: [],
            isCalendarView: true,
            isListView: false,
            data: [],
            activeCalendarColor: '#ffaa1a',
            activeListColor: '#E4E4E4',
            monthAndYear: daysInMonth,
            totalDays: totalCurrentMonthDays,
            monthYear: moment().format("MMMM, YYYY"),
            schedules: [],
            serviceDetails: [],
            animating: false,
            spinnerVisible: false,
        }
        this.onBackPress = this.onBackPress.bind(this);
    }
    componentWillMount() {

        //console.log(daysInMonth + '->' + totalCurrentMonthDays);
        for (var i = 1; i < parseInt(daysInMonth + 1); i++) {
            if (i == 1) {
                this.state.data.push({ key: i.toString(), value: 'Plumbing Work - Water Heater' })
            }
            else {
                this.state.data.push({ key: i.toString(), value: 'Plumbing Work - Insert Text...' })
            }
        }

        // 
        // var previousMonth = moment().subtract(1, 'months').format("YYYY-MM");
        // console.log(previousMonth);
        // var days = moment(previousMonth).daysInMonth();
        // console.log(days);
        // previousMonth = moment(previousMonth).subtract(1, 'months').format("YYYY-MM");
        // console.log(previousMonth);
        // console.log(moment(previousMonth).daysInMonth());

        // console.log(this.props.user + '=>' + this.props.user.id);
        AsyncStorage.getItem('loggedInUserObj').then((value) => {
            if (value != null) {
                this.loggedInResponse = JSON.parse(value);
                this.getSchedules(this.state.monthAndYear);
            }
            else {
                this.refs.toast.show(i18n.t('loginContinue'), DURATION.LENGTH_SHORT);
                this.props.navigation.navigate('dashBoard');
            }

        })
        AsyncStorage.setItem("screenName", "scheduleCalendar");
    }
    getSchedules(yearAndMonth) {

        this.setState({ spinnerVisible: true });
        this.setState({ schedules: [] });

        this.props.getSchedules(moment(yearAndMonth).format("MM-YYYY"), this.loggedInResponse.id, this.loggedInResponse.remember_token,
            (data) => {

                this.setState({ spinnerVisible: false });
                this.setState({ schedules: data });
                //console.log(data);
                //console.log('data');
            },
            (error) => {
                this.setState({ spinnerVisible: false });
                if (error.response.status == 401) {
                    AsyncStorage.removeItem('loggedInUserObj');
                    this.props.navigation.navigate('start');
                    return;
                }
                this.refs.toast.show(i18n.t('somethingWrong'), DURATION.LENGTH_SHORT);
                console.log(error.data);
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
    render() {
        return (
            <View style={styles.container}>
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
                                <Text style={styles.headerText}>{i18n.t("Schedules")}</Text>
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
                        {this.state.fontLoaded ? <Text style={{ color: 'white', fontSize: 22, fontFamily: 'Quicksand-Medium' }}>{i18n.t('Schedules')}</Text> : null}
                        <View style={{ width: '10%', height: '100%' }}>
                        </View>
                    </View>
                </View> */}
                <View style={{ marginTop: '5%', width: '100%', }}></View>

                <View style={styles.monthHeader}>
                    <View style={styles.imageView}>
                        <TouchableOpacity style={{ margin: '1%' }} onPress={() => this.loadPreviousMonthDays()}>
                            <Icons name='arrow-circle-left' size={20} color='#ffaa1a' />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.loadNextMonthdays()}>
                            <Icons name='arrow-circle-right' size={20} color='#ffaa1a' />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.monthHeaderText}>{this.state.monthYear}</Text>
                    <View style={styles.imageView}>
                        <TouchableOpacity onPress={() => this.showCalendar()} style={{ margin: '1%' }}>
                            {/* <Image source={require('../../../assets/images/calendar_131778.png')} style={{ height: 30, width: 30 }} /> */}
                            <Icons name="calendar" size={20} color={this.state.activeCalendarColor} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.showListCalendar()} style={{ margin: '1%' }}>
                            {/* <Image source={require('../../../assets/images/List-Icon.svg.png')} style={{ height: 30, width: 30 }} /> */}
                            <Icons name="list" size={20} color={this.state.activeListColor} />
                        </TouchableOpacity>
                    </View>
                </View>

                {this.state.isCalendarView ? this.renderCalendar() : this.renderListCalendar()}
                {this.state.animating ?
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <ActivityIndicator animating={this.state.animating}
                            color='#ffaa1a'
                            size="large"
                            style={{ justifyContent: 'center', alignItems: 'center', marginLeft: '50%' }}
                        />
                    </View>
                    : null}
                {this.state.serviceDetails.length > 0 ?
                    <View style={styles.serviceDetailsView}>

                        <Text style={{ color: '#ffaa1a', fontFamily: 'Quicksand-Regular', width: '20%', alignItems: 'center', justifyContent: 'center', fontSize: RF(2), }}>Time</Text>
                        <Text style={{ color: '#ffaa1a', fontFamily: 'Quicksand-Regular', width: '30%', alignItems: 'center', justifyContent: 'center', fontSize: RF(2), }}>Company</Text>
                        <Text style={{ color: '#ffaa1a', fontFamily: 'Quicksand-Regular', width: '25%', alignItems: 'center', justifyContent: 'center', fontSize: RF(2), marginLeft: RF(0.2) }}>Phone</Text>
                        <Text style={{ color: '#ffaa1a', fontFamily: 'Quicksand-Regular', width: '25%', alignItems: 'center', justifyContent: 'center', fontSize: RF(2), marginLeft: RF(0.5) }}>Status</Text>
                        {/* <View style={styles.renderServicesView}>
                        {this.renderServicesView()}
                    </View> */}

                    </View>
                    : null}

                <ScrollView>
                    <View style={{ width: '89%', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center', marginLeft: '5%', marginRight: '5%' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}>

                            {this.renderServicesView()}
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
    renderCalendar() {

        return (
            <View style={[styles.parent]}>
                {this.renderDays()}
            </View>
        );
    }
    showCalendar() {
        this.setState({ isCalendarView: true });
        this.setState({ isListView: false });
        this.setState({ activeListColor: '#E4E4E4' });
        this.setState({ activeCalendarColor: '#ffaa1a' });
        this.renderCalendar();
    }
    showListCalendar() {

        this.setState({ isCalendarView: false });
        this.setState({ isListView: true });
        this.setState({ activeCalendarColor: '#E4E4E4' });
        this.setState({ activeListColor: '#ffaa1a' });
        this.setState({ serviceDetails: [] });
        this.state.data = [];
        for (var i = 1; i < parseInt(this.state.totalDays + 1); i++) {
            if (i == 1) {
                this.state.data.push({ key: i.toString(), value: 'Plumbing Work - Water Heater' })
            }
            else {
                this.state.data.push({ key: i.toString(), value: 'Plumbing Work - Insert Text...' })
            }
        }
        this.renderListCalendar();
    }
    loadPreviousMonthDays() {

        this.setState({ serviceDetails: [] });
        var previousMonth = moment(this.state.monthAndYear).subtract(1, 'months').format("YYYY-MM");
        this.setState({ monthAndYear: previousMonth });

        var totalMonthDays = moment(previousMonth).daysInMonth();

        this.setState({ totalDays: totalMonthDays });

        this.setState({ monthYear: moment(previousMonth).format("MMMM, YYYY") });
        this.getSchedules(previousMonth);

        this.renderCalendar();
        this.state.data = [];
        for (var i = 1; i < parseInt(totalMonthDays + 1); i++) {
            if (i == 1) {
                this.state.data.push({ key: i.toString(), value: 'Plumbing Work - Water Heater' })
            }
            else {
                this.state.data.push({ key: i.toString(), value: 'Plumbing Work - Insert Text...' })
            }
        }

        this.renderListCalendar();
    }
    loadNextMonthdays() {

        this.setState({ serviceDetails: [] });
        var nextMonth = moment(this.state.monthAndYear).add(1, 'months').format("YYYY-MM");
        this.setState({ monthAndYear: nextMonth });

        var totalMonthDays = moment(nextMonth).daysInMonth();

        this.setState({ totalDays: totalMonthDays });

        this.setState({ monthYear: moment(nextMonth).format("MMMM, YYYY") });
        this.getSchedules(nextMonth);

        this.renderCalendar();
        this.state.data = [];
        for (var i = 1; i < parseInt(totalMonthDays + 1); i++) {
            if (i == 1) {
                this.state.data.push({ key: i.toString(), value: 'Plumbing Work - Water Heater' })
            }
            else {
                this.state.data.push({ key: i.toString(), value: 'Plumbing Work - Insert Text...' })
            }
        }
        this.renderListCalendar();

    }
    renderListCalendar() {
        // this.setState({ serviceDetails: [] });
        return (

            <ScrollView>
                <View style={{ marginLeft: '5%', marginRight: '5%', alignItems: 'center', justifyContent: 'center', }}>

                    {this.state.fontLoaded ?
                        <View style={{ width: '100%' }}>
                            <FlatList data={this.state.schedules}
                                renderItem={this.renderFlastListItems}
                            />
                        </View>
                        : null}
                </View>
            </ScrollView>
        );
    }
    renderFlastListItems = ({ item }) => {
        let image = item.service[0].parentcategory[0].icon.toString();
        return (
            <View>
                <View style={{ width: '100%', borderBottomWidth: 1, borderBottomColor: '#E1E1E1', paddingBottom: 5, paddingTop: 10, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', width: '90%', }}>
                            <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                                <ImageBackground source={require('../../../assets/images/date-circle.png')} style={{ height: 40, width: 40, }}>
                                    <Text style={{ fontFamily: 'Quicksand-Regular', color: '#fff', fontSize: 20, paddingTop: 5, textAlign: 'center' }}>{moment(item.booking_date).format("DD")}</Text>
                                </ImageBackground>
                                <Text style={{ fontSize: 8, fontFamily: 'Quicksand-Medium', color: '#565656', alignSelf: 'center' }}>{moment(item.booking_date).format("hh:mm")}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginLeft: RF(1) }}>
                                <Image source={{ uri: image }} style={{ height: 65, width: 65, marginTop: -10 }} />
                            </View>
                            <View style={{ flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', width: '65%' }}>
                                <TouchableOpacity onPress={() => this.viewBookingDetails(item)}>
                                    <Text style={styles.item}>
                                        {item.service[0].name + ' - ' + item.service[0].parentcategory[0].name}
                                    </Text>
                                </TouchableOpacity>
                                {item.company ?
                                    <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                                        <Text style={styles.companyText}>Company : </Text>
                                        <Text style={styles.companyTextColor}>{item.company[0].name}</Text>
                                    </View>
                                    : null}
                                {item.company ?
                                    <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                                        <Text style={styles.companyText}>Status : </Text>
                                        <Text style={styles.companyTextColor}>{item.status}</Text>
                                    </View>
                                    : null}
                            </View>
                        </View>
                        <View style={{ width: '10%', alignItems: 'flex-end', justifyContent: 'flex-end', marginBottom: 5, }}>
                            <Image source={item.status == "completed" ? require('../../../assets/images/green-circle.png') : require('../../../assets/images/red-circle.png')} style={{ height: 20, width: 20, }} />
                        </View>

                    </View>
                </View>

            </View>
        );
    }
    renderDays() {
        var rows = [];
        var arr = '';

        for (let i = 1; i < parseInt(this.state.totalDays + 1); i++) {
            var current = moment(this.state.monthAndYear).date(i);
            var url = "";
            var time = [];
            var services = [];
            this.state.schedules.map((data) => {
                var currentMonthYear = moment(data.booking_date).format("YYYY-MM");
                var currentDay = moment(data.booking_date).format("DD");
                // url = data.service.parentcategory.icon;
                if (this.state.monthAndYear == currentMonthYear && currentDay == i) {
                    // console.log(i);
                    // url = data.service.parentcategory.icon;
                    time.push(moment(data.booking_date).format("hh:mm"));
                    // console.log("Times ->" + time);
                    // services.push(data);
                    // arr = <Image source={{ uri: data.service.parentcategory.icon }} style={{ height: 10, width: 10 }} />// <Text>1</Text>
                }
                services.push(data);
            });
            if ((i > 0 && i <= 7) && i % 2 == 0) {
                rows.push(
                    <View style={styles.child1} key={i + "1"}>
                        {time.length > 0 ?
                            <View contentContainerStyle={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                {/* <Text style={styles.timeText}>{time}</Text> */}
                                <TouchableOpacity onPress={() => { this.displayServiceDetails(services, i) }}>
                                    {this.renderTime(time)}
                                </TouchableOpacity>
                            </View> : <Text></Text>}
                        {/* {time.length>0 ? <Image source={{ uri: url }} style={{ height: 30, width: 30 }} /> : <Text></Text>} */}
                        {/* <Image source={{ uri: url }} style={{ height: 30, width: 30 }} /> */}
                        <Text style={styles.daysText}>{i + ' ' + current.format('ddd')}</Text>
                    </View>
                );
            }
            else if ((i > 7 && i <= 14) && i % 2 != 0) {
                rows.push(
                    <View style={styles.child1} key={i + "1"}>
                        {time.length > 0 ?
                            <View contentContainerStyle={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                {/* <Text style={styles.timeText}>{time}</Text> */}
                                <TouchableOpacity onPress={() => { this.displayServiceDetails(services, i) }}>
                                    {this.renderTime(time)}
                                </TouchableOpacity>
                            </View> : <Text></Text>}
                        {/* {time.length>0 ? <Image source={{ uri: url }} style={{ height: 30, width: 30 }} /> : <Text></Text>} */}
                        <Text style={styles.daysText}>{i + ' ' + current.format('ddd')}</Text>
                    </View>
                );
            }
            else if ((i > 14 && i <= 21) && i % 2 == 0) {
                rows.push(
                    <View style={styles.child1} key={i + "1"}>
                        {time.length > 0 ?
                            <View contentContainerStyle={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                {/* <Text style={styles.timeText}>{time}</Text> */}
                                <TouchableOpacity onPress={() => { this.displayServiceDetails(services, i) }}>
                                    {this.renderTime(time)}
                                </TouchableOpacity>
                            </View> : <Text></Text>}
                        {/* {time.length>0 ? <Image source={{ uri: url }} style={{ height: 30, width: 30 }} /> : <Text></Text>} */}
                        <Text style={styles.daysText}>{i + ' ' + current.format('ddd')}</Text>
                    </View>
                );
            }
            else if ((i > 21 && i <= 28) && i % 2 != 0) {
                rows.push(
                    <View style={styles.child1} key={i + "1"}>
                        {time.length > 0 ?
                            <View contentContainerStyle={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                {/* <Text style={styles.timeText}>{time}</Text> */}
                                <TouchableOpacity onPress={() => { this.displayServiceDetails(services, i) }}>
                                    {this.renderTime(time)}
                                </TouchableOpacity>
                            </View> : <Text></Text>}
                        {/* {time.length>0 ? <Image source={{ uri: url }} style={{ height: 30, width: 30 }} /> : <Text></Text>} */}
                        <Text style={styles.daysText}>{i + ' ' + current.format('ddd')}</Text>
                    </View>
                );
            }
            else if ((i > 28 && i <= 31) && i % 2 == 0) {
                rows.push(
                    <View style={styles.child1} key={i + "1"}>
                        {time.length > 0 ?
                            <View contentContainerStyle={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                {/* <Text style={styles.timeText}>{time}</Text> */}
                                <TouchableOpacity onPress={() => { this.displayServiceDetails(services, i) }}>
                                    {this.renderTime(time)}
                                </TouchableOpacity>
                            </View> : <Text></Text>}
                        {/* {time.length>0 ? <Image source={{ uri: url }} style={{ height: 30, width: 30 }} /> : <Text></Text>} */}
                        <Text style={styles.daysText}>{i + ' ' + current.format('ddd')}</Text>
                    </View>
                );
            }
            else {
                rows.push(
                    // <ScrollView>
                    <View style={styles.child} key={i + "1"}>
                        {time.length > 0 ?
                            <View contentContainerStyle={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                {/* <Text style={styles.timeText}>{time}</Text> */}
                                <TouchableOpacity onPress={() => { this.displayServiceDetails(services, i) }}>
                                    {this.renderTime(time)}
                                </TouchableOpacity>
                            </View> :
                            <Text></Text>}
                        {/* {time.length>0 ? <Image source={{ uri: url }} style={{ height: 30, width: 30 }} /> : <Text></Text>} */}
                        <Text style={styles.daysText}>{i + ' ' + current.format('ddd')}</Text>
                    </View>
                    // </ScrollView>
                );
            }
        }

        return rows;
    }
    renderTime(arrayList) {
        var rows = [];
        // for (let index = 0; index < arrayList.length; index++) {
        //     // rows.push(<Text style={styles.timeText}>{arrayList[index]}</Text>);
        //     rows.push(<Image source={{ uri: 'https://img.icons8.com/color/20/000000/date-to.png' }} style={{ height: 20, width: 20 }} />)
        // }
        if (arrayList.length > 0) {
            rows.push(<Image source={require('../../../assets/images/hat-icon.png')} style={{ height: 30, width: 30 }} />);
        }
        return rows;
    }
    displayServiceDetails(serviceArray, selectedDay) {
        this.setState({ serviceDetails: [] });
        this.setState({ animating: true });
        var rows = [];
        serviceArray.map((data) => {

            var currentMonthYear = moment(data.booking_date).format("YYYY-MM");
            var currentDay = moment(data.booking_date).format("DD");
            if (this.state.monthAndYear == currentMonthYear && currentDay == selectedDay) {

                rows.push(data);
                this.setState({ serviceDetails: rows });
            }
        });

        this.setState({ animating: false });
        return this.renderServicesView();
    }

    renderServicesView() {

        if (this.state.serviceDetails.length > 0) {
            var rows = [];
            rows.push(
                <View style={{ width: '100%' }}>

                    <FlatList data={this.state.serviceDetails}
                        keyExtractor={(item, index) => 'key' + index}
                        renderItem={(rowData) => this.renderServiceDetails(rowData)}
                        contentContainerStyle={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}
                    />

                </View>
            );
            return rows;
        }

    }
    renderServiceDetails = (rowData) => {
        return (
            <View style={[{ flexDirection: 'row', width: '100%', paddingTop:5, paddingBottom:5 }, (rowData.index + 1) % 2 == 0 ? { backgroundColor: 'rgb(255,255,255)' } : { backgroundColor: 'rgb(228,228,228)' }]}>

                <View style={styles.serviceDetailsDisplayTimeView}>
                    <TouchableOpacity onPress={() => this.viewBookingDetails(rowData.item)} hitSlop={{ top: 50, left: 50, bottom: 50, right: 50 }}>
                        <Text style={[styles.serviceDetailsText, { paddingLeft: RF(0.8) }]}>{moment(rowData.item.booking_date).format("hh:mm")}</Text>
                    </TouchableOpacity>
                </View>
                <View style={[styles.serviceDetailsDisplayDataView]}>
                    <TouchableOpacity onPress={() => this.viewBookingDetails(rowData.item)} hitSlop={{ top: 50, left: 50, bottom: 50, right: 50 }}>
                        {/* <Text style={styles.serviceDetailsText}>{rowData.item.agent ? (rowData.item.agent[0].first_name + ' ' + rowData.item.agent[0].last_name) : "-"}</Text> */}
                        <Text style={styles.serviceDetailsText}>{rowData.item.company ? rowData.item.company[0].name : "-"}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ width: '25%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={() => this.viewBookingDetails(rowData.item)} hitSlop={{ top: 50, left: 50, bottom: 50, right: 50 }}>
                        <Text style={[styles.serviceDetailsText]}>{rowData.item.agent ? (rowData.item.agent[0].phone != null ? rowData.item.agent.phone : "-" + '  ') : '-'}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ width: '25%', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <TouchableOpacity onPress={() => this.viewBookingDetails(rowData.item)} hitSlop={{ top: 50, left: 50, bottom: 50, right: 50 }}>
                        <Text style={[styles.serviceDetailsText, { paddingRight: RF(0.8) }]}>{rowData.item.status}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
    viewBookingDetails(rowDataObj) {

        var bookingObject = { booking_id: rowDataObj.id, title: rowDataObj.service[0].name, description: rowDataObj.service[0].description, booking: { booking_date: rowDataObj.booking_date, address: rowDataObj.address, image: rowDataObj.image, instruction: rowDataObj.instruction, amount: rowDataObj.amount, user: rowDataObj.user, agent: rowDataObj.agent != undefined ? rowDataObj.agent : null, service: rowDataObj.service, status: rowDataObj.status, rating: rowDataObj.ratting } }
        this.props.navigation.navigate('bookingDetails', { data: bookingObject, from: "scheduleCalendar" })
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ScheduleCalendar)