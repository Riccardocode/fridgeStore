import {Text,View} from 'react-native';
import ItemsHomePage from '../components/ItemsHomePage';
import SearchBox from '../components/SearchBox';
import SearchBar from 'react-native-elements/dist/searchbar/SearchBar-ios';
import { useState } from 'react';
const HomeScreen =() =>{
    const [search, setSearch] = useState("");
    return(
        <View>
            <SearchBar placeholder="Search" value={search} onChangeText={setSearch}/>
            <ItemsHomePage search={search}/>

        </View>
    );
};

export default HomeScreen;