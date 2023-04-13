import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Avatar,Card} from "react-native-paper";
import { baseUrl } from "../shared/baseUrl";


const ItemHome = ({item}) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const [typeQuantity, setTypeQuantity] = useState(item.typeQuantity);
  return (
    <Card>
      <View style={{ flexDirection: "row" }}>
        <View style={{ borderRadius: 50 }}>
          <Avatar.Image
            size={100}
            //source={require("../assets/imageItemsCategory/Apple.png")}
            source={{uri:baseUrl + item.image}}
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
                if (quantity > 0) {
                  setQuantity(quantity - 1);
                }
              }}
            >
              <Text style={{ fontSize: 20 }}>-</Text>
            </TouchableOpacity>
            <Text style={{ marginHorizontal: 10, fontSize:30, font:'bold' }}>{typeQuantity}: {quantity} / {item.full_quantity}</Text>
            <TouchableOpacity
              style={{
                padding: 5,
                backgroundColor: "green",
                width: 50,
                borderRadius: 10,
                alignItems: "center",
              }}
              onPress={() => setQuantity(quantity + 1)}
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
