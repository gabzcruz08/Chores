import React, { Component } from "react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { StyleProvider } from "native-base";
import promiseMiddleware from "redux-promise-middleware";
import reducers from "./src/Reducers";
import Router from "./src/Router";
import getTheme from "./native-base-theme/components";
import material from "./native-base-theme/variables/material";
import * as Asset from 'expo-asset';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import Loading from "./src/components/Loading";
//import Sentry from 'sentry-expo'
import * as Expo from 'expo';
import * as Amplitude from 'expo-analytics-amplitude'
import Start from "./src/components/Start";
// import Register from './src/components/Register';
// import Home from './src/components/Home'
import { I18nextProvider } from "react-i18next";
import i18n from "./src/I18n";
import { Root } from "native-base";
import { AsyncStorage } from 'react-native'
// import ForgotPassword from './src/components/ForgotPassword';
// import Reference from './src/components/Reference';
import i18ns from "react-native-i18n";
import {
  NavigationActions,
  StackNavigator,
  createStackNavigator,
  createAppContainer
} from "react-navigation";
import Dashboard from "./src/components/Dashboard";
i18ns.fallbacks = true;
i18ns.translations = {
  en: {
    Dashboard: "Dashboard",
    Schedules: "Schedules",
    Tutorial: "Tutorial",
    Logout: "Logout",
    Scheduler: "Scheduler",
    Notification: "Notification",
    Login: "Login",
    forgotPassword: "Forgot Password!",
    ForgotPasswordMenu: "Change Password",
    Profile: "Edit Profile",
    Email: "Email",
    sendResetLink: "Send Reset Link",
    Close: "Close",
    Password: "Password",
    signIn: "Sign in",
    signUp: "Sign up",
    forgetPassword: "Forget your password?",
    continueFacebook: "Continue with Facebook",
    continueGuest: "Continue as Guest",
    agreeTerms: "By creating or logging into an account you are agreeing with our",
    termsConditions: "Terms & Conditions",
    and: "and",
    privacyStatement: "Privacy Statement",
    Arabic: "عربى",
    English: "English",
    Search: "Search",
    bookingSuccess: "Booking accepted successfully.",
    alreadyAccepted: "booking already accepted",
    youAccepted: "You have already accepted booking.",
    otherAccepted: "Other service provider has accepted booking before you.",
    acceptBookingErr: "Server error while accepting booking request.",
    cancelSuccess: "Booking cancelled successfully.",
    Unauthorized: "Unauthorized",
    cancelAlready: "You have already cancelled booking.",
    cancelBefore: "Other service provider has cancelled booking before you.",
    cancelBookingErr: "Server error while cancelling booking request.",
    somethingWrong: "Something went wrong. Please try again.",
    alreadyRated: "you have already rated this booking.",
    bookingDetails: "Booking Details",
    requestErr: "Server error while processing your reuest, please try again.",
    loginExpired: "You login has expired. Please login again for further processing.",
    // "you have already rated this booking.": "you have already rated this booking.",
    paypal: "Pay with PayPal",
    cash: "Cash",
    // "choosePlaceTime": "Choose Place and Time",
    choosePlaceTime: "Booking Details",
    reviewRequest: "Review Booking",
    loginContinue: "Please login to continue.",
    thankYou: "Booking Confirmed!",
    scheduleMarked: "Thank you for trusting us",
    confirmAcceptBooking: "Are you sure you want to accept this booking?",
    "Alert!": "Alert!",
    sucess: "Sucess",
    Ok: "Ok",
    Yes: "Yes",
    openCamera: "Open Camera",
    openImageExplorer: "Open Image Explorer",
    descriptionErr: "Please enter description less then 500 words",
    loginToLikeBanner: "Please login first for like banner.",
    cameraPermissionErr: "Permission to access camara and image was denied",
    imageSaveErr: "Server error while saving image, please try again.",
    imageAccessErr: "Permission to access image was denied.",
    loginToBook: "Please login first to book service",
    January: "January",
    February: "February",
    March: "March",
    April: "April",
    May: "May",
    June: "June",
    July: "July",
    August: "August",
    September: "September",
    October: "October",
    November: "November",
    December: "December",
    confirmCancelBooking: "Are you sure you want to cancel this booking?",
    Address: "Address",
    Submit: "Submit",
    InvalidCredentialMeg: "Wrong email or password, please enter valid email and password.",
    validEmailErr: "Please enter valid email address.",
    requireEmailPassword: "Please enter email and password.",
    requireEmailErr: "Please enter email address.",
    FirstNameErr: "First name is required.",
    LastNameErr: "Last name is required.",
    EmailErr: "Email is required.",
    PasswdErr: "Password is required.",
    ConfirmPasswdErr: "Confirm password is required.",
    PhoneErr: "Phone is required.",
    InvalidEmail: "Email is not valid.",
    PasswdMatchErr: "Password and confirm password do not match.",
    goToLogin: "Go to Login",
    // "CheckOut": "CHECK OUT",
    CheckOut: "PROCEED",
    proceed: "Proceed",
    letsGo: "Let's Go",
    sure: "If now sure",
    serviceCharge: "service charges will be added.",
    feature: "Featured",
    favourite: "Add Your Favourites!",
    imageUpload: "Upload Image",
    call: "CALL US NOW",
    book: "BOOK NOW",
    location: "Add Location Manually",
    map: "Google Map",
    addressErr: "Please enter your address or select on map.",
    addressLengthErr: "Maximum 300 cherecter allowed in address.",
    dateErr: "Please select date.",
    timeErr: "Please select time.",
    locationSelect: "Select a Location",
    sureLogout: "Are you sure you want to Logout?",
    emailConfirmModal: "Please check your email for verification.",
    resendConfirmationModal: "Please verify email address before login.",
    chooseYourServiceDrp: "Choose your service preference",
    chooseYourCompanyDrp: "Choose your company(optional)",
    tapMarkFavouriteLbl: "Tap to mark your favourite company",
    loading: "loading ...",
    noCompanyAvailable: "No company available",
    minimumAmountChargeMessage: "A minimum amount will be charged as a service fee. Any additional works to be performed will therefore cost extra charges.",
    dispachBtn: "Dispatch",
    dispachedBtn: "Dispatched",
    completeBookingBtn: "Job Completed",
    changePasswordBtn: "Change Password",
    save: "Save",
    priceStartAt: "Start at:",
    resetPasswordFail: "Somthing went wrong with your request, please make sure you enterd valid email address",
    teler: "Credit Card"
  },
  ar: {
    Dashboard: "لوحة القيادة",
    Schedules: "جدول",
    Tutorial: "الدورة التعليمية",
    Logout: "الخروج",
    Scheduler: "جدولة",
    Notification: "إعلام",
    Login: "تسجيل الدخول",
    forgotPassword: "هل نسيت كلمة المرور!",
    ForgotPasswordMenu: "غير كلمة السر",
    Profile: "تعديل الملف الشخصي",
    Email: "البريد الإلكتروني",
    sendResetLink: "إرسال رابط إعادة التعيين",
    Close: "قريب",
    Password: "كلمه السر",
    signIn: "تسجيل الدخول",
    signUp: "سجل",
    forgetPassword: "نسيت كلمة المرور؟",
    continueFacebook: "تواصل مع الفيسبوك",
    continueGuest: "تواصل كضيف",
    agreeTerms: "عن طريق إنشاء أو تسجيل الدخول إلى حساب أنت توافق مع شركائنا",
    termsConditions: "أحكام وشروط",
    and: "و",
    privacyStatement: "سياسة خاصة",
    Arabic: "English",
    Search: "بحث",
    bookingSuccess: "الحجز مقبول بنجاح.",
    alreadyAccepted: "الحجز مقبول بالفعل",
    youAccepted: "لقد قمت بالفعل بقبول الحجز.",
    otherAccepted: "قام مزود خدمة آخر بالحجز قبل الحجز.",
    acceptBookingErr: "حدث خطأ ما أثناء قبول طلب الحجز.",
    cancelSuccess: "تم إلغاء الحجز بنجاح.",
    Unauthorized: "غير مصرح",
    cancelAlready: "لقد قمت بالفعل بإلغاء الحجز.",
    cancelBefore: "قام مزود خدمة آخر بإلغاء الحجز قبل.",
    cancelBookingErr: "حدث خطأ ما أثناء إلغاء طلب الحجز.",
    somethingWrong: "هناك خطأ ما. حاول مرة اخرى.",
    alreadyRated: "لقد قمت بالفعل بتقييم هذا الحجز.",
    bookingDetails: "تفاصيل الحجز",
    requestErr: "حدث خطأ ما أثناء معالجة ردك ، يرجى المحاولة مرة أخرى.",
    loginExpired: "لقد انتهت صلاحية تسجيل الدخول. يرجى تسجيل الدخول مرة أخرى لمزيد من المعالجة.",
    // "you have already rated this booking.": "لقد قمت بالفعل بتقييم هذا الحجز.",
    paypal: "الدفع بواسط باى بال",
    cash: "السيولة النقدية",
    choosePlaceTime: "اختر المكان والوقت",
    reviewRequest: "مراجعة الحجز",
    loginContinue: "الرجاء تسجيل الدخول للمتابعة.",
    thankYou: "تاكيد الحجز!",
    scheduleMarked: "شكرا لثقتك بنا",
    confirmAcceptBooking: "هل أنت متأكد من أنك تريد قبول هذا الحجز؟",
    "Alert!": "محزر!",
    sucess: "نجاح وظائف",
    Ok: "حسنا",
    Yes: "نعم فعلا",
    openCamera: "افتح الكاميرا",
    openImageExplorer: "فتح مستكشف الصور",
    descriptionErr: "يرجى إدخال وصف أقل من 500 كلمة",
    loginToLikeBanner: "الرجاء تسجيل الدخول أولاً لمثل banner",
    cameraPermissionErr: "تم رفض إذن الوصول إلى الكاميرا والصورة",
    imageSaveErr: "بعض الأخطاء تحدث أثناء حفظ الصورة ، يرجى المحاولة مرة أخرى.",
    imageAccessErr: "تم رفض الإذن للوصول إلى الصورة.",
    loginToBook: "الرجاء تسجيل الدخول أولاً لحجز الخدمة",
    January: "كانون الثاني",
    February: "شهر فبراير",
    March: "مارس",
    April: "أبريل",
    May: "قد",
    June: "يونيو",
    July: "يوليو",
    August: "أغسطس",
    September: "سبتمبر",
    October: "شهر اكتوبر",
    November: "شهر نوفمبر",
    December: "ديسمبر",
    confirmCancelBooking: "هل أنت متأكد من أنك تريد إلغاء هذا الحجز؟",
    Address: "عنوان",
    Submit: "خضع",
    InvalidCredentialMeg: "بريد إلكتروني أو كلمة مرور خاطئة ، يرجى إدخال بريد إلكتروني وكلمة مرور صالحين.",
    validEmailErr: "الرجاء إدخال عنوان بريد إلكتروني صالح.",
    requireEmailPassword: "يرجى إدخال البريد الإلكتروني وكلمة المرور.",
    requireEmailErr: "الرجاء إدخال عنوان البريد الإلكتروني.",
    FirstNameErr: "الإسم الأول مطلوب.",
    LastNameErr: "الاسم الأخير مطلوب.",
    EmailErr: "البريد الالكتروني مطلوب.",
    PasswdErr: "كلمة المرور مطلوبة.",
    ConfirmPasswdErr: "تأكيد كلمة المرور مطلوب.",
    PhoneErr: "الهاتف مطلوب.",
    InvalidEmail: "البريد الإلكتروني غير صالح.",
    PasswdMatchErr: "كلمة المرور وتأكيد كلمة المرور غير متطابقين.",
    goToLogin: "اذهب إلى تسجيل الدخول",
    CheckOut: "دفع ويغادر الفندق",
    letsGo: "لنذهب",
    proceed: "تقدم",
    sure: "إذا كنت متأكدا الآن",
    serviceCharge: "سيتم إضافة رسوم الخدمة.",
    feature: "متميز",
    favourite: "أضف المفضلة لديك!",
    imageUpload: "تحميل الصور",
    call: "اتصل بنا الآن",
    book: "احجز الآن",
    location: "إضافة الموقع يدويا",
    map: "خرائط جوجل",
    addressErr: "يرجى إدخال عنوانك أو تحديد على الخريطة.",
    addressLengthErr: "الحد الأقصى المسموح به 300 حرف في العنوان.",
    dateErr: "يرجى تحديد التاريخ.",
    timeErr: "يرجى تحديد الوقت.",
    locationSelect: "اختر موقعا",
    sureLogout: "هل أنت متأكد أنك تريد تسجيل الخروج؟",
    emailConfirmModal: "يرجى التحقق من بريدك الالكتروني للتحقق.",
    resendConfirmationModal: "يرجى التحقق من عنوان البريد الإلكتروني قبل تسجيل الدخول.",
    chooseYourServiceDrp: "اختيار تفضيل الخدمة الخاصة بك",
    chooseYourCompanyDrp: "اختر شركتك (اختياري)",
    tapMarkFavouriteLbl: "انقر لتمييز الشركة المفضلة لديك",
    loading: "جار التحميل ...",
    noCompanyAvailable: "لا توجد شركة متاحة",
    minimumAmountChargeMessage: "سيتم فرض حد أدنى للمبلغ كرسوم خدمة. أي أعمال إضافية يتم تنفيذها ستكلف بالتالي رسومًا إضافية.",
    dispachBtn: "إيفاد",
    dispachedBtn: "أرسل",
    completeBookingBtn: "أنجزت المهمة",
    changePasswordBtn: "غير كلمة السر",
    save: "حفظ",
    priceStartAt: "يبدأ من:",
    resetPasswordFail: "حدث خطأ ما في طلبك ، يرجى التأكد من إدخال عنوان بريد إلكتروني صالح",
    teler: "بطاقة الائتمان"
  }
};

