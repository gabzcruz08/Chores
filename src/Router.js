import React from "react";
import { StackNavigator } from "react-navigation";
import Start from "./components/Start";
import { DrawerNavigator, DrawerItems } from "react-navigation";
import {
  Container,
  Header,
  Footer,
  Content,
  Left,
  Body,
  Icon,
  Drawer
} from "native-base";
import RF from "react-native-responsive-fontsize";
import {
  Image,
  AsyncStorage,
  Text,
  TouchableOpacity,
  View,
  Alert
} from "react-native";
import LetsGo from "./components/LetsGo";
import { WhatYouNeed } from "./components/WhatYouNeed";
import Dashboard from "./components/Dashboard";
import Search from "./components/Search";
import Notification from "./components/Notification";
import Schedules from "./components/Schedules";
import ReviewRequest from "./components/ReviewRequest";
import ThankYou from "./components/ThankYou";
import ScheduleCalendar from "./components/ScheduleCalendar";
import Provider from "./components/Provider";
import TermsAndConditions from "./components/TermsAndConditions";
import PrivacyPolicy from "./components/PrivacyPolicy";
import BookingDetails from "./components/BookingDetails";
import AgentScheduleCalendar from "./components/AgentSchedule";
import AgentNotification from "./components/AgentNotification";
import SideBar from "./partial/sidebar";
import PaymentSuccess from "./components/PaymentSuccess";
import Loading from "./components/Loading";
import Profile from "./components/Profile";
import ForgotPassword from "./components/ForgotPassword";
import CategoryDetails from "./components/CategoryDetails";
import TelerPayment from "./components/TelerPayment";

const Router = StackNavigator(
  {
    start: { screen: Start },
    whatYouNeed: { screen: WhatYouNeed },
    letsGo: { screen: LetsGo },
    loading: { screen: Loading },
    search: { screen: Search },
    dashBoard: { screen: Dashboard },
    notification: { screen: Notification },
    schedules: { screen: Schedules },
    reviewRequest: { screen: ReviewRequest },
    thankYou: { screen: ThankYou },
    scheduleCalendar: { screen: ScheduleCalendar },
    provider: { screen: Provider },
    bookingDetails: { screen: BookingDetails },
    agentScheduleCalendar: { screen: AgentScheduleCalendar },
    agentNotification: { screen: AgentNotification },
    paymentSuccess: { screen: PaymentSuccess },
    profile: { screen: Profile },
    forgotpassword: { screen: ForgotPassword },
    telerPayment: { screen: TelerPayment }
    // forgotpassword: { screen: ForgotPassword },
    // register: { screen: Register },
    // home: { screen: Home },
    // reference: { screen: Reference },
    // storydetails: { screen: StoryDetails },
    // questionanswerdetails: { screen: QuestionAnswerDetails },
    // writingbox: { screen: WritingBox },
    // about: { screen: About },
    // help: { screen: Help },
    // links: { screen: Links },
    // audio: { screen: Audio },
  },
  {
    initialRouteName: "letsGo",
    headerMode: "none",
    navigationOptions: {
      headerTintColor: "blue"
    }
  }
);

function _logout() {
  Alert.alert(
    "Wait",
    "Are you sure you want to Logout?",
    [
      { text: "OK", onPress: () => console.log("ok pressed") },
      { text: "Cancel", onPress: () => console.log("Cancel Pressed") }
    ],
    { cancelable: true }
  );
}
const loginUserFullName = "";

try {
  AsyncStorage.multiGet(["userFirstName", "userLastName"]).then(data => {
    loginUserFullName = data[0][1] + " " + data[1][1];
  });
} catch (e) {
  console.error(e)
}

//console.log(this);

const CustomDrawerContentComponent = props => {
  var fullname = "";
  if (props.items[1].params != undefined) {
    fullname = props.items[1].params.userName;
  }

  return (
    <Container>
      <Header
        style={{
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#ffaa1a",
          marginTop: 24,
          height: RF(12)
        }}
      >
        <Body
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: "auto",
            marginBottom: "auto"
          }}
        >
          <Image
            source={require("../assets/images/splash/Webp.net-resizeimage.png")}
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: 150,
              height: 117.07,
              marginTop: "auto",
              marginBottom: "auto"
            }}
          />
        </Body>
      </Header>
      <Content style={{ borderWidth: 0 }}>
        <DrawerItems {...props} />
        <Text>Hello World</Text>
      </Content>
    </Container>
  );
};

