import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Animated,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

import { COLORS, PADDING } from "../assets/ConstantStyle";
import { Ionicons } from "@expo/vector-icons";
import RecipeCardInfo from "../components/RecipeCardInfo";

function DetailRecipe({ navigation, route }: any) {
  const [recipeId, setRecipeId] = useState<any>(null);
  const [selectedRecipe, setSelectedRecipe] = useState<any>(null);
  const scrollY = useRef(new Animated.Value(0)).current;

  const calTime = (numIng: number) => {
    const periods = Math.ceil(numIng / 3);
    return periods * 15;
  };

  useEffect(() => {
    const { recipe } = route.params;
    setRecipeId(recipe.recipe_id);
  }, []);

  const getRecipe = async () => {
    try {
      let response = await fetch(
        `https://forkify-api.herokuapp.com/api/get?rId=${recipeId}`
      );
      const { recipe } = await response.json();
      if (recipe === undefined) {
        throw new Error("Error");
      }
      setSelectedRecipe(recipe);
    } catch (error: any) {
      Alert.alert("Error", `${error}`, [
        {
          text: "Try again",
          onPress: () => {},
        },
      ]);
    }
  };

  useEffect(() => {
    if (recipeId) {
      getRecipe();
    }
  }, [recipeId]);

  const renderRecipeCardHeader = () => (
    <View style={styles.ingredient_header}>
      <ImageBackground
        source={{ uri: `${selectedRecipe?.image_url}` }}
        resizeMode="cover"
        style={styles.recipe_img}
      ></ImageBackground>
      <Animated.View style={styles.header_view}>
        <RecipeCardInfo selectedRecipe={selectedRecipe} />
      </Animated.View>
    </View>
  );
  const renderHeaderBar = () => (
    <View style={styles.headerBar}>
      <TouchableOpacity
        style={styles.headerBar_content}
        onPress={() => navigation.goBack()}
      >
        <Ionicons
          name="ios-chevron-back-outline"
          size={28}
          color={COLORS.LIGHT_GRAY}
        />
      </TouchableOpacity>
    </View>
  );
  const renderRecipeTitle = () => {
    const time = calTime(selectedRecipe?.ingredients.length);
    return (
      <View style={styles.recipe_title}>
        <View style={{ flex: 4 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              paddingBottom: 3,
              color: COLORS.ORANGE_TEXT,
            }}
          >
            {selectedRecipe?.title}
          </Text>
          <Text
            style={{
              color: COLORS.GRAY2,
            }}
          >
            {time} minutes | 4 servings
          </Text>
        </View>
        <TouchableOpacity
          style={{
            flex: 1,
            alignItems: "flex-end",
          }}
          onPress={() => console.log("dkm trai tim")}
        >
          <Ionicons name="heart-outline" size={30} color={COLORS.ORANGE} />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Animated.FlatList
        data={selectedRecipe?.ingredients}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            {renderRecipeCardHeader()}
            {renderHeaderBar()}
            {renderRecipeTitle()}
          </View>
        }
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        renderItem={(item) => {
          return (
            <View style={styles.ingredient_container}>
              <Ionicons
                name="checkmark-circle-outline"
                size={24}
                color={COLORS.ORANGE}
                style={styles.ingredient_icon}
              />
              <Text style={styles.ingredient_text}>{item.item}</Text>
            </View>
          );
        }}
      />
    </View>
  );
}

export default DetailRecipe;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  ingredient_container: {
    flexDirection: "row",
    paddingHorizontal: 30,
    alignItems: "center",
    marginVertical: 8,
  },
  ingredient_icon: {
    marginRight: 15,
  },
  ingredient_text: {
    marginRight: 50,
  },
  ingredient_header: { alignItems: "center" },
  recipe_img: {
    height: 300,
    width: "100%",
  },
  img_background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 300,
  },
  header_view: {
    position: "absolute",
    bottom: 10,
    left: 30,
    right: 30,
    height: 80,

    // borderWidth: 5,
    // borderColor: "red",
  },
  headerBar: {
    position: "absolute",
    top: 10,
    left: 0,
    right: 0,
    height: 90,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingHorizontal: PADDING,
    paddingBottom: 10,
  },
  headerBar_content: {
    alignItems: "center",
    justifyContent: "center",
    height: 35,
    width: 35,
    backgroundColor: COLORS.TRANS_GRAY,
    borderRadius: 50,
    borderColor: COLORS.LIGHT_GRAY,
    borderWidth: 1,
  },
  recipe_title: {
    height: 100,
    // borderColor: "red",
    // borderWidth: 1,
    paddingLeft: 30,
    paddingRight: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
