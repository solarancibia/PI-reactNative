import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View, Alert, Image, FlatList, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
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
                activity: false,
                numeroDePersonas: " ",
                numeroDeImportados: "0"

    
    }
  }

  
 async storageObject (value) {
   try{
        
        const jsonValue = JSON.stringify(value); 
         await Asyncstorage.setItem( "@myObject" , jsonValue)
 
   }catch (error){
     console.log(error);
   }
 }
 
 

  async storageContact (value) {
    try{
        const id = value.login.uuid
        
        if (this.state.importados.map(x => x.login.uuid).indexOf(id)===-1) {
          
            alert("The selected contact has been imported")
         
            this.state.importados.push(value)
            const jsonValue = JSON.stringify(this.state.importados)
            await Asyncstorage.setItem( "@myContacts" , jsonValue)
                let cantidadDeImportados = this.state.importados.length
                this.setState({numeroDeImportados: cantidadDeImportados})
         /*   let resultado = this.state.contactos.filter ((item) => {
                return item.login.uuid !== value.login.uuid
              })
          
          this.setState({contactos:resultado})

          */



          }
          else {
            
            alert("The selected contact has been removed")
              
            this.state.importados.splice(this.state.importados.indexOf(value.login.uuid),1)   
            const jsonValue = JSON.stringify(this.state.importados)  
          await Asyncstorage.setItem( "@myContacts" , jsonValue)
          }
        
   }catch (error){
      console.log(error);
    }
  }
 
 cargarPersonas() {
    
    this.getDataFromApi()
    this.setState({activity: true})
    
 }
 async getDataFromApi (){
     let personas = await getData()
     this.setState({contactos : personas, apiImportada: personas, activity: false})
     
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
                          
                        
                          
                            <TouchableOpacity onPress= {()=> this.storageContact(item)}>
                            <Text> Guardar contacto! </Text>
                            </TouchableOpacity>

                           
                           
                          

               

                </View>
            )
        }

        componentDidMount () {
         
           
        }



 render() { 
 

  return (

    <View style={styles.container}>



        <TextInput  keyboardType="number-pad"
                      placeholder="Ingresa la cantidad de personas"
                     
                      onChangeText={text=> this.setState({numeroDePersonas : text})}
          /> 

                    <TouchableOpacity style= {styles.touchable} onPress={this.cargarPersonas.bind(this)}>
                            <Text>Cargar personas </Text>
                    </TouchableOpacity>

                    <Text> Cantidad de importados : {this.state.numeroDeImportados} </Text>
       
                           <View>  
                            { this.state.activity

                            ? <ActivityIndicator
                                        color= "blue"
                                        size={60}
                                       
                            />  
        
                            :  <FlatList
                        data= {this.state.contactos}
                        renderItem={this.renderItem}
                        keyExtractor={this.keyExtractor}
                        
                        /> 


         }

</View>
         

        
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
    },
    touchable: {
        marginTop: 50,
    }

  });