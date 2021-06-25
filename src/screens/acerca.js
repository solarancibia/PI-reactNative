import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {styles} from "../css/estilo"
import { Button, StyleSheet, Text, Image, View, Animated, TouchableOpacity, SafeAreaView } from 'react-native';
import {Component} from "react"
import { Easing } from 'react-native-reanimated';
import { useFonts } from '@expo-google-fonts/dev';
import { Entypo } from '@expo/vector-icons';
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
                image: "https://www.mvp2kcaribe.com/uploads/monthly_2017_08/L.png.07e2aabcbdfc1424952af32245ba6729.png",
               
                id: 1,  },
                {
                    nombre: "Sol",
                    apellido: "R. Arancibia",
                    edad: 20,
                    date: "16/01/2001",
                    image: "https://static.wikia.nocookie.net/scott-the-woz/images/f/f4/ScottsStash2015.png/revision/latest?cb=20201129124027",
                    id: 2,
                },
                {
                    nombre: "Camille",
                    apellido: "Sigmaringo",
                    edad: 21,
                    date: "20/07/1999",
                    image:"https://studiosol-a.akamaihd.net/uploadfile/cifraclub/avatar/7/9/49oitymwbwz.jpg",
                    id: 3,
                }
            
            
            ]   
        }
      }
    
      
  render() { 

 
    return (
       
       
 <>
     <SafeAreaView style={styles.topSafeArea} />
         <SafeAreaView style={styles.container}>
              <StatusBar style="light"  />
        
                          <View style={{height:30, width: "100%", backgroundColor: "#03BFCB", position: "absolute", top: 0,}}>
                                
                                    <TouchableOpacity onPress= { () => this.props.navigation.openDrawer()}>   
                                             <Text> <Entypo name="menu" size={24} color="white" /></Text>
                                    </TouchableOpacity>
                             </View>
 
 

                        <Text style={{fontSize:30, color:"white", alignSelf:"center"}}>¿Quiénes somos?</Text>
 
                                 {
                                     this.state.nosotros.map((item, key) => {
                     
                
              return (  <Nosotros style={styles.estiloTexto} item={item} delay={800* item.id} key={key} /> )
             
                                                                            
                                                                            })
                                }

    
      
      </SafeAreaView>
  </>


    )      
 }
       
 }

