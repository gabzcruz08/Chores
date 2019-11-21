import { Dimensions } from "react-native";
import RF from "react-native-responsive-fontsize";
const { width, height } = Dimensions.get('window')

const styles = {
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#fff',

    },
    GR3: {
        marginTop: '-5.49%',
    },
    backgroundImage: {
        width: '100%',
        height: '100%'
    },
    ImageParentView: {
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 170, 26, 0.8)',
        zIndex: 5
    },
    ImageUpperView: {
        height: '20%',
        width: '100%',
        backgroundColor: 'rgba(255, 225, 225, 0)'
    },
    ImageView: {
        width: '100%',
        height: '80%',
        backgroundColor: 'rgba(255, 225, 225, 0)',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    DrpGredientView: {
        width: '100%',
        height: '100%',
        //backgroundColor: 'white',
        position: 'absolute',
        //marginTop: '-10%',
        zIndex: 3
    },
    RGR1: {
        zIndex: 3,
        backgroundColor: 'rgba(255,255,255,0)',
        // margin: RF(0.5),
    },
    RGR2: {
        zIndex: 2,
        backgroundColor: 'rgba(255,255,255,0)',
        margin: RF(2)
    },
    colorRed: {
        backgroundColor: 'red'
    },
    colorGreen: {
        backgroundColor: 'green'
    },
    colorBlue: {
        backgroundColor: 'blue',
        //zIndex: 3
    },
    colorYellow: {
        backgroundColor: 'yellow'
    },
    colorD0d0d0: {
        backgroundColor: '#d0d0d0',
    },
    colorD0d0d0BigBanner: {
        backgroundColor: '#d0d0d0',
        // marginLeft:'2.5%',
        // marginRight:'2.5%',
        //marginLeft: '5%',
        //marginRight: '5%',
        //zIndex: 3
    },
    textSelectDropdown: {
        color: '#fff',
        marginLeft: 10,
        fontFamily: 'Quicksand-Medium',
        fontSize: RF(1.8),
        zIndex: 3
    },
    spaceBetweenElements: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        height: '100%',
        zIndex: 3
    },
    favouriteFont: {
        fontFamily: 'Quicksand-Medium',
        fontSize: RF(1.8),
        zIndex: 3
    },
    favouriteSection: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        height: '100%',
        zIndex: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },

    viewTouchableLetsGoParent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    touchableLetsGo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: RF(6),
        width: RF(18),
        borderColor: '#ff9a00',
        borderWidth: 2,
        borderRadius: RF(5),
    },
    colorTheme: {
        color: '#ff9a00'
    },
    colorDark: {
        color: '#000'
    },
    touchableOpecityModel: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 2,
        borderBottomColor: '#e1e1e1',
        marginTop: 5,
        marginBottom: 5
    },
    modelTextFont: {
        fontFamily: 'Quicksand-Regular',
        fontSize: RF(2.5),
    },
    btnCapture: {
        backgroundColor: '#ffbe00',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnCaptureCol: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    txtAreaStyle: {
        backgroundColor: '#e7e7e7',
        fontFamily: 'Quicksand-Medium',
        fontSize: RF(2),
        width: '100%',
        heigh: '100%'
    },
    center: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    AllCenter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    CenterStart: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    spaceCenter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    axactCenter: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    txtAddYourFavourite: {
        fontSize: RF(1.5),
        color: '#979797',
        fontFamily: 'Quicksand-Regular',
        marginLeft: RF(1.5)
    },
    txtFeatured: {
        fontSize: RF(4),
        color: '#ff9a00',
        fontFamily: 'Quicksand-Regular'
    },
    rowLetsGo: {
        height: RF(9),
        borderBottomWidth: 2,
        borderBottomColor: '#e1e1e1'
    },
    iconDrp: {
        marginRight: 10,
        zIndex: 3
    },
    drpOuterStyle: {
        //width: '100%',
        // backgroundColor: 'rgba(255,255,255,0.0)',
        backgroundColor: '#fff',
        //marginLeft: 20
    },
    drpModelStyle: {
        width: '100%',
        backgroundColor: 'rgba(255,255,255,0.0)',
    },
    touchableHeartPositionL: {
        justifyContent: 'flex-end',
        marginLeft: 'auto',
        marginRight: RF(2),
        marginTop: RF(1),

    },
    touchableStarPositionL: {
        justifyContent: 'flex-start',
        marginRight: 'auto',
        marginTop: RF(1),
        marginLeft: RF(2),

    },
    touchableHeartPositionM: {
        justifyContent: 'flex-end',
        marginLeft: 'auto',
        marginRight: RF(2),
        marginTop: RF(1)
    },
    touchableHeartPositionS: {
        justifyContent: 'flex-end',
        marginLeft: 'auto',
        marginRight: RF(2),
        marginTop: RF(1)
    },
    heartPosition: {
        justifyContent: 'flex-end',
        marginLeft: 'auto',
        backgroundColor: 'lightgray',
        marginRight: 10,
        // height: '80%',
        // width: '10%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50
    },
    heartPositionFirst: {
        marginLeft: 'auto',
        backgroundColor: 'lightgray',
        // height: '80%',
        // width: '10%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50
    },
    allHeightWidth: {
        height: '100%',
        width: '100%'
    },
    allHeightWidthBigBannerImage: {
        height: '100%',
        width: '95%',
        marginLeft: '2.5%',
        marginRight: '2.5%',
    },
    allHeightWidthButton: {
        height: '100%',
        width: '100%',
        borderRadius: '100%',
    },
    txtIfNowSure: {
        fontFamily: 'Quicksand-Medium',
        color: '#979797',
        fontSize: RF(1.5),
    },
    headeSmallText:
    {
        //margiTop: 15,
        color: '#fff',
        fontSize: RF(2),
        fontFamily: 'Quicksand-Regular',
        marginLeft: RF(1),
        alignItems: 'baseline',
        //flexDirection: 'column',
        //alignItems: 'center',
        //justifyContent: 'center',
    },
    headeBackTouch: {
        //     marginLeft: 10,
        width: '15%'
    },
    headerText: {
        color: 'white',
        fontSize: RF(2.8),
        fontFamily: 'Quicksand-Medium',
        alignItems: 'baseline',
        //alignItems: 'center',
        //justifyContent: 'center',
    },
    headerBackArrow: {
        zIndex: 2,
        backgroundColor: 'rgba(255,255,255,0)',
        marginLeft: 10,
        height: RF(3),
        width: RF(3)
    },
    headeCenterView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '70%',
        // borderColor: 'green',
        // borderWidth: 1,
    },
    tenPercentWidth: {
        width: '30%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    priceViewWrapper: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    priceView: {
        width: '90%',
        height: '35%',
        // marginTop: RF(3),
        // marginBottom: RF(3),
        backgroundColor: '#fff',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    serviceChargesRowStyle: {
        flexDirection: 'row',
        justifyContent: 'center',

    },
    serviceChargeRowBottm: {
        borderBottomWidth: 1,
        borderBottomColor: '#e1e1e1'
    },
    hundredHeightWidth: {
        width: '100%',
        height: '100%'
    },
    favouriteText: {
        fontSize: RF(4),
        fontFamily: 'Quicksand-Bold',
        color: '#FF9A00'
    },
    gridLeftRightMargin: {
        marginLeft: RF(2),
        marginRight: RF(2)
    },
    txtCallUsNow: {
        fontSize: RF(2.5),
        color: '#fff',
        fontFamily: 'Quicksand-Medium'
    },
    backgroundColorRed: {
        backgroundColor: 'red'
    },
    backgroundColorGreen: {
        backgroundColor: '#4cb729'
    },
    middleFlexStart: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    bkcolroRed: {
        backgroundColor: 'red',
        borderWidth: '1',
        borderColor: '#000'
    },
    bkcolroGreen: {
        backgroundColor: 'green',
        borderWidth: '1',
        borderColor: '#000'
    },
    bkcolroBlue: {
        backgroundColor: 'blue',
        borderWidth: '1',
        borderColor: '#000'
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.6)'
    },
    rowHeaderText: {
        height: '50%',
        width: '60%',
        marginLeft: '5%',
        marginRight: '20%',
        //alignItems: 'center',
        //backgroundColor: 'blue',
        alignItems: 'baseline',

        //borderColor: 'red',
        //borderWidth: 1,
    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: RF(20),
        backgroundColor: '#fff',
        borderRadius: RF(4)
    },
    modal3: {
        height: RF(35),
        width: 300
    },
    camModal: {
        flex: 1,
        width: '100%'
    },
    camModalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#CCCCCC',
        width: '100%',
        height: RF(10),
    },
    camModalTitle: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginLeft: '5%'
    },
    camModalTitleText: {
        color: '#ffaa1a',
        fontFamily: 'Quicksand-Bold',
        fontSize: RF(5),
    },
    camModalCloseButton: {
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        marginRight: '5%'
    },
    camModalContent: {
        flexDirection: 'column',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        height: RF(15),
        marginTop: RF(5)
    },
    camOpenCamera: {
        backgroundColor: '#ffaa1a',
        width: '80%',
        borderRadius: RF(5),
        height: RF(7)
    },
    camOpenImage: {
        backgroundColor: '#ffaa1a',
        width: '80%',
        borderRadius: RF(5),
        height: RF(7),
        marginTop: RF(1.5)
    },
    camOpenCameraText: {
        color: '#fff',
        fontFamily: 'Quicksand-Regular',
        textAlign: 'center',
        padding: RF(2)
    },
    modalBody: {
        height: RF(5),
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalBodyText: {
        fontFamily: 'Quicksand-Medium',
        color: '#ffaa1a',
        fontSize: RF(2),
        marginLeft: RF(1)
    },
    backGroundColor: {
        colorRed: {
            backgroundColor: 'red',
            borderWidth: 1,
            borderColor: 'black'
        },
        colorGreen: {
            backgroundColor: 'green',
            borderWidth: 1,
            borderColor: 'black'
        }
        ,
        colorBlue: {
            backgroundColor: 'blue',
            borderWidth: 1,
            borderColor: 'black'
        }
    },
    FavouriteStyle: {

    },
    wrapper: {

    },
    slide: {
        flex: 1,
        backgroundColor: 'transparent'
    },
    image: {
        width: 150,
        height: 150,
    },
    companyName: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginLeft: '5%',
        marginRight: '5%',
        // width: '10%',
        width: '90%',
        paddingBottom: RF(5),
    },
    companyText: {
        fontSize: RF(2.5),
        fontFamily: 'Quicksand-Medium',
        color: '#6C6C6C'
    },
    companyShortDescription: {
        fontSize: RF(1.5),
        fontFamily: 'Quicksand-Medium',
        color: '#6C6C6C'
    },
    companyLongDescription: {
        fontSize: RF(1.5),
        fontFamily: 'Quicksand-Medium',
        color: '#6C6C6C'
    },
    companyLogo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoDim: {
        // height: '50%',
        // width: '50%'
        height: 80,
        width: 150,
        marginLeft: RF(2),
        marginRight: RF(2),
    },
    imageContainer:{
        alignItems: 'center', 
        justifyContent: 'center',  
        height: RF(15), 
        marginTop: RF(5), 
        width: RF(25), 
        marginLeft: RF(2), 
        marginRight: RF(2),
    },
}
export default styles