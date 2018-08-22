import React, { Component } from 'react';
import { ImageBackground, TouchableOpacity, FlatList, TouchableWithoutFeedback, BackHandler, Alert, AsyncStorage } from 'react-native';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView
} from 'react-native';
import Swiper from 'react-native-swiper';
import { COLOR, IPSERVER } from '../shared/config';
import { NavigationActions, StackActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import BubbleMenu from 'react-native-bubble-menu';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


export class DashboardPage extends React.Component {
    _didFocusSubscription;
    _willBlurSubscription;

    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this._didFocusSubscription = props.navigation.addListener('didFocus', payload =>
            BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
        );
        this.state = {
            idCrafter: '',
            show: false,
            sideMenu: false,
            statusMenu: 'profile',
            orderStatus: 'default',
            images: [
                'https://cdn.pixabay.com/photo/2016/04/28/00/28/shell-1357930_960_720.jpg',
                'https://cdn.pixabay.com/photo/2016/04/28/00/28/shell-1357930_960_720.jpg',
                'https://cdn.pixabay.com/photo/2016/04/28/00/28/shell-1357930_960_720.jpg',
                'https://cdn.pixabay.com/photo/2016/04/28/00/28/shell-1357930_960_720.jpg',
                'https://cdn.pixabay.com/photo/2016/04/28/00/28/shell-1357930_960_720.jpg',
                'https://cdn.pixabay.com/photo/2016/04/28/00/28/shell-1357930_960_720.jpg',
            ]
        };
    }

    componentDidMount() {
        this._willBlurSubscription = this.props.navigation.addListener('willBlur', payload =>
            BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
        );
        AsyncStorage.getItem('VMDDEVELOPER').then((value) => {
            console.log(JSON.parse(value), 'Json Parse');
            const dataLogin = JSON.parse(value);
            if (value) {
                this.setState({ idCrafter: dataLogin.crafterId });
            }
        });
    }

    componentWillUnmount() {
        this._didFocusSubscription && this._didFocusSubscription.remove();
        this._willBlurSubscription && this._willBlurSubscription.remove();
    }

    onBackButtonPressAndroid = () => {
        if (this.state.show === true) {
            this.disableSelectionMode();
            return true;
        } else {
            return false;
        }
    };

    disableSelectionMode() {
        this.setState(({ show }) => ({
            show: !show,
        }));
    }

    sideMenus = () => {
        this.setState({
            sideMenu: !this.state.sideMenu
        });
    }

    statusMenus = (value) => {
        console.log(value, 'Value')
        if (value === 'close') {
            this._toggleMenuVisibility();
        } else {
            this.setState({
                statusMenu: value
            })
        }
    }

    keyExtractor = (item) => item.id;

    OrderStatus = (value) => {
        console.log(value, 'Value')
        this.setState({
            orderStatus: value
        })
    }

    renderIdeaPhoto = (itemProduct, index) => {
        console.log(itemProduct, 'Item Dashboard');
        return (
            <View key={index}>
                <TouchableWithoutFeedback onPress={() => { }}>
                    <View style={{ borderRadius: 4, elevation: 2, marginRight: 2, height: 110, flex: 1, marginTop: 10 }}>
                        <Image
                            style={styles.item}
                            source={{ uri: `${itemProduct}` }}
                            resizeMode='contain'
                        />
                    </View>
                </TouchableWithoutFeedback>
            </View>
        )
    }

    _toggleMenuVisibility = () => {
        this.setState(({ show }) => ({
            show: !show,
        }));
    }

    _renderOpenBtn = () => (
        <View style={styles.menuOpenBtn}>
            <TouchableOpacity
                onPress={this._toggleMenuVisibility}
            >
                {
                    this.state.show === true ?
                        <View />
                        :
                        <Image
                            style={{ width: 25, height: 25 }}
                            source={require('./../assets/images/sidemenu/menu.png')}
                            resizeMode='contain'
                        />
                }
            </TouchableOpacity>
        </View>
    )

    _renderItems = () => {
        const { statusMenu } = this.state;
        const icons = [
            {
                name1: require('./../assets/images/sidemenu/profil-disable.png'),
                name2: require('./../assets/images/sidemenu/profil-enable.png'),
                action: 'profile'
            },
            {
                name3: require('./../assets/images/sidemenu/order-disable.png'),
                name4: require('./../assets/images/sidemenu/order-enable.png'),
                action: 'order'
            },
            {
                name5: require('./../assets/images/sidemenu/menu.png'),
                name6: require('./../assets/images/sidemenu/menu.png'),
                action: 'close',
            },
            {
                name7: require('./../assets/images/sidemenu/crafter-list-disable.png'),
                name8: require('./../assets/images/sidemenu/crafter-list-enable.png'),
                action: 'crafterList',
            },
            {
                name9: require('./../assets/images/sidemenu/crafter-menu-disable.png'),
                name10: require('./../assets/images/sidemenu/crafter-menu-enable.png'),
                action: 'crafterMenu',
            }
        ];

        const items = icons.map(({ name1, name2, name3, name4, name5, name6, name7, name8, name9, name10, action }, index) => (
            <View style={styles.menuGeneralIcons} key={action}>
                <TouchableOpacity
                    onPress={() => this.statusMenus(action)}
                >
                    {
                        statusMenu === 'profile' ?
                            <Image
                                style={{ width: 25, height: 25 }}
                                source={name2}
                                resizeMode='contain'
                            />
                            :
                            <Image
                                style={{ width: 25, height: 25 }}
                                source={name1}
                                resizeMode='contain'
                            />
                    }
                    {
                        statusMenu === 'order' ?
                            <Image
                                style={{ width: 25, height: 25 }}
                                source={name4}
                                resizeMode='contain'
                            />
                            :
                            <Image
                                style={{ width: 25, height: 25 }}
                                source={name3}
                                resizeMode='contain'
                            />
                    }
                    {
                        statusMenu ?
                            <Image
                                style={{ width: 25, height: 25 }}
                                source={name6}
                            // resizeMode='contain'
                            />
                            :
                            <Image
                                style={{ width: 25, height: 25 }}
                                source={name5}
                            // resizeMode='contain'
                            />
                    }
                    {
                        statusMenu === 'crafterList' ?
                            <Image
                                style={{ width: 25, height: 25 }}
                                source={name8}
                                resizeMode='contain'
                            />
                            :
                            <Image
                                style={{ width: 25, height: 25 }}
                                source={name7}
                                resizeMode='contain'
                            />
                    }
                    {
                        statusMenu === 'crafterMenu' ?
                            <Image
                                style={{ width: 25, height: 25 }}
                                source={name10}
                                resizeMode='contain'
                            />
                            :
                            <Image
                                style={{ width: 25, height: 25 }}
                                source={name9}
                                resizeMode='contain'
                            />
                    }
                </TouchableOpacity>
            </View>
        ));
        return items;
    }

    render() {
        const { statusMenu, orderStatus, show, idCrafter } = this.state;
        return (
            <View style={{ flex: 1, backgroundColor: '#384058', alignItems: 'center' }}>
                <ImageBackground
                    source={require('./../assets/images/back_home.png')}
                    style={styles.backgroundStyle}
                >
                    <ScrollView>

                        <View style={styles.container}>
                            <View style={styles.containerSlide}>
                                <Swiper
                                    style={styles.wrapper}
                                    autoplay
                                    dot={<View style={styles.formatSwiper} />}
                                >
                                    <View style={styles.slide}>
                                        <Image
                                            style={styles.imageStyle}
                                            source={require('./../assets/images/swiperFirst.png')}
                                            resizeMode='cover'
                                        />
                                    </View>
                                    <View style={styles.slide}>
                                        <Image
                                            style={styles.imageStyle}
                                            source={require('./../assets/images/swiperSecond.png')}
                                            resizeMode='cover'
                                        />
                                    </View>
                                    <View style={styles.slide}>
                                        <Image
                                            style={styles.imageStyle}
                                            source={require('./../assets/images/swiperThird.png')}
                                            resizeMode='cover'
                                        />
                                    </View>
                                    <View style={styles.slide}>
                                        <Image
                                            style={styles.imageStyle}
                                            source={require('./../assets/images/swiperFour.png')}
                                            resizeMode='cover'
                                        />
                                    </View>
                                    <View style={styles.slide}>
                                        <Image
                                            style={styles.imageStyle}
                                            source={require('./../assets/images/swiperFive.png')}
                                            resizeMode='cover'
                                        />
                                    </View>
                                </Swiper>
                            </View>


                            <View style={styles.containerDashboard}>
                                <Swiper
                                    style={styles.wrapper}
                                    showsPagination={false}
                                    showsButtons={false}
                                    dot={<View style={styles.formatSwiper} />}
                                >
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={styles.containerInsideProfileOne}>
                                            <View style={styles.containerPhoto}>
                                                <View>
                                                    <TouchableOpacity
                                                        onPress={() => this.props.navigation.navigate('ProfilePage')}>
                                                        <Image
                                                            style={styles.profileImage}
                                                            source={require('./../assets/images/profile.png')}
                                                        />
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>

                                        <View style={styles.containerInsideProfileTwo}>
                                            <View style={styles.containerUp}>
                                                <View style={{ marginLeft: 10, marginTop: 15 }}>
                                                    <Text style={{ color: 'grey', fontSize: 13, fontFamily: 'Quicksand-Bold' }}>Hi, Welcome!</Text>
                                                    <Text style={{ color: 'white', fontFamily: 'Quicksand-Bold', fontSize: 15 }}>Gal Gadot</Text>
                                                </View>
                                            </View>

                                            <View style={styles.containerMiddleProfileTwo}>
                                                <View style={{ marginLeft: 10, marginTop: 5 }}>
                                                    <View style={{ flex: 1 }}>
                                                        <Image
                                                            style={styles.icons}
                                                            source={require('./../assets/images/ic_wallet.png')}
                                                        />
                                                    </View>
                                                    <View style={{ flex: 1 }}>
                                                        <Text style={{ color: 'grey', marginTop: 2, paddingLeft: 35, fontSize: 12, fontFamily: 'Quicksand-Regular' }}>Total Apresiasi Design Anda</Text>
                                                        <Text style={{ color: 'grey', marginTop: 1, paddingLeft: 35, fontSize: 15, color: 'white' }}>Rp. 250.000</Text>
                                                    </View>
                                                </View>

                                            </View>

                                            <View style={styles.containerBottomProfileTwo}>
                                                <View style={{ marginLeft: 10, marginTop: 7 }}>
                                                    <View style={{ flex: 1 }}>
                                                        <Image
                                                            style={styles.icons}
                                                            source={require('./../assets/images/ic_design.png')}
                                                        />
                                                    </View>
                                                    <View style={{ flex: 1 }}>
                                                        <Text style={{ color: 'grey', marginTop: 2, paddingLeft: 35, fontSize: 12, fontFamily: 'Quicksand-Regular' }}>Total Design Anda</Text>
                                                        <Text style={{ color: 'grey', marginTop: 1, paddingLeft: 35, fontSize: 15, color: 'white', fontFamily: 'Quicksand-Regular' }}>3 Design</Text>
                                                    </View>
                                                </View>
                                            </View>


                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={styles.containerInsideProfileOne}>
                                            <View style={styles.containerPhoto}>
                                                <View>
                                                    <TouchableOpacity style={styles.button}
                                                        onPress={() => this.props.navigation.navigate('ProfileCrafter')}>
                                                        <Image
                                                            style={styles.profileImage}
                                                            source={require('./../assets/images/yukikato.jpg')}
                                                        />
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>

                                        <View style={styles.containerInsideProfileTwo}>
                                            <View style={styles.containerUp}>
                                                <View style={{ marginLeft: 10, marginTop: 15 }}>
                                                    <Text style={{ color: 'grey', fontSize: 13, fontFamily: 'Quicksand-Regular' }}>Hi, Welcome!</Text>
                                                    <Text style={{ color: 'white', fontFamily: 'Quicksand-Regular', fontWeight: 'bold', fontSize: 15 }}>Yuki Kato</Text>
                                                </View>
                                            </View>

                                            <View style={styles.containerMiddleProfileTwo}>
                                                <View style={{ marginLeft: 10, marginTop: 5 }}>
                                                    <View style={{ flex: 1 }}>
                                                        <Image
                                                            style={styles.icons}
                                                            source={require('./../assets/images/ic_wallet.png')}
                                                        />
                                                    </View>
                                                    <View style={{ flex: 1 }}>
                                                        <Text style={{ color: 'grey', marginTop: 2, paddingLeft: 35, fontSize: 12 }}>Total Apresiasi Design Anda</Text>
                                                        <Text style={{ color: 'grey', marginTop: 1, paddingLeft: 35, fontSize: 15, color: 'white' }}>Rp. 250.000</Text>
                                                    </View>
                                                </View>

                                            </View>

                                            <View style={styles.containerBottomProfileTwo}>
                                                <View style={{ marginLeft: 10, marginTop: 7 }}>
                                                    <View style={{ flex: 1 }}>
                                                        <Image
                                                            style={styles.icons}
                                                            source={require('./../assets/images/ic_design.png')}
                                                        />
                                                    </View>
                                                    <View style={{ flex: 1 }}>
                                                        <Text style={{ color: 'grey', marginTop: 2, paddingLeft: 35, fontSize: 12, fontFamily: 'Quicksand-Bold' }}>Total Design Anda</Text>
                                                        <Text style={{ color: 'grey', marginTop: 1, paddingLeft: 35, fontSize: 15, color: 'white', fontFamily: 'Quicksand-Regular' }}>3 Design</Text>
                                                    </View>
                                                </View>
                                            </View>


                                        </View>
                                    </View>

                                </Swiper>
                            </View>
                            <View style={styles.containerUploadIdea}>
                                <View style={{ flex: 1, flexDirection: 'row', }}>
                                    <View style={{ flexDirection: 'column', marginTop: 10, marginLeft: 20, }}>
                                        <Text style={{ color: 'white', fontSize: 15, fontFamily: 'Quicksand-Bold' }}>Idea Recently Upload</Text>
                                        <Text style={{ color: 'grey', fontSize: 13, fontFamily: 'Quicksand-Regular' }}>Checkout our friend new brilliant ideas</Text>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                                        <TouchableOpacity
                                            onPress={() => this.props.navigation.navigate('IdeaMarket')}
                                        >
                                            <Text
                                                style={{
                                                    color: 'red', flex: 1, fontFamily: 'Quicksand-Regular', fontSize: 13, paddingTop: 10, paddingRight: 17
                                                }}
                                            >See all</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={{ flex: 1, marginLeft: 20, paddingRight: 7, marginRight: 10, marginTop: -85 }}>
                                    <FlatList
                                        data={this.state.images}
                                        horizontal
                                        renderItem={({ item, index }) => this.renderIdeaPhoto(item, index)}
                                        showsHorizontalScrollIndicator={false}
                                        extraData={this.state}
                                    />
                                </View>
                            </View>
                        </View>
                    </ScrollView>

                    {
                        show === true ?
                            <View style={{ width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.98)', position: 'absolute' }}>
                                {
                                    statusMenu === 'profile' ?
                                        <View style={{ flex: 1, flexDirection: 'column' }}>
                                            <View style={{ padding: 15, height: 100 }}>
                                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                                        <TouchableWithoutFeedback
                                                            onPress={() => {
                                                                this.props.navigation.navigate('CrafterMyOrder');
                                                                this.setState(({ show }) => ({
                                                                    show: !show,
                                                                }));
                                                            }}>
                                                            <Image style={{ width: 50, height: 50 }}
                                                                source={require('./../assets/images/sidemenu/page-sidemenu/daftar-pesanan.png')}
                                                            />
                                                        </TouchableWithoutFeedback>
                                                    </View>
                                                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                                        <TouchableWithoutFeedback
                                                            onPress={() => {
                                                                this.props.navigation.navigate('NotificationMenu');
                                                                this.setState(({ show }) => ({
                                                                    show: !show,
                                                                }));
                                                            }}>
                                                            <Image style={{ width: 50, height: 50 }}
                                                                source={require('./../assets/images/sidemenu/page-sidemenu/notifikasi.png')}
                                                            />
                                                        </TouchableWithoutFeedback>
                                                    </View>
                                                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                                        <TouchableWithoutFeedback
                                                            onPress={() => {
                                                                this.props.navigation.navigate('SettingMenu');
                                                                this.setState(({ show }) => ({
                                                                    show: !show,
                                                                }));
                                                            }}>
                                                            <Image style={{ width: 50, height: 50 }}
                                                                source={require('./../assets/images/sidemenu/page-sidemenu/setting.png')}
                                                            />
                                                        </TouchableWithoutFeedback>
                                                    </View>
                                                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                                        <TouchableWithoutFeedback
                                                            onPress={() => {
                                                                this.props.navigation.navigate('HelpMenu');
                                                                this.setState(({ show }) => ({
                                                                    show: !show,
                                                                }));
                                                            }}>
                                                            <Image style={{ width: 50, height: 50 }}
                                                                source={require('./../assets/images/sidemenu/page-sidemenu/bantuan.png')}
                                                            />
                                                        </TouchableWithoutFeedback>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={{ flex: 1, flexDirection: 'column' }}>
                                                <View style={{ height: 50, justifyContent: 'center', alignItems: 'center' }}>
                                                    <Text style={{ fontFamily: 'Quicksand-Regular', fontSize: 20, color: 'white', textAlign: 'center' }}>GAL GADOT </Text>
                                                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                        <Image
                                                            style={{ width: 10, height: 10 }}
                                                            source={require('./../assets/images/location_icon.png')}
                                                            resizeMode='contain'
                                                        />
                                                        <Text style={{ fontFamily: 'Quicksand-Regular', fontSize: 13, color: 'white', textAlign: 'center', marginLeft: 3 }}>DKI Jakarta</Text>
                                                    </View>
                                                </View>
                                                <View style={{ height: 200, justifyContent: 'center', alignItems: 'center' }}>
                                                    <TouchableWithoutFeedback
                                                        onPress={() => {
                                                            this.props.navigation.navigate('ProfilePage');
                                                            this.setState(({ show }) => ({
                                                                show: !show,
                                                            }));
                                                        }}
                                                    >
                                                        <Image
                                                            style={{ width: 170, height: 170, borderRadius: 100 }}
                                                            source={require('./../assets/images/profile.png')}
                                                        />
                                                    </TouchableWithoutFeedback>
                                                </View>
                                                <View style={{ height: 107, justifyContent: 'center', alignItems: 'center' }}>
                                                    <Text style={{ fontSize: 20, fontFamily: 'Quicksand-Bold', textAlign: 'center', color: 'white' }} >PROFIL</Text>
                                                    <Text style={{ fontSize: 13, fontFamily: 'Quicksand-Regular', textAlign: 'center', color: 'white', paddingTop: 10 }} >Lihat dan atur segala informasi</Text>
                                                    <Text style={{ fontSize: 13, fontFamily: 'Quicksand-Regular', textAlign: 'center', color: 'white' }} >profil anda disini</Text>
                                                </View>
                                                <View style={{ height: 203 }}>
                                                    <View style={{ height: 142, flexDirection: 'row' }}>
                                                        <View style={{ height: 75, width: '50%', justifyContent: 'center', alignItems: 'center' }}>
                                                            <TouchableOpacity
                                                                onPress={() => {
                                                                    this.props.navigation.navigate('ProfilePage');
                                                                    this.setState(({ show }) => ({
                                                                        show: !show,
                                                                    }));
                                                                }}
                                                            >
                                                                <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                                                    <Image
                                                                        style={{ width: 40, height: 40 }}
                                                                        source={require('./../assets/images/sidemenu/page-sidemenu/menu-profile/edit_profile.png')}
                                                                    />
                                                                    <Text style={{ marginTop: 8, textAlign: 'center', color: 'white', fontFamily: 'Quicksand-Regular', fontSize: 15 }}>Edit Profile</Text>
                                                                </View>
                                                            </TouchableOpacity>
                                                        </View>
                                                        <View style={{ height: 75, width: '50%', justifyContent: 'center', alignItems: 'center' }}>
                                                            <TouchableOpacity
                                                                onPress={() => {
                                                                    this.setState(({ show }) => ({
                                                                        show: !show,
                                                                    }), () => {
                                                                        AsyncStorage.removeItem('VMDDEVELOPER', (result) => {
                                                                            console.log(result, 'Logout');
                                                                            const resetAction = StackActions.reset({
                                                                                index: 0,
                                                                                actions: [NavigationActions.navigate({ routeName: 'MenuLogin' })],
                                                                            });
                                                                            this.props.navigation.dispatch(resetAction);
                                                                        });
                                                                    });
                                                                }}
                                                            >
                                                                <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                                                    <Image
                                                                        style={{ width: 40, height: 40 }}
                                                                        source={require('./../assets/images/sidemenu/page-sidemenu/menu-profile/logout.png')}
                                                                        resizeMode='contain'
                                                                    />
                                                                    <Text style={{ marginTop: 8, textAlign: 'center', color: 'white', fontFamily: 'Quicksand-Regular', fontSize: 15 }}>Log Out</Text>
                                                                </View>
                                                            </TouchableOpacity>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                        :
                                        <View style={{ flex: 1 }}>
                                            {
                                                statusMenu === 'order' ?
                                                    <View style={{ flex: 1, flexDirection: 'column' }}>
                                                        <View style={{ padding: 15, height: 100 }}>
                                                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                                                    <TouchableWithoutFeedback
                                                                        onPress={() => {
                                                                            this.props.navigation.navigate('CrafterMyOrder');
                                                                            this.setState(({ show }) => ({
                                                                                show: !show,
                                                                            }));
                                                                        }}
                                                                    >
                                                                        <Image style={{ width: 50, height: 50 }}
                                                                            source={require('./../assets/images/sidemenu/page-sidemenu/daftar-pesanan.png')}
                                                                        />
                                                                    </TouchableWithoutFeedback>
                                                                </View>
                                                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                                                    <TouchableWithoutFeedback
                                                                        onPress={() => {
                                                                            this.props.navigation.navigate('NotificationMenu');
                                                                            this.setState(({ show }) => ({
                                                                                show: !show,
                                                                            }));
                                                                        }}
                                                                    >
                                                                        <Image style={{ width: 50, height: 50 }}
                                                                            source={require('./../assets/images/sidemenu/page-sidemenu/notifikasi.png')}
                                                                        />
                                                                    </TouchableWithoutFeedback>
                                                                </View>
                                                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                                                    <TouchableWithoutFeedback
                                                                        onPress={() => {
                                                                            this.props.navigation.navigate('SettingMenu');
                                                                            this.setState(({ show }) => ({
                                                                                show: !show,
                                                                            }));
                                                                        }}
                                                                    >
                                                                        <Image style={{ width: 50, height: 50 }}
                                                                            source={require('./../assets/images/sidemenu/page-sidemenu/setting.png')}
                                                                        />
                                                                    </TouchableWithoutFeedback>
                                                                </View>
                                                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                                                    <TouchableWithoutFeedback
                                                                        onPress={() => {
                                                                            this.props.navigation.navigate('HelpMenu');
                                                                            this.setState(({ show }) => ({
                                                                                show: !show,
                                                                            }));
                                                                        }}
                                                                    >
                                                                        <Image style={{ width: 50, height: 50 }}
                                                                            source={require('./../assets/images/sidemenu/page-sidemenu/bantuan.png')}
                                                                        />
                                                                    </TouchableWithoutFeedback>
                                                                </View>
                                                            </View>
                                                        </View>
                                                        {
                                                            orderStatus === 'default' ?
                                                                <View style={{ flex: 1 }}>
                                                                    <View style={{ height: 200, flexDirection: 'row' }}>
                                                                        <View style={{ width: '50%', justifyContent: 'center', alignItems: 'center' }}>
                                                                            <Image
                                                                                style={{ height: 200, width: 200 }}
                                                                                source={require('./../assets/images/sidemenu/page-sidemenu/menu-order/order_default.png')}
                                                                            />
                                                                        </View>
                                                                        <View style={{ width: wp('50%'), flexDirection: 'column', paddingTop: 10, paddingRight: 10 }}>
                                                                            <Text style={{ color: 'white', fontSize: 20, fontFamily: 'Quicksand-Bold', textAlign: 'left' }}>ORDER</Text>
                                                                            <Text style={{ color: 'white', fontSize: 15, textAlign: 'left', fontFamily: 'Quicksand-Regular', paddingTop: 5 }}>Penuhi keinginan mu sekarang juga dengan 3 fitur yang akan membuat kreasimu menjadi nyata</Text>
                                                                        </View>
                                                                    </View>
                                                                    <View style={{ flex: 1, flexDirection: 'column', paddingLeft: 13, paddingRight: 13 }}>
                                                                        <View style={{ marginTop: 20, borderWidth: 1, borderColor: 'white' }} />
                                                                        <TouchableOpacity
                                                                            onPress={() => this.OrderStatus('custom')}
                                                                        >
                                                                            <View style={{ height: 60, justifyContent: 'center', alignItems: 'center' }}>
                                                                                <Text style={{ color: 'white', fontSize: 15, fontFamily: 'Quicksand-Bold', textAlign: 'center' }}>Custom</Text>
                                                                            </View>
                                                                        </TouchableOpacity>
                                                                        <View style={{ borderWidth: 1, borderColor: 'white' }} />
                                                                        <TouchableOpacity
                                                                            onPress={() => this.OrderStatus('capture-get')}
                                                                        >
                                                                            <View style={{ height: 60, justifyContent: 'center', alignItems: 'center' }}>
                                                                                <Text style={{ color: 'white', fontSize: 15, fontFamily: 'Quicksand-Bold', textAlign: 'center' }}>Capture n' Get</Text>
                                                                            </View>
                                                                        </TouchableOpacity>
                                                                        <View style={{ borderWidth: 1, borderColor: 'white' }} />
                                                                        <TouchableOpacity
                                                                            onPress={() => this.OrderStatus('idea-market')}
                                                                        >
                                                                            <View style={{ height: 60, justifyContent: 'center', alignItems: 'center' }}>
                                                                                <Text style={{ color: 'white', fontSize: 15, fontFamily: 'Quicksand-Bold', textAlign: 'center' }}>Idea Market</Text>
                                                                            </View>
                                                                        </TouchableOpacity>
                                                                        <View style={{ borderWidth: 1, borderColor: 'white' }} />
                                                                    </View>
                                                                </View>
                                                                :
                                                                <View />
                                                        }
                                                        {
                                                            orderStatus === 'custom' ?
                                                                <View style={{ flex: 1 }}>
                                                                    <View style={{ height: hp('31.3%'), flexDirection: 'row' }}>
                                                                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                                                            <Image
                                                                                style={{ height: 200, width: 200 }}
                                                                                source={require('./../assets/images/sidemenu/page-sidemenu/menu-order/order_custom.png')}
                                                                            />
                                                                        </View>
                                                                        <View style={{ flex: 1, flexDirection: 'column', paddingRight: 5, paddingTop: 7 }}>
                                                                            <View style={{ flex: 1 }}>
                                                                                <Text style={{ color: 'white', fontSize: 20, fontFamily: 'Quicksand-Bold', textAlign: 'left' }}>CUSTOM</Text>
                                                                                <Text style={{ color: 'white', fontSize: 15, textAlign: 'left', fontFamily: 'Quicksand-Regular', paddingTop: 5 }}>Dengan imajinasimu dan fitur ini kamu bisa dapatkan hasil desainmu sendiri</Text>
                                                                            </View>
                                                                            <View style={{ flex: 1, marginTop: hp('11%') }}>
                                                                                <TouchableOpacity
                                                                                    style={{
                                                                                        backgroundColor: '#ef1c25',
                                                                                        borderRadius: 20,
                                                                                        height: 45
                                                                                    }}
                                                                                    onPress={() => {
                                                                                        this.props.navigation.navigate('Order');
                                                                                        this.setState(({ show }) => ({
                                                                                            show: !show,
                                                                                        }));
                                                                                    }}>
                                                                                    <Text style={{ marginTop: 13, textAlign: 'center', color: 'white', fontSize: 15, fontFamily: 'Quicksand-Bold' }}>GO</Text>
                                                                                </TouchableOpacity>
                                                                            </View>
                                                                        </View>
                                                                    </View>
                                                                    <View style={{ flex: 1, flexDirection: 'column', paddingLeft: 13, paddingRight: 13 }}>
                                                                        <View style={{ marginTop: 20, borderWidth: 1, borderColor: 'white' }} />
                                                                        <TouchableOpacity
                                                                            onPress={() => this.OrderStatus('custom')}
                                                                        >
                                                                            <View style={{ height: 60, justifyContent: 'center', alignItems: 'center' }}>
                                                                                <Text style={{ color: 'white', fontSize: 15, fontFamily: 'Quicksand-Bold', textAlign: 'center' }}>Custom</Text>
                                                                            </View>
                                                                        </TouchableOpacity>
                                                                        <View style={{ borderWidth: 1, borderColor: 'white' }} />
                                                                        <TouchableOpacity
                                                                            onPress={() => this.OrderStatus('capture-get')}
                                                                        >
                                                                            <View style={{ height: 60, justifyContent: 'center', alignItems: 'center' }}>
                                                                                <Text style={{ color: 'white', fontSize: 15, fontFamily: 'Quicksand-Bold', textAlign: 'center' }}>Capture n' Get</Text>
                                                                            </View>
                                                                        </TouchableOpacity>
                                                                        <View style={{ borderWidth: 1, borderColor: 'white' }} />
                                                                        <TouchableOpacity
                                                                            onPress={() => this.OrderStatus('idea-market')}
                                                                        >
                                                                            <View style={{ height: 60, justifyContent: 'center', alignItems: 'center' }}>
                                                                                <Text style={{ color: 'white', fontSize: 15, fontFamily: 'Quicksand-Bold', textAlign: 'center' }}>Idea Market</Text>
                                                                            </View>
                                                                        </TouchableOpacity>
                                                                        <View style={{ borderWidth: 1, borderColor: 'white' }} />
                                                                    </View>
                                                                </View>
                                                                :
                                                                <View />
                                                        }
                                                        {
                                                            orderStatus === 'capture-get' ?
                                                                <View style={{ flex: 1 }}>
                                                                    <View style={{ height: hp('31.3%'), flexDirection: 'row' }}>
                                                                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                                                            <Image
                                                                                style={{ height: 200, width: 200 }}
                                                                                source={require('./../assets/images/sidemenu/page-sidemenu/menu-order/order_capture.png')}
                                                                            />
                                                                        </View>
                                                                        <View style={{ flex: 1, flexDirection: 'column', paddingTop: 7, paddingRight: 5 }}>
                                                                            <View style={{ flex: 1 }}>
                                                                                <Text style={{ color: 'white', fontSize: 20, fontFamily: 'Quicksand-Bold', textAlign: 'left' }}>CAPTURE N' GET</Text>
                                                                                <Text style={{ color: 'white', fontSize: 15, textAlign: 'left', fontFamily: 'Quicksand-Regular', paddingTop: 5 }}>Cari produk hanya dengan mengupload foto, kamu bisa dapetin produk itu</Text>
                                                                            </View>
                                                                            <View style={{ flex: 1, marginTop: hp('11%') }}>
                                                                                <TouchableOpacity
                                                                                    style={{
                                                                                        backgroundColor: '#ef1c25',
                                                                                        borderRadius: 20,
                                                                                        height: 45
                                                                                    }}
                                                                                    onPress={() => {
                                                                                        this.props.navigation.navigate('Captureandget');
                                                                                        this.setState(({ show }) => ({
                                                                                            show: !show,
                                                                                        }));
                                                                                    }}>
                                                                                    <Text style={{ marginTop: 13, textAlign: 'center', color: 'white', fontSize: 15, fontFamily: 'Quicksand-Bold' }}>GO</Text>
                                                                                </TouchableOpacity>
                                                                            </View>
                                                                        </View>
                                                                    </View>
                                                                    <View style={{ flex: 1, flexDirection: 'column', paddingLeft: 13, paddingRight: 13 }}>
                                                                        <View style={{ marginTop: 20, borderWidth: 1, borderColor: 'white' }} />
                                                                        <TouchableOpacity
                                                                            onPress={() => this.OrderStatus('custom')}
                                                                        >
                                                                            <View style={{ height: 60, justifyContent: 'center', alignItems: 'center' }}>
                                                                                <Text style={{ color: 'white', fontSize: 15, fontFamily: 'Quicksand-Bold', textAlign: 'center' }}>Custom</Text>
                                                                            </View>
                                                                        </TouchableOpacity>
                                                                        <View style={{ borderWidth: 1, borderColor: 'white' }} />
                                                                        <TouchableOpacity
                                                                            onPress={() => this.OrderStatus('capture-get')}
                                                                        >
                                                                            <View style={{ height: 60, justifyContent: 'center', alignItems: 'center' }}>
                                                                                <Text style={{ color: 'white', fontSize: 15, fontFamily: 'Quicksand-Bold', textAlign: 'center' }}>Capture n' Get</Text>
                                                                            </View>
                                                                        </TouchableOpacity>
                                                                        <View style={{ borderWidth: 1, borderColor: 'white' }} />
                                                                        <TouchableOpacity
                                                                            onPress={() => this.OrderStatus('idea-market')}
                                                                        >
                                                                            <View style={{ height: 60, justifyContent: 'center', alignItems: 'center' }}>
                                                                                <Text style={{ color: 'white', fontSize: 15, fontFamily: 'Quicksand-Bold', textAlign: 'center' }}>Idea Market</Text>
                                                                            </View>
                                                                        </TouchableOpacity>
                                                                        <View style={{ borderWidth: 1, borderColor: 'white' }} />
                                                                    </View>
                                                                </View>
                                                                :
                                                                <View />
                                                        }
                                                        {
                                                            orderStatus === 'idea-market' ?
                                                                <View style={{ flex: 1 }}>
                                                                    <View style={{ height: hp('31.3%'), flexDirection: 'row' }}>
                                                                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                                                            <Image
                                                                                style={{ height: 200, width: 200 }}
                                                                                source={require('./../assets/images/sidemenu/page-sidemenu/menu-order/order_idea.png')}
                                                                            />
                                                                        </View>
                                                                        <View style={{ flex: 1, flexDirection: 'column', paddingTop: 7, paddingRight: 5}}>
                                                                            <View style={{ flex: 1 }}>
                                                                                <Text style={{ color: 'white', fontSize: 20, fontFamily: 'Quicksand-Bold', textAlign: 'left' }}>IDEA MARKET</Text>
                                                                                <Text style={{ color: 'white', fontSize: 15, textAlign: 'left', fontFamily: 'Quicksand-Regular', paddingTop: 5 }}>Disini kamu bisa lihat hasil karya unik dan menarik teman-teman mu dan kamu bisa membelinya loh!</Text>
                                                                            </View>
                                                                            <View style={{ flex: 1, marginTop: hp('11%') }}>
                                                                                <TouchableOpacity
                                                                                    style={{
                                                                                        backgroundColor: '#ef1c25',
                                                                                        borderRadius: 20,
                                                                                        height: 45
                                                                                    }}
                                                                                    onPress={() => {
                                                                                        this.props.navigation.navigate('IdeaMarket');
                                                                                        this.setState(({ show }) => ({
                                                                                            show: !show,
                                                                                        }));
                                                                                    }}>
                                                                                    <Text style={{ marginTop: 13, textAlign: 'center', color: 'white', fontSize: 15, fontFamily: 'Quicksand-Bold' }}>GO</Text>
                                                                                </TouchableOpacity>
                                                                            </View>
                                                                        </View>
                                                                    </View>
                                                                    <View style={{ flex: 1, flexDirection: 'column', paddingLeft: 13, paddingRight: 13 }}>
                                                                        <View style={{ marginTop: 20, borderWidth: 1, borderColor: 'white' }} />
                                                                        <TouchableOpacity
                                                                            onPress={() => this.OrderStatus('custom')}
                                                                        >
                                                                            <View style={{ height: 60, justifyContent: 'center', alignItems: 'center' }}>
                                                                                <Text style={{ color: 'white', fontSize: 15, fontFamily: 'Quicksand-Bold', textAlign: 'center' }}>Custom</Text>
                                                                            </View>
                                                                        </TouchableOpacity>
                                                                        <View style={{ borderWidth: 1, borderColor: 'white' }} />
                                                                        <TouchableOpacity
                                                                            onPress={() => this.OrderStatus('capture-get')}
                                                                        >
                                                                            <View style={{ height: 60, justifyContent: 'center', alignItems: 'center' }}>
                                                                                <Text style={{ color: 'white', fontSize: 15, fontFamily: 'Quicksand-Bold', textAlign: 'center' }}>Capture n' Get</Text>
                                                                            </View>
                                                                        </TouchableOpacity>
                                                                        <View style={{ borderWidth: 1, borderColor: 'white' }} />
                                                                        <TouchableOpacity
                                                                            onPress={() => this.OrderStatus('idea-market')}
                                                                        >
                                                                            <View style={{ height: 60, justifyContent: 'center', alignItems: 'center' }}>
                                                                                <Text style={{ color: 'white', fontSize: 15, fontFamily: 'Quicksand-Bold', textAlign: 'center' }}>Idea Market</Text>
                                                                            </View>
                                                                        </TouchableOpacity>
                                                                        <View style={{ borderWidth: 1, borderColor: 'white' }} />
                                                                    </View>
                                                                </View>
                                                                :
                                                                <View />
                                                        }
                                                    </View>
                                                    :
                                                    <View style={{ flex: 1 }}>
                                                        {
                                                            statusMenu === 'crafterList' ?
                                                                <View style={{ flex: 1, flexDirection: 'column' }}>
                                                                    <View style={{ padding: 15, height: 100 }}>
                                                                        <View style={{ flex: 1, flexDirection: 'row' }}>
                                                                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                                                                <TouchableWithoutFeedback
                                                                                    onPress={() => {
                                                                                        this.props.navigation.navigate('CrafterMyOrder');
                                                                                        this.setState(({ show }) => ({
                                                                                            show: !show,
                                                                                        }));
                                                                                    }}
                                                                                >
                                                                                    <Image style={{ width: 50, height: 50 }}
                                                                                        source={require('./../assets/images/sidemenu/page-sidemenu/daftar-pesanan.png')}
                                                                                    />
                                                                                </TouchableWithoutFeedback>
                                                                            </View>
                                                                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                                                                <TouchableWithoutFeedback
                                                                                    onPress={() => {
                                                                                        this.props.navigation.navigate('NotificationMenu');
                                                                                        this.setState(({ show }) => ({
                                                                                            show: !show,
                                                                                        }));
                                                                                    }}
                                                                                >
                                                                                    <Image style={{ width: 50, height: 50 }}
                                                                                        source={require('./../assets/images/sidemenu/page-sidemenu/notifikasi.png')}
                                                                                    />
                                                                                </TouchableWithoutFeedback>
                                                                            </View>
                                                                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                                                                <TouchableWithoutFeedback
                                                                                    onPress={() => {
                                                                                        this.props.navigation.navigate('SettingMenu');
                                                                                        this.setState(({ show }) => ({
                                                                                            show: !show,
                                                                                        }));
                                                                                    }}
                                                                                >
                                                                                    <Image style={{ width: 50, height: 50 }}
                                                                                        source={require('./../assets/images/sidemenu/page-sidemenu/setting.png')}
                                                                                    />
                                                                                </TouchableWithoutFeedback>
                                                                            </View>
                                                                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                                                                <TouchableWithoutFeedback
                                                                                    onPress={() => {
                                                                                        this.props.navigation.navigate('HelpMenu');
                                                                                        this.setState(({ show }) => ({
                                                                                            show: !show,
                                                                                        }));
                                                                                    }}
                                                                                >
                                                                                    <Image style={{ width: 50, height: 50 }}
                                                                                        source={require('./../assets/images/sidemenu/page-sidemenu/bantuan.png')}
                                                                                    />
                                                                                </TouchableWithoutFeedback>
                                                                            </View>
                                                                        </View>
                                                                    </View>
                                                                    <View style={{ height: 200 }}>
                                                                        <View style={{ flexDirection: 'row' }}>
                                                                            <View style={{ width: '50%', justifyContent: 'center', alignItems: 'center' }}>
                                                                                <Image
                                                                                    style={{ height: 200, width: 200 }}
                                                                                    source={require('./../assets/images/sidemenu/page-sidemenu/menu-crafter-list/crafter_list.png')}
                                                                                />
                                                                            </View>
                                                                            <View style={{ width: '50%', flexDirection: 'column', paddingTop: 7, paddingRight: 5 }}>
                                                                                <View style={{}}>
                                                                                    <Text style={{ color: 'white', fontSize: 20, fontFamily: 'Quicksand-Bold', textAlign: 'left' }}>CRAFTER LIST</Text>
                                                                                    <Text style={{ color: 'white', fontSize: 15, textAlign: 'left', fontFamily: 'Quicksand-Regular', paddingTop: 5 }}>Kumpulan crafter dengan keunikannya yang beraneka ragam</Text>
                                                                                </View>
                                                                                <View style={{ height: '50%' }}>
                                                                                    <TouchableOpacity
                                                                                        style={styles.buttonCustom}
                                                                                        onPress={() => {
                                                                                            this.props.navigation.navigate('CrafterList');
                                                                                            this.setState(({ show }) => ({
                                                                                                show: !show,
                                                                                            }));
                                                                                        }}
                                                                                    >
                                                                                        <Text style={{ marginTop: 13, textAlign: 'center', color: 'white', fontSize: 15, fontFamily: 'Quicksand-Bold' }}>GO</Text>
                                                                                    </TouchableOpacity>
                                                                                </View>
                                                                            </View>
                                                                        </View>
                                                                    </View>
                                                                    <View style={{ flex: 1, flexDirection: 'column' }}>
                                                                        <View style={{ height: '25%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                                            <View style={{ width: '50%', flexDirection: 'row' }}>
                                                                                <View style={{ marginLeft: 15 }}>
                                                                                    <Image
                                                                                        style={{ height: 55, width: 55 }}
                                                                                        source={require('./../assets/images/sidemenu/page-sidemenu/menu-crafter-list/fashion.png')}
                                                                                    />
                                                                                </View>
                                                                                <View style={{ marginLeft: 20 }}>
                                                                                    <Text style={{ color: 'white', marginTop: 15, fontSize: 13 }}>Fashion</Text>
                                                                                    <Text style={{ color: '#d87115', marginTop: 1, fontSize: 13 }}>1254 Crafter</Text>
                                                                                </View>
                                                                            </View>
                                                                            <View style={{ width: '50%', flexDirection: 'row' }}>
                                                                                <View style={{}}>
                                                                                    <Image
                                                                                        style={{ height: 55, width: 55 }}
                                                                                        source={require('./../assets/images/sidemenu/page-sidemenu/menu-crafter-list/hobbies.png')}
                                                                                    />
                                                                                </View>
                                                                                <View style={{ marginLeft: 20 }}>
                                                                                    <Text style={{ color: 'white', marginTop: 15, fontSize: 13 }}>Hobbies & Toys</Text>
                                                                                    <Text style={{ color: '#d87115', marginTop: 1, fontSize: 13 }}>199 Crafter</Text>
                                                                                </View>
                                                                            </View>
                                                                        </View>
                                                                        <View style={{ height: '25%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                                            <View style={{ width: '50%', flexDirection: 'row' }}>
                                                                                <View style={{ marginLeft: 15 }}>
                                                                                    <Image
                                                                                        style={{ height: 55, width: 55 }}
                                                                                        source={require('./../assets/images/sidemenu/page-sidemenu/menu-crafter-list/furniture.png')}
                                                                                    />
                                                                                </View>
                                                                                <View style={{ marginLeft: 20 }}>
                                                                                    <Text style={{ color: 'white', marginTop: 15, fontSize: 13 }}>Furniture</Text>
                                                                                    <Text style={{ color: '#d87115', marginTop: 1, fontSize: 13 }}>723 Crafter</Text>
                                                                                </View>
                                                                            </View>
                                                                            <View style={{ width: '50%', flexDirection: 'row' }}>
                                                                                <View style={{}}>
                                                                                    <Image
                                                                                        style={{ height: 55, width: 55 }}
                                                                                        source={require('./../assets/images/sidemenu/page-sidemenu/menu-crafter-list/beauty.png')}
                                                                                    />
                                                                                </View>
                                                                                <View style={{ marginLeft: 20 }}>
                                                                                    <Text style={{ color: 'white', marginTop: 15, fontSize: 13 }}>Beauty</Text>
                                                                                    <Text style={{ color: '#d87115', marginTop: 1, fontSize: 13 }}>269 Crafter</Text>
                                                                                </View>
                                                                            </View>
                                                                        </View>
                                                                    </View>
                                                                </View>
                                                                :
                                                                <View style={{ flex: 1 }}>
                                                                    {
                                                                        statusMenu === 'crafterMenu' ?
                                                                            <View style={{ flex: 1, flexDirection: 'column' }}>
                                                                                <View style={{ padding: 15, height: 100 }}>
                                                                                    <View style={{ flex: 1, flexDirection: 'row' }}>
                                                                                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                                                                            <TouchableWithoutFeedback
                                                                                                onPress={() => {
                                                                                                    this.props.navigation.navigate('CrafterMyOrder');
                                                                                                    this.setState(({ show }) => ({
                                                                                                        show: !show,
                                                                                                    }));
                                                                                                }}
                                                                                            >
                                                                                                <Image style={{ width: 50, height: 50 }}
                                                                                                    source={require('./../assets/images/sidemenu/page-sidemenu/daftar-pesanan.png')}
                                                                                                />
                                                                                            </TouchableWithoutFeedback>
                                                                                        </View>
                                                                                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                                                                            <TouchableWithoutFeedback
                                                                                                onPress={() => {
                                                                                                    this.props.navigation.navigate('NotificationMenu');
                                                                                                    this.setState(({ show }) => ({
                                                                                                        show: !show,
                                                                                                    }));
                                                                                                }}
                                                                                            >
                                                                                                <Image style={{ width: 50, height: 50 }}
                                                                                                    source={require('./../assets/images/sidemenu/page-sidemenu/notifikasi.png')}
                                                                                                />
                                                                                            </TouchableWithoutFeedback>
                                                                                        </View>
                                                                                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                                                                            <TouchableWithoutFeedback
                                                                                                onPress={() => {
                                                                                                    this.props.navigation.navigate('SettingMenu');
                                                                                                    this.setState(({ show }) => ({
                                                                                                        show: !show,
                                                                                                    }));
                                                                                                }}
                                                                                            >
                                                                                                <Image style={{ width: 50, height: 50 }}
                                                                                                    source={require('./../assets/images/sidemenu/page-sidemenu/setting.png')}
                                                                                                />
                                                                                            </TouchableWithoutFeedback>
                                                                                        </View>
                                                                                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                                                                            <TouchableWithoutFeedback
                                                                                                onPress={() => {
                                                                                                    this.props.navigation.navigate('HelpMenu');
                                                                                                    this.setState(({ show }) => ({
                                                                                                        show: !show,
                                                                                                    }));
                                                                                                }}>
                                                                                                <Image style={{ width: 50, height: 50 }}
                                                                                                    source={require('./../assets/images/sidemenu/page-sidemenu/bantuan.png')}
                                                                                                />
                                                                                            </TouchableWithoutFeedback>
                                                                                        </View>
                                                                                    </View>
                                                                                </View>
                                                                                {
                                                                                    idCrafter ?
                                                                                        <View style={{ height: 200 }}>
                                                                                            <View style={{ flexDirection: 'row' }}>
                                                                                                <View style={{ width: '50%', justifyContent: 'center', alignItems: 'center' }}>
                                                                                                    <Image
                                                                                                        style={{ height: 200, width: 200 }}
                                                                                                        source={require('./../assets/images/sidemenu/page-sidemenu/menu-crafter-menu/crafter_menu.png')}
                                                                                                    />
                                                                                                </View>
                                                                                                <View style={{ width: '50%', flexDirection: 'column', paddingTop: 50, paddingRight: 10 }}>
                                                                                                    <View style={{}}>
                                                                                                        <Text style={{ color: 'white', fontSize: 20, fontFamily: 'Quicksand-Bold', textAlign: 'left' }}>CRAFTER MENU</Text>
                                                                                                        <Text style={{ color: 'white', fontSize: 15, textAlign: 'left', fontFamily: 'Quicksand-Regular', paddingTop: 5 }}>Lihat profil kamu sebagai crafter dan permintaan dari seluruh indonesia</Text>
                                                                                                    </View>
                                                                                                </View>
                                                                                            </View>
                                                                                            <View style={{ height: 203 }}>
                                                                                                <View style={{ height: 142, flexDirection: 'column', marginTop: 30 }}>
                                                                                                    <View style={{ height: 75, marginLeft: '25%' }}>
                                                                                                        <TouchableOpacity
                                                                                                            onPress={() => {
                                                                                                                this.setState(({ show }) => ({
                                                                                                                    show: !show,
                                                                                                                }), () => {
                                                                                                                    this.props.navigation.navigate('MenuCrafter');
                                                                                                                });
                                                                                                            }}
                                                                                                        >
                                                                                                            <View style={{ flexDirection: 'row' }}>
                                                                                                                <Image
                                                                                                                    style={{ width: 40, height: 40 }}
                                                                                                                    source={require('./../assets/images/sidemenu/page-sidemenu/menu-crafter-menu/edit_profile.png')}
                                                                                                                />
                                                                                                                <Text style={{ marginTop: 10, marginLeft: 30, textAlign: 'center', color: 'white', fontFamily: 'Quicksand-Regular', fontSize: 15 }}>Edit Profil</Text>
                                                                                                                <Icon size={30} style={{ marginLeft: 70, color: 'white' }} name='ios-arrow-forward' />
                                                                                                            </View>
                                                                                                        </TouchableOpacity>
                                                                                                    </View>
                                                                                                    <View style={{ height: 75, marginLeft: '25%' }}>
                                                                                                        <TouchableOpacity
                                                                                                            onPress={() => {
                                                                                                                this.setState(({ show }) => ({
                                                                                                                    show: !show,
                                                                                                                }), () => {
                                                                                                                    this.props.navigation.navigate('CrafterOrderMenu');
                                                                                                                });
                                                                                                            }}
                                                                                                        >
                                                                                                            <View style={{ flexDirection: 'row' }}>
                                                                                                                <Image
                                                                                                                    style={{ width: 40, height: 40 }}
                                                                                                                    source={require('./../assets/images/sidemenu/page-sidemenu/menu-crafter-menu/cari_pesanan.png')}
                                                                                                                    resizeMode='contain'
                                                                                                                />
                                                                                                                <Text style={{ marginTop: 10, marginLeft: 30, textAlign: 'center', color: 'white', fontFamily: 'Quicksand-Regular', fontSize: 15 }}>Cari Pesanan</Text>
                                                                                                                <Icon size={30} style={{ marginLeft: 40, color: 'white' }} name='ios-arrow-forward' />
                                                                                                            </View>
                                                                                                        </TouchableOpacity>
                                                                                                    </View>
                                                                                                </View>
                                                                                            </View>
                                                                                        </View>
                                                                                        :
                                                                                        <View>
                                                                                            <View style={{ height: 300, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                                                                                <Image
                                                                                                    style={{ height: 190, width: 190 }}
                                                                                                    source={require('./../assets/images/sidemenu/page-sidemenu/menu-crafter-menu/crafter_menu.png')}
                                                                                                />

                                                                                                <Text style={{ color: 'white', marginTop: 3, alignSelf: 'center', fontSize: 13, fontFamily: 'Quicksand-Regular' }}>Daftarkan diri anda </Text>
                                                                                                <Text style={{ color: 'white', marginTop: 3, alignSelf: 'center', fontSize: 13, fontFamily: 'Quicksand-Regular' }}>menjadi partner kami</Text>
                                                                                                <Text style={{ color: 'white', marginTop: 3, alignSelf: 'center', fontSize: 13, fontFamily: 'Quicksand-Regular' }}>sebagai CRAFTER </Text>
                                                                                            </View>
                                                                                            <View style={{ flex: 1, flexDirection: 'column' }}>
                                                                                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                                                                    <Image
                                                                                                        style={{ height: 20, width: 20 }}
                                                                                                        source={require('./../assets/images/sidemenu/page-sidemenu/menu-crafter-menu/question.png')}
                                                                                                    />
                                                                                                    <Text style={{ marginLeft: 10, color: 'white', fontSize: 13, fontFamily: 'Quicksand-Regular' }}>apa itu</Text>
                                                                                                    <Text style={{ marginLeft: 7, color: '#d87115', fontFamily: 'Quicksand-Regular', fontSize: 13 }}>CRAFTER ?</Text>
                                                                                                </View>
                                                                                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                                                                    <TouchableOpacity
                                                                                                        style={styles.buttonJoin}
                                                                                                        onPress={() => {
                                                                                                            this.props.navigation.navigate('RegistrationCrafter')
                                                                                                            this.setState(({ show }) => ({
                                                                                                                show: !show,
                                                                                                            }));
                                                                                                        }}>
                                                                                                        <Text style={{ textAlign: 'center', color: 'white', fontSize: 15, fontFamily: 'Quicksand-Bold' }}>JOIN</Text>
                                                                                                    </TouchableOpacity>
                                                                                                </View>
                                                                                            </View>
                                                                                        </View>
                                                                                }
                                                                            </View>
                                                                            :
                                                                            <View />
                                                                    }
                                                                </View>
                                                        }
                                                    </View>
                                            }
                                        </View>
                                }
                            </View>
                            :
                            <View />
                    }

                    <View style={{ alignItems: 'center', marginBottom: 13 }}>
                        <BubbleMenu
                            items={this._renderItems()}
                            openBtn={this._renderOpenBtn()}
                            show={this.state.show}
                            style={styles.menu}
                        />
                    </View>
                </ImageBackground>
            </View>
        )
    }

};

const styles = StyleSheet.create({
    menu: {
        padding: 15,
        borderRadius: 50,
        justifyContent: 'space-between'
    },
    menuGeneralIcons: {
        marginTop: 10,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5
    },
    menuOpenBtn: {
        width: '100%',
        height: 50,
        alignItems: 'center'
    },
    backgroundStyle: {
        width: '100%',
        height: '100%',
        backgroundColor: COLOR.element_a1
    },
    formatSwiper: {
        backgroundColor: '#FFFFFF',
        width: 5,
        height: 5,
        borderRadius: 4,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 3
    },
    containerSlide: {
        width: '100%',
        height: 160
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center'
    },
    containerDashboard: {
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.8)',
        shadowColor: '#000',
        shadowOffset: { width: 0, heigth: 2 },
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        height: 175,
        width: '95%'
    },
    containerPhoto: {
        flex: 1,
        width: 125,
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerInsideProfileOne: {
        width: 130,
        height: 180,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10
    },
    containerInsideProfileTwo: {
        flex: 1,
        height: 160,
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerUp: {
        width: 230,
        height: 60
    },
    containerMiddleProfileTwo: {
        width: 230,
        height: 50
    },
    containerBottomProfileTwo: {
        width: 230,
        height: 50
    },
    containerUploadIdea: {
        flex: 1,
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.8)',
        shadowColor: '#009',
        shadowOffset: { width: 0, heigth: 2 },
        shadowRadius: 2,
        marginTop: 10,
        marginBottom: 70,
        height: 160,
        width: '95%'
    },
    imageStyle: {
        resizeMode: 'cover'
    },
    profileImage: {
        height: 110,
        width: 110,
        borderRadius: 100
    },
    icons: {
        height: 30,
        width: 30,
        borderRadius: 100,
    },
    buttonCustom: {
        marginTop: 50,
        backgroundColor: '#ef1c25',
        borderRadius: 20,
        height: 45
    },
    item: {
        height: 85,
        width: 87,
        borderRadius: 4,
        alignSelf: 'stretch',
        resizeMode: 'cover'
    },
    buttonJoin: {
        backgroundColor: '#ef1c25',
        borderRadius: 20,
        height: 40,
        width: 220,
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: 100
    },
});

export default DashboardPage;