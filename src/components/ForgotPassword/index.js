import React, { Component } from 'react'
import { View, Text, Button } from 'native-base';
import { TextInput, TouchableOpacity, Image, AsyncStorage } from 'react-native';
import i18n from 'react-native-i18n';
import Modal from 'react-native-modalbox';
import RF from 'react-native-responsive-fontsize'
import { Entypo } from '@expo/vector-icons';

import { changePasswordAct } from './action';
import styles from './styles';

const SucessModelView = (props) => {
    return (
        <View style={styles.camModal}>
            <View style={styles.camModalHeader}>
                <View style={styles.camModalTitle}>
                    <Text style={styles.camModalTitleText}>{i18n.t(props.title)}</Text>
                </View>
            </View>
            <View style={[styles.mainStyle.hundredHeightWidth, styles.mainStyle.center, { height: RF(5) }]} >
                <Text style={[styles.fontStyle.Medium, { color: '#ffaa1a', fontSize: RF(2), marginLeft: RF(1) }]}>{props.message}</Text>
            </View>
            <View style={styles.camModalContent}>
                <TouchableOpacity onPress={() => { props.acceptPasswordChange() }} style={styles.camOpenCamera}>
                    <Text style={styles.camOpenCameraText}>{i18n.t("Ok")}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const TextBoxView = (props) => {
    return (
        <View style={[styles.textBoxWraperView, { flexDirection: 'row', borderBottomWidth: 1,borderBottomColor:'#E1E1E1' }]}>
            <View style={{ width: '85%', marginTop: 8 }}>
                <TextInput style={[styles.textBoxView]}
                    secureTextEntry={props.isSecure}
                    autoCorrect={false}
                    onChangeText={(password) => props.textChanged(password)}
                    placeholder={props.placeHolder}
                    value={props.value}
                    underlineColorAndroid={'transparent'}
                />
            </View>
            {props.needVisibilityChange ? 
                props.isSecure?
                <View style={{ width: '15%', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
                    <Entypo name="eye-with-line" size={20} color="#FFAA1C" onPress={props.changeVisibility} />
                </View> 
                :
                <View style={{ width: '15%', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
                    <Entypo name="eye" size={20} color="#FFAA1C" onPress={props.changeVisibility} />
                </View> 
                : null}
        </View>
    )
}

export class ForgotPassword extends Component {

    constructor(props) {
        super(props)
        this.state = {
            password: '',
            newPassword: '',
            confirmPassword: '',
            passwordChanged: false,
            apiError: false,
            message: '',
            errorMessage: '',
            visibilityCurrentPassword: true,
            visibilityNewPassword: true,
            visibilityConfirmPassword: true
        }
        this.acceptPasswordChange = this.acceptPasswordChange.bind(this);
        this.currentPasswordChanged = this.currentPasswordChanged.bind(this);
        this.newPasswordChanged = this.newPasswordChanged.bind(this);
        this.confirmPasswordChanged = this.confirmPasswordChanged.bind(this);
        this.acceptPasswordChangeError = this.acceptPasswordChangeError.bind(this);
        this.changeVisiblityCurrentPassword = this.changeVisiblityCurrentPassword.bind(this);
        this.changeVisiblityNewPassword = this.changeVisiblityNewPassword.bind(this);
        this.changeVisiblityConfirmPassword = this.changeVisiblityConfirmPassword.bind(this);
    }


    onBackPress() {
        this.props.navigation.navigate('dashBoard');
    }
    changePassword() {
        let password = this.state.password;
        let newPassword = this.state.newPassword;
        let confirmPassword = this.state.confirmPassword;
        let languageCode = i18n.locale;
        AsyncStorage.getItem('loggedInUserObj').then((value) => {
            let loggedInUser = JSON.parse(value);
            let userId = loggedInUser.id;
            let accessToken = loggedInUser.remember_token;
            changePasswordAct(password, newPassword, confirmPassword, userId, languageCode, accessToken, (data) => {
                this.setState({ passwordChanged: true, message: data.success_data });
                this.refs.modal5.open();
            }, (error) => {
                if (error.error_data == "Unauthorised") {
                    AsyncStorage.removeItem("userId", (err, scs) => {
                        AsyncStorage.removeItem("loggedInUserObj", (err1, scs1) => {
                            AsyncStorage.removeItem("accessToken", (err2, scs2) => {
                                this.props.navigation.navigate('start');
                            });
                        });
                    });
                }
                else {
                    var errorKeys = ['password', 'new_password', 'confirm_password'];
                    var isBreak = false
                    for (let [key, value] of Object.entries(error.error_data)) {
                        if (errorKeys[0] == key) {
                            this.setState({ apiError: true, errorMessage: value[0] }, () => {
                                isBreak = true;
                                this.refs.errorModel.open();
                                return
                            });
                        }
                        else if ((errorKeys[1] == key) && (isBreak == false)) {
                            this.setState({ apiError: true, errorMessage: value[0] }, () => {
                                isBreak = true;
                                this.refs.errorModel.open();
                                return
                            });
                        }
                        else if (errorKeys[2] == key && isBreak == false) {
                            this.setState({ apiError: true, errorMessage: value[0] }, () => {
                                isBreak = true;
                                this.refs.errorModel.open();
                                return
                            });
                        }
                        if (isBreak)
                            return
                    }
                }
            });
        });
    }
    acceptPasswordChange() {
        if (this.state.passwordChanged == true) {
            this.setState({ passwordChanged: false, message: '' });
            this.refs.modal5.close();
            this.props.navigation.navigate('dashBoard');
        }
    }
    acceptPasswordChangeError() {
        if (this.state.apiError == true) {
            if (this.state.errorMessage == 'Unauthorised') {
                AsyncStorage.removeItem("userId", (err, scs) => {
                    AsyncStorage.removeItem("loggedInUserObj", (err1, scs1) => {
                        AsyncStorage.removeItem("accessToken", (err2, scs2) => {
                            this.props.navigation.navigate('start');
                        });
                    });
                });
            }
            this.setState({ apiError: false, errorMessage: '' });
            this.refs.errorModel.close();
        }
    }

    currentPasswordChanged(password) {
        this.setState({ password })
    }
    newPasswordChanged(newPassword) {
        this.setState({ newPassword })
    }
    confirmPasswordChanged(confirmPassword) {
        this.setState({ confirmPassword })
    }
    changeVisiblityCurrentPassword() {
        this.setState({ visibilityCurrentPassword: !this.state.visibilityCurrentPassword })
    }
    changeVisiblityNewPassword() {
        this.setState({ visibilityNewPassword: !this.state.visibilityNewPassword })
    }
    changeVisiblityConfirmPassword() {
        this.setState({ visibilityConfirmPassword: !this.state.visibilityConfirmPassword })
    }
    render() {
        return (
            <View style={styles.container}>
                <Modal style={[styles.modal, styles.modal3]}
                    backdrop={true}
                    position={"top"}
                    ref={"modal5"}
                    visible={this.state.passwordChanged}>
                    <SucessModelView message={this.state.message} acceptPasswordChange={this.acceptPasswordChange} title={'sucess'}></SucessModelView>
                </Modal>
                <Modal style={[styles.modal, styles.modal3]}
                    backdrop={true}
                    position={"top"}
                    ref={"errorModel"}
                    visible={this.state.apiError}>
                    <SucessModelView message={this.state.errorMessage} acceptPasswordChange={this.acceptPasswordChangeError} title={'Alert!'}></SucessModelView>
                </Modal>
                <View style={styles.ImageParentView}>
                    <View style={styles.ImageUpperView}></View>
                    <View style={styles.ImageView}>
                        <TouchableOpacity style={{ marginLeft: 15 }} onPress={() => {
                            this.onBackPress();
                        }} hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                            <Image source={require('../../../assets/images/back_arrow.png')} style={{ height: 20, width: 20 }} />
                        </TouchableOpacity>
                        <Text style={{ color: 'white', fontSize: 22, fontFamily: 'Quicksand-Medium' }}>{i18n.t("ForgotPasswordMenu")}</Text>
                        <View style={{ width: '10%', height: '100%' }}>
                        </View>
                    </View>
                </View>
                <View style={{ marginTop: '5%', width: '100%', }}></View>
                <View style={{ height: '80%', width: '90%', marginLeft: '5%', marginRight: '5%' }}>
                    <TextBoxView
                        isSecure={this.state.visibilityCurrentPassword}
                        textChanged={this.currentPasswordChanged}
                        placeHolder={'Current Password'}
                        changeVisibility={this.changeVisiblityCurrentPassword}
                        needVisibilityChange={true}>
                    </TextBoxView>
                    <TextBoxView
                        isSecure={this.state.visibilityNewPassword}
                        textChanged={this.newPasswordChanged}
                        placeHolder={'New Password'}
                        changeVisibility={this.changeVisiblityNewPassword}
                        needVisibilityChange={true}>
                    </TextBoxView>
                    <TextBoxView
                        isSecure={this.state.visibilityConfirmPassword}
                        textChanged={this.confirmPasswordChanged}
                        placeHolder={'Confirm Password'}
                        changeVisibility={this.changeVisiblityConfirmPassword}
                        needVisibilityChange={true}>
                    </TextBoxView>
                    <View style={{ marginTop: 10, zIndex: 0 }}>
                        <Button onPress={() => { this.changePassword(); }}
                            style={styles.btnChangepassword}
                            rounded>
                            <Text style={styles.txtCallUsNow}>
                                {i18n.t("changePasswordBtn")}
                            </Text>
                        </Button>
                    </View>
                </View>
            </View>
        )
    }
}

export default ForgotPassword;