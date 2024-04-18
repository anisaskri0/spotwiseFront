import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        const email = await AsyncStorage.getItem("email");
        console.log(token);
        console.log(email);
        if (token) {
          navigation.navigate("Main");
        }
      } catch (err) {
        console.log("error message", err);
      }
    };
    checkLoginStatus();
  }, []);
  const handleLogin = () => {
    const user = {
      email: email,
      password: password,
    };

    axios
      .post("http://192.168.1.158:8000/login", user)
      .then((response) => {
        console.log(response);
        const token = response.data.token;
        AsyncStorage.setItem("authToken", token);
        AsyncStorage.setItem("email", email);

        navigation.replace("Main");
      })
      .catch((error) => {
        Alert.alert("Please Re-check your credentials !");
        console.log(error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image style={styles.logo} source={require("./spotwise.png")} />
      </View>
      <KeyboardAvoidingView behavior="padding" style={styles.formContainer}>
        <Text style={styles.heading}>Login to your Account</Text>
        <View style={styles.inputContainer}>
          <MaterialIcons name="email" size={24} color="gray" />
          <TextInput
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
            placeholder="Enter your Email"
          />
        </View>
        <View style={styles.inputContainer}>
          <AntDesign name="lock1" size={24} color="gray" />
          <TextInput
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={styles.input}
            placeholder="Enter your Password"
            secureTextEntry
          />
        </View>
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <Pressable onPress={handleLogin} style={styles.loginButton}>
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate("Register")}
          style={styles.signUpButton}
        >
          <Text style={styles.signUpText}>Don't have an account? Sign Up</Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  logo: {
    width: 150,
    height: 100,
  },
  formContainer: {
    width: "100%",
    marginTop: 50,
  },
  heading: {
    fontSize: 17,
    fontWeight: "bold",
    marginTop: 12,
    color: "black",
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#D0D0D0",
    borderRadius: 5,
    marginTop: 30,
    paddingHorizontal: 10,
  },
  input: {
    color: "gray",
    marginVertical: 10,
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
  },
  error: {
    color: "red",
    textAlign: "center",
    marginTop: 10,
  },
  loginButton: {
    backgroundColor: "black",
    borderRadius: 6,
    padding: 15,
    marginTop: 30,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  signUpButton: {
    marginTop: 15,
  },
  signUpText: {
    textAlign: "center",
    color: "gray",
    fontSize: 16,
  },
});

export default LoginScreen;