const MyApp = DrawerNavigator(
  {
    dashBoard: {
      screen: Dashboard,
      navigationOptions: {
        title: "Dashboard",
        header: { header: null },
        headerMode: "none"
        //drawerLabel: () => null,
      }
    },
    bookingDetails: {
      screen: BookingDetails,
      navigationOptions: {
        title: "BookingDetails",
        header: { header: null },
        headerMode: "none"
      }
    },
    termsandconditions: {
      screen: TermsAndConditions,
      navigationOptions: {
        title: "Terms & Conditions",
        header: { header: null },
        headerMode: "none"
        //drawerLabel: () => null,
      }
    },
    privacypolicy: {
      screen: PrivacyPolicy,
      navigationOptions: {
        title: "Privacy Statement",
        header: { header: null },
        headerMode: "none"
        //drawerLabel: () => null,
      }
    },
    paymentSuccess: {
      screen: PaymentSuccess,
      navigationOptions: {
        title: "Payment Success",
        header: { header: null },
        headerMode: "none"
        //drawerLabel: () => null,
      }
    },
    letsGo: {
      screen: LetsGo,
      navigationOptions: {
        title: "Lets Go",
        header: { header: null },
        headerMode: "none",
        drawerLabel: () => null,
        drawerLockMode: "locked-closed"
      }
    },
    loading: {
      screen: Loading,
      navigationOptions: {
        title: "Loading",
        header: { header: null },
        headerMode: "none",
        drawerLabel: () => null,
        drawerLockMode: "locked-closed"
      }
    },
    notification: {
      screen: Notification,
      navigationOptions: {
        title: "Notification",
        header: { header: null },
        headerMode: "none",
        drawerLabel: () => null
      }
    },
    whatYouNeed: {
      screen: WhatYouNeed,
      navigationOptions: {
        title: "What You Need",
        header: { header: null },
        headerMode: "none",
        drawerLabel: () => null
      }
    },
    search: {
      screen: Search,
      navigationOptions: {
        title: "Search",
        header: { header: null },
        headerMode: "none",
        drawerLabel: () => null
      }
    },
    start: {
      screen: Start,
      navigationOptions: {
        title: "Login",
        header: { header: null },
        headerMode: "none",
        drawerLabel: () => null,
        drawerLockMode: "locked-closed"
      }
    },
    schedules: {
      screen: Schedules,
      navigationOptions: {
        title: "Schedules",
        header: { header: null },
        headerMode: "none",
        drawerLabel: () => null
      }
    },
    telerPayment: {
      screen: TelerPayment,
      navigationOptions: {
        title: "Payment",
        header: { header: null },
        headerMode: "none",
        drawerLabel: () => null
      }
    },
    reviewRequest: {
      screen: ReviewRequest,
      navigationOptions: {
        title: "ReviewRequest",
        header: { header: null },
        headerMode: "none",
        drawerLabel: () => null
      }
    },
    // categoriesDetailsNew:
    // {
    //   screen: CategoriesDetailsNew,
    //   navigationOptions: {
    //     title: 'categoriesDetailsNew',
    //     header: { header: null },
    //     headerMode: 'none',
    //     drawerLabel: () => null,
    //   },
    // },
    categoriesDetailsNew: {
      screen: CategoryDetails,
      navigationOptions: {
        title: "categoriesDetails",
        header: { header: null },
        headerMode: "none",
        drawerLabel: () => null
      }
    },
    scheduleCalendar: {
      screen: ScheduleCalendar,
      navigationOptions: {
        title: "scheduleCalendar",
        header: { header: null },
        headerMode: "none",
        drawerLabel: () => null
      }
    },
    thankYou: {
      screen: ThankYou,
      navigationOptions: {
        title: "Thank You",
        header: { header: null },
        headerMode: "none",
        drawerLabel: () => null
      }
    },
    provider: {
      screen: Provider,
      navigationOptions: {
        title: "Provider",
        header: { header: null },
        headerMode: "none",
        drawerLabel: () => null
      }
    },
    // logout: {
    //   screen: Logout,
    //   navigationOptions: {
    //     title: 'Logout', // Text shown in left menu
    //     header: { header: null },
    //     headerMode: 'none',
    //   },
    // },
    agentScheduleCalendar: {
      screen: AgentScheduleCalendar,
      navigationOptions: {
        title: "Schedule Calendar",
        header: { header: null },
        headerMode: "none",
        drawerLabel: () => null
      }
    },
    agentNotification: {
      screen: AgentNotification,
      navigationOptions: {
        title: "Agent Notification",
        header: { header: null },
        headerMode: "none",
        drawerLabel: () => null
      }
    },
    profile: {
      screen: Profile,
      navigationOptions: {
        title: "Profile",
        header: { header: null },
        headerMode: "none",
        drawerLabel: () => null
      }
    },
    forgotPassword: {
      screen: ForgotPassword,
      navigationOptions: {
        title: "Change Password",
        header: { header: null },
        headerMode: "none",
        drawerLabel: () => null
      }
    }
  },
  {
    initialRouteName: "start",
    contentComponent: props => <SideBar {...props} />, //CustomDrawerContentComponent,//
    drawerOpenRoute: "DrawerOpen",
    drawerCloseRoute: "DrawerClose",
    drawerToggleRoute: "DrawerToggle",
    headerMode: "none",
    navigationOptions: {
      //drawerLockMode: 'locked-closed'
    },
    contentOptions: {
      activeTintColor: "#ffaa1a",
      inactiveTintColor: "#000000",
      marginLeft: 0
    }
  }
);

export default MyApp;
