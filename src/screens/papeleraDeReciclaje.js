import { StatusBar } from 'expo-status-bar';
import { Entypo } from '@expo/vector-icons';
import React from 'react';
import { Button, StyleSheet, Text, View, Alert, Image, FlatList, TouchableOpacity, TextInput,SafeAreaView, } from 'react-native';
import {Component} from "react"

import {getData} from "../api/RandomUsers"
import {styles} from "../css/estilo"
import Asyncstorage from "@react-native-async-storage/async-storage"
import { Ionicons } from '@expo/vector-icons';
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
      Alert.alert(
        "Contactos eliminados",
        "Los elementos se han eliminado permanentemente" ,
        [
          
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      );
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
      Alert.alert(
        "Contacto eliminado",
        "El elemento se ha eliminado permanentemente" ,
        [
          
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      );
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
      console.log(value.comentarios);
    Alert.alert(
      "Contacto recuperado",
      "El elemento se ha mandado a -Mis Contactos- " ,
      [
        
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );

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
                    <View style={styles.cardcontainer}> 
                        
                            <Image style={styles.image} source={{uri: item.picture.large}} />       
                                <Text style={styles.estiloDatos}> {item.name.first} {item.name.last}</Text> 
                                <Text style={styles.estiloDatos}> {item.email}</Text> 
                                <Text style={styles.estiloDatos}> {item.dob.date.substring(0,10)} - {item.dob.age} años </Text>
                              
                           <TouchableOpacity onPress= {()=> this.removeItem(item)}>  
                                 <Ionicons style= {styles.iconos} name="md-trash-outline" size={24} color="black" />
                             </TouchableOpacity>
                         
                           <TouchableOpacity style={styles.estiloButtonGhost} onPress= {()=> this.recuperarContacto(item)}>
                              <Text style= {styles.estiloTextoButtonGhost}> Recuperar contacto!</Text>
                          </TouchableOpacity>
                      </View>
                </View>
            )
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

                  <TouchableOpacity style={styles.estiloButtonBorrado} onPress= {()=> this.removeTodos("@misContactosBorrados")}>
                              <Text style= {styles.estiloTextoButton}> Borrar todos</Text>
                    </TouchableOpacity>
          
                       <View style={{flex:1}}>   
                                
                                <FlatList
                                            data= {this.state.contactosBorrados}
                                            renderItem={this.renderItem}
                                            keyExtractor={this.keyExtractor}
                                    /> 
                        </View>
                  
         
       </SafeAreaView>
  </>

  

  
  )
}

 }
