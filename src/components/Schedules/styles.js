const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    item: {
        // padding: 5,
        fontSize: 10,
        height: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Quicksand-Medium',
        paddingLeft: 25,
        paddingTop: 15,
        color: 'rgb(152,152,152)'
        // color: '#ffaa1a',
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
}
export default styles