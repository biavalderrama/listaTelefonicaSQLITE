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
    const nome = novoNome.trim();
    const telefone = novoTelefone.trim().replace(/\D/g, '');

    if ([nome, telefone].some(campo => campo === '')) {
      Alert.alert("Todos os campos são obrigatórios.");
      return;
    }

    try {
      const { nome: nomeOriginal, telefone: telefoneOriginal } = (await db.getFirstAsync(
        'SELECT nome, telefone FROM contatos WHERE id = ?',
        [contato_id]
      )) as { nome: string; telefone: string };

      if (nome === nomeOriginal && telefone === String(telefoneOriginal)) {
        Alert.alert("Nenhuma alteração foi feita.");
        return;
      }

      await db.runAsync(
        'UPDATE contatos SET nome = ?, telefone = ? WHERE id = ?',
        [nome, telefone, contato_id]
      );

      Alert.alert('Contato alterado com sucesso!');
      navigation.goBack();
    } catch (error) {
      Alert.alert("Erro ao alterar o contato.");
    }
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
        <Button onPress={alterar} title='Alterar' color="#fff" />
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
