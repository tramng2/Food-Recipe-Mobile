import React, { useState } from "react";
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

export default function SearchScreen({ navigation }: any) {
  const [input, setInput] = useState<string>("");
  const [recipes, setRecipes] = useState<Recipes[]>([]);

  const findRecipe = async () => {
    try {
      let response = await fetch(
        `https://forkify-api.herokuapp.com/api/search?q=${input}`
      );
      const { recipes } = await response.json();
      if (recipes === undefined) {
        throw new Error("No recipes are found.");
      }
      setRecipes(recipes);
    } catch (error: any) {
      Alert.alert("Error", `${error}`, [
        {
          text: "Try again",
          onPress: () => {},
        },
      ]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.search}>
          <Pressable
            onPress={() => {
              setInput("");
              setRecipes([]);
              return navigation.navigate("Home", { screen: "Home" });
            }}
          >
            <Ionicons name="chevron-back" size={25} color={COLORS.GRAY} />
          </Pressable>
          <TextInput
            value={input}
            onChangeText={(input) => setInput(input)}
            placeholder="What do you want to cook?"
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
          renderItem={({ item }) => (
            <RecipeCard
              recipeItem={item}
              onPress={() => navigation.navigate("Recipe", { recipe: item })}
            />
          )}
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
    paddingHorizontal: 10,
    borderRadius: BORDER_RADIUS,
    backgroundColor: COLORS.LIGHT_GRAY,
    marginTop: 30,
    marginBottom: 30,
    // borderWidth: 5,
    // borderColor: "blue",
  },
  search_input: {
    flex: 1,
    // borderWidth: 5,
    // borderColor: "pink",
    marginLeft: 5,
    height: 50,
  },
});
