import React from "react";
import { StyleSheet } from "react-native";
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
import { COLORS } from "./assets/ConstantStyle";
import { Ionicons } from "@expo/vector-icons";
import { useAppSelector } from "./store/hooks";

export default function AllScreens() {
  const Tab = createBottomTabNavigator();
  const HomeStack = createStackNavigator();
  const SearchStack = createStackNavigator();
  const SaveStack = createStackNavigator();

  const favRecipes = useAppSelector((state) => state.recipes.favRecipes);

  const HomeStackScreen = () => (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Back"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="Recipe"
        component={DetailRecipe}
        options={{
          headerShown: false,
        }}
      />
    </HomeStack.Navigator>
  );
  const SearchStackScreen = () => (
    <SearchStack.Navigator>
      <SearchStack.Screen
        name="Back"
        component={SearchScreen}
        options={{
          headerShown: false,
        }}
      />
      <SearchStack.Screen
        name="Recipe"
        component={DetailRecipe}
        options={{
          headerShown: false,
        }}
      />
    </SearchStack.Navigator>
  );
  const SaveStackScreen = () => (
    <SaveStack.Navigator>
      <SaveStack.Screen name="Favorite" component={SavedScreen} />
      <SaveStack.Screen
        name="Recipe"
        component={DetailRecipe}
        options={{
          headerShown: false,
        }}
      />
    </SaveStack.Navigator>
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
        <Tab.Screen
          name="Search"
          component={SearchStackScreen}
          options={{
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Saved"
          component={SaveStackScreen}
          options={{
            headerShown: false,
            tabBarBadge:
              favRecipes.length > 0 ? `${favRecipes.length}` : undefined,
          }}
        />
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
