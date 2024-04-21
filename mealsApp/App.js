import { StatusBar } from 'expo-status-bar';
import CategoriesScreen from './screens/CategoriesScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MealDetailScreen from './screens/MealDetailScreen';
import MealsOverviewScreen from './screens/MealsOverviewScreen';

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <>
    <StatusBar style='dark'/>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerStyle: { backgroundColor: '#522e24'},
        headerTintColor: 'white',
        contentStyle: { backgroundColor: '#804d3b'},
      }}>
        <Stack.Screen 
          name="MealsCategories" 
          component={CategoriesScreen} 
          options={{
            title: 'Meals Categories',
          }}
          />
        <Stack.Screen 
          name="MealsOverview" 
          component={MealsOverviewScreen} 
        /> 
        <Stack.Screen 
          name="MealDetail"
          component={MealDetailScreen} 
        />
      </Stack.Navigator>
    </NavigationContainer>
    </>
  );
}
