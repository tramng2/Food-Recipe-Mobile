import React from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import { COLORS, BORDER_RADIUS } from "../assets/ConstantStyle";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";

import { useAppSelector, useAppDispatch } from "../store/hooks";

function CategoryCard({ recipeItem, onPress }: any) {
  const favRecipes = useAppSelector((state) => state.recipes.favRecipes);
  const dispatch = useAppDispatch();
  const isFav = favRecipes.find(
    (recipe) => recipe.recipe_id === recipeItem.recipe_id
  );
  return (
    <View style={styles.categoryCard}>
      <TouchableOpacity onPress={onPress}>
        <Image
          source={{ uri: `${recipeItem.image_url}` }}
          resizeMode="cover"
          style={styles.listItem}
        />
      </TouchableOpacity>
      <View style={styles.listDesc}>
        <Text style={{ color: COLORS.WHITE, fontWeight: "bold" }}>
          {recipeItem.publisher}
        </Text>
      </View>
      <View style={styles.cardRecipeInfo}>
        <BlurView intensity={90} tint="dark" style={styles.cardRecipeInfo}>
          <View style={{ flex: 1 }}>
            <View style={styles.card_wrapper}>
              <Text style={styles.tag}>{recipeItem.title}</Text>
              <Ionicons
                name={isFav ? "heart" : "heart-outline"}
                size={30}
                color={COLORS.ORANGE}
              />
            </View>
            <View style={{ padding: 10 }}>
              <Text style={{ color: COLORS.LIGHT_GRAY }}>
                {recipeItem.time}
              </Text>
            </View>
          </View>
        </BlurView>
      </View>
    </View>
  );
}

export default CategoryCard;
const styles = StyleSheet.create({
  categoryCard: {
    height: 350,
    width: 250,
    marginTop: 20,
    marginRight: 20,
    borderRadius: BORDER_RADIUS,
    borderWidth: 1,
    borderColor: COLORS.LIGHT_GRAY,
    alignItems: "center",
  },
  listItem: {
    width: 250,
    height: 350,
    borderRadius: BORDER_RADIUS,
  },
  listDesc: {
    position: "absolute",
    top: 20,
    left: 15,
    paddingHorizontal: 20,
    paddingVertical: 5,
    backgroundColor: COLORS.TRANS_GRAY,
    borderRadius: BORDER_RADIUS,
    color: COLORS.WHITE,
  },
  cardRecipeInfo: {
    position: "absolute",
    bottom: 3,
    left: 5,
    right: 5,
    height: 100,
    borderRadius: 100,
  },
  card_wrapper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  tag: {
    color: COLORS.WHITE,
    width: "70%",
    fontWeight: "bold",
    fontSize: 15,
  },
});
