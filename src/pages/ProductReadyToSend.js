import React, { Component } from 'react';
import { ToastAndroid, View, Text, ImageBackground, Image, AsyncStorage, TouchableOpacity, FlatList, ScrollView, StyleSheet, TouchableHighlight, TouchableWithoutFeedback, StatusBar, Modal } from 'react-native'
// import axios from 'axios';
import Swiper from 'react-native-swiper';
import { Container, ContainerSection, Button, Input, InputDate, InputNumber } from '../components/common';

export class ProductReadyToSendPage extends React.Component {


    static navigationOptions = {
        headerTitle: 'Crafter Menu',
        headerStyle: {
            // shadowOpacity: 0,
            elevation: 0,
            borderBottomColor: 'white',
            borderBottomWidth: 0
        },
    }


    constructor(props) {
        super(props)
        this.state = {
            // screen: 'Custom'
            photo: [
                'http://animaster.com/wp-content/uploads/2018/02/after-10-12-art-design-college.jpg',
                'http://animaster.com/wp-content/uploads/2018/02/after-10-12-art-design-college.jpg',
                'http://animaster.com/wp-content/uploads/2018/02/after-10-12-art-design-college.jpg',
                'http://animaster.com/wp-content/uploads/2018/02/after-10-12-art-design-college.jpg',
                'http://animaster.com/wp-content/uploads/2018/02/after-10-12-art-design-college.jpg',
            ]
        }
    }

    renderProductImage = (data) => {
        console.log(data, '098');
        return (
            <TouchableOpacity>

                <View style={{ flex: 1, flexDirection: 'row', marginTop: 5, marginRight: 5, marginBottom: 5, }}>
                    <Image
                        style={styles.thumbnailStyle}
                        source={{ uri: data.item }}
                    />
                </View>

            </TouchableOpacity >
        )
    }



