import "react-native-gesture-handler";
import React, { Component } from 'react';
import {NavigationContainer} from "@react-navigation/native"
import {createStackNavigator} from "@react-navigation/stack"



import { StatusBar } from 'expo-status-bar';


import {Contact} from "./src/components/contact"
import {ContactosImportados} from "./src/components/contactosImportados"
import {PapeleraDeReciclaje} from "./src/components/papeleraDeReciclaje"

const Stack = createStackNavigator();

class App extends Component {
  render() { 
  return (
      <NavigationContainer> 
         <Stack.Navigator> 

           <Stack.Screen name= "Contactos" component={Contact} />
           <Stack.Screen name= "Contactos Importados" component={ContactosImportados} />
           <Stack.Screen name= "Papelera reciclaje" component={PapeleraDeReciclaje} />
  
  

    </Stack.Navigator>
    </NavigationContainer>

  );
}
 }


export default App;




