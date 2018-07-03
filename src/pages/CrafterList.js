import React, { Component } from 'react'
import { View, Text, ImageBackground, Image, AsyncStorage, TouchableOpacity, ScrollView, StyleSheet, TouchableHighlight, TouchableWithoutFeedback, StatusBar, Modal } from 'react-native'
import { Container, ContainerSection, Button, Input, InputDate, InputSearch } from '../components/common';
// import axios from 'axios';
import { COLOR } from './../shared/config';
import { BerandaCrafterPage } from './BerandaCrafter';
import { FashionCrafterPage } from './FashionCrafter';
import { FurnitureCrafterPage } from './FurnitureCrafter';
import { BeautyCrafterPage } from './BeautyCrafter';
// import { NavigationActions } from 'react-navigation';


export class CrafterListPage extends React.Component {

    static navigationOptions = {
        headerTitle: 'Crafter List'
    }

    constructor(props) {
        super(props)
        this.state = {
            screen: ''
        }
    }

    componentWillMount() {
        if (!this.props.navigation.state.params) {
            console.log('Params tidak ada')
            this.setState({ screen: 'BerandaCrafterPage' })
        } else {
            console.log('Params Ada')
            this.setState({ screen: this.props.navigation.state.params.screenDefault })
        }
    }

    renderScreen = () => {
        if (this.state.screen === 'FurnitureCrafterPage') {
            return <FurnitureCrafterPage navi={this.props.navigation} />
        }
        if (this.state.screen === 'FashionCrafterPage') {
            return <FashionCrafterPage navi={this.props.navigation} />
        }
        if (this.state.screen === 'BeautyCrafterPage') {
            return <BeautyCrafterPage navi={this.props.navigation} />
        }

        return <BerandaCrafterPage navi={this.props.navigation} />
    }



    render() {

        const {
            screen,
        } = this.state;

        const {
            tabContainerActive, tabContainer
        } = styles;


        return (

            <View style={{
                flex: 1,
            }}>



                <View style={{
                    // backgroundColor: 'red',
                    width: '100%',
                    height: 50,
                    flexDirection: 'row',
                    // flex:4,
                }}>
                    <ScrollView
                        horizontal={true}
                    >
                        <View
                            style={{
                                // backgroundColor: 'skyblue',
                                width: 90,
                                height: 50,
                                flexDirection: 'row',
                                // flex:4,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                            <TouchableOpacity onPress={() => this.setState({ screen: 'BerandaCrafterPage' })}>
                                <View style={screen === 'BerandaCrafterPage' ? tabContainerActive : tabContainer}>
                                    <Text>Beranda</Text>
                                </View>
                            </TouchableOpacity>

                        </View>

                        <View
                            style={{
                                // backgroundColor: 'skyblue',
                                width: 90,
                                height: 50,
                                flexDirection: 'row',
                                // flex:4,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                            <TouchableOpacity onPress={() => this.setState({ screen: 'FashionCrafterPage' })}>
                                <View style={screen === 'FashionCrafterPage' ? tabContainerActive : tabContainer}>
                                    <Text>Fashion</Text>
                                </View>
                            </TouchableOpacity>

                        </View>

                        <View
                            style={{
                                // backgroundColor: 'skyblue',
                                width: 170,
                                height: 50,
                                flexDirection: 'row',
                                // flex:4,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                            <TouchableOpacity onPress={() => this.setState({ screen: 'FurnitureCrafterPage' })}>
                                <View style={screen === 'FurnitureCrafterPage' ? tabContainerActive : tabContainer}>
                                    <Text>Furniture & Appliance</Text>
                                </View>
                            </TouchableOpacity>

                        </View>

                        <View
                            style={{
                                // backgroundColor: 'skyblue',
                                width: 90,
                                height: 50,
                                flexDirection: 'row',
                                // flex:4,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                            <TouchableOpacity onPress={() => this.setState({ screen: 'BeautyCrafterPage' })}>
                                <View style={screen === 'BeautyCrafterPage' ? tabContainerActive : tabContainer}>
                                    <Text>Beauty</Text>
                                </View>
                            </TouchableOpacity>

                        </View>
                    </ScrollView>
                </View>
                {this.renderScreen()}
            </View>
        )
    }

}

const styles = StyleSheet.create({

    imageCommercial: {
        width: '100%',
        height: '100%',
        borderRadius: 10
    },
    tabContainerActive: {
        // backgroundColor: COLOR.element_a4,
        height: 50,
        justifyContent: 'center',
        borderBottomWidth: 2,
        borderColor :'red'
    },
    tabContainer: {
        // backgroundColor: COLOR.element_a3,
        height: 50,
        justifyContent: 'center',
        // borderBottomWidth: 1,
    },
});

export default CrafterListPage
