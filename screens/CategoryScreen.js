import { FlatList, View, Text } from "react-native";
import { Card } from "react-native-elements";
import { useState } from "react";
import { CATEGORIES } from "../shared/itemCategories";

const CategoryScreen = ({ navigation }) => {
  const [categories, setCategories] = useState(CATEGORIES);
  const renderDirectoryItem = ({ item: category }) => {
    return (
      //<Card >

      <Card>
        <Card.Image
          source={category.image}
          onPress={() => navigation.navigate("ItemsCategory", { category })}
        />
        <View style={{ justifyContent: "center", flex: 1 }}>
          <Text
            style={{
              color: "black",
              textAlign: "center",
              fontSize: 20,
            }}
          >
            {category.name}
          </Text>
        </View>
      </Card>
    );
  };

  return (
    <FlatList
      data={categories}
      renderItem={renderDirectoryItem}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

export default CategoryScreen;
