import React, { Component } from 'react';
import { Font } from 'expo';
import { View, Text, ListView, Image, TextInput, ScrollView, AsyncStorage, TouchableOpacity } from 'react-native'
import styles from './styles'
import { BackHandler } from "react-native";
import RF from 'react-native-responsive-fontsize';
import { getCategories, getSearchedCategories, setLogoutState } from './actions'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { CustomeFooterTab } from '../../partial/footer'
import { Col, Row, Grid } from "react-native-easy-grid";
import { Input } from 'native-base';
import Toast, { DURATION } from 'react-native-easy-toast-fixed';
import i18n from 'react-native-i18n';
import { LogoutConfirmation } from '../../partial/LogoutConfirmation';

const mapStateToProps = (state) => ({
    languageCode: state.search.languageCode,
    isLoginPressed: state.search.isLoginPressed,
})
const mapDispatchToProps = (dispatch) => bindActionCreators({
    getCategories,
    getSearchedCategories,
    setLogoutState,
}, dispatch)
// accessToken
class Search extends Component {

    constructor(prop) {
        super(prop);
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        var loggedInResponse;
        this.state = {
            dataSource: ds.cloneWithRows(['row 1', 'row 2']),
            searchText: '',
            fontLoaded: true,
            data: [],
            jsonData: null,
            arrayHolder: [],
            thisLanguageCode: '',
        };
        this.navigateTocategory = this.navigateTocategory.bind(this);
        this.onBackPress = this.onBackPress.bind(this);
    }

