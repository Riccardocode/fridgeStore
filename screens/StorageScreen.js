import { Text, View } from "react-native";
import ItemsHomePage from "../components/ItemsHomePage";
import SearchBar from "react-native-elements/dist/searchbar/SearchBar-ios";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";


const StorageScreen = () => {
  const [search, setSearch] = useState("");
  return (
    <SafeAreaView>
      <View>
        <SearchBar
          placeholder="Search"
          value={search}
          onChangeText={setSearch}
        />
        <ItemsHomePage search={search} />
      </View>
    </SafeAreaView>
  );
};

export default StorageScreen;
