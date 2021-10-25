import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  TextInput,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Categories } from "../types";

const Item = ({ strCategory }: any) => {
  return (
    <View style={styles.item}>
      <Text>{strCategory}</Text>
    </View>
  );
};
function HomeScreen() {
  const [categories, setCategories] = useState<Categories[]>([]);
  const foodCategories = async () => {
    const response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/categories.php"
    );
    const { categories } = await response.json();
    setCategories(categories);
  };
  const renderItem = ({ item }: any) => <Item strCategory={item.strCategory} />;

  useEffect(() => {
    foodCategories();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.top_title}>Hello, Tram</Text>
        <Ionicons name="settings" size={30} color="black" />
      </View>
      <View style={styles.bottom}>
        <Pressable onPress={() => console.log("dkm")}>
          <View style={styles.input}>
            <TextInput placeholder="Find your recipe" editable={false} />
          </View>
        </Pressable>
        <Text style={styles.bottom_title}>Categories</Text>

        <FlatList
          data={categories}
          renderItem={renderItem}
          keyExtractor={(item) => item.idCategory}
        />
      </View>
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    // borderWidth: 4,
    // borderColor: "blue",
    paddingTop: 30,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  top: {
    flex: 1,
    // borderWidth: 4,
    // borderColor: "blue",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingTop: 10,
  },
  top_title: {
    fontSize: 25,
    fontWeight: "bold",
  },
  bottom: {
    flex: 6,
    borderWidth: 4,
    borderColor: "blue",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    borderColor: "grey",
  },
  bottom_title: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 20,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});