    componentWillMount() {
        // if (typeof this.props.navigation.state.params.loggedInObject !== undefined && this.props.navigation.state.params.loggedInObject !== null) {
        //     this.loggedInResponse = JSON.parse(this.props.navigation.state.params.loggedInObject);
        //     this.getCategoriesData();
        // }
        AsyncStorage.getItem('loggedInUserObj').then((value) => {
            this.loggedInResponse = JSON.parse(value);
            // this.getCategoriesData();
        })
        // return await AsyncStorage.getItem('loggedInObject').then((value) => {
        //     
        //     

        // });
        AsyncStorage.setItem("screenName", "search");
    }
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    }


    getCategoriesData = async () => {
        // var loggedInData = await AsyncStorage.getItem('loggedInObject');

        this.props.getCategories(this.loggedInResponse.remember_token, i18n.locale,
            (data) => {
                this.setState({ data: data.success_data });
                this.setState({ arrayHolder: data.success_data });
                //console.log(data);
            },
            (error) => {
                console.log(error.data);
                this.refs.toast.show(i18n.t('somethingWrong'), DURATION.LENGTH_SHORT);
            });
    }
    getSearchedCategories = text => {
        this.props.getSearchedCategories(text, i18n.locale,
            (data) => {
                this.setState({ data: data.success_data });
                //console.log(data);
            },
            (error) => {
                console.log(error.data);
                this.refs.toast.show(i18n.t('somethingWrong'), DURATION.LENGTH_SHORT);
            });
    }
    renderPopup() {
        this.refs.logoutConfirmation.openModal();
        this.props.navigation.navigate('DrawerClose');
        this.props.setLogoutState(false, (data) => { });
    }
    render() {
        return (
            <View style={styles.container}>

                <LogoutConfirmation isOpen="false" ref="logoutConfirmation" {...this.props} />
                {this.props.isLoginPressed == true ? this.renderPopup() : null}

                <View style={styles.ImageParentView}>
                    <View style={styles.ImageUpperView}></View>
                    <View style={styles.ImageView}>
                        <Grid style={styles.hundredHeightWidth}>
                            <Col size={15} style={[styles.AllCenter]}>
                                <TouchableOpacity style={{ marginLeft: 15 }} onPress={() => {
                                    this.onBackPress();
                                }} hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                                    <Image source={require('../../../assets/images/back_arrow.png')} style={{ height: 25, width: 25 }} />
                                </TouchableOpacity>
                            </Col>
                            <Col size={60} style={styles.CenterStart}>
                                <Text style={styles.headerText}>{i18n.t("Search")}</Text>
                            </Col>
                            <Col size={15}>
                            </Col>
                        </Grid>
                    </View>
                </View>
                {/* <View style={styles.ImageParentView}>
                    <View style={styles.ImageUpperView}></View>
                    <View style={styles.ImageView}>
                        <TouchableOpacity style={{ marginLeft: 15 }} onPress={() => {
                            this.onBackPress();
                        }} hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                            <Image source={require('../../../assets/images/back_arrow.png')} style={{ height: 20, width: 20 }} />
                        </TouchableOpacity>
                        {this.state.fontLoaded ? <Text style={{ color: 'white', fontSize: 22, fontFamily: 'Quicksand-Medium' }}>{i18n.t('Search')}</Text> : null}
                        <View style={{ width: '10%', height: '100%' }}>
                        </View>
                    </View>
                </View> */}
                <Grid style={{ backgroundColor: '#fff' }}>
                    {/* <Row size={2.5}>
                        <Grid>
                            <Row size={3} style={{ backgroundColor: '#ffaa1a' }}></Row>
                            <Row size={9} style={{ backgroundColor: '#ffaa1a' }}>
                                <View style={{ width: '100%', height: RF(10), backgroundColor: '#ffaa1a', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                                    <TouchableOpacity style={{ width: '15%', height: '100%', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }} onPress={() => {
                                        this.props.navigation.navigate('dashBoard');
                                    }}>
                                        <Image source={require('../../../assets/images/back_arrow.png')} style={{ zIndex: 2, backgroundColor: 'rgba(255,255,255,0)', height: RF(3.3), width: RF(3.3), marginLeft: RF(2.2) }} />
                                    </TouchableOpacity>
                                    <View style={{ width: '70%', height: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                        {this.state.fontLoaded ?
                                            <Text style={{ fontFamily: 'Quicksand-Medium', color: '#fff', fontSize: RF(3.5) }}>Search</Text>
                                            : null}
                                    </View>
                                    <View style={{ width: '15%', height: '100%' }}></View>
                                </View>
                            </Row>
                        </Grid>
                    </Row> */}
                    <Row size={11.9} style={{ backgroundColor: '#fff' }}>
                        <Grid>
                            {/* <Row size={0.5}></Row> */}
                            <Row size={10}>
                                <Grid>
                                    <Col size={1}></Col>
                                    <Col size={8}>
                                        <Grid>
                                            <Row size={1}></Row>
                                            <Row size={2} style={{ backgroundColor: '#ffaa1a' }}>
                                                <View style={{ height: '100%', width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffaa1a' }}>
                                                    <Image source={require('../../../assets/images/icon_search.png')} style={{ marginLeft: RF(2), height: RF(3), width: RF(3) }}></Image>
                                                    <Input style={{ marginLeft: RF(1), fontSize: RF(3), fontFamily: 'Quicksand-Regular', color: '#fff' }} placeholder='Search Here'
                                                        onChangeText={text => {
                                                            this.state.thisLanguageCode != i18n.locale ? this.searchFilterAgain(text) : this.searchFilter(text)
                                                        }}
                                                    ></Input>
                                                </View>
                                            </Row>
                                            <Row size={1}></Row>
                                            <Row size={15}>
                                                <ScrollView style={{ height: '100%', width: '100%' }}>
                                                    {this.renderFlastListItems()}
                                                </ScrollView>
                                            </Row>
                                        </Grid>
                                    </Col>
                                    <Col size={1}></Col>
                                </Grid>
                            </Row>
                        </Grid>
                    </Row>
                </Grid>
                <Toast
                    ref="toast"
                    style={{ backgroundColor: '#000' }}
                    position='bottom'
                    positionValue={130}
                    fadeInDuration={750}
                    fadeOutDuration={1000}
                    opacity={0.8}
                    textStyle={{ color: '#fff' }}
                />
                <CustomeFooterTab ref="footer"{...this.props} />
            </View>
        );
    }
    // renderSearchBar = () => {
    //     return (
    //         <SearchBar containerStyle={{ backgroundColor: '#ffaa1a', borderWidth: 1, borderColor: '#ffaa1a', borderBottomColor: '#ffaa1a', borderTopColor: '#ffaa1a', height: RF(5), width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
    //             inputStyle={{ backgroundColor: '#ffaa1a', color: '#fff' }}
    //             placeholderTextColor={'#fff'}
    //             placeholder="Search Here"
    //             icon={{ color: '#fff' }}
    //             autoCorrect={false}
    //             onChangeText={text => this.searchFilter(text)}
    //         />
    //     );
    // };
    searchFilter = text => {
        //console.log(text);
        text = text.trim();
        if (text == "") {
            this.setState({
                data: []
            }, () => {
                return;
            });
        }
        else {
            this.getSearchedCategories(text);
        }
    }
    searchFilterAgain = text => {
        //console.log(text);
        this.setState({ thisLanguageCode: i18n.locale });
        text = text.trim();
        if (text == "") {
            this.setState({
                data: []
            }, () => {
                return;
            });
        }
        else {
            this.getSearchedCategories(text);
        }
    }
    renderFlastListItems = () => {
        if (this.state.data) {
            var rowData = [];
            for (let index = 0; index < this.state.data.length; index++) {
                const element = this.state.data[index];
                rowData.push(
                    <TouchableOpacity
                        onPress={() => { this.navigateTocategory(element) }}
                        style={{ width: '100%', flex: 1 }} key={'lstView' + index}>
                        <View style={{ borderBottomColor: '#e1e1e1', borderBottomWidth: 1, flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', marginTop: RF(1), paddingBottom: 3 }}>
                            {this.state.fontLoaded ? <Text style={styles.item}>{element.name}</Text> : null}
                            {this.state.fontLoaded ? <Text numberOfLines={3} style={styles.itemChild}>{element.description}</Text> : null}
                        </View>
                    </TouchableOpacity>

                );
            }
            return rowData;
        }
        else {
            return null;
        }
    }

    navigateTocategory(x) {
        //console.log("Selected cetegory", x, x.Data);
        this.props.navigation.navigate('categoriesDetailsNew', { data: x });
    }
    onBackPress() {
        this.props.navigation.navigate('dashBoard');
        return true;
    }


}
export default connect(mapStateToProps, mapDispatchToProps)(Search)