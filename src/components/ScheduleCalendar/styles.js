import RF from 'react-native-responsive-fontsize'
const styles = {
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '100%',
        backgroundColor: 'white'
    },
    item: {
        // padding: 5,
        fontSize: 12,
        // height: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Quicksand-Medium',
        paddingLeft: 10,
        paddingTop: 5,
        color: 'rgb(152,152,152)'
        // color: '#ffaa1a',
    },
    companyText: {
        // padding: 5,
        fontSize: 12,
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Quicksand-Medium',
        paddingLeft: 10,
        color: 'rgb(152,152,152)'
        // color: '#ffaa1a',
    },
    companyTextColor: {
        color: '#ffaa1a',
        fontSize: 12,
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Quicksand-Medium',
    },
    itemChild: {
        padding: 3,
        fontSize: 10,
        alignItems: 'flex-start',
        fontFamily: 'Quicksand-Regular',
        color: '#000',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        borderBottomWidth: 1,
        borderBottomColor: '#E1E1E1',
        color: '#ffaa1a',
        fontFamily: 'Quicksand-Bold',
        paddingBottom: 10,
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
        // height: 100,
        // width: '100%',
        // backgroundColor: '#ffaa1a',
        // alignItems: 'center',
        // justifyContent: 'center'
        height: '20%',
        width: '100%',
        backgroundColor: 'rgba(255, 225, 225, 0)'
    },
    content: {
        marginLeft: '10%',
        marginRight: '10%',
        flexDirection: 'row',
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        borderColor: 'red',
        borderWidth: 1,
    },
    parent: {
        width: '90%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginLeft: '5%',
        marginRight: '5%',
        marginTop: '2%',
    },
    child: {
        width: '14%',
        height: '11%',
        // margin: '1%',
        aspectRatio: 1,
        borderWidth: 1,
        borderColor: 'rgb(220,220,220)',
        backgroundColor: 'rgb(255,255,255)',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'column',
    },
    child1: {
        width: '14%',
        height: '11%',
        // margin: '1%',
        aspectRatio: 1,
        borderWidth: 1,
        borderColor: 'rgb(220,220,220)',
        backgroundColor: 'rgb(228,228,228)',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'column',
    },
    monthHeader: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginLeft: '5%',
        marginRight: '5%',
        width: '90%'
    },
    monthHeaderText: {
        color: 'rgb(255,154,75)'
    },
    daysText: {
        fontSize: RF(1.2),
        fontFamily: 'Quicksand-Medium',
        color: 'rgb(107,107,107)',
        textAlign: 'left'
        //marginTop: 28,
        //paddingLeft: 5
    },
    imageView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: '1%',

    },
    timeText: {
        fontFamily: 'Quicksand-Medium',
        color: 'red',
        fontSize: RF(1.5)
        // textAlign: 'justify',
    },
    serviceDetailsView: {
        // flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: '100%',
        height: RF(4),
        marginLeft: '5%',
        marginTop: '2%'
    },
    serviceDetailsDisplayTimeView: {
        // flex: 1,
        //marginLeft:20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '15%',
        // borderColor:'red',
        // borderWidth:1,

    },
    serviceDetailsDisplayDataView: {
        // flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '35%'
    },

    serviceDetailsText: {
        color: 'rgb(152,152,152)',
        fontFamily: 'Quicksand-Regular',
        // padding: 2,
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: RF(1.8)

    },
    renderServicesView: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginTop: '1%'
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