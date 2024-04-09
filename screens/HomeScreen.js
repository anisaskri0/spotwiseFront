import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const HomeScreen = ({ navigation }) => {
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("authToken");
      await AsyncStorage.removeItem("email");
      navigation.navigate("Login");
    } catch (error) {
      console.log(error);
    }
  };

  const [userName, setUserName] = useState("");

  // Function to retrieve user's name from storage
  const fetchUserName = async () => {
    try {
      // Retrieve user's email from AsyncStorage
      const userEmail = await AsyncStorage.getItem("email");

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
      console.error("Error retrieving user name:", error);
    }
  };

  useEffect(() => {
    // Call the fetchUserName function when the component mounts
    fetchUserName();
  }, []); // Empty dependency array ensures the effect runs only once on mount
  const blocks = ["A", "B", "C", "D"];
  const spots = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  const spots1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  const [blockName, setBlockName] = useState("");
  const [spotNumber, setSpotNumber] = useState("");
  const [occupiedSpots, setOccupiedSpots] = useState([]);
  const [showSquare, setShowSquare] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://10.0.2.2:8000/data");
      const spots = response.data;

      // Filter spots where availability is true (occupied spots)
      const occupiedSpots = spots.filter((spot) => spot.availability);

      // Update state with occupied spots
      setOccupiedSpots(occupiedSpots);

      // If occupied spots exist, update blockName and spotNumber with the first occupied spot
      if (occupiedSpots.length > 0) {
        const firstOccupiedSpot = occupiedSpots[0];
        setBlockName(firstOccupiedSpot.blockName);
        setSpotNumber(firstOccupiedSpot.spotNumber);
        setShowSquare(true); // Set showSquare to true to render the square
      } else {
        setShowSquare(false); // Set showSquare to false if no occupied spots
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.squareContainer}>
          {/* Render spots for block A */}
          {showSquare &&
            spots.map((spot) => (
              <View key={spot} style={styles.block}>
                {/* Render spots for this block */}
                <View
                  key={`${spot}`}
                  style={[
                    styles.spot,
                    "A" === blockName &&
                      spot === spotNumber &&
                      styles.occupiedSpot,
                  ]}
                >
                  {/* Render spot number */}
                  <Text style={styles.spotNumber}>A{spot}</Text>
                </View>
              </View>
            ))}
        </View>

        {showSquare && (
          <View style={{ height: 30, backgroundColor: "black" }}></View>
        )}

        {/* Add a new line */}
        <View style={styles.squareContainer}>
          {/* Render spots for block B */}
          {showSquare &&
            spots1.map((spot) => (
              <View key={spot} style={styles.block}>
                {/* Render spots for this block */}
                <View
                  key={`${spot}`}
                  style={[
                    styles.spot,
                    "B" === blockName &&
                      spot === spotNumber &&
                      styles.occupiedSpot,
                  ]}
                >
                  {/* Render spot number */}
                  <Text style={styles.spotNumber}>B{spot}</Text>
                </View>
              </View>
            ))}
        </View>

        {/* Add a new line */}
        <View style={styles.squareContainer}>
          {/* Render spots for block C */}
          {showSquare &&
            spots1.map((spot) => (
              <View key={spot} style={styles.block}>
                {/* Render spots for this block */}
                <View
                  key={`${spot}`}
                  style={[
                    styles.spot,
                    "C" === blockName &&
                      spot === spotNumber &&
                      styles.occupiedSpot,
                  ]}
                >
                  {/* Render spot number */}
                  <Text style={styles.spotNumber}>C{spot}</Text>
                </View>
              </View>
            ))}
        </View>

        {showSquare && (
          <View style={{ height: 30, backgroundColor: "black" }}></View>
        )}

        {/* Add a new line */}
        <View style={styles.squareContainer}>
          {/* Render spots for block D */}
          {showSquare &&
            spots1.map((spot) => (
              <View key={spot} style={styles.block}>
                {/* Render spots for this block */}
                <View
                  key={`${spot}`}
                  style={[
                    styles.spot,
                    "D" === blockName &&
                      spot === spotNumber &&
                      styles.occupiedSpot,
                  ]}
                >
                  {/* Render spot number */}
                  <Text style={styles.spotNumber}>D{spot}</Text>
                </View>
              </View>
            ))}
        </View>

        {/* Conditional rendering based on showSquare */}
        <View>
          {showSquare && (
            <Text>
              Your Available spot is at : {blockName}
              {spotNumber} ;
            </Text>
          )}
        </View>

        {/* Button rendering */}
        <View>
          {!showSquare && (
            <Button title="Park Your Car" onPress={fetchData}></Button>
          )}
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  squareContainer: {
    backgroundColor: "black",
    flexDirection: "row",
    alignItems: "center",
  },
  block: {
    alignItems: "center",
    marginRight: 2,
    backgroundColor: "gray",
  },
  blockName: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 5,
  },
  spot: {
    width: 25,
    height: 40,
    backgroundColor: "lightgray",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  occupiedSpot: {
    backgroundColor: "red",
  },
  spotNumber: {
    fontSize: 12,
  },
});

export default HomeScreen;
