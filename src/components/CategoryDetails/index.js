import React, { Component } from "react";
import {
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  Platform,
  ScrollView,
  Alert,
  AsyncStorage,
  Linking,
  Dimensions
} from "react-native";
import { Button, Textarea, Item, Spinner } from "native-base";
import Modal from "react-native-modalbox";
import styles from "./styles";
import { Camera } from 'expo-camera';
import * as Font from "expo-font";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Col, Row, Grid } from "react-native-easy-grid";
import { CustomeFooterTab } from "../../partial/footer";
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome
} from "@expo/vector-icons";
import { LinearGradient } from "expo";
import Swiper from "react-native-swiper";
import Toast, { DURATION } from "react-native-easy-toast-fixed";
import {
  GetServiceOnCategory,
  GetCompanyOnService,
  GetSliderCompanies,
  GetBannersApi,
  LikeDisLikeBanner,
  GetPhoneNumber,
  GetFavouriteBannersApi,
  setLogoutState,
  GetCompanyDetails
} from "./action";
import RF from "react-native-responsive-fontsize";
import ModalDropdown from "react-native-modal-dropdown";
import { BackHandler } from "react-native";
import i18n from "react-native-i18n";
import Tooltip from "react-native-walkthrough-tooltip";
import { LogoutConfirmation } from "../../partial/LogoutConfirmation";
// import Tooltip from 'rn-tooltip';
// import Spinner from 'react-native-loading-spinner-overlay';

const mapStateToProps = state => ({
  // user: state.start.user
  languageCode: state.categoryDetailsNew.languageCode,
  isLoginPressed: state.dashBoard.isLoginPressed
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      //getDashboardServices
      GetServiceOnCategory,
      GetCompanyOnService,
      GetSliderCompanies,
      LikeDisLikeBanner,
      setLogoutState
    },
    dispatch
  );
class CategoriesDetails extends Component {
  constructor(props) {
    super(props);
    var loggedInResponse;
    this.state = {
      fontLoaded: true,
      data: [],
      dataArray: null,
      cetegorydata: null,
      modalVisible: false,
      serviceDrp: null,
      companyDrp: null,
      displayDescription: false,
      serviceData: {},
      companyData: {},
      squreGridHeight: null,
      equualHeight: null,
      hasCameraPermission: null,
      type: Camera.Constants.Type.back,
      sliderBanner: null,
      bigBanner: null,
      smallBanner: null,
      finalHeight: null,
      loadingService: false,
      spinnerVisible: false,
      descriptionErr: false,
      steps: 0,
      error: null,
      description: "",
      favouriteCompany: "",
      userId: "",
      selectedService: "",
      IsImage: false,
      selectedStateId: "",
      selectedState: "",
      uploadedImage: "",
      isImageViewVisible: false,
      modalStatus: false,
      buttonHeight: 0,
      customerCareNumber: null,
      drpModelWidth: 0,
      drpModelHeight: 0,
      drpModelInHeight: 0,
      favouriteBannerSectionHeight: null,
      IsFavourite: false,
      favouriteBanners: [],
      confirmModal: false,
      modalTitleMessage: "",
      IsLoginExpired: false,
      companySliders: [],
      toolTipVisible: false,
      selectedBannerCompany: "",
      favouriteCompanyName: "",
      markFavourite: false,
      servicePreferenceSelectionFlag: false,
      selectedCompanyName: "",

      //#region Height data
      mainScrollHeight: 0,
      secondSectionHeight: 0,
      companyDetailsResponse: {},
      companyId: 0
      //#endregion
    };
    this.setNotSureData = this.setNotSureData.bind(this);
    this.GetBanners = this.GetBanners.bind(this);
    this.setsteps = this.setsteps.bind(this);
    this.setService = this.setService.bind(this);
    this.setDescription = this.setDescription.bind(this);
    this._setLocationId = this._setLocationId.bind(this);
    this._removeImage = this._removeImage.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.getPhoneNumber = this.getPhoneNumber.bind(this);
    this.onBackPress = this.onBackPress.bind(this);
    this.renderFavoutiteBanner = this.renderFavoutiteBanner.bind(this);
    this.getFavouriteBanner = this.getFavouriteBanner.bind(this);
    this.rednerMulitipleFavourite = this.rednerMulitipleFavourite.bind(this);
    this.setTopRatedBannerToFavourite = this.setTopRatedBannerToFavourite.bind(
      this
    );
    this.openConfirmModal = this.openConfirmModal.bind(this);
    this.closeConfirmModal = this.closeConfirmModal.bind(this);
    this.logout = this.logout.bind(this);
    this.unAuthorized = this.unAuthorized.bind(this);
    this.checkFavouriteCompany = this.checkFavouriteCompany.bind(this);
    this.markAsFavouriteInSlider = this.markAsFavouriteInSlider.bind(this);
    this._dropdown_4_onSelect = this._dropdown_4_onSelect.bind(this);
    this.companyDataSet = this.companyDataSet.bind(this);
    this.renderBigAndSmallBanner = this.renderBigAndSmallBanner.bind(this);
    this.bigBannerDesign = this.bigBannerDesign.bind(this);
    this.rederSlider = this.rederSlider.bind(this);
    this.getCompanyDetails = this.getCompanyDetails.bind(this);
  }
  componentWillMount() {
    if (
      typeof this.props.navigation.state.params.data !== undefined &&
      this.props.navigation.state.params.data !== null
    ) {
      this.setCetegoriesData(this.props.navigation.state.params.data);
    }
    AsyncStorage.getItem("loggedInUserObj").then(value => {
      if (value != null) {
        this.loggedInResponse = JSON.parse(value);
      }
    });
    if (
      this.props.navigation.state.params &&
      this.props.navigation.state.params.from
    ) {
      if (this.props.navigation.state.params.from === "provider") {
        AsyncStorage.multiGet(
          [
            "cetegoryDetails",
            "selectedService",
            "bookingObj",
            "selectedCompanyName",
            "companyDrp"
          ],
          (err, result) => {
            if (err) {
              //console.log(err);
            } else {
              //console.log("Result is", result);
              var cetegoryDetails = result[0][1]
                ? JSON.parse(result[0][1])
                : null;
              var service = result[1][1] ? JSON.parse(result[1][1]) : null;
              var bookingObj = result[2][1] ? JSON.parse(result[2][1]) : null;
              var selectedCompany = result[3][1]
                ? JSON.parse(result[3][1])
                : null;
              var companyDrp = result[4][1] ? JSON.parse(result[4][1]) : null;
              if (cetegoryDetails && service) {
                this.setCetegoriesData(cetegoryDetails);
                this.setsteps(2);
                this.setService(service);
                this.setDescription(bookingObj);
                this.companyDataSet(selectedCompany, companyDrp);
              }
            }
          }
        );
      } else {
        AsyncStorage.setItem("bookingObj", "");
      }
    } else {
      AsyncStorage.setItem("bookingObj", "");
    }
    this._setLocationId();
  }

