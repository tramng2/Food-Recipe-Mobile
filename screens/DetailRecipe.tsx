import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Animated,
  Image,
  TouchableOpacity,
  Platform,
  StyleSheet,
  SafeAreaView,
  Alert,
} from "react-native";
import { BORDER_RADIUS, COLORS, IMAGES, MARGIN } from "../assets/ConstantStyle";
import { Ionicons } from "@expo/vector-icons";

function DetailRecipe({ navigation, route }: any) {
  const [recipeId, setRecipeId] = useState<any>(null);
  const [selectedRecipe, setSelectedRecipe] = useState<any>(null);
  const scrollY = useRef(new Animated.Value(0)).current;
  console.log(selectedRecipe);
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

  // const renderRecipeCardHeader = () => (

  // );
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.ingredient_header}>
        <Image
          source={{ uri: `${selectedRecipe?.image_url}` }}
          resizeMode="cover"
          style={styles.recipe_img}
        />
      </View>
      <Animated.FlatList
        data={selectedRecipe?.ingredients}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        // ListHeaderComponent={<View>{renderRecipeCardHeader()}</View>}
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
    </SafeAreaView>
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
    // borderColor: "red",
    // borderWidth: 1,
    alignItems: "center",
    marginVertical: 8,
  },
  ingredient_icon: {
    marginRight: 15,
    // borderColor: "pink",
    // borderWidth: 1,
  },
  ingredient_text: {
    marginRight: 50,
    // borderColor: "red",
    // borderWidth: 1,
  },
  ingredient_header: { alignItems: "center" },
  recipe_img: {
    height: 300,
    width: "100%",
    backgroundColor: COLORS.ORANGE_TRANS,
    // backgroundImage: "linear-gradient(to right bottom, #FBDB89, #F48982)",
  },
});
