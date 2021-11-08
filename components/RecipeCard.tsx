import React from "react";
import { View, TouchableOpacity, Text, Image, StyleSheet } from "react-native";
import { COLORS, BORDER_RADIUS } from "../assets/ConstantStyle";
import { Ionicons } from "@expo/vector-icons";
import { useAppDispatch } from "../store/hooks";
import firebase from "../configFirebase";

function RecipeCard({ recipeItem, onPress, routeFav }: any) {
  const dispatch = useAppDispatch();
  return (
    <TouchableOpacity style={styles.recipeCard} onPress={onPress}>
      <Image
        source={{ uri: `${recipeItem.image_url}` }}
        resizeMode="cover"
        style={styles.recipeItem_Img}
      />
      <View style={styles.recipeItem_Info}>
        <Text style={styles.recipeItem_title}>{recipeItem.title}</Text>
        <Text>{recipeItem.publisher}</Text>
      </View>
      {routeFav?.name === "Favorite" ? (
        <TouchableOpacity
          style={styles.recipeCard_remove}
          onPress={() => {
            const itemDelete = firebase.database().ref("fav/" + recipeItem.id);
            itemDelete.remove();
          }}
        >
          <Ionicons name="close" size={24} color={COLORS.ORANGE} />
        </TouchableOpacity>
      ) : null}
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
    marginHorizontal: 10,
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
    flex: 3,
    paddingHorizontal: 20,
    // borderWidth: 1,
    // borderColor: "blue",
  },
  recipeItem_title: {
    flex: 1,
    fontSize: 15,
    fontWeight: "bold",
    color: COLORS.ORANGE_TEXT,
  },
  recipeCard_remove: {
    // borderWidth: 1,
    // borderColor: "blue",
    flex: 1,
    alignItems: "flex-end",
  },
});
