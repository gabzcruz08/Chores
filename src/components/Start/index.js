import React, { Component } from 'react'
import RF from "react-native-responsive-fontsize";
import Modal from 'react-native-modalbox'
import { TextInput, View, Image, AsyncStorage, TouchableOpacity, Alert, Platform, ScrollView, KeyboardAvoidingView } from 'react-native'
import { Root, Text, Button, Item, Input, Label, Spinner } from 'native-base'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Expo, { AppLoading, Notifications } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import * as Permissions from 'expo-permissions';

import styles from './styles'
import { verifyUserLogin, setUserLogin, verifyFacebookLogin, forgotPassword, register, resendVerificationLink } from './actions'
import Icon from 'react-native-vector-icons/Ionicons';
import HTML from 'react-native-render-html';
//import Toast from 'react-native-simple-toast'
// import Modal from "react-native-simple-modal";
import Toast, { DURATION } from 'react-native-easy-toast-fixed';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';


import i18n from 'react-native-i18n';
import Loading from '../LoginLoading'

/* Propriedades a serem utilizadas na classe */
const mapStateToProps = (state) => ({
  //user: state.user
})

/* Actions a serem utilizadas na classe */
const mapDispatchToProps = (dispatch) => bindActionCreators({
  verifyUserLogin,
  verifyFacebookLogin,
  setUserLogin,
  forgotPassword,
  register,
  resendVerificationLink,
}, dispatch)

class Start extends Component {

  constructor(props) {
    super(props)
    this.state = {
      rotate: null,
      viewVisible: false,
      email: '',
      password: '',
      rememberMe: false,
      autoFocus: false,
      isReady: false,
      fontLoaded: false,
      checked: false,
      _renderTextInputs: null,
      visible: false,
      isModalVisible: false,
      isChangePasswordVisible: false,
      newPassword: '',
      confirmPassword: '',
      deviceType: "",
      deviceToken: "",
      loginView: true,
      registerView: false,
      firstName: '',
      lastName: '',
      registerEmail: '',
      registerPassWord: '',
      phone: '',
      errorFirstName: '',
      errorLastName: '',
      errorEmail: '',
      errorPassword: '',
      errorConfirmPassword: '',
      errorPhoneNumber: '',
      messages: [],
      from: null,
      spinnerVisible: false,
      loginCheckDone: false,
      isConfirmEmailModalVisible: false,
      isResendVerificationModalVisible: false,
      showPasswordIconLogin: <Entypo name="eye-with-line" size={25} color="#fff" onPress={() => this.hideShowPasswordLogin()} />,
      passwordSecureTextEntryLogin: true,
      showPasswordIconRegister: <Entypo name="eye-with-line" size={25} color="#fff" onPress={() => this.hideShowPasswordRegister()} />,
      passwordSecureTextEntryRegister: true,
      showConfirmPasswordIconRegister: <Entypo name="eye-with-line" size={25} color="#fff" onPress={() => this.hideShowConfirmPasswordRegister()} />,
      confirmpasswordSecureTextEntryRegister: true,
      disableForgotPasswordButton: false,
    }


    this.loginInButton = this.loginInButton.bind(this)
    this.forgotPassword = this.forgotPassword.bind(this)
    this._setRememberMe = this._setRememberMe.bind(this)
    this.signUpButton = this.signUpButton.bind(this)
    this.validateEmail = this.validateEmail.bind(this)
    this.fillRegisterAndGo = this.fillRegisterAndGo.bind(this)
    this._setDeviceTypeAndDeviceToken = this._setDeviceTypeAndDeviceToken.bind(this);
    this.openRegisterView = this.openRegisterView.bind(this);
    this.functionRenderView = this.functionRenderView.bind(this);
    this.registerUser = this.registerUser.bind(this);
    this.setFrom = this.setFrom.bind(this);
    this.openLoginView = this.openLoginView.bind(this);
    this.resendVerificationLink = this.resendVerificationLink.bind(this);

    this.hideShowPasswordLogin = this.hideShowPasswordLogin.bind(this);
    this.hideShowPasswordRegister = this.hideShowPasswordRegister.bind(this);
    this.hideShowConfirmPasswordRegister = this.hideShowConfirmPasswordRegister.bind(this);


  }

  componentWillMount() {
    Font.loadAsync({
      'Lato': require('../../../assets/fonts/Lato2OFL/Lato-Regular.ttf'),
    }).then(() => {
      this.setState({ fontLoaded: true });
    });
    AsyncStorage.setItem("screenName", "start");
    if (this.props.navigation.state.params && this.props.navigation.state.params.from) {
      if (this.props.navigation.state.params.from === "reviewRequest") {
        this.setFrom(this.props.navigation.state.params.from);
      }
      if (this.props.navigation.state.params.from === "guest") {
        this.setState({ registerView: true });
        this.setState({ loginView: false });
        this.setFrom(this.props.navigation.state.params.from);
      }
    }
    AsyncStorage.getItem("loggedInUserObj").then((value) => {
      if (value != null) {
        this.props.navigation.navigate('dashBoard', { loggedInObject: value });
      }
    });
  }
  setFrom(data) {
    this.setState({ from: data });
  }
  componentDidMount() {
    this._setRememberMe();
    this._setDeviceTypeAndDeviceToken();
  }


  hideShowPasswordLogin() {
    var passwordSecureTextEntryLogin = this.state.passwordSecureTextEntryLogin;
    var newPasswordIconHidePassword = <Entypo name="eye" size={25} color="#fff" onPress={() => this.hideShowPasswordLogin()} />;
    var newPasswordIconShowPassword = <Entypo name="eye-with-line" size={25} color="#fff" onPress={() => this.hideShowPasswordLogin()} />;
    if (passwordSecureTextEntryLogin == true) {
      this.setState({ showPasswordIconLogin: newPasswordIconHidePassword, passwordSecureTextEntryLogin: false });
    }
    else {
      this.setState({ showPasswordIconLogin: newPasswordIconShowPassword, passwordSecureTextEntryLogin: true });
    }
  }


