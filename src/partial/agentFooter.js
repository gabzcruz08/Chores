import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, AsyncStorage, Dimensions, Platform, } from 'react-native'
import { Footer, FooterTab } from 'native-base';
import RF from 'react-native-responsive-fontsize';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import i18n from 'react-native-i18n';
import { Ionicons } from '@expo/vector-icons';

export class AgentFooterTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            platform:Platform.OS,
            homeIconSize:0
        }

    }

    componentWillMount(){
        if(this.state.platform=="ios")
        {
            this.setState({homeIconSize:29});
        }
        else{
            this.setState({homeIconSize:27.5});
        }
    }

    render() {
        return (
            <Footer style={{ height: RF(11), marginBottom: 0, marginTop: 'auto' }} >
                <FooterTab style={{ width: '100%', flexDirection: "row", alignItems: 'center', backgroundColor: '#ffaa1a' }}>
                    {/* <View style={{ width: '32%', flex: 1, flexDirection: "column", alignItems: 'center' }}>
                        <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center' }} onPress={() => {
                            this.props.navigation.navigate('dashboard')
                        }}>
                            <Ionicons name="md-home" size={this.state.homeIconSize} color="white" style={{ alignItems: "center", textAlign: 'center', }} />
                            <Text style={{ fontSize: 10, color: '#fff', alignItems: 'center', justifyContent: 'center' }}>
                                {i18n.t("Dashboard")}
                            </Text>
                        </TouchableOpacity>
                    </View> */}
                    <View style={{ width: '23.5%', flex: 1, flexDirection: "column", alignItems: 'center' }}>
                        <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center' }} onPress={() => this.props.navigation.navigate('agentScheduleCalendar')}>
                            <Image source={require('../../assets/images/home.png')} style={{ height: RF(4.5), width: RF(4.5) }}></Image>
                            <Text style={{ fontSize: 10, color: '#fff', alignItems: 'center', justifyContent: 'center' }}>
                                {i18n.t('Dashboard')}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: '2%' }}><Text style={{ color: '#fff' }}>|</Text></View>
                    <View style={{ width: '32%', flex: 1, flexDirection: "column", alignItems: 'center' }}>
                        <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center' }} onPress={() => {
                            this.props.navigation.navigate('agentScheduleCalendar')
                        }}>
                            <Image source={require('../../assets/images/icon_calendar.png')} style={{ height: RF(4), width: RF(4) }}></Image>
                            <Text style={{ fontSize: 10, color: '#fff', alignItems: 'center', justifyContent: 'center' }}>
                                {i18n.t("Schedules")}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: '2%' }}><Text style={{ color: '#fff' }}>|</Text></View>
                    <View style={{ width: '32%', flex: 1, flexDirection: "column", alignItems: 'center' }}>
                        <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center' }} onPress={() => {
                            this.props.navigation.navigate('agentNotification');
                        }}>
                            {/* <MaterialCommunityIcons name="cash" size={32} color="white" /> */}
                            <Image source={require('../../assets/images/icon_notification.png')} style={{ height: RF(4), width: RF(4) }}></Image>
                            <Text style={{ fontSize: 10, color: '#fff', alignItems: 'center', justifyContent: 'center' }}>
                                {i18n.t("Notification")}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </FooterTab>
            </Footer>
        );
    }
}