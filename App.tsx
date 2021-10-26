import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import SavedScreen from "./screens/SavedScreen";
import ShoppingListScreen from "./screens/ShoppingListScreen";
import SearchScreen from "./screens/SearchScreen";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "./assets/ConstantStyle";
export default function App() {
  const Tab = createBottomTabNavigator();
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
          component={HomeScreen}
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
