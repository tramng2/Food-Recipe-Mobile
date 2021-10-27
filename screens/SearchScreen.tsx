import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Button,
  Image,
  SafeAreaView,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Recipes } from "../types";
import { StatusBar } from "expo-status-bar";
import RecipeCard from "../components/RecipeCard";
import { BORDER_RADIUS, COLORS, IMAGES, MARGIN } from "../assets/ConstantStyle";

export default function SearchScreen() {
  const [input, setInput] = useState<string>("");
  const [recipes, setRecipes] = useState<Recipes[]>([]);

  const findRecipe = async () => {
    const response = await fetch(
      `https://forkify-api.herokuapp.com/api/search?q=${input}`
    );
    const { recipes } = await response.json();
    setRecipes(recipes);
  };
  const handleFind = () => {
    findRecipe();
    setInput("");
  };
  const renderRecipeList = () => {};
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.finder}>
        <TextInput
          value={input}
          onChangeText={(input) => setInput(input)}
          placeholder="Type your ingredients"
          onSubmitEditing={() => findRecipe()}
          style={styles.search}
        />
        {/* <Button
          title="Find"
          onPress={() => handleFind()}
          disabled={input ? false : true}
        /> */}
      </View>
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.recipe_id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <RecipeCard recipeItem={item} />}
      ></FlatList>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    borderWidth: 5,
    borderColor: "blue",
  },
  finder: {
    height: 100,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    borderWidth: 5,
    borderColor: "red",
  },
  search: {
    borderWidth: 5,
    borderColor: "red",
    height: 50,
    alignItems: "center",
    paddingHorizontal: 30,
    borderRadius: BORDER_RADIUS,
    backgroundColor: COLORS.LIGHT_GRAY,
    marginTop: 10,
  },
});
