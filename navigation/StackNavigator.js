import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import telaLista from '../telas/telaLista';
import telaAdd from '../telas/telaAdd';
import telaAlterar from '../telas/telaAlterar';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {

  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Lista dos contatos" component={telaLista} />
            <Stack.Screen name="Adicionar um contato" component={telaAdd} />
            <Stack.Screen name="Alterar um contato" component={telaAlterar} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}