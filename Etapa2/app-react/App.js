import React, { useState, useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TextInput,
  FlatList,
  Alert
} from 'react-native';

const BASE_URL = 'http://10.81.205.17:5000';

export default function App() {
  const [catalog, setCatalog] = useState([]);
  const [nome, setNome] = useState('');
  const [editNome, setEditNome] = useState('');
  const [editItemId, setEditItemId] = useState(null);
  const [descricao, setDescricao] = useState('');
  const [editDescricao, setEditDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [editPreco, setEditPreco] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchCatalog = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/api/catalog?page=1`);
      const data = await response.json();
      setCatalog(data.catalog);
    } catch (error) {
      console.error('Error fetching items:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCatalog();
  }, []);

  const addItem = async () => {
    if (nome.trim() === '' || descricao.trim() === '' || preco.trim() === '') {
      Alert.alert("Preencha todos os campos");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/catalog`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: nome.trim(),
          description: descricao.trim(),
          price: Number(preco),
        }),
      });

      if (response.ok) {
        await fetchCatalog();
        setNome('');
        setDescricao('');
        setPreco('');
      } else {
        console.error('Failed to add item:', response.status);
      }
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const updateItem = async (id) => {
    if (
      editNome.trim() === '' ||
      editDescricao.trim() === '' ||
      editPreco.trim() === ''
    ) {
      Alert.alert("Todos os campos de edição são obrigatórios");
      return;
    }

    const payload = {
      name: editNome.trim(),
      description: editDescricao.trim(),
      price: Number(editPreco),
    };

    console.log("Enviando PATCH:", payload);

    try {
      const response = await fetch(`${BASE_URL}/api/catalog/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        await fetchCatalog();
        setEditItemId(null);
        setEditNome('');
        setEditDescricao('');
        setEditPreco('');
      } else {
        const text = await response.text();
        console.error('Failed to update item:', response.status, text);
        Alert.alert("Erro ao atualizar", `Status: ${response.status}\n${text}`);
      }
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const deleteItem = async (id) => {
    Alert.alert(
      'Confirmar exclusão',
      'Tem certeza que deseja excluir este item?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          onPress: async () => {
            try {
              const response = await fetch(`${BASE_URL}/api/catalog/${id}`, {
                method: 'DELETE'
              });
              if (response.ok) {
                await fetchCatalog();
              } else {
                console.error('Failed to delete item:', response.status);
              }
            } catch (error) {
              console.error('Error deleting item', error);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const renderItem = ({ item }) => {
    if (item.id !== editItemId) {
      return (
        <View style={styles.item}>
          <Text style={styles.itemText}>Nome: {item.name}</Text>
          <Text style={styles.descricaoText}>Descrição: {item.description}</Text>
          <Text style={styles.itemText}>Preço: {item.price}</Text>
          <Image
            source={{ uri: item.image }}
            style={styles.productImage}
          />
          <View style={styles.buttons}>
            <Button
              title="Editar"
              onPress={() => {
                setEditItemId(item.id);
                setEditNome(item.name);
                setEditDescricao(item.description?.toString() ?? '');
                setEditPreco(item.price?.toString() ?? '');
              }}
            />
            <Button title="Excluir" onPress={() => deleteItem(item.id)} />
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.item}>
          <TextInput
            style={styles.editInput}
            onChangeText={setEditNome}
            value={editNome}
            placeholder="Nome"
          />
          <TextInput
            style={styles.editInput}
            onChangeText={setEditDescricao}
            value={editDescricao}
            placeholder="Descrição"
          />
          <TextInput
            style={styles.editInput}
            onChangeText={setEditPreco}
            value={editPreco}
            placeholder="Preço"
            keyboardType="numeric"
          />
          <Button title="Salvar" onPress={() => updateItem(item.id)} />
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={nome}
        onChangeText={setNome}
        placeholder="Nome"
      />
      <TextInput
        style={styles.input}
        value={descricao}
        onChangeText={setDescricao}
        placeholder="Descrição"
      />
      <TextInput
        style={styles.input}
        value={preco}
        onChangeText={setPreco}
        placeholder="Preço"
        keyboardType="numeric"
      />
      <Button
        title="Add produto"
        onPress={addItem}
      />

      <FlatList
        data={catalog}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.list}
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
  nome: {
    fontSize: 24,
    fontFamily: 'cursive',
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
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  itemText: {
    fontSize: 16,
    marginBottom: 5,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  editInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  descricaoText: {
    color: 'red',
    fontWeight: 'bold',
  },
  productImage: {
    width: 200,
    height: 200,
    marginTop: 10,
    borderRadius: 10,
  },
});
