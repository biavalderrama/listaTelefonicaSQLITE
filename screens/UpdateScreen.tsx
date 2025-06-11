import { StyleSheet, View, Alert, TextInput, Button } from 'react-native';
import { useState, useEffect } from 'react';
import * as SQLite from 'expo-sqlite';
import _contato from '../types/contato';

export default function UpdateScreen({ navigation, route }: { navigation: any; route: any }) {
  const db = SQLite.openDatabaseSync("contatos.sqlite");
  const { contato_id } = route.params;
  const [novoNome, setNovoNome] = useState<string>('');
  const [novoTelefone, setNovoTelefone] = useState<string>('');

  type ContatoParcial = { nome: string; telefone: string | number } | undefined;

  useEffect(() => {
    const carregarContato = async () => {
      const contato = (await db.getFirstAsync(
        'SELECT nome, telefone FROM contatos WHERE id = ?',
        [contato_id]
      )) as ContatoParcial;

      if (contato) {
        setNovoNome(contato.nome);
        setNovoTelefone(String(contato.telefone));
      }
    };

    carregarContato();
  }, []);

  const alterar = async () => {
    if (novoNome.trim() === '' || novoTelefone.trim() === '') {
      Alert.alert('Preencha todos os campos!');
      return;
    }

    await db.runAsync(
      'UPDATE contatos SET nome = ?, telefone = ? WHERE id = ?',
      [novoNome, novoTelefone, contato_id]
    );

    Alert.alert('Contato atualizado com sucesso!');
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
        <Button onPress={alterar} title='★ ATUALIZAR CONTATO ★' color="#EF88AD" />
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
