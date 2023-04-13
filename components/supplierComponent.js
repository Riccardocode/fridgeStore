import { View } from "react-native";
import { Avatar,Card} from "react-native-paper";
import { Text } from "react-native-elements";
import { baseUrl } from "../shared/baseUrl";
import { TouchableOpacity } from "react-native-gesture-handler";

const SupplierComponent = ({ item }) => {
  return (
    <View>
      <Card>
      <View style={{flexDirection:'row'}}>
        
          <Avatar.Image
            size={100}
            
            //source={require("../assets/imageItemsCategory/Apple.png")}
            source={{uri:baseUrl + item.image}}
          />
          <View style={{alignItems:'center', flexGrow:1,justifyContent:'center'}}>
          <Text style={{alignSelf:'center', fontSize:30}}>{item.name}</Text>
          <TouchableOpacity 
            style={{backgroundColor:'blue'}}
            onPress={() =>{}}
            >

            <Text style={{alignSelf:'center', fontSize:20, color:'white'}}>Send Order</Text>
          </TouchableOpacity>
          </View>
           
      </View>
        
        
      </Card>
    </View>
  );
};
export default SupplierComponent;
