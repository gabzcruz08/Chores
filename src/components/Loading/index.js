import React, { Component } from 'react'
import { View, Image, Animated, AsyncStorage } from 'react-native'
import styles from './styles.js'
import RF from 'react-native-responsive-fontsize';
import { NavigationActions, StackNavigator } from 'react-navigation';
import DashBoard from '../Dashboard'
import { Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

class Loading extends Component {
  constructor(props) {
    super(props);
    this.moveAnimation = new Animated.ValueXY({ x: 30, y: -10 });
    this._moveImage = this._moveImage.bind(this);
    this.redirectToRoute = this.redirectToRoute.bind(this);
  }
  redirectToRoute = (route) => {
    
    const navigate = NavigationActions.navigate({ routeName: route });
    this.props.navigation.navigate(navigate);
  }
  _moveImage() {
    Animated.spring(this.moveAnimation, {
      toValue: { x: 30, y: 190 },
      speed: 1
    }).start();
  }
  componentWillMount() {

  }
  componentDidMount() {
    // AsyncStorage.getItem("loggedInUserObj").then((value) => {
    //   if (value != null) {
    //     
    //     // this.props.navigation.navigate('dashBoard', { loggedInObject: value });
    //     NavigationService.naviGate('dashBoard', { loggedInObject: value });
    //     // this.props.redirectToRoute('dashBoard');
    //     // this.redirectToRoute('dashBoard');
    //   }
    // });
    this._moveImage();

  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Image style={{ height: width*1.6, width: width, justifyContent: 'center' }} source={require('../../../assets/images/mobile_loading_1.gif')} />
        </View>
      </View>
    )
  }
}
export default Loading;

const Stacks = StackNavigator({
  dashBoard: {
    screen: DashBoard
  },
});