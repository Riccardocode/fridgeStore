import { FlatList, View, Text } from "react-native";
import { Card } from "react-native-elements";
import { useState } from "react";
import { ITEMSCATEGORY } from "../shared/itemSingleCategory";


const ItemsCategoryScreen = ({route}) =>{
    console.log(route.params.category.name);
    const [itemsCategory, setItemsCategories] =useState(ITEMSCATEGORY);
    const renderDirectoryItem = ({item}) =>{
        return(
            // onPress={()=>navigation.navigate('SingleCategory',{category})}
            <Card> 
                <Card.Image source={item.image}/>
                <View style={{ justifyContent: "center", flex: 1 }}>
                    <Text
                        style={{
                            color: "black",
                            textAlign: "center",
                            fontSize: 20,
                        }}
                    >
                        {item.name}
                    </Text>
                </View>
            </Card>
         
           
        )
    }
    
    return(
        <FlatList 
            data={itemsCategory.filter((item) => item.category === route.params.category.name)}
            renderItem={renderDirectoryItem}
            keyExtractor={(item) => item.id.toString()}
        />
    );
};

export default ItemsCategoryScreen;