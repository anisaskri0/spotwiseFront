import React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
const HomeScreen = () => {
  const navigation = useNavigation();

  const goToLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'column', alignItems: 'center', margin: 0 }}>
        <Image source={require("./spotwise.png")} style={styles.logo} />
      </View>
      <TouchableOpacity onPress={goToLogin}>
        <View style={styles.box}>
          <Text style={styles.text}>Get Started</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 20,
      backgroundColor: "black",
      margin: 0
    },
    logo: {
      width: 500,
      height: 500,
      borderRadius: 250,
    },
    logoText: {
      fontSize: 25,
      fontWeight: 'bold',
      color: 'white',
      marginTop: 10, // Adjust as needed
    },
    box: {
      marginTop: 100,
      backgroundColor: "#FE5F3C",
      width: 400,
      height: 50,
      borderRadius: 150,
      borderColor: "black",
      borderWidth: 1,
      alignItems: "center", // Center vertically
      alignContent: 'center',
    },
    text: {
      fontSize: 20,
      fontWeight: 'bold',
      fontStyle: 'italic',
      color: 'white',
      margin: 10
    }
  });
  
  export default HomeScreen;