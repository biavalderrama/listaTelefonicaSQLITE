import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import ListScreen from '../screens/ListScreen';
import AddScreen from '../screens/AddScreen';
import UpdateScreen from '../screens/UpdateScreen';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {

  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Lista Contatos" component={ListScreen} />
            <Stack.Screen name="Adicionar Contatos" component={AddScreen} />
            <Stack.Screen name="Alterar Contatos" component={UpdateScreen} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}