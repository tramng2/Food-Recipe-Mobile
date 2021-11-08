import React, { useEffect, useState } from "react";
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
  LoginScreen,
} from "./screens";
import { COLORS } from "./assets/ConstantStyle";
import { Ionicons } from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { favInit } from "./redux/recipesSlice";
import { Recipe } from "./types";
import firebase from "./configFirebase";
import ProfileScreen from "./screens/ProfileScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function AllScreens() {
  const HomeStack = createStackNavigator();
  const SearchStack = createStackNavigator();
  const SaveStack = createStackNavigator();

  const dispatch = useAppDispatch();
  const favRecipes = useAppSelector((state) => state.recipes.favRecipes);
  const userStatus = useAppSelector((state) => state.user.userAuth);

  useEffect(() => {
    firebase
      .database()
      .ref("fav/")
      .on("value", (snapshot: any) => {
        const aux: Recipe[] = [];
        snapshot.forEach((child: any) => {
          aux.push({
            title: child.val().title,
            publisher: child.val().publisher,
            source_url: child.val().source_url,
            recipe_id: child.val().recipe_id,
            image_url: child.val().image_url,
            social_rank: child.val().social_rank,
            publisher_url: child.val().publisher_url,
            ingredients: child.val().ingredients,
            id: child.key,
          });
        });
        dispatch(favInit(aux));
      });
  }, []);

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
      <HomeStack.Screen
        name="Profile"
        component={ProfileScreen}
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

  if (!userStatus) {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

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