  hideShowPasswordRegister() {
    var passwordSecureTextEntryRegister = this.state.passwordSecureTextEntryRegister;
    var newPasswordIconHidePassword = <Entypo name="eye" size={25} color="#fff" onPress={() => this.hideShowPasswordRegister()} />;
    var newPasswordIconShowPassword = <Entypo name="eye-with-line" size={25} color="#fff" onPress={() => this.hideShowPasswordRegister()} />;
    if (passwordSecureTextEntryRegister == true) {
      this.setState({ showPasswordIconRegister: newPasswordIconHidePassword, passwordSecureTextEntryRegister: false });
    }
    else {
      this.setState({ showPasswordIconRegister: newPasswordIconShowPassword, passwordSecureTextEntryRegister: true });
    }
  }



  hideShowConfirmPasswordRegister() {
    var confirmpasswordSecureTextEntryRegister = this.state.confirmpasswordSecureTextEntryRegister;
    var newPasswordIconHidePassword = <Entypo name="eye" size={25} color="#fff" onPress={() => this.hideShowConfirmPasswordRegister()} />;
    var newPasswordIconShowPassword = <Entypo name="eye-with-line" size={25} color="#fff" onPress={() => this.hideShowConfirmPasswordRegister()} />;
    if (confirmpasswordSecureTextEntryRegister == true) {
      this.setState({ showConfirmPasswordIconRegister: newPasswordIconHidePassword, confirmpasswordSecureTextEntryRegister: false });
    }
    else {
      this.setState({ showConfirmPasswordIconRegister: newPasswordIconShowPassword, confirmpasswordSecureTextEntryRegister: true });
    }
  }


  async _setDeviceTypeAndDeviceToken() {
    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync();
    this.setState({ deviceToken: token });
    this.setState({ deviceType: Platform.OS });
  }

  _setRememberMe() {
    let rememberMe = '';
    let userEmail = '';
    let userPassword = '';
    AsyncStorage.multiGet(['rememberMe', 'userEmail', 'userPassword']).then((data) => {
      rememberMe = data[0][1];
      if (rememberMe === "true" || rememberMe == "true") {
        this.setState({ checked: true });
        userEmail = data[1][1];
        userPassword = data[2][1];
        this.setState({ email: userEmail });
        //this.setState({ password: userPassword });
      }
      return false
    });
  }


  forgotPassword() {
    this.props.navigation.navigate('forgotpassword');
  }

  signUpButton() {
    this.props.navigation.navigate('register');
  }

