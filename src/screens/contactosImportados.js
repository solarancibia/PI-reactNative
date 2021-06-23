import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View, Alert, Image, FlatList, TouchableOpacity, TextInput, Modal, Animated } from 'react-native';
import {Component} from "react"

import {styles} from "../css/estilo"
import {Cards} from "../components/cards"
import {DetalleDeContacto} from "../components/detalleDeContacto"
import Asyncstorage from "@react-native-async-storage/async-storage"
import { Ionicons } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
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
                showModal: false,
                itemModal: null,
                comentarios: " ",
                toValue: 1,
                toPosition: 180,
              


    
    }
  }

  position = new Animated.Value(0);
  topDown = () => {
    Animated.timing (this.position, {
            toValue: this.state.toPosition,
            duration: 1000,
            useNativeDriver: true,
    }) .start()

    if(this.state.toPosition === 180 ) { 
    this.setState({toPosition: this.state.toPosition - 180,})
  } else {
    this.setState({toPosition: this.state.toPosition + 180, })
  }
}




rotation= new Animated.Value(0);

rotate = () => {
  Animated.timing(this.rotation, {
      toValue: this.state.toValue,
      duration: 1000,
      useNativeDriver: true,
  }) .start()
  this.setState({toValue: this.state.toValue + 1})
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

 async borrar(value){

    try{
    
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

searchAge(text) {
      
  if(text.length !== 0) { 
const newData = this.state.misContactos.filter(item => {

const itemData = item.dob.age.toString()

return itemData.indexOf(text) > -1
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
      //  const id = value.login.uuid
        

       // if (this.state.contactosBorrados.map(x => x.login.uuid).indexOf(id)===-1) {
            alert("El contacto se mando a la papelera de reciclaje")
            this.state.contactosBorrados.push(value)
     
          const jsonValue = JSON.stringify(this.state.contactosBorrados)
         
            await Asyncstorage.setItem( "@misContactosBorrados" , jsonValue)
       //   }
         // else {
            
        //    alert("El contacto se removio de la papelera de reciclaje")
            
            
          //  this.state.contactosBorrados.splice(this.state.contactosBorrados.indexOf(value.login.uuid),1)
           
            //const jsonValue = JSON.stringify(this.state.contactosBorrados)
            //await Asyncstorage.setItem( "@misContactosBorrados" , jsonValue)
         // }
        
      
             
          
  
    }catch (error){
      console.log(error);
    }
  }

  async storageComentarios (value) {
    try{
       
        
    
   Object.assign(value, 
            {
                comentarios: this.state.comentarios  });
          
                const jsonValue = JSON.stringify(this.state.misContactos)
                await Asyncstorage.setItem( "@myContacts" , jsonValue)


    }catch (error){
      console.log(error);
    }
  }
 
        keyExtractor = (item ,idx) => idx.toString();
    
        
        renderItem = ({item}) => {

          const rotA = this.rotation.interpolate({
            inputRange: [0,1],
            outputRange: ["0deg", "180deg"]
        })
        const rotB = this.rotation.interpolate({
          inputRange: [0,1],
          outputRange: ["180deg", "0deg"]
        })
        
          return (
                
                
         
              <TouchableOpacity key={item.login.uuid} onPress= {this.rotate} >
                  
                       <View> 
                            <Animated.View  style={[styles.cardcontainer, {
                                  backfaceVisibility: "hidden",
                                   transform: [
                                    {  rotateX: rotA }  ]
                                     }]  } > 
                       
                                         <Cards item ={item} />  
                        
                                          <TextInput  keyboardType="default"
                                          placeholder="Ingrese algún comentario..."
                                          style={styles.estilocomment}
                                          numberOfLines={10}
                                          multiline={true}
                                          onChangeText={text=> this.setState({comentarios : text})}
                                        /> 


                                        <TouchableOpacity style= {styles.estiloButtonGhost} onPress= {()=> this.storageComentarios(item)}>
                                              <Text style= {styles.estiloTextoButtonGhost}> Guardar comentario</Text>
                                        </TouchableOpacity>
                                          
                                          <View>
                                        {/* <TouchableOpacity style={styles.botonesiconos} onPress= {()=> this.showModal(item)}>
                                        <Ionicons style= {styles.iconos} name="ios-eye-outline" size={24} color="black" />
                                        </TouchableOpacity> */}


                                        <TouchableOpacity style={styles.botonesiconos} onPress= {()=> this.borrar(item)}>
                                        <MaterialCommunityIcons style= {styles.iconos} name="recycle" size={24} color="teal" />
                                        </TouchableOpacity>
                                        </View>
                                 </Animated.View>

                                <Animated.View   style={ [styles.cardcontainer ,  {
                                                position: "absolute",
                                              backfaceVisibility: "hidden",
                                              transform: [
                                              {  rotateX: rotB }  ]
                                        }   ]}  > 
                            
                                             <DetalleDeContacto item ={item} />                   

                               </Animated.View>
                      
                       </View> 
              
                 </TouchableOpacity>  
      

               
            )
        }

       



 render() { 


  return (

    <View style={styles.container}>
        

        <Animated.View style ={ [ styles.container , { 
                    backgroundColor: "#231E39",
                    position: 'relative',
                   top: -180,
                    borderRadius:15,
                    
                    transform: [
                        {translateY: this.position}
                    ]
                  } ] }  >


       
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
           <TextInput  keyboardType="number-pad"
                      placeholder="Filtrar por edad"
                      placeholderTextColor={'white'}
                      style={styles.estiloInput}
                      onChangeText={(text) => this.searchAge(text) }
          /> 




<TouchableOpacity style={{marginTop: 20}} onPress= {()=> this.topDown()}>

<Text> <AntDesign name="filter" size={24} color="white" /></Text>
</TouchableOpacity>


        <View style= {{flex:1, }}> 
              <FlatList
                        data= {this.state.misContactos}
                        renderItem={this.renderItem}
                        keyExtractor={this.keyExtractor}
               /> 
    </View> 
   

              <Modal
                visible= {this.state.showModal}
                animationType= "slide"
                transparent ={true}
        >

      <View style= {styles.modalContainer}>
           <View style= {styles.modal}>

             {      this.state.itemModal

                ? 
            <>
                <Image style= {{width: 100, height: 100}} source={{uri: this.state.itemModal.picture.thumbnail} } />
                <Text style= {styles.textModal}> {this.state.itemModal.name.first}</Text> 
                <Text style= {styles.textModal}> {this.state.itemModal.name.last}</Text> 
                <Text style= {styles.textModal}>  {this.state.itemModal.dob.date.substring(0,10)} - {this.state.itemModal.dob.age} años </Text> 
                <Text style= {styles.textModal}> {this.state.itemModal.location.street.name} {this.state.itemModal.location.street.number } </Text> 
                <Text style= {styles.textModal}> {this.state.itemModal.location.state} {this.state.itemModal.location.city} {this.state.itemModal.location.country} {this.state.itemModal.location.postcode} </Text> 
                <Text style= {styles.textModal}> {this.state.itemModal.registered.date.substring(0,10)}</Text> 
                <Text style= {styles.textModal}> {this.state.itemModal.phone}</Text>
                <Text style= {styles.textModal}> {this.state.itemModal.comentarios}</Text> 


           </>
      
                : <Text>No hay nada</Text>

    }
             <Text style= {styles.closeButton}  onPress= {() => this.setState({showModal: false})} >  <EvilIcons name="close" size={24} color="black" /> </Text> 

      </View>
            </View>
                  </Modal>
      
                  </Animated.View>
  </View>


  
  )
}

 }