    render() {
        return (
            <View style={{
                flex: 1,
                // backgroundColor: '#eaeaea',
            }}>


                <ScrollView style={{
                    backgroundColor: '#eaeaea',
                    flex: 1
                }}>

                    <View style={{ width: '100%', height: 220, marginTop: 12.5, backgroundColor: 'white', alignItems: 'center' }}>

                        <View style={{ width: '90%', height: 100, backgroundColor: 'white', justifyContent: 'center', alignContent: 'center' }}>
                            <Text style={{ fontFamily: 'Quicksand-Bold', fontSize: 15, color: 'black', textAlign: 'center' }}>BARANG SIAP DIKIRM</Text>
                            <Text style={{ fontFamily: 'Quicksand-Regular', fontSize: 15, color: 'black', textAlign: 'center', paddingTop: 5 }}>Silakan melakukan pengiriman dan masukan nomor resi pada kolom dibawah ini</Text>
                        </View>

                        <View style={{ width: '95%', height: 50, backgroundColor: 'white', justifyContent: 'center', alignContent: 'center' }}>
                            <ContainerSection>
                                <Input
                                    placeholder=''
                                />
                            </ContainerSection>
                        </View>

                        <View style={{ width: '97%', height: 50, backgroundColor: 'black', justifyContent: 'center', alignContent: 'center', marginTop: 10, borderRadius: 100 }}>
                            <TouchableOpacity>
                                <Text style={{ fontFamily: 'Quicksand-Bold', fontSize: 15, color: 'white', textAlign: 'center' }}>Proses</Text>
                            </TouchableOpacity>
                        </View>

                    </View>

                    <View style={{ flex: 1, height: 250, marginTop: 12.5, marginLeft: 10, marginRight: 10 }}>
                        <Swiper
                            // style={styles.wrapper}
                            showsButtons={false}
                            dot={<View style={{ backgroundColor: '#FFFFFF', width: 5, height: 5, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3 }} />}
                        >
                            <View style={styles.slide1}>
                                <Image
                                    // style={styles.imageStyle}
                                    source={require('./../assets/images/swiperFirst.png')}
                                    resizeMode='cover'
                                />
                            </View>
                            <View style={styles.slide2}>
                                <Image
                                    // style={styles.imageStyle}
                                    source={require('./../assets/images/swiperSecond.png')}
                                    resizeMode='cover'
                                />
                            </View>
                        </Swiper>
                    </View>

                    <View style={{ flex: 1, height: 100, marginTop: 10, marginLeft: 10, marginRight: 10, }}>

                        <FlatList
                            data={this.state.photo}
                            // contentContainerStyle={styles.list}
                            renderItem={this.renderProductImage.bind(this)}
                            showsHorizontalScrollIndicator={false}
                            horizontal={true}
                        // numColumns={3}
                        />

                    </View>

                    <View style={{ flex: 1, height: 75, flexDirection: 'row', marginTop: 10, marginLeft: 10, marginRight: 10 }}>

                        <View style={{ flex: 1, }}>
                            <View >
                                <Text style={{ fontFamily: 'Quicksand-Bold', fontSize: 15, color: 'black', paddingLeft: 5 }}>Nama Produk</Text>
                            </View>
                            <View>
                                <ContainerSection>
                                    <Input
                                        placeholder='My Own Table'
                                        editable={false}
                                    />
                                </ContainerSection>
                            </View>
                        </View>

                        <View style={{ flex: 1, }}>
                            <View >
                                <Text style={{ fontFamily: 'Quicksand-Bold', fontSize: 15, color: 'black', paddingLeft: 5 }}>Kategori</Text>
                            </View>
                            <View>
                                <ContainerSection>
                                    <Input
                                        placeholder='Furniture'
                                        editable={false}
                                    />
                                </ContainerSection>
                            </View>
                        </View>

                    </View>

                    <View style={{ flex: 1, height: 50, flexDirection: 'row', marginTop: 10, marginLeft: 10, marginRight: 10, alignItems: 'center' }}>

                        <Text style={{ fontFamily: 'Quicksand-Bold', fontSize: 15, color: 'black', paddingLeft: 5 }}>Jumlah yang dipesan</Text>

                        <View style={{ marginLeft: 10, width: 25, height: '60%', backgroundColor: 'white', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderRadius: 5, borderWidth: 2, borderColor: '#aaaaaa' }}>
                            <Text style={{ fontFamily: 'Quicksand-Bold', fontSize: 13, color: 'black' }}>1</Text>
                        </View>


                        <View style={{ marginLeft: 3, width: 50, height: '60%', backgroundColor: 'white', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderRadius: 5, borderWidth: 2, borderColor: '#aaaaaa' }}>
                            <Text style={{ fontFamily: 'Quicksand-Bold', fontSize: 13, color: 'black' }}>PCS</Text>
                        </View>

                    </View>

                    <View style={{ flex: 1, height: 85, marginTop: 5, marginLeft: 10, marginRight: 10, }}>
                        <Text style={{ fontFamily: 'Quicksand-Bold', fontSize: 15, color: 'black', paddingLeft: 5 }}>Material</Text>

                        <View style={{ flex: 1, flexDirection: 'row', marginTop: 5 }}>

                            <View style={{ marginLeft: 3, height: 80, width: 130, height: '60%', backgroundColor: 'white', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderRadius: 50, borderWidth: 2, borderColor: '#aaaaaa' }}>
                                <Text style={{ fontFamily: 'Quicksand-Bold', fontSize: 13, color: 'black' }}> Kayu - Red Wood</Text>
                            </View>

                            <View style={{ marginLeft: 3, height: 80, width: 120, height: '60%', backgroundColor: 'white', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderRadius: 50, borderWidth: 2, borderColor: '#aaaaaa' }}>
                                <Text style={{ fontFamily: 'Quicksand-Bold', fontSize: 13, color: 'black' }}>Besi - Beton</Text>
                            </View>

                            <View style={{ marginLeft: 3, height: 80, width: 120, height: '60%', backgroundColor: 'white', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderRadius: 50, borderWidth: 2, borderColor: '#aaaaaa' }}>
                                <Text style={{ fontFamily: 'Quicksand-Bold', fontSize: 13, color: 'black' }}>Plastik - HDPE</Text>
                            </View>

                        </View>

                    </View>

                    <View style={{ height: 120, flex: 1, justifyContent: 'center', marginTop: 5, marginLeft: 10, marginRight: 10, }}>

                        <Text style={{ fontFamily: 'Quicksand-Bold', fontSize: 15, color: 'black', }}>Jasa Pengiriman</Text>


                        <View style={{ flex: 1, marginTop: 5, backgroundColor: 'white', alignSelf: 'center', justifyContent: 'center', alignContent: 'center', flexDirection: 'row' }}>

                            <Image
                                style={{
                                    height: 55,
                                    width: 80,
                                    // borderRadius: 100,
                                    // alignSelf: 'fle',
                                    marginLeft: 30,
                                    alignSelf: 'center'
                                }}
                                source={require('./../assets/images/ic_pos.png')}
                            />

                            <View style={{ flex: 1, alignSelf: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontFamily: 'Quicksand-Bold', fontSize: 13, color: 'black', paddingLeft: 15 }}>Pos Indonesia</Text>
                            </View>
                        </View>

                    </View>

                    <View style={{ height: 150, flex: 1, justifyContent: 'center', marginTop: 10, marginLeft: 10, marginRight: 10, }}>

                        <Text style={{ fontFamily: 'Quicksand-Bold', fontSize: 15, color: 'black', paddingLeft: 5 }}>Alamat Pengiriman</Text>

                        <View style={{ flex: 1, backgroundColor: 'white', marginTop: 5, justifyContent: 'center' }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 13, fontFamily: 'Quicksand-Regular', color: 'black', paddingLeft: 10 }}> Home 1</Text>
                            <Text style={{ fontSize: 13, paddingTop: 3, fontFamily: 'Quicksand-Regular', color: 'black', paddingLeft: 10 }}> Penerima : <Text style={{ fontWeight: 'bold', fontSize: 13, fontFamily: 'Quicksand-Regular', color: 'black' }}>Judy</Text> </Text>
                        </View>

                        <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 13, fontFamily: 'Quicksand-Regular', color: 'black', paddingLeft: 10 }}>(+62)<Text> 84485300 </Text></Text>
                            <Text style={{ fontSize: 13, fontFamily: 'Quicksand-Regular', color: 'black', paddingLeft: 10 }}>Jl. Duri Kepa 4 No 5 </Text>
                            <Text style={{ fontSize: 13, fontFamily: 'Quicksand-Regular', color: 'black', paddingLeft: 10 }} >Kebon Jeruk, Jakarta Barat </Text>
                        </View>

                    </View>

                    <View style={{ flex: 1, height: 30 }} />


                </ScrollView >


            </View >
        )
    }

}

const styles = StyleSheet.create({

    thumbnailContainerStyle: {

        margin: 10,
    },
    thumbnailStyle: {
        height: 90,
        width: 90,
        resizeMode: 'cover',
        // borderRadius: 1
    }


});

export default ProductReadyToSendPage;

