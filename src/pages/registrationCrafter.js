import React, { Component } from 'react'
import { View, Text, ImageBackground, Image, AsyncStorage, TouchableOpacity, ScrollView, StyleSheet, TouchableHighlight, TouchableWithoutFeedback, Modal } from 'react-native'
import { Container, ContainerSection, Button, InputLogin, Spinner, Input } from '../components/common';
// import axios from 'axios';
import { COLOR } from './../shared/config';
// import { NavigationActions, StackActions } from 'react-navigation';
// import { IPSERVER } from './../shared/config';
import { CheckBox } from 'react-native-elements'
import ImagePicker from 'react-native-image-picker';

export class RegistrationCrafterPage extends React.Component {

    static navigationOptions = {
        headerTitle: 'Register Crafter'
    }

    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,
            pathPhotoRegistCrafter: null,

        };
    }

    setModalVisible(visible) {
        this.setState({ isModalVisible: visible });
    }

    selectPhotoRegister() {
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true
            }
        }

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: response.uri };

                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    pathPhotoRegistCrafter: source
                });
            }
        });
    }




    render() {
        return (

            <ImageBackground
                style={{ width: '100%', height: '100%', backgroundColor: '#e8e8e8' }}
            >
                <ScrollView>

                    <View style={styles.containerImage}>
                        <TouchableWithoutFeedback onPress={this.selectPhotoRegister.bind(this)}>
                            <View>
                                {this.state.pathPhotoRegistCrafter == null ?
                                    <Image
                                        style={styles.containerUpload}
                                        source={require('./../assets/images/icon_profile.png')}
                                    />
                                    :
                                    <Image
                                        style={styles.containerUpload}
                                        resizeMode='cover'
                                        source={this.state.pathPhotoRegistBuyer} />
                                }
                                <Image
                                    style={styles.iconCamera}
                                    source={require('./../assets/images/Icon_camera.png')}
                                />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>

                    <View style={styles.containerForm}>
                        <View style={styles.formPosition}>


                            <View style={{ paddingTop: 30, height: 100 }}>
                                <View >
                                    <Text style={styles.textStyle}>Name As a Crafter</Text>
                                </View>
                                <View>
                                    <ContainerSection>
                                        <Input
                                            placeholder='please input your name as a crafter'
                                        />
                                    </ContainerSection>
                                </View>
                            </View>

                            <View style={styles.BoxAblity}>
                                <View style={{ marginBottom: 5 }}>
                                    <Text style={styles.textStyle}>Delivery Services</Text>
                                </View>
                                <View style={styles.containerCheckBoxAbility}>
                                    <View style={styles.checkBoxAbility}>
                                        <CheckBox
                                            containerStyle={{ backgroundColor: 'transparent', borderColor: 'transparent' }}
                                            title='Fashion'
                                            checked={this.state.checked}
                                            onChange={() => this.setState({ checked: !this.state.checked })}
                                        />
                                    </View>
                                </View>
                                <View style={styles.containerCheckBoxAbility}>
                                    <View style={styles.checkBoxAbility}>
                                        <CheckBox
                                            containerStyle={{ backgroundColor: 'transparent', borderColor: 'transparent' }}
                                            title='Furniture & Appliances'
                                            checked={this.state.checked}
                                            onChange={() => this.setState({ checked: !this.state.checked })}
                                        />
                                    </View>
                                </View>
                                <View style={styles.containerCheckBoxAbility}>
                                    <View style={styles.checkBoxAbility}>
                                        <CheckBox
                                            containerStyle={{ backgroundColor: 'transparent', borderColor: 'transparent' }}
                                            title='Beauty'
                                            checked={this.state.checked}
                                            onChange={() => this.setState({ checked: !this.state.checked })}
                                        />

                                    </View>
                                </View>
                                <View style={styles.containerCheckBoxAbility}>
                                    <View style={styles.checkBoxAbility}>
                                        <CheckBox
                                            containerStyle={{ backgroundColor: 'transparent', borderColor: 'transparent' }}
                                            title='DIY, Hobbies & Toys'
                                            checked={true}
                                            onChange={() => this.setState({ checked: !this.state.checked })}
                                        />
                                    </View>
                                </View>

                            </View>

                            <View style={styles.textBox}>
                                <View >
                                    <Text style={styles.textStyle}>Name As a Crafter</Text>
                                </View>
                                <View style={styles.containerCheckBoxDeliveryServices}>

                                    <View style={styles.iHave}>
                                        <CheckBox
                                            containerStyle={{ backgroundColor: 'transparent', borderColor: 'transparent' }}
                                            title='Yes, I Have'
                                            checkedIcon='dot-circle-o'
                                            uncheckedIcon='dot-circle-o'
                                            checked={true}
                                        // onChange={(checked) => console.log('I am checked', checked)}
                                        />
                                    </View>

                                    <View style={styles.iDontHave}>
                                        <CheckBox
                                            containerStyle={{ backgroundColor: 'transparent', borderColor: 'transparent' }}
                                            title='No, I Dont Have'
                                            checkedIcon='dot-circle-o'
                                            uncheckedIcon='circle-o'
                                            checked={false}
                                        // onChange={(checked) => console.log('I am checked', checked)}
                                        />
                                    </View>
                                </View>
                            </View>

                            <View style={styles.textBox}>
                                <View >
                                    <Text style={styles.textStyle}>Password</Text>
                                </View>
                                <View>
                                    <ContainerSection>
                                        <Input
                                            secureTextEntry={true}
                                            placeholder='please input your password'
                                        />
                                    </ContainerSection>
                                </View>
                            </View>

                            <View style={styles.textBox}>
                                <View >
                                    <Text style={styles.textStyle}>E-Mail</Text>
                                </View>
                                <View>
                                    <ContainerSection>
                                        <Input
                                            placeholder='please input your e-mail'
                                        />
                                    </ContainerSection>
                                </View>
                            </View>

                            <View style={styles.textBox}>
                                <View >
                                    <Text style={styles.textStyle}>Phone Number</Text>
                                </View>
                                <View>
                                    <ContainerSection>
                                        <Input
                                            placeholder='please input your phone number'
                                        />
                                    </ContainerSection>
                                </View>
                            </View>

                            <View style={styles.textBox}>
                                <View >
                                    <Text style={styles.textStyle}>Address</Text>
                                </View>
                                <View>
                                    <ContainerSection>
                                        <Input
                                            onFocus={() => {
                                                this.setModalVisible(true);
                                            }}
                                            placeholder='please input your name address'
                                        />
                                    </ContainerSection>
                                </View>
                            </View>

                            <View style={styles.textAgree}>
                                <View>

                                    <CheckBox
                                        containerStyle={{ backgroundColor: 'transparent', borderColor: 'transparent' }}
                                        title={<Text style={{ color: 'black', fontSize: 12, paddingLeft: 5 }}> Agree with our <Text style={{ textDecorationLine: 'underline', color: 'red', fontSize: 12 }}>term & condition</Text>
                                        </Text>}
                                    // checked={true}
                                    // onChange={(checked) => console.log('I am checked', checked)}
                                    />
                                </View>
                            </View>

                        </View>
                    </View>




                    <TouchableOpacity style={styles.buttonSignUp}>
                        <Text style={styles.signupButtonText}>Sign Up</Text>
                    </TouchableOpacity>



                    <View style={{ marginTop: 65 }}>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={this.state.isModalVisible}
                            onRequestClose={() => {
                                alert('Modal has been closed.');
                            }}>
                            <View style={{ marginTop: 65 }}>
                                <View style={styles.modalAddress}>
                                    <ScrollView>
                                        <View style={{ paddingTop: 20, height: 80, marginBottom: 10 }}>
                                            <View >
                                                <Text style={styles.textStyle}>Location</Text>
                                            </View>
                                            <View>
                                                <ContainerSection>
                                                    <Input
                                                        placeholder='please input your location'
                                                    />
                                                </ContainerSection>
                                            </View>
                                        </View>

                                        <View style={styles.textaddressModal}>
                                            <View >
                                                <Text style={styles.textStyle}>Province</Text>
                                            </View>
                                            <View>
                                                <ContainerSection>
                                                    <Input
                                                        placeholder='please input your province'
                                                    />
                                                </ContainerSection>
                                            </View>
                                        </View>

                                        <View style={styles.textaddressModal}>
                                            <View >
                                                <Text style={styles.textStyle}>District</Text>
                                            </View>
                                            <View>
                                                <ContainerSection>
                                                    <Input
                                                        placeholder='please input your district'
                                                    />
                                                </ContainerSection>
                                            </View>
                                        </View>

                                        <View style={styles.textaddressModal}>
                                            <View >
                                                <Text style={styles.textStyle}>Address Detail</Text>
                                            </View>
                                            <View>
                                                <ContainerSection>
                                                    <Input style={{ height: 30 }}
                                                        multiline={true}
                                                        numberOfLines={150}

                                                        placeholder='please input your detail address'

                                                    />
                                                </ContainerSection>
                                            </View>
                                        </View>



                                        <View style={styles.buttonOnModalAddress}>

                                            <View>
                                                <TouchableHighlight
                                                    onPress={() => {
                                                        this.setModalVisible(!this.state.isModalVisible);
                                                    }}>
                                                    <Text style={styles.AddressTextCancel}>Cancel</Text>
                                                </TouchableHighlight>
                                            </View>

                                            <View style={{ paddingLeft: 20 }}>
                                                <TouchableHighlight
                                                    onPress={() => {
                                                        this.setModalVisible(!this.state.isModalVisible);
                                                    }}>
                                                    <Text style={styles.AddressTextSave}>Save</Text>
                                                </TouchableHighlight>
                                            </View>

                                        </View>
                                    </ScrollView>
                                </View>

                            </View>
                        </Modal>



                    </View>






                </ScrollView>
            </ImageBackground>


        );
    };
};

