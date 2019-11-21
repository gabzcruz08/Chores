import React, { Component } from 'react';
import { Text, View, TouchableOpacity, AsyncStorage } from 'react-native';
import Modal from 'react-native-modalbox';
import RF from 'react-native-responsive-fontsize';
import styles from './styles';
import i18n from 'react-native-i18n';
import { Ionicons } from '@expo/vector-icons';

export class LogoutConfirmation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false
        }
        this.closeModal = this.closeModal.bind(this);

        this.openModal = this.openModal.bind(this);
        this._logout = this._logout.bind(this);


    }
    componentWillMount() {

    }
    render() {
        return (
            <Modal style={[styles.modal, styles.modal3]}
                backdrop={true}
                position={"top"}
                ref={"logoutConfirm"}
                visible={this.state.isModalVisible}>

                <View style={styles.camModal}>
                    <View style={styles.camModalHeader}>
                        <View style={styles.camModalTitle}>
                            <Text style={styles.camModalTitleText}>{i18n.t("Alert!")}</Text>
                        </View>
                        <View style={styles.camModalCloseButton}>
                            <TouchableOpacity onPress={() => this.closeModal()}>
                                <Ionicons name="ios-close-circle" size={32} color="#ffaa1a" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={[styles.mainStyle.hundredHeightWidth, styles.mainStyle.center, { height: RF(5) }]} >
                        <Text style={[styles.fontStyle.Medium, { color: '#ffaa1a', fontSize: RF(2), marginLeft: RF(1), marginRight: RF(1) }]}>{i18n.t("sureLogout")}</Text>
                    </View>
                    <View style={styles.camModalContent}>
                        <TouchableOpacity onPress={() => { this._logout() }} style={styles.camOpenCamera}>
                            <Text style={styles.camOpenCameraText}>{i18n.t("Yes")}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        );
    }

    openModal() {
        this.setState({ isModalVisible: true });
        this.refs.logoutConfirm.open();

    }
    closeModal() {
        this.setState({ isModalVisible: false });
        this.refs.logoutConfirm.close();
    }
    _logout() {
        AsyncStorage.removeItem("userId", (err, scs) => {
            AsyncStorage.removeItem("loggedInUserObj", (err1, scs1) => {
                AsyncStorage.removeItem("accessToken", (err2, scs2) => {
                    this.setState({ isModalVisible: false });
                    this.refs.logoutConfirm.close();
                    this.props.navigation.navigate('start');
                });
            });
        });
    }
}
