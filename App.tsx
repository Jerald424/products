import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import ProductList from './src/views/products/list';
import { StatusBar } from 'react-native';
import { COLORS } from './src/utils/colors';
import ProductDetail from './src/views/products/detail';
import {QueryClientProvider, QueryClient} from '@tanstack/react-query';

const Stack= createStackNavigator();
const queryClient = new QueryClient();

export default function App(){
  return  <>
  <StatusBar backgroundColor={COLORS.PRIMARY} />
  <QueryClientProvider client={queryClient}>
  <NavigationContainer >
    <Stack.Navigator screenOptions={{
      headerStyle:{backgroundColor:COLORS.PRIMARY},
      headerTitleStyle:{color:COLORS.CARD}
    }}
      >
      <Stack.Screen name='product/list' component={ProductList} options={{title:"Product",}} />
      <Stack.Screen name='product/detail' component={ProductDetail} options={{title:"Product Detail"}} />
    </Stack.Navigator>
  </NavigationContainer>
  </QueryClientProvider>
  </>
}