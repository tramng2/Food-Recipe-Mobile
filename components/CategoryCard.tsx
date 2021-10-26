import React from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Platform,
  StyleSheet,
} from "react-native";
import { Text } from "react-native-elements";
import { COLORS, BORDER_RADIUS, MARGIN } from "../assets/ConstantStyle";
import { BlurView } from "expo-blur";
//8401742f7cad4e5c92d8fa02abbeb954
const CardRecipeInfo = ({ recipeItem }: any) => {
  console.log(recipeItem);
  return (
    <BlurView
      intensity={90}
      tint="dark"
      // blurType="dark"
      style={styles.cardRecipeInfo}
    ></BlurView>
  );
};

function CategoryCard({ recipeItem }: any) {
  return (
    <TouchableOpacity style={styles.categoryCard}>
      <Image
        source={{ uri: `${recipeItem.strCategoryThumb}` }}
        resizeMode="cover"
        style={styles.listItem}
      />
      <View style={styles.listDesc}>
        <Text style={{ color: COLORS.WHITE, fontWeight: "bold" }}>
          {recipeItem.strCategory}
        </Text>
      </View>
      <View style={styles.cardRecipeInfo}>
        <CardRecipeInfo recipeItem={recipeItem} />
      </View>
    </TouchableOpacity>
  );
}

export default CategoryCard;
const styles = StyleSheet.create({
  categoryCard: {
    height: 370,
    width: 250,
    marginTop: 30,
    marginRight: 20,
    // borderRadius: BORDER_RADIUS,
    // borderWidth: 4,
    borderColor: "blue",
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
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
  },
});
