import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, SafeAreaView,View, Alert, Image, FlatList, ScrollView, TouchableOpacity, TextInput, Modal, Animated } from 'react-native';
import {Component} from "react"

import {styles} from "../css/estilo"
import {Cards} from "../components/cards"
import {DetalleDeContacto} from "../components/detalleDeContacto"
import {CardImportadas} from "../components/cardImportadas"
import Asyncstorage from "@react-native-async-storage/async-storage"
import { Ionicons } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
export  class ContactosImportados extends Component{
  constructor(props){
    super(props);
    this.state={
                contactos: [],
                apiImportada:  [],
                misContactos: [],
                contactosBorrados: [],
                text: "",
                contactosOriginal: [],
              
                comentarios: " ",
                toValue: 1,
                toPosition: 250,
              


    
    }
  }

  position = new Animated.Value(0);
  topDown = () => {
    Animated.timing (this.position, {
            toValue: this.state.toPosition,
            duration: 1000,
            useNativeDriver: true,
    }) .start()

    if(this.state.toPosition === 250 ) { 
    this.setState({toPosition: this.state.toPosition - 250,})
  } else {
    this.setState({toPosition: this.state.toPosition + 250, })
  }
}

  componentDidMount () {
    this.unsuscribe = this.props.navigation.addListener( "focus", () => {

      this.getMyContactsStorage();
      this.getBorrados();
      
   })
   
}
componentWillUnmount(){
        this.unsuscribe()
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
showModal (item){
    this.setState({itemModal: item, showModal: !this.state.showModal})
}

  borrar = async (value)  => {
    try {         
      console.log(value.comentarios);
    

          
            this.state.contactosBorrados.push(value)
           const borrados = JSON.stringify(this.state.contactosBorrados)
           await Asyncstorage.setItem( "@misContactosBorrados" , borrados)

            let resultado = this.state.misContactos.filter ((item) => {
              return item.login.uuid !== value.login.uuid
            })
             this.setState({misContactos:resultado})

          const jsonValue = JSON.stringify(resultado)
           await Asyncstorage.setItem( "@myContacts" , jsonValue)
          

}catch (error){
  console.log(error);
}
    };   

 searchFirstName(text) {
      
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
 searchLastName(text) {
      
  if(text.length !== 0) { 
const newData = this.state.misContactos.filter(item => {
const itemData = item.name.last.toUpperCase();
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

searchCity(text) {
      
  if(text.length !== 0) { 
const newData = this.state.misContactos.filter(item => {
const itemDataCity = item.location.city.toUpperCase();
const itemDataCountry = item.location.country.toUpperCase();
const textData = text.toUpperCase();
const campo = itemDataCity+" "+itemDataCountry
return campo.indexOf(textData) > -1
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

 
 async getMyContactsStorage () {
    try{
      const value = await Asyncstorage.getItem("@myContacts");
   
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
  
            alert("El contacto se mando a la papelera de reciclaje")
            this.state.contactosBorrados.push(value)
     
          const jsonValue = JSON.stringify(this.state.contactosBorrados)
         
            await Asyncstorage.setItem( "@misContactosBorrados" , jsonValue)
      
            
  
    }catch (error){
      console.log(error);
    }
  }

    storageComentarios = async (value, comentarios) => {
    try{
        
   Object.assign(value, 
            {
                comentarios: comentarios  });
          
                const jsonValue = JSON.stringify(this.state.misContactos)
                await Asyncstorage.setItem( "@myContacts" , jsonValue)


    }catch (error){
      console.log(error);
    }
  }
 
   
keyExtractor = (item ,idx) => idx.toString();
       renderItem = ({item}) => {

              return ( 
                          <CardImportadas item= {item} pasarComentario={this.storageComentarios} pasarBorrar={this.borrar} />

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
    

                        <Animated.View style ={ { 
                                  
                                    position: 'absolute',
                                    top: -200,
                                    flex:1,
                                    transform: [
                                        {translateY: this.position}
                                    ]
                                  }  }  >
                            <TextInput  keyboardType="default"
                                      placeholder="Filtrar por nombre"
                                      placeholderTextColor={'white'}
                                      style={styles.estiloInput}
                                      onChangeText={(text) => this.searchFirstName(text) }
                          /> 
                            <TextInput  keyboardType="default"
                                      placeholder="Filtrar por apellido"
                                      placeholderTextColor={'white'}
                                      style={styles.estiloInput}
                                      onChangeText={(text) => this.searchLastName(text) }
                          /> 
                          <TextInput  keyboardType="default"
                                      placeholder="Filtrar por pais/ciudad"
                                      placeholderTextColor={'white'}
                                      style={styles.estiloInput}
                                      onChangeText={(text) => this.searchCity(text) }
                          /> 
                  </Animated.View>

 
                      <TouchableOpacity style={{marginTop:3}} onPress= {()=> this.topDown()}>
                               <Text> <AntDesign name="filter" size={24} color="white" /></Text>
                      </TouchableOpacity>
             
             
                          <Animated.View style ={ { 
                                          marginTop: 10,
                                          flex:1,
                                        
                                          transform: [
                                              {translateY: this.position}
                                          ]
                                        } }  >
                                    
                                      <FlatList
                                                data= {this.state.misContactos}
                                                renderItem={this.renderItem}
                                                keyExtractor={this.keyExtractor}
                                              
                                      /> 

                          </Animated.View>
            
           
          </SafeAreaView>
  </>

  
  )
}

 }

