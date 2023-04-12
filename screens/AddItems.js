import React from "react";
import { View } from "react-native-animatable";
import { Button } from "react-native-elements";
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  PermissionsAndroid,
} from "react-native";
import { TextInput } from "react-native";
import ImagePicker from "react-native-image-picker";



const AddItems = () => {
  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        placeholder="Name Item"
        keyboardType="text"
      />
      <TextInput
        style={styles.input}
        placeholder="Category Item"
        keyboardType="text"
      />
      <TextInput
        style={styles.input}
        placeholder="Quantity Type"
        keyboardType="text"
      />
      <TextInput
        style={styles.input}
        placeholder="Quantity"
        keyboardType="text"
      />

      <View>
        <TouchableOpacity onPress={() => requestCameraPermission()}>
          <Image
            style={{ width: 100, height: 100 }}
            source={require("../assets/icon.png")}
          />
        </TouchableOpacity>

        <TouchableOpacity></TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    margin: 10,
    backgroundColor: "hsl(3, 17%, 45%)",
    color: "white",
    fontSize: 20,
    height: 50,
    borderRadius: 10,
  },
});

export default AddItems;
