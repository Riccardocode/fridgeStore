import { FlatList, View, Text } from "react-native";
import { Card } from "react-native-elements";
import { useState } from "react";
import ItemHome from "./ItemHome";
import { ITEMSSTORED } from "../shared/itemsStored";


const ItemsHomePage = ({search}) =>{
    const [itemsCategory, setItemsCategories] =useState(ITEMSSTORED);
    let item2 = 0;
    let seachedword = search.toLowerCase();
    let sup;
    return(
        
        <FlatList 
            data={itemsCategory.filter((item) => {
                sup=item.name.toLowerCase();
                if(sup.includes(seachedword)){
                    return item;
                }
            })}
            renderItem={({item}) => <ItemHome item={item}/>}
            keyExtractor={(item) => item.id.toString()}
        />
        
    );
};

export default ItemsHomePage;

