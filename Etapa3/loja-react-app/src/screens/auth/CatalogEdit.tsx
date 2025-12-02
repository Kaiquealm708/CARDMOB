import React, { useState } from "react";
import { View, Text, TextInput, Image, StyleSheet } from "react-native";

import * as ImagePicker from "expo-image-picker";

import { useShop } from "../../contexts/ShopContext";

function CatalogEdit({ navigation }: any) {
  const [itemImage, setItemImage] = useState(null);
  const [editingItem, setEditingItem] = useState({ image: "" }); // Example state for editingItem

  return (
    <View>
      <Text>Editando produto</Text>
      <Image source={{ uri: editingItem.image }} />
    </View>
  );
}
export default CatalogEdit;

const styles = StyleSheet.create({
  container: {},
});
