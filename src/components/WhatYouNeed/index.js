import React, { Component } from 'react';
import { Text } from 'native-base';
import { TouchableOpacity, Image, View, Dimensions, AsyncStorage } from 'react-native'
import RF from "react-native-responsive-fontsize";
import { BackHandler } from "react-native";
import Swiper from 'react-native-swiper';
const { width } = Dimensions.get('window')

const styles = {
    container: {

        flex: 1,
        width: '80%',
        marginLeft: '10%',
        marginRight: '10%',
    },

    wrapper: {
    },

    slide: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },

    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
        // marginBottom: '50%'
        // borderColor: 'red',
        // borderWidth: 1,
    },

    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF'
    },

    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF'
    },

    text: {
        color: '#000',
        fontSize: 30,
        fontWeight: 'bold'
    },

    image: {
        width,
        flex: 1
    }
}
export class WhatYouNeed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fontLoaded: true,
            isIntroSkipped: 'false'
        }
        this.onBackPress = this.onBackPress.bind(this);
    }
    componentWillMount() {
        AsyncStorage.setItem("screenName", "whatYouNeed");
    }
    onBackPress() {
        this.props.navigation.navigate('letsGo');
        return true;
    }
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    }
    setIntroSkipped = () => {
        //console.log('function called...');
        this.setState({ isIntroSkipped: 'true' }, () => {
            //this.afterSetStateFinished();
            //console.log(this.state.isIntroSkipped);
            AsyncStorage.setItem("isIntroSkipped", this.state.isIntroSkipped,(err)=>{
                AsyncStorage.setItem("fromPage","",(err)=>{
                    this.props.navigation.navigate('start');
                });
            });
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Swiper style={styles.wrapper} height={800} horizontal={true} dot={<View style={{ backgroundColor: 'rgba(0,0,0,.2)', width: 5, height: 5, borderRadius: 4, marginLeft: 1, marginRight: 1, marginTop: 1, marginBottom: RF(4) }} />}
                    activeDot={<View style={{ backgroundColor: '#f8941e', width: 5, height: 5, borderRadius: 4, marginLeft: 1, marginRight: 1, marginTop: 1, marginBottom: RF(4) }}></View>}>
                    <View style={styles.slide1}>
                        <View style={{ alignItems: 'center', justifyContent: 'center', }}>
                            <View style={{ marginTop: RF(10) }}>
                                <Image source={require('../../../assets/images/img1.png')} style={{ height: 150, width: 150 }} />
                            </View>
                            <View style={{ marginTop: '21%' }}>
                                {this.state.fontLoaded ?
                                    <Text style={{ color: '#FF9A00', fontFamily: 'Quicksand-Bold', fontSize: 20, }}>
                                        What brings you in today?
                                    </Text>
                                    : null}
                            </View>
                        </View>
                        <View style={{ alignItems: 'center', justifyContent: 'center', }}>
                            {this.state.fontLoaded ?
                                <Text style={{ color: '#6B6B6B', fontFamily: 'Quicksand-Regular', fontSize: 15, textAlign: 'center', marginTop: '10%', }}>
                                    Let us know the basic information for the service
                                    you seek, and we would be glad to assist you
                                    further.
                                </Text>
                                : null}
                            {/* <View>
                                <TouchableOpacity onPress={() => { this.props.navigation.navigate('start'); }} style={{ marginTop: RF(15), }}>
                                    {this.state.fontLoaded ? <Image style={{ height: 50, width: 150 }} source={require('../../../assets/images/icon_skip_intro.png')} /> : null}
                                </TouchableOpacity>
                            </View> */}

                        </View>

                        {/* <View style={{ alignItems: 'center', justifyContent: 'center',}}>
                            <TouchableOpacity onPress={() => { console.log('clicked.'); }}>
                                {this.state.fontLoaded ? <Image style={{ height: 50, width: 150 }} source={require('../../../assets/images/icon_skip_intro.png')} /> : null}
                            </TouchableOpacity>
                        </View> */}
                        {/* <Text style={styles.text}>Hello Swiper</Text> */}

                    </View>

                    <View style={styles.slide2}>
                        <View style={{ alignItems: 'center', justifyContent: 'center', }}>
                            <View style={{ marginTop: RF(10) }}>
                                <Image source={require('../../../assets/images/img2.png')} style={{ height: 150, width: 150 }}/>
                            </View>
                            <View style={{ marginTop: '21%' }}>
                                {this.state.fontLoaded ?
                                    <Text style={{ color: '#FF9A00', fontFamily: 'Quicksand-Bold', fontSize: 20, }}>
                                        Choose from our experts
                                    </Text>
                                    : null}
                            </View>

                        </View>
                        <View style={{ alignItems: 'center', justifyContent: 'center', }}>
                            {this.state.fontLoaded ?
                                <Text style={{ color: '#6B6B6B', fontFamily: 'Quicksand-Regular', fontSize: 15, textAlign: 'center', marginTop: '10%', }}>
                                    Browse through the list of our service providers,
                                    select one that suits your needs. Make a
                                    booking, wait for the confirmation message.
                                </Text>
                                : null}
                            {/* <View>
                                <TouchableOpacity onPress={() => { this.props.navigation.navigate('start'); }} style={{ marginTop: RF(15), }}>
                                    {this.state.fontLoaded ? <Image style={{ height: 50, width: 150 }} source={require('../../../assets/images/icon_skip_intro.png')} /> : null}
                                </TouchableOpacity>
                            </View> */}

                        </View>
                    </View>
                    <View style={styles.slide3}>
                        <View style={{ alignItems: 'center', justifyContent: 'center', }}>
                            <View style={{ marginTop: RF(10) }}>
                                <Image source={require('../../../assets/images/img3.png')} style={{ height: 150, width: 150 }}/>
                            </View>
                            <View style={{ marginTop: '21%' }}>
                                {this.state.fontLoaded ?
                                    <Text style={{ color: '#FF9A00', fontFamily: 'Quicksand-Bold', fontSize: 20, }}>
                                        You are good to go
                                    </Text>
                                    : null}
                            </View>

                        </View>
                        <View style={{ alignItems: 'center', justifyContent: 'center', }}>
                            {this.state.fontLoaded ?
                                <Text style={{ color: '#6B6B6B', fontFamily: 'Quicksand-Regular', fontSize: 15, textAlign: 'center', marginTop: '10%', }}>
                                    Loosen up! Take time to indulge in some
                                    relaxation. Set aside your worries, it’s on us now.
                                </Text>
                                : null}
                            {/* <View>
                                <TouchableOpacity onPress={() => { this.props.navigation.navigate('start'); }} style={{ marginTop: RF(15), }}>
                                    {this.state.fontLoaded ? <Image style={{ height: 50, width: 150 }} source={require('../../../assets/images/icon_skip_intro.png')} /> : null}
                                </TouchableOpacity>
                            </View> */}

                        </View>
                    </View>
                </Swiper>
                <View style={{ height: RF(15) }}>
                    <TouchableOpacity onPress={() => { this.setIntroSkipped() }} style={{ marginTop: RF(1), alignItems: 'center', justifyContent: 'center' }}>
                        {this.state.fontLoaded ? <Image style={{ height: 50, width: 150 }} source={require('../../../assets/images/icon_skip_intro.png')} /> : null}
                    </TouchableOpacity>
                </View>
            </View>
        )

    }


}