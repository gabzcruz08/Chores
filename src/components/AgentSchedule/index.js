import React, { Component } from 'react';
import { Container, Content, Button, Icon, Spinner } from 'native-base';
import { BackHandler } from "react-native";
import { View, ScrollView, TouchableOpacity, Image, Text, FlatList, ImageBackground, AsyncStorage, ActivityIndicator } from 'react-native';
import styles from './styles';
import moment from 'moment'
import { AgentFooterTab } from '../../partial/agentFooter'
import Icons from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RF from 'react-native-responsive-fontsize';
import { getSchedules, setLogoutState } from './action';
import Toast, { DURATION } from 'react-native-easy-toast-fixed';
import i18n from 'react-native-i18n';
import { LogoutConfirmation } from '../../partial/LogoutConfirmation';

const mapStateToProps = (state) => ({
    user: state.start.user,
    languageCode: state.agentSchedule.languageCode,
    isLoginPressed: state.partial.isLoginPressed,
});
const mapDispatchToProps = (dispatch) => bindActionCreators({
    getSchedules,
    setLogoutState
}, dispatch);

const daysInMonth = moment().format("YYYY-MM")
const currentMonthName = moment(moment().year + ' ,' + moment().month, "MMM,YYYY")
const totalCurrentMonthDays = moment().daysInMonth();

class AgentScheduleCalendar extends Component {
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
        if (this.props.isLoginPressed == true) {
            this.refs.logoutConfirmation.openModal();
        }
        // Font.loadAsync({
        //     'Quicksand-Bold': require('../../../assets/fonts/Quicksand-Bold.ttf'),
        //     'Quicksand-Medium': require('../../../assets/fonts/Quicksand-Medium.ttf'),
        //     'Quicksand-Regular': require('../../../assets/fonts/Quicksand-Regular.ttf'),

