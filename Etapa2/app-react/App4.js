import React, { useState } from "react"; 
import { StyleSheet, View, Button } from 'react-native';
import ScrollViewExample from './components/ScrollViewExample'

export default function App() {

  const baseUrl = 'http://10.81.205.17:3000';

  const getItems = async () => {
    const response = await fetch(`${baseUrl}/items`)
    console.log(response.json());
  }
  
  return (
    <View style={styles.container}>
      <Button onPress={getItems} title='Buscar'>
        buscar dados  
      </Button>    
      <ScrollViewExample />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'gray',
    height: 600,
    marginTop: 150,

  },
});
