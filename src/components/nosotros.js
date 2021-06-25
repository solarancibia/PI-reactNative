import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {styles} from "../css/estilo"
import { Button, StyleSheet, Text, Image, View, Animated, TouchableOpacity, Modal } from 'react-native';
import {Component} from "react"
import { Easing } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFonts } from '@expo-google-fonts/dev';

export class Nosotros extends Component{
  constructor(props){
    super(props);
    this.state = {
        showModal: false,
                itemModal: null,
    }
  }
 
position = new Animated.Value(0);

showModal (item){
    this.setState({ itemModal: item, showModal: !this.state.showModal})
}
topDown = () => {
        Animated.timing (this.position, {
                toValue: 600,
                duration: 2500,
                easing: Easing.bounce,
                useNativeDriver: true,
        }) .start()
}

componentDidMount (){
    setTimeout( () => 
    this.topDown(), this.props.delay
    )
   
}
      
  render() { 

  
    
            return (
  
  
        <>
           <Animated.View style ={ [ styles.nosotroscontainer, { 
                                         transform: [
                                        {translateY: this.position}
                                         ]  
                                }]} >
                     
                                <Image style={styles.imagenAcerca} source={{uri: this.props.item.image}} />
                                 <Text style={{ color: "black", alignSelf: "center", fontSize: 20, marginTop:10}}> {this.props.item.nombre} {this.props.item.apellido}</Text>
                                            
                                <TouchableOpacity style={styles.botonesiconos} onPress= {()=> this.showModal(this.props.item)}>
                                <Ionicons style= {styles.iconos} name="ios-eye-outline" size={24} color="black" />
                                </TouchableOpacity>


                            <Modal
                                visible= {this.state.showModal}
                                animationType= "slide"
                                transparent ={true}
                                 >

                                         <View style= {styles.modalContainer}>
                                                   <View style= {styles.modal}>

                                                        {      this.state.itemModal

                                                                ? 
                                                        <>
                                                        <Text style={styles.textModal}> Me llamo {this.state.itemModal.nombre} {this.state.itemModal.apellido}, 
                                                        tengo {this.state.itemModal.edad} años y nací el {this.state.itemModal.date}  

                                                        </Text>
                                                        </>
                                                
                                                                : <Text>No hay nada</Text>

                                                         }
                                                        
                                                <Text style= {styles.closeButton}  onPress= {() => this.setState({showModal: false})} >  <EvilIcons name="close" size={24} color="black" /> </Text> 

                                                </View>
                                          </View>
                              </Modal>






                </Animated.View>
          </>
                
            )   
        
 }
       
 }

 /* 
  <View style={{alignSelf: "center"}}> 
               
                <Animated.View style ={{
                        width: 100,
                        height: 50,
                       fontSize: 40,
                        transform: [
                            {translateY: this.position}
                        ]
                }} >

                        <Text style={{ color: "white", fontSize: 20,}}> Luciano Marcogliese</Text>
                       
                </Animated.View>
                
                <Animated.View style ={{
                        width: 100,
                        height: 50,
                       
                        transform: [
                            {translateY: this.position}
                        ]
                }} >

                        <Text style={{ color: "white", fontSize: 20,}}>  Sol Arancibia</Text>
                      
                </Animated.View><Animated.View style ={{
                        width: 100,
                        height: 50,
                      
                        transform: [
                            {translateY: this.position}
                        ]
                }} >

                   
                        <Text style={{ color: "white", fontSize: 20,}}>  Camille</Text>
                </Animated.View>
             
                </View>       */