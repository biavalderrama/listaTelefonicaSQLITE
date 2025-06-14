import { SQLiteDatabase } from "expo-sqlite";
import _tarefa from "../types/contato";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type _propsContato = {
  dados: _tarefa,
  db: SQLiteDatabase,
  recarregar: any,
  navigation: any
};

export default function Contato(props: _propsContato) {
  const alterar = () => {
    props.navigation.navigate("Alterar um contato", { contato_id: props.dados.id });
  };

  const excluir = async () => {
    await props.db.runAsync("DELETE from contatos WHERE id=?", props.dados.id);
    await props.recarregar();
  };

  const ligar = async () => {
    Linking.openURL(`tel:${props.dados.telefone}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.nome}>{props.dados.nome}</Text>
      <View style={styles.botoesContainer}>
        <TouchableOpacity onPress={ligar} style={styles.botoes}>
          <Ionicons name="call" size={24} color="#A8325A" />
        </TouchableOpacity>

        <TouchableOpacity onPress={alterar} style={styles.botoes}>
          <Ionicons name="pencil" size={24} color="#A8325A" />
        </TouchableOpacity>

        <TouchableOpacity onPress={excluir} style={styles.botoes}>
          <Ionicons name="trash" size={24} color="#A8325A" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#8c8c8c',  
    marginVertical: 8,
    padding: 16,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#EF88AD', 
  },
  nome: {
    fontSize: 18,
    color: '#fff',  
    marginBottom: 10,
    fontWeight: '600',
  },
  botoesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  botoes: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#EF88AD',  
  },
});
