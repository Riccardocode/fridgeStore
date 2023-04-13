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
import { Button, Icon } from "react-native-elements";

const ItemsHomePage = (props) => {
  const itemsStored = useSelector((state) => state.goods);

  let seachedword = props.search.toLowerCase();
  let sup;
  return (
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
      <View style={{ flexDirection: "row" }}>
        <View style={styles.formButton}>
          <Button
            onPress={() => props.navigation.navigate("Storage")}
            title="Storage"
            color="#5637DD"
            icon={
              <Icon
                name="archive"
                type="font-awesome"
                color="#fff"
                iconStyle={{ marginRight: 10 }}
              />
            }
            buttonStyle={{ backgroundColor: "#5637DD" }}
          >
            <Text>ciao</Text>
          </Button>
        </View>

        <View style={styles.formButton}>
          <Button
            onPress={() => props.navigation.navigate("Add Items")}
            title="Add Item"
            color="#5637DD"
            icon={
              <Icon
                name="plus"
                type="font-awesome"
                color="#fff"
                iconStyle={{ marginRight: 10 }}
              />
            }
            buttonStyle={{ backgroundColor: "#5637DD" }}
          ></Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formButton: {
    width: "50%",
  },
});
export default ItemsHomePage;
