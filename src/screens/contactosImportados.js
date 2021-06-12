import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View, Alert, Image, FlatList, TouchableOpacity, TextInput, Modal } from 'react-native';
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
                contactosOriginal: [],
                showModal: false,
                itemModal: null,
                comentarios: " ",


    
    }
  }
  componentDidMount () {
    this.unsuscribe = this.props.navigation.addListener( "focus", () => {
      this.getObjectStorage();
      this.getMyContactsStorage();
    })
   
    

}

componentWillUnmount(){
        this.unsuscribe
}

showModal (item){
    this.setState({itemModal: item, showModal: !this.state.showModal})
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
            return (
                
                
                <View>

                        <Image style={styles.image} source={{uri: item.picture.thumbnail}} />       
                            <Text> {item.name.first}</Text> 
                            <Text> {item.name.last} </Text>
                            <Text> {item.email}</Text> 
                            <Text> {item.dob.date.substring(0,10)} - {item.dob.age} años </Text>
                          
                        
                            <TextInput  keyboardType="default"
                       placeholder="Ingrese algun comentario.."
                     
                       style={styles.estiloInput}
                       numberOfLines={10}
                       multiline={true}
                      onChangeText={text=> this.setState({comentarios : text})}
          /> 

<TouchableOpacity onPress= {()=> this.storageComentarios(item)}>
                           
                           <Text> Guardar comentario </Text>
                          
                           </TouchableOpacity>
                            <TouchableOpacity onPress= {()=> this.showModal(item)}>
                           
                           <Text> Ver  </Text>
                          
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
                      placeholder="Filtrar por nombre"
                
                      onChangeText={(text) => this.searchFirstName(text) }
          /> 
            <TextInput  keyboardType="default"
                      placeholder="Filtrar por apellido"
                
                      onChangeText={(text) => this.searchLastName(text) }
          /> 
           <TextInput  keyboardType="number-pad"
                      placeholder="Filtrar por edad"
                
                      onChangeText={(text) => this.searchAge(text) }
          /> 


<Text  onPress = {() => this.props.navigation.navigate("Papelera reciclaje")} > Ir a papelera de reciclaje</Text>


    <FlatList
                        data= {this.state.misContactos}
                        renderItem={this.renderItem}
                        keyExtractor={this.keyExtractor}
            > 
        </FlatList>

        
        
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
        <Text style= {styles.closeButton} 
                onPress= {() => this.setState({showModal: false})}
        > 
            x
        </Text> 

    </View>

</View>
</Modal>
      
        
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
    estiloInput: {
        borderWidth: 1, 
        borderStyle: "solid", 
        marginTop: 20, 
        height:50
    },
    image: {
        height: 100,
        width: 100,
    },
    closeButton: {
        fontSize: 20,
        position: "absolute",
        right: 20,
        top: 10
    },
    textModal: {
        fontSize: 20,
    },
    modalContainer: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    modal: {
        width: "100%" ,
        height: "70%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        borderTopEndRadius: 20,
        shadowColor: "black",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "grey",
        elevation: 10
    }
  });