import React, { Component } from 'react';
import styles from './styles';
import { View, Text, Image, TouchableOpacity, WebView, AsyncStorage } from 'react-native';
import { valueTermsAndConditionURL } from '../../Config'
import Spinner from 'react-native-loading-spinner-overlay';
import { BackHandler } from "react-native";
import i18n from 'react-native-i18n';
class TermsAndConditions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fontLoaded: true,
            termsAndConditionURL: valueTermsAndConditionURL,
            spinnerVisible: false,
            from: null
        }
        this.displaySpinner = this.displaySpinner.bind(this);
        this.setFromData = this.setFromData.bind(this);
        this.onBackPress = this.onBackPress.bind(this);
    }

    componentWillMount() {
        AsyncStorage.setItem("screenName", "termsandconditions");
        this.setFromData();
    }
    setFromData() {
        if (this.props.navigation.state.params && this.props.navigation.state.params.from) {
            this.setState({ from: this.props.navigation.state.params.from })
        }
    }
    onBackPress() {
        if (this.state.from) {
            this.props.navigation.navigate(this.state.from);
        }
        else {
            this.props.navigation.navigate('dashBoard');
        }
        return true;
    }
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    }
    displaySpinner() {
        return (
            <View>
                {/* Your spinner code goes here. 
              This one commes from react-native-material-kit library */}
                <Spinner visible={this.state.spinnerVisible} color={"#ffffff"} overlayColor={"rgba(0, 0, 0, 0.75)"} />
            </View>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.ImageParentView}>
                    <View style={styles.ImageUpperView}></View>
                    <View style={styles.ImageView}>
                        <TouchableOpacity style={{ marginLeft: 15 }} onPress={() => {
                            this.onBackPress();
                        }} hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                            <Image source={require('../../../assets/images/back_arrow.png')} style={{ height: 20, width: 20 }} />
                        </TouchableOpacity>
                        {this.state.fontLoaded ? <Text style={{ color: 'white', fontSize: 22, fontFamily: 'Quicksand-Medium' }}>{i18n.t("termsConditions")}</Text> : null}
                        <View style={{ width: '10%', height: '100%' }}>
                        </View>
                    </View>
                </View>
                <View style={{ marginTop: '5%', width: '100%', }}></View>
                <View style={{ height: '80%', width: '90%', marginLeft: '5%', marginRight: '5%' }}>
                    <WebView
                        source={{ uri: this.state.termsAndConditionURL }}
                        javaScriptEnabledAndroid={true}
                        thirdPartyCookiesEn abled={true}
                        scalesPageToFit
                        javaScriptEnabled
                        domStorageEnabled
                        startInLoadingState
                        mixedContentMode="always"
                    />
                </View>
                <View style={{ marginTop: '5%' }}></View>

                {this.state.spinnerVisible == true ?
                    <Spinner visible={this.state.spinnerVisible} color={"#ffffff"} overlayColor={"rgba(0, 0, 0, 0.75)"} />
                    : null}
            </View>
        );
    }
}
export default TermsAndConditions