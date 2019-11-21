import { Toast } from 'native-base'
import { StatusBar, Dimensions, Platform } from 'react-native'

export const callbackError = (errors) => {
  Toast.show({
    buttonText: 'Ok',
    position: 'center',
    text: errors.message,
  })
}

export const getBarHeight = () => {
  if (StatusBar.currentHeight) {
    return StatusBar.currentHeight
  }
  if (isIphoneX()) {
    return 40
  }
  else {
    return 20
  }
}

export const isIphoneX = () => {
    const dimen = Dimensions.get('window');
    return (
        Platform.OS === 'ios' &&
        !Platform.isPad &&
        !Platform.isTVOS &&
        (dimen.height === 812 || dimen.width === 812)
    );
}
