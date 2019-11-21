import RF from "react-native-responsive-fontsize"

const styles = {
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '100%'
    },
    ImageView: {
        width: '100%',
        height: 100,
        backgroundColor: '#ffaa1a',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 80,
    },
    ImageParentView: {
        height: 100,
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffaa1a',
    },
    ImageUpperView: {
        height: 100,
        width: '100%',
        backgroundColor: '#ffaa1a',
        alignItems: 'center',
        justifyContent: 'center'
    },
    ImageStyle: {
        height: 20,
        width: 20,
        resizeMode: 'stretch',
        alignItems: 'center',
        borderColor: 'white',
    },
    textBoxView: {
        // fontSize: RF(2.5),
        // flex: 1,
        // paddingLeft: 5,
        // color: 'black',
        // fontFamily: 'Quicksand-Regular',
        fontSize: RF(2.5),
        color: 'black',
        fontFamily: 'Quicksand-Regular',
        height: 50
    },
    textView: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#FFFF',
      },
    btnSaveProfile: {
        backgroundColor: '#ffaa1a',
        alignSelf:'center',
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
        fontSize: RF(3),
    },
    camModalContent: {
        flexDirection: 'column',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        height: RF(15),
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
    camOpenCamera: {
        backgroundColor: '#ffaa1a',
        width: '80%',
        borderRadius: RF(5),
        height: RF(7)
    },
    camOpenCameraText: {
        color: '#fff',
        fontFamily: 'Quicksand-Regular',
        textAlign: 'center',
        padding: RF(2)
    },
    textBoxWraperView: {
        //flex: 1,
        paddingLeft: 5,
        width: '100%',
        height: 50,
        //fontSize: RF(2.5),
        //color: 'black',
        //fontFamily: 'Quicksand-Regular',
    },
}
export default styles