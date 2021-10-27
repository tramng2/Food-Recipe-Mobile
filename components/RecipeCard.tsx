import React from "react";
import { View, TouchableOpacity, Text, Image, StyleSheet } from "react-native";
import { COLORS, BORDER_RADIUS, MARGIN } from "../assets/ConstantStyle";

function RecipeCard({ recipeItem }: any) {
  return (
    <TouchableOpacity style={styles.recipeCard}>
      <Image
        source={{ uri: `${recipeItem.image_url}` }}
        resizeMode="cover"
        style={styles.recipeItem_Img}
      />
      <View style={styles.recipeItem_Info}>
        <Text style={styles.recipeItem_title}>{recipeItem.title}</Text>
        <Text>{recipeItem.publisher}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default RecipeCard;

const styles = StyleSheet.create({
  recipeCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginTop: 10,
    borderRadius: BORDER_RADIUS,
    backgroundColor: COLORS.OFF_WHITE,
    marginHorizontal: 20,
    // borderWidth: 1,
    // borderColor: "blue",
  },
  recipeItem_Img: {
    width: 100,
    height: 100,
    borderRadius: BORDER_RADIUS,
  },
  recipeItem_Info: {
    width: "65%",
    paddingHorizontal: 20,
    // borderWidth: 1,
    // borderColor: "blue",
  },
  recipeItem_title: {
    flex: 1,
    fontSize: 15,
    fontWeight: "bold",
  },
});
