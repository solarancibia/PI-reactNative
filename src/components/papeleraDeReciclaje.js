import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View, Alert, Image, FlatList, TouchableOpacity, TextInput } from 'react-native';
import {Component} from "react"
import {getData} from "../api/RandomUsers"
import Asyncstorage from "@react-native-async-storage/async-storage"
export  class PapeleraDeReciclaje extends Component{
  constructor(props){
    super(props);
    this.state={
                contactos: [],
                apiImportada:  [],
                misContactos: [],
                contactosBorrados: [],

    
    }
  }
  componentDidMount () {
    this.getBorrados();
 
     
   
}


async removeTodos (key){
    try{

        await Asyncstorage.removeItem(key)
        
      
          this.setState({contactosBorrados:  [] })
        } catch(error){
        console.log(error);
      }
    
}

  async getBorrados () {
   
    try{

     const value = await Asyncstorage.getItem("@misContactosBorrados");
     console.log(value);
        
     if(value !== null){
     
        const objeto_recuperado = JSON.parse(value);
        this.setState({contactosBorrados: objeto_recuperado})
     
    } else {
    
        console.log("No existe nada");
     }
   } 
   catch (error){
     console.log(error);
   }
 }
 async removeItem(value){
    try{

      //  await Asyncstorage.removeItem(key)

        let resultado = this.state.contactosBorrados.filter ((item) => {
            return item.login.uuid !== value.login.uuid
          })
      
          this.setState({contactosBorrados:resultado})
    
          const jsonValue = JSON.stringify(resultado)
        await Asyncstorage.setItem( "@misContactosBorrados" , jsonValue)




    } catch(error){
      console.log(error);
    }
}


        keyExtractor = (item ,idx) => idx.toString();
        renderItem = ({item}) => {
            return (
                
                
                <View>

                        <Image style={styles.image} source={{uri: item.picture.thumbnail}} />       
                            <Text> {item.name.first}</Text> 
                            <Text> {item.name.last} </Text>
                            <Text> {item.email}</Text> 
                            <Text> {item.dob.date.substring(0,10)} - {item.dob.age} años </Text>
                          
                        
                            <TouchableOpacity
                                  
                                  onPress={()=> Alert.alert(
                                      "Edad: " + item.dob.age,
                                       "Email: " + item.email,
                                   /*   "Direccion: " + item.location.street.name + item.location.street.number,
                                      "Estado: " + item.location.state + item.location.city + item.location.postcode,
                                      "Fecha: " + item.registered.date.substring(0,10),
                                      "Teleono: " + item.phone,

                                      */

                                      
                                      
                                      )}       
                            >
                                <Text>Ver detalle</Text>
                            </TouchableOpacity>

                            
                            <TouchableOpacity onPress= {()=> this.removeItem(item)}>
                           
                           <Text> borrar! </Text>
                          
                           </TouchableOpacity>
                           
                </View>
            )
        }

       



 render() { 
 

  return (

    <View style={styles.container}>
        

         
        <TouchableOpacity onPress= {()=> this.removeTodos("@misContactosBorrados")}>
                           
                           <Text> Borrar todos! </Text>
                          
                           </TouchableOpacity>



   
   
    <FlatList
                        data= {this.state.contactosBorrados}
                        renderItem={this.renderItem}
                        keyExtractor={this.keyExtractor}
            > 


        </FlatList>

        
  </View>


  
  )
}

 }



 const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 10,
    },
    image: {
        height: 100,
        width: 100,
    }
  });