const styles = StyleSheet.create({
    containerImage: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        zIndex: 2,

        // backgroundColor:'yellow'
    },
    containerUpload: {
        height: 155,
        width: 155,
        borderRadius: 100,
        // zIndex: 2
    },
    containerForm: {
        flex: 1,
        borderRadius: 20,
        backgroundColor: '#ffffff',
        shadowColor: '#000',
        shadowOffset: { width: 0, heigth: 2 },
        shadowRadius: 2,
        flexDirection: 'column',
        marginTop: -75,
        height: 870,
        width: '90%',
        alignItems: 'center',
        alignSelf: 'center',
        zIndex: 1,
        borderWidth: 0.5,
        borderColor: '#d6d7da',
        // backgroundColor:'skyblue'
    },
    iconCamera: {
        height: 40,
        width: 40,
        borderRadius: 100,
        zIndex: 3,
        marginTop: -40,
        marginLeft: 100
    },
    buttonSignUp: {
        // marginTop: 60,
        backgroundColor: 'red',
        borderRadius: 20,
        height: 40,
        width: 165,
        justifyContent: 'center',
        alignSelf: 'center',
        zIndex: 4,
        marginTop: -17,
        marginBottom: -30
    },
    signupButtonText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 17,
        fontWeight: 'bold'
    },
    formPosition: {
        flex: 7,
        marginTop: 80,
        height: 12,
        width: 275,
        // position: 'absolute',
        zIndex: 0,
        // backgroundColor:'yellow'
    },
    textStyle: {
        color: 'black',
        marginLeft: 5,
        fontSize: 12,
        fontWeight: 'bold',
        fontFamily: 'Quicksand-Regular'
    },
    containerCheckBox: {
        // marginLeft: 5,
        height: 55,
        width: 265,
        flexDirection: 'row',
        // backgroundColor: 'blue',
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    BoxAblity: {
        // flex: 4,
        paddingTop: 10,
        height: 185,
        flexDirection: 'column',
        width: '100%',
        // backgroundColor: 'blue'
    },
    textBox: {
        paddingTop: 10,
        height: 80
    },
    containerCheckBoxAbility: {
        height: 40,
        width: '100%',
        flexDirection: 'row',
        // backgroundColor: 'red',
        // justifyContent: 'center',
        alignItems: 'center'
    },
    checkBoxAbility: {
        flex: 1,
        // height: 50,
        width: '100%',
        // backgroundColor: 'yellow'
        // backgroundColor: 'transparent',
        // borderColor: 'transparent'
    },
    containerCheckBoxDeliveryServices: {
        // marginLeft: 5,
        height: 55,
        width: '100%',
        flexDirection: 'row',
        // backgroundColor: 'blue',
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    iHave: {
        // marginLeft: 40,
        height: 55,
        width: '50%',
        // backgroundColor: 'yellow'
        // backgroundColor: 'transparent',
        // borderColor: 'transparent'
    },
    iDontHave: {
        height: 55,
        width: '60%',
        // backgroundColor: 'red',
        marginLeft: -10
    },
    textAgree: {
        paddingTop: 10,
        height: 120
    },
    modalAddress: {
        width: '95%',
        height: '99%',
        backgroundColor: '#ffffff',
        alignSelf: 'center',
        borderRadius: 10,
        borderWidth: 0.9,
        shadowColor: '#000',
        shadowOpacity: 1.0,
    },
    textStyle: {
        color: 'black',
        marginLeft: 5,
        fontSize: 12,
        fontWeight: 'bold',
        fontFamily: 'Quicksand-Regular'
    },
    textaddressModal: {
        paddingTop: 5,
        height: 80
    },
    buttonOnModalAddress: {
        paddingTop: 10,
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '95%',
        height: 70,
        // backgroundColor: 'red'
    },
    AddressTextSave: {
        fontWeight: 'bold',
        color: 'red',
        fontFamily: 'Quicksand-Regular'
    },
    AddressTextCancel: {
        fontWeight: 'bold',
        color: 'black',
        fontFamily: 'Quicksand-Regular'
    }
});

export default RegistrationCrafterPage