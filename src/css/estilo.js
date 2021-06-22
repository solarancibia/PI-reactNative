import { StyleSheet } from 'react-native';
import React from 'react';

// import { useFonts, Montserrat_500 } from '@expo-google-fonts/inter';


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
        marginTop: 10, 
        height:40,
        width: 150,
        borderRadius:5,
        backgroundColor: "rgb(205, 205, 205)",
        padding: 10,
    },

    estilocomment:{
        backgroundColor: "rgb(205, 205, 205)",
        width:50,
        height:60,
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
    },
    

    estiloTextoButton:{
        color: "#ffffff",
        // fontFamily: "Montserrat_500", 
        fontWeight: "500",
        alignSelf: "center",
    },

    estiloTextoButtonGhost:{
        color: "#231E39",
        // fontFamily: "Montserrat_500", 
        fontWeight: "500",
        alignSelf: "center",
    },

    iconos:{
        alignSelf: "center",
    },

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        backgroundColor: "#231E39",
      },

    

      iconosjuntos:{
        width: 30,
        height: 30,
        flexDirection: "row",
        alignSelf:"center",
        
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

      touchable: {
          marginTop: 70,
      },

    //   card: {
    //     borderStyle: "solid",
    //     borderWidth: 1,
    //     borderColor: "grey",
    //     backgroundColor:"gainsboro",
    //     marginTop: 10,
    //     borderRadius: 15,
    //     width: "100%"
  
    //   },

      cardcontainer: {
        backgroundColor: "#ffffff",
        borderRadius: 5,
        shadowColor: "rgba(0,0,0,0.75)",
        paddingTop: 10,
        textAlign: "center",
        marginBottom: 5,
        marginTop: 10,
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
    },
   

    

})

export {styles}