import { FlatList, View, Text } from "react-native";
import { Card } from "react-native-elements";
import { useState } from "react";
import { ITEMSCATEGORY } from "../shared/itemSingleCategory";
import SearchBox from "../components/SearchBox";

import { useSelector } from "react-redux";
import { baseUrl } from "../shared/baseUrl";

const ItemsCategoryScreen = ({ route }) => {
  console.log(route.params.category.name);
  const itemsStored =useSelector((state) => state.goods);

  //const [itemsCategory, setItemsCategories] = useState(ITEMSCATEGORY);
  const renderDirectoryItem = ({ item }) => {
    return (
      // onPress={()=>navigation.navigate('SingleCategory',{category})}
      
      <Card>
        <View >
          <Card.Image source={{uri: baseUrl + item.image}} />
          <View style={{ justifyContent: "center", flex: 1 }}>
            <Text
              style={{
                color: "black",
                textAlign: "center",
                fontSize: 20,
              }}
            >
              {item.name} Qt: {item.quantity} / {item.full_quantity}
            </Text>
          </View>
        </View>
      </Card>
    );
  };

  return (
    <>
      <FlatList
        data={itemsStored.goodsArray.filter(
          (item) => item.category === route.params.category.name
        )}
  
        renderItem={renderDirectoryItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </>
  );
};

export default ItemsCategoryScreen;
