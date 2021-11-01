import React from "react";
import {
  Platform,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { BORDER_RADIUS, COLORS } from "../assets/ConstantStyle";
import Ionicons from "@expo/vector-icons/build/Ionicons";

function RecipeCardInfo({ selectedRecipe }: any) {
  return (
    <View style={styles.card}>
      <View>
        <Text style={styles.card_content}>Recipe by:</Text>
        <Text style={styles.card_content2}>{selectedRecipe?.publisher}</Text>
      </View>

      <TouchableOpacity onPress={() => console.log("new tab")}>
        <Ionicons
          name="arrow-forward-outline"
          size={20}
          color={COLORS.ORANGE}
          style={{
            borderColor: COLORS.ORANGE,
            borderWidth: 1,
            padding: 4,
            borderRadius: 5,
          }}
        />
      </TouchableOpacity>
    </View>
  );
}

export default RecipeCardInfo;
const styles = StyleSheet.create({
  card: {
    flex: 1,
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "100%",
    paddingHorizontal: 20,
    paddingVertical: 5,
    backgroundColor: COLORS.TRANS_GRAY2,
    borderRadius: BORDER_RADIUS,
    color: COLORS.WHITE,
  },
  card_content: {
    color: COLORS.OFF_WHITE,
  },
  card_content2: {
    color: COLORS.WHITE,
    fontSize: 15,
    paddingTop: 5,
  },
});
