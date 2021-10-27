import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Pressable,
  Button,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Modal,
} from "react-native";
import { Recipes } from "../types";
import { BORDER_RADIUS, COLORS, IMAGES, MARGIN } from "../assets/ConstantStyle";
import { CategoryCard } from "../components";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "react-native-elements";
import { dummyData } from "../data";

function HomeScreen({ navigation }: any) {
  const [recipes, setRecipe] = useState<Recipes[]>([]);
  useEffect(() => {
    setRecipe(dummyData);
  }, []);
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
      <Pressable
        style={styles.searchBar}
        onPress={() => navigation.navigate("Search")}
      >
        <Ionicons name="md-search" size={25} color={COLORS.GRAY} />
        <Text style={{ color: COLORS.GRAY, marginLeft: 10 }}>Find Recipes</Text>
      </Pressable>
    );
  };
  const reminder = () => (
    <View style={styles.reminder}>
      <Image
        source={{
          uri: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
        }}
        style={styles.reminder_icon}
      />
      <Pressable onPress={() => navigation.navigate("Shopping List")}>
        <Text style={styles.reminder_text}>
          Remmber to buy your ingredients
        </Text>
        <Text style={styles.reminder_text2}>Go to shopping list</Text>
      </Pressable>
    </View>
  );
  const trendyRecipes = () => (
    <View>
      <Text style={styles.sub_title} h4>
        Recommended Recipes
      </Text>
      <FlatList
        horizontal
        data={recipes}
        renderItem={({ item }) => {
          return (
            <CategoryCard
              recipeItem={item}
              onPress={() => navigation.navigate("Recipe", { recipe: item })}
            />
          );
        }}
        keyExtractor={(item) => item.recipe_id}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <View>
          {renderHeader()}
          {renderSearchBar()}
          {reminder()}
          {trendyRecipes()}
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
    height: 80,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
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
    // borderColor: "blue",
    // borderWidth: 1,
  },
  sub_title: {
    fontWeight: "bold",
    marginTop: 15,
    // borderColor: "blue",
    // borderWidth: 1,
  },
  reminder: {
    height: 80,
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: COLORS.ORANGE_TRANS,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: BORDER_RADIUS,
    borderColor: "blue",
    // borderWidth: 1,
  },
  reminder_text: {
    fontSize: 15,
  },
  reminder_text2: {
    fontSize: 15,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  reminder_icon: {
    width: 55,
    height: 55,
    borderRadius: 20,
    backgroundColor: "black",
  },
});
