import { View } from "react-native";
import { Avatar, Card } from "react-native-paper";
import { Text } from "react-native-elements";
import { baseUrl } from "../shared/baseUrl";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as MailComposer from "expo-mail-composer";
import { FlatList } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { updateQuantity } from "../storage/goodsSlice";


const SupplierComponent = ({ item }) => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.goods);
  let toBuy = [];

  //riporta le quantita' al massimo
  const topupQuantities = () => {
    let difference = 0;
    items.goodsArray.map((good) => {
      difference = good.full_quantity - good.quantity;
      if (difference > 0) {
        dispatch(updateQuantity([good.id, good.full_quantity]));
      }
    });
  };
  const calculateItemToBuy = () => {
    let difference = 0;
    let listBuy='';
    items.goodsArray.map((good) => {
      difference = good.full_quantity - good.quantity;
      if (difference > 0) {
        toBuy.push({ id: good.id, name: good.name, quantity: difference });
        listBuy=listBuy + good.name + " "  + difference +" "+ good.typeQuantity+ '\n';
      }
    });
    return listBuy;
  };

  //compose email deve calcolare gli oggetti da comprare e poi comporre l'email
  const composeEmail = () => {
    let listBuy = calculateItemToBuy();
    const str = JSON.stringify(toBuy);
    topupQuantities();
    MailComposer.composeAsync({
      recipients: [item.email],
      subject: "Inquire",
      body: `To ${item.name} \n ${listBuy}`,
    });
    
    toBuy=[];
    console.log(str);
  };



  return (
    <View>
      <Card>
        <View style={{ flexDirection: "row" }}>
          <Avatar.Image
            size={100}
            //source={require("../assets/imageItemsCategory/Apple.png")}
            source={{ uri: baseUrl + item.image }}
          />
          <View
            style={{
              alignItems: "center",
              flexGrow: 1,
              justifyContent: "center",
            }}
          >
            <Text style={{ alignSelf: "center", fontSize: 30 }}>
              {item.name}
            </Text>
            <TouchableOpacity
              style={{ backgroundColor: "blue" }}
              onPress={() => composeEmail()}
            >
              <Text
                style={{ alignSelf: "center", fontSize: 20, color: "white" }}
              >
                Send Order
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Card>
    </View>
  );
};
export default SupplierComponent;
