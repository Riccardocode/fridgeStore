import { View, TouchableOpacity } from "react-native";
import SuppliersShow from "../components/suppliersShow";
import { Text } from "react-native";
import { FlatList } from "react-native-gesture-handler";

const SendOrderScreen = () => {
  return (
    <View>
      
      <SuppliersShow />
  
      <View style={{flexDirection:'row'}}>
        <TouchableOpacity>
          <Text>Email</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Social</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SendOrderScreen;
