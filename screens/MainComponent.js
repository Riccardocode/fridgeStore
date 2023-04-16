import { Platform, View, StyleSheet, Image,Text } from "react-native";
import Constants from "expo-constants";

import CategoryScreen from "./CategoryScreen";
import { createStackNavigator } from "@react-navigation/stack";
import ItemsCategoryScreen from "./ItemsCategoryScreen";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import HomeScreen from "./HomeScreen";
import AddItemsScreen from "./AddItemsScreen";
import StorageScreen from "./StorageScreen";
import ContactScreen from "./ContactScreen";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchGoods } from "../storage/goodsSlice";
import { fetchSuppliers } from "../storage/suppliersSlice";
import SendOrderScreen from "./sendOrderScreen";
import LoginScreen from "./LoginScreen";
import { Icon } from "react-native-elements";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import logo from '../assets/FridgeStore.png'
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
const ContactNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="Contact"
        component={ContactScreen}
        options={{ title: "Contact" }}
      />
    </Stack.Navigator>
  );
};

const LoginNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={screenOptions}>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={({ navigation, route }) => ({
          headerTitle: getFocusedRouteNameFromRoute(route),
          headerLeft: () => (
            <Icon
              name={
                getFocusedRouteNameFromRoute(route) === "Register"
                  ? "user-plus"
                  : "sign-in"
              }
              type="font-awesome"
              iconStyle={styles.stackIcon}
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
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

  const CustomDrawerContent = (props) => (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerHeader}>
        <View style={{ flex: 1}}>
          <Image source={logo} style={styles.drawerImage} />
        </View>
        <View style={{ flex: 2 }}>
          <Text style={styles.drawerHeaderText}></Text>
        </View>
      </View>
      <DrawerItemList {...props} labelStyle={{ fontWeight: "bold" }} />
    </DrawerContentScrollView>
  );

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
        drawerContent={CustomDrawerContent}
        drawerStyle={{ backgroundColor: "#7be2e6" }}
      >
        <Drawer.Screen
          name="Home"
          component={HomeNavigator}
          options={{
            title: "Home",
            drawerIcon: ({ color }) => (
              <Icon
                name="home"
                type="font-awesome"
                size={24}
                iconStyle={{ width: 24 }}
                color={color}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Login"
          component={LoginNavigator}
          options={{
            drawerIcon: ({ color }) => (
              <Icon
                name="sign-in"
                type="font-awesome"
                size={24}
                iconStyle={{ width: 24 }}
                color={color}
              />
            ),
          }}
        />

        <Drawer.Screen
          name="Category"
          component={CategoryNavigator}
          options={{
            title: "Category",
            drawerIcon: ({ color }) => (
              <Icon
                name="sliders"
                type="font-awesome"
                size={24}
                iconStyle={{ width: 24 }}
                color={color}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Add Items"
          component={AddNavigator}
          options={{
            title: "Add Items",
            drawerIcon: ({ color }) => (
              <Icon
                name="plus"
                type="font-awesome"
                size={24}
                iconStyle={{ width: 24 }}
                color={color}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Storage"
          component={StorageNavigator}
          options={{
            title: "Storage",
            drawerIcon: ({ color }) => (
              <Icon
                name="archive"
                type="font-awesome"
                size={24}
                iconStyle={{ width: 24 }}
                color={color}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Send Order"
          component={SendOrder}
          options={{
            title: "Send Order",
            drawerIcon: ({ color }) => (
              <Icon
                name="shopping-cart"
                type="font-awesome"
                size={24}
                iconStyle={{ width: 24 }}
                color={color}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Contact"
          component={ContactNavigator}
          options={{
            title: "Contact Us",
            drawerIcon: ({ color }) => (
              <Icon
                name="address-card"
                type="font-awesome"
                size={24}
                iconStyle={{ width: 24 }}
                color={color}
              />
            ),
          }}
        />
      </Drawer.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerHeader: {
    backgroundColor: "#e8c30d",
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
    
  },
  drawerHeaderText: {
    color: "#fff",
    fontsize: 60,
    fontWeight: "bold",
  },
  drawerImage: {
    margin: 10,
    height: 120,
    width: 120,

   
  },
  stackIcon: {
    marginLeft: 10,
    color: "#fff",
    fontSize: 24,
  },
});

export default Main;
