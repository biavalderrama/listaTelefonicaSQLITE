import { StyleSheet, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { FAB } from '@rneui/themed';
import * as SQLite from 'expo-sqlite';
import _contato from '../types/contato';
import Contato from '../components/Contato';
import { Text } from '@rneui/themed';

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

  const renderLista = () => {
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
    navigation.navigate("Adicionar Contatos");
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
          placeholder="Buscar..."
          placeholderTextColor="#ccc"
        />
        <TouchableOpacity onPress={() => recarregar(busca)}>
          <Text style={styles.searchIcon}>🔍</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.listContainer}>
        {renderLista()}
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
    backgroundColor: '#3A0519', 
    padding: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#670D2F',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 12,
  },
  input: {
    flex: 1,
    color: 'white',
    paddingVertical: 10,
    paddingHorizontal: 8,
    fontSize: 16,
  },
  searchIcon: {
    fontSize: 22,
    color: '#EF88AD',
    paddingLeft: 8,
  },
  listContainer: {
    flex: 1,
  },
});
