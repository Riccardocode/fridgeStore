import {Text,View, Image, ImageBackground, StyleSheet, TouchableOpacity} from 'react-native';

import { useState } from 'react';
const HomeScreen =({navigation}) =>{
    const [search, setSearch] = useState("");
    return(
    
        <ImageBackground source={require('../assets/homePage.png')} style={styles.image}>
            <TouchableOpacity 
                style={styles.storageButton}
                onPress={() => navigation.navigate("Storage")}
            >
                <Text style={styles.text}>Storage</Text>
            </TouchableOpacity>
        </ImageBackground>

       
    );
};

const styles = StyleSheet.create({
    image: {
      flex: 1,
      resizeMode: 'cover',
    },
    storageButton:{
        backgroundColor:"hsl(3, 17%, 45%)",
        width:250,
        height:60,
        borderRadius:10,
        alignSelf:'center',
        marginTop:500,
        

    },
    text:{
        fontSize:40,
        color:"white",
        alignSelf:'center',
        justifyContent:'center',
        textAlign: "center",
        textAlignVertical:"center",
        
    }
  });

export default HomeScreen;