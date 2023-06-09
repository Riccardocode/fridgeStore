import { View, TouchableOpacity, Share, StyleSheet } from "react-native";
import SuppliersShow from "../components/suppliersShow";
import { Text } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { updateQuantity } from "../storage/goodsSlice";
import * as MailComposer from "expo-mail-composer";
import { Button, Icon } from "react-native-elements";


const SendOrderScreen = ({navigation}) => {
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
    let listBuy = "";
    items.goodsArray.map((good) => {
      difference = good.full_quantity - good.quantity;
      if (difference > 0) {
        toBuy.push({ id: good.id, name: good.name, quantity: difference });
        listBuy =
          listBuy +
          good.name +
          " " +
          difference +
          " " +
          good.typeQuantity +
          "\n";
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
      recipients: [],
      subject: "Inquire",
      body: `To whom may it concern \n ${listBuy}`,
    });

    toBuy = [];
    console.log(str);
  };

  const shareShoppingList = (title) => {
    let listBuy = calculateItemToBuy();
    Share.share(
      {
        title,
        message: `To buy:\n ${listBuy}`,
      },
      {
        dialogTitle: "Share" + title,
      }
    );
    topupQuantities();
  };

  return (
    <View>
      <View style={{ flexDirection: "row",justifyContent:'center' }}>
        <Icon
          name="envelope"
          type="font-awesome"
          color="#5637DD"
          raised
          reverse
          onPress={() => composeEmail()}
        />
        <Icon
          name="share"
          type="font-awesome"
          color="#5637DD"
          raised
          reverse
          onPress={() => shareShoppingList("Shopping List")}
        />
      </View>
      <SuppliersShow />

      <View style={{ flexDirection: "row", paddingTop:178}}>
          <View style={styles.formButton}>
            <Button
            style={{height:1}}
              onPress={() => navigation.navigate("Storage")}
              title="Storage"
              color="#5637DD"
              icon={
                <Icon
                  name="archive"
                  type="font-awesome"
                  color="#fff"
                  iconStyle={{ marginRight: 10 }}
                />
              }
              buttonStyle={{ backgroundColor: "#2b9094" }}
            />
           
          </View>

          <View style={styles.formButton}>
            <Button
              onPress={() => navigation.navigate("Add Items")}
              title="Add Item"
              color="#5637DD"
              icon={
                <Icon
                  name="plus"
                  type="font-awesome"
                  color="#fff"
                  iconStyle={{ marginRight: 10 }}
                />
              }
              buttonStyle={{ backgroundColor: "#2b9094" }}
            />
          </View>
        </View>

    </View>
  );
};

const styles = StyleSheet.create({
  formButton: {
    width: "50%",
 
  },
});

export default SendOrderScreen;
