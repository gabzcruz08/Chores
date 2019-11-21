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
    content: {
        marginLeft: '10%',
        marginRight: '10%',
        flexDirection: 'column',
        width: '80%'
    },
    titleText: {
        fontFamily: 'Quicksand-Medium',
        fontSize: 15,
        color: '#ffaa1a'
    },
    titleDescription: {
        fontFamily: 'Quicksand-Medium',
        fontSize: RF(2),
        color: 'rgb(152,152,152)',
        paddingBottom: RF(1),
    },
    titleRowDescription: {
        fontFamily: 'Quicksand-Medium',
        fontSize: 10,
        color: 'rgb(152,152,152)',
        padding: RF(1),
    },
    headeCenterView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '72%',
    },
    headerText: {
        // marginTop: RF(0.5),
        // paddingTop: RF(0.5),
        // color: '#fff',
        // fontFamily: 'Quicksand-Bold',
        // fontSize: RF(3)
        color: 'white',
        fontSize: RF(2.8),
        fontFamily: 'Quicksand-Medium',
        alignItems: 'baseline',
    },

    tenPercentWidth: {
        width: '28%',
        height: '80%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    priceView: {
        // width: '90%',
        // height: '50%',
        // margin: RF(3),
        // backgroundColor: '#fff',
        // borderRadius: 10,
        // justifyContent: 'center',
        // alignItems: 'center'
        width: '90%',
        height: '40%',
        // marginTop: RF(3),
        // marginBottom: RF(3),
        backgroundColor: '#fff',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    viewSection: {
       
        borderBottomColor: '#cccccc',
        borderBottomWidth: 0.6
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
    ImageView: {
        // width: '100%',
        // height: 80,
        // backgroundColor: '#ffaa1a',
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        // alignItems: 'center',
        // marginBottom: 60,
        width: '100%',
        height: '80%',
        backgroundColor: 'rgba(255, 225, 225, 0)',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
    ImageUpperView: {
        // height: 80,
        // width: '100%',
        // backgroundColor: '#ffaa1a',
        // alignItems: 'center',
        // justifyContent: 'center'
        height: '20%',
        width: '100%',
        backgroundColor: 'rgba(255, 225, 225, 0)'
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
    center: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnDispatch: {
        backgroundColor: '#ffaa1a',
    },
    btnDispatched: {
        backgroundColor: '#dddddd',
    },
    txtCallUsNow: {
        color: '#fff'
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