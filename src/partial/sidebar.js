import React from "react";
import { AppRegistry, ImageBackground, Image, StatusBar, View, AsyncStorage, Alert, TouchableOpacity } from "react-native";
import { Text, List, ListItem, Button } from "native-base";
import { Container, Header, Footer, Content, Left, Body, Icon, Drawer } from 'native-base';
import RF from 'react-native-responsive-fontsize';
import Modal from 'react-native-modalbox';
import styles from './styles';
import { Ionicons } from '@expo/vector-icons';
import i18n from 'react-native-i18n';
import { ChangeLanguage, LogoutState } from './action';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { LogoutConfirmation } from "./LogoutConfirmation";
const mapStateToProps = (state) => ({
    languageCode: state.language,
    isLoginPressed: state.isLoginPressed
});
const mapDispatchToProps = (dispatch) => bindActionCreators({
    ChangeLanguage,
    LogoutState,
}, dispatch);
const CustomerRouteroutes = [
    {
        Name: "Dashboard",
        routes: "dashBoard"
    },
    {
        Name: "Schedules",
        routes: "scheduleCalendar"
    },
    {
        Name: "termsConditions",
        routes: "termsandconditions"
    }, {
        Name: "privacyStatement",
        routes: "privacypolicy"
    },
    {
        Name: "Tutorial",
        routes: "letsGo"
    },
    {
        Name: "ForgotPasswordMenu",
        routes: "forgotPassword"
    },
    {
        Name: "Profile",
        routes: "profile"
    },
    {
        Name: "Logout",
        routes: "logout"
    },
];
const AgentRouters = [
    {
        Name: "Scheduler",
        routes: "agentScheduleCalendar"
    },
    {
        Name: "Notification",
        routes: "agentNotification"
    },
    {
        Name: "ForgotPasswordMenu",
        routes: "forgotPassword"
    },
    {
        Name: "Profile",
        routes: "profile"
    },
    {
        Name: "Logout",
        routes: "logout"
    },
];
const Login = [
    {
        Name: "Tutorial",
        routes: "letsGo"
    },
    {
        Name: "Login",
        routes: "start"
    },
];
class SideBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUserRole: '',
            isModalVisible: false,
            currentLanguage: 'Arabic',
            isArabic: false,
            lang: '',
            menuRendered: false
        }
        this.loginuserData = this.loginuserData.bind(this);
        this._logout = this._logout.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.changeLanguage = this.changeLanguage.bind(this);
        // i18n.locale = 'en';
    }
    render() {
        //console.log('in render');
        return (

            <Container>
                <View style={{ height: 24, width: '100%', backgroundColor: '#ffaa1a', }}>

                </View>
                <Header style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffaa1a', height: RF(12), }}>
                    <Body style={{ alignItems: 'center', justifyContent: 'center', marginTop: 'auto', marginBottom: 'auto' }}>
                        <Image source={require('../../assets/images/splash/Webp.net-resizeimage.png')} style={{ alignItems: 'center', justifyContent: 'center', width: 150, height: 117.07, marginTop: 'auto', marginBottom: 'auto' }} />
                        {/* <Image source={require('../assets/images/splash/Webp.net-resizeimage.png')} style={{ alignItems: 'center', justifyContent: 'center', width: 150, height: 117.07, marginTop: 'auto', marginBottom: 'auto' }} /> */}
                    </Body>
                </Header>
                <Content>
                    {this.generateMenuForRole()}
                    <View style={{ marginTop: 20 }}>
                        <Button onPress={this.changeLanguage} warning rounded block>
                            <Text>{i18n.t(this.state.currentLanguage)}</Text>
                        </Button>
                    </View>

                </Content>
                {/* <Content>
                    <Button onPress={this.changeLanguage} warning rounded block>
                        <Text>{i18n.t(this.state.currentLanguage)}</Text>
                    </Button>
                </Content> */}
            </Container>
        );
    }
    routeForCustomer() {
        var rows = [];
        for (var i = 0; i < CustomerRouteroutes.length; i++) {
            rows.push(
                <ListItem button onPress={
                    () => {
                        if (CustomerRouteroutes[i].Name === "Logout") {
                            this.setState({ isModalVisible: true });
                            this.refs.modal3.open();
                        }
                        else if (CustomerRouteroutes[i].Name === "Tutorial") {
                            AsyncStorage.setItem("fromPage", "menu", (err) => {
                                if (!err) {
                                    this.props.navigation.navigate(CustomerRouteroutes[i].routes);
                                }
                            })

                        }
                        else {
                            this.props.navigation.navigate(CustomerRouteroutes[i].routes)
                        }
                    }
                }>
                    <Text>{i18n.t(CustomerRouteroutes[i].Name)}</Text>
                </ListItem>
            );
        }
        return rows;
    }
    changeLanguage = () => {
        var local = i18n.locale;
        if (local === "en") {
            i18n.locale = 'ar';
        }
        else {
            i18n.locale = 'en';
        }
        this.props.ChangeLanguage(i18n.locale, (data) => {

        });
        // this.setState({ 'lang': i18n.locale });
        // this.props.navigation.navigate('dashBoard');
        // if (value == true) {
        //     i18n.locale = 'ar';
        //     this.setState({ isArabic: true });
        //     this.setState({ currentLanguage: 'Arabic' });
        // }
        // else {
        //     i18n.locale = 'en';
        //     this.setState({ isArabic: false });
        //     this.setState({ currentLanguage: 'English' });
        // }
    }

    routeUpdate() {

        if (this.state.currentUserRole === "Agent") {
            return this.renderCurrentUserMenu(AgentRouters);

        }
        else if (this.state.currentUserRole === "Customer") {

            return this.renderCurrentUserMenu(CustomerRouteroutes);

        }
        else {
            return this.renderCurrentUserMenu(Login);

        }

    }
    getViewForMenuItem(route) {
        return (
            <View key={route.Name} style={{ flex: 1, flexDirection: 'column', width: '100%', borderBottomWidth: 1, borderBottomColor: '#E1E1E1', padding: 10, paddingLeft: 10, paddingRight: 10 }}>
                <TouchableOpacity onPress={() => {
                    if (route.Name === "Logout") {
                        // this.setState({ isModalVisible: true });
                        // this.refs.modal3.open();
                        this.props.LogoutState(true, (data) => {

                        });
                    }
                    else if (route.Name === "Tutorial") {
                        AsyncStorage.setItem("fromPage", "menu", (err) => {
                            if (!err) {
                                this.props.navigation.navigate(route.routes);
                            }
                        })

                    }
                    else {
                        this.props.navigation.navigate(route.routes)
                    }
                }}>
                    <Text>{i18n.t(route.Name)}</Text>
                </TouchableOpacity>
            </View>
        )
    }
    renderLogoutConfirmation() {
        return <LogoutConfirmation isOpen="true" ref="logoutConfirm" />
    }
    getViewForMenu(routes) {
        let menu = [];
        for (var i = 0; i < routes.length; i++) {
            let route = routes[i];
            let itemView = this.getViewForMenuItem(route)
            menu.push(itemView);
        }
        return menu;
        // return (
        //     <View>
        //         {menu}
        //     </View>
        // )
    }
    generateMenuForRole() {
        if (this.state.currentUserRole === "Agent") {
            return this.getViewForMenu(AgentRouters);
        }
        else if (this.state.currentUserRole === "Customer") {
            return this.getViewForMenu(CustomerRouteroutes);
        }
        else {
            return this.getViewForMenu(Login);
        }
    }
    renderCurrentUserMenu(routeData) {
        var localeLang = i18n.locale;
        //console.log('lng', localeLang);
        var rows = [];
        rows.push(
            <List
                dataArray={routeData}
                renderRow={data => {
                    return (
                        <ListItem
                            button
                            onPress={() => {
                                if (data.Name === "Logout") {
                                    // Alert.alert(
                                    //     "Wait!",
                                    //     "Are you sure you want to Logout?",
                                    //     [
                                    //         { text: 'Yes', onPress: () => this._logout() },
                                    //         { text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                                    //     ],
                                    //     { cancelable: true }
                                    // )
                                    this.setState({ isModalVisible: true });
                                    this.refs.modal3.open();
                                }
                                else if (data.Name === "Tutorial") {
                                    AsyncStorage.setItem("fromPage", "menu", (err) => {
                                        if (!err) {
                                            this.props.navigation.navigate(data.routes);
                                        }
                                    })

                                }
                                else {
                                    this.props.navigation.navigate(data.routes)
                                }
                            }}>
                            {/* {console.log(i18n.t(data.Name) + ' -> ' + data.Name)} */}
                            <Text>{i18n.t(data.Name)}</Text>
                        </ListItem>
                    );
                }}
            />
        );
        return rows;
        // return (
        //     <List
        //         dataArray={routeData}
        //         renderRow={data => {
        //             return (
        //                 <ListItem
        //                     button
        //                     onPress={() => {
        //                         if (data.Name === "Logout") {
        //                             // Alert.alert(
        //                             //     "Wait!",
        //                             //     "Are you sure you want to Logout?",
        //                             //     [
        //                             //         { text: 'Yes', onPress: () => this._logout() },
        //                             //         { text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        //                             //     ],
        //                             //     { cancelable: true }
        //                             // )
        //                             this.setState({ isModalVisible: true });
        //                             this.refs.modal3.open();
        //                         }
        //                         else if (data.Name === "Tutorial") {
        //                             AsyncStorage.setItem("fromPage", "menu", (err) => {
        //                                 if (!err) {
        //                                     this.props.navigation.navigate(data.routes);
        //                                 }
        //                             })

        //                         }
        //                         else {
        //                             this.props.navigation.navigate(data.routes)
        //                         }
        //                     }}>
        //                     {/* {console.log(i18n.t(data.Name) + ' -> ' + data.Name)} */}
        //                     <Text>{i18n.t(data.Name)}</Text>
        //                 </ListItem>
        //             );
        //         }}
        //     />
        // );
    }
    componentDidMount() {
        //console.log("Navigation componant did mount called");
    }
    componentWillMount() {
        //console.log("Navigation componant will mount called");
        setInterval(() => {
            this.loginuserData();
        }, 3000);
    }
    loginuserData() {
        AsyncStorage.multiGet(['loggedInUserObj']).then((data) => {
            var userId = data[0][1] ? JSON.parse(data[0][1]) : "";
            //console.log("Sider bar token and user data  ", userId);
            if (userId != "") {
                var userRole = userId.role[0].name
                this.setState({ currentUserRole: userRole });
            }
            else {
                this.setState({ currentUserRole: "" });

            }
        });
    }
    _logout() {
        this.refs.logoutConfirm.openModal();
        // AsyncStorage.removeItem("userId", (err, scs) => {
        //     AsyncStorage.removeItem("loggedInUserObj", (err1, scs1) => {
        //         AsyncStorage.removeItem("accessToken", (err2, scs2) => {
        //             this.setState({ isModalVisible: false });
        //             this.refs.modal3.close();
        //             this.props.navigation.navigate('start');
        //         });
        //     });
        // });
    }
    closeModal() {
        this.setState({ isModalVisible: false });
        this.refs.modal3.close();
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBar)