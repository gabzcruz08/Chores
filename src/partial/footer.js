import React, { Component } from 'react';
import { Text, View, FlatList, Image, TouchableOpacity, Platform, Dimensions } from 'react-native'
import { Container, Content, Footer, FooterTab, Button, Icon, Badge, Header } from 'native-base';
import { Feather, EvilIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';
import RF from 'react-native-responsive-fontsize';
import i18n from 'react-native-i18n';
const { width, height } = Dimensions.get('window');


export class CustomeFooterTab extends Component {
    constructor(props) {
        super(props)
        this.state = {
            platform: Platform.OS,
            homeIconSize: 0
        }
    }
    componentWillMount() {
        if (this.state.platform == "ios") {
            this.setState({ homeIconSize: 29 });
        }
        else {
            this.setState({ homeIconSize: 29 });
        }
    }
    render() {
        return (

            <Footer style={{ height: RF(11), marginBottom: 0, marginTop: 'auto' }} >
                <FooterTab style={{ width: '100%', flexDirection: "row", alignItems: 'center', backgroundColor: '#ffaa1a' }}>
                    <View style={{ width: '23.5%', flex: 1, flexDirection: "column", alignItems: 'center' }}>
                        <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center' }} onPress={() => {this.props.navigation.navigate('dashBoard')}}>
                            <Image source={require('../../assets/images/home.png')} style={{ height: RF(4.5), width: RF(4.5) }}></Image>
                            <Text style={{ fontSize: 10, color: '#fff', alignItems: 'center', justifyContent: 'center' }}>
                                {i18n.t('Dashboard')}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: '2%' }}><Text style={{ color: '#fff' }}>|</Text></View>
                    <View style={{ width: '23.5%', flex: 1, flexDirection: "column", alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('search')}>
                            {/* <Feather name="search" size={32} color="white" /> */}
                            <Image source={require('../../assets/images/icon_search.png')} style={{ height: RF(4), width: RF(4) }}></Image>
                            <Text style={{ fontSize: 10, color: '#fff' }}>
                                {i18n.t('Search')}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: '2%' }}><Text style={{ color: '#fff' }}>|</Text></View>
                    <View style={{ width: '23.5%', flex: 1, flexDirection: "column", alignItems: 'center' }}>
                        <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center' }} onPress={() => this.props.navigation.navigate('scheduleCalendar')}>
                            {/* <EvilIcons name="calendar" size={32} color="white" /> */}
                            <Image source={require('../../assets/images/icon_calendar.png')} style={{ height: RF(4), width: RF(4) }}></Image>
                            <Text style={{ fontSize: 10, color: '#fff' }}>
                                {i18n.t('Schedules')}
                            </Text>
                        </TouchableOpacity>

                    </View>
                    <View style={{ width: '2%' }}><Text style={{ color: '#fff' }}>|</Text></View>
                    <View style={{ width: '23.5%', flex: 1, flexDirection: "column", alignItems: 'center' }}>
                        <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center' }} onPress={() => this.props.navigation.navigate('notification')}>
                            {/* <MaterialIcons name="notifications-active" size={32} color="white" /> */}
                            <Image source={require('../../assets/images/icon_notification.png')} style={{ height: RF(4), width: RF(4) }}></Image>
                            <Text style={{ fontSize: 10, color: '#fff', alignItems: 'center', justifyContent: 'center' }}>
                                {i18n.t('Notification')}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </FooterTab>
            </Footer>
        );
    }
}
// export default class CustomReviewRequestFooterTab {
//     constructor(props){
//         super(props);
//     }
//     render(){
//         return(
//             <FooterTab>

//             </FooterTab>
//         );
//     }
// }