// Sentry.enableInExpoDevelopment = false;
// Sentry.config('https://a2cf35bd356f4d95aa002ecc897cf041@sentry.io/210554').install();

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware())(
  createStore
);
const store = createStoreWithMiddleware(reducers);

const WrappedRouter = () => {
  return <Router screenProps={{ t: i18n.getFixedT() }} />;
};
// const TopLevelNavigator = createStackNavigator({
//   dashBoard: {
//     screen: Dashboard,
//   }
// });

// const AppContainer = createAppContainer(TopLevelNavigator);

// Desativando warning da versão do MapView
console.ignoredYellowBox = [
  "Warning: View.propTypes has been deprecated and will be removed in a future version of ReactNative. Use ViewPropTypes instead."
];

if ((process.env.NODE_ENV || "").toLowerCase() === "production") {
  // disable console. log in production
  console.log("Disable log");
  console.log = function () { };
  console.info = function () { };
  console.warn = function () { };
  console.error = function () { };
  console.debug = function () { };
  console.log("Log disabled. If this shows there is a problem.");
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isReady: false
    };
    this.redirectToRoute = this.redirectToRoute.bind(this);
    this.setPushNotificationConfigurations = this.setPushNotificationConfigurations.bind(
      this
    );
  }

  async componentWillMount() {
    try {
      await Expo.ScreenOrientation.allowAsync(Expo.ScreenOrientation.Orientation.PORTRAIT);
      Amplitude.initialize("fba2640d268c3214141315cb738f18e0");
      this._cacheResourcesAsync();
      i18ns.locale = "en";
      this.setPushNotificationConfigurations();    
    } catch (e) {
      console.error(e)
    }
  }
  setPushNotificationConfigurations() {
    Expo.Notifications.createChannelAndroidAsync("chores-notification", {
      name: "Chores Notification",
      priority: "max",
      vibrate: [0, 250, 250, 250],
      sound: true
    });
  }
  redirectToRoute = route => {
    const navigate = NavigationActions.navigate({ routeName: route });
    this.props.navigation.navigate(navigate);
  };
  render() {
    if (!this.state.isReady) {
      return (
        <Loading />
        // <LetsGo />
        //  <Provider store={store}>
        //    <Reference />
        //  </Provider>
      );
    }

    return (
      <StyleProvider style={getTheme(material)}>
        <I18nextProvider i18n={i18n}>
          <Provider store={store}>
            <WrappedRouter />
          </Provider>
        </I18nextProvider>
      </StyleProvider>
    );
  }

  async _cacheResourcesAsync() {
    await Font.loadAsync({
      AvenirLTStdBlack: require("./assets/fonts/AvenirLTStd-Black.ttf"),
      AvenirLTStdBlackOblique: require("./assets/fonts/AvenirLTStd-BlackOblique.ttf"),
      AvenirLTStdBook: require("./assets/fonts/AvenirLTStd-Book.ttf"),
      AvenirLTStdBookOblique: require("./assets/fonts/AvenirLTStd-BookOblique.ttf"),
      AvenirLTStdHeavy: require("./assets/fonts/AvenirLTStd-Heavy.ttf"),
      AvenirLTStdHeavyOblique: require("./assets/fonts/AvenirLTStd-HeavyOblique.ttf"),
      AvenirLTStdLight: require("./assets/fonts/AvenirLTStd-Light.ttf"),
      AvenirLTStdLightOblique: require("./assets/fonts/AvenirLTStd-LightOblique.ttf"),
      AvenirLTStdMedium: require("./assets/fonts/AvenirLTStd-Medium.ttf"),
      AvenirLTStdMediumOblique: require("./assets/fonts/AvenirLTStd-MediumOblique.ttf"),
      AvenirLTStdOblique: require("./assets/fonts/AvenirLTStd-Oblique.ttf"),
      AvenirLTStdRoman: require("./assets/fonts/AvenirLTStd-Roman.ttf"),
      icomoon: require("./assets/fonts/icomoon.ttf"),
      Lato: require("./assets/fonts/Lato2OFL/Lato-Regular.ttf"),
      "Quicksand-Regular": require("./assets/fonts/Quicksand-Regular.ttf"),
      "Quicksand-Bold": require("./assets/fonts/Quicksand-Bold.ttf"),
      "Quicksand-Medium": require("./assets/fonts/Quicksand-Medium.ttf"),
      "Quicksand-Light": require("./assets/fonts/Quicksand-Light.ttf")
    });
    setTimeout(() => {
      this.setState({ isReady: true });
    }, 5000);
  }
}

export default App;
