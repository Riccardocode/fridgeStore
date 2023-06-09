import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Avatar, Card } from "react-native-paper";
import { baseUrl } from "../shared/baseUrl";
import { useSelector, useDispatch } from "react-redux";
import { updateQuantity } from "../storage/goodsSlice";

const ItemHome = ({ item }) => {
  const itemsStored = useSelector((state) => state.goods.goodsArray);
  const dispatch = useDispatch();
  const [typeQuantity, setTypeQuantity] = useState(item.typeQuantity);
  const [uri,setUri] = useState(baseUrl + item.image)
  
  const handleErrorImage = () =>{
    setUri(item.image);
  }
  return (
    <Card>
      <View style={{ flexDirection: "row" }}>
        <View style={{ borderRadius: 50 }}>
      
          <Avatar.Image
            size={100}
            //source={require("../assets/imageItemsCategory/Apple.png")}
            source={{ uri: uri }}
            onError={handleErrorImage}
          />
        </View>
        <View
          style={{
            flex: 1,
            marginLeft: 10,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: 30,
              fontWeight: "bold",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {item.name}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <TouchableOpacity
              style={{
                padding: 5,
                backgroundColor: "orange",
                width: 50,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                if (item.quantity > 0) {
                  //setQuantity(quantity - 1);
                  //Codice per aggiornare la quantita' all'interno del vettore
                  itemsStored.map((good) => {
                    if (good.id == item.id) {
                      dispatch(updateQuantity([item.id, item.quantity - 1]));
                      console.log(good.quantity);
                    }
                  });
                }
              }}
            >
              <Text style={{ fontSize: 20 }}>-</Text>
            </TouchableOpacity>
            <Text style={{ marginHorizontal: 10, fontSize: 30, font: "bold" }}>
              {typeQuantity}: {item.quantity} / {item.full_quantity}
            </Text>
            <TouchableOpacity
              style={{
                padding: 5,
                backgroundColor: "green",
                width: 50,
                borderRadius: 10,
                alignItems: "center",
              }}
              onPress={() => {
                //setQuantity(quantity + 1);
                itemsStored.map((good) => {
                  if (good.id == item.id) {
                    dispatch(updateQuantity([item.id, item.quantity + 1]));
                    //console.log(good.quantity);
                  }
                });
              }}
            >
              <Text style={{ fontSize: 20 }}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Card>
  );
};

export default ItemHome;
