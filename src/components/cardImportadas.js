import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {styles} from "../css/estilo"
import { Button, StyleSheet, Text, Image, Animated, TouchableOpacity, View, TextInput } from 'react-native';
import {Component} from "react"
import { Ionicons } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import {DetalleDeContacto} from "./detalleDeContacto"
import {Cards} from "./cards"
import { MaterialCommunityIcons } from '@expo/vector-icons';
export  class CardImportadas extends Component{
  constructor(props){
    super(props);
    this.state = {
        comentarios: " ",
        toValue: 1,
    }
  }
  

  rotation= new Animated.Value(0);

  rotate = () => {
    Animated.timing(this.rotation, {
        toValue: this.state.toValue,
        duration: 1000,
        useNativeDriver: true,
    }) .start()
    this.setState({toValue: this.state.toValue + 1})
  }
  async storageComentarios (value) {
    try{
       
        
    
   Object.assign(value, 
            {
                comentarios: this.state.comentarios  });
          
                const jsonValue = JSON.stringify(this.state.misContactos)
                await Asyncstorage.setItem( "@myContacts" , jsonValue)


    }catch (error){
      console.log(error);
    }
  }
  
      
  render() { 

    
    const rotA = this.rotation.interpolate({
        inputRange: [0,1],
        outputRange: ["0deg", "180deg"]
    })
    const rotB = this.rotation.interpolate({
      inputRange: [0,1],
      outputRange: ["180deg", "0deg"]
    })
    
            return (
                

              <>
    <TouchableOpacity key={this.props.item.login.uuid} onPress= {this.rotate} >
                  
                  <View> 
                       <Animated.View  style={[styles.cardcontainer, {
                             backfaceVisibility: "hidden",
                              transform: [
                               {  rotateX: rotA }  ]
                                }]  } > 
                  
                                    <Cards item ={this.props.item} />  
                   
                                     <TextInput  keyboardType="default"
                                     placeholder="Ingrese algún comentario..."
                                     style={styles.estilocomment}
                                     numberOfLines={10}
                                     multiline={true}
                                     onChangeText={text=> this.setState({comentarios : text})}
                                   /> 


                                   <TouchableOpacity style= {styles.estiloButtonGhost} onPress= {()=> this.storageComentarios(this.props.item)}>
                                         <Text style= {styles.estiloTextoButtonGhost}> Guardar comentario</Text>
                                   </TouchableOpacity>
                                     
                                     <View>
                                   {/* <TouchableOpacity style={styles.botonesiconos} onPress= {()=> this.showModal(item)}>
                                   <Ionicons style= {styles.iconos} name="ios-eye-outline" size={24} color="black" />
                                   </TouchableOpacity> */}


                                   <TouchableOpacity style={styles.botonesiconos} onPress={this.props.pasarBorrar.bind(this,  this.props.item)}>
                                   <MaterialCommunityIcons style= {styles.iconos} name="recycle" size={24} color="teal" />
                                   </TouchableOpacity>
                                   </View>
                            </Animated.View>

                           <Animated.View   style={ [styles.cardcontainer ,  {
                                           position: "absolute",
                                         backfaceVisibility: "hidden",
                                         transform: [
                                         {  rotateX: rotB }  ]
                                   }   ]}  > 
                       
                                        <DetalleDeContacto item ={this.props.item} />                   

                          </Animated.View>
                 
                  </View> 
         
            </TouchableOpacity>  
 
                          
                        </>
                          
      
                        
                   
            )
        
 }
       
 }
