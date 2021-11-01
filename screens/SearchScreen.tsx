import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Pressable,
  SafeAreaView,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Recipes } from "../types";
import { StatusBar } from "expo-status-bar";
import RecipeCard from "../components/RecipeCard";
import { BORDER_RADIUS, COLORS, IMAGES, MARGIN } from "../assets/ConstantStyle";
import { Ionicons } from "@expo/vector-icons";
import { getRecipes } from "../redux/recipesSlice";
import { useAppSelector, useAppDispatch } from "../store/hooks";

export default function SearchScreen({ navigation }: any) {
  const recipes = useAppSelector((state) => state.recipes.recipesList);
  const dispatch = useAppDispatch();

  const [input, setInput] = useState<string>("");
  const [recipesList, setRecipesList] = useState<Recipes[]>([]);

  const findRecipe = () => {
    dispatch(getRecipes(input));
  };
  useEffect(() => {
    setRecipesList(recipes);
  }, [recipes]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.search}>
          <Pressable
            onPress={() => {
              setInput("");
              setRecipesList([]);
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
          data={recipesList}
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
