import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View, Alert, Image, FlatList, TouchableOpacity, TextInput } from 'react-native';
import {Component} from "react"
import {getData} from "../api/RandomUsers"
import {styles} from "../css/estilo"
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
    this.unsuscribe = this.props.navigation.addListener( "focus", () => {
      this.getBorrados();
      this.getMyContactsStorage();
    })  
}
componentWillUnmount(){
        this.unsuscribe()
}

async getMyContactsStorage () {
  try{
    const value = await Asyncstorage.getItem("@myContacts");
   

    if(value !== null){
      const contactos_recuperados = JSON.parse(value);
      this.setState({ misContactos: contactos_recuperados})
      
    } else {
      console.log("No existe nada");
    }
  } catch (error){
    console.log(error);
  }
}

async removeTodos (key){
    try{

        await Asyncstorage.removeItem(key)
        let resultado = [];
        const jsonValue = JSON.stringify(resultado)
        await Asyncstorage.setItem( "@misContactosBorrados" , jsonValue)


         this.setState({contactosBorrados:  [] })
        } catch(error){
        console.log(error);
      }
    
}

  async getBorrados () {
   
    try{

     const value = await Asyncstorage.getItem("@misContactosBorrados");
   
        
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
async recuperarContacto(value){
  try{

  
      let resultado = this.state.contactosBorrados.filter ((item) => {
          return item.login.uuid !== value.login.uuid
        })
     
        this.setState({contactosBorrados:resultado})

        const borrados = JSON.stringify(resultado)
        await Asyncstorage.setItem( "@misContactosBorrados" , borrados)
      
        this.state.misContactos.push(value)

        const jsonValue = JSON.stringify(this.state.misContactos)

      await Asyncstorage.setItem( "@myContacts" , jsonValue)


  } catch(error){
    console.log(error);
  }
}



        keyExtractor = (item ,idx) => idx.toString();
        renderItem = ({item}) => {
            return (
                
                
                <View>
                        <View style={styles.card}> 
                        <Image style={styles.image} source={{uri: item.picture.thumbnail}} />       
                            <Text> {item.name.first}</Text> 
                            <Text> {item.name.last} </Text>
                            <Text> {item.email}</Text> 
                            <Text> {item.dob.date.substring(0,10)} - {item.dob.age} años </Text>
                          
                           
                            <TouchableOpacity onPress= {()=> this.removeItem(item)}>  
                                <Text> borrar! </Text>
                            </TouchableOpacity>
                         
                           <TouchableOpacity onPress= {()=> this.recuperarContacto(item)}>
                              <Text> Recuperar contacto! </Text>
                          </TouchableOpacity>
                          </View>
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
                 /> 
        
    </View>


  
  )
}

 }


/*
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
  */