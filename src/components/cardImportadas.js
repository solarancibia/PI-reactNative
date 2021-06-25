
import React from 'react';
import {styles} from "../css/estilo"
import { Button, StyleSheet, Text, Image, Animated, TouchableOpacity, View, TextInput } from 'react-native';
import {Component} from "react"

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
                

      <View styles={styles.containerPrueba}>
        
           <TouchableOpacity key={this.props.item.login.uuid} onPress= {this.rotate} >
                  
                     <View> 
                            <Animated.View  style={[styles.cardcontainer, {
                                     backfaceVisibility: "hidden",
                                     zIndex:1,
                                     transform: [
                                     {  rotateX: rotA }  ]
                                      }]  } > 
                  
                                          <Cards item ={this.props.item} />  
                   
                                            <TextInput  keyboardType="default"
                                            position= "relative"
                                            zIndex={2}
                                            placeholder="Ingrese algún comentario..."
                                            style={styles.estilocomment}
                                            numberOfLines={10}
                                            multiline={true}
                                            onChangeText={text=> this.setState({comentarios : text})}
                                          /> 


                                            <TouchableOpacity style= {styles.estiloButtonGhost} onPress={this.props.pasarComentario.bind(this,  this.props.item, this.state.comentarios)}>
                                                  <Text style= {styles.estiloTextoButtonGhost}> Guardar comentario</Text>
                                            </TouchableOpacity>
                                     
                                            <View>
                                 
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
 
                          
                       
       </View>
                        
                   
            )
        
 }
       
 }
