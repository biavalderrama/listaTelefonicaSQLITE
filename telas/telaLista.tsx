import { StyleSheet, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { FAB } from '@rneui/themed';
import * as SQLite from 'expo-sqlite';
import _contato from '../types/contato';
import Contato from '../components/Contato';
import { Text } from '@rneui/themed';
import { Ionicons } from '@expo/vector-icons';

const db = SQLite.openDatabaseSync("contatos.sqlite");

export default function ListScreen({ navigation }: { navigation: any }) {
  const [visible, setVisible] = useState(true);
  const [contatos, setContatos] = useState<_contato[]>([]);
  const [busca, setBusca] = useState<string>('');

  useEffect(() => {
    db.execSync(`CREATE TABLE IF NOT EXISTS contatos(
      id INTEGER PRIMARY KEY autoincrement,
      nome VARCHAR(100),
      telefone INTEGER DEFAULT 0
    )`);
  }, []);

  useFocusEffect(
    useCallback(() => {
      recarregar();
    }, [])
  );

  const recarregar = async (busca: string = "") => {
    const listaContatos: _contato[] = await db.getAllAsync(
      `SELECT * FROM contatos WHERE upper(nome) LIKE upper('%${busca}%') ORDER BY nome`
    );
    setContatos(listaContatos);
  };

  const listar = () => {
    return contatos.map(c => (
      <Contato
        dados={c}
        db={db}
        recarregar={recarregar}
        key={c.id}
        navigation={navigation}
      />
    ));
  };

  function adicionar() {
    navigation.navigate("Adicionar um contato");
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          value={busca}
          onChangeText={(text) => {
            setBusca(text);
            recarregar(text);
          }}
          placeholder="Buscar"
          placeholderTextColor="#fff"
        />
        <TouchableOpacity onPress={() => recarregar(busca)}>
          <Ionicons name="search" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.listContainer}>
        {listar()}
      </ScrollView>

      <FAB
        visible={visible}
        icon={{ name: 'add', color: 'white' }}
        color="#EF88AD"
        placement="right"
        onPress={adicionar}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    padding: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#bfbfbf', 
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#EF88AD',
  },
  input: {
    flex: 1,
    color: '#f2f2f2',
    fontSize: 15,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  searchIcon: {
    fontSize: 22,
    color: '#EF88AD',
    paddingLeft: 10,
  },
  listContainer: {
    flex: 1,
    marginTop: 4,
  },
});
