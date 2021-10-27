import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import {
  HomeScreen,
  SavedScreen,
  ShoppingListScreen,
  SearchScreen,
  DetailRecipe,
} from "./screens";

import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "./assets/ConstantStyle";

export default function App() {
  const Tab = createBottomTabNavigator();
  const HomeStack = createStackNavigator();
  const DetailRecipeStack = createStackNavigator();
  const ShoppingStack = createStackNavigator();
  const SearchStack = createStackNavigator();

  const HomeStackScreen = () => (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <DetailRecipeStack.Screen name="Recipe" component={DetailRecipe} />
      <ShoppingStack.Screen
        name="Shopping List"
        component={ShoppingListScreen}
      />
      <SearchStack.Screen name="Search" component={SearchScreen} />
    </HomeStack.Navigator>
  );
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: string = "";
            if (route.name === "Home") {
              iconName = "md-home";
            } else if (route.name === "Search") {
              iconName = "md-search";
            } else if (route.name === "Saved") {
              iconName = "md-heart";
            } else if (route.name === "Shopping List") {
              iconName = "cart-outline";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: COLORS.ORANGE,
          tabBarInactiveTintColor: COLORS.GRAY,
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeStackScreen}
          options={{
            headerShown: false,
          }}
        />
        <Tab.Screen name="Search" component={SavedScreen} />
        <Tab.Screen name="Saved" component={SearchScreen} />
        <Tab.Screen name="Shopping List" component={ShoppingListScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
