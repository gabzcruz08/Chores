import React, { Component } from 'react';
import { Container, Content, Text, Icon } from 'native-base';
import styles from './styles';
import { BackHandler, Animated, View, Image, Dimensions, Easing } from "react-native";
import i18n from 'react-native-i18n';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RF from 'react-native-responsive-fontsize';
const mapStateToProps = (state) => ({
    languageCode: state.thankYou.languageCode
})
const mapDispatchToProps = (dispatch) => bindActionCreators({

}, dispatch);
class ThankYou extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.onBackPress = this.onBackPress.bind(this);
        this.moveAnimation = new Animated.ValueXY({ x: 30, y: 65 });
        this.animatedValue = new Animated.Value(0)
        // this._moveImage = this._moveImage.bind(this);
    }

    onBackPress() {
        this.props.navigation.navigate('dashBoard');
        return true;
    }
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
        this.timeoutHandle = setTimeout(() => {
            this.props.navigation.navigate('notification');
        }, 3000);
        this.animate();
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
        clearTimeout(this.timeoutHandle);
    }
    animate() {
        this.animatedValue.setValue(0)
        Animated.timing(
            this.animatedValue,
            {
                toValue: 1,
                duration: 2000,
                easing: Easing.linear
            }
        ).start(() => { })
    }
    render() {
        let marLeftStart = (Dimensions.get('window').width / 2) - 25;
        let marLeftEnd = (Dimensions.get('window').width / 2) - 50;

        const marginTop = this.animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [600, 50]
        })
        const height = this.animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [50, 100]
        })
        const width = this.animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [50, 100]
        })
        const opacity = this.animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0.1, 1]
        })

        const marginLeft = this.animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [marLeftStart, marLeftEnd]
        })

        return (
            <Container style={styles.container}>
                <Content contentContainerStyle={styles.contents}>
                    <Text style={styles.headerText}>{i18n.t("thankYou")}</Text>
                    <Text style={styles.descriptionText}>{i18n.t("scheduleMarked")}
                    </Text>

                    {/* <Animated.View style={[this.moveAnimation.getLayout(), { justifyContent: 'center', height: RF(50), }]}>
                        <View style={{ justifyContent: 'center', marginRight: RF(10), height: RF(35) }}>
                            <Image source={require('../../../assets/images/calender_lg.png')} style={{ height: 100, width: 100, justifyContent: 'center' }} />
                        </View>
                    </Animated.View> */}
                    <View style={{ flex: 1 }}>
                        <Animated.Image
                            source={require('../../../assets/images/calender_lg.png')}
                            style={{
                                marginTop: marginTop,
                                height: height,
                                width: width,
                                //marginLeft: marginLeft,
                                opacity
                            }} />
                    </View>
                </Content>

            </Container>

        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ThankYou)