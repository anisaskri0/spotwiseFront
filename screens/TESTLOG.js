import {
  StyleSheet,
  Text,
  Image,
  View,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
} from "react-native";
import { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import React from "react";
const TESTLOG = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.first}>
        <Image source={require("./spotwise.png")} style={styles.logo} />
      </View>

      <View style={styles.second}>
        <View style={styles.box}>
          <Text
            style={{
              fontSize: 25,
              fontWeight: "bold",
              marginTop: 30,
              marginBottom: 20,
              alignSelf: "center",
            }}
          >
            Welcome Back !
          </Text>
        </View>
        <KeyboardAvoidingView>
          <View style={styles.inputContainer}>
            <MaterialIcons
              name="email"
              size={24}
              color="black"
              style={{ marginRight: 10 }}
            />
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={styles.input}
              placeholder="Enter your Email"
            />
          </View>
        </KeyboardAvoidingView>
        <KeyboardAvoidingView>
          <View style={styles.inputContainer}>
            <Entypo
              name="lock"
              size={24}
              color="black"
              style={{ marginRight: 10 }}
            />
            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              style={styles.input}
              placeholder="Enter your Email"
            />
          </View>
        </KeyboardAvoidingView>
        <Pressable>
          <Text
            style={{
              textAlign: "right",
              fontSize: 15,
              color: "gray",
              marginRight: 20,
              fontWeight: "bold",

            }}
          >
            Forgot Password?
          </Text>
        </Pressable>
        <View style={styles.LoginContainer}>
          <Pressable>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 20,
                fontFamily: "italic",
                textAlign: "center",
                color: "white",
                margin: 15,

              }}
            >
              Sign In
            </Text>
          </Pressable>
        </View>
        <View style={styles.lineContainer}>
          <View style={styles.line} />
          <Text style={styles.orText}>Or</Text>
          <View style={styles.line} />
        </View>
        <View style={{ flexDirection: "row", alignSelf: "center" }}>
          <AntDesign
            name="apple1"
            size={50}
            color="black"
            style={{ marginRight: 15 }}
          />
          <Entypo name="facebook" size={50} color="blue" style={{ marginRight: 15 }} />
          <AntDesign name="google" size={50} color="black" />
        </View>
        <Text
          style={{
            textAlign: "right",
            fontSize: 18,
            marginTop : 10,
            color: "gray",
            alignSelf: "center" , 
            fontWeight :"bold"
          }}
        >
          Don't have an account ? SignUp
        </Text>
      </View>
    </View>
  );
};

export default TESTLOG;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  first: {
    backgroundColor: "black",
    padding: 50,
    borderBottomRightRadius: 70,
    borderBottomLeftRadius: 70,
    borderWidth: 1, // Add border width
    borderColor: "black", // Add border color
  },
  logo: {
    height: 250,
    width: 250,
    borderRadius: 100,
    alignSelf: "center", // Center image horizontally
  },
  second: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.7)", // Semi-transparent white background
  },
  inputContainer: {
    flexDirection: "row",
    margin: 10,
    padding: 15,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "black",
  },
  LoginContainer: {
    marginTop: 20,
    backgroundColor: "#FE5F3C",
    width: 350,
    height: 60,
    borderWidth : 0.5 ,
    borderolor : "gray",
    borderRadius: 40,
    alignSelf: "center",
  },
  lineContainer: {
    
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin : 20
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "gray",
  },
  orText: {
    marginHorizontal: 10,
    color: "gray",
    fontSize: 16,
    fontWeight: "bold",
  },
});
