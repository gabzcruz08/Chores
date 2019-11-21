import RF from "react-native-responsive-fontsize";

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    text: {
        marginLeft: 12,
        fontSize: 16,
        color: '#FFBB00'
    },
    item: {
        // padding: 2,
        fontSize: 15,
        height: RF(4),
        alignItems: 'flex-start',
        fontFamily: 'Quicksand-Bold',
        color: '#ffaa1a',
    },
    itemChild: {
        // padding: 3,
        fontSize: 10,
        alignItems: 'flex-start',
        fontFamily: 'Quicksand-Regular',
        color: '#000',
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
        // justifyContent: 'space-between',
        // alignItems: 'center',
        // marginBottom: 80,
    },
    ImageParentView: {
        height: '12.8%',
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffaa1a',
        // height: 100,
        // width: '100%',
        // flexDirection: 'column',
        // alignItems: 'center',
        // justifyContent: 'center',
        // backgroundColor: '#ffaa1a',
    },
    ImageUpperView: {
        height: '20%',
        width: '100%',
        backgroundColor: 'rgba(255, 225, 225, 0)'
        // height: 100,
        // width: '100%',
        // backgroundColor: '#ffaa1a',
        // alignItems: 'center',
        // justifyContent: 'center'
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
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: RF(20),
        backgroundColor: '#fff',
        borderRadius: RF(4)
    },
    modal3: {
        height: RF(30),
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
        Small: {
            fontFamily: 'Quicksand-Light'
        }
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
    headerText: {
        color: 'white',
        fontSize: RF(2.6),
        fontFamily: 'Quicksand-Medium',
        //alignItems: 'baseline',
        // marginTop: RF(0.5),
        // paddingTop: RF(0.5),
        // color: '#fff',
        // fontFamily: 'Quicksand-Bold',
        // fontSize: RF(3)
    },
}
export default styles