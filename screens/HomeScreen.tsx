import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Pressable,
  TextInput,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import { Categories } from "../types";
import { BORDER_RADIUS, COLORS, IMAGES, MARGIN } from "../assets/ConstantStyle";
import { CategoryCard } from "../components";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "react-native-elements";

function HomeScreen() {
  const [categories, setCategories] = useState<Categories[]>([]);

  const foodCategories = async () => {
    const response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/categories.php"
    );
    const { categories } = await response.json();
    setCategories(categories);
  };

  const renderHeader = () => (
    <View style={styles.top}>
      <View>
        <Text style={styles.top_title} h4>
          Hello, Tram
        </Text>
        <Text style={styles.top_subTitle}>What do you want to cook today?</Text>
      </View>
      <TouchableOpacity onPress={() => console.log("profile")}>
        <Image source={IMAGES.PROFILE} style={styles.profile} />
      </TouchableOpacity>
    </View>
  );
  const renderSearchBar = () => {
    return (
      <Pressable style={styles.searchBar} onPress={() => console.log("dkm")}>
        <Ionicons name="md-search" size={25} color={COLORS.GRAY} />
        <Text style={{ color: COLORS.GRAY, marginLeft: 10 }}>Find Recipes</Text>
      </Pressable>
    );
  };
  const trendyCategories = () => (
    <View>
      <Text style={styles.sub_title} h4>
        Categories
      </Text>
      <FlatList
        horizontal
        data={categories}
        renderItem={({ item }) => {
          return <CategoryCard recipeItem={item} />;
        }}
        keyExtractor={(item) => item.idCategory}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );

  useEffect(() => {
    foodCategories();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <View>
          {renderHeader()}
          {renderSearchBar()}
          {trendyCategories()}
        </View>
      </View>
    </SafeAreaView>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  wrapper: {
    paddingLeft: 25,
    paddingRight: 25,
  },
  top: {
    height: 100,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    borderWidth: 4,
    borderColor: "blue",
  },
  top_title: {
    fontWeight: "bold",
    color: COLORS.ORANGE_TEXT,
  },
  top_subTitle: {
    marginTop: 3,
    color: COLORS.GRAY,
  },
  profile: {
    width: 55,
    height: 55,
    borderRadius: 20,
    backgroundColor: "black",
  },
  searchBar: {
    flexDirection: "row",
    height: 50,
    alignItems: "center",
    paddingHorizontal: 30,
    borderRadius: BORDER_RADIUS,
    backgroundColor: COLORS.LIGHT_GRAY,
    marginTop: 10,
  },

  sub_title: {
    fontWeight: "bold",
    marginTop: 30,
  },
});
