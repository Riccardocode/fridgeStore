import { FlatList, View, Text, StyleSheet } from "react-native";
import { Card } from "react-native-elements";
import { useState } from "react";
import ItemHome from "./ItemHome";
//import { ITEMSSTORED } from "../shared/itemsStored";
import { useSelector } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";

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
        {/* button at the bottom to update the new data into server? or shall I update everytime there is a change? */}
        <TouchableOpacity style={styles.updateButton} onPress= {() =>{}}>
          <Text style={{textAlign:'center', textAlignVertical:'center' ,color:"white"}}>update Server</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  updateButton:{
    backgroundColor:"blue",
    height:40,
    
  }
});
export default ItemsHomePage;
