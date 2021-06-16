import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View, Alert, Image, FlatList, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import {Component} from "react"
import {getData} from "../api/RandomUsers"
import {Cards} from "../components/cards"
import {styles} from "../css/estilo"
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
    
    this.getDataFromApi()
    this.setState({activity: true})
    
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
                
                
                <View >

                    
                   <View style={styles.card}> 
                       
                       <Cards item ={item} />


                       
                    
                            <TouchableOpacity onPress= {()=> this.storageContact(item)}>
                            <Text> Guardar contacto! </Text>
                            </TouchableOpacity>
                        
                        
                      </View>
                           
                           
                </View>
            )
        }

  


 render() { 
 

  return (

    <View style={styles.container}>



                   <TouchableOpacity style= {styles.touchable} onPress={this.cargarPersonas.bind(this)}>
                       <Text>Cargar personas </Text>
                    </TouchableOpacity>

                    <TextInput  keyboardType="number-pad"
                      placeholder="Ingresa la cantidad de personas"
                    onChangeText={text=> this.setState({numeroDePersonas : text})}
                    /> 
           
                
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


  
  )}
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
    },
    touchable: {
        marginTop: 70,
    },
    card: {
      borderStyle: "solid",
        borderWidth: 1,
        borderColor: "grey",
      backgroundColor:"gainsboro",
      marginTop: 10,
      borderRadius: 15,
      width: "100%"

    }

  });



  */