import React, { Component } from 'react'
import { View, Text } from 'native-base';
import { TouchableOpacity, AsyncStorage, Image } from 'react-native'
import { Row, Grid } from "react-native-easy-grid";
import { BackHandler } from "react-native";
import RF from 'react-native-responsive-fontsize';
export class LetsGo extends Component {
    constructor(props) {
        super(props)
        var loggedInResponse;
        this.state = {
            fontLoaded: true,
            from: "",
        }
        this.checkForSkipPage = this.checkForSkipPage.bind(this);
        this.onBackPress = this.onBackPress.bind(this);
    }
    componentWillMount() {
        AsyncStorage.getItem("fromPage", (err, result) => {
            if (result && result === "menu") {

            }
            else {
                checkForSkipPage();
            }
        });
    }
    checkForSkipPage() {
        AsyncStorage.getItem("isIntroSkipped").then((value) => {
            if (value == 'true') {
                this.props.navigation.navigate('start');
            }
        });
        AsyncStorage.getItem("loggedInUserObj").then((value) => {
            if (value != null) {
                //this.props.navigation.navigate('dashBoard', { loggedInObject: value });
                this.loggedInResponse = JSON.parse(value);
                if (this.loggedInResponse.role[0].name == "Agent") {
                    this.props.navigation.navigate('agentScheduleCalendar', { loggedInObject: value });
                }
                else {
                    this.props.navigation.navigate('dashBoard', { loggedInObject: value });
                }
            }
        });
        AsyncStorage.setItem("screenName", "letsGo");

    }
    onBackPress() {
        this.props.navigation.navigate('start');
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
            <View style={{ flex: 1 }}>
                <Grid>
                    <Row></Row>
                    <Row>
                        <View style={{ height: '100%', width: '100%', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                {this.state.fontLoaded ?
                                    <Text style={{
                                        color: '#FF9A00',
                                        fontSize: RF(8),
                                        fontFamily: 'Quicksand-Regular',
                                        textAlign: 'center'
                                    }}>
                                        Quick and
                                        Trouble-free
                        </Text>
                                    : null}
                            </View>
                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                {this.state.fontLoaded ?
                                    <Text style={{
                                        color: '#FF9A00',
                                        fontSize: 40,
                                        // fontWeight: 'bold',
                                        fontFamily: 'Quicksand-Bold'
                                    }}>
                                        Booking
                        </Text>
                                    : null}
                            </View>
                        </View>
                    </Row>
                    <Row></Row>
                    <Row>
                        <View style={{ height: '100%', width: '100%', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <TouchableOpacity onPress={() => { this.props.navigation.navigate('whatYouNeed') }}>
                                {this.state.fontLoaded ? <Text style={{ color: '#FF9A00', fontSize: 35, fontFamily: 'Quicksand-Regular' }}>Proceed</Text> : null}
                            </TouchableOpacity>
                            <Image source={require('../../../assets/images/border.png')} style={{ height: 10, width: 100 }} />
                        </View>
                    </Row>
                    <Row></Row>
                </Grid>
            </View>

        )
    }
}
export default LetsGo;