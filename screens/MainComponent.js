import { Platform, View } from "react-native";
import Constants from "expo-constants";

import CategoryScreen from "./CategoryScreen";
import { createStackNavigator } from "@react-navigation/stack";
import ItemsCategoryScreen from "./ItemsCategoryScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "./HomeScreen";

const Drawer = createDrawerNavigator();

const screenOptions = {
  headerTintColor: "#fff",
  headerStyle: { backgroundColor: "#5637DD" },
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


const Main = () => {
  //return <CategoryScreen categories = {categories}/>
  return (
    <View
      style={{
        flex: 1,
        paddingTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight
      }}
    >   
        
      <Drawer.Navigator
        initialRouterName="Home"
        drawerStyle={{ backgroundColor: "#CEC8FF" }}
      >
        
        <Drawer.Screen 
            name='Home'
            component={HomeNavigator}
            options={{title:'Home'}}
        />
        <Drawer.Screen 
            name='Category'
            component={CategoryNavigator}
            options={{title:'Category'}}
        />
      </Drawer.Navigator>
    </View>
  );
};

export default Main;
