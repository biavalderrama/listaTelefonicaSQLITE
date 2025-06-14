import { StyleSheet, View, Alert, TextInput, Button } from 'react-native';
import { useState } from 'react';
import * as SQLite from 'expo-sqlite';
import _contato from '../types/contato';

export default function AddScreen({ navigation }: { navigation: any }) {
  const db = SQLite.openDatabaseSync("contatos.sqlite");

  const [novoNome, setNovoNome] = useState<string>('');
  const [novoTelefone, setNovoTelefone] = useState<string>('');

  const adicionar = async () => {
    if (novoTelefone.trim() === '' || novoNome.trim() === '') {
      Alert.alert("Todos os campos são obrigatórios.");
      return;
    }

    await db.runAsync(`INSERT INTO contatos (nome, telefone) VALUES (?, ?)`, [novoNome, novoTelefone]);

    setNovoTelefone('');
    setNovoNome('');

    Alert.alert('Contato adicionado com sucesso!');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={novoNome}
        onChangeText={setNovoNome}
        placeholder="Insira o nome do contato."
        placeholderTextColor="#fff"
      />

      <TextInput
        style={styles.input}
        value={novoTelefone}
        onChangeText={setNovoTelefone}
        placeholder="Insira o telefone do contato."
        placeholderTextColor="#fff"
        keyboardType="phone-pad"
      />

      <View style={styles.buttonContainer}>
        <Button onPress={adicionar} title='Adicionar' color="#fff" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2', 
    paddingHorizontal: 20,
    paddingTop: 40, 
    justifyContent: 'flex-start', 
  },
  input: {
    backgroundColor: '#d9d9d9', 
    color: '#333',              
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#EF88AD',   
  },
  buttonContainer: {
    backgroundColor: '#EF88AD',
    borderRadius: 25,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#EF88AD',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    elevation: 5,
  },
});
