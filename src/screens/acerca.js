import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {styles} from "../css/estilo"
import { Button, StyleSheet, Text, Image, View, Animated, TouchableOpacity  } from 'react-native';
import {Component} from "react"
import { Easing } from 'react-native-reanimated';
import { useFonts } from '@expo-google-fonts/dev';
import {Nosotros} from "../components/nosotros"
export  class Acerca extends Component{
  
    constructor(props){
        super(props);
        this.state={
            nosotros : [ {
                nombre: "Luciano",
                apellido: "Marcogliese",
                edad: 20,
                date:"15/01/2001",
               
                id: 1,  },
                {
                    nombre: "Sol",
                    apellido: "R. Arancibia",
                    edad: 20,
                    date: "16/01/2001",
                    id: 2,
                },
                {
                    nombre: "Camille",
                    apellido: "Sigmaringo",
                    edad: 21,
                    date: "20/07/1999",
                    id: 3,
                }
            
            
            ]
            
    
        
        }
      }
    
      
  render() { 

 
    return (
 <>
 
 <View style={{ backgroundColor: "#231E39", flex: 1 }}> 

 <Text style={{fontSize:30, color:"white", marginTop: 100, alignSelf:"center"}}>¿Quiénes somos?</Text>
 
   {
            this.state.nosotros.map((item, key) => {
                     
                  
             

              return (        <Nosotros style={styles.estiloTexto} item={item} delay={800* item.id} key={key} /> 

                )
             

                
            

     
        })
    }

    
</View> 
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