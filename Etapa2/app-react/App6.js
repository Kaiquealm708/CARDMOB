import React, { useState, useEffect } from "react"; 
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image, TextInput, FlatList, Alert } from 'react-native';

// Indicar o endereço do backend.
const BASE_URL ='http://10.81.205.17:3000';

export default function App() {
  // CRUD em memória
  const [items, setItems] = useState([]);
  const [text, setText] = useState('');
  const [editItemId, setEditItemId] = useState(null);
  const [editItemText, setEditItemText] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [editQuantidade, setEditQuantidade] = useState('');

  // loading ... efeito de carregando...
  const [loading, setLoading] = useState(false); // novo

  // Buscar tudo.
  const fetchItems = async () => {
    setLoading(true);
    try {
      // executa o que precisa, se der erro entra no catch.
      const response = await fetch(`${BASE_URL}/compras`);
      const data = await response.json();
      console.log(JSON.stringify(data)); // debug
      setItems(data);
    } catch (error) {
      // quando ocorre algum erro.
      console.error('Error fetching items:', error)
    } 
    finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchItems();
  }, [])
  
  // CREATE
  const addItem = async () => {
    if (text.trim() === '' || quantidade.trim() === '') {
      return;
    }
    try {
      const response = await fetch(`${BASE_URL}/compras`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: text.trim(),
          quantidade: quantidade.trim(),
        }), 
      });
      if (response.ok) {
        await fetchItems();
        setText('');
        setQuantidade('');
      }
      else {
        console.error('Failed to add item:', response.status);
      }
    }
    catch (error) {
      console.error('Error adding item:', error);
    }
  }

  //UPDATE
  const updateItem = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/compras/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: editItemText,
          quantidade: editQuantidade,
        }),
      });
      if (response.ok) {
        await fetchItems();
        setEditItemId(null);
        setEditItemText('');
      }
      else {
        console.error('Failed to update item:', response.status);
      }
    }
    catch (error) {
      console.error('Error updating item:', error);
    }
    
  }

  // DELETE
  const deleteItem = async (id) => {
    Alert.alert(
    'Confirm Delete',
    'Are you sure you want to delete this item ?',
    [
      { text: 'Cancel', style: 'cancel'},
      {
        text: 'Delete',
        onPress: async () => {
          try {
            const response = await fetch(`${BASE_URL}/compras/${id}`, {
              method: 'DELETE'
            });
            if (response.ok) {
              await fetchItems();
            }
            else {
              console.error('Failed to delete item:', response.status);
            }
          }
          catch (error) {
            console.error('Error deleting item', error)
          }
        },
        
      }
    ],
    { cancelable: true }
   )
  }

  // READ -> um único item e/ou lista de itens
  const renderItem = ({item}) => {
    if (item.id != editItemId) {
      return (
        <View style={styles.item}>
          <Text style={styles.itemText}>{item.text}</Text>
          <Text style={styles.quantidadeText}>{item.quantidade}</Text>
          <View style={styles.buttons}>
            <Button title='Edit' onPress={() =>{
              setEditItemId(item.id);
              setEditItemText(item.text);
              setEditQuantidade(item.quantidade?.toString() ?? '');
            }}></Button>
            <Button title='Delete' onPress={() =>{deleteItem(item.id)}}></Button>
          </View>
        </View>
      );
    }else {
      // Um item esta sendo editado
      return (
        <View style={styles.item}>
          <TextInput
          style={styles.editInput}
          onChangeText={setEditItemText}
          value={editItemText}
          autoFocus
          />
          <TextInput
          style={styles.editInput}
          onChangeText={setEditQuantidade}
          value={editQuantidade}
          placeholder="Teste"
          />
          <Button title='Update' onPress={() => updateItem(item.id)}></Button>
        </View>
      )
    }
  }

  return (
    <View style={styles.container}>
      <Text>Lista de Compras</Text>

      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholder= 'Item'
      />
      <TextInput
        style={styles.input}
        value={quantidade}
        onChangeText={setQuantidade}
        placeholder= 'Quantidade'
      />
      <Button
        title='add compra'
        onPress={addItem}
      />
      <FlatList 
        data={items}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.list}
      />
      <Text>Olá App React Native - Atualiza!</Text>
      <Image
        source={{uri: "https://picsum.photos/200"}}
        style={{width: 200, height: 200}}
        />
      <StatusBar style="auto" />
    </View>

    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  text: {
    fontSize: 24,
    fontFamily: 'cursive',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10, 
  },
  list: {
    marginTop: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  itemText: {
    flex: 1,
    marginRight: 10,
  },
  buttons: {
    flexDirection: 'row',
  },
  editInput: {
    flex: 1,
    marginRight: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  quantidadeText: {
    flex: 0.1,
    color: 'red',
    fontWeight: 'bold',
  }
});
