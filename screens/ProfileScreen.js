import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

const ProfileScreen = ({ navigation }) => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  // Function to retrieve user's email and name from storage
  const fetchUserData = async () => {
    try {
      // Retrieve user's email from AsyncStorage
      const userEmail = await AsyncStorage.getItem("email");
      setUserEmail(userEmail);

      // Fetch user data from the backend
      const response = await axios.get(`http://10.0.2.2:8000/users/`);
      const userData = response.data;

      // Find the user with the matching email
      const userWithEmail = userData.find((user) => user.email === userEmail);

      // If user data is found, set their name in the state
      if (userWithEmail) {
        setUserName(userWithEmail.name);
      }
    } catch (error) {
      console.error("Error retrieving user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("authToken");
      await AsyncStorage.removeItem("email");
      navigation.navigate("Login");
    } catch (error) {
      console.log(error);
    }
  };

  const handleAccountSettings = () => {
    // Navigate to the Account Settings screen
    // You can replace 'AccountSettings' with the name of your screen/component
    navigation.navigate("AccountSettings");
  };

  return (
    <View style={styles.container}>
      <View style={styles.upperSection}>
        {/* Profile picture placeholder */}
        <View style={styles.profileContainer}>
          <Image
            style={styles.profilePicture}
            source={require("./spotwise.png")}
          />
          <View style={{ flexDirection: "column", marginLeft: 5 }}>
            <Text style={styles.greeting}>Hello</Text>
            <Text style={styles.username}>Askri Anis</Text>
          </View>
          <View style={styles.iconContainer}>
            <TouchableOpacity
              onPress={() => {
                console.log("edit profile");
              }}
            >
              <View style={styles.iconCircle}>
                <FontAwesome5 name="user-edit" size={20} color="white" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.middleSection}>
        <View style={{ flexDirection: "column" }}>
          <View style={styles.box}>
            <Text style={styles.text}>My Home</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <View style={styles.icon}>
                <AntDesign name="rightcircle" size={30} color="black" />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.box}>
            <Text style={styles.text}>Parking History</Text>
            <TouchableOpacity
              onPress={() => {
                /* Add your onPress logic here */
              }}
            >
              <View style={styles.icon}>
                <AntDesign name="rightcircle" size={30} color="black" />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.box}>
            <Text style={styles.text}>Account Details</Text>
            <TouchableOpacity
              onPress={() => {
                /* Add your onPress logic here */
              }}
            >
              <View style={styles.icon}>
                <AntDesign name="rightcircle" size={30} color="black" />
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.box}>
            <Text style={styles.text}>Change Password </Text>
            <TouchableOpacity
              onPress={() => {
                /* Add your onPress logic here */
              }}
            >
              <View style={styles.icon}>
                <AntDesign name="rightcircle" size={30} color="black" />
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.box}>
            <Text style={styles.text}>Contact Support </Text>
            <TouchableOpacity onPress={() => {}}>
              <View style={styles.icon}>
                <AntDesign name="rightcircle" size={30} color="black" />
              </View>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 5,
              backgroundColor: "#FFFFF9",
              height: 80,
              borderColor: "#333",
              marginBottom: 20,
              borderWidth: 1,
              alignItems: "center", // Center vertically
              margin: 5,
            }}
          >
            <Text style={styles.text}>Logout </Text>
            <TouchableOpacity onPress={handleLogout}>
              <View style={styles.icon}>
                <Ionicons name="log-out" size={30} color="black" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  upperSection: {
    backgroundColor: "#001F3F", // Dark blue color
    padding: 30,
    marginTop: 20,
  },
  profileContainer: {
    flexDirection: "row", // Align children horizontally
    alignItems: "center", // Center children vertically
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "white", // Placeholder color
    marginRight: 10, // Add margin between profile picture and greeting text
  },
  greeting: {
    color: "white",
    fontSize: 15,
  },
  username: {
    color: "white",
    fontWeight: "bold",
    fontSize: 22,
  },
  middleSection: {
    flex: 1,
    backgroundColor: "white", // Placeholder color
    marginTop: 8,
  },
  lowerSection: {
    height: 100,
    backgroundColor: "lightgray", // Placeholder color
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    marginRight: 10, // Add margin to separate the icon button from the profile picture
  },
  iconCircle: {
    width: 40, // Adjust the size of the circle as needed
    height: 40, // Adjust the size of the circle as needed
    borderRadius: 20, // Half of the width and height to create a circle
    backgroundColor: "black", // Background color of the circle
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 100,
  },
  text: {
    fontSize: 22,
    fontWeight: "bold",
    color: "black",
    marginLeft: 5,
  },
  box: {
    margin: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    height: 90,
    borderColor: "#333",
    borderWidth: 1,
    alignItems: "center", // Center vertically
  },

  icon: {
    marginRight: 10, // Adjust margin as needed to move the icon to the right
  },
});
export default ProfileScreen;
