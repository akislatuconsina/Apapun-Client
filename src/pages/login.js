import React, { Component } from 'react'
import { View, Text, KeyboardAvoidingView, ImageBackground, Image, AsyncStorage, TouchableOpacity, ToastAndroid, StatusBar, Keyboard, ScrollView } from 'react-native'
import { Container, ContainerSection, Button, InputLogin, Spinner } from '../components/common';
import axios from 'axios';
import { COLOR } from './../shared/config';
import { NavigationActions, StackActions } from 'react-navigation';
import { IPSERVER } from './../shared/config';

export class LoginPage extends React.Component {
	static navigationOptions = {
		header: null
	}

	constructor(props) {
		super(props)

		this.state = {
			email: '',
			password: '',
			loading: false
		}
	}

	componentDidMount() {
		AsyncStorage.removeItem('VMDDEVELOPER');
	}

	onChange = (name, value) => {
		this.setState({ [name]: value }, () => {
			console.log(this.state[name]);
		})
	}

	onLogin() {
		Keyboard.dismiss();
		const { username, password } = this.state;
		switch (username) {
			case '':
				return ToastAndroid.show('Email/Username Tidak Boleh Kosong', ToastAndroid.SHORT);
			default:
				switch (password) {
					case '':
						return ToastAndroid.show('Password Tidak Boleh Kosong', ToastAndroid.SHORT);
					default:
						console.log('Password Tidak Kosong');
						return this.onLoginFire();
				}
		}
	}

	onLoginFire = () => {
		Keyboard.dismiss();
		this.setState({ loading: true });

		const { email, password } = this.state;
		axios.post(`${IPSERVER}/ApapunUsers/UserAuth`, {
			email,
			password
		}, {
				headers: {
					'Content-Type': 'application/json',
				}
			}).then(response => {
				console.log(response.data, 'Data Login');
				const IdUser = response.data;
				AsyncStorage.setItem('VMDDEVELOPER', JSON.stringify(IdUser), () => {
					const resetAction = StackActions.reset({
						index: 0,
						actions: [NavigationActions.navigate({ routeName: 'Dashboard' })],
					});
					this.props.navigation.dispatch(resetAction);
				});
			}).catch(error => {
				console.log(error, 'ERROR LOGIN');
				this.setState({ loading: false });
				return ToastAndroid.show('Username atau Password salah', ToastAndroid.SHORT);
			});
	}

	renderButton = () => {
		if (this.state.loading) {
			return <Spinner size="small" />
		}
		return (
			<Button
				onPress={() => this.onLogin()}
				style={{ backgroundColor: 'rgb(209, 0, 0)' }}
			>
				<Text style={{ color: '#FFFFFF', fontFamily: 'Quicksand-Bold' }}>
					Login
				</Text>
			</Button>
		)
	}

	render() {
		const { email, password } = this.state;
		return (
			// <ScrollView style={{ position: 'relative' }} keyboardShouldPersistTaps="always">
				<View style={styles.container}>
					<View style={{ width: '100%', height: '100%', flex: 1, backgroundColor: 'grey', justifyContent: 'flex-start', flexDirection: 'row', position: 'relative' }} >
						<Image
							style={{ width: '100%', height: '100%', }}
							source={require('./../assets/images/bg-login.png')}
							resizeMode='stretch'
						/>
					</View>


					<View style={{ flex: 1, alignSelf: 'center', position: 'absolute', marginTop: 70, marginBottom: 60 }}>
						<Image
							style={styles.image}
							source={require('./../assets/images/apapun_logo_white.png')}
							resizeMode='contain'
						/>
					</View>

					<View style={{ flex: 1, position: 'absolute', alignSelf: 'center', width: '100%', marginTop: '75%' }}>
						<KeyboardAvoidingView>
							<Container>
								<ContainerSection>
									<InputLogin
										placeholder="Email or username"
										icon="ic_username"
										onChangeText={val => this.onChange('email', val)}
										value={email}
									/>
								</ContainerSection>

								<ContainerSection>
									<InputLogin
										secureTextEntry
										placeholder="Password"
										icon="ic_password"
										onChangeText={val => this.onChange('password', val)}
										value={password}
									/>
								</ContainerSection>

								<View style={{ flex: 1, marginLeft: 3, marginRight: 3, alignItems: 'flex-end' }}>
									<TouchableOpacity
										onPress={() => this.props.navigation.navigate('ForgotPassword')}>
										<Text style={{ color: '#FFFFFF', fontFamily: 'Quicksand-Regular', fontSize: 13 }}>
											FORGET YOUR PASSWORD?
										</Text>
									</TouchableOpacity>
								</View>

								<View style={{ marginTop: 50 }}>
									<ContainerSection>
										{this.renderButton()}
									</ContainerSection>
								</View>
							</Container>

							<View style={{ flex: 1, flexDirection: 'row', alignSelf: 'center' }}>
								<Text style={{ color: '#FFFFFF', fontFamily: 'Quicksand-Regular' }}>
									Don't have an account? {`\n`}
								</Text>
								<TouchableOpacity
									onPress={() => this.props.navigation.navigate('RegistrationBuyer')}
								>
									<Text style={{ color: '#FFFFFF', fontFamily: 'Quicksand-Bold' }}>
										Sign Up
									</Text>
								</TouchableOpacity>
							</View>
						</KeyboardAvoidingView>
					</View>
				</View>
			// </ScrollView>
		)
	}
}

const styles = {
	container: {
		flex: 1
	},
	containerImage: {
		width: '100%',
		height: null,
		flex: 1,
		justifyContent: 'center',
		alignSelf: 'center'
	},
	input: {
		height: 36,
		padding: 10,
		margin: 18,
		fontSize: 15,
		borderWidth: 1,
		borderRadius: 10,
		borderColor: '#48BBEC',
		backgroundColor: 'rgba(0,0,0,0)',
	},
	image: {
		width: 200,
		height: 150
	}
}

export default LoginPage