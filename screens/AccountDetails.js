import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
const AccountDetails = ({ navigation }) => {
  const [email, setEmail] = useState("");
const [name, setName] = useState("");
const [gender, setGender] = useState("");
const [phoneNumber, setPhoneNumber] = useState("");
const [dateOfBirth, setDateOfBirth] = useState("");


  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        const _id = await AsyncStorage.getItem("_id") ; 
        console.log(token);
        if (token) {
          const response = await axios.get("http://10.0.2.2:8000/users", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          userData = response.data
          const userID = _id;
          const user = userData.find(user => user._id ===userID) ;
          if (user) {
            const retrievedEmail = user.email ;
          setName(user.name) ;
          setGender(user.gender) ;
          setPhoneNumber(user.phoneNumber) ;
          setDateOfBirth(user.dateOfBirth);
            setEmail(retrievedEmail) ; 
          }else{
            console.log("user not found")
          }
        } 
      } catch (error) {
        console.log("error message", error);
      }
    };

    checkLoginStatus();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.firstSection}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Main")}
            style={{ margin: 15 }}
          >
            <AntDesign name="arrowleft" size={30} color="white" />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 20,
              fontFamily: "italy",
              color: "white",
              margin: 15,
              marginLeft: 100,
            }}
          >
            Edit Profile
          </Text>
          <Text
            style={{
              fontSize: 20,
              fontFamily: "italy",
              color: "white",
              margin: 15,
              marginLeft: 80,
            }}
          >
            Save
          </Text>
        </View>
        <View style={styles.profileContainer}>
          <View style={styles.cameraContainer}>
            <TouchableOpacity onPress={() => {}}>
              <AntDesign name="camera" size={24} color="white" />
            </TouchableOpacity>
          </View>
          <Image
            style={styles.profilePicture}
            source={require("./spotwise.png")}
          />
        </View>
      </View>
      <View style={styles.secondSection}>
        <View style={styles.text}>
          <Text style={styles.textDecoration}>Full Name</Text>
          <Text
            style={{
              marginTop: 10,
              color: "black",
              fontWeight: "bold",
              fontSize: 20,
            }}
          >
            {name}
          </Text>
        </View>
        <View style={styles.line} />
        <View style={styles.text}>
          <Text style={styles.textDecoration}>Email</Text>
          <Text
            style={{
              marginTop: 10,
              color: "black",
              fontWeight: "bold",
              fontSize: 20,
            }}
          >
            {email}
          </Text>
        </View>
        <View style={styles.line} />
        <View style={styles.text}>
          <Text style={styles.textDecoration}>Gender</Text>
          <Text
            style={{
              marginTop: 10,
              color: "black",
              fontWeight: "bold",
              fontSize: 20,
            }}
          >
            {gender}
          </Text>
        </View>
        <View style={styles.line} />
        <View style={styles.text}>
          <Text style={styles.textDecoration}>Phone</Text>
          <Text
            style={{
              marginTop: 10,
              color: "black",
              fontWeight: "bold",
              fontSize: 20,
            }}
          >
            {phoneNumber}
          </Text>
        </View>
        <View style={styles.line} />
        <View style={styles.text}>
          <Text style={styles.textDecoration}>Date of Birth</Text>
          <Text
            style={{
              marginTop: 10,
              color: "black",
              fontWeight: "bold",
              fontSize: 20,
            }}
          >
            {dateOfBirth}
          </Text>
        </View>
        <View style={styles.line} />
      </View>
    </View>
  );
};

export default AccountDetails;

const styles = StyleSheet.create({
  container: {
    backgroundColor : "grey",
    flex: 1,
    marginTop: 20,
  },
  firstSection: {
    borderTopRightRadius : 0 , 
    borderTopLeftRadius : 0 , 
    borderRadius: 60,
    backgroundColor: "black", // Dark blue color
    height: 200,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  cameraContainer: {
    position: "absolute",
    top: 20,
    left: 100,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#FFA500",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1, // Ensure the camera icon is above the profile picture
  },
  profilePicture: {
    marginTop: 20,
    marginLeft: 100,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "white",
    marginRight: 10,
  },
  secondSection: {
    flex: 1,
    marginTop: 100,
    flexDirection: "column",
    alignItems: "flex-start",
  },
  text: {
    marginLeft: 25,
  },
  textDecoration: {
    color: "white",
    fontSize: 19,
    fontWeight: "bold"
  },
  line: {
    height: 1,
    backgroundColor: "white",
    width: "100%", // Set line width to fill the entire container
    marginTop: 15, // Adjust margin as needed
    marginBottom: 15,
  },
});
