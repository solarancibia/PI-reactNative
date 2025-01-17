import { StyleSheet } from 'react-native';
import React from 'react';


const styles = StyleSheet.create({

    estiloTexto: {
        color:"white", 
        marginTop: 20
    },
   
    estiloDatos:{
        alignSelf: "center",
        marginTop: 5,
        marginBottom:3,
    },

    estiloInput: {
        borderWidth: 1, 
        borderStyle: "solid", 
        borderColor:"#ffffff",
        marginTop: 20, 
        height:40,
        width: 300,
        borderRadius:5,
        backgroundColor: "transparent",
        padding: 10,
        color: "#ffffff",
    },

    estiloInputPpal: {
        borderWidth: 1, 
        borderStyle: "solid", 
        borderColor:"#ffffff",
        height:40,
        width: 300,
        borderRadius:5,
        backgroundColor: "transparent",
        padding: 10,
        color: "#ffffff",
        marginTop:20
    },

    estilocomment:{
        backgroundColor: "transparent",
        width:220,
        alignSelf:"center",
        zIndex: 5,
        position: "relative",
    },

    estiloButton: {
        backgroundColor: "#03BFCB",
        borderWidth: 1,
        borderRadius: 5,
        borderStyle: "solid",
        borderColor: "#03BFCB",
        padding: 10,
        color: "#ffffff",
    },


    estiloButtonGhost: {
        backgroundColor: "transparent",
        borderWidth: 1,
        borderRadius: 5,
        borderStyle: "solid",
        borderColor: "#03BFCB",
        padding: 10,
        width: 170,
        alignSelf: 'center',
        marginBottom: 10,
        marginTop: 10,
        zIndex: 2,
        position: "relative",
    },
    
    estiloButtonBorrado: {
        backgroundColor: "transparent",
        borderWidth: 1,
        borderRadius: 5,
        borderStyle: "solid",
        borderColor: "#03BFCB",
        padding: 10,
        width: 170,
        alignSelf: 'center',
        marginBottom: 10,
        marginTop: 40,
    },

    estiloTextoButton:{
        color: "#ffffff",
        fontWeight: "500",
        alignSelf: "center",
    },

    estiloTextoButtonGhost:{
        color: "#231E39", 
        fontWeight: "500",
        alignSelf: "center",
    },

    iconos:{
        alignSelf: "center",
    },

    container: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#231E39",
      },

      botonesiconos: {
          height: 30,
          width: 80,
          borderWidth: 5,
          borderColor: "#ffffff",
          alignSelf:"center",
            
      },
      topSafeArea: {
        flex: 0, 
        backgroundColor: "#03BFCB"
      },
    

      iconosjuntos:{
        flexDirection: "row",
        alignSelf:"center",
        
      },

      cargarPersonas:{
        paddingLeft: 5,
        height:35,
        marginTop: 25, 
      },

      tacho:{
        marginLeft: 3,
      },

      image: {
         height: 100,
         width: 100,
         alignSelf: 'center',
         borderWidth: 3,
         borderColor: "#03BFCB",
         borderRadius: 50,
         padding: 7,

      },

      imagenAcerca: {
        height: 40,
        width: 40,
        alignSelf: 'center',
        borderRadius: 50,
        padding: 7,
        marginTop:5,

     },

      touchable: {
          marginTop: 70,
      },

      cardcontainer: {
        backgroundColor: "#ffffff",
        borderRadius: 5,
        shadowColor: "rgba(0,0,0,0.75)",
        paddingTop: 10,
        textAlign: "center",
        marginBottom: 5,
        marginTop: 10,
        minWidth: 250,
        maxWidth: 250,
        minHeight: 300,
        maxHeight: 300,   
    },


    nosotroscontainer: {
        backgroundColor: "#ffffff",
        borderRadius: 5,
        shadowColor: "rgba(0,0,0,0.75)", 
        textAlign: "center",
        position: 'relative',
      top: -600,                   
        marginTop: 20,
        alignSelf: "center",
        minHeight: 100,
        minWidth: 200,
        maxWidth: 200,
        
       
      
        
        
             
    },
     
      closeButton: {
        fontSize: 20,
        position: "absolute",
        right: 20,
        top: 10
    },
    textModal: {
        fontSize: 15,
        textAlign:"center",
        paddingLeft:10,
        paddingRight:10,
        
    },
    modalContainer: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    modal: {
        width: "100%" ,
        height: "20%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        borderTopEndRadius: 20,
        shadowColor: "black",
        borderStyle: "solid",
        borderWidth: 2,
        borderColor: "#03BFCB",
        elevation: 10
    },
   

    

})

export {styles}