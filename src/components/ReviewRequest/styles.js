import RF from "react-native-responsive-fontsize";
const styles = {
    container: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',

    },
    headerView: {
        height: 100,
        width: '100%',
        backgroundColor: '#ffaa1a',
        alignItems: 'center',
        justifyContent: 'center'
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
    },
    content: {
        marginLeft: '5%',
        marginRight: '5%',
        flexDirection: 'column',
        width: '90%'
    },
    titleText: {
        fontFamily: 'Quicksand-Medium',
        fontSize: RF(2),
        color: '#ffaa1a'
    },
    titleDescription: {
        fontFamily: 'Quicksand-Medium',
        fontSize: RF(2),
        color: 'rgb(152,152,152)',
        paddingBottom: 10,
    },
    titleRowDescription: {
        fontFamily: 'Quicksand-Medium',
        fontSize: RF(2),
        color: 'rgb(152,152,152)',
        padding: 5,
    },
    ImageView: {
        width: '100%',
            height: '80%',
            backgroundColor: 'rgba(255, 225, 225, 0)',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        // width: '100%',
        // height: 80,
        // backgroundColor: '#ffaa1a',
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        // alignItems: 'center',
        // marginBottom: 60,
    },
    ImageParentView: {
        // height: 80,
        // width: '100%',
        // flexDirection: 'column',
        // alignItems: 'center',
        // justifyContent: 'center',
        // backgroundColor: '#ffaa1a',
        height: '12.8%',
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffaa1a',
    },
    tenPercentWidth: {
        width: '28%',
        height: '80%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    viewSection: {
        borderBottomColor: '#cccccc',
        borderBottomWidth: 0.6,
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
        // width: '90%',
        // height: '50%',
        // margin: RF(3),
        // backgroundColor: '#fff',
        // borderRadius: 10,
        // justifyContent: 'center',
        // alignItems: 'center'
    },

    headerTextNew: {
        color: 'white',
        fontSize: RF(2.8),
        fontFamily: 'Quicksand-Bold',
        alignItems: 'baseline',
    },
    rowHeaderText: {
        height: '50%',
        width: '70%',
        marginLeft: '10%',
        marginRight: '20%',
        alignItems: 'baseline',
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
        width: '72%',
    },
    ImageUpperView: {
        height: '20%',
        width: '100%',
        backgroundColor: 'rgba(255, 225, 225, 0)'
        // height: 80,
        // width: '100%',
        // backgroundColor: '#ffaa1a',
        // alignItems: 'center',
        // justifyContent: 'center'
    },
    mainStyle: {
        hundredHeightWidth: {
            height: '100%',
            width: '100%'
        },
        center: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
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