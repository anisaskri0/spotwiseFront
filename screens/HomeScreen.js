import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const StartCountdownTimer = ({ durationInSeconds, onTimeout }) => {
  const [timeRemaining, setTimeRemaining] = useState(durationInSeconds);

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

const HomeScreen = ({ navigation }) => {

  const [showTimer, setShowTimer] = useState(false);
  const [timerExpired, setTimerExpired] = useState(false);

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

  const fetchData = async () => {
    try {
      const response = await axios.get("http://10.0.2.2:8000/data");
      const parkingSpaces = response.data;
      
      const freeParkingSpace = parkingSpaces.find(
        (space) => space.status === "free"
      );

      if (freeParkingSpace) {
        updateParkingSpaceStatus(freeParkingSpace.id);
        console.log("The parking spot is now pending.");
        setShowTimer(true);
      } else {
        console.log("No parking space available at the moment");
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
      {showTimer && !timerExpired && (
        <StartCountdownTimer durationInSeconds={10} onTimeout={handleTimeout} />
      )}
      {timerExpired && (
        <Button
          title="Confirm Your Spot"
          onPress={() => console.log("Spot confirmed")}
        />
      )}
      {!showTimer && !timerExpired && (
        <Button title="Park Your Car" onPress={fetchData} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  timerText: {
    fontSize: 18,
    marginVertical: 10,
  },
});

export default HomeScreen;
