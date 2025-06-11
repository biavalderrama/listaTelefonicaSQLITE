import { SQLiteDatabase } from "expo-sqlite";
import _tarefa from "../types/contato";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Linking } from 'react-native';

type _propsContato = {
  dados: _tarefa,
  db: SQLiteDatabase,
  recarregar: any,
  navigation: any
};

export default function Contato(props: _propsContato) {
  const alterar = () => {
    props.navigation.navigate("Alterar Contatos", { contato_id: props.dados.id });
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
        <TouchableOpacity onPress={ligar} style={[styles.botao, styles.ligar]}>
          <Text style={styles.botaoTexto}>📞</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={alterar} style={[styles.botao, styles.alterar]}>
          <Text style={styles.botaoTexto}>✏️</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={excluir} style={[styles.botao, styles.excluir]}>
          <Text style={styles.botaoTexto}>🗑</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#670D2F',
    marginVertical: 8,
    padding: 16,
    borderRadius: 10,
  },
  nome: {
    fontSize: 18,
    color: 'white',
    marginBottom: 10,
  },
  botoesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  botao: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 8,
  },
  botaoTexto: {
    color: 'white',
    fontSize: 16,
  },
  ligar: {
    backgroundColor: '#EF88AD',
  },
  alterar: {
    backgroundColor: '#FFE17B',
  },
  excluir: {
    backgroundColor: '#A53860',
  },
});
