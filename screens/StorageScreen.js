import { Text, View, ScrollView } from "react-native";
import ItemsHomePage from "../components/ItemsHomePage";
import SearchBar from "react-native-elements/dist/searchbar/SearchBar-ios";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Icon } from "react-native-elements";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";


const StorageScreen = ({navigation}) => {
  const [search, setSearch] = useState("");
  
  return (
    <SafeAreaView>
      <View>
        <SearchBar
          placeholder="Search"
          value={search}
          onChangeText={setSearch}
        />
        <ItemsHomePage search={search} navigation={navigation}  />
        
      </View>
    </SafeAreaView>
  );
};

export default StorageScreen;
