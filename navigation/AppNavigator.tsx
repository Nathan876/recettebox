import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../features/recipes/HomeScreen';
import DetailScreen from '../features/recipes/DetailScreen';
import FavoriteScreen from "@/features/favorites/FavoriteScreen";
import RandomScreen from "@/features/random/RandomScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Accueil" component={HomeScreen} />
            <Tab.Screen name="Random" component={RandomScreen} />
            <Tab.Screen name="Favoris" component={FavoriteScreen} />
        </Tab.Navigator>
    );
}

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen
                    name="Home"
                    component={MainTabs}
                    options={{ title: 'RecetteBox', headerShown: false }}
                />
                <Stack.Screen
                    name="Detail"
                    component={DetailScreen}
                    options={{ title: 'Détails', headerShown: false }}
                />
                <Stack.Screen
                    name="Favorite"
                    component={FavoriteScreen}
                    options={{title: 'Favoris', headerShown: false}}
                />
                <Stack.Screen
                    name="Random"
                    component={RandomScreen}
                    options={{title: 'Random', headerShown: false}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}