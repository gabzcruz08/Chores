import RF from "react-native-responsive-fontsize";
import { Left } from "native-base";
const styles = {
    mainStyle: {
        hundredHeightWidth: {
            height: '100%',
            width: '100%',
            //borderWidth:1
        },
        center: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
        },
        centerCol: {
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        },
        end: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end'
        },
        start: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start'
        },
        centerFlex: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
        },
        space: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
        },
    },
    fontStyle: {
        default: {
            fontFamily: 'Quicksand-Regular'
        },
        bold: {
            fontFamily: 'Quicksand-Bold'
        },
        Medium: {
            fontFamily: 'Quicksand-Medium'
        },

        position: {
            flex: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 5,
            borderColor: 'green',
            textAlign: "center",
            alignSelf: 'center'
        },

        Small: {
            fontFamily: 'Quicksand-Light'
        },
        headerFont: {
            color: 'white',
            fontSize: RF(3)
        },
        leftAlign: {
            marginLeft: 15,
        },
        SliderMainFont: {
            color: '#fff',
            fontSize: RF(3.6)
        },
        smallFont: {
            color: '#979797',
            fontSize: RF(2)
        },
        scrollViewInnerBigFont: {
            color: '#fff',
            fontSize: RF(3.5),
            alignItems: 'center',
            justifyContent: 'center',
            paddingBottom: RF(0.7),
        },
        scrollViewInnerBigFontSelected: {
            color: '#ff9a00',
            fontSize: RF(3.5),
            alignItems: 'center',
            justifyContent: 'center',
            paddingBottom: RF(0.7),
        },
        smallScrollViewInnerFont: {
            color: '#979797',
            fontSize: RF(1.2)
        },
        smallScrollViewInnerFontSelected: {
            color: '#ff9a00',
            fontSize: RF(1.2)
        },
        scrollViewInnerSmallFont: {
            color: '#979797',
            fontSize: RF(1),

            marginTop: 2
        },
        MediumWhite: {
            color: '#fff',
            fontSize: RF(1.7)
        },
        MediumPlusWhite: {
            color: '#fff',
            fontSize: RF(1.9)
        },
        LargePlusWhite: {
            color: '#fff',
            fontSize: RF(2.5)
        },
        lowSpacing: {
            letterSpacing: -.5
        },
        modelHeaderFont: {
            color: '#979797',
            fontSize: RF(5)
        },
    },
    header: {
        ImageParentView: {
            height: '12.8%',
            width: '100%',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#ffaa1a',
        },
        ImageUpperView: {
            // height: 100,
            // width: '100%',
            // backgroundColor: '#ffaa1a',
            // alignItems: 'center',
            // justifyContent: 'center'
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
            // width: '100%',
            // height: 100,
            // backgroundColor: '#ffaa1a',
            // flexDirection: 'row',
            // //justifyContent: 'space-between',
            // alignItems: 'center',
            // marginBottom: 80,
        },
        RightSideView: {
            width: '28%',
            height: '100%',
            alignItems: 'flex-end'
        },
        priceView: {
            width: '90%',
            height: '50%',
            margin: RF(3),
            backgroundColor: '#fff',
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center'
        }
    },
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#fff',
    },
    imageStyle: {
        swiperLeftImage: {
            height: RF(15),
            width: RF(15),
            marginRight: RF(-4),
            zIndex: 0
        },
        swiperRightImage: {
            height: RF(15),
            width: RF(15),
            marginLeft: RF(-4),
            zIndex: 0
        },
        mainImage: {
            height: RF(28),
            width: RF(28),
            zIndex: 0
        },
        sliderButtonBasic: {
            height: RF(2),
            width: RF(3)
        },
        mapSize: {
            height: RF(8.5),
            width: RF(5.5),
        }
    },
    swiperStyle: {
        swiperStyle: {
            zIndex: 5
        },
        dot: {
            backgroundColor: 'rgba(0,0,0,0)'
        },
        TouchableOpecity: {
            height: RF(7),
            width: RF(7)
        },
        nextButton: {
            zIndex: 10,
        },
        previousButton: {
            zIndex: 10
        }
    },
    ModalStyle: {
        WholeView: {
            height: RF(40),
            width: '100%',
        },
        textInput: {
            paddingLeft: 5,
            height: RF(6),
            width: '90%',
            fontSize: RF(2.5),
            color: '#ffaa1a',
            fontFamily: 'Quicksand-Regular',
            marginLeft: RF(2),
            //borderBottomWidth:1,
            //borderBottomColor:'#979797'
        },
        buttonText: {
            color: '#fff',
            fontSize: RF(3)
        },
        buttonStyle: {
            margin: RF(2)
        }
    },
    scrollStyle: {
        TouchableOpecity: {
            height: RF(7),
            width: RF(7),
            backgroundColor: '#ff9a00',
            borderRadius: RF(7)
        },
        TouchableOpecitySelected: {
            height: RF(7),
            width: RF(7),
            // borderColor: '#ff9a00',
            // borderWidth: 1,
            borderRadius: RF(7)
        },
        TouchableOpecitySmall: {
            height: RF(5.5),
            width: RF(5.5),
            backgroundColor: '#fff',
            borderRadius: RF(5.5),
            borderWidth: 1,
            borderColor: '#d3d3d3',
        },
        TouchableOpecitySmallSelected: {
            height: RF(5.5),
            width: RF(5.5),
            // borderColor: '#ff9a00',
            // borderWidth: 1,
            borderRadius: RF(5.5)
        }
    },
    btnCheckOut: {
        backgroundColor: '#4cb729'
    },
    MapClose: {
        backgroundColor: '#ff9a00'
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
    backLocationLnk: {
        height: 60,
        width: 60
    },
    locationBtn: {
        color: 'orange',
        fontSize: 40,
        alignSelf: 'flex-end',
        backgroundColor: 'transparent',
    },
    locationBtnView: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 10,
        position: 'absolute',
        bottom: 0,
        right: 10,
        backgroundColor: 'transparent'
    },
    addressModal: {
        flex: 1,
        width: '100%'
    },
    addressModalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#CCCCCC',
        width: '100%',
        height: RF(10),
    },
    addressModalTitle: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginLeft: '5%'
    },
    addressModalTitleText: {
        color: '#ffaa1a',
        fontFamily: 'Quicksand-Bold',
        fontSize: RF(5),
    },
    addressConfirmModalTitleText: {
        color: '#ffaa1a',
        fontFamily: 'Quicksand-Bold',
        fontSize: RF(3),
    },
    addressModalCloseButton: {
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        marginRight: '5%'
    },
    addressModalContent: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        height: RF(7),
        marginTop: RF(5),
    },
    addressConfirmModalText: {
        flexDirection: 'row',
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
        //height: RF(7),
        marginTop: RF(2.5),
    },
    addressConfirmModalTextShow: {
        flexDirection: 'row',
        //width: RF(38),
        //justifyContent: 'center',
        //alignItems: 'center',
        //height: RF(7),
        //marginLeft: RF(-4),
        //borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        //textAlign: 'center'
    },
    addressErrorText: {
        fontSize: RF(1.5),
        color: 'red',
        marginLeft: RF(3)
    },
    addressText: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: RF(2),
    },
    submitAddressBtn: {
        backgroundColor: '#ffaa1a',
        width: '50%',
        borderRadius: RF(5),
        height: RF(7),
        alignItems: 'center',
        justifyContent: 'center',
    },
    submitAddressBtnText: {
        color: '#fff',
        fontFamily: 'Quicksand-Regular',
        textAlign: 'center',
        padding: RF(2),
        fontSize: RF(2.7),

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
    headeCenterView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '72%',
        // borderColor: 'green',
        // borderWidth: 1,
    },
    headerBackArrow: {
        zIndex: 2,
        backgroundColor: 'rgba(255,255,255,0)',
        marginLeft: 10,
        height: RF(3),
        width: RF(3)
    },
    rowHeaderText: {
        height: '50%',
        width: '70%',
        marginLeft: '10%',
        marginRight: '20%',
        //alignItems: 'center',
        //backgroundColor: 'blue',
        alignItems: 'baseline',
        //borderColor: 'red',
        //borderWidth: 1,
    },
    headerText: {
        color: 'white',
        fontSize: RF(2.8),
        fontFamily: 'Quicksand-Medium',
        alignItems: 'baseline',
        // marginTop: RF(0.5),
        // paddingTop: RF(0.5),
        // color: '#fff',
        // fontFamily: 'Quicksand-Bold',
        // fontSize: RF(3)
        //alignItems: 'center',
        //justifyContent: 'center',
    },
    tenPercentWidth: {
        width: '28%',
        height: '80%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    priceView: {
        width: '90%',
        height: '40%',
        // marginTop: RF(3),
        // marginBottom: RF(3),
        backgroundColor: '#fff',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    hundredHeightWidth:
    {
        width: '100%',
        height: '100%'
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
}
export default styles