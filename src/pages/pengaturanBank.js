import React, { Component } from 'react';
import { View, Text, Picker, Image, AsyncStorage, TouchableOpacity, ScrollView, StyleSheet, ToastAndroid, TouchableWithoutFeedback, StatusBar, Modal } from 'react-native'
import { Container, ContainerSection, Button, Input, Spinner } from '../components/common';
// import axios from 'axios';
import { IPSERVER } from './../shared/config';
import axios from 'axios';
import { CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-picker';
import uuid from 'react-native-uuid';
import { NavigationActions, StackActions } from 'react-navigation';


export class PengaturanBankPage extends React.Component {

    static navigationOptions = ({ navigation }) => ({
        headerLeft:
            <TouchableOpacity
                onPress={() => { navigation.goBack(); console.log(navigation.goBack(), 'Props Order') }}
            >
                <Icon size={30} style={{ marginLeft: 25, color: '#EF1C25' }} name='ios-arrow-back' />
            </TouchableOpacity>,
        headerTitle: 'Pengaturan Akun Bank'
    });

    constructor(props) {
        super(props);
        this.state = {
            loadingCode: false,
            loadingOk: false,
            crafterName: '',
            idUser: '',

            fullname: '',
            firstName: '',
            lastName: '',
            bankName: '',
            dataBank: '',
            bankBranch: '',
            code: '',
            accountHolderNumber: '',

            agree: false,

            fotoUrl: '',
            uriFoto: '',

            ktpUrl: '',
            uriKTP: '',

            rekeningUrl: '',
            uriRekening: '',

        };
    }

    onChangeInput = (name, v) => {
        this.setState({ [name]: v }, () => {
            console.log(this.state[name], 'Set Variable');
        });
    }

    componentDidMount() {
        axios.get(`${IPSERVER}/ApapunBanks`)
            .then(response => {
                console.log(response.data, 'Response Bank');
                this.setState({ dataBank: response.data });
                console.log(this.props.navigation.state.params, 'PROPS');
                if (this.props.navigation.state.params === undefined) {
                    AsyncStorage.getItem('VMDDEVELOPER').then((value) => {
                        console.log(JSON.parse(value), 'Json Parse');
                        const dataLogin = JSON.parse(value);
                        if (value) {
                            this.setState({ idUser: dataLogin.userId }, () => {
                                console.log(this.state.idUser, 'ID USER');
                            })
                        }
                    });
                } else {
                    this.setState({
                        crafterName: this.props.navigation.state.params.Namecrafter,
                        idUser: this.props.navigation.state.params.idUser
                    });
                }
            }).catch(error => {
                console.log(error, 'Error Bank');
                return ToastAndroid.show('Connection Time Out, Server Maybe Down', ToastAndroid.SHORT);
            });
    }

    getPhotoProfile() {
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

                const profile = 'IMG_' + uuid.v1();
                this.setState({
                    uriFoto: source,
                    fotoUrl: profile.toUpperCase() + '.jpg'
                });
            }
        });
    }

    getPhotoKTP() {
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
                const ktp = 'IMG_' + uuid.v1();
                this.setState({
                    uriKTP: source,
                    ktpUrl: ktp.toUpperCase() + '.jpg'
                });
            }
        });
    }

    checkedAgreement = () => {
        this.setState({ agree: !this.state.agree });
    }


    getBankBook() {
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
                const rekening = 'IMG_' + uuid.v1();
                this.setState({
                    uriRekening: source,
                    rekeningUrl: rekening.toUpperCase() + '.jpg'
                });
            }
        });
    }



    checkedAgree = () => {
        this.setState({ agree: !this.state.agree })
    }

    sendCode() {
        this.setState({ loadingCode: true });
        const userId = this.state.idUser;
        axios.post(`${IPSERVER}/ApapunVerifications/SendAddBankVerification`, {
            userId
        }).then(response => {
            console.log(response, 'Response Code')
            this.setState({ loadingCode: false }, () => {
                return ToastAndroid.show('Cek your email, to see code confirmation', ToastAndroid.SHORT);
            });
        }).catch(error => {
            console.log(error, 'Error Code');
            this.setState({ loadingCode: false });
        });
    }

    checkValidation() {
        const {
            fotoUrl,
            ktpUrl,
            rekeningUrl,
            bankName,
            firstName,
            lastName,
            accountHolderNumber,
            bankBranch,
            code,
            agree
        } = this.state;

        switch (fotoUrl) {
            case '':
                return ToastAndroid.show('Foto Asli Tidak Boleh Kosong', ToastAndroid.SHORT);
            default:
                switch (ktpUrl) {
                    case '':
                        return ToastAndroid.show('Foto KTP Tidak Boleh Kosong', ToastAndroid.SHORT);
                    default:
                        switch (rekeningUrl) {
                            case '':
                                return ToastAndroid.show('Foto Buku Rekening Tidak Boleh Kosong', ToastAndroid.SHORT);
                            default:
                                switch (bankName) {
                                    case 0:
                                        return ToastAndroid.show('Nama Bank Tidak Boleh Kosong', ToastAndroid.SHORT);
                                    default:
                                        switch (bankBranch) {
                                            case '':
                                                return ToastAndroid.show('Cabang Bank Tidak Boleh Kosong', ToastAndroid.SHORT);
                                            default:
                                                switch (firstName) {
                                                    case '':
                                                        return ToastAndroid.show('Nama Awal Tidak Boleh Kosong', ToastAndroid.SHORT);
                                                    default:
                                                        switch (lastName) {
                                                            case '':
                                                                return ToastAndroid.show('Nama Akhir Tidak Boleh Kosong', ToastAndroid.SHORT);
                                                            default:
                                                                switch (accountHolderNumber) {
                                                                    case '':
                                                                        return ToastAndroid.show('Nomor Rekening Tidak Boleh Kosong', ToastAndroid.SHORT);
                                                                    default:
                                                                        switch (code) {
                                                                            case '':
                                                                                return ToastAndroid.show('Code Confirmasi Tidak Boleh Kosong', ToastAndroid.SHORT);
                                                                            default:
                                                                                switch (agree) {
                                                                                    case false:
                                                                                        return ToastAndroid.show('Anda harus menyetujui Syarat & Ketentuan Berlaku', ToastAndroid.SHORT);
                                                                                    default:
                                                                                        this.setState({ loadingOk: true });
                                                                                        this.settingAccountBank();
                                                                                }
                                                                        }
                                                                }
                                                        }
                                                }
                                        }
                                }
                        }
                }
        }
    }

    settingAccountBank() {
        const {
            fotoUrl,
            uriFoto,
            ktpUrl,
            uriKTP,
            rekeningUrl,
            uriRekening,
            firstName,
            lastName,
            bankName,
            accountHolderNumber,
            bankBranch,
            idUser,
            code
        } = this.state;

        var request = new XMLHttpRequest();
        var body = new FormData();
        var foto = {
            uri: uriFoto.uri,
            type: 'image/jpeg',
            name: fotoUrl
        };
        var ktp = {
            uri: uriKTP.uri,
            type: 'image/jpeg',
            name: ktpUrl
        };
        var rekening = {
            uri: uriRekening.uri,
            type: 'image/jpeg',
            name: rekeningUrl
        };

        body.append('foto', foto);
        body.append('ktp', ktp);
        body.append('rekening', rekening);

        request.onreadystatechange = (e) => {
            if (request.readyState !== 4) {
                return;
            }

            if (request.status === 200) {
                console.log('success', request.responseText);
            } else {
                console.warn('error', request);
            }
        };

        this.setState({ fullname: `${firstName} ${lastName}` }, () => {
            console.log(this.state.fullname, 'FULL NAME');
            const accountHolderName = this.state.fullname;
            const userId = idUser;
            console.log(this.state, 'STATE AKUN BANK');
            axios.post(`${IPSERVER}/ApapunUsersBanks/CreateAccountBank`, {
                fotoUrl,
                ktpUrl,
                rekeningUrl,
                bankName,
                accountHolderName,
                accountHolderNumber,
                bankBranch,
                userId,
                code
            })
                .then(response => {
                    console.log(response, 'Response Akun Bank');
                    request.open('POST', `${IPSERVER}/ApapunStorages/imagesUpload`);
                    request.send(body);
                    this.setState({ loadingOk: false }, () => {
                        const resetAction = StackActions.reset({
                            index: 1,
                            actions: [
                                NavigationActions.navigate({ routeName: 'Dashboard' }),
                                NavigationActions.navigate({ routeName: 'MenuCrafter' }),
                            ],
                        });
                        this.props.navigation.dispatch(resetAction);
                    });
                    ToastAndroid.show('Sukses Membuat Akun Bank', ToastAndroid.SHORT);
                }).catch(error => {
                    console.log(error, 'Error Akun Bank');
                    this.setState({ loadingOk: false });
                    return ToastAndroid.show('Connection Time Out, Server Maybe Down', ToastAndroid.SHORT);
                });
        });
    }

    renderBank = () => {
        const resultDataBank = this.state.dataBank;
        if (resultDataBank) {
            return resultDataBank.map((data, index) => {
                return <Picker.Item label={data.bankCode} value={data.bankName} key={index} />
            })
        }
        return <Picker.Item label='Tidak ada Kategori' value='0' />
    }


    render() {

        const {
            agree,
            uriFoto,
            uriKTP,
            uriRekening,
            firstName,
            lastName,
            accountHolderNumber,
            bankBranch,
            bankName,
            code,
            loadingCode,
            loadingOk
        } = this.state

        return (
            <ScrollView
                style={{ flex: 1, backgroundColor: 'white' }}
                keyboardShouldPersistTaps="always"
                ref={ref => this.scrollView = ref}
            >
                <View style={{ flex: 1, height: 100, padding: 30, backgroundColor: '#eaeaea', justifyContent:'center' }}>
                <Text style={{ paddingLeft: 5, fontSize: 13, fontFamily: 'Quicksand-Regular', color: '9D9D9D', textAlign:'center' }}>Total apresiasi desain anda akan ditransfer 
                ke akun bank yang telah Anda daftarkan  dan akan ditransfer setiap bulannya</Text>
                </View>

                <View style={{ flex: 1, height: 400, marginRight: 10, marginLeft: 10,  }}>


                    <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
                        <Text style={{ paddingLeft: 5, fontSize: 15, fontFamily: 'Quicksand-Regular', color: 'gray', }}>Nama akun APAPUN anda  : <Text style={{ color: 'gray', fontSize: 15, fontFamily: 'Quicksand-Bold' }}>Gal Gadot </Text> </Text>
                    </View>

                    <View style={{ flex: 1, flexDirection: 'row' }}>

                        <View style={{ flex: 1 }}>
                            <Text style={{ paddingLeft: 5, fontSize: 15, fontFamily: 'Quicksand-Bold', color: 'black' }}>Nama Depan</Text>

                            <ContainerSection>
                                <Input
                                    value={firstName}
                                    onChangeText={v => this.onChangeInput('firstName', v)}
                                    placeholder='First Name'

                                />
                            </ContainerSection>

                        </View>

                        <View style={{ flex: 1 }}>
                            <Text style={{ paddingLeft: 5, fontSize: 15, fontFamily: 'Quicksand-Bold', color: 'black' }}>Nama Belakang</Text>
                            <ContainerSection>
                                <Input
                                    value={lastName}
                                    onChangeText={v => this.onChangeInput('lastName', v)}
                                    placeholder='Last Name'
                                />
                            </ContainerSection>
                        </View>
                    </View>

                    <View style={{ flex: 1, }}>
                        <Text style={{ paddingLeft: 5, fontSize: 15, fontFamily: 'Quicksand-Bold', color: 'black', marginTop: 5 }}>Nomor Rekening</Text>
                        <ContainerSection>
                            <Input
                                value={accountHolderNumber}
                                onChangeText={v => this.onChangeInput('accountHolderNumber', v)}
                                placeholder='Holder Number'
                                keyboardType='numeric'
                            />
                        </ContainerSection>
                    </View>

                    <ContainerSection>
                        <View style={styles.pickerContainer}>
                            <Text style={styles.pickerTextStyle}>Nama Bank</Text>
                            <View style={styles.pickerStyle}>
                                <Picker
                                    selectedValue={bankName}
                                    onValueChange={(v) => this.onChangeInput('bankName', v)}
                                >
                                    <Picker.Item label='Pilih Nama Bank' value='0' style={{ fontFamily: 'Quicksand-Regular' }} />
                                    {this.renderBank()}
                                </Picker>
                            </View>
                        </View>
                    </ContainerSection>

                    <View style={{ flex: 1, marginBottom: 20 }}>
                        <Text style={{ paddingLeft: 5, fontSize: 15, fontFamily: 'Quicksand-Bold', color: 'black' }}>Cabang</Text>
                        <ContainerSection>
                            <Input
                                value={bankBranch}
                                multiline
                                onChangeText={v => this.onChangeInput('bankBranch', v)}
                                placeholder='Branch Bank'
                            />
                        </ContainerSection>
                    </View>
                </View>

                <View style={{ flex: 1, height: 600, marginRight: 10, marginLeft: 10, }}>
                    <View style={{ flex: 1, }}>
                        <Text style={{ paddingLeft: 5, fontSize: 15, fontFamily: 'Quicksand-Bold', color: 'black' }}>Foto Profil Asli</Text>
                        <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
                            <TouchableWithoutFeedback
                                onPress={this.getPhotoProfile.bind(this)}>
                                <View>
                                    {
                                        uriFoto == '' ?

                                            <Image
                                                style={{ height: 140, width: 140, alignSelf: 'center' }}
                                                source={require('./../assets/images/pengaturan-bank/persegi.png')}
                                                resizeMode='contain'
                                            />
                                            :
                                            <Image
                                                style={{ height: 165, width: 165, alignSelf: 'center' }}
                                                resizeMode='cover'
                                                source={uriFoto}
                                            />
                                    }
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>

                    <View style={{ flex: 1, }}>
                        <Text style={{ paddingLeft: 5, fontSize: 15, fontFamily: 'Quicksand-Bold', color: 'black' }}>KTP</Text>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignContent: 'center' }}>
                            <TouchableWithoutFeedback
                                onPress={this.getPhotoKTP.bind(this)}>
                                {
                                    uriKTP == '' ?

                                        <Image
                                            style={{ height: 160, width: '100%', alignSelf: 'center' }}
                                            source={require('./../assets/images/pengaturan-bank/persegi_panjang.png')}
                                            resizeMode='contain'
                                        />
                                        :
                                        <Image
                                            style={{ height: 160, width: '100%', alignSelf: 'center' }}
                                            resizeMode='cover'
                                            source={uriKTP}
                                        />
                                }
                            </TouchableWithoutFeedback>
                        </View>
                    </View>

                    <View style={{ flex: 1, }}>
                        <Text style={{ paddingLeft: 5, fontSize: 15, fontFamily: 'Quicksand-Bold', color: 'black' }}>Foto Buku Rekening</Text>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignContent: 'center', }}>
                            <TouchableWithoutFeedback
                                onPress={this.getBankBook.bind(this)}
                            >
                                {
                                    uriRekening == '' ?

                                        <Image
                                            style={{ height: 160, width: '100%', alignSelf: 'center' }}
                                            source={require('./../assets/images/pengaturan-bank/persegi_panjang.png')}
                                            resizeMode='contain'
                                        />
                                        :
                                        <Image
                                            style={{ height: 160, width: '100%', alignSelf: 'center' }}
                                            resizeMode='cover'
                                            source={uriRekening}
                                        />
                                }
                            </TouchableWithoutFeedback>
                        </View>

                    </View>
                </View>

                <View style={{ flex: 1, height: 80, marginRight: 10, marginLeft: 10 }}>
                    <View style={{ flex: 1, }}>
                        <Text style={{ paddingLeft: 5, fontSize: 15, fontFamily: 'Quicksand-Bold', color: 'black' }}>Kode Verifikasi</Text>
                        <ContainerSection>
                            <Input
                                value={code}
                                onChangeText={v => this.onChangeInput('code', v)}
                                placeholder='Input Code Confirmation'
                            />
                        </ContainerSection>
                    </View>
                </View>

                <View style={{ flex: 1, height: 80, marginRight: 10, marginLeft: 10, }}>
                    {
                        loadingCode ?
                            <Spinner size="small" />
                            :
                            <TouchableOpacity
                                style={{ flex: 1 }}
                                onPress={() => {
                                    this.sendCode();
                                }}
                            >
                                <View style={{ flex: 1, height: 10, backgroundColor: 'black', justifyContent: 'center', marginTop: 10, marginBottom: 20, borderRadius: 50 }}>
                                    <Text style={{ textAlign: 'center', fontSize: 15, fontFamily: 'Quicksand-Bold', color: 'white' }}>Kirim Kode Verifikasi</Text>
                                </View>
                            </TouchableOpacity>
                    }
                </View>

                <View style={{ flex: 1, height: 50, marginRight: 10, marginLeft: 15, justifyContent: 'center' }}>
                    <CheckBox
                        containerStyle={{ backgroundColor: 'transparent', borderColor: 'transparent' }}
                        title={<Text style={{ color: 'black', fontSize: 13, paddingLeft: 5, color: 'black' }}> Setuju dengan <Text onPress={() => this.props.navigation.navigate('TermsAndAgreement')} style={{ textDecorationLine: 'underline', color: 'red', fontSize: 13 }}>Syarat & Ketentuan</Text>
                        </Text>}
                        checked={agree}
                        onPress={() => this.checkedAgreement()}
                    />
                </View>

                <View style={{ flex: 1, height: 80, marginRight: 5, marginLeft: 10, }}>
                    {
                        loadingOk ?
                            <Spinner size="small" />
                            :
                            <TouchableOpacity
                                style={{ flex: 1 }}
                                onPress={() => {
                                    if (code === '') {
                                        return ToastAndroid.show('Code Konfirmasi Tidak Boleh Kosong', ToastAndroid.SHORT);
                                    } else {
                                        this.checkValidation();
                                    }
                                }}
                            >
                                <View style={{ flex: 1, height: 10, backgroundColor: '#ef1c25', justifyContent: 'center', marginTop: 10, marginBottom: 20, borderRadius: 50 }}>
                                    <Text style={{ textAlign: 'center', fontSize: 15, fontFamily: 'Quicksand-Bold', color: 'white' }}>OK</Text>
                                </View>
                            </TouchableOpacity>
                    }
                </View>
            </ScrollView >
        )
    }
}

const styles = StyleSheet.create({
    pickerStyle: {
        borderColor: '#a9a9a9',
        borderRadius: 3,
        paddingLeft: 5,
        borderWidth: 1
    },
    pickerContainer: {
        flex: 1,
        marginBottom: 5
    },
    pickerTextStyle: {
        fontFamily: 'Quicksand-Bold',
        color: 'black',
        fontSize: 15,
        marginTop: 7,
        marginBottom: 7
    },
})

export default PengaturanBankPage