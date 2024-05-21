import React, { useState } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

import {
  StyleSheet,
  Text,
  Image,
  View,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
} from "react-native";

import { MaterialIcons, Entypo, AntDesign } from "@expo/vector-icons";

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [isChecked, setIsChecked] = useState(false);

  const toggleCheckBox = () => {
    setIsChecked(!isChecked);
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const handleRegister = () => {
    const user = {
      name,
      email,
      password,
      gender,
      phoneNumber,
      dateOfBirth,
    };
    axios
      .post("https://spotwise-backend-anis-askris-projects.vercel.app/register", user)
      .then((response) => {
        console.log(response);

        Alert.alert("Resgistred Succesfully");
        navigation.replace("Login1");
      })
      .catch((error) => {
        console.log(error);
        Alert.alert("error while registering.");
      });
  };
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
            Hello !
          </Text>
        </View>
        <ScrollView style={styles.containerview}>
          <KeyboardAvoidingView>
            <View style={styles.inputContainer}>
              <AntDesign name="user" size={24} color="black" />
              <TextInput
                value={name}
                onChangeText={(text) => setName(text)}
                style={styles.input}
                placeholder="Enter your Full Name"
              />
            </View>
          </KeyboardAvoidingView>
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
                placeholder="Enter your password"
                secureTextEntry={true}
              />
            </View>
          </KeyboardAvoidingView>
          <View style={styles.inputContainer}>
            <MaterialIcons
              name="wc"
              size={24}
              color="black"
              style={{ marginRight: 10 }}
            />
            <TextInput
              value={gender}
              onChangeText={(text) => setGender(text)}
              style={styles.input}
              placeholder="Enter your Gender"
            />
          </View>
          <KeyboardAvoidingView>
            <View style={styles.inputContainer}>
              <MaterialIcons
                name="phone"
                size={24}
                color="black"
                style={{ marginRight: 10 }}
              />
              <TextInput
                value={phoneNumber}
                onChangeText={(text) => setPhoneNumber(text)}
                style={styles.input}
                placeholder="Enter your Phone Number"
              />
            </View>
          </KeyboardAvoidingView>
          <KeyboardAvoidingView>
            <View style={styles.inputContainer}>
              <MaterialIcons
                name="event"
                size={24}
                color="black"
                style={{ marginRight: 10 }}
              />
              <TextInput
                value={dateOfBirth}
                onChangeText={(text) => setDateOfBirth(text)}
                style={styles.input}
                placeholder="Enter your Date of Birth"
              />
            </View>
          </KeyboardAvoidingView>
          <View style={{ flexDirection: "row" }}>
            <Pressable onPress={toggleCheckBox}>
              {isChecked ? (
                <AntDesign
                  name="checkcircle"
                  size={22}
                  color="black"
                  style={{ marginRight: 15, marginLeft: 5 }}
                />
              ) : (
                <Entypo name="circle" size={24} color="black" />
              )}
            </Pressable>
            <Text style={{ fontSize: 18 }}>
              I agree to the{" "}
              <Text style={{ fontWeight: "bold" }}>
                terms & confidentialites{" "}
              </Text>
            </Text>
          </View>
          <View style={styles.LoginContainer}>
            <Pressable onPress={handleRegister}>
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
                Sign Up
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
            <Entypo
              name="facebook"
              size={50}
              color="black"
              style={{ marginRight: 15 }}
            />
            <AntDesign name="google" size={50} color="black" />
          </View>
          <Pressable
            onPress={() => {
              navigation.navigate("Login1");
            }}
          >
            <Text
              style={{
                textAlign: "right",
                fontSize: 18,
                marginTop: 10,
                color: "gray",
                alignSelf: "center",
                fontWeight: "bold",
              }}
            >
              Already have an account ? Sign In
            </Text>
          </Pressable>
        </ScrollView>
      </View>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  first: {
    backgroundColor: "black",
    padding: 30,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderWidth: 1, // Add border width
    borderColor: "black", // Add border color
  },
  logo: {
    height: 150,
    width: 150,
    borderRadius: 75,
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
    borderWidth: 1,
    borderColor: "black",
  },
  LoginContainer: {
    marginTop: 20,
    backgroundColor: "black",
    width: 350,
    height: 60,
    borderRadius: 40,
    alignSelf: "center",
  },
  lineContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
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
