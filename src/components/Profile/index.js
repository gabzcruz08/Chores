import React, { Component } from 'react'
import { View, Text, Button } from 'native-base';
import { TextInput, TouchableOpacity, Image, AsyncStorage } from 'react-native';
import i18n from 'react-native-i18n';
import Modal from 'react-native-modalbox';
import RF from 'react-native-responsive-fontsize'

import { saveProfileAct } from './action';
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
                <TouchableOpacity onPress={() => { props.actionBtnCliecked() }} style={styles.camOpenCamera}>
                    <Text style={styles.camOpenCameraText}>{i18n.t("Ok")}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const TextBoxView = (props) => {
    return (
        <View style={[styles.textBoxWraperView, { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#E1E1E1' }]}>
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
        </View>
    )
}

export class Profile extends Component {

    constructor(props) {
        super(props)
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            profileSaved: false,
            apiError: false,
            message: "",
            errorMessage: "",
            loggedInOldData: "",
        }
        this.profileSaved = this.profileSaved.bind(this);
        this.profileErrorSaved = this.profileErrorSaved.bind(this);
        this.firstNameChanged = this.firstNameChanged.bind(this);
        this.lastNameChanged = this.lastNameChanged.bind(this);
        this.emailChanged = this.emailChanged.bind(this);
        this.phoneChanged = this.phoneChanged.bind(this);
        this.saveProfile = this.saveProfile.bind(this);
    }

    componentWillMount() {
        AsyncStorage.getItem('loggedInUserObj').then((value) => {
            var value = JSON.parse(value);
            this.setState({ firstName: value.first_name, lastName: value.last_name, email: value.email, phone: value.phone, loggedInOldData: value });
        });
    }
    componentDidMount() { }
    componentWillUnmount() { }

    onBackPress() {
        this.props.navigation.navigate('dashBoard');
    }
    saveProfile() {
        let firstName = this.state.firstName;
        let lastName = this.state.lastName;
        let email = this.state.email;
        let phone = this.state.phone;
        let languageCode = i18n.locale;
        AsyncStorage.getItem('loggedInUserObj').then((value) => {
            let loggedInUser = JSON.parse(value);
            let userId = loggedInUser.id;
            let accessToken = loggedInUser.remember_token;
            saveProfileAct(userId, languageCode, accessToken, firstName, lastName, email, phone, (data) => {
                var dataNew = {
                    "access_token": null,
                    "email_verified_at": this.state.loggedInOldData.email_verified_at,
                    "email": email,
                    "first_name": firstName,
                    "id": this.state.loggedInOldData.id,
                    "last_name": lastName,
                    "phone": phone,
                    "remember_token": this.state.loggedInOldData.remember_token,
                    "role": this.state.loggedInOldData.role,

                };
                AsyncStorage.setItem("loggedInUserObj", JSON.stringify(dataNew)).then(() => {
                }).catch((error) => {
                    console.log(error);
                });
                this.setState({ profileSaved: true, message: data.success_data });
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
                    var errorKeys = ['first_name', 'last_name', 'phone', 'email'];
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
                        else if (errorKeys[3] == key && isBreak == false) {
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
    profileSaved() {
        if (this.state.profileSaved == true) {
            this.setState({ profileSaved: false, message: '' });
            this.refs.modal5.close();
            this.props.navigation.navigate('dashBoard');
        }
    }

    profileErrorSaved() {
        if (this.state.apiError == true) {
            this.setState({ profileErrorSaved: false, message: '' });
            this.refs.errorModel.close();
        }
    }

    firstNameChanged(firstName) {
        this.setState({ firstName })
    }
    lastNameChanged(lastName) {
        this.setState({ lastName })
    }
    emailChanged(email) {
        this.setState({ email })
    }
    phoneChanged(phone) {
        this.setState({ phone })
    }

    render() {
        return (
            <View style={styles.container}>
                <Modal style={[styles.modal, styles.modal3]}
                    backdrop={true}
                    position={"top"}
                    ref={"modal5"}
                    visible={this.state.profileSaved}>
                    <SucessModelView message={this.state.message} title={'sucess'} actionBtnCliecked={this.profileSaved}></SucessModelView>
                </Modal>
                <Modal style={[styles.modal, styles.modal3]}
                    backdrop={true}
                    position={"top"}
                    ref={"errorModel"}
                    visible={this.state.apiError}>
                    <SucessModelView message={this.state.errorMessage} title={'Alert!'} actionBtnCliecked={this.profileErrorSaved}></SucessModelView>
                </Modal>
                <View style={styles.ImageParentView}>
                    <View style={styles.ImageUpperView}></View>
                    <View style={styles.ImageView}>
                        <TouchableOpacity style={{ marginLeft: 15 }} onPress={() => {
                            this.onBackPress();
                        }} hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                            <Image source={require('../../../assets/images/back_arrow.png')} style={{ height: 20, width: 20 }} />
                        </TouchableOpacity>
                        <Text style={{ color: 'white', fontSize: 22, fontFamily: 'Quicksand-Medium' }}>{i18n.t("Profile")}</Text>
                        <View style={{ width: '10%', height: '100%' }}>
                        </View>
                    </View>
                </View>
                <View style={{ marginTop: '5%', width: '100%', }}></View>
                <View style={{ height: '80%', width: '90%', marginLeft: '5%', marginRight: '5%' }}>

                    <TextBoxView value={this.state.firstName} isSecure={false} textChanged={this.firstNameChanged} placeHolder={'First Name'}></TextBoxView>
                    <TextBoxView value={this.state.lastName} isSecure={false} textChanged={this.lastNameChanged} placeHolder={'Last Name'}></TextBoxView>
                    <TextBoxView value={this.state.email} isSecure={false} textChanged={this.emailChanged} placeHolder={'Email'}></TextBoxView>
                    <TextBoxView value={this.state.phone} isSecure={false} textChanged={this.phoneChanged} placeHolder={'Phone'}></TextBoxView>

                    <View style={{ marginTop: 10, zIndex: 0 }}>
                        <Button onPress={() => { this.saveProfile(); }}
                            style={styles.btnSaveProfile}
                            rounded>
                            <Text style={styles.txtCallUsNow}>
                                {i18n.t("save")}
                            </Text>
                        </Button>
                    </View>
                </View>
            </View>
        )
    }
}

export default Profile;