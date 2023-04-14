import SupplierComponent from "./supplierComponent";
import { useSelector } from "react-redux";
import { View,Text } from "react-native";
import { FlatList } from "react-native";

const SuppliersShow = () => {
  const suppliers = useSelector((state) => state.suppliers);

  return (
    <View>
      <FlatList
        data={suppliers.suppliersArray.map((supplier) => {
            
            return supplier;
        })}
        renderItem={({item}) => (
          <View style={{ height: 100 }}>
            <SupplierComponent item={item}/>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default SuppliersShow;
