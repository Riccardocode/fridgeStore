import { FlatList, View, Text } from "react-native";
import { Card } from "react-native-elements";
import { useState } from "react";
import ItemHome from "./ItemHome";
//import { ITEMSSTORED } from "../shared/itemsStored";
import { useSelector } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const ItemsHomePage = ({ search }) => {
  const itemsStored = useSelector((state) => state.goods);

  let seachedword = search.toLowerCase();
  let sup;
  return (
    <SafeAreaView>
      <View style={{ height: "90%" }}>
        <FlatList
          data={itemsStored.goodsArray.filter((item) => {
            sup = item.name.toLowerCase();
            if (sup.includes(seachedword)) {
              return item;
            }
          })}
          renderItem={({ item }) => (
            <View style={{ height: 100 }}>
              <ItemHome item={item} />
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </SafeAreaView>
  );
};

export default ItemsHomePage;
