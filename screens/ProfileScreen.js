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
import HomeScreen from "./HomeScreen";
import * as ImagePicker from 'react-native-image-picker';
import { Alert } from "react-native";
import axios from "axios";

const ProfileScreen = ({ navigation }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleChooseImage = () => {
  // Launch image library to select an image
  ImagePicker.launchCamera({ mediaType: 'photo' }, (response) => {
    if (!response.didCancel) {
      // Handle selected image response
      setSelectedImage(response);
      // Call upload function immediately after selecting image
      handleUploadImage(response);
    }
  });
};

  const handleUploadImage = async () => {
    if (!selectedImage) {
      Alert.alert('Please select an image');
      return;
    }

    const formData = new FormData();
    formData.append('profilePicture', {
      uri: selectedImage.uri,
      type: selectedImage.type,
      name: selectedImage.fileName,
    });

    try {
      const response = await axios.post('http://10.0.2.2/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      Alert.alert('Image uploaded successfully');
      console.log('Server response:', response.data);
    } catch (error) {
      console.error('Error uploading image:', error);
      Alert.alert('Failed to upload image');
    }
  };
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
      navigation.navigate("Login1");
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
      <View style={styles.firstSection}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={{ margin: 15 }}
          >
            <AntDesign name="arrowleft" size={30} color="white" />
          </TouchableOpacity>
     
        </View>
        <View style={styles.profileContainer}>
          <View style={styles.cameraContainer}>
            <TouchableOpacity onPress={handleChooseImage}>
              <AntDesign name="camera" size={24} color="white" />
            </TouchableOpacity>
          </View>
          <Image
            style={styles.profilePicture}
            source={require("./spotwise.png")}
          />
        </View>
      </View>
      <View style={styles.middleSection}>
        <View style={{ flexDirection: "column" }}>
          <View style={styles.box}>
            <Text style={styles.text}>My Home</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Main")}>
              <View style={styles.icon}>
                <AntDesign name="rightcircle" size={30} color="white" />
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
                <AntDesign name="rightcircle" size={30} color="white" />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.box}>
            <Text style={styles.text}>Account Details</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Account");
              }}
            >
              <View style={styles.icon}>
                <AntDesign name="rightcircle" size={30} color="white" />
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
                <AntDesign name="rightcircle" size={30} color="white" />
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.box}>
            <Text style={styles.text}>Contact Support </Text>
            <TouchableOpacity onPress={() => {}}>
              <View style={styles.icon}>
                <AntDesign name="rightcircle" size={30} color="white" />
              </View>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 5,
              backgroundColor: "black",
              height: 80,
              borderColor: "white",
              marginBottom: 20,
              borderWidth: 2,
              alignItems: "center", // Center vertically
              margin: 5,
              borderRadius : 25
            }}
          >
            <Text style={styles.text}>Logout </Text>
            <TouchableOpacity onPress={handleLogout}>
              <View style={styles.icon}>
                <Ionicons name="log-out" size={30} color="white" />
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
    backgroundColor :"grey",
    flex: 1,
    marginTop : 20,
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
    marginTop: 100,
  },
  lowerSection: {
    height: 100,
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
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginLeft: 5,
  },
  box: {
    marginTop: 5,
    borderRadius : 15,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "black",
    height: 60,
    borderColor: "white",
    borderWidth: 2,
    alignItems: "center", // Center vertically
  },

  icon: {
    marginRight: 10, // Adjust margin as needed to move the icon to the right
  },
  firstSection: {
    borderRadius: 60,
    backgroundColor: "black", // Dark blue color
    height: 200,
    borderTopRightRadius : 0 , 
    borderTopLeftRadius : 0 , 

  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  cameraContainer: {
    position: "absolute",
    top: 20,
    left: 100,
    width: 40,
    height: 40,
    borderRadius: 20,
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
});
export default ProfileScreen;
