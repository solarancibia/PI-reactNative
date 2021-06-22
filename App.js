import "react-native-gesture-handler";
import React, { Component } from 'react';
import {NavigationContainer} from "@react-navigation/native"
import {createDrawerNavigator} from "@react-navigation/drawer"




import { StatusBar } from 'expo-status-bar';


import {Contact} from "./src/screens/contact"
import {Acerca} from "./src/screens/acerca"
import {ContactosImportados} from "./src/screens/contactosImportados"
import {PapeleraDeReciclaje} from "./src/screens/papeleraDeReciclaje"

const Drawer = createDrawerNavigator();

class App extends Component {
  render() { 
  return (
      <NavigationContainer> 
         <Drawer.Navigator> 

           <Drawer.Screen name= "Contactos" component={Contact} options= {{title: "Importar contactos"}}  />
           <Drawer.Screen name= "Contactos Importados" component={ContactosImportados} options= {{title: "Mis Contactos"}} />
           <Drawer.Screen name= "Papelera reciclaje" component={PapeleraDeReciclaje} options= {{title: "Papelera"}} />
           <Drawer.Screen name= "Acerca" component={Acerca} options= {{title: "Acerca de.."}} />
  
  

    </Drawer.Navigator>
    </NavigationContainer>

  );
}
 }


export default App;




