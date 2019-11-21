import React, { Component } from 'react';
import styles from './styles';
import { View, Text, Image, TouchableOpacity, WebView, AsyncStorage } from 'react-native';
import { BackHandler } from "react-native";
import { valuePrivacyURL } from '../../Config'
import Spinner from 'react-native-loading-spinner-overlay';
import i18n from 'react-native-i18n';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
const mapStateToProps = (state) => ({
    languageCode: state.paymentSuccess.languageCode
});
const mapDispatchToProps = (dispatch) => bindActionCreators({

}, dispatch);
class PaymentSuccess extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fontLoaded: true,
            privacyPolicyURL: valuePrivacyURL,
            spinnerVisible: false,
            from: null
        }
        this.displaySpinner = this.displaySpinner.bind(this);
        this.setFromData = this.setFromData.bind(this);
        this.onBackPress = this.onBackPress.bind(this);
        this.navigationChanged = this.navigationChanged.bind(this);
    }

    componentWillMount() {
        if (this.props.navigation.state.params && this.props.navigation.state.params.data) {
            this.url = this.props.navigation.state.params.data;
            this.accessToken = this.props.navigation.state.params.accessToken;
        }
        AsyncStorage.setItem("screenName", "paymentSuccess");
        this.setFromData();
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
    setFromData() {
        if (this.props.navigation.state.params && this.props.navigation.state.params.from) {
            this.setState({ from: this.props.navigation.state.params.from })
        }
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
                        {this.state.fontLoaded ? <Text style={{ color: 'white', fontSize: 22, fontFamily: 'Quicksand-Medium' }}>{i18n.t("paypal")}</Text> : null}
                        <View style={{ width: '10%', height: '100%' }}>
                        </View>
                    </View>
                </View>
                <View style={{ marginTop: '5%', width: '100%', }}></View>
                <View style={{ height: '80%', width: '90%', marginLeft: '5%', marginRight: '5%' }}>
                    <WebView
                        source={{ uri: this.url }}
                        javaScriptEnabledAndroid={true}
                        thirdPartyCookiesEn abled={true}

                        scalesPageToFit
                        javaScriptEnabled
                        domStorageEnabled
                        startInLoadingState
                        mixedContentMode="always"
                        onNavigationStateChange={this.navigationChanged}
                    />
                </View>
                <View style={{ marginTop: '5%' }}></View>

                {this.state.spinnerVisible == true ?
                    <Spinner visible={this.state.spinnerVisible} color={"#ffffff"} overlayColor={"rgba(0, 0, 0, 0.75)"} />
                    : null}
            </View>
        );
    }
    navigationChanged(webUrl) {
        //console.log(webUrl.url);
        var completeUrl = webUrl.url;
        var simpleUrl = completeUrl.split('?')[0];
        if (simpleUrl == "https://chores.test.com/success") {
            this.props.navigation.navigate('reviewRequest', { successUrl: webUrl.url, accessToken: this.accessToken, flag: 'success', from: 'provider' });
        }
        else if (simpleUrl == "https://chores.test.com/fail") {
            this.props.navigation.navigate('reviewRequest', { successUrl: webUrl.url, accessToken: this.accessToken, flag: 'fail', from: 'provider' });
        }
        else {

        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PaymentSuccess)