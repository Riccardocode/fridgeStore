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
import * as ImageManipulator from "expo-image-manipulator";
import * as MediaLibrary from "expo-media-library";
import { baseUrl } from "../shared/baseUrl";

const AddItemsScreen = (props) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Fruit");
  const [quantityType, setQuantityType] = useState("Pz");
  const [quantity, setQuantity] = useState("");
  const [quantityMax, setQuantityMax] = useState("");
  const [imageUrl, setImageUrl] = useState(baseUrl + "images/gallery.png");
 

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
    const mediaLibraryPermissions =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (mediaLibraryPermissions.status === "granted") {
      const capturedImage = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
      });
      if (capturedImage.assets) {
        console.log(capturedImage.assets[0]);
        processImage(capturedImage.assets[0].uri);
        
      }
    }
  };

  const resetForm = () => {
    setName("");
    setCategory("Fruit");
    setQuantityType("Pz");
    setQuantity("");
    setQuantityMax("");
    setImageUrl(baseUrl + "images/gallery.png");
  };

  const handleCancel = () => {
    props.navigation.navigate("Storage");
    resetForm();
  };

  const getImageFromCamera = async () => {
    try {
      const cameraPermission =
        await ImagePicker.requestCameraPermissionsAsync();

      if (cameraPermission.status === "granted") {
        const capturedImage = await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          aspect: [1, 1],
        });
        if (capturedImage.assets) {
          console.log(capturedImage.assets[0]);
          processImage(capturedImage.assets[0].uri);
          console.log(logo);
          //MediaLibrary.saveToLibraryAsync(imageUrl);
        
        }
      }
    } catch (error) {
      console.log("something went wrong ", error);
    }
  };

  const processImage = async (imgUri) => {
    const processedImage = await ImageManipulator.manipulateAsync(
      imgUri,
      [{ resize: { width: 400 } }],
      { format: ImageManipulator.SaveFormat.PNG }
    );
    console.log(processedImage);
    setImageUrl(processedImage.uri);
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
          <Picker.Item label="Bread and Bakery" value={"BreadandBakery"} />
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
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <Image
          source={{ uri: imageUrl }}
          style={{ width: 200, height: 200, borderRadius: 50 }}

        />
        <View>
          <TouchableOpacity onPress={() => getImageFromCamera()}>
            <Icon
              name="camera"
              type="font-awesome"
              color="#2b9094"
              size={40}
              raised
              reverse
            />
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
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <TouchableOpacity
          style={styles.sizeCanSub}
          onPress={() => handleCancel()}
        >
          <Text style={styles.cancel}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sizeCanSub} onPress={() => submit()}>
          <Text style={styles.submit}>Submit</Text>
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: "row", paddingTop: 13 }}>
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
    marginTop: 5,
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
    backgroundColor: "#008CBA",
    color: "white",
    fontSize: 20,
    height: 40,
    borderRadius: 10,
  },
  cancel:{
    margin: 10,
    textAlign: "center",
    textAlignVertical: "center",
    backgroundColor: "#f44336",
    color: "white",
    fontSize: 20,
    height: 40,
    borderRadius: 10,
  }
});

export default AddItemsScreen;
