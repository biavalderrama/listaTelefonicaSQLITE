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
      Alert.alert("Insira dados em todos os campos!");
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
        placeholder="Digite o nome do contato..."
        placeholderTextColor="#ccc"
      />

      <TextInput
        style={styles.input}
        value={novoTelefone}
        onChangeText={setNovoTelefone}
        placeholder="Digite o telefone do contato..."
        placeholderTextColor="#ccc"
        keyboardType="phone-pad"
      />

      <View style={styles.buttonContainer}>
        <Button onPress={adicionar} title='★ ADICIONAR CONTATO ★' color="#EF88AD" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3A0519',
    padding: 20,
    justifyContent: 'center',
  },
  input: {
    backgroundColor: '#670D2F',
    color: 'white',
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  buttonContainer: {
    marginTop: 20,
    borderRadius: 8,
    overflow: 'hidden',
  },
});
