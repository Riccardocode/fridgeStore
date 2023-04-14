import {
  Text,
  View,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Button, Icon } from "react-native-elements";

import { useState } from "react";
const HomeScreen = ({ navigation }) => {
  const [search, setSearch] = useState("");
  return (
    <ImageBackground
      source={require("../assets/homePage.png")}
      style={styles.image}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginVertical: 250,
        }}
      >
        <TouchableOpacity
          style={styles.storageButton}
          onPress={() => navigation.navigate("Storage")}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Text style={styles.text}>Storage</Text>
            
            <Icon
              name="play"
              type="font-awesome"
              color="#34938f"
              size={40}
              iconStyle={{}}
            />
          </View>
        </TouchableOpacity>
      </View>

      {/* <Button style={styles.storageBut}>
                
            </Button> */}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  iconn: {},
  image: {
    flex: 1,
    resizeMode: "cover",
  },
  storageBut: {
    backgroundColor: "#f6f2c5",
    width: 40,
  },
  storageButton: {
    backgroundColor: "#e4a819",
    width: 350,
    height: 80,
    borderRadius: 20,
    marginTop: 245,
    borderWidth: 2,
    borderColor: "black",
  },
  text: {
    fontSize: 50,
    color: "black",
    alignSelf: "center",
    justifyContent: "center",
    textAlign: "center",
    textAlignVertical: "center",
  },
});

export default HomeScreen;
