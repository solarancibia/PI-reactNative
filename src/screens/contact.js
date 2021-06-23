import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View, Alert, Image, FlatList, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import {Component} from "react"
import {getData} from "../api/RandomUsers"
import {Cards} from "../components/cards"
import {styles} from "../css/estilo"
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
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



  componentDidMount () {
    
    this.unsuscribe = this.props.navigation.addListener( "focus", () => {
      let cantidadDeImportados = this.state.importados.length
      this.setState({numeroDeImportados: cantidadDeImportados})
      this.getMyContactsStorage();
   })
   
}
componentWillUnmount(){
        this.unsuscribe()
}

 /* async storageObject (value) {
   try{
        
        const jsonValue = JSON.stringify(value); 
         await Asyncstorage.setItem( "@myObject" , jsonValue)
 
   }catch (error){
     console.log(error);
   }
 }
 */
 
 async storageContact (value) {
    try{
     
          
            alert("The selected contact has been imported")
         
            this.state.importados.push(value)
          
            const jsonValue = JSON.stringify(this.state.importados)
          
            await Asyncstorage.setItem( "@myContacts" , jsonValue)
              
            let cantidadDeImportados = this.state.importados.length
            this.setState({numeroDeImportados: cantidadDeImportados})
          
            
            let resultado = this.state.contactos.filter ((item) => {
                return item.login.uuid !== value.login.uuid
              })
          
          this.setState({contactos:resultado})

        
   }catch (error){
      console.log(error);
    }
  }
 

 cargarPersonas() {
  let cantidadDeImportados = this.state.importados.length
  
    this.getDataFromApi()
    this.setState({activity: true, numeroDeImportados: cantidadDeImportados})
    
 }

 async getDataFromApi (){
     let personas = await getData(this.state.numeroDePersonas)
     this.setState({contactos : personas, apiImportada: personas, activity: false})
     
 }

 async getMyContactsStorage () {
  try{
    const value = await Asyncstorage.getItem("@myContacts");
    console.log(value);

    if(value !== null){
      const contactos_recuperados = JSON.parse(value);
      this.setState({ importados: contactos_recuperados})
    } else {
      console.log("No existe nada");
    }
  } catch (error){
    console.log(error);
  }
}


        keyExtractor = (item ,idx) => idx.toString();
        renderItem = ({item}) => {
            return (
                
             
             

                    
                   <View style={styles.cardcontainer}> 
                       
                       <Cards item ={item} />


                       
                    
                            <TouchableOpacity style={styles.estiloButtonGhost} onPress= {()=> this.storageContact(item)}>
                            <Text style= {styles.estiloTextoButtonGhost}> Guardar contacto! </Text>
                            </TouchableOpacity>
                        
                        
                      </View>
                           
                           
            
               
            )
        }

  


 render() { 
 

  return (

    <View style={styles.container}>


               
                <View style={styles.iconosjuntos}>

                    <TextInput style= {styles.estiloInput} keyboardType="number-pad"
                      placeholder="Ingresa la cantidad de personas"
                      placeholderTextColor={'white'}
                    onChangeText={text=> this.setState({numeroDePersonas : text})}
                    /> 
                    <TouchableOpacity  style={styles.cargarPersonas} onPress={this.cargarPersonas.bind(this)}>
                       <Text> <MaterialCommunityIcons name="account-plus-outline" size={30} color="white" /> </Text>
                    </TouchableOpacity>
                 </View>
           
                <TouchableOpacity disabled={true} style= {styles.estiloButton}>
                    <Text style= {styles.estiloTextoButton}> <AntDesign name="contacts" size={20} color="teal" /> : {this.state.numeroDeImportados} </Text>
                    </TouchableOpacity>
                    
                    
                
                
       
              <View style= {{flex: 1}}>  
                            { this.state.activity

                            ? 
                              <View>
                            <ActivityIndicator
                                        color= "blue"
                                        size={60}
                                       
                            />  
                                     
                                      <Text> Cargando!</Text>
                              </View>
                            
                           :  <FlatList
                          
                        data= {this.state.contactos}
                        renderItem={this.renderItem}
                        keyExtractor={this.keyExtractor}
                        
                        /> 
                        
                          }

              </View>
         
                           
             
  </View>


  
  )}
}






