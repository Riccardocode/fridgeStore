import React from "react";
import { View } from "react-native-animatable";
import { Button, Icon } from "react-native-elements";
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
import { useDispatch } from "react-redux";
import { postGood } from "../storage/goodsSlice";

const AddItemsScreen = (props) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Fruit");
  const [quantityType, setQuantityType] = useState("Pz");
  const [quantity, setQuantity] = useState("");
  const [quantityMax, setQuantityMax] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const submit = () => {
    console.log("entrato in submit");
    const newItem = {
      //add the id before pushing the object to the array
      name: name,
      category: category,
      typeQuantity: quantityType,
      quantity: quantity,
      full_quantity: quantityMax,
      //remember to change the url with the one taken from the camera or gallery.
      image: imageUrl,
    };
    dispatch(postGood(newItem));
    props.navigation.navigate("Storage");
    resetForm();
  };
  const chooseImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      console.log("Permission not granted!");
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

  const resetForm = () =>{
    setName("");
    setCategory("Fruit");
    setQuantityType("Pz");
    setQuantity("");
    setQuantityMax("");
    setImageUrl("");
  };

  const handleCancel = () =>{
    props.navigation.navigate("Storage");
    resetForm();
  };

  const getImageFromCamera = async () => {
    const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();

    if (cameraPermission.status === "granted") {
      console.log(cameraPermission);
      const capturedImage = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
      });
      if (capturedImage.assets) {
        console.log(capturedImage.assets[0]);
        setImageUrl(capturedImage.assets[0].uri);
      }
    } else {
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
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        
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

      <View
        style={{
          flexDirection: "row",
          alignItems: "baseline",
          justifyContent: "space-evenly",
        }}
      >
        <TouchableOpacity onPress={() => getImageFromCamera()}>
          <Icon
            name="camera"
            type="font-awesome"
            color="#2b9094"
            size={40}
            raised
            reverse
            
          />

          {/* <Image
            style={{ width: 130, height: 130, marginLeft: 20 }}
            source={require("../assets/camera.png")}
          /> */}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => chooseImage()}>
          <Icon
            name="image"
            type="font-awesome"
            color="#2b9094"
            size={40}
            raised
            reverse
            
          />
          {/* <Image
            style={{ width: 130, height: 130 }}
            source={require("../assets/gallery.png")}
          /> */}
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <TouchableOpacity style={styles.sizeCanSub} onPress={() => handleCancel()}>
          <Text style={styles.submit}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sizeCanSub} onPress={() => submit()}>
          <Text style={styles.submit}>Submit</Text>
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: "row", paddingTop: 39 }}>
        <View style={styles.formButton}>
          <Button
            onPress={() => props.navigation.navigate("Storage")}
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
            onPress={() => props.navigation.navigate("Add Items")}
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
          ></Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  formButton: {
    width: "50%",
  },
  sizeCanSub: {
    width: "45%",
  },
  input: {
    margin: 10,
    marginTop: 20,
    backgroundColor: "#df9682",
    color: "white",
    fontSize: 20,
    height: 50,
    borderRadius: 10,
  },
  picker: {
    margin: 10,
    borderRadius: 10,
    width: "35%",
    backgroundColor: "#df9682",
    color: "white",
    fontSize: 20,
    height: 50,
  },
  submit: {
    margin: 10,

    textAlign: "center",
    textAlignVertical: "center",
    backgroundColor: "blue",
    color: "white",
    fontSize: 20,
    height: 40,
    borderRadius: 10,
  },
});

export default AddItemsScreen;
