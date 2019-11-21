import { combineReducers } from "redux";
import StartReducer from "./components/Start/reducer";
import DashboardReducer from "./components/Dashboard/reducer";
import PartialReducer from "./partial/reducer";
import CustomerSchedule from "./components/ScheduleCalendar/reducer";
import Notification from "./components/Notification/reducer";
import BookingDetails from "./components/BookingDetails/reducer";
import AgentSchedule from "./components/AgentSchedule/reducer";
import AgentNotification from "./components/AgentNotification/reducer";
import PaymentSuccess from "./components/PaymentSuccess/reducer";
import PrivacyPolicy from "./components/PrivacyPolicy/reducer";
import Provider from "./components/Provider/reducer";
import ReviewRequest from "./components/ReviewRequest/reducer";
import Search from "./components/Search/reducer";
import ThankYou from "./components/ThankYou/reducer";
import CategoryDetails from "./components/CategoryDetails/reducer";
import TelerPayment from "./components/TelerPayment/reducer";

// import HomeReducer from './components/Home/reducer'
// import ReferenceReducer from './components/Reference/reducer'
// import StoryDetailsReducer from './components/StoryDetails/reducer'
// import QuestionAnswerDetailsReducer from './components/QuestionAnswerDetails/reducer'
// import WritingBoxReducer from './components/WritingBox/reducer'
// import AboutReducer from './components/About/reducer'
// import HelpReducer from './components/Help/reducer'
// import LinksReducer from './components/Links/reducer'
// import AudioReducer from './components/AudioDetails/reducer'
// import StoryReducer from './components/Story/reducer'

export default combineReducers({
  start: StartReducer,
  dashBoard: DashboardReducer,
  partial: PartialReducer,
  customerSchedule: CustomerSchedule,
  notification: Notification,
  bookingDetails: BookingDetails,
  agentSchedule: AgentSchedule,
  agentNotification: AgentNotification,
  paymentSuccess: PaymentSuccess,
  privacyPolicy: PrivacyPolicy,
  provider: Provider,
  reviewRequest: ReviewRequest,
  search: Search,
  thankYou: ThankYou,
  categoryDetailsNew: CategoryDetails,
  telerPayment: TelerPayment
});
