import React, { Component } from 'react';
import { Linking,AsyncStorage, Text, View, Image, Platform, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import styles from './styles'
import { Spinner } from 'native-base'
import { Font, Notifications, Permissions } from 'expo';
import { getDashboardServices, getStateList, setLogoutState } from './actions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { CustomeFooterTab } from '../../partial/footer'
import Swiper from 'react-native-swiper';
import RF from 'react-native-responsive-fontsize';
import Modal from "react-native-simple-modal";
import { Ionicons } from '@expo/vector-icons';
import { defaultStateIdDubai, defaultStateNameDubai } from '../../Config'
import Toast, { DURATION } from 'react-native-easy-toast-fixed';
import i18n from 'react-native-i18n';
import { LogoutConfirmation } from '../../partial/LogoutConfirmation';

const mapStateToProps = (state) => ({
    languageCode: state.dashBoard.languageCode,
    isLoginPressed: state.dashBoard.isLoginPressed,

})
const mapDispatchToProps = (dispatch) => bindActionCreators({
    getDashboardServices,
    getStateList,
    setLogoutState,
}, dispatch)

class Dashboard extends Component {
    constructor(props) {
        var loggedInResponse;
        super(props);
        this.state = {
            fontLoaded: false,
            data: [],
            dataArray: null,
            equualHeight: null,
            stateListData: [],
            stateData: [],
            openStateModal: false,
            modalStateData: [],
            selectedState: defaultStateNameDubai,
            selectedStateId: defaultStateIdDubai,
            spinnerVisible: false,
            thisLangugeCode: ''
        }
        this.setStateListData = this.setStateListData.bind(this);
        this.dropDownChange = this.dropDownChange.bind(this);
        this.onStateSelect = this.onStateSelect.bind(this);
        this.closeModalFirstModal = this.closeModalFirstModal.bind(this);
        this.renderPopup = this.renderPopup.bind(this);
    }
    componentWillMount() {
        if (this.props.isLoginPressed == true) {
            this.refs.logoutConfirmation.openModal();
        }
        this.setState({ spinnerVisible: true });
        this.setState({ thisLangugeCode: i18n.locale });

        Font.loadAsync({
            'Quicksand-Regular': require('../../../assets/fonts/Quicksand-Regular.ttf'),
            'Quicksand-Bold': require('../../../assets/fonts/Quicksand-Bold.ttf'),
        }).then(() => {
            this.setState({ fontLoaded: true });
        });

        this.props.getDashboardServices(i18n.locale,
            (data) => {
                this.setState({ spinnerVisible: false });
                this.setState({ dataArray: data });
            }, (err) => {
                this.setState({ spinnerVisible: false });
                this.refs.toast.show(i18n.t('somethingWrong'), DURATION.LENGTH_SHORT);
            });
        if (this.props.navigation.state.params && this.props.navigation.state.params.loggedInObject) {
            this.loggedInResponse = JSON.parse(this.props.navigation.state.params.loggedInObject);
        }
        // console.disableYellowBox = true;
        // console.ignoredYellowBox = ['Warning: ...'];
        AsyncStorage.setItem("screenName", "dashBoard");
        AsyncStorage.getItem('loggedInUserObj').then((value) => {
            this.loggedInResponse = JSON.parse(value);
            if (this.loggedInResponse.role[0].name == "Agent") {
                this.props.navigation.navigate('agentScheduleCalendar');
            }
            else {
                this.props.navigation.navigate('dashBoard');
            }
        });
        AsyncStorage.getItem("SelectedLocation", (err, result) => {
            console.log('state data', err, result);
            if (err || !result) {
                this.setStateListData(null, null);
            }
            else {
                var resultdata = JSON.parse(result);
                this.setStateListData(resultdata.name, resultdata.id);
            }
        });
        AsyncStorage.multiGet(["selectedStateId", "selectedState"], (err, result) => {
            var stateId = result[0][1] ? result[0][1] : null;
            var service = result[1][1] ? result[1][1] : null;
            if (!stateId && !service) {
                AsyncStorage.setItem("selectedStateId", defaultStateIdDubai);
                AsyncStorage.setItem("selectedState", defaultStateNameDubai);
            }
        });

    }
    componentDidMount() {

        // this.props.getDashboardServices((data) => {
        //     this.setState({ dataArray: data });
        // }, (err) => {

        //
        this.registerForPushNotificationsAsync();


    }


    onStateSelect(selectedState, selectedStateId) {
        this.setState({ selectedStateId: selectedStateId });
        this.setState({ selectedState: selectedState });
        var stateData = this.state.stateData;
        const stateDataView = [];
        var serialNumber = 0;
        stateData.map(function (item, index) {
            serialNumber = serialNumber + 1;
            stateDataView.push(
                <TouchableOpacity
                    onPress={() => { this.onStateSelect(item.name, item.id) }}
                    style={{ marginTop: 5, marginBottom: 5, }}
                    key={`dataViewNotification${serialNumber}`}
                >
                    <View style={{ flexDirection: 'row', marginTop: RF(0.5), marginBottom: RF(0.5) }}>
                        <View style={{ width: '80%', justifyContent: 'center', alignItems: 'flex-start', }}>
                            <Text style={{ fontSize: RF(2.5), color: '#000000', justifyContent: 'flex-start', alignItems: 'flex-start', }}>{item.name}</Text>
                        </View>
                        <View style={{ width: '20%', justifyContent: 'center', alignItems: 'center', }}>
                            {selectedState == item.name ? <Ionicons style={{ zIndex: 2, color: '#026ac3', }} size={RF(3)} name="md-radio-button-on" color="#026ac3" /> : <Ionicons style={{ zIndex: 2, color: '#026ac3', }} size={RF(3)} name="md-radio-button-off" color="#026ac3" />}
                        </View>
                    </View>
                </TouchableOpacity>
            );
        }.bind(this));
        this.setState({ modalStateData: stateDataView });
        AsyncStorage.setItem("selectedStateId", JSON.stringify(selectedStateId));
        AsyncStorage.setItem("selectedState", JSON.stringify(selectedState));
        this.closeModalFirstModal();
    }

    closeModalFirstModal() {
        this.setState({ openStateModal: false });
    }

    dropDownChange(id) {
        //console.log(id);
    }

    setStateListData(selectedName, selectedId) {
        if (selectedName && selectedId) {
            console.log("if (selectedName && selectedId) in");
            this.setState({ selectedStateId: selectedId });
            this.setState({ selectedState: selectedName });
        }
        this.props.getStateList(i18n.locale,
            (data) => {
                //console.log(data);
                if (data.length > 0) {
                    var stateArray = [];
                    var objectState = {};
                    this.setState({ stateData: data });
                    stateData = [];
                    var serialNumber = 0;

                    //console.log(data);

                    data.map(function (item, index) {
                        serialNumber = serialNumber + 1;
                        stateData.push(
                            <TouchableOpacity
                                onPress={() => {
                                    AsyncStorage.setItem("SelectedLocation", JSON.stringify({
                                        name: item.name,
                                        id: item.id
                                    }), (err) => {
                                        this.onStateSelect(item.name, item.id);
                                    });
                                }}
                                style={{ marginTop: 5, marginBottom: 5, }}
                                key={`dataViewNotification${serialNumber}`}
                            >
                                <View style={{ flexDirection: 'row', marginTop: RF(0.5), marginBottom: RF(0.5) }}>
                                    <View style={{ width: '80%', justifyContent: 'center', alignItems: 'flex-start', }}>
                                        <Text style={{ fontSize: RF(2.5), color: '#000000', justifyContent: 'flex-start', alignItems: 'flex-start', }}>{item.name}</Text>
                                    </View>
                                    <View style={{ width: '20%', justifyContent: 'center', alignItems: 'center', }}>
                                        {this.state.selectedState == item.name ? <Ionicons style={{ zIndex: 2, color: '#026ac3', }} size={RF(3)} name="md-radio-button-on" color="#026ac3" /> : <Ionicons style={{ zIndex: 2, color: '#026ac3', }} size={RF(3)} name="md-radio-button-off" color="#026ac3" />}
                                    </View>
                                </View>
                            </TouchableOpacity>
                        );
                    }.bind(this));
                }
                //this.setState({ stateListData: stateArray });
                AsyncStorage.setItem("selectedStateId", JSON.stringify(this.state.selectedStateId));
                AsyncStorage.setItem("selectedState", JSON.stringify(this.state.selectedState));
                this.setState({ modalStateData: stateData });

            }, (err) => {
                console.log('err ', err);
                this.refs.toast.show(i18n.t('somethingWrong'), DURATION.LENGTH_SHORT);
            });
    }
    renderDashBoardServices() {
        this.setState({ dataArray: [] })
        this.props.getDashboardServices(i18n.locale,
            (data) => {
                // this.setState({ dataArray: [] });
                this.setState({ spinnerVisible: false });
                this.setState({ dataArray: data });
            }, (err) => {
                this.setState({ spinnerVisible: false });
                this.refs.toast.show(i18n.t('somethingWrong'), DURATION.LENGTH_SHORT);
            });
    }
    getCategoriesAgain() {
        // i18n.locale = this.props.languageCode;
        this.setState({ thisLangugeCode: i18n.locale });
        this.renderDashBoardServices();
    }
    renderPopup() {
        this.props.navigation.navigate('DrawerClose');
        this.refs.logoutConfirmation.openModal();
        this.props.setLogoutState(false, (data) => {

        });
    }
    render() {
        var bannerImageHeight = (Dimensions.get('window').height) * 0.20;
        return (
            <View style={styles.container}>
                <LogoutConfirmation isOpen="false" ref="logoutConfirmation" {...this.props} />
                {this.props.isLoginPressed == true ? this.renderPopup() : null}

                {this.state.thisLangugeCode != i18n.locale ? this.getCategoriesAgain() : null}
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
                        <TouchableOpacity style={{ width: '70%', alignItems: 'flex-end', justifyContent: 'center' }} onPress={() => this.setState({ openStateModal: true })}>
                            <Text style={{ color: "white", fontSize: 15, marginRight: 0, fontSize: RF(2), alignItems: 'flex-end', justifyContent: 'center', marginRight: 3 }}>{this.state.selectedState != "" ? this.state.selectedState : "Select"}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ width: '30%', alignItems: 'flex-start', justifyContent: 'center' }} onPress={() => this.setState({ openStateModal: true })}>
                            <Image source={require('../../../assets/images/icon_location_pin.png')} style={{ alignItems: 'flex-start', justifyContent: 'center', backgroundColor: '#rgba(255,255,255,0.0)', width: RF(3.5), height: RF(3.5) }} />
                        </TouchableOpacity>

                    </View>
                </View>
                <View style={{
                    width: '100%', backgroundColor: '#fff', alignItems: 'center'
                }}>
                    <Image source={require('../../../assets/images/banner_latest.png')} style={{ height: bannerImageHeight, width: undefined, aspectRatio: 1242 / 420, horizAlign: 'center'}} />
                    <TouchableOpacity style={{ position:'absolute',bottom:20,right:10, height:60,width:60}} onPress={() => {
                        Linking.openURL('https://wa.me/971523389399?text=')
                    }}>
                        <Image source={require("../../../assets/images/whatsapp_icon_new_96.png")} style={{ height:60,width:60}} />
                    </TouchableOpacity>
                    
                </View>
                {/* <View style={styles.cetegoryMainView}>

                </View> */}
                {(this.state.dataArray != null && this.state.dataArray.length > 0) ? this.renderSwiper() : null}
                <CustomeFooterTab ref="footer" {...this.props} />
                {
                    this.state.spinnerVisible ?
                        <View style={styles.loading}>
                            <Spinner color='#fff' />
                        </View>
                        : null
                }

                <Modal
                    open={this.state.openStateModal}
                    modalStyle={{ overflow: 'hidden', }}
                    modalDidClose={() => { this.setState({ openStateModal: false }) }}
                >

                    <View style={{ marginLeft: 0, left: 0, }}>
                        <Text style={{ height: 30, fontSize: RF(2.5), color: '#000000', justifyContent: 'flex-start', alignItems: 'flex-start', borderBottomColor: 'rgba(0,0,0,0.05)', borderBottomWidth: 1, marginBottom: 7 }}>Select State</Text>
                    </View>
                    <ScrollView style={{ height: RF(25) }}>
                        {this.state.modalStateData != null ? this.state.modalStateData : null}
                    </ScrollView>

                    <TouchableOpacity onPress={this.closeModalFirstModal}>
                        <View style={{ marginLeft: 0, marginRight: 0, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFAA1c', width: '100%' }}>
                            <Text style={{ fontSize: RF(2.5), color: '#ffffff', marginTop: 10, marginBottom: 10, justifyContent: 'center', alignItems: 'center', }}>CLOSE</Text>
                        </View>
                    </TouchableOpacity>
                </Modal>
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
            </View >
        );
    }


    renderSwiper() {
        const deviceWidth = Dimensions.get('window').width;
        if (!this.state.dataArray) {
            //console.log("Data null return null swiper");
            return (<View style={[styles.wrapper, { width: deviceWidth }]}></View>);
        }
        else {
            if (Platform.OS === 'ios') {
                return (
                    <Swiper containerStyle={[styles.wrapper, { width: deviceWidth }]}
                        showsButtons={false}
                        loop={false}
                        scrollEnabled={true}
                        activeDotColor={"#FFBB00"}
                        paginationStyle={styles.swiperDot}
                        dot={<Image source={require('../../../assets/images/dot_outline.png')} style={{ backgroundColor: 'rgba(0,0,0,0)', height: RF(2), width: RF(2), marginLeft: RF(.5), marginRight: RF(.5) }}></Image>}
                        activeDot={<Image source={require('../../../assets/images/dot-filled.png')} style={{ backgroundColor: 'rgba(0,0,0,0)', height: RF(2), width: RF(2), margin: RF(.5), marginRight: RF(.5) }}></Image>}
                    >
                        {/* {this.renderAllviews()} */}
                        {this.renderAllviews()}
                    </Swiper>
                )
            }
            else {
                return (
                    <Swiper style={[styles.wrapper, { width: deviceWidth }]}
                        showsButtons={false}
                        loop={false}
                        scrollEnabled={true}
                        activeDotColor={"#FFBB00"}
                        paginationStyle={styles.swiperDot}
                        dot={<Image source={require('../../../assets/images/dot_outline.png')} style={{ backgroundColor: 'rgba(0,0,0,0)', height: RF(2), width: RF(2), marginLeft: RF(.5), marginRight: RF(.5) }}></Image>}
                        activeDot={<Image source={require('../../../assets/images/dot-filled.png')} style={{ backgroundColor: 'rgba(0,0,0,0)', height: RF(2), width: RF(2), margin: RF(.5), marginRight: RF(.5) }}></Image>}
                    >
                        {this.renderAllviews()}
                    </Swiper>
                )
            }
        }
    }
    renderAllviews() {
        var rows = [];
        var dataRows = [];
        let data = this.state.dataArray;
        let totalData = 0;
        let arr = {
            totalSwiper: 0,
            toatalRows: 0,
        };
        if (!data) {
            return null;
        }
        else if (data.length > 0) {
            arr.totalSwiper = Math.ceil(data.length / 6);
            arr.toatalRows = Math.ceil(data.length / 2);
        }
        else {
            return null;
        }
        console.log("Swiper details", arr);
        for (let index = 0; index < arr.totalSwiper; index++) {
            const element = {
                SwiperIndex: index,
                SwiperId: "Swip" + index,
                RowsData: [],
            };
            for (let r = 0; r < (arr.toatalRows >= 3 ? 3 : arr.toatalRows); r++) {
                const RElement = {
                    RowIndex: r,
                    RowId: element.SwiperId + "RW" + r,
                    CEllData: []
                };

                for (let C = 0; C < 2; C++) {
                    const CElement = {
                        CellIndex: C,
                        CellId: RElement.RowId + "CI" + C,
                        Data: data[totalData],
                    };
                    RElement.CEllData.push(CElement);
                    totalData = totalData + 1;
                    if (totalData === data.length) {
                        break;
                    }
                }
                element.RowsData.push(RElement);
            }
            arr.toatalRows = arr.toatalRows - 3;
            dataRows.push(element);
        }
        dataRows.map(x => {
            rows.push(<View key={"PView" + x.SwiperId}>{this.renderAllRows(x.RowsData)}</View>);
        });
        return rows;
    }
    renderAllRows(rowData) {
        var rows = [];
        rowData.map(x => {
            rows.push(
                <View style={[styles.cetegotyColumnView, { zIndex: 2 }]} key={x.RowId}>
                    {this.renderCell(x.CEllData)}
                </View >);
        });
        if (rowData.length !== 2) {
            for (let index = 0; index < 2 - rowData.length; index++) {
                rows.push(
                    <View style={styles.cetegotyColumnView} key={rowData[0].RowId + "NullRow" + index}>
                        {/* {this.nullCellRender(rowData[0].RowId + "NullRow" + index)} */}
                    </View >);
            }
        }
        return rows;
    }
    renderCell(cellData) {
        let i = 1;
        let cellLength = cellData.length;
        var rows = []
        cellData.map(function (x, index) {
            i = i + 1;
            if (x.Data === "DotViewr") {
                <View style={styles.cetegoryBox} key={cellData[0].CellId + "NullDot" + i}>
                </View>
            }
            else {
                rows.push(
                    <TouchableOpacity style={[styles.cetegoryBox]} key={x.CellId} onPress={() => this.navigateTocategory(x)}>
                        <View style={[styles.touchableOpecityStyle]} onLayout={(event) => {
                            var { x, y, width, height } = event.nativeEvent.layout;
                            this.setState({ equualHeight: width })
                        }}>
                            <Image source={{ uri: x.Data.icon }} style={[styles.cetegoryImage]} aspectRatio={1} resizeMode={'contain'} />
                            <View style={[styles.categoryTextContainer]}>
                                <Text numberOfLines={2} style={[styles.cetegoryText]}>{x.Data.name ? x.Data.name : ""}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                );
            }
        }.bind(this));
        if (cellLength !== 2) {
            for (let index = 0; index < 2 - cellLength; index++) {
                rows.push(
                    <View style={styles.cetegoryBox} key={cellData[0].CellId + "Null" + index}>

                    </View>
                );
            }
        }
        return rows;
    }
    navigateTocategory(x) {
        this.props.navigation.navigate('categoriesDetailsNew', { data: x.Data, from: "dashboard" });
    }
    async  registerForPushNotificationsAsync() {
        //const PUSH_ENDPOINT = 'https://your-server.com/users/push-token';
        const { status: existingStatus } = await Permissions.getAsync(
            Permissions.NOTIFICATIONS
        );
        let finalStatus = existingStatus;

        // only ask if permissions have not already been determined, because
        // iOS won't necessarily prompt the user a second time.
        if (existingStatus !== 'granted') {
            // Android remote notification permissions are granted during the app
            // install, so this will only ask on iOS
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
        }

        // Stop here if the user did not grant permissions
        if (finalStatus !== 'granted') {
            return;
        }

        // Get the token that uniquely identifies this device
        let token = await Notifications.getExpoPushTokenAsync();
        //console.log(token);
        // POST the token to your backend server from where you can retrieve it to send push notifications.
        // return fetch(PUSH_ENDPOINT, {
        //     method: 'POST',
        //     headers: {
        //         Accept: 'application/json',
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         token: {
        //             value: token,
        //         },
        //         user: {
        //             username: 'Brent',
        //         },
        //     }),
        //});
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)