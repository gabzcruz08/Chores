import React, { Component } from 'react'
import styles from './styles'
import { View, Text, Image, FlatList, ImageBackground, TouchableOpacity, ScrollView, AsyncStorage } from 'react-native'
import * as Font from 'expo-font'
import { CustomeFooterTab } from '../../partial/footer'
import RF from 'react-native-responsive-fontsize';
class Schedules extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fontLoaded: false
        }
    }

    componentWillMount() {
        Font.loadAsync({
            'Quicksand-Regular': require('../../../assets/fonts/Quicksand-Regular.ttf'),
            'Quicksand-Bold': require('../../../assets/fonts/Quicksand-Bold.ttf'),
            'Quicksand-Medium': require('../../../assets/fonts/Quicksand-Medium.ttf'),
        }).then(() => {
            this.setState({ fontLoaded: true })
        });
        AsyncStorage.setItem("screenName", "schedules");
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.ImageParentView}>
                    <View style={styles.ImageUpperView}></View>
                    <View style={styles.ImageView}>
                        <TouchableOpacity style={{ marginLeft: 15 }} onPress={() => {
                            this.props.navigation.navigate('dashBoard');
                        }} hitSlop={{top: 20, left: 20, bottom: 20, right: 20}}>
                            <Image source={require('../../../assets/images/back_arrow.png')} style={{ height: 20, width: 20 }} />
                        </TouchableOpacity>
                        {this.state.fontLoaded ? <Text style={{ color: 'white', fontSize: 22, fontFamily: 'Quicksand-Medium' }}>Schedules</Text> : null}
                        <View style={{ width: '10%', height: '100%' }}>
                        </View>
                    </View>
                </View>
                <View style={{ marginTop: '5%' }}></View>
                <ScrollView>
                    <View style={{ marginLeft: '5%', marginRight: '5%', alignItems: 'center', justifyContent: 'center', }}>
                        {this.state.fontLoaded ?
                            <View style={{ width: '100%' }}>
                                <Text style={styles.header}>Mon, 08 October 2018</Text>
                                <FlatList data={[
                                    { key: '14', value: 'Plumbing Work - Water Heater' },
                                    { key: '15', value: 'Plumbing Work - Insert Text...' },
                                    { key: '16', value: 'Plumbing Work - Insert Text...' },
                                    { key: '17', value: 'Plumbing Work - Insert Text...' },
                                    { key: '18', value: 'Plumbing Work - Insert Text...' },
                                    { key: '19', value: 'Plumbing Work - Insert Text...' },
                                    { key: '20', value: 'Plumbing Work - Insert Text...' },
                                ]}
                                    renderItem={this.renderFlastListItems}
                                />
                            </View>
                            : null}
                        {/* <View style={{ alignItems: 'center', justifyContent: 'center', width: '80%', backgroundColor: 'blue' }}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('reviewRequest')}>
                                <Text>Review Request</Text>
                            </TouchableOpacity>
                        </View> */}
                    </View>
                </ScrollView>
                <CustomeFooterTab ref="footer"{...this.props} />
            </View>
        );
    }
    renderFlastListItems = ({ item }) => {
        return (
            <View>
                <View style={{ width: '100%', borderBottomWidth: 1, borderBottomColor: '#E1E1E1', paddingBottom: 5, paddingTop: 10, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', width: '90%', }}>
                            {
                                this.state.fontLoaded ?
                                    <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                                        <ImageBackground source={require('../../../assets/images/date-circle.png')} style={{ height: 40, width: 40, }}>
                                            {
                                                this.state.fontLoaded ?
                                                    <Text style={{ fontFamily: 'Quicksand-Regular', color: '#fff', fontSize: 20, paddingTop: 5, textAlign: 'center' }}>{item.key}</Text>
                                                    : null
                                            }
                                        </ImageBackground>
                                        <Text style={{ fontSize: 8, textAlign: 'center', fontFamily: 'Quicksand-Medium', color: '#565656' }}>Oct/Sun/18</Text>
                                    </View>
                                    : null
                            }
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('reviewRequest')}>
                                {this.state.fontLoaded ?

                                    <Text style={styles.item}>
                                        {item.value}
                                    </Text>
                                    : null
                                }
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: '10%', alignItems: 'flex-end', justifyContent: 'flex-end', marginBottom: 5, }}>
                            <Image source={require('../../../assets/images/green-circle.png')} style={{ height: 20, width: 20, }} />
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}
export default Schedules