import { Platform, View } from "react-native";
import Constants from "expo-constants";

import CategoryScreen from "./CategoryScreen";
import { createStackNavigator } from "@react-navigation/stack";
import ItemsCategoryScreen from "./ItemsCategoryScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "./HomeScreen";
import AddItemsScreen from "./AddItemsScreen";
import StorageScreen from "./StorageScreen";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchGoods } from "../storage/goodsSlice";
import { fetchSuppliers } from "../storage/suppliersSlice";
import SendOrderScreen from "./sendOrderScreen";

const Drawer = createDrawerNavigator();

const screenOptions = {
  headerTintColor: "#fff",
  headerStyle: { backgroundColor: "#2b9094" },
};

const HomeNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Home" }}
      />
      <Stack.Screen name="Storage" component={StorageScreen} />
    </Stack.Navigator>
  );
};

const CategoryNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName="Category" screenOptions={screenOptions}>
      <Stack.Screen
        name="Category"
        component={CategoryScreen}
        options={{
          title: "Category Stored",
        }}
      />
      <Stack.Screen
        name="ItemsCategory"
        component={ItemsCategoryScreen}
        options={({ route }) => ({
          title: route.params.category.name,
        })}
      />
    </Stack.Navigator>
  );
};

const StorageNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="Home"
        component={StorageScreen}
        options={{ title: "Storage" }}
      />
      
    </Stack.Navigator>
  );
};
const SendOrder = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="SendOrder"
        component={SendOrderScreen}
        options={{ title: "Send Order" }}
      />
      
    </Stack.Navigator>
  );
};

const AddNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="Add Items"
        component={AddItemsScreen}
        options={{ title: "Add Item details" }}
      />
    </Stack.Navigator>
  );
};

const Main = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGoods());
    dispatch(fetchSuppliers());
   
  }, [dispatch]);

  //return <CategoryScreen categories = {categories}/>
  return (
    <View
      style={{
        flex: 1,
        paddingTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight,
      }}
    >
      <Drawer.Navigator
        initialRouterName="Home"
        drawerStyle={{ backgroundColor: "#CEC8FF" }}
      >
        <Drawer.Screen
          name="Home"
          component={HomeNavigator}
          options={{ title: "Home" }}
        />
        <Drawer.Screen
          name="Category"
          component={CategoryNavigator}
          options={{ title: "Category" }}
        />
        <Drawer.Screen
          name="Add Items"
          component={AddNavigator}
          options={{ title: "Add Items" }}
        />
        <Drawer.Screen
          name="Storage"
          component={StorageNavigator}
          options={{ title: "Storage" }}
        />
        <Drawer.Screen
          name="Send Order"
          component={SendOrder}
          options={{ title: "Send Order" }}
        />
      </Drawer.Navigator>
    </View>
  );
};

export default Main;
