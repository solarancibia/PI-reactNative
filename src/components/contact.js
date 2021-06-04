import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View, Alert, Image, FlatList, TouchableOpacity, TextInput } from 'react-native';
import {Component} from "react"
import {getData} from "../api/RandomUsers"
import Asyncstorage from "@react-native-async-storage/async-storage"
export  class Contact extends Component{
  constructor(props){
    super(props);
    this.state={
                contactos: [],
                apiImportada: [],
                importados: [],

    
    }
  }

  
 async storageObject (value) {
   try{
        console.log(this.state.apiImportada);
        const jsonValue = JSON.stringify(value); 
         await Asyncstorage.setItem( "@myObject" , jsonValue)
 
   }catch (error){
     console.log(error);
   }
 }
 
 




  async storageString (value) {
    try{
        const id = value.login.uuid
        

        if (this.state.importados.map(x => x.login.uuid).indexOf(id)===-1) {
            alert("The selected movie has been saved in your favorite movies")
            this.state.importados.push(value)

            console.log(this.state.importados);
            
          const jsonValue = JSON.stringify(this.state.importados)
         
            await Asyncstorage.setItem( "@myContacts" , jsonValue)
          }
          else {
            
            alert("The selected movie has been removed from your favorite movies")
            
            
            this.state.importados.splice(this.state.importados.indexOf(value.login.uuid),1)
           
            const jsonValue = JSON.stringify(this.state.importados)
                   
       
         
          await Asyncstorage.setItem( "@myContacts" , jsonValue)
          }
        
   }catch (error){
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

                            <TouchableOpacity onPress= {()=> this.storageString(item)}>
                            <Text> Guardar contacto! </Text>
                            </TouchableOpacity>
                           
                          
        <Text>     
                   {this.state.importados}
                          </Text>

                      

                </View>
            )
        }

        componentDidMount () {
         
            getData()
            .then(results => {
                this.setState({contactos : results, apiImportada: results})
            })
           
        }



 render() { 
 

  return (

    <View style={styles.container}>
        

         
       



   
   
    <FlatList
                        data= {this.state.contactos}
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