  companyDataSet(selectedCompany, companyDrp) {
    //console.log("Selected company data ", selectedCompany);
    if (selectedCompany) {
      let data = this.state.companyData;
      data.SelectedCompany = selectedCompany;
      this.setState({
        selectedCompanyName: selectedCompany.text,
        companyDrp: companyDrp,
        companyData: data,
        servicePreferenceSelectionFlag: true
      });
    }
  }
  onBackPress() {
    if (this.state.steps <= 1) {
      this.props.navigation.navigate("dashBoard");
    } else {
      this.setState({ steps: this.state.steps - 1 });
    }
    return true;
  }
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
    this.getPhoneNumber();
  }
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
  }
  _removeImage() {
    this.setState({ uploadedImage: "" });
    AsyncStorage.setItem("PickedImage", "");
  }

  _setLocationId() {
    try {
      AsyncStorage.multiGet(["selectedStateId", "selectedState"]).then(data => {
        if (data.length > 0) {
          var selectedStateId = JSON.parse(data[0][1]);
          var selectedState = JSON.parse(data[1][1]);
          this.setState({ selectedStateId: selectedStateId });
          this.setState({ selectedState: selectedState });
        }
      });
    } catch (ex) {
      //console.log(ex);
    }
  }
  setCetegoriesData(cetegoryDetails) {
    AsyncStorage.setItem("cetegoryDetails", JSON.stringify(cetegoryDetails));
    this.setState({ cetegorydata: cetegoryDetails });
    this.setState({ loadingService: true });
    this.props.GetServiceOnCategory(
      cetegoryDetails.id,
      serviceList => {
        this.setNotSureData(serviceList);
        this.setState({ loadingService: false });
      },
      errorDetails => {
        this.setState({ loadingService: false });
        this.refs.toast.show(i18n.t("somethingWrong"), DURATION.LENGTH_SHORT);
      }
    );
  }
  setsteps(number) {
    this.setState({ steps: number });
  }
  setService(data) {
    this.setState({ serviceData: data });
    AsyncStorage.getItem("selectedStateId", (error, result) => {
      this.GetBanners(result, data.SelectedService.id);
    });
  }
  setDescription(bookingObj) {
    this.setState({
      displayDescription: true,
      description:
        bookingObj.instruction !== undefined ? bookingObj.instruction : ""
    });
  }
  setNotSureData(serviceList) {
    // console.log("================= Set not sure element===================");
    if (serviceList) {
      var notSureIndex = -1;
      var notSureElement = null;
      var newArray = [];
      for (let index = 0; index < serviceList.length; index++) {
        const element = serviceList[index];
        if (
          `${element.name}`.toString().toUpperCase() ===
          "not sure".toUpperCase()
        ) {
          notSureIndex = index;
          notSureElement = element;
        } else {
          newArray.push(element);
        }
      }
      if (notSureIndex != -1) {
        newArray.push(notSureElement);
      }
      this.setState({ serviceDrp: newArray });
    } else {
    }
  }
  renderPopup() {
    this.props.navigation.navigate("DrawerClose");
    this.refs.logoutConfirmation.openModal();
    this.props.setLogoutState(false, data => {});
  }

  render() {
    var servicePreferenceSelection = 0;
    this.state.servicePreferenceSelectionFlag == true
      ? (servicePreferenceSelection = RF(0.1))
      : (servicePreferenceSelection = 0);
    return (
      <View style={styles.container}>
        <LogoutConfirmation
          isOpen="false"
          ref="logoutConfirmation"
          {...this.props}
        />
        {this.props.isLoginPressed == true ? this.renderPopup() : null}

        <View
          style={[
            styles.ImageParentView,
            { height: this.heightCalculator(12.8) }
          ]}
        >
          <View style={styles.ImageUpperView} />
          <View style={[styles.ImageView]}>
            <Grid style={styles.hundredHeightWidth}>
              <Col size={15} style={[styles.AllCenter]}>
                <TouchableOpacity
                  onPress={() => {
                    this.onBackPress();
                  }}
                  hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
                >
                  <Image
                    source={require("../../../assets/images/back_arrow.png")}
                    style={styles.headerBackArrow}
                  />
                </TouchableOpacity>
              </Col>
              <Col size={65} style={styles.CenterStart}>
                <Text style={styles.headerText}>
                  {this.state.cetegorydata
                    ? this.state.cetegorydata.name
                    : null}
                </Text>
              </Col>
              <Col size={30} style={[styles.CenterStart]}>
                {this.state.serviceData &&
                this.state.serviceData.SelectedService ? (
                  <View style={styles.priceViewWrapper}>
                    <Text
                      style={{
                        color: "white",
                        fontSize: RF(2.2),
                        fontFamily: "Quicksand-Bold"
                      }}
                    >
                      {i18n.t("priceStartAt")}
                    </Text>
                    <View style={styles.priceView}>
                      <TouchableOpacity
                        onPress={() => {
                          this.setState({ toolTipVisible: true });
                        }}
                      >
                        <Tooltip
                          isVisible={this.state.toolTipVisible}
                          content={
                            <View
                              style={{
                                flex: 1,
                                flexDirection: "column",
                                marginLeft: "5%",
                                marginRight: "5%",
                                width: "90%"
                              }}
                            >
                              <Text
                                style={{
                                  fontFamily: "Quicksand-Regular",
                                  fontSize: RF(2)
                                }}
                              >
                                {i18n.t("minimumAmountChargeMessage")}
                              </Text>
                              <Text />
                              {this.state.selectedCompanyName != "" ? (
                                <View style={{ flex: 1, flexDirection: "row" }}>
                                  <View
                                    style={{ width: "35%", marginRight: 2 }}
                                  >
                                    <Text
                                      style={{
                                        fontFamily: "Quicksand-Regular",
                                        fontSize: RF(2)
                                      }}
                                    >
                                      Company:{" "}
                                    </Text>
                                  </View>
                                  <View style={{ width: "65%" }}>
                                    <Text
                                      style={{
                                        color: "#ffaa1a",
                                        fontFamily: "Quicksand-Regular",
                                        fontSize: RF(2)
                                      }}
                                    >
                                      {this.state.selectedCompanyName}
                                    </Text>
                                  </View>
                                </View>
                              ) : null}
                            </View>
                          }
                          placement="bottom"
                          contentStyle={{ height: "auto", width: RF(35) }}
                          onClose={() =>
                            this.setState({ toolTipVisible: false })
                          }
                        >
                          <Text
                            style={{
                              color: "orange",
                              fontSize: RF(2.2),
                              fontFamily: "Quicksand-Bold"
                            }}
                          >
                            {this.state.serviceData &&
                            this.state.serviceData.SelectedService &&
                            this.state.companyData &&
                            this.state.companyData.SelectedCompany
                              ? this.state.companyData.SelectedCompany.price ===
                                undefined
                                ? this.state.companyData.price
                                : this.state.companyData.SelectedCompany.price
                              : this.state.serviceData &&
                                this.state.serviceData.SelectedService
                              ? this.state.serviceData.SelectedService.price
                              : "0"}{" "}
                            AED{" "}
                          </Text>
                        </Tooltip>
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : null}
              </Col>
            </Grid>
          </View>
        </View>
        <ScrollView
          style={{ marginTop: this.heightCalculator(-12.8) }}
          ref="scroll"
        >
          <View
            style={[
              {
                height: this.heightCalculator(40, "First view height"),
                width: "100%"
              }
            ]}
          >
            {this.state.cetegorydata ? (
              <ImageBackground
                source={{ uri: this.state.cetegorydata.banner }}
                style={styles.backgroundImage}
              >
                {this.state.steps == 2 && this.state.companyDetailsResponse ? (
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "row",
                      marginTop: RF(15)
                    }}
                  >
                    <Image
                      source={{ uri: this.state.companyDetailsResponse.logo }}
                      style={{ height: 130, width: 130, borderRadius: 65 }}
                    />
                  </View>
                ) : null}

                <TouchableOpacity
                  style={{
                    position: "absolute",
                    bottom: 20,
                    right: 10,
                    height: 60,
                    width: 60
                  }}
                  onPress={() => {
                    Linking.openURL("https://wa.me/971523389399?text=");
                  }}
                >
                  <Image
                    source={require("../../../assets/images/whatsapp_icon_new_96.png")}
                    style={{ height: 60, width: 60 }}
                  />
                </TouchableOpacity>
              </ImageBackground>
            ) : null}
          </View>
          <View
            style={[
              {
                width: "100%",
                marginTop: -(
                  this.heightCalculator(5.49, "Second view height minus") / 2
                )
              }
            ]}
          >
            <View
              style={[
                styles.RGR1,
                {
                  height: this.heightCalculator(
                    5.49,
                    "Second view height minus"
                  ),
                  width: "100%"
                }
              ]}
            >
              <View
                style={{
                  borderColor: "red",
                  borderWidth: servicePreferenceSelection,
                  height: "100%",
                  width: this.widthCalculator(
                    71.44,
                    "Second view height minus"
                  ),
                  marginLeft: "auto",
                  marginRight: "auto"
                }}
              >
                <LinearGradient
                  style={[styles.DrpGredientView]}
                  colors={["#ff9c00", "#ffbe00"]}
                >
                  <View
                    style={styles.spaceBetweenElements}
                    onLayout={event => {
                      var { x, y, width, height } = event.nativeEvent.layout;
                      this.setState({
                        drpModelWidth: width,
                        drpModelHeight: height
                      });
                    }}
                  >
                    {this.state.serviceDrp &&
                    this.state.serviceDrp.length > 0 ? (
                      <ModalDropdown
                        ref="dropdown_2"
                        style={[styles.drpModelStyle]}
                        textStyle={{ width: "100%" }}
                        dropdownStyle={[
                          styles.drpOuterStyle,
                          {
                            height: this.drpDynamicHeight(),
                            marginTop: this.drpMarginTop(),
                            marginBottom: "auto",
                            width: this.state.drpModelWidth
                          }
                        ]}
                        options={this.state.serviceDrp}
                        renderRow={this._dropdown_2_renderRow.bind(this)}
                        onSelect={(idx, value) =>
                          this._dropdown_4_onSelect(idx, value)
                        }
                        onLayout={event => {
                          var {
                            x,
                            y,
                            width,
                            height
                          } = event.nativeEvent.layout;
                          this.setState({ drpModelInHeight: height });
                        }}
                      >
                        <View
                          style={[styles.spaceCenter, { flexDirection: "row" }]}
                        >
                          <View style={{ width: "90%" }}>
                            {this.state.serviceData &&
                            this.state.serviceData.SelectedService ? (
                              <Text style={[styles.textSelectDropdown]}>
                                {this.state.serviceData.SelectedService.name}
                              </Text>
                            ) : (
                              <Text style={[styles.textSelectDropdown]}>
                                {i18n.t("chooseYourServiceDrp")}
                              </Text>
                            )}
                          </View>
                          <View style={{ width: "10%" }}>
                            <Ionicons
                              name="md-arrow-dropdown"
                              size={32}
                              color="#fff"
                              style={styles.iconDrp}
                            />
                          </View>
                        </View>
                      </ModalDropdown>
                    ) : this.state.loadingService ? (
                      <Text style={[styles.textSelectDropdown]}>
                        {i18n.t("loading")}
                      </Text>
                    ) : (
                      <Text style={[styles.textSelectDropdown]}>
                        No service available
                      </Text>
                    )}
                  </View>
                </LinearGradient>
              </View>
            </View>
            {this.renderSpaceDivider()}
            <View
              style={[
                styles.RGR1,
                {
                  height: this.heightCalculator(
                    5.49,
                    "Second view height minus"
                  ),
                  width: "100%"
                }
              ]}
            >
              <View
                style={{
                  borderColor: "red",
                  borderWidth: servicePreferenceSelection,
                  height: "100%",
                  width: this.widthCalculator(
                    71.44,
                    "Second view height minus"
                  ),
                  marginLeft: "auto",
                  marginRight: "auto"
                }}
              >
                <LinearGradient
                  style={[styles.DrpGredientView]}
                  colors={["#ff9c00", "#ffbe00"]}
                >
                  <View
                    style={styles.spaceBetweenElements}
                    onLayout={event => {
                      var { x, y, width, height } = event.nativeEvent.layout;
                      this.setState({
                        drpModelWidth: width,
                        drpModelHeight: height
                      });
                    }}
                  >
                    {this.state.companyDrp &&
                    this.state.companyDrp.length > 0 ? (
                      <ModalDropdown
                        ref="dropdown_3"
                        style={[styles.drpModelStyle]}
                        textStyle={{ width: "100%" }}
                        dropdownStyle={[
                          styles.drpOuterStyle,
                          {
                            height: this.drpDynamicHeightCo(),
                            marginTop: this.drpMarginTop(),
                            marginBottom: "auto",
                            width: this.state.drpModelWidth
                          }
                        ]}
                        options={this.state.companyDrp}
                        renderRow={this.companyDropDownRow.bind(this)}
                        onSelect={(idx, value) =>
                          this.companyOnSelect(idx, value)
                        }
                        onLayout={event => {
                          var {
                            x,
                            y,
                            width,
                            height
                          } = event.nativeEvent.layout;
                          this.setState({ drpModelInHeight: height });
                        }}
                      >
                        <View
                          style={[styles.spaceCenter, { flexDirection: "row" }]}
                        >
                          <View style={{ width: "90%" }}>
                            {this.state.selectedCompanyName !== "" ? (
                              <Text style={[styles.textSelectDropdown]}>
                                {this.state.selectedCompanyName}
                              </Text>
                            ) : (
                              <Text style={[styles.textSelectDropdown]}>
                                {i18n.t("chooseYourCompanyDrp")}
                              </Text>
                            )}
                          </View>
                          <View style={{ width: "10%" }}>
                            <Ionicons
                              name="md-arrow-dropdown"
                              size={32}
                              color="#fff"
                              style={styles.iconDrp}
                            />
                          </View>
                        </View>
                        {/* <View style={[styles.spaceCenter]}>
                                                    {this.state.selectedCompanyName !== '' ?
                                                        <Text style={[styles.textSelectDropdown]}>{this.state.selectedCompanyName}</Text> :
                                                        <Text style={[styles.textSelectDropdown]}>{i18n.t("chooseYourCompanyDrp")}</Text>
                                                    }
                                                    <Ionicons name="md-arrow-dropdown" size={32} color="#fff" style={styles.iconDrp} />
                                                </View> */}
                      </ModalDropdown>
                    ) : this.state.serviceData &&
                      this.state.serviceData.SelectedService ? (
                      <Text style={[styles.textSelectDropdown]}>
                        {i18n.t("noCompanyAvailable")}
                      </Text>
                    ) : this.state.loadingService ? (
                      <Text style={[styles.textSelectDropdown]}>
                        {i18n.t("loading")}
                      </Text>
                    ) : (
                      <Text style={[styles.textSelectDropdown]}>
                        {i18n.t("chooseYourCompanyDrp")}
                      </Text>
                    )}
                  </View>
                </LinearGradient>
              </View>
            </View>
            {this.state.steps != 2 ? this.renderSpaceDivider() : null}
            {this.renderStep(this.state.steps)}
          </View>
          {this.state.steps == 2 &&
          this.state.companyDetailsResponse &&
          this.state.companyDetailsResponse.images &&
          this.state.companyDetailsResponse.images.length > 0 ? (
            <View style={{ width: "100%" }}>
              {Platform.OS === "ios"
                ? this.getIosSliderView()
                : this.getAndroidSliderView()}
            </View>
          ) : null}
          {this.state.steps == 2 && this.state.companyDetailsResponse ? (
            <View style={styles.companyName}>
              <View>
                <Text style={styles.companyText}>
                  {this.state.companyDetailsResponse.name}
                </Text>
              </View>
              <View>
                <Text style={styles.companyShortDescription}>
                  {this.state.companyDetailsResponse.short_description}
                </Text>
              </View>
              <View>
                <Text style={styles.companyLongDescription}>
                  {this.state.companyDetailsResponse.long_description}
                </Text>
              </View>
            </View>
          ) : null}
        </ScrollView>
        {this.renderModel4()}
        {this.renderModel5()}
        <Toast
          ref="toast"
          style={{ backgroundColor: "#000" }}
          position="bottom"
          positionValue={130}
          fadeInDuration={1000}
          fadeOutDuration={1000}
          opacity={0.9}
          textStyle={{ color: "#fff" }}
        />
        <CustomeFooterTab ref="footer" {...this.props} />
        {this.state.spinnerVisible ? (
          <View style={styles.loading}>
            <Spinner color="#fff" />
          </View>
        ) : null}
      </View>
    );
  }
  getIosSliderView() {
    return (
      <Swiper
        containerStyle={[
          styles.wrapper,
          {
            alignItems: "center",
            justifyContent: "center",
            width: "100%"
          }
        ]}
        loop={false}
        horizontal={true}
        height={200}
        dot={
          <Image
            source={require("../../../assets/images/dot_outline.png")}
            style={{
              backgroundColor: "rgba(0,0,0,0)",
              height: RF(2),
              width: RF(2),
              marginLeft: RF(0.5),
              marginRight: RF(0.5)
            }}
          />
        }
        activeDot={
          <Image
            source={require("../../../assets/images/dot-filled.png")}
            style={{
              backgroundColor: "rgba(0,0,0,0)",
              height: RF(2),
              width: RF(2),
              margin: RF(0.5),
              marginRight: RF(0.5)
            }}
          />
        }
      >
        {this.renderCompanyLogo()}
      </Swiper>
    );
  }
  getAndroidSliderView() {
    return (
      <Swiper
        style={[
          styles.wrapper,
          {
            alignItems: "center",
            justifyContent: "center",
            width: "100%"
          }
        ]}
        loop={false}
        horizontal={true}
        height={200}
        dot={
          <Image
            source={require("../../../assets/images/dot_outline.png")}
            style={{
              backgroundColor: "rgba(0,0,0,0)",
              height: RF(2),
              width: RF(2),
              marginLeft: RF(0.5),
              marginRight: RF(0.5)
            }}
          />
        }
        activeDot={
          <Image
            source={require("../../../assets/images/dot-filled.png")}
            style={{
              backgroundColor: "rgba(0,0,0,0)",
              height: RF(2),
              width: RF(2),
              margin: RF(0.5),
              marginRight: RF(0.5)
            }}
          />
        }
      >
        {this.renderCompanyLogo()}
      </Swiper>
    );
  }
  renderCompanyLogo() {
    if (
      this.state.companyDetailsResponse &&
      this.state.companyDetailsResponse.images &&
      this.state.companyDetailsResponse.images.length > 0
    ) {
      let imageCount = this.state.companyDetailsResponse.images.length;
      let sliderSize = 2;
      let sliderWindowCount = Math.ceil(imageCount / sliderSize);
      let slider = [];
      for (let i = 0; i < sliderWindowCount; i++) {
        let imagesView = [];
        for (let j = 0; j < sliderSize; j++) {
          let img = this.state.companyDetailsResponse.images[
            i * sliderSize + j
          ];
          imagesView.push(
            <View style={styles.imageContainer}>
              <Image source={{ uri: img }} style={styles.logoDim} />
            </View>
          );
        }
        let sliderViewContainer = (
          <View style={styles.companyLogo}>{imagesView}</View>
        );
        slider.push(sliderViewContainer);
      }
      return slider;
      // var rtnData = [];
      // var count = 0;
      // var swiperCount = Math.ceil(this.state.companyDetailsResponse.images.length);
      // for (let index = 0; index < swiperCount; index++) {
      //     for (let size = 0; size < 2; size++) {
      //         rtnData.push(
      //             <View style={styles.companyLogo}>
      //                 <Image source={{ uri: this.state.companyDetailsResponse.images[count] }} style={styles.logoDim} />
      //                 <Image source={{ uri: this.state.companyDetailsResponse.images[count + 1] }} style={styles.logoDim} />
      //             </View>
      //         );
      //     }
      //     count = index + 2
      // }
      // for (let index = 0; index < this.state.companyDetailsResponse.images.length; index++) {
      //     for (let size = 0; size < 2; size++) {

      //     }
      //     const element = this.state.companyDetailsResponse.images[index];
      //     rtnData.push(
      //         <View style={styles.companyLogo}>
      //             <Image source={{ uri: element }} style={styles.logoDim} />
      //             <Image source={{ uri: element }} style={styles.logoDim} />
      //         </View>
      //     );
      // }
      // return rtnData;
    }
    return null;
  }
  renderModel4() {
    return (
      <Modal
        style={[styles.modal, styles.modal3]}
        backdrop={true}
        position={"top"}
        ref={"modal4"}
        visible={this.state.modalStatus}
      >
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
          <View style={styles.camModalContent}>
            <TouchableOpacity
              onPress={() => this.pickCamara()}
              style={styles.camOpenCamera}
            >
              <Text style={styles.camOpenCameraText}>
                {i18n.t("openCamera")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.pickImage()}
              style={styles.camOpenImage}
            >
              <Text style={styles.camOpenCameraText}>
                {i18n.t("openImageExplorer")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
  renderModel5() {
    return (
      <Modal
        style={[styles.modal, styles.modal3]}
        backdrop={true}
        position={"top"}
        ref={"modal5"}
        visible={this.state.confirmModal}
      >
        <View style={styles.camModal}>
          <View style={styles.camModalHeader}>
            <View style={styles.camModalTitle}>
              <Text style={styles.camModalTitleText}>{i18n.t("Alert!")}</Text>
            </View>
            <View style={styles.camModalCloseButton}>
              <TouchableOpacity onPress={() => this.closeConfirmModal()}>
                <Ionicons name="ios-close-circle" size={32} color="#ffaa1a" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.modalBody}>
            <Text style={styles.modalBodyText}>
              {this.state.modalTitleMessage}
            </Text>
          </View>
          <View style={styles.camModalContent}>
            <TouchableOpacity
              onPress={() => {
                if (this.state.IsLoginExpired) {
                  this.logout();
                }
                this.closeConfirmModal();
              }}
              style={styles.camOpenCamera}
            >
              <Text style={styles.camOpenCameraText}>
                {this.state.modalTitleMessage !=
                "Are you sure you want to accept this booking?"
                  ? i18n.t("Ok")
                  : i18n.t("Yes")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
  renderStep(step) {
    switch (step) {
      case 1:
        return this.step1();
        break;
      case 2:
        return this.Step2();
        break;
      default:
        return null;
        break;
    }
  }
  openModal = async () => {
    this.setState({ modalStatus: true });
    this.refs.modal4.open();
  };
  openConfirmModal = async text => {
    this.setState({ confirmModal: true });
    this.modalText =
      text === "" || text === null || text == undefined
        ? i18n.t("loginExpired")
        : text;
    this.setState({ modalTitleMessage: this.modalText }, () => {
      this.refs.modal5.open();
    });
  };
  closeModal = async () => {
    this.setState({ modalStatus: false });
    this.refs.modal4.close();
  };
  closeConfirmModal = async () => {
    this.setState({ confirmModal: false });
    this.refs.modal5.close();
  };
  //#region  Step 1

  step1() {
    return (
      <View ref="letsGo">
        {this.state.displayDescription ? (
          <View style={{ height: this.renderStep1ImageUploadSectionHeight() }}>
            <View
              style={{
                height: "100%",
                width: this.widthCalculator(71.44, "Second view height minus"),
                marginLeft: "auto",
                marginRight: "auto"
              }}
            >
              <Grid>
                <Row size={0.2} />
                <Row size={1}>
                  {/* <View style={[styles.hundredHeightWidth]}> */}
                  {/* <Item error={this.state.descriptionErr}> */}
                  <Textarea
                    rowSpan={4}
                    bordered
                    placeholder="Description"
                    placeholderTextColor={"#d2d2d2"}
                    style={styles.txtAreaStyle}
                    textAlignVertical={"auto"}
                    onChangeText={description => {
                      if (description) {
                        this.setState({ description: description });
                      } else {
                        this.setState({ description: "" });
                      }
                      if (description && description.length < 500) {
                        this.setState({ descriptionErr: false });
                      }
                    }}
                    value={this.state.description}
                  />
                  {/* </Item> */}
                  {/* </View> */}
                </Row>
                <Row size={0.2} />
                {this.state.uploadedImage != "" ? (
                  <Row size={1}>
                    <View style={[styles.hundredHeightWidth]}>
                      {this.state.uploadedImage}
                    </View>
                  </Row>
                ) : null}
                {this.state.uploadedImage != "" ? <Row size={0.2} /> : null}
                <Row size={1}>
                  <View style={[styles.hundredHeightWidth]}>
                    <Button
                      style={styles.btnCapture}
                      onPress={() => this.openModal()}
                    >
                      <Text
                        style={{
                          fontFamily: "Quicksand-Regular",
                          color: "#fff"
                        }}
                      >
                        {i18n.t("imageUpload")}
                      </Text>
                    </Button>
                  </View>
                </Row>
              </Grid>
            </View>
          </View>
        ) : null}
        <View
          style={{
            height: RF(10),
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "center"
          }}
        >
          <TouchableOpacity
            style={styles.touchableLetsGo}
            onPress={() => {
              if (
                this.state.description !== "" &&
                this.state.description.length > 0 &&
                this.state.description.length < 501
              ) {
                try {
                  AsyncStorage.multiGet(["bookingObj", "PickedImage"]).then(
                    data => {
                      var bookingObj =
                        data[0][1] && data[0][1] !== ""
                          ? JSON.parse(data[0][1])
                          : {};
                      var image = "";
                      if (this.state.IsImage && data[1][1]) {
                        var image = data[1][1];
                      }
                      bookingObj.service_id = this.state.serviceData.SelectedService.id;
                      bookingObj.instruction = this.state.description;
                      bookingObj.image = image;
                      bookingObj.state_id = parseInt(
                        this.state.selectedStateId
                      );
                      //console.log("Image and booking obj", image, bookingObj);
                      try {
                        AsyncStorage.multiSet(
                          [
                            ["bookingObj", JSON.stringify(bookingObj)],
                            [
                              "selectedService",
                              JSON.stringify(this.state.serviceData)
                            ]
                          ],
                          err => {
                            if (err) {
                              this.openConfirmModal(
                                i18n.t("Server error, please try again later")
                              );
                            } else {
                              this.setState({ steps: this.state.steps + 1 });
                              this.setState({ descriptionErr: false });
                              // this.getCompanyDetails();
                            }
                          }
                        );
                      } catch (exc) {
                        // console.log('line number 322 ', exc);
                      }
                    }
                  );
                } catch (exception) {
                  //console.log('328 ', exception);
                }
              } else {
                if (
                  this.state.description !== "" &&
                  this.state.description.length > 500
                ) {
                  this.openConfirmModal(i18n.t("descriptionErr"));
                  //Alert.alert("Please enter description less then 500 words");
                  this.setState({ descriptionErr: true });
                } else {
                  // this.setState({ steps: (this.state.steps + 1) });
                  this.setState({ descriptionErr: false });
                }
                try {
                  AsyncStorage.multiGet(["bookingObj", "PickedImage"]).then(
                    data => {
                      // book = data[0][1] + " " + data[1][1];
                      //console.log("Data of async", data);
                      var bookingObj =
                        data[0][1] && data[0][1] !== ""
                          ? JSON.parse(data[0][1])
                          : {};
                      var image = "";
                      if (this.state.IsImage && data[1][1]) {
                        var image = data[1][1];
                      }
                      bookingObj.service_id = this.state.serviceData.SelectedService.id;
                      bookingObj.instruction = this.state.description;
                      bookingObj.image = image;
                      bookingObj.state_id = parseInt(
                        this.state.selectedStateId
                      );
                      //console.log("Image and booking obj", image, bookingObj);
                      try {
                        AsyncStorage.multiSet(
                          [
                            ["bookingObj", JSON.stringify(bookingObj)],
                            [
                              "selectedService",
                              JSON.stringify(this.state.serviceData)
                            ]
                          ],
                          err => {
                            if (err) {
                              this.openConfirmModal(
                                i18n.t("Server error, please try again")
                              );
                            } else {
                              this.setState({ steps: this.state.steps + 1 });
                              this.setState({ descriptionErr: false });
                              this.getCompanyDetails(this.state.companyId);
                            }
                          }
                        );
                      } catch (exc) {
                        // console.log('line number 322 ', exc);
                      }
                    }
                  );
                } catch (exception) {
                  //console.log('328 ', exception);
                }
              }
            }}
          >
            <Text
              style={[styles.colorTheme, { fontFamily: "Quicksand-Medium" }]}
            >
              {i18n.t("proceed")}
            </Text>
          </TouchableOpacity>
        </View>
        {this.state.displayDescription &&
        (this.state.sliderBanner ||
          this.state.bigBanner ||
          this.state.smallBanner) ? (
          <View style={{ flexDirection: "row", flex: 1 }}>
            <Grid>
              <Col size={1} />
              <Col size={18}>
                {/* {this.renderAllBannersDesign()} */}
                {this.state.sliderBanner ||
                this.state.bigBanner ||
                this.state.smallBanner ? (
                  <Grid>
                    {this.state.sliderBanner ? (
                      <Row
                        style={{ height: 150 }}
                        // <Row style={{height:200}}>
                        onLayout={event => {
                          var {
                            x,
                            y,
                            width,
                            height
                          } = event.nativeEvent.layout;
                          if (!this.state.finalHeight) {
                            this.setState({
                              finalHeight: width,
                              equualHeight: width
                            });
                          }
                        }}
                      >
                        <Grid>
                          {this.state.sliderBanner ? (
                            <Row size={1} style={styles.colorD0d0d0}>
                              <View
                                style={styles.hundredHeightWidth}
                                key={"redas"}
                              >
                                <Swiper
                                  containerStyle={styles.hundredHeightWidth}
                                  dot={
                                    <Image
                                      source={require("../../../assets/images/dot_outline.png")}
                                      style={{
                                        backgroundColor: "rgba(0,0,0,0)",
                                        height: RF(2),
                                        width: RF(2),
                                        marginLeft: RF(0.5),
                                        marginRight: RF(0.5)
                                      }}
                                    />
                                  }
                                  activeDot={
                                    <Image
                                      source={require("../../../assets/images/dot-filled.png")}
                                      style={{
                                        backgroundColor: "rgba(0,0,0,0)",
                                        height: RF(2),
                                        width: RF(2),
                                        margin: RF(0.5),
                                        marginRight: RF(0.5)
                                      }}
                                    />
                                  }
                                >
                                  {this.rederSlider()}
                                </Swiper>
                              </View>
                            </Row>
                          ) : null}
                        </Grid>
                      </Row>
                    ) : null}
                    {/* <Row style={[{ height: this.state.equualHeight ? this.state.equualHeight : RF(11.6) }]}></Row> */}
                    {this.state.bigBanner && this.state.bigBanner.length > 0 ? (
                      <Row>
                        <Grid>{this.renderBigAndSmallBanner()}</Grid>
                      </Row>
                    ) : null}
                  </Grid>
                ) : null}
              </Col>
              <Col size={1} />
            </Grid>
          </View>
        ) : null}
      </View>
    );
  }
  getCompanyDetails(companyId) {
    this.setState({ companyDetailsResponse: null });
    AsyncStorage.getItem("selectedCompany").then(data => {
      companyData = JSON.parse(data);
      GetCompanyDetails(
        companyId,
        i18n.locale,
        scs => {
          this.setState({ companyDetailsResponse: scs });
        },
        error => {
          // console.log(error);
        }
      );
    });
  }
  rederSlider() {
    if (this.state.sliderBanner && this.state.sliderBanner.length > 0) {
      var rtnData = [];
      for (let index = 0; index < this.state.sliderBanner.length; index++) {
        const element = this.state.sliderBanner[index];
        rtnData.push(
          <TouchableOpacity
            key={"i" + index}
            onPress={() => {
              this.setPrice(element);
              this.setState({ selectedCompanyName: element.company.name });
              this.setState({ toolTipVisible: true }, () => {
                setTimeout(() => {
                  this.setState({ toolTipVisible: false });
                }, 5000);
              });
            }}
          >
            <ImageBackground
              source={{ uri: element.image }}
              key={"image" + index}
              style={[styles.colorD0d0d0, { width: "100%", height: "100%" }]}
            >
              <View style={{ flex: 1, flexDirection: "row" }}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: "flex-start",
                    flexDirection: "row",
                    marginLeft: RF(1),
                    marginTop: RF(1)
                  }}
                >
                  {this.renderStars(element.company.rating)}
                </View>
                {this.loggedInResponse != null ? (
                  <TouchableOpacity
                    key={"i" + index}
                    onPress={() => {
                      element.is_favorite == true
                        ? this.sliderLikeClick(element, 0)
                        : this.sliderLikeClick(element, 1);
                    }}
                  >
                    <View
                      style={{
                        flex: 1,
                        justifyContent: "flex-end",
                        flexDirection: "row",
                        marginRight: RF(1),
                        marginTop: RF(1)
                      }}
                    >
                      {/* {element.bannerusers.length > 0 ? <Image source={require('./assets/fav_filled.png')} style={{ height: 30, width: 30 }}></Image> : <Image source={require('./assets/fav_wo_hand.png')} style={{ height: 30, width: 30 }}></Image>} */}
                      {element.is_favorite == true ? (
                        <Image
                          source={require("./assets/fav_filled.png")}
                          style={{ height: 30, width: 30 }}
                        />
                      ) : (
                        <Image
                          source={require("./assets/fav_wo_hand.png")}
                          style={{ height: 30, width: 30 }}
                        />
                      )}
                    </View>
                  </TouchableOpacity>
                ) : null}
              </View>
            </ImageBackground>
          </TouchableOpacity>
        );
      }
      return rtnData;
    }
    return null;
  }

  bigBannerDesign(props) {
    //console.log(props);
    return (
      <Row size={9} style={styles.colorD0d0d0}>
        <TouchableOpacity
          style={{ height: "100%", width: "100%" }}
          onPress={() => {
            this.setPrice(props);
            this.setState({ selectedCompanyName: props.company.name });
            this.setState({ companyId: props.company.id }, data => {
              this.getCompanyDetails(this.state.companyId);
            });

            // AsyncStorage.setItem('selectedCompany',props.company);
            // this.companyOnSelect(0, props.company);
            this.setState({ toolTipVisible: true }, () => {
              setTimeout(() => {
                this.setState({ toolTipVisible: false });
              }, 5000);
            });
          }}
        >
          {props.image ? (
            <ImageBackground
              style={[styles.allHeightWidthBigBannerImage]}
              source={{ uri: props.image }}
              resizeMode={"contain"}
            >
              <View style={styles.touchableHeartPositionM} />
            </ImageBackground>
          ) : null}
        </TouchableOpacity>
      </Row>
    );
  }
  getSmallBannerDesign(type, smallBanners) {
    //this will manage all banners rows
    if (smallBanners && smallBanners.length > 0) {
      if (type == "C") {
        return this.getSmallBannerDesignColumn(smallBanners);
      } else {
        let rows = [];
        for (let i = 0; i < smallBanners.length; i++) {
          if (i % 2 == 0) {
            rows.push(
              <Row style={{ height: 5 }}>
                <Col size={49} />
                <Col size={2} />
                <Col size={49} />
              </Row>
            );
            let pair = smallBanners.filter(
              t =>
                smallBanners.indexOf(t) > i - 1 &&
                smallBanners.indexOf(t) <= i + 1
            );
            rows.push(this.getSmallBannerDesignRow(pair));
          }
        }
        return rows;
      }
    }
    return null;
  }
  getSmallBannerDesignColumn(bannerPair) {
    //this function only expects 2 banner array
    let rows = [];
    for (let i = 0; i < bannerPair.length; i++) {
      rows.push(this.getSmallBannerView(bannerPair[i]));
      if (i == 0) {
        rows.push(<Row size={0.5} />);
      }
    }
    return rows;
  }
  getSmallBannerDesignRow(bannerPair) {
    let row = (
      <Row style={{ height: 70 }}>
        <Col size={49}>{this.getSmallBannerView(bannerPair[0])}</Col>
        <Col size={2} />
        {/* <Col>{this.getSmallBannerView(bannerPair[0])}</Col> */}
        <Col size={49}>
          {bannerPair.length > 1
            ? this.getSmallBannerView(bannerPair[1])
            : null}
        </Col>
      </Row>
    );
    return row;
  }
  getSmallBannerView(smallBanner) {
    return (
      <Row size={9} style={styles.colorD0d0d0}>
        <TouchableOpacity
          style={{ height: "100%", width: "100%" }}
          onPress={() => {
            this.setPrice(smallBanner);
            this.setState({ selectedCompanyName: smallBanner.company.name });
            this.setState({ companyId: smallBanner.company.id }, data => {
              this.getCompanyDetails(this.state.companyId);
            });

            // this.companyOnSelect(0, smallBanner.company);
            // AsyncStorage.setItem('selectedCompany',smallBanner.company);
            this.setState({ toolTipVisible: true }, () => {
              setTimeout(() => {
                this.setState({ toolTipVisible: false });
              }, 5000);
            });
          }}
        >
          <ImageBackground
            style={styles.allHeightWidth}
            source={{ uri: smallBanner.image }}
            resizeMode={"contain"}
          >
            <View style={styles.touchableHeartPositionS} />
          </ImageBackground>
        </TouchableOpacity>
      </Row>
    );
  }
  renderBigAndSmallBanner() {
    var mediumBanner = [];
    mediumBanner.push(
      <Row style={{ height: 15 }}>
        <Col />
        <Col />
      </Row>
    );
    if (this.state.bigBanner && this.state.bigBanner.length > 0) {
      let firstTwoSmallBanners = null;
      if (
        this.state.bigBanner.length % 2 != 0 &&
        this.state.smallBanner &&
        this.state.smallBanner.length > 0
      ) {
        firstTwoSmallBanners = this.state.smallBanner.filter(
          t => this.state.smallBanner.indexOf(t) < 2
        );
      }
      let extraRow = (
        <Row style={{ height: 10 }}>
          <Col size={49} />
          <Col size={2} />
          <Col size={49} />
        </Row>
      );
      for (
        var bigBannerIndex = 0;
        bigBannerIndex < this.state.bigBanner.length;
        bigBannerIndex++
      ) {
        if (bigBannerIndex % 2 == 0) {
          let row = (
            <Row style={{ height: 150 }}>
              <Col size={49}>
                {this.bigBannerDesign(this.state.bigBanner[bigBannerIndex])}
              </Col>
              <Col size={2} />
              <Col size={49}>
                {this.state.bigBanner.length > bigBannerIndex + 1
                  ? this.bigBannerDesign(
                      this.state.bigBanner[bigBannerIndex + 1]
                    )
                  : firstTwoSmallBanners != null
                  ? this.getSmallBannerDesign("C", firstTwoSmallBanners)
                  : null}
              </Col>
            </Row>
          );
          mediumBanner.push(row);
          mediumBanner.push(extraRow);
        }
      }
    }
    if (this.state.smallBanner && this.state.smallBanner.length > 0) {
      if (this.state.bigBanner.length % 2 == 0) {
        //all big  banner is filled the space
        mediumBanner.push(
          this.getSmallBannerDesign("", this.state.smallBanner)
        );
      } else {
        //else first 2 small has rendered
        let remainingSmallBanners = this.state.smallBanner.filter(
          t => this.state.smallBanner.indexOf(t) > 1
        );
        mediumBanner.push(this.getSmallBannerDesign("", remainingSmallBanners));
      }
    }
    return mediumBanner;
  }

  companyDropDownRow(rowData, rowID, highlighted) {
    let evenRow = rowID % 2;
    return (
      <TouchableOpacity
        style={{ width: "100%", backgroundColor: "rgba(255,255,255,0.0)" }}
      >
        <View
          style={{
            backgroundColor: evenRow ? "#d0d0d0" : "#e7e7e7",
            flexDirection: "column",
            justifyContent: "space-between",
            flex: 1,
            paddingTop: 8,
            paddingBottom: 8
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                width: "50%",
                marginLeft: 20,
                flexDirection: "column",
                justifyContent: "center"
              }}
            >
              <View>
                <Text style={{ color: "#6b6b6b" }}>{`${
                  rowData.company_alias != null && rowData.company_alias != ""
                    ? rowData.company_alias
                    : rowData.text
                }`}</Text>
              </View>
              {this.renderRatingStars(rowData.rating, evenRow)}
            </View>
            <View style={{ justifyContent: "center", width: "10%" }}>
              {rowData.is_favorite == true ? (
                <Image
                  source={require("./assets/fav.png")}
                  style={{ width: 23, height: 20, alignSelf: "center" }}
                />
              ) : null}
            </View>
            <View style={{ justifyContent: "center" }}>
              <Text
                style={{
                  color: "#6b6b6b",
                  marginRight: 20,
                  textAlign: "right"
                }}
              >
                {`${rowData.price} AED`}
              </Text>
            </View>
          </View>
          {rowData.short_description != "" &&
            rowData.short_description != null && (
              <View
                style={{
                  width: "80%",
                  marginLeft: 20,
                  flexDirection: "column",
                  justifyContent: "center",
                  paddingTop: 5
                }}
              >
                <Text
                  numberOfLines={2}
                  style={{
                    color: "#6b6b6b",
                    //marginLeft: 5,
                    fontSize: RF(1.5),
                    paddingBottom: RF(1.5)
                  }}
                >
                  {rowData.short_description}
                </Text>
              </View>
            )}
        </View>
      </TouchableOpacity>
    );
  }
  renderRatingStars(rating, evenRow) {
    if (rating > 0) {
      return (
        <View
          style={{
            backgroundColor: evenRow ? "#d0d0d0" : "#e7e7e7",
            paddingBottom: 3,
            flexDirection: "row"
          }}
        >
          {this.renderStars(rating)}
        </View>
      );
    }
    return null;
  }
  renderStars(rating) {
    let stars = [];
    if (rating > 0) {
      for (let i = 0; i < rating; i++) {
        stars.push(
          <Ionicons name="md-star" key={"icon" + i} size={10} color="#ffaa1a" />
        );
      }
    }
    return stars;
  }
  _dropdown_2_renderRow(rowData, rowID, highlighted) {
    let evenRow = rowID % 2;
    if (
      `${rowData.name}`.toString().toUpperCase() !==
      "not sure".toString().toUpperCase()
    )
      return (
        <TouchableOpacity
          style={{ width: "100%", backgroundColor: "rgba(255,255,255,0.0)" }}
        >
          <View
            style={{
              backgroundColor: evenRow ? "#d0d0d0" : "#e7e7e7",
              alignItems: "flex-start",
              justifyContent: "center",
              paddingTop: 8,
              paddingBottom: 8
            }}
          >
            <View
              style={{
                width: "80%",
                marginLeft: 5,
                flexDirection: "column",
                justifyContent: "center"
              }}
            >
              <View>
                <Text style={{ color: "#6b6b6b", marginLeft: 5 }}>
                  {`${rowData.name}`}
                </Text>
              </View>
              <View>
                <Text
                  numberOfLines={2}
                  style={{
                    color: "#6b6b6b",
                    marginLeft: 5,
                    fontSize: RF(1.5),
                    paddingBottom: RF(1.5)
                  }}
                >
                  {`${rowData.description}`}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      );
    else {
      return (
        <TouchableOpacity
          style={{ width: "100%", backgroundColor: "rgba(255,255,255,0.0)" }}
        >
          <View
            style={{
              backgroundColor: evenRow ? "#d0d0d0" : "#e7e7e7",
              alignItems: "flex-start",
              justifyContent: "center",
              paddingTop: 8,
              paddingBottom: 8
            }}
          >
            <Text style={{ color: "#ff9a00", marginLeft: 20 }}>
              {`${rowData.name}`}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
  }
  drpDynamicHeight() {
    if (this.state.serviceDrp && this.state.serviceDrp.length <= 7) {
      return RF(6) * this.state.serviceDrp.length;
    } else {
      return RF(6) * 7;
    }
  }
  drpDynamicHeightCo() {
    if (this.state.companyDrp && this.state.companyDrp.length <= 7) {
      return RF(15) * this.state.companyDrp.length;
    } else {
      return RF(6) * 7;
    }
  }
  drpMarginTop() {
    if (Platform.OS === "ios") {
      // if (this.state.drpModelHeight != 0 && this.state.drpModelInHeight != 0) {
      //     return (((this.state.drpModelHeight - this.state.drpModelInHeight) / 2) + 2);
      // }
      return 5;
    } else {
      return -20;
    }
  }

  setPrice(sliderData) {
    for (var i = 0; i < this.state.companyDrp.length; i++) {
      if (this.state.companyDrp[i].id == sliderData.company.id) {
        let data = this.state.companyData;
        data.SelectedCompany = sliderData.company.name;
        data.price = this.state.companyDrp[i].price;
        AsyncStorage.setItem(
          "price",
          this.state.companyDrp[i].price.toString()
        );
        this.setState({ companyData: data });
        return;
      }
    }
  }
  sliderLikeClick(element, isLike) {
    this.setState({ spinnerVisible: true });
    try {
      AsyncStorage.multiGet(["loggedInUserObj", "accessToken"]).then(data => {
        //console.log("line number 584 ", data);
        var userId = JSON.parse(data[0][1]);
        var accessToken = data[1][1];
        //console.log("Token and id ", userId, accessToken)
        if (!userId) {
          this.setState({ spinnerVisible: false }, () => {
            this.openConfirmModal(i18n.t("loginToLikeBanner"));
          });
        } else {
          try {
            this.props.LikeDisLikeBanner(
              userId.id,
              this.state.serviceData.SelectedService.id,
              element.id,
              isLike,
              accessToken,
              i18n.locale,
              scs => {
                //console.log("Get service data after like or dislike service is", this.state.serviceData);
                this.GetBanners(
                  this.state.selectedStateId,
                  this.state.serviceData.SelectedService.id
                );
                this.refs.toast.show(scs, DURATION.LENGTH_LONG);
                this.getFavouriteBanner();
                this.getSliderCompanies(
                  this.state.serviceData.SelectedService.id,
                  this.state.selectedStateId
                );
                this.props.GetCompanyOnService(
                  this.state.serviceData.SelectedService.id,
                  userId == undefined ? 0 : userId,
                  this.loggedInResponse != null
                    ? this.loggedInResponse.remember_token
                    : "",
                  companyList => {
                    this.setState({ companyDrp: companyList }, () => {
                      this.checkFavouriteCompany(companyList);
                      if (companyList !== null && companyList != undefined) {
                        AsyncStorage.setItem(
                          "companyDrp",
                          JSON.stringify(companyList)
                        );
                      } else {
                        AsyncStorage.setItem("companyDrp", "");
                      }
                    });
                  },
                  errorDetails => {
                    //console.log("Error details", errorDetails);
                    this.setState({ loadingService: false });
                    this.refs.toast.show(
                      i18n.t("somethingWrong"),
                      DURATION.LENGTH_SHORT
                    );
                  }
                );
                // this.setState({ spinnerVisible: false });
              },
              err => {
                var unAuthorized = i18n.t("Unauthorized");
                this.setState({ spinnerVisible: false }, () => {
                  if (
                    err.status === "error" &&
                    err.error_data === unAuthorized
                  ) {
                    this.unAuthorized();
                  } else {
                    this.refs.toast.show(
                      i18n.t("requestErr"),
                      DURATION.LENGTH_LONG
                    );
                  }
                  //console.log("Error of getting banner index js 607", err);
                });
              }
            );
          } catch (error) {
            //console.log(error);
            this.setState({ spinnerVisible: false });
          }
        }
      });
    } catch (exc) {
      //console.log("680 ", exc);
      this.setState({ spinnerVisible: false });
    }
  }
  // #region dropdown on select
  _dropdown_4_onSelect(idx, value) {
    this.setState({ servicePreferenceSelectionFlag: true });
    this.setState({ displayDescription: true });
    let data = this.state.serviceData;
    this.setState({ companyData: {} });
    AsyncStorage.setItem("selectedCompany", "");
    data.SelectedService = value;
    AsyncStorage.setItem("price", value.price.toString());
    this.setState({ serviceData: data }, () => {
      this.getFavouriteBanner();
    });
    //// Set state step and give height to main scroll
    this.setState({ steps: 1 });
    this.renderMainScrollHeight();

    this.setState({ bigBanner: null });
    this.setState({ sliderBanner: null });
    this.setState({ smallBanner: null });
    this.GetBanners(this.state.selectedStateId, value.id);
    AsyncStorage.multiGet(["userId", "selectedStateId"]).then(data => {
      let userId = data[0][1] == null ? null : data[0][1];
      let stateId = data[1][1] == null ? 1 : data[1][1];
      if (this.loggedInResponse == null || this.loggedInResponse == undefined) {
        this.getSliderCompanies(value.id, stateId);
      }
      this.props.GetCompanyOnService(
        value.id,
        userId == undefined ? 0 : userId,
        this.loggedInResponse != null
          ? this.loggedInResponse.remember_token
          : "",
        companyList => {
          this.setState({ companyDrp: companyList }, () => {
            this.checkFavouriteCompany(companyList);
            this.getSliderCompanies(value.id, stateId);
            this.setFavouriteCompany(companyList);
            this.setState({ toolTipVisible: true }, () => {
              setTimeout(() => {
                this.setState({ toolTipVisible: false });
              }, 5000);
            });
            if (companyList !== null && companyList != undefined) {
              AsyncStorage.setItem("companyDrp", JSON.stringify(companyList));
            } else {
              AsyncStorage.setItem("companyDrp", "");
            }
          });
        },
        errorDetails => {
          //console.log("Error details", errorDetails);
          this.setState({ loadingService: false });
          this.refs.toast.show(i18n.t("somethingWrong"), DURATION.LENGTH_SHORT);
        }
      );
    });
  }
  checkFavouriteCompany(companies) {
    if (companies && companies.length > 0) {
      for (var i = 0; i < companies.length; i++) {
        if (companies[i].is_favorite == true) {
          this.setState({ favouriteCompanyName: companies[i].text });
          // this.setPrice(companies[i]);
          AsyncStorage.setItem("price", companies[i].price.toString());
          this.setState({ selectedCompanyName: companies[i].text });
          break;
        } else {
          this.setState({ favouriteCompanyName: "" });
        }
      }
    }
    return;
  }
  setFavouriteCompany(companies) {
    if (companies && companies.length > 0) {
      for (var i = 0; i < companies.length; i++) {
        if (companies[i].is_favorite == true) {
          let data = this.state.companyData;
          data.SelectedCompany = companies[i].text;
          data.price = companies[i].price;
          //console.log("Company from ajax ", companies[i]);
          AsyncStorage.multiSet([
            ["price", companies[i].price.toString()],
            ["selectedCompanyName", JSON.stringify(companies[i])]
          ]);
          this.setState({ companyData: data });
          this.setState({ selectedCompanyName: companies[i].text });
          return;
        }
      }
    }
  }
  getSliderCompanies(serviceId, stateId) {
    this.props.GetSliderCompanies(
      serviceId,
      stateId,
      this.loggedInResponse != null ? this.loggedInResponse.remember_token : "",
      this.loggedInResponse != null ? this.loggedInResponse.id : 0,
      data => {
        if (data != null && data.slider != null && data.slider.length > 0) {
          // this.setState({ companySliders: data.slider });
          this.setState({ sliderBanner: data.slider });
          //this.markAsFavouriteInSlider(data.slider);
        }
      },
      error => {}
    );
  }
  markAsFavouriteInSlider(sliders) {
    for (var i = 0; i < sliders.length; i++) {
      for (var j = 0; j < this.state.companyDrp.length; j++) {
        if (sliders[i].company.id == this.state.companyDrp[j].company.id) {
          this.setState({ markFavourite: true });
          break;
        } else {
          this.setState({ markFavourite: false });
        }
      }
    }
    return;
  }
  getSliderView() {
    let sliderItems = this.state.companySliders;
  }
  companyOnSelect(idx, value) {
    var companyNo = 0;
    this.setState({ companyId: value.id }, data => {
      companyNo = this.state.companyId;
    });
    let data = this.state.companyData;
    data.SelectedCompany = value;
    AsyncStorage.multiSet([
      ["selectedCompany", JSON.stringify(data)],
      ["selectedCompanyName", JSON.stringify(value)],
      ["price", value.price.toString()]
    ]);
    this.setState({ selectedCompanyName: value.text });
    this.setState({ companyData: data });

    this.setState({ toolTipVisible: true }, () => {
      setTimeout(() => {
        this.setState({ toolTipVisible: false });
      }, 5000);
    });
    if (this.state.steps == 2) {
      this.getCompanyDetails(value.id);
    }
  }
  GetBanners(locationId, serviceId) {
    this.setState({ spinnerVisible: true });
    //console.log("get banners Above async storage");
    try {
      AsyncStorage.multiGet(["loggedInUserObj", "accessToken"]).then(data => {
        var accessToken = data[1][1];
        var userId = JSON.parse(data[0][1]);
        //console.log("Service id of get banners in async storage", locationId, serviceId, userId);

        GetBannersApi(
          locationId,
          serviceId,
          userId && userId.id ? userId.id : null,
          accessToken,
          i18n.locale,
          scs => {
            this.setState({ spinnerVisible: false }, () => {
              //console.log("Success data of banner", scs);
              //console.log(scs);
              if (scs && scs.big && scs.big.length > 0) {
                this.setState({ bigBanner: scs.big }, () => {
                  this.setTopRatedBannerToFavourite();
                });
              } else {
                this.setState({ bigBanner: null }, () => {
                  this.setTopRatedBannerToFavourite();
                });
              }
              if (scs.slider && scs.slider.length > 0) {
                this.setState({ sliderBanner: scs.slider }, () => {
                  this.setTopRatedBannerToFavourite();
                });
              }
              if (scs.small && scs.small.length > 0) {
                this.setState({ smallBanner: scs.small }, () => {
                  this.setTopRatedBannerToFavourite();
                });
              } else {
                this.setState({ smallBanner: null }, () => {
                  this.setTopRatedBannerToFavourite();
                });
              }
            });
          },
          err => {
            this.setState({ spinnerVisible: false }, () => {
              if (err.status === "error") {
                this.unAuthorized();
              }
              //console.log("Error of getting banner index js 607", err);
            });
          }
        );
      });
    } catch (error) {
      //console.log("Get banner parent error", error);
      this.setState({ spinnerVisible: false });
    }
  }

  //#endregion
  //#region   Pick camara
  pickCamara = async () => {
    const status = await Permissions.getAsync(Permissions.CAMERA);
    const status2 = await Permissions.getAsync(Permissions.CAMERA_ROLL);
    let finalStatus = status;
    let finalstatus2 = status2;
    if (finalStatus !== "granted") {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      finalStatus = status;
    }
    if (finalstatus2 !== "granted") {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      finalstatus2 = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== "granted" && finalstatus2 !== "granted") {
      this.openConfirmModal(i18n.t("cameraPermissionErr"));
      // alert('Permission to access camara and image was denied');
    } else {
      let pickerResult = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        quality: 0.5,
        aspect: [1, 1],
        base64: true
      });

      if (!pickerResult.cancelled) {
        //this.handleImagePicked(pickerResult);
        //console.log("Picked image log", pickerResult);
        AsyncStorage.removeItem("PickedImage", err => {
          if (err) {
            this.openConfirmModal(i18n.t("imageSaveErr"));
            //  alert("Server error while saving image, please try again.");
          } else {
            //console.log("is image true and set image", pickerResult.base64);
            this.setState({ IsImage: true });
            var imageBae64 = `data:image/png;base64,` + pickerResult.base64;
            AsyncStorage.setItem("PickedImage", imageBae64);
            const uploadedImagesConstant = [];
            var imageText = "data:image/png;base64," + pickerResult.base64 + "";
            uploadedImagesConstant.push(
              <View style={{ flexDirection: "row" }}>
                <View style={{ width: "20%" }} />
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    width: "60%"
                  }}
                >
                  <Image
                    style={{
                      height: 100,
                      width: 100,
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                    source={{ uri: imageText }}
                  />
                </View>
                <TouchableOpacity
                  style={{ width: "20%", marginBottom: 50 }}
                  onPress={() => {
                    this._removeImage();
                  }}
                >
                  <Ionicons
                    style={{ zIndex: 2, color: "#FFAA1A" }}
                    size={RF(4)}
                    name="ios-close-circle"
                    color="#FFAA1A"
                  />
                </TouchableOpacity>
              </View>
            );
            this.setState({ uploadedImage: uploadedImagesConstant });
            this.setState({ isImageViewVisible: false });
            this.setState({ modalStatus: false });
            this.refs.modal4.close();
          }
        });
      }
    }
  };
  pickImage = async () => {
    const status = await Permissions.getAsync(Permissions.CAMERA_ROLL);
    let finalStatus = status;
    if (finalStatus !== "granted") {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== "granted") {
      this.openConfirmModal(i18n.t("imageAccessErr"));
      // alert('Permission to access image was denied');
    } else {
      let pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        quality: 0.5,
        aspect: [1, 1],
        base64: true
      });

      if (!pickerResult.cancelled) {
        //this.handleImagePicked(pickerResult);
        //console.log("Picked image log", pickerResult);
        AsyncStorage.removeItem("PickedImage", err => {
          if (err) {
            this.openConfirmModal(i18n.t("imageSaveErr"));
          } else {
            //console.log("is image true and set image", pickerResult.base64);
            this.setState({ IsImage: true });
            var imageBae64 = `data:image/png;base64,` + pickerResult.base64;
            AsyncStorage.setItem("PickedImage", imageBae64);
            const uploadedImagesConstant = [];
            var imageText = "data:image/png;base64," + pickerResult.base64 + "";
            uploadedImagesConstant.push(
              <View style={{ flexDirection: "row" }}>
                <View style={{ width: "20%" }} />
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    width: "60%"
                  }}
                >
                  <Image
                    style={{
                      height: 100,
                      width: 100,
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                    source={{ uri: imageText }}
                  />
                </View>
                <TouchableOpacity
                  style={{ width: "20%", marginBottom: 50 }}
                  onPress={() => {
                    this._removeImage();
                  }}
                >
                  <Ionicons
                    style={{ zIndex: 2, color: "#FFAA1A" }}
                    size={RF(4)}
                    name="ios-close-circle"
                    color="#FFAA1A"
                  />
                </TouchableOpacity>
              </View>
            );
            this.setState({ uploadedImage: uploadedImagesConstant });
            this.setState({ isImageViewVisible: false });
            this.setState({ modalStatus: false });
            this.refs.modal4.close();
          }
        });
      }
    }
  };
  //#endregion
  //#endregion
  //# region Step 2
  Step2() {
    this.refs.scroll.scrollTo({ x: 0, y: 0, animated: true });
    //console.log("Step 2 log");
    return (
      <Row ref="second" size={7}>
        <ScrollView ref={"scrollView2"} style={styles.hundredHeightWidth}>
          <Grid
            style={[styles.hundredHeightWidth, { height: RF(25.5) }]}
            onLayout={event => {
              if (!this.state.favouriteBannerSectionHeight) {
                var { x, y, width, height } = event.nativeEvent.layout;
                this.setState({ favouriteBannerSectionHeight: height });
              }
            }}
          >
            <Col size={1} />
            <Col size={12}>
              <Grid>
                <Row size={1}>
                  <Grid>
                    <Col size={1} />
                    <Col size={10}>
                      <Grid>
                        <Row size={0.9} />
                        <Row size={2}>
                          <Grid>
                            <Col size={2} />
                            <Col size={10}>
                              <View style={styles.allHeightWidth}>
                                <Grid>
                                  {this.state.customerCareNumber && (
                                    <Row size={10}>
                                      <TouchableOpacity
                                        onPress={() => {
                                          Linking.openURL(
                                            `tel:${this.state.customerCareNumber}`
                                          );
                                        }}
                                        onLayout={event => {
                                          var {
                                            x,
                                            y,
                                            width,
                                            height
                                          } = event.nativeEvent.layout;

                                          this.setState({
                                            buttonHeight: height
                                          });
                                        }}
                                        style={[
                                          styles.axactCenter,
                                          styles.allHeightWidth,
                                          styles.backgroundColorRed,
                                          {
                                            borderRadius: this.state
                                              .buttonHeight
                                          }
                                        ]}
                                      >
                                        <Text style={styles.txtCallUsNow}>
                                          {i18n.t("call")}{" "}
                                        </Text>
                                        <Text style={styles.txtCallUsNow}>
                                          {this.state.customerCareNumber}
                                        </Text>
                                      </TouchableOpacity>
                                    </Row>
                                  )}
                                  <Row size={2} />
                                  <Row size={10}>
                                    <Button
                                      onPress={() => {
                                        //console.log("clicked");
                                        this.props.navigation.navigate(
                                          "provider",
                                          { from: "categoriesDetailsNew" }
                                        );
                                      }}
                                      rounded
                                      style={[
                                        styles.axactCenter,
                                        styles.allHeightWidth,
                                        styles.backgroundColorGreen
                                      ]}
                                    >
                                      <Text style={styles.txtCallUsNow}>
                                        {i18n.t("book")}
                                      </Text>
                                    </Button>
                                  </Row>
                                  {!this.state.customerCareNumber && (
                                    <Row size={10} />
                                  )}
                                </Grid>
                              </View>
                            </Col>
                            <Col size={2} />
                          </Grid>
                        </Row>
                        <Row size={0.1} />
                      </Grid>
                    </Col>
                    <Col size={1} />
                  </Grid>
                </Row>
              </Grid>
            </Col>
            <Col size={1} />
          </Grid>
        </ScrollView>
      </Row>
    );
  }
  renderFaviriteBannerCheck() {
    if (this.state.IsFavourite) {
      return this.renderFavoutiteBanner();
    } else if (
      !this.state.IsFavourite &&
      this.state.favouriteBanners.length > 0
    ) {
      return this.rednerMulitipleFavourite();
    } else {
      return null;
    }
  }
  rednerMulitipleFavourite() {
    //console.log("Render multiple favourite", this.state.favouriteBanners);
    if (this.state.favouriteBanners.length > 0) {
      var rows = [];
      for (
        let index = 0;
        index < this.state.favouriteBanners.length;
        index = index + 2
      ) {
        //console.log("FOr row in")
        var element1 = this.state.favouriteBanners[index]
          ? this.state.favouriteBanners[index]
          : null;
        var element2 =
          this.state.favouriteBanners.length > index + 1
            ? this.state.favouriteBanners[index + 1]
            : null;
        rows.push(
          <Row size={1} key={"row" + index}>
            <Grid>
              <Col size={0.5} />
              <Col size={10}>
                <Grid>
                  <Row size={1.5} />
                  <Row size={47}>
                    <Col style={{}} size={49}>
                      {element1 ? (
                        <Image
                          source={{ uri: element1.image }}
                          resizeMode={"contain"}
                          style={[
                            styles.hundredHeightWidth,
                            { backgroundColor: "#f0f0f0" }
                          ]}
                        />
                      ) : null}
                    </Col>
                    <Col size={3} />
                    <Col style={{}} size={49}>
                      {element2 ? (
                        <Image
                          source={{ uri: element2.image }}
                          resizeMode={"contain"}
                          style={[
                            styles.hundredHeightWidth,
                            { backgroundColor: "#f0f0f0" }
                          ]}
                        />
                      ) : null}
                    </Col>
                  </Row>
                  <Row size={1.5} />
                </Grid>
              </Col>
              <Col size={0.5} />
            </Grid>
          </Row>
        );
      }
      if (rows.length > 0) {
        return rows;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
  renderFavoutiteBanner() {
    if (this.state.IsFavourite && this.state.favouriteBanners.length > 0) {
      return (
        <Row size={1}>
          <Grid>
            <Col size={0.5} />
            <Col size={10}>
              <Grid>
                <Row size={1.5} />
                <Row size={47}>
                  <Col style={{}} size={49}>
                    <Image
                      source={{ uri: this.state.favouriteBanners[0].image }}
                      resizeMode={"contain"}
                      style={[
                        styles.hundredHeightWidth,
                        { backgroundColor: "#f0f0f0" }
                      ]}
                    />
                  </Col>
                  <Col size={3} />
                  <Col style={{}} size={49} />
                </Row>
                <Row size={1.5} />
              </Grid>
            </Col>
            <Col size={0.5} />
          </Grid>
        </Row>
      );
    } else {
      return null;
    }
  }
  getFavouriteBanner() {
    AsyncStorage.getItem("loggedInUserObj", (err, result) => {
      if (result) {
        var userData = JSON.parse(result);
        GetFavouriteBannersApi(
          this.state.serviceData.SelectedService.id,
          userData.id,
          userData.remember_token,
          i18n.locale,
          scs => {
            //console.log("Success data of favourite ", scs);
            if (scs.length === 1) {
              this.setState({ IsFavourite: true, favouriteBanners: scs });
            } else {
              this.setState({ IsFavourite: false });
              this.setTopRatedBannerToFavourite();
            }
          },
          err => {
            if (err.status === "error") {
              this.unAuthorized();
            } else {
              this.refs.toast.show(err.error_data, DURATION.LENGTH_SHORT);
            }
          }
        );
      }
    });
  }
  setTopRatedBannerToFavourite() {
    var bannerData = [];
    var slider = this.state.sliderBanner;
    var big = this.state.bigBanner;
    var smallBanner = this.state.smallBanner;
    if (slider && slider.length > 0) {
      for (let index = 0; index < slider.length; index++) {
        const element = slider[index];
        bannerData.push(element);
        if (bannerData.length >= 6) {
          break;
        }
      }
    }

    if (bannerData.length < 6 && big && big.length > 0) {
      for (let index = 0; index < big.length; index++) {
        const element = big[index];
        bannerData.push(element);
        if (bannerData.length >= 6) {
          break;
        }
      }
    }
    if (bannerData.length < 6 && smallBanner && smallBanner.length > 0) {
      for (let index = 0; index < smallBanner.length; index++) {
        const element = smallBanner[index];
        bannerData.push(element);
        if (bannerData.length >= 6) {
          break;
        }
      }
    }
    this.setState({ favouriteBanners: bannerData });
  }
  //#endregion

  //#region Phone number
  getPhoneNumber() {
    GetPhoneNumber(
      scs => {
        if (scs && scs.customercare) {
          this.setState({ customerCareNumber: scs.customercare });
          AsyncStorage.setItem("conversationCharge", scs.conversion_charge);
          AsyncStorage.setItem("paypal_client_id", scs.paypal_client_id);
          AsyncStorage.setItem("paypal_secret", scs.paypal_secret);
          AsyncStorage.setItem(
            "telr_payment_mode_test",
            scs.telr_payment_mode_test.toString()
          );
          AsyncStorage.setItem("telr_store_id", scs.telr_store_id);
          AsyncStorage.setItem(
            "telr_mobile_api_auth_key",
            scs.telr_mobile_api_auth_key
          );
        }
      },
      err => {
        if (err) {
          this.openConfirmModal(err);
          //alert(err);
        }
      }
    );
  }
  //#endregion
  renderScrollViewHeight() {
    if (this.state.IsFavourite) {
      return RF(62.5);
    } else if (
      this.state.favouriteBanners &&
      this.state.favouriteBanners.length > 0
    ) {
      return RF(50 + Math.ceil(this.state.favouriteBanners.length / 2) * 12.5);
    } else {
      return RF(65.5);
    }
  }
  //#region Logout
  unAuthorized() {
    this.setState({ IsLoginExpired: true }, () => {
      this.openConfirmModal(i18n.t("loginExpired"));
    });
  }
  logout() {
    AsyncStorage.removeItem("userId", (err, scs) => {
      AsyncStorage.removeItem("loggedInUserObj", (err1, scs1) => {
        AsyncStorage.removeItem("accessToken", (err2, scs2) => {
          this.props.navigation.navigate("start");
        });
      });
    });
  }
  //#endregion

  renderSpaceDivider() {
    return <View style={{ width: "100%", height: 10 }} />;
  }
  //#region Get scrren height width logic

  //Return whole screen height and width in pixal
  heightCalculator(percentage, msg) {
    let windowHeight = Dimensions.get("window").height;
    return (windowHeight * percentage) / 100;
  }

  //Return width in pixal by calculating whole screen percentage width
  widthCalculator(percentage, msg) {
    let windowWidth = Dimensions.get("window").width;
    return (windowWidth * percentage) / 100;
  }
  //#endregion
  //#region Height of second section
  renderMainScrollHeight() {
    //console.log("Scroll height update", this.heightCalculator(171.97), this.heightCalculator(131.97, ""));
    if (this.state.steps == 1) {
      this.setState({
        mainScrollHeight: this.heightCalculator(171.97),
        secondSectionHeight: this.heightCalculator(131.97, "")
      });
    } else {
      this.setState({ mainScrollHeight: this.heightCalculator(100) });
      // return this.heightCalculator(100);
    }
  }

  renderStep1ImageUploadSectionHeight() {
    if (this.state.uploadedImage) {
      return this.heightCalculator(45, "");
    } else {
      return this.heightCalculator(25);
    }
  }
  renderSliderSectionHeight() {
    if (
      (!this.state.sliderBanner &&
        (this.state.bigBanner || this.state.smallBanner)) ||
      (this.state.sliderBanner &&
        (!this.state.bigBanner && !this.state.smallBanner))
    ) {
      // console.log("1795 " + this.heightCalculator(40));
      return this.heightCalculator(25);
    } else {
      // console.log("1799 " + this.heightCalculator(65));
      return this.heightCalculator(50);
    }
  }
  //#endregion
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoriesDetails);
