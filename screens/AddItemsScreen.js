import React from "react";
import { View } from "react-native-animatable";
import { Button } from "react-native-elements";
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Text,
  PermissionsAndroid,
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";



const AddItemsScreen = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [quantityType, setQuantityType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [quantityMax, setQuantityMax] = useState("");
  const [imageUrl, setImageUrl] = useState('');

      
  const chooseImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
    if (status !== 'granted') {
      console.log('Permission not granted!');
      return;
    }
  
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.canceled) {
      const source = { uri: result.uri };
  
      // You can now use the selected image source in your component's state or pass it to a function to upload or display it.
      setSelectedImage(source);
    }
  };

  const getImageFromCamera = async () => {
    const cameraPermission =
        await ImagePicker.requestCameraPermissionsAsync();

    if (cameraPermission.status === 'granted') {
      console.log(cameraPermission);
        const capturedImage = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1]
        });
        if (capturedImage.assets) {
            console.log(capturedImage.assets[0]);
            setImageUrl(capturedImage.assets[0].uri);
        }
    }
    else{
      console.log("not granted*************************");
    }
};


  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        placeholder="Name Item"
        value={name}
        keyboardType="text"
        onChangeText={(name) => setName(name)}
      />

      <View style={{flexDirection:'row'}}>
        <Picker
          style={styles.picker}
          selectedValue={category}
          placeholder="Category"
          onValueChange={(itemValue) => setCategory(itemValue)}
        >
          <Picker.Item label="Fruit" value={"Fruit"} />
          <Picker.Item label="Vegetables" value={"Vegetables"} />
          <Picker.Item label="Dairy" value={"Dairy"} />
          <Picker.Item label="Cheese" value={"Cheese"} />
          <Picker.Item label="Meat" value={"Meat"} />
          <Picker.Item label="Fish" value={"Fish"} />
          <Picker.Item label="Beverage" value={"Beverage"} />
          <Picker.Item label="Wine" value={"Wine"} />
        </Picker>

        <Picker
          style={styles.picker}
          selectedValue={quantityType}
          placeholder="Quantity Type"
          onValueChange={(itemValue) => setQuantityType(itemValue)}
        >
          <Picker.Item label="Pz" value={"Pz"} />
          <Picker.Item label="Kg" value={"Kg"} />
          <Picker.Item label="Lt" value={"Lt"} />
        </Picker>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Quantity"
        value={quantity}
        keyboardType="numeric"
        onChangeText={(quantity) => setQuantity(quantity)}
      />
      <TextInput
        style={styles.input}
        placeholder="Max Quantity"
        value={quantityMax}
        keyboardType="numeric"
        onChangeText={(quantityMax) => setQuantityMax(quantityMax)}
      />

      <View style={{flexDirection:'row', alignItems:'baseline', justifyContent:'space-evenly'}}>
        <TouchableOpacity onPress={() => getImageFromCamera()}>
          <Image
            style={{ width: 170, height: 170, marginTop:30, marginLeft:20 }}
            source={require("../assets/camera.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={ () => chooseImage()}>
          <Image
            style={{ width: 170, height: 170,marginTop:30}}
            source={require("../assets/gallery.png")}
          />
        </TouchableOpacity>

        <TouchableOpacity></TouchableOpacity>
      </View>

      <TouchableOpacity onPress={ () =>{} }>
          <Text style={styles.submit}>Submit</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    margin: 10,
    marginTop:20,
    backgroundColor: "hsl(3, 17%, 45%)",
    color: "white",
    fontSize: 20,
    height: 50,
    borderRadius: 10,
  },
  picker: {
    margin: 10,
    borderRadius: 100,
    width: "45%",
    backgroundColor: "hsl(3, 17%, 45%)",
    color: "white",
    fontSize: 20,
    height: 50,
  },
  submit:{
    margin: 10,
    textAlign:"center",
    textAlignVertical:'center',
    backgroundColor: "blue",
    color: "white",
    fontSize: 20,
    height: 50,
    borderRadius: 10,
  }
});

export default AddItemsScreen;
