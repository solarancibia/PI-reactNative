import { StyleSheet } from 'react-native';
import React from 'react';
const styles = StyleSheet.create({

    estiloTexto: {
        color:"white", 
        marginTop: 20
    },
    estiloInput: {
        borderWidth: 1, 
        borderStyle: "solid", 
        marginTop: 20, 
        height:30
    },
    estiloButton: {
        height:25, 
        backgroundColor:"red", 
        width: 70, 
        marginTop: 20
    },
    container: {
        flex: 1,
     
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
      },
      image: {
          height: 100,
          width: 100,
         alignSelf: 'center'
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
  
      }, closeButton: {
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
    },
   

    

})

export {styles}