        // }).then(() => {
        //     this.setState({ fontLoaded: true });
        // });
        //console.log(daysInMonth);
        for (var i = 1; i < parseInt(daysInMonth + 1); i++) {
            if (i == 1) {
                this.state.data.push({ key: i.toString(), value: 'Plumbing Work - Water Heater' })
            }
            else {
                this.state.data.push({ key: i.toString(), value: 'Plumbing Work - Insert Text...' })
            }
        }
        // var previousMonth = moment().subtract(1, 'months').format("YYYY-MM");
        // console.log(previousMonth);
        // var days = moment(previousMonth).daysInMonth();
        // console.log(days);
        // previousMonth = moment(previousMonth).subtract(1, 'months').format("YYYY-MM");
        // console.log(previousMonth);
        // console.log(moment(previousMonth).daysInMonth());
        //console.log(this.props.user + '=>' + this.props.user.id);
        AsyncStorage.getItem('loggedInUserObj').then((value) => {
            this.loggedInResponse = JSON.parse(value);
            this.getSchedules(this.state.monthAndYear);
        })
        AsyncStorage.setItem("screenName", "scheduleCalendar");
    }
    onBackPress() {
        // this.props.navigation.navigate('dashBoard');
        return null;
    }
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    }
    getSchedules(yearAndMonth) {

        this.setState({ spinnerVisible: true });
        this.setState({ schedules: [] });

        this.props.getSchedules(moment(yearAndMonth).format("MM-YYYY"), this.loggedInResponse.id, this.loggedInResponse.remember_token, i18n.locale,
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
    renderPopup() {
        this.props.navigation.navigate('DrawerClose');
        this.refs.logoutConfirmation.openModal();
        this.props.setLogoutState(false, (data) => {  });
    }
    render() {
        return (
            <View style={styles.container}>
                <LogoutConfirmation isOpen="false" ref="logoutConfirmation" {...this.props} />
                {this.props.isLoginPressed == true ? this.renderPopup() : null}

                {console.log('logout pressed', this.props.isLoginPressed)}
                <View style={{ height: 20, width: '100%', backgroundColor: '#ffaa1a' }}></View>
                <View style={{ width: '100%', height: '17%', backgroundColor: '#ffaa1a', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                    <TouchableOpacity style={{ height: '100%', width: '10%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
                        onPress={() => {
                            this.props.navigation.navigate('DrawerOpen');
                        }}
                    >
                        <Image source={require('../../../assets/images/icon_menu.png')} style={{ zIndex: 2, backgroundColor: '#ffaa1a', marginLeft: 20, width: '45%', height: '15%' }} />
                    </TouchableOpacity>
                    <Image source={require('../../../assets/images/splash/logo.png')} style={{ height: '95%', width: '65%', marginLeft: '7%' }} />
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '25%', marginLeft: '-7%', }}>

                    </View>
                </View>
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
                        <Text style={{ color: '#ffaa1a', fontFamily: 'Quicksand-Regular', width: '30%', alignItems: 'center', justifyContent: 'center', fontSize: RF(2), }}>Username</Text>
                        <Text style={{ color: '#ffaa1a', fontFamily: 'Quicksand-Regular', width: '25%', alignItems: 'center', justifyContent: 'center', fontSize: RF(2), marginLeft: RF(0.2) }}>Phone</Text>
                        <Text style={{ color: '#ffaa1a', fontFamily: 'Quicksand-Regular', width: '25%', alignItems: 'center', justifyContent: 'center', fontSize: RF(2), marginLeft: RF(0.5) }}>Status</Text>

                        {/* <View style={styles.renderServicesView}>
                        {this.renderServicesView()}
                    </View> */}

                    </View>
                    : null}
                <ScrollView>
                    <View style={{ width: '90%', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center', marginLeft: '5%', marginRight: '5%' }}>
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
                <AgentFooterTab ref="footer"{...this.props} />
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
        return (
            <View>
                <View style={{ width: '100%', borderBottomWidth: 1, borderBottomColor: '#E1E1E1', paddingBottom: 5, paddingTop: 10, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', width: '90%', }}>
                            <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                <ImageBackground source={require('../../../assets/images/date-circle.png')} style={{ height: 40, width: 40, }}>
                                    <Text style={{ fontFamily: 'Quicksand-Regular', color: '#fff', fontSize: 20, paddingTop: 5, textAlign: 'center' }}>{moment(item.booking_date).format("DD")}</Text>
                                </ImageBackground>
                                <Text style={{ fontSize: 8, fontFamily: 'Quicksand-Medium', color: '#565656', alignSelf: 'center' }}>{moment(item.booking_date).format("hh:mm")}</Text>
                            </View>
                            <TouchableOpacity onPress={() => this.viewBookingDetails(item)}>
                                <Text style={styles.item}>
                                    {item.service[0].name + ' - ' + item.service[0].parentcategory[0].name}
                                </Text>
                            </TouchableOpacity>
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
                    <View style={styles.child1} key={i}>
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
                    <View style={styles.child1} key={i}>
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
                    <View style={styles.child1} key={i}>
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
                    <View style={styles.child1} key={i}>
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
                    <View style={styles.child1} key={i}>
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
                    <View style={styles.child} key={i}>
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
        //console.log('button clicked...');

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

            <View style={[{ flexDirection: 'row', width: '100%', height: RF(4) }, (rowData.index + 1) % 2 == 0 ? { backgroundColor: 'rgb(255,255,255)' } : { backgroundColor: 'rgb(228,228,228)' }]}>

                <View style={styles.serviceDetailsDisplayTimeView}>
                    <TouchableOpacity onPress={() => this.viewBookingDetails(rowData.item)} hitSlop={{ top: 50, left: 50, bottom: 50, right: 50 }}>
                        <Text style={[styles.serviceDetailsText, { paddingLeft: RF(0.8) }]}>{moment(rowData.item.booking_date).format("hh:mm")}</Text>
                    </TouchableOpacity>
                </View>
                <View style={[styles.serviceDetailsDisplayDataView]}>
                    <TouchableOpacity onPress={() => this.viewBookingDetails(rowData.item)} hitSlop={{ top: 50, left: 50, bottom: 50, right: 50 }}>
                        <Text style={styles.serviceDetailsText}>{(rowData.item.agent && rowData.item.is_dispatch == true) ? (rowData.item.user[0].first_name + ' ' + rowData.item.user[0].last_name) : "-"}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ width: '25%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={() => this.viewBookingDetails(rowData.item)} hitSlop={{ top: 50, left: 50, bottom: 50, right: 50 }}>
                        <Text style={[styles.serviceDetailsText]}>{(rowData.item.agent && rowData.item.is_dispatch == true) ? (rowData.item.agent.phone != null ? rowData.item.agent.phone : "-") : '-'}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ width: '25%', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <TouchableOpacity onPress={() => this.viewBookingDetails(rowData.item)} hitSlop={{ top: 50, left: 50, bottom: 50, right: 50 }}>
                        <Text style={[styles.serviceDetailsText, { paddingRight: RF(0.8) }]}>{(rowData.item.agent && rowData.item.is_dispatch == true) ? rowData.item.status : '-'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
    viewBookingDetails(rowDataObj) {
        var bookingObject = { booking_id: rowDataObj.id, is_dispatch: rowDataObj.is_dispatch, reminder_notification: rowDataObj.reminder_notification, title: rowDataObj.service[0].name, description: rowDataObj.service[0].description, booking: { booking_date: rowDataObj.booking_date, address: rowDataObj.address, image: rowDataObj.image, instruction: rowDataObj.instruction, amount: rowDataObj.amount, user: rowDataObj.user, agent: rowDataObj.agent != undefined ? rowDataObj.agent : null, service: rowDataObj.service, status: rowDataObj.status, rating: rowDataObj.ratting } }
        this.props.navigation.navigate('bookingDetails', { data: bookingObject, from: "agentScheduleCalendar" })
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AgentScheduleCalendar)