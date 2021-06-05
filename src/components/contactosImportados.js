import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View, Alert, Image, FlatList, TouchableOpacity, TextInput } from 'react-native';
import {Component} from "react"
import {getData} from "../api/RandomUsers"
import Asyncstorage from "@react-native-async-storage/async-storage"
export  class ContactosImportados extends Component{
  constructor(props){
    super(props);
    this.state={
                contactos: [],
                apiImportada:  [],
                misContactos: [],
                contactosBorrados: [],
                text: "",
                contactosOriginal: []

    
    }
  }
  componentDidMount () {
    this.getObjectStorage();
    this.getMyContactsStorage();
   
   
   
}


 async borrar(value){

    try{
        const id = value.login.uuid
        

        if (this.state.contactosBorrados.map(x => x.login.uuid).indexOf(id)===-1) {
            alert("El contacto se mando a la papelera de reciclaje")
        
                this.state.contactosBorrados.push(value)
                const borrados = JSON.stringify(this.state.contactosBorrados)
                await Asyncstorage.setItem( "@misContactosBorrados" , borrados)

                let resultado = this.state.misContactos.filter ((item) => {
                    return item.login.uuid !== value.login.uuid
                  })
              
              this.setState({misContactos:resultado})
              const jsonValue = JSON.stringify(resultado)
                await Asyncstorage.setItem( "@myContacts" , jsonValue)

         
            }
       /*   else {
            
            alert("El contacto se removio de la papelera de reciclaje")
            
            
            this.state.contactosBorrados.splice(this.state.contactosBorrados.indexOf(value.login.uuid),1)
           
            const jsonValue = JSON.stringify(this.state.contactosBorrados)
            await Asyncstorage.setItem( "@misContactosBorrados" , jsonValue)
          } */
        
      
             
          
  
    }catch (error){
      console.log(error);
    }








    
   
  
  
  
  
  
  
    };   

      searchData(text) {
      
            if(text.length !== 0) { 
        const newData = this.state.misContactos.filter(item => {
          const itemData = item.name.first.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1
        });
     
        this.setState({
          misContactos: newData,
          text: text
          })
        } else {
            this.setState({
                misContactos: this.state.contactosOriginal

            })
        }
 } 

  async getObjectStorage () {
   
    try{

     const value = await Asyncstorage.getItem("@myObject");
     console.log(value);
        
     if(value !== null){
     
        const objeto_recuperado = JSON.parse(value);
        this.setState({contactos: objeto_recuperado})
     
    } else {
    
        console.log("No existe nada");
     }
   } 
   catch (error){
     console.log(error);
   }
 }
  
 async getMyContactsStorage () {
    try{
      const value = await Asyncstorage.getItem("@myContacts");
      console.log(value);
  
      if(value !== null){
        const contactos_recuperados = JSON.parse(value);
        this.setState({ misContactos: contactos_recuperados, contactosOriginal: contactos_recuperados})
      } else {
        console.log("No existe nada");
      }
    } catch (error){
      console.log(error);
    }
  }

  async storageBorrados (value) {
    try{
        const id = value.login.uuid
        

        if (this.state.contactosBorrados.map(x => x.login.uuid).indexOf(id)===-1) {
            alert("El contacto se mando a la papelera de reciclaje")
            this.state.contactosBorrados.push(value)
     
          const jsonValue = JSON.stringify(this.state.contactosBorrados)
         
            await Asyncstorage.setItem( "@misContactosBorrados" , jsonValue)
          }
          else {
            
            alert("El contacto se removio de la papelera de reciclaje")
            
            
            this.state.contactosBorrados.splice(this.state.contactosBorrados.indexOf(value.login.uuid),1)
           
            const jsonValue = JSON.stringify(this.state.contactosBorrados)
            await Asyncstorage.setItem( "@misContactosBorrados" , jsonValue)
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

                            
                            <TouchableOpacity onPress= {()=> this.borrar(item)}>
                           
                            <Text> Borrar </Text>
                           
                            </TouchableOpacity>



                        

                           
                </View>
            )
        }

       



 render() { 
 

  return (

    <View style={styles.container}>
        

         
       
        <TextInput  keyboardType="default"
                      placeholder="Ingresa tu nombre"
                
                      onChangeText={(text) => this.searchData(text) }
          /> 


   
   
    <FlatList
                        data= {this.state.misContactos}
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