  validateEmail(text) {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      this.setState({ validateEmail: "false" })
      return "false";
    }
    else {
      this.setState({ validateEmail: 'true' })
      return 'true'
    }
  }


  loginInButton = async () => {
    this.setState({ spinnerVisible: true });
    this.setState({ showLoading: true });
    this.setState({ loginView: true });
    this.setState({ registerView: false });
    let valOfChecked = this.state.checked;
    let email = this.state.email;
    let password = this.state.password;
    this.setState({ visible: true });
    if (email != "" && password != "") {
      var emailValidate = this.validateEmail(email);
      if (emailValidate == "true" || emailValidate === "true") {
        AsyncStorage.setItem("rememberMe", "true");
        AsyncStorage.setItem("userEmail", this.state.email);
        AsyncStorage.setItem("userPassword", this.state.password);
        this.props.verifyUserLogin(this.state.email, this.state.password, (this.state.deviceType != "" ? this.state.deviceType : 'android'), (this.state.deviceToken != "" ? this.state.deviceToken : 'ahsjshjsgaasssssssssssasdffsf'),
          (data) => {
            this.setState({ spinnerVisible: true });
            var dataNew = data.success_data;
            var userName = dataNew.user_name;
            var loginId = JSON.stringify(dataNew['id']);
            AsyncStorage.setItem("userId", loginId);
            AsyncStorage.setItem("loggedInUserObj", JSON.stringify(dataNew)).then(() => {
            })
              .catch((error) => {
                console.log(error);
              });
            AsyncStorage.setItem("accessToken", dataNew.remember_token);
            var jsonData = JSON.stringify(dataNew);
            //console.log(dataNew);
            if (dataNew.role[0].name === "Customer") {
              if (this.state.from) {
                this.props.navigation.navigate(this.state.from);
              }
              else {
                this.props.navigation.navigate('dashBoard', { loggedInObject: jsonData });
              }
            }
            else if (dataNew.role[0].name === "Agent") {
              this.props.navigation.navigate('agentScheduleCalendar', { loggedInObject: jsonData });
            }
          },
          (err) => {
            console.log(err);
            var verifiedError = '';
            this.setState({ spinnerVisible: false });
            if (err.response.data.email_verified_at === null) {
              verifiedError = err.response.data.error_data;
              this.user_id = err.response.data.id;
              this.refs.resendVerificationLinkModal.open();
              return;
            }
            var loginError1 = i18n.t("InvalidCredentialMeg");
            this.setState({ loginError1: loginError1 });
            this.refs.toast.show(loginError1, DURATION.LENGTH_SHORT);
          })
      }
      else {
        var loginError1 = i18n.t("validEmailErr");
        this.setState({ spinnerVisible: false });
        this.setState({ loginError1: loginError1 });
        this.refs.toast.show(loginError1, DURATION.LENGTH_SHORT);
      }
      this.setState({ visible: false });
    }
    else {
      this.setState({ visible: false });
      this.setState({ spinnerVisible: false });
      var loginError1 = i18n.t("requireEmailPassword");

      this.setState({ loginError1: loginError1 });
      this.refs.toast.show(loginError1, DURATION.LENGTH_SHORT);
    }
  }

  loginInWithFacebook() {
  }
  openRegisterView = async () => {
    this.setState({ messages: [] });
    this.setState({ registerView: true });
    this.setState({ loginView: false });
    this.renderRegisterView();
  }
  openLoginView = async () => {
    this.setState({ registerView: false });
    this.setState({ loginView: true });
  }

  registerUser = async () => {
    this.setState({ spinnerVisible: true });
    this.setState({ messages: [] });
    this.setState({ registerView: true });
    this.setState({ loginView: false });
    this.setState({ errorFirstName: '' });
    this.setState({ errorLastName: '' });
    this.setState({ errorEmail: '' });
    this.setState({ errorPassword: '' });
    this.setState({ errorConfirmPassword: '' });
    this.setState({ errorPhoneNumber: '' });
    var valid = true;
    // var rows = this.checkValidation();
    if (this.state.firstName == "") {
      this.setState({ errorFirstName: i18n.t('FirstNameErr') });
      valid = false;
    }
    if (this.state.lastName == "") {
      this.setState({ errorLastName: i18n.t('LastNameErr') });
      valid = false;
    }
    if (this.state.registerEmail == "") {
      this.setState({ errorEmail: i18n.t('EmailErr') });
      valid = false;
    }
    if (this.state.registerPassWord == "") {
      this.setState({ errorPassword: i18n.t('PasswdErr') });
      valid = false;
    }
    if (this.state.confirmPassword == "") {
      this.setState({ errorConfirmPassword: i18n.t('ConfirmPasswdErr') });
      valid = false;
    }
    if (this.state.phone == "") {
      this.setState({ errorPhoneNumber: i18n.t('PhoneErr') });
      valid = false;
    }

    if (valid == false) {
      this.setState({ spinnerVisible: false });
      return;
    }
    else {
      if (this.state.registerEmail != "") {
        var valid = this.validateEmail(this.state.registerEmail);
        if (valid == "false") {
          this.setState({ errorEmail: i18n.t('InvalidEmail') });
          this.setState({ spinnerVisible: false });
          return;
        }
      }
      if (this.state.registerPassWord != this.state.confirmPassword) {
        this.setState({ errorConfirmPassword: i18n.t('PasswdMatchErr') });
        this.setState({ spinnerVisible: false });
        return;
      }

      this.setState({ errorFirstName: '' });
      this.setState({ errorLastName: '' });
      this.setState({ errorEmail: '' });
      this.setState({ errorPassword: '' });
      this.setState({ errorConfirmPassword: '' });
      this.setState({ errorPhoneNumber: '' });
      this.props.register(this.state.firstName, this.state.lastName, this.state.phone, this.state.registerEmail, this.state.registerPassWord, (this.state.deviceType != "" ? this.state.deviceType : 'android'), (this.state.deviceToken != "" ? this.state.deviceToken : 'ahsjshjsgaasssssssssssasdffsf'),
        (data) => {
          this.setState({ spinnerVisible: false });
          var dataNew = data.success_data;
          //console.log("Login obj data new ", dataNew['id']);
          AsyncStorage.setItem("rememberMe", "true");
          AsyncStorage.setItem("userEmail", dataNew.email);
          AsyncStorage.setItem("userPassword", "");
          AsyncStorage.setItem("userId", dataNew.id);
          AsyncStorage.setItem("accessToken", dataNew.remember_token);
          // AsyncStorage.setItem("loggedInUserObj", JSON.stringify(dataNew));
          this.setState({ isConfirmEmailModalVisible: true });
          this.refs.verificationEmail.open();
          // AsyncStorage.setItem("loggedInUserObj", JSON.stringify(dataNew)).then(() => {
          //   console.log('saved');
          // })
          //   .catch((error) => {
          //     console.log(error);
          //   });
          //AsyncStorage.setItem("accessToken", dataNew.remember_token);
          var jsonData = JSON.stringify(dataNew);
          // console.log(dataNew);
          // this.props.navigation.navigate('dashBoard', { loggedInObject: jsonData });


        },
        (err) => {
          //console.log('else');
          // var loginError1 = 'Something went wrong, please try again.';
          var loginError1 = '';
          this.setState({ spinnerVisible: false }, () => {
            console.log(err.data);
            if (err.data.status == "error") {

              if (err.data.error_data.first_name != null) {
                loginError1 = err.data.error_data.first_name[0];
              }
              else if (err.data.error_data.last_name != null) {
                loginError1 = err.data.error_data.last_name[0];
              }
              else if (err.data.error_data.email != null) {
                loginError1 = err.data.error_data.email[0];
              }
              else if (err.data.error_data.phone != null) {
                loginError1 = err.data.error_data.phone[0];
              }
              else if (err.data.error_data.password != null)
                loginError1 = err.data.error_data.password[0];
            }
            else {
              loginError1 = i18n.t('somethingWrong');
            }
            // this.refs.toast.show(loginError1, DURATION.FOREVER);
            //Toast.show(loginError1, Toast.BOTTOM);
            // Toast.show({
            //   text: loginError1,
            // })
            this.setState({ loginError1: loginError1 });
            this.refs.toast.show(loginError1, DURATION.LENGTH_SHORT);
          });

        });
    }
  }
  renderCustomCheckbox() {

    if (this.state.rememberMe) {
      return <Button transparent light
        onPress={() => {
          this.setState({ rememberMe: false })
        }}>
        <Icon style={styles.login.rememberChk} size={25} name="md-checkbox-outline" color="white" />
      </Button>
    }
    else {
      return <Button transparent light
        onPress={() => {
          this.setState({ rememberMe: true })
        }}>
        <Icon style={styles.login.rememberChk} size={25} name="md-square-outline" color="white" />
      </Button>
    }
  }



  fillRegisterAndGo(response, token) {
    //console.log('response');
    //console.log(response);
    //console.log('token');
    //console.log(token);
    // const date = moment(response.birthday, 'MM/DD/YYYY', true)

    // this.props.fieldFilled('first_name', response.first_name)
    // this.props.fieldFilled('last_name', response.last_name)
    // this.props.fieldFilled('email', response.email)
    // this.props.fieldFilled('birthday', date.format('YYYY/MM/DD'))
    // this.props.fieldFilled('facebook_id', response.id)
    // this.props.fieldFilled('facebook_secret', token)

    // const reset = NavigationActions.reset({
    //   index: 0,
    //   actions: [NavigationActions.navigate({ routeName: 'register', params: { response: response, token: token } })]
    // })
    // this.props.navigation.dispatch(reset) 

    // this.props.navigation.navigate('register', {
    //   response: response, token: token
    // });

    //this.props.navigation.navigate('register', { 'keepData': true })
    this.props.navigation.navigate('register', { response: response, token: token })
  }


  async _cacheResourcesAsync() {
    const images = [
      // require('./images/landingscreen.png'),
      // require('./images/logo_white.png'),
    ];

    const cacheImages = images.map((image) => {
      return Asset.fromModule(image).downloadAsync();
    });
    return Promise.all(cacheImages)

  }


  _storeData = async (data) => {
    try {
      await AsyncStorage.setItem("userId", data.Id);
      await AsyncStorage.setItem("userFirstName", data.FirstName);
      await AsyncStorage.setItem("userLastName", data.LastName);
      await AsyncStorage.setItem("noStoryAlertCount", "0");
    } catch (error) {
      // Error saving data
    }
  }

  async facebookLogin() {
    const ADD_ID = '531680650642358'

    let options = {}
    options = {
      //permissions: ['public_profile', 'email', 'user_birthday'],
      permissions: ['public_profile', 'email']
    }

    const {
      type,
      token,
    } = await Expo.Facebook.logInWithReadPermissionsAsync(ADD_ID, options)

    if (type === 'success') {
      const url = `https://graph.facebook.com/me?access_token=${token}`
      const fields = '&fields=email,first_name,last_name,birthday,picture.type(large)'
      //const fields = '&fields=email,first_name,last_name,birthday,picture.width(500).height(500)'
      //console.log(`${url}${fields}`);
      const response = await fetch(`${url}${fields}`).then((re) => re.json())
      //console.log(response);

      if (!response.email) {
        console.log('Error response in facebook login', response);
        // Toast.show({
        //   text: "We cannot connect to your facebook account. But you can still login with your Chores account or register with us.",
        //   // buttonText: 'Okay'
        // })
        //Toast.show("We cannot connect to your facebook account. But you can still login with your Chores account or register with us.", Toast.BOTTOM);
        return
      }
      else {

        //console.log("Else called");
        this.props.verifyFacebookLogin(
          response.first_name,
          response.last_name,
          response.email,
          response.id,
          this.state.deviceType,
          this.state.deviceToken,
          (data) => {

            //console.log("Logon response data is ", data);
            AsyncStorage.setItem("rememberMe", "true");
            AsyncStorage.setItem("userEmail", data.email);
            AsyncStorage.setItem("userPassword", "");
            AsyncStorage.setItem("userId", data.id);
            AsyncStorage.setItem("accessToken", data.remember_token);
            AsyncStorage.setItem("loggedInUserObj", JSON.stringify(data));
            if (this.state.from) {
              this.props.navigation.navigate(this.state.from);
            }
            else {
              this.props.navigation.navigate('dashBoard', { userName: response.email })
            }


          },
          (err) => {

            // Toast.show({
            //   text: "Some error occure while login, Please try again",
            //   // buttonText: 'Okay'
            // })
            //Toast.show("Some error occure while login, Please try again", Toast.BOTTOM);
          });

      }
      //console.log("isRegistered");
      //console.log(isRegistered);
      //console.log(response);
      // if (!isRegistered) {
      //   this.fillRegisterAndGo(response, token)
      // }
      // else {
      //   this.props.navigation.navigate('home')
      //   //this.props.navigation.navigate('register')
      //   //this.props.navigation.navigate('register', { email: response.email, firstName: response.first_name, lastName: response.last_name })
      // }
    }
  }
  openModal() {
    this.setState({ disableForgotPasswordButton: false });
    this.setState({ isModalVisible: true })
    this.refs.modal3.open();

  }
  closeModel() {
    this.setState({ isModalVisible: false })
    this.refs.modal3.close();

  }
  sendResetLink() {
    this.setState({ disableForgotPasswordButton: true });
    let email = this.state.email;
    this.setState({ visible: true });
    this.setState({ spinnerVisible: true });

    if (email != "") {
      var emailValidate = this.validateEmail(email);
      if (emailValidate == "true" || emailValidate === "true") {
        this.props.forgotPassword(this.state.email,
          (data) => {
            if (data.status == "success") {

              this.setState({ isModalVisible: false })
              this.refs.modal3.close();
              this.setState({ spinnerVisible: false });
              // Toast.show(data.success_data, Toast.BOTTOM);
              this.refs.toast.show(data.success_data, DURATION.LENGTH_SHORT);
            }

          },
          (err) => {
            console.log(err.data);
            this.setState({ spinnerVisible: false });
            var loginError1 = i18n.t("resetPasswordFail");
            // ToastAndroid.show(loginError1, ToastAndroid.LONG, ToastAndroid.BOTTOM);
            // Toast.show({
            //   text: loginError1,
            // })
            this.refs.modal3.close();
            this.setState({ loginError1: loginError1 });
            this.refs.toast.show(loginError1, DURATION.LENGTH_SHORT);
          })
      }
      else {
        this.setState({ spinnerVisible: false });
        var loginError1 = i18n.t("validEmailErr");
        // Toast.show(loginError1, Toast.BOTTOM);
        this.setState({ loginError1: loginError1 });
        this.refs.toast.show(loginError1, DURATION.LENGTH_SHORT);
        // ToastAndroid.show(loginError1, ToastAndroid.LONG, ToastAndroid.BOTTOM);
        // Toast.show({
        //   text: loginError1,
        //   position: 'bottom',
        //   type: 'warning'
        // });
      }
      this.setState({ visible: false });
    }
    else {
      this.setState({ spinnerVisible: false });
      this.setState({ visible: false });
      var loginError1 = i18n.t("requireEmailErr");
      // Toast.show({
      //   text: 'Email is required.',
      //   position: 'bottom',
      //   type: 'warning'
      // });

      this.setState({ loginError1: loginError1 });
      this.refs.toast.show(loginError1, DURATION.LENGTH_SHORT);
      // ToastAndroid.show(loginError1, ToastAndroid.LONG, ToastAndroid.BOTTOM);
    }
  }
  resendVerificationLink() {
    this.props.resendVerificationLink(this.user_id, i18n.locale,
      (data) => {
        if (data.status == "success") {
          this.refs.resendVerificationLinkModal.close();
          this.refs.toast.show(data.success_data);
        }
      },
      (error) => {
        console.log(error);
        this.refs.resendVerificationLinkModal.close();
        this.refs.toast.show(error.error_data);
      });
  }
  render() {
    //console.log(Platform.OS);
    var actionfontSize = 0;
    var actionButtonmarginTop = 0;
    if (Platform.OS == "ios") {
      actionfontSize = RF(2);
      actionButtonmarginTop = "15%";
    }
    else {
      actionfontSize = RF(2.3);
      actionButtonmarginTop = "12.5%";
    }
    const bottomstring = "<p  style='color:white;text-align:center'>By creating or logging into an account you're agreeing with our, <b>Terms & Conditions</b> and <b>Privacy Statement</b></p>";
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._cacheResourcesAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }
    if (this.state.loginCheckDone == false) {
      AsyncStorage.getItem("loggedInUserObj").then((value) => {
        if (value != null) {
          this.props.navigation.navigate('dashBoard', { loggedInObject: value });
        }
        this.setState({ loginCheckDone: true });
      });
      return (
        <Loading />
      )
    }
    else {
      return (
        <View style={styles.mainView}>

          <Modal style={[styles.modal, styles.modal3]}
            backdrop={true}
            position={"top"}
            ref={"modal3"}
            visible={this.state.isModalVisible}>
            <View style={styles.forgotPasswordModal}>
              <View style={styles.forgotPasswordModalHeader}>
                <View style={styles.forgotPasswordModalTitle}>
                  <Text style={styles.forgotPasswordModalTitleText}>{i18n.t('forgotPassword')}</Text>
                </View>
                <View style={styles.forgotPasswordModalHeaderCloseButton}>
                  <TouchableOpacity onPress={() => this.closeModal()}>
                    <Ionicons name="ios-close-circle" size={32} color="#fff" />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.forgotPasswordModalContent}>
                <View style={[styles.textView, { marginTop: RF(10) }]}>
                  <Image source={require('../../../assets/images/icon_username.png')} style={[styles.ImageStyleEmailIcon, { marginTop: RF(5) }]} />
                  <TextInput style={[styles.forgetTextBoxView, { color: '#fff' }]}
                    underlineColorAndroid={'transparent'}
                    onChangeText={(email) => this.setState({ email })}
                    placeholder={("Email")}
                    placeholderTextColor="white"
                    value={this.state.email}
                  /></View>
                <View style={styles.forgotPasswordModalButtonView}>
                  <TouchableOpacity onPress={() => this.sendResetLink()} style={styles.camOpenCamera} disabled={this.state.disableForgotPasswordButton}>
                    <Text style={styles.forgotPasswordModalButtonText}>{i18n.t('sendResetLink')}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.closeModal()} style={styles.forgotPasswordModalCloseButton}>
                    <Text style={styles.forgotPasswordModalCloseButtonText}>{i18n.t('Close')}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

          </Modal>

          {/* Verification Modal */}
          <Modal style={[styles.modal, styles.modal5]}
            backdrop={true}
            position={"top"}
            ref={"verificationEmail"}
            visible={this.state.isConfirmEmailModalVisible}>
            <View style={styles.forgotPasswordModal}>
              <View style={styles.forgotPasswordModalHeader}>
                <View style={styles.forgotPasswordModalTitle}>
                  <Text style={styles.forgotPasswordModalTitleText}>{i18n.t('Alert!')}</Text>
                </View>
                <View style={styles.forgotPasswordModalHeaderCloseButton}>
                  <TouchableOpacity onPress={() => { this.setState({ loginView: true }, () => { this.refs.verificationEmail.close(); }); }}>
                    <Ionicons name="ios-close-circle" size={32} color="#fff" />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.confirmEmailModalContent}>
                <View style={[styles.confirmMessage, { marginTop: RF(12) }]}>
                  <Text style={{ color: 'white' }}>{i18n.t("emailConfirmModal")}</Text>
                </View>
                <View style={styles.confirmEmailModalButtonView}>
                  <TouchableOpacity onPress={() => { this.setState({ loginView: true }, () => { this.refs.verificationEmail.close(); }); }} style={styles.camOpenCamera}>
                    <Text style={styles.forgotPasswordModalButtonText}>{i18n.t('Ok')}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

          </Modal>
          {/* Verification Modal */}
          <Modal style={[styles.modal, styles.modal3]}
            backdrop={true}
            position={"top"}
            ref={"resendVerificationLinkModal"}
            visible={this.state.isResendVerificationModalVisible}>
            <View style={styles.forgotPasswordModal}>
              <View style={styles.forgotPasswordModalHeader}>
                <View style={styles.forgotPasswordModalTitle}>
                  <Text style={styles.forgotPasswordModalTitleText}>{i18n.t('Alert!')}</Text>
                </View>
                <View style={styles.forgotPasswordModalHeaderCloseButton}>
                  <TouchableOpacity onPress={() => { this.setState({ loginView: true }, () => { this.refs.resendVerificationLinkModal.close(); }); }}>
                    <Ionicons name="ios-close-circle" size={32} color="#fff" />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.confirmEmailModalContent}>
                <View style={[styles.confirmMessage, { marginTop: RF(12) }]}>
                  <Text style={{ color: 'white' }}>{i18n.t("resendConfirmationModal")}</Text>
                </View>
                <View style={styles.confirmEmailModalButtonView}>
                  <TouchableOpacity onPress={() => this.resendVerificationLink()} style={styles.camOpenCamera}>
                    <Text style={styles.forgotPasswordModalButtonText}>{i18n.t('sendResetLink')}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => { this.refs.resendVerificationLinkModal.close(); }} style={styles.forgotPasswordModalCloseButton}>
                    <Text style={styles.forgotPasswordModalCloseButtonText}>{i18n.t('Close')}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

          </Modal>

          {
            this.state.loginView ?
              <View style={styles.textParentView}>
                <View style={styles.logoImageParentView}>
                  <Image style={styles.logoImageView} source={require('../../../assets/images/logo.png')} />
                </View>
                <View style={styles.textView}>
                  <Image source={require('../../../assets/images/icon_username.png')} style={styles.ImageStyle} />
                  <TextInput style={styles.textBoxView}
                    underlineColorAndroid={'transparent'}
                    onChangeText={(email) => this.setState({ email })}
                    placeholder="Email"
                    placeholderTextColor="white"
                    value={this.state.email}
                  /></View>
                <View style={styles.textView}>
                  <Image source={require('../../../assets/images/icon_password.png')} style={styles.ImageStyle} />
                  <TextInput style={styles.textBoxView}
                    underlineColorAndroid={'transparent'}
                    secureTextEntry={this.state.passwordSecureTextEntryLogin}
                    onChangeText={(password) => this.setState({ password })}
                    placeholder="Password"
                    placeholderTextColor="white"
                    value={this.state.password}
                  />
                  {this.state.showPasswordIconLogin}
                </View>
                <View style={styles.rowStyle}>
                  <TouchableOpacity onPress={() => this.loginInButton()}
                    style={styles.rounduttonStylesignIn}>
                    <Text style={{ color: '#ffa500' }}> {i18n.t('signIn')} </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.openRegisterView()}
                    style={styles.rounduttonStylesignup}>
                    <Text style={{ color: '#fff' }}> {i18n.t('signUp')} </Text>
                  </TouchableOpacity>
                </View>
                <View style={{ marginTop: RF(4), paddingLeft: 5, flexDirection: 'row', width: '90%' }}>
                  <TouchableOpacity onPress={() => this.openModal()}>
                    <Text style={styles.forgotPasswordParentView}>{i18n.t('forgetPassword')}</Text>
                  </TouchableOpacity>

                </View>


                {/* FB Login Code Start */}
                <View style={styles.continuebutton}>
                  <TouchableOpacity onPress={() => {
                    this.facebookLogin();
                  }}
                    style={{ flex: 1, width: '100%', height: '100%', flexDirection: 'row', borderRadius: RF(4), alignItems: 'center', justifyContent: 'center', }}
                  >
                    <View style={{ width: '16%', height: '100%', alignItems: 'center', justifyContent: 'center', }}>
                      <Image source={require('../../../assets/images/icon_fb.png')} style={styles.continuebuttonImage} />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '76%', height: '50%' }}>
                      <Text style={[styles.largeButton, { fontSize: actionfontSize }]}> {i18n.t('continueFacebook')} </Text>
                    </View>

                    <View style={{ width: '8%', height: '100%', alignItems: 'center', justifyContent: 'center', }}>
                    </View>
                  </TouchableOpacity>
                </View>
                {/* FB Login Code End */}


                {/* Guest User Code Start */}
                <View style={styles.continuebutton1}>
                  <TouchableOpacity onPress={() => {
                    this.props.navigation.navigate('dashBoard');
                    // this.openPaypalModal();
                  }}
                    style={{ flex: 1, width: '100%', height: '100%', flexDirection: 'row', borderRadius: RF(4), alignItems: 'center', justifyContent: 'center', }}
                  >
                    <View style={{ width: '16%', height: '100%', alignItems: 'center', justifyContent: 'center', }}>
                      <Image source={require('../../../assets/images/icon_guest.png')} style={styles.continuebuttonImage} />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '76%', height: '50%' }}>
                      <Text style={[styles.largeButtonGuestUser, { fontSize: actionfontSize }]}> {i18n.t('continueGuest')} </Text>
                    </View>

                    <View style={{ width: '8%', height: '100%', alignItems: 'center', justifyContent: 'center', }}>
                    </View>
                  </TouchableOpacity>
                </View>
                {/*  Guest User Code End */}

                {/* <View style={styles.continuebutton1}>
              <TouchableOpacity onPress={() => {
                this.props.navigation.navigate('dashBoard');
              }} style={styles.continuebuttonTouchable}>
                <View style={styles.loginPageFBLoginButtonViewDesign}>
                  <Image source={require('../../../assets/images/icon_guest.png')} style={styles.continuebuttonImage} />
                  <Text style={{ color: '#ffa500', justifyContent: "center", alignItems: "center", marginTop: 7, fontSize: RF(3), marginLeft: RF(4) }}> Continue as Guest</Text>
                </View>
              </TouchableOpacity>
            </View> */}
                {/* <View style={styles.continuebutton1}>
              <TouchableOpacity onPress={() => {
                this.props.navigation.navigate('dashBoard');
              }} style={styles.continuebuttonTouchable}>
                <View style={styles.loginPageFBLoginButtonViewDesign}>
                  <Image source={require('../../../assets/images/icon_guest.png')} style={styles.continuebuttonImage} />
                  <Text style={styles.largeButton} onPress={() => {
                    this.props.navigation.navigate('dashBoard');
                  }}> Continue as Guest </Text>
                </View>
              </TouchableOpacity>
            </View> */}


                <View style={{ marginTop: RF(6), flexDirection: 'column', width: '90%', alignItems: 'center', justifyContent: 'center' }}>
                  {/* <HTML html={bottomstring} /> */}
                  <Text style={{
                    color: "white",
                    textAlign: "center",
                    fontSize: RF(1.5)
                  }}>
                    {i18n.t('agreeTerms')}
                  </Text>
                  <View style={{ flexDirection: 'row', alignItems: 'baseline', justifyContent: 'center' }}>
                    <TouchableOpacity
                      style={{ flexDirection: 'row', alignItems: 'baseline', justifyContent: 'center' }}
                      onPress={() => {
                        this.props.navigation.navigate('termsandconditions', { from: 'start' });
                      }}
                    ><Text style={{ color: "white", fontFamily: 'Quicksand-Bold', fontSize: RF(2) }}>{i18n.t('termsConditions') + ' '}</Text></TouchableOpacity>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
                      <Text style={{
                        color: "white",
                        fontSize: RF(1.5),
                      }}>
                        {i18n.t('and')}
                      </Text>
                    </View>
                    {/* <TouchableOpacity
                  style={{ flexDirection: 'row', alignItems: 'baseline', justifyContent: 'center' }}>
                  <Text style={{ color: "white", fontSize: RF(2), }}> and </Text>
                </TouchableOpacity> */}
                    <TouchableOpacity
                      style={{ flexDirection: 'row', alignItems: 'baseline', justifyContent: 'center' }}
                      onPress={() => {
                        this.props.navigation.navigate('privacypolicy', { from: 'start' });
                      }}
                    ><Text style={{ color: "white", fontFamily: 'Quicksand-Bold', fontSize: RF(2) }}>{' ' + i18n.t('privacyStatement')}</Text></TouchableOpacity>
                  </View>

                </View>
              </View>
              : this.renderRegisterView()
          }
          {
            this.state.spinnerVisible ?
              <View style={styles.loading}>
                <Spinner color='#fff' />
              </View>
              : null
          }
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
  }
  openPaypalModal() {
    const client = {
      sandbox: 'access_token$sandbox$q3jqnvdwvd7vzfhy$c72559d5b12670844bbf9c0b518d840e',
      // production: 'YOUR-PRODUCTION-APP-ID',
    }
    // return (
    //   <PaypalExpressBtn client={client} currency={'USD'} total={1.00} />
    // );

  }
  closeModal() {
    this.refs.modal3.close();
  }
  renderRegisterView() {
    //console.log('680');
    //console.log(this.state.messages);
    const bottomstring = "<p  style='color:white;text-align:center'>By creating or logging into an account you're agreeing with our, <b>Terms & Conditions</b> and <b>Privacy Statement</b></p>";
    return (
      <View style={styles.textParentView}>
        <KeyboardAvoidingView behavior={'padding'} style={{ zIndex: 0, }}>
          <ScrollView style={{ height: '100%', }}>
            <Modal style={[styles.validationModal, styles.modal3]}
              backdrop={true}
              position={"top"}
              ref={"modal4"}
              visible={this.state.isModalVisible}>
              <View style={{
                width: '90%',
                alignItems: 'center', justifyContent: 'center',
                //flexDirection: 'row',
                flex: 1,
                width: '90%', height: RF(4),
              }}>
                <View style={{ flex: 1, width: '90%', height: RF(4), }}>
                  {this.functionRenderView()}
                </View>
              </View>

            </Modal>
            <View style={styles.logoImageParentView}>
              <Image style={styles.logoImageView} source={require('../../../assets/images/logo.png')} />
            </View>
            <View style={[styles.textView, { padding: 5 }]}>
              <Image source={require('../../../assets/images/icon_username.png')} style={styles.ImageStyle} />
              <TextInput style={[styles.textBoxView]}
                underlineColorAndroid={'transparent'}
                onChangeText={(firstName) => {
                  this.setState({ firstName });
                  if (this.state.firstName.trim() != "") {
                    this.setState({ errorFirstName: '' });
                  }
                  else {
                    this.setState({ errorFirstName: i18n.t('FirstNameErr') });
                  }
                }}
                placeholder="First Name"
                placeholderTextColor="white"
                value={this.state.firstName}
              />
            </View>
            {this.state.errorFirstName != "" ?
              <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', width: '90%', height: RF(2.1), marginTop: 10 }}>

                <Text style={{ color: 'red', fontSize: RF(2) }}>{this.state.errorFirstName}</Text>
              </View>
              : null}
            <View style={[styles.textView, { padding: 5 }]}>
              <Image source={require('../../../assets/images/icon_username.png')} style={styles.ImageStyle} />
              <TextInput style={styles.textBoxView}
                underlineColorAndroid={'transparent'}
                onChangeText={(lastName) => {
                  this.setState({ lastName })
                  if (this.state.lastName.trim() != "") {
                    this.setState({ errorLastName: '' });
                  }
                  else {
                    this.setState({ errorLastName: i18n.t('LastNameErr') });
                  }
                }}
                placeholder="Last Name"
                placeholderTextColor="white"
                value={this.state.lastName}
              />
            </View>
            {this.state.errorLastName != "" ?
              <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', width: '90%', height: RF(2.1), marginTop: 10 }}>

                <Text style={{ color: 'red', fontSize: RF(2) }}>{this.state.errorLastName}</Text>
              </View>
              : null}
            <View style={[styles.textView, { padding: 5 }]}>
              <Image source={require('../../../assets/images/icon_password.png')} style={styles.ImageStyle} />
              <TextInput style={styles.textBoxView}
                underlineColorAndroid={'transparent'}
                onChangeText={(phone) => {
                  this.setState({ phone })
                  if (this.state.phone.trim() != "") {
                    this.setState({ errorPhoneNumber: '' });
                  }
                  else {
                    this.setState({ errorPhoneNumber: i18n.t('PhoneErr') });
                  }
                }}
                placeholder="Phone"
                placeholderTextColor="white"
                value={this.state.phone}
              /></View>
            {this.state.errorPhoneNumber != "" ?
              <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', width: '90%', height: RF(2.1), marginTop: 10 }}>

                <Text style={{ color: 'red', fontSize: RF(2) }}>{this.state.errorPhoneNumber}</Text>
              </View>
              : null}
            <View style={[styles.textView, { padding: 5 }]}>
              <Image source={require('../../../assets/images/icon_username.png')} style={styles.ImageStyle} />
              <TextInput style={styles.textBoxView}
                underlineColorAndroid={'transparent'}
                onChangeText={(registerEmail) => {
                  this.setState({ registerEmail })
                  if (this.state.registerEmail.trim() != "") {
                    this.setState({ errorEmail: '' });
                  }
                  else {
                    this.setState({ errorEmail: i18n.t('EmailErr') });
                  }
                }}
                placeholder="Email"
                placeholderTextColor="white"
                value={this.state.registerEmail}
              /></View>
            {this.state.errorEmail != "" ?
              <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', width: '90%', height: RF(2.1), marginTop: 10 }}>
                <Text style={{ color: 'red', fontSize: RF(2) }}>{this.state.errorEmail}</Text>
              </View>
              : null}
            <View style={[styles.textView, { padding: 5 }]}>
              <Image source={require('../../../assets/images/icon_password.png')} style={styles.ImageStyle} />
              <TextInput style={styles.textBoxView}
                underlineColorAndroid={'transparent'}
                secureTextEntry={this.state.passwordSecureTextEntryRegister}
                onChangeText={(registerPassWord) => {
                  this.setState({ registerPassWord })
                  if (this.state.registerPassWord.trim() != "") {
                    this.setState({ errorPassword: '' });
                  }
                  else {
                    this.setState({ errorPassword: i18n.t('PasswdErr') });
                  }
                }}
                placeholder="Password"
                placeholderTextColor="white"
                value={this.state.registerPassWord}
              />
              {this.state.showPasswordIconRegister}
            </View>
            {this.state.errorPassword != "" ?
              <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', width: '90%', height: RF(2.1), marginTop: 10 }}>
                <Text style={{ color: 'red', fontSize: RF(2) }}>{this.state.errorPassword}</Text>
              </View>
              : null}
            <View style={[styles.textView, { padding: 5 }]}>
              <Image source={require('../../../assets/images/icon_password.png')} style={styles.ImageStyle} />
              <TextInput style={styles.textBoxView}

                underlineColorAndroid={'transparent'}
                secureTextEntry={this.state.confirmpasswordSecureTextEntryRegister}
                onChangeText={(confirmPassword) => {
                  this.setState({ confirmPassword })
                  if (this.state.confirmPassword.trim() != "") {
                    this.setState({ errorConfirmPassword: '' });
                  }
                  else {
                    this.setState({ errorConfirmPassword: i18n.t('ConfirmPasswdErr') });
                  }
                }}
                placeholder="Confirm Password"
                placeholderTextColor="white"
                value={this.state.confirmPassword}
              />
              {this.state.showConfirmPasswordIconRegister}
            </View>
            {this.state.errorConfirmPassword != "" ?
              <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', width: '90%', height: RF(2.1), marginTop: 10 }}>
                <Text style={{ color: 'red', fontSize: RF(2) }}>{this.state.errorConfirmPassword}</Text>
              </View>
              : null}
            <View style={styles.rowStyleSignup}>
              <TouchableOpacity onPress={() => this.registerUser()}
                style={styles.rounduttonStylesignInS}>
                <Text style={{ color: '#ffa500' }}> {i18n.t("signUp")} </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.openLoginView()}
                style={styles.rounduttonStylesignupS}>
                <Text style={{ color: '#fff' }}> {i18n.t("goToLogin")} </Text>
              </TouchableOpacity>

            </View>

            <View style={{ marginTop: RF(6), flexDirection: 'column', width: '90%', alignItems: 'center', justifyContent: 'center' }}>
              {/* <HTML html={bottomstring} /> */}
              <Text style={{
                color: "white",
                textAlign: "center",
                fontSize: RF(1.5)
              }}>
                {i18n.t('agreeTerms')}
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'baseline', justifyContent: 'center' }}>
                <TouchableOpacity
                  style={{ flexDirection: 'row', alignItems: 'baseline', justifyContent: 'center' }}
                  onPress={() => {
                    this.props.navigation.navigate('termsandconditions', { from: 'start' });
                  }}
                ><Text style={{ color: "white", fontFamily: 'Quicksand-Bold', fontSize: RF(1.5) }}>{i18n.t("termsConditions")}</Text></TouchableOpacity>
                <Text style={{
                  color: "white",
                  textAlign: "center",
                  fontSize: RF(1.5),

                }}>
                  {i18n.t('and')}
                </Text>
                <TouchableOpacity
                  style={{ flexDirection: 'row', alignItems: 'baseline', justifyContent: 'center' }}
                  onPress={() => {
                    this.props.navigation.navigate('privacypolicy', { from: 'start' });
                  }}
                ><Text style={{ color: "white", fontFamily: 'Quicksand-Bold', fontSize: RF(1.5) }}>{' ' + i18n.t('privacyStatement')}</Text></TouchableOpacity>
              </View>

            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
  }
  renderError() {
    if (this.props.loginError) {
      return (
        <View><Text style={styles.login.error}>Invalid login or password</Text></View>
      )
    }
  }
  renderDev() {
    if (!__DEV__)
      return (null)

    return (
      <TouchableOpacity>
        <Text>Reset</Text>
      </TouchableOpacity>
    )
  }
  functionRenderView() {
    var rows = [];
    if (!this.state.messages) {
      return null;
    }
    else {
      this.state.messages.map((data) => {
        //console.log('data is ', data);
        rows.push(
          <View style={{ width: '90%', height: RF(4), alignItems: 'center', justifyContent: 'center', padding: RF(2), marginTop: RF(5) }}>
            <Text style={{ alignItems: 'center', justifyContent: 'center', color: 'red', fontSize: RF(2.5), }}>{data}</Text>
          </View>
        );
      });
      return rows;
    }

  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Start)