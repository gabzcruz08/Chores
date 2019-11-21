import RF from "react-native-responsive-fontsize";

const styles = {
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor: '#FFBB00',
    },
    text: {
        marginLeft: 12,
        fontSize: 16,
        color: '#FFBB00'
    },
    item: {
        // padding: 5,
        // fontSize: 15,
        // height: 'auto',
        fontFamily: 'Quicksand-Medium',
        color: '#ffaa1a',
        fontSize:RF(2.5)

    },
    itemChild: {
        // padding: 5,
        // paddingLeft: 5,
        // fontSize: 10,
        // alignItems: 'flex-start',
        // justifyContent: 'flex-start',
        fontFamily: 'Quicksand-Medium',
        color: '#6b6b6b',
        fontSize:RF(2)
        // borderBottomWidth: 1,
        // borderBottomColor: '#E1E1E1',
        // height: 'auto'
    },
    ImageParentView: {
        // height: 100,
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
    ImageView: {
        // width: '100%',
        // height: 100,
        // backgroundColor: '#ffaa1a',
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        // alignItems: 'center',
        // marginBottom: 80,
        width: '100%',
        height: '80%',
        backgroundColor: 'rgba(255, 225, 225, 0)',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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