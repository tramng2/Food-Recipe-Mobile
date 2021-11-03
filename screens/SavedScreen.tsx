import React from "react";
import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import RecipeCard from "../components/RecipeCard";
import { useAppSelector } from "../store/hooks";

function SavedScreen({ navigation }: any) {
  const favRecipes = useAppSelector((state) => state.recipes.favRecipes);

  return (
    <SafeAreaView>
      <FlatList
        data={favRecipes}
        keyExtractor={(item) => item.recipe_id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <RecipeCard
            recipeItem={item}
            onPress={() => navigation.navigate("Recipe", { recipe: item })}
          />
        )}
      ></FlatList>
    </SafeAreaView>
  );
}

export default SavedScreen;
