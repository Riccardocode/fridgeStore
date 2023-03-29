import { FlatList, View, Text } from "react-native";
import { Card } from "react-native-elements";

const CategoryScreen = (props) =>{
    const renderDirectoryItem = ({item:categories}) =>{
        return(
       
            <Card>
                <Card.Image source={categories.image}/>
                <View style={{ justifyContent: "center", flex: 1 }}>
                    <Text
                        style={{
                            color: "black",
                            textAlign: "center",
                            fontSize: 20,
                        }}
                    >
                        {categories.name}
                    </Text>
                </View>
            </Card>
         
           
        )
    }
    
    return(
        <FlatList 
            data={props.categories}
            renderItem={renderDirectoryItem}
            keyExtractor={(item) => item.id.toString()}
        />
    );
};

export default CategoryScreen;