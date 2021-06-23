import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {styles} from "../css/estilo"
import { Button, StyleSheet, Text, Image,  } from 'react-native';
import {Component} from "react"

export  class DetalleDeContacto extends Component{
  constructor(props){
    super(props);
  }
  

      
  render() { 
            return (
                

                <>
                <Image style={styles.image} source={{uri: this.props.item.picture.large} } />
                <Text style={styles.estiloDatos}> {this.props.item.name.first} {this.props.item.name.last}</Text> 
                <Text  style={styles.estiloDatos}>  {this.props.item.dob.date.substring(0,10)} - {this.props.item.dob.age} años </Text> 
                <Text style={styles.estiloDatos}> {this.props.item.location.street.name} {this.props.item.location.street.number } </Text> 
                 
                <Text  style={styles.estiloDatos}> {this.props.item.registered.date.substring(0,10)}</Text> 
                <Text style={styles.estiloDatos} > {this.props.item.phone}</Text>
                <Text style={styles.estiloDatos} > {this.props.item.comentarios}</Text> 


           </>
                          
      //  <Text style={styles.estiloDatos} > {this.props.item.location.state} {this.props.item.location.city} {this.props.item.location.country} {this.props.item.location.postcode} </Text>
                        
                   
            )
        
 }
       
 }
