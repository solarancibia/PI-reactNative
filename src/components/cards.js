import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {styles} from "../css/estilo"
import { Button, StyleSheet, Text, Image,  } from 'react-native';
import {Component} from "react"

export  class Cards extends Component{
  constructor(props){
    super(props);
  }
  

  render() { 
            return (
                

              <>
                        <Image style={styles.image} source={{uri: this.props.item.picture.large}} />       
                            <Text style={styles.estiloDatos}> {this.props.item.name.first} {this.props.item.name.last} </Text>  
                            <Text style={styles.estiloDatos}>  {this.props.item.email} </Text> 
                            <Text style={styles.estiloDatos}> {this.props.item.dob.date.substring(0,10)} - {this.props.item.dob.age} años </Text>
                          
                        </>
                          
      
                        
                   
            )
        
 }
       
 }
