import React, { useState, useRef, useEffect, createRef } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Button,
  Image,
  Text,
  Pressable,
  SafeAreaView,
  Alert,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Recipes } from "../types";
import { StatusBar } from "expo-status-bar";
import RecipeCard from "../components/RecipeCard";
import { BORDER_RADIUS, COLORS, IMAGES, MARGIN } from "../assets/ConstantStyle";
import { Ionicons } from "@expo/vector-icons";

export default function SearchScreen() {
  const [input, setInput] = useState<string>("");
  const [recipes, setRecipes] = useState<Recipes[]>([]);

  const findRecipe = async () => {
    try {
      let response = await fetch(
        `https://forkify-api.herokuapp.com/api/search?q=${input}`
      );
      const { recipes } = await response.json();
      if (recipes === undefined) {
        throw new Error("No recipes are found");
      }
      setRecipes(recipes);
    } catch (error) {
      Alert.alert("No recipes are found");
    }
  };
  const inputRef = useRef<TextInput>(null);
  useEffect(() => {
    inputRef.current && inputRef.current.focus();
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.search}>
          <TextInput
            ref={inputRef}
            value={input}
            onChangeText={(input) => setInput(input)}
            placeholder="Type your ingredients"
            onSubmitEditing={() => findRecipe()}
            style={styles.search_input}
          />
          {input ? (
            <Pressable onPress={() => setInput("")}>
              <Ionicons name="close" size={25} color={COLORS.GRAY} />
            </Pressable>
          ) : null}
        </View>
        <FlatList
          data={recipes}
          keyExtractor={(item) => item.recipe_id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <RecipeCard recipeItem={item} />}
        ></FlatList>
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    // borderWidth: 5,
    // borderColor: "blue",
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  wrapper: {
    paddingLeft: 25,
    paddingRight: 25,
  },

  search: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 50,
    alignItems: "center",
    paddingHorizontal: 30,
    borderRadius: BORDER_RADIUS,
    backgroundColor: COLORS.LIGHT_GRAY,
    marginTop: 30,
    marginBottom: 30,
  },
  search_input: {
    // borderWidth: 5,
    // borderColor: "blue",
    height: 50,
    width: "95%",
  },
});
