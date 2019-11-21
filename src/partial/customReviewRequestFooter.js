import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  AsyncStorage,
  Dimensions
} from "react-native";
import { Footer, FooterTab } from "native-base";
import RF from "react-native-responsive-fontsize";
import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import { Spinner } from "native-base";
import styles from "../components/ReviewRequest/styles";
import { paymentPaypal, CreateBooking } from "./action";
import i18n from "react-native-i18n";
import axios from "axios";
import { Platform } from "react-native";
import { Constants } from "expo";
window.DOMParser = require("xmldom").DOMParser;

export class CustomReviewRequestFooterTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spinnerVisible: false,
      accessToken: "",
      amount: "",
      paymentResponse: {},
      userName: "",
      passWord: ""
    };
    this.getToken = this.getToken.bind(this);
    this.setData = this.setData.bind(this);
  }
  componentWillMount() {
    this.setData();
  }
  setData() {
    AsyncStorage.multiGet([
      "selectedService",
      "paypal_client_id",
      "paypal_secret",
      "loggedInUserObj",
      "price",
      "telr_payment_mode_test",
      "telr_store_id",
      "telr_mobile_api_auth_key"
    ]).then(value => {
      //console.log('inside paypal secret.');
      var serviceData = value[0][1] ? JSON.parse(value[0][1]) : null;
      var userId = value[1][1] ? value[1][1] : null;
      var passWord = value[2][1] ? value[2][1] : null;
      this.loggedInObj = value[3][1] ? JSON.parse(value[3][1]) : null;
      this.priceValue = value[4][1] ? value[4][1] : null;
      this.paymentMode = value[5][1] ? parseInt(value[5][1]) : null;
      this.storeId = value[6][1] ? value[6][1] : null;
      this.authKey = value[7][1] ? value[7][1] : null;
      this.setState(
        {
          amount: serviceData.SelectedService.price,
          userName: userId,
          passWord: passWord
        },
        () => { }
      );
    });
  }
  render() {
    return (
      <Footer style={{ height: RF(11), marginBottom: 0, marginTop: "auto" }}>
        <FooterTab
          style={{
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#ffaa1a"
          }}
        >
          <View
            style={{
              width: "50%",
              flex: 1,
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <TouchableOpacity
              style={{ alignItems: "center", justifyContent: "center" }}
              // onPress={() => this.props.navigation.navigate('thankYou')}
              onPress={() => this.getToken()}
            >
              <Entypo name="credit-card" size={32} color="white" />
              <Text
                style={{
                  fontSize: 10,
                  color: "#fff",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                {i18n.t("teler")}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ width: "2%" }}>
            <Text style={{ color: "#fff" }}>|</Text>
          </View>
          <View
            style={{
              width: "48%",
              flex: 1,
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <TouchableOpacity
              style={{ alignItems: "center", justifyContent: "center" }}
              onPress={() => {
                // if (this.props.CreateBooking) {
                AsyncStorage.multiGet([
                  "bookingObj",
                  "loggedInUserObj",
                  "selectedService",
                  "selectedCompany",
                  "favCompanyId",
                  "price",
                  "companyInfo"
                ]).then(data => {
                  var bookgObj = data[0][1] ? JSON.parse(data[0][1]) : null;
                  var userData = data[1][1] ? JSON.parse(data[1][1]) : null;
                  var serviceData = data[2][1] ? JSON.parse(data[2][1]) : null;
                  var companyData = data[3][1] ? JSON.parse(data[3][1]) : null;
                  var favCompanyId = data[4][1] ? JSON.parse(data[4][1]) : null;
                  var price = data[5][1];
                  var companyInfo = data[6][1] ? JSON.parse(data[6][1]) : null;
                  if (!userData) {
                    this.props.navigation.navigate('start', { from: 'guest' });
                    // this.props.setStateLogintrue();
                  } else {
                    if (companyData != null) {
                      bookgObj.companyId = companyData.SelectedCompany.id;
                    } else if (companyInfo != null) {
                      bookgObj.companyId = companyInfo.id;
                    } else {
                      bookgObj.companyId = favCompanyId;
                    }
                    this.setState({ spinnerVisible: true });
                    bookgObj.user_id = userData.id;
                    // bookgObj.companyId = companyData && companyData.SelectedCompany ? companyData.SelectedCompany.id : favCompanyId;
                    bookgObj.transaction_id = null;
                    // bookgObj.price = companyData && companyData.SelectedCompany ? companyData.SelectedCompany.price : serviceData && serviceData.SelectedService ? serviceData.SelectedService.price : 0;
                    bookgObj.price = parseInt(price);
                    bookgObj.payment_method = "cash_on_delivery";
                    bookgObj.payment_status = "Pending";
                    this.loggedInObj = userData;
                    CreateBooking(
                      bookgObj,
                      userData.remember_token,
                      scs => {
                        //console.log(scs);
                        this.setState({ spinnerVisible: false });
                        AsyncStorage.removeItem("companyInfo");
                        this.props.navigation.navigate("thankYou");
                      },
                      err => {
                        this.props.openConfirmModal(err);
                        //alert(err);
                        this.setState({ spinnerVisible: false });
                      }
                    );
                  }
                });

                // }
              }}
            >
              <MaterialCommunityIcons
                name="square-inc-cash"
                size={32}
                color="white"
              />
              {/* <Image source={require('../../assets/images/icon_notification.png')} style={{ height: RF(4), width: RF(4) }}></Image> */}
              <Text
                style={{
                  fontSize: 10,
                  color: "#fff",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                {i18n.t("cash")}
              </Text>
            </TouchableOpacity>
          </View>
        </FooterTab>
        {this.state.spinnerVisible ? (
          <View
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              width: "100%",
              backgroundColor: "rgba(0,0,0,0.6)"
            }}
          >
            <Spinner color="#fff" />
          </View>
        ) : null}
      </Footer>
    );
  }
  getToken() {
    AsyncStorage.getItem("loggedInUserObj").then((success) => {
      var loggedInData = JSON.parse(success);
      if (!loggedInData) {
        this.props.navigation.navigate('start', { from: 'guest' });
      }
      else {
        const url = `https://secure.innovatepayments.com/gateway/mobile.xml`;
        var cartId = parseInt(Math.floor(Date.now() / 1000));

        console.log("IOS Build Number ==> " + Constants.manifest.ios.buildNumber);
        console.log("IOS Bundle identified ==> " + Constants.manifest.ios.bundleIdentifier);

        let param =
          `
<?xml version="1.0" encoding="UTF-8"?>
<mobile>
<store>${this.storeId}</store>
<key>${this.authKey}</key>
<device>
  <type>${Platform.OS}</type>
  <id>${Constants.deviceId}</id>
  <agent></agent>
  <accept></accept>
</device>
<app>
  <name>Chores</name>
  <version>${
          Platform.OS == "ios"
            ? Constants.manifest.ios.buildNumber
            : Platform.OS == "android"
              ? Constants.manifest.android.versionCode
              : ""
          }</version>
  <user>${this.loggedInObj.id}</user>
  <id>${this.loggedInObj.id}</id>
</app>
<tran>
  <test>${this.paymentMode}</test>
  <type>PAYPAGE</type>
  <class></class>
  <cartid>${cartId}</cartid>
  <description>Chores-${cartId.toString()}-New Order from mobile app</description>
  <currency>AED</currency>
  <amount>${parseFloat(this.priceValue).toFixed(2)}</amount>
  <ref></ref>
</tran>
<billing>
  <name>
    <first>${this.loggedInObj.first_name}</first>
    <last>${this.loggedInObj.last_name}</last>
  </name>
  <email>${this.loggedInObj.email}</email>
</billing>
</mobile>`;
        console.log("Teler payment request params ==>" + param);
        const request = axios
          .post(url, param, {
            headers: {
              "Content-Type": "text/xml"
              // accept: "application/json; charset=utf-8"
            }
          })

          .then(data => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data.data);
            this.props.navigation.navigate("telerPayment", {
              telerPaymentURL: xmlDoc.getElementsByTagName("start")[0].childNodes[0]
                .nodeValue,
              from: "reviewRequest",
              telerPaymentCode: xmlDoc.getElementsByTagName("code")[0].childNodes[0]
                .nodeValue
            });
          })
          .catch(error => {
            console.log("telrPayment", error);
          });
      }
    });
  }
}
