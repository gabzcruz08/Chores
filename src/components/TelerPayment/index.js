import React, { Component } from 'react';
import styles from './styles';
import { View, Text, Image, TouchableOpacity, WebView } from 'react-native';
import { BackHandler } from "react-native";
import Toast, { DURATION } from 'react-native-easy-toast-fixed';
import Spinner from 'react-native-loading-spinner-overlay';
import i18n from 'react-native-i18n';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
window.DOMParser = require('xmldom').DOMParser;
const mapStateToProps = (state) => ({
    languageCode: state.telerPayment.languageCode
});
const mapDispatchToProps = (dispatch) => bindActionCreators({

}, dispatch);

class TelerPayment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fontLoaded: true,
            telerURL: '',
            spinnerVisible: false,
            from: null,
            code: ''
        }
        this.displaySpinner = this.displaySpinner.bind(this);
        this.setFromData = this.setFromData.bind(this);
        this.onBackPress = this.onBackPress.bind(this);
        this.navigationChanged = this.navigationChanged.bind(this);
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

    componentWillMount() {
        this.setFromData();

    }
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);

    }
    setFromData() {
        if (this.props.navigation.state.params) {
            this.setState({ from: this.props.navigation.state.params.from })
            this.setState({ telerURL: this.props.navigation.state.params.telerPaymentURL })
            this.setState({ code: this.props.navigation.state.params.telerPaymentCode })
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
                        {this.state.fontLoaded ? <Text style={{ color: 'white', fontSize: 22, fontFamily: 'Quicksand-Medium' }}>{i18n.t("teler")}</Text> : null}
                        <View style={{ width: '10%', height: '100%' }}>
                        </View>
                    </View>
                </View>
                <View style={{ marginTop: '5%', width: '100%', }}></View>
                <View style={{ height: '80%', width: '90%', marginLeft: '5%', marginRight: '5%' }}>
                    <WebView
                        source={{ uri: this.state.telerURL }}
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
            </View>
        );
    }
    navigationChanged(webUrl) {
        var completeUrl = webUrl.url;
        var simpleUrl = completeUrl.split('?')[0];
        if (simpleUrl == "https://secure.telr.com/gateway/webview_close.html") {
            // this.callTransactionNumber();
            this.props.navigation.navigate('reviewRequest', { successUrl: webUrl.url, flag: 'success', from: 'provider', code: this.state.code });
            // this.props.navigation.navigate('start', { successUrl: webUrl.url,, flag: 'success', from: 'telerPayment' });
        }
        else if (simpleUrl == "https://secure.telr.com/gateway/webview_abort.html") {
            this.refs.toast.show('Your payment was not successful. Please try again.', DURATION.LENGTH_LONG);
        }
        else {

        }
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(TelerPayment)