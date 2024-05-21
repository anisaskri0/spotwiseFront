import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, Pressable, Alert } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import axios from "axios";

const StartCountdownTimer = ({ durationInSeconds, onTimeout }) => {
  const [timeRemaining, setTimeRemaining] = useState(durationInSeconds);
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        const _id = await AsyncStorage.getItem("_id");
        console.log(token);
        if (token) {
          const response = await axios.get("http://10.0.2.2:8000/users", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          userData = response.data;
          const userID = _id;
          const user = userData.find((user) => user._id === userID);
          if (user) {
            setName1(user.name1);
          } else {
            console.log("user not found");
          }
        }
      } catch (error) {
        console.log("error message", error);
      }
    };

    checkLoginStatus();
  }, []);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeRemaining((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (timeRemaining <= 0) {
      onTimeout();
    }
  }, [timeRemaining, onTimeout]);

  return (
    <Text style={styles.timerText}>
      Time Remaining: {Math.floor(timeRemaining / 60)}:
      {timeRemaining % 60 < 10 ? "0" : ""}
      {timeRemaining % 60}
    </Text>
  );
};

const HomeScreen = ({ navigation  }) => {
  const [parkingSpaceID, setParkingSpaceID] = useState("");
  const [showTimer, setShowTimer] = useState(false);
  const [timerExpired, setTimerExpired] = useState(false);
  const [floor, setFloor] = useState("");
  const [test, setTest] = useState(true);
  const [carPending, setcarPending] = useState(false);
  const[isGreen,setIsGreen] = useState(false) ; 
  const updateParkingSpaceStatus = async (parkingSpaceId) => {
    try {
      const response = await axios.put(
        `http://10.0.2.2:8000/parking/${parkingSpaceId}/pending`
      );
      console.log("Parking space status updated:", response.data);
    } catch (error) {
      console.error(
        "Error updating parking space status:",
        error.response.data
      );
      // Handle error scenarios
    }
  };

  // function to check spot occupied
  const checkOccupied = async () => {
    try {
      const response = await axios.get("http://10.0.2.2:8000/data");
      const parkingLots = response.data;
  
      let parkingSpaceFound = false;
      parkingLots.forEach((parkingLot) => {
        const stat = parkingLot.parking_spaces.find(
          (space) => space.id === parkingSpaceID
        );
  console.log(stat)
        if (stat) {
          parkingSpaceFound = true;
          setIsGreen(true);
          if (stat.status === "pending") {
           
            console.log("PLACE CONFIRMED");
          } else {
            console.log("PLACE NOT CONFIRMED");
          }
        }
      });
  
      if (!parkingSpaceFound) {
        console.log("Parking space not found!");
      }
  
      // Return isGreen value if needed
      console.log({isGreen})

    } catch (error) {
      console.error("Error checking occupancy:", error);
    }
  };
  
  

  const fetchData = async () => {
    try {
      const response = await axios.get("http://10.0.2.2:8000/data");
      const parkingSpaces = response.data;

      let freeParkingSpaceFound = false;

      parkingSpaces.forEach((parkingLot) => {
        const freeParkingSpace = parkingLot.parking_spaces.find(
          (space) => space.status === "free"
        );

        if (freeParkingSpace && !freeParkingSpaceFound) {
          updateParkingSpaceStatus(freeParkingSpace.id);
          setTest(true);
          setParkingSpaceID(freeParkingSpace.id);
          const floorOfFreeSpace = parkingLot.floor;
          setFloor(floorOfFreeSpace);
          console.log("Floor of the free parking space:", floorOfFreeSpace);
          console.log("The parking spot is now pending.");
          setShowTimer(true);
          freeParkingSpaceFound = true;
        }
      });

      if (!freeParkingSpaceFound) {
        console.log("No parking space available at the moment");
        setTest(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleTimeout = () => {
    setTimerExpired(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.messageContainer}>
        <Text style={styles.messageText}>
          This is the parking space provided for you. Once you've reached your
          destination, please press on "Park Your Car" to reserve a spot. Thank
          you!
        </Text>
      </View>
      <View
        style={{
          height: 500,
          width: 410,
          backgroundColor: "black",
          borderColor: "grey",
          borderWidth: 1,
        }}
      >
        {/* First line for block A */}
        <View
          style={{
            flexDirection: "row",
            flex: 1 / 4,
            alignSelf: "center",
            marginLeft: 40,
          }}
        >
          {/* Render blocks A1 to A13 */}
          {[...Array(13)].map((_, index) => {
            const spotId = `A${index + 1}`;
            return (
              <View
                key={spotId}
                style={{
                  flex: 1,
                  borderWidth: 2,
                  borderColor: "white",

                  backgroundColor: spotId === parkingSpaceID ? (isGreen ? 'green' : 'yellow') : 'transparent',

                }}
              >
                <Text style={styles.text}>{spotId}</Text>
              </View>
            );
          })}
        </View>

        {/* Space between blocks A and B */}
        <View style={{ height: "15%", width: 400 }}>
          <View style={{ flexDirection: "row" }}>
            <MaterialCommunityIcons
              name="arrow-u-right-bottom"
              size={28}
              color="white"
              style={{ marginLeft: 0, marginTop: 20 }}
            />
            <MaterialCommunityIcons
              name="arrow-left-right-bold-outline"
              size={22}
              color="white"
              style={{ marginLeft: 70, marginTop: 20 }}
            />
            <MaterialCommunityIcons
              name="arrow-left-right-bold-outline"
              size={22}
              color="white"
              style={{ marginLeft: 120, marginTop: 20 }}
            />
          </View>
        </View>

        {/* Second line for block B */}
        <View
          style={{
            flexDirection: "row",
            flex: 1 / 4,
            marginRight: 90,
            marginLeft: 40,
          }}
        >
          {/* Render blocks B1 to B10 */}
          {[...Array(10)].map((_, index) => {
            const spotId = `B${index + 1}`;
            return (
              <View
                key={spotId}
                style={{
                  flex: 1,
                  borderWidth: 2,
                  borderColor: "white",
                  backgroundColor: spotId === parkingSpaceID ? (isGreen ? 'green' : 'yellow') : 'transparent',

                }}
              >
                <Text style={styles.text}>{spotId}</Text>
              </View>
            );
          })}
        </View>

        {/* Third line for block C */}
        <View
          style={{
            flexDirection: "row",
            flex: 1 / 4,
            marginRight: 90,
            marginLeft: 40,
          }}
        >
          {/* Render blocks C1 to C10 */}
          {[...Array(10)].map((_, index) => {
            const spotId = `C${index + 1}`;
            return (
              <View
                key={spotId}
                style={{
                  flex: 1,
                  borderWidth: 2,
                  borderColor: "white",
                  backgroundColor: spotId === parkingSpaceID ? (isGreen ? 'green' : 'yellow') : 'transparent',

                }}
              >
                <Text style={styles.text}>{spotId}</Text>
              </View>
            );
          })}
        </View>
        <View style={{ height: "15%", width: 400 }}>
          <View style={{ flexDirection: "row" }}>
            <MaterialCommunityIcons
              name="arrow-u-right-bottom"
              size={28}
              color="white"
              style={{ marginLeft: 0, marginTop: 20 }}
            />
            <MaterialCommunityIcons
              name="arrow-left-right-bold-outline"
              size={22}
              color="white"
              style={{ marginLeft: 70, marginTop: 20 }}
            />
            <MaterialCommunityIcons
              name="arrow-left-right-bold-outline"
              size={22}
              color="white"
              style={{ marginLeft: 120, marginTop: 20 }}
            />
          </View>
        </View>

        {/* Render blocks D1 to D10 */}
        <View
          style={{
            flexDirection: "row",
            flex: 1 / 4,
            marginRight: 90,
            marginLeft: 40,
          }}
        >
          {/* Render blocks D1 to D10 */}
          {[...Array(10)].map((_, index) => {
            const spotId = `D${index + 1}`;
            return (
              <View
                key={spotId}
                style={{
                  flex: 1,
                  borderWidth: 2,
                  borderColor: "white",
                  backgroundColor: spotId === parkingSpaceID ? (isGreen ? 'green' : 'yellow') : 'transparent',

                }}
              >
                <Text style={styles.text}>{spotId}</Text>
              </View>
            );
          })}
        </View>
      </View>

      {showTimer && !timerExpired && (
        <StartCountdownTimer durationInSeconds={1} onTimeout={handleTimeout} />
      )}
      {timerExpired && (
        <View style={styles.LoginContainer}>
          <Pressable onPress={checkOccupied}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 15,
                fontFamily: "italic",
                textAlign: "center",
                color: "white",
                marginTop: 15,
              }}
            >
              CONFIRM YOUR CAR
            </Text>
            
          </Pressable>
        </View>
      )}
      {!showTimer && !timerExpired && (
        <View style={styles.LoginContainer}>
          <Pressable
            onPress={() => {
              if (test === true) {
                fetchData();
              } else {
                // Return the Text component if the condition is false
                Alert.alert(
                  "No Parking Space Available",
                  "Sorry, no parking space available for now, please try again !"
                );
              }
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 15,
                textAlign: "center",
                color: "white",
                margin: 10,
              }}
            >
              PARK YOUR CAR
            </Text>
          </Pressable>
        </View>
      )}
      {timerExpired && (
        <View>
          <Text
            style={{
              fontSize: 11,
              fontWeight: "bold",
              color: "black",
              marginTop: 8,
              alignSelf: "center",
            }}
          >
            YOUR PARKING SPOT RESERVATION IS PENDING FOR{" "}
            <Text style={{ fontWeight: "bold", color: "yellow", fontSize: 21 }}>
              {parkingSpaceID}
            </Text>{" "}
            ON FLOOR{" "}
            <Text style={{ fontWeight: "bold", color: "yellow", fontSize: 21 }}>
              {floor}
            </Text>
          </Text>
        </View>
      )}
      {carPending && (
        <View>
          <Text style={{ fontSize: 15, fontWeight: "bold", color: "black" }}>
            YOUR PARKING SPOT IS {parkingSpaceID}{" "}
          </Text>
          <Text style={{ fontSize: 15, fontWeight: "bold", color: "black" }}>
            FLOOR: {floor}{" "}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    backgroundColor: "grey",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  timerText: {
    fontSize: 22,
    marginVertical: 10,
    fontWeight: "bold",
    color: "white",
  },
  text: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 12,
  },
  LoginContainer: {
    marginTop: 20,
    backgroundColor: "black",
    width: 300,
    height: 45,
    borderWidth: 0.5,
    borderolor: "gray",
    borderRadius: 40,
    alignSelf: "center",
  },
  messageContainer: {
    padding: 15,
    backgroundColor: "black",
    borderRadius: 20,
    marginVertical: 20,
    marginHorizontal: 20,
  },
  messageText: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
  },
});

export default HomeScreen;
