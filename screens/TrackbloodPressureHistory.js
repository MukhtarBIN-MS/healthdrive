import "firebase/database";
import React, { useContext, useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { app } from "../firebase-config";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  getDatabase,
  set,
  ref,
  query,
  orderByKey,
  orderByChild,
  limitToLast,
  limitToFirst,
  child,
  push,
  update,
  onValue,
} from "firebase/database";
import { AuthContext } from "../Context/AuthContext";

let database = getDatabase(app);

const Good = () => {
  alert("Hi");
};

const TrackSugarCreate = (props) => {
  const { user } = useContext(AuthContext);
  const [systolic, setSystolic] = useState("");
  const [diastolic, setDiastolic] = useState("");
  const [data, setData] = useState(null);
  const [isData, setIsData] = useState(false);
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    if (Platform.OS === "android") {
      setShow(false);
    }
    setMode(currentMode);
  };
  const showDatepicker = () => {
    showMode("date");
    setShow(true);
  };

  function writeNewPost(systolic, diastolic, date) {
    const db = database;
    if (!systolic || !diastolic) {
      if (systolic < 0 || diastolic < 0) {
        setResult("Systolic and diastolic readings must be positive values.");
        return;
      }
      setResult("Please enter both systolic and diastolic readings.");
    } else {
      const postData = {
        systolic: systolic,
        diastolic: diastolic,
        date: date.toDateString(),
        timestamp: Date.now()
      };

      const newPostKey = push(child(ref(db), "bloodPressure")).key;

      const updates = {};
      updates[`bloodPressure/${user.uid}/${newPostKey}`] = postData;

      alert("Blood Pressure Created");
      setSystolic("");
      setDiastolic("");
      return update(ref(db), updates);
    }
  }

  useEffect(() => {
    const db = database;
    const postListRef = query(
      ref(db, `bloodPressure/${user.uid}`),
      orderByChild('timestamp')
    );

    onValue(postListRef, (snapshot) => {
      if (snapshot.exists()) {
        const databloodPressure = snapshot.val();
        const sortedData = Object.values(databloodPressure).sort((a, b) => b.timestamp - a.timestamp);
        setData(sortedData);
        setIsData(true);
      } else {
        console.log("No data available");
      }
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginBottom: 20, padding: 20, alignItems: "center" }}>
        <Text style={styles.title}>Track Sugar Level</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Enter Systolic Pressure "
          value={systolic}
          onChangeText={(text) => setSystolic(text)}
        />
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Enter Diastolic Pressure"
          value={diastolic}
          onChangeText={(text) => setDiastolic(text)}
        />
        <TouchableOpacity
          style={{
            borderStyle: "solid",
            borderWidth: 0.5,
            padding: 10,
            width: "80%",
          }}
          onPress={showDatepicker}
        >
          <Text style={{ color: "#666", marginLeft: 5, marginTop: 7 }}>
            Choose Date: {`${date.toDateString()} `}
          </Text>
          {show && (
            <DateTimePicker
              value={date}
              mode={mode}
              is24Hour={true}
              maximumDate={new Date()}
              minimumDate={new Date("1980-01-01")}
              onChange={onChangeDate}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => writeNewPost(systolic, diastolic, date)}
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
      <Text
        style={{
          marginBottom: 10,
          textAlign: "center",
          fontSize: 20,
          fontWeight: "bold",
          fontFamily: "serif",
        }}
      >
        My Blood Pressure Records
      </Text>
      <ScrollView showsVerticalScrollIndicator={false} style={{ padding: 20 }}>
        {isData ? (
          <View>
            {Object.keys(data).map((key) => (
              <View
                style={{
                  flexDirection: "column",
                  backgroundColor:
                    data[key]["systolic"] >= 90 &&
                    data[key]["systolic"] <= 119 &&
                    data[key]["systolic"] >= 60 &&
                    data[key]["systolic"] <= 79
                      ? "#4CAF50"
                      : data[key]["systolic"] >= 120 &&
                        data[key]["systolic"] <= 129 &&
                        data[key]["systolic"] >= 80 &&
                        data[key]["systolic"] <= 84
                      ? "yellow"
                      : data[key]["systolic"] >= 140 ||
                        data[key]["systolic"] >= 90
                      ? "orange"
                      : "#F44336",
                  marginBottom: 40,
                  borderRadius: 10,
                  borderStyle: "solid",
                  borderWidth: 0.5,
                  padding: 20,
                }}
                key={key}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: 15,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "serif",
                      fontSize: 16,
                      color:
                        data[key]["systolic"] >= 90 &&
                        data[key]["systolic"] <= 119 &&
                        data[key]["diastolic"] >= 60 &&
                        data[key]["diastolic"] <= 79
                          ? "#333"
                          : data[key]["systolic"] >= 120 &&
                            data[key]["systolic"] <= 129 &&
                            data[key]["diastolic"] >= 80 &&
                            data[key]["diastolic"] <= 84
                          ? "#333"
                          : data[key]["systolic"] >= 140 ||
                            data[key]["diastolic"] >= 90
                          ? "#333"
                          : "#fff",
                    }}
                  >
                    BloodPressure :{" "}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "serif",
                      fontSize: 16,
                      color:
                        data[key]["systolic"] >= 90 &&
                        data[key]["systolic"] <= 119 &&
                        data[key]["diastolic"] >= 60 &&
                        data[key]["diastolic"] <= 79
                          ? "#333"
                          : data[key]["systolic"] >= 120 &&
                            data[key]["systolic"] <= 129 &&
                            data[key]["diastolic"] >= 80 &&
                            data[key]["diastolic"] <= 84
                          ? "#333"
                          : data[key]["systolic"] >= 140 ||
                            data[key]["diastolic"] >= 90
                          ? "#333"
                          : "#fff",
                    }}
                  >{`${data[key]["systolic"]}-${data[key]["diastolic"] } mmHg`}</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: 15,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "serif",
                      fontSize: 16,
                      color:
                        data[key]["systolic"] >= 90 &&
                        data[key]["systolic"] <= 119 &&
                        data[key]["diastolic"] >= 60 &&
                        data[key]["diastolic"] <= 79
                          ? "#333"
                          : data[key]["systolic"] >= 120 &&
                            data[key]["systolic"] <= 129 &&
                            data[key]["diastolic"] >= 80 &&
                            data[key]["diastolic"] <= 84
                          ? "#333"
                          : data[key]["systolic"] >= 140 ||
                            data[key]["diastolic"] >= 90
                          ? "#333"
                          : "#fff",
                    }}
                  >
                    Date:{" "}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "serif",
                      fontSize: 16,
                      color:
                        data[key]["systolic"] >= 90 &&
                        data[key]["systolic"] <= 119 &&
                        data[key]["diastolic"] >= 60 &&
                        data[key]["diastolic"] <= 79
                          ? "#333"
                          : data[key]["systolic"] >= 120 &&
                            data[key]["systolic"] <= 129 &&
                            data[key]["diastolic"] >= 80 &&
                            data[key]["diastolic"] <= 84
                          ? "#333"
                          : data[key]["systolic"] >= 140 ||
                            data[key]["diastolic"] >= 90
                          ? "#333"
                          : "#fff",
                    }}
                  >
                    {data[key]["date"]}
                  </Text>
                </View>
                <Text
                  style={{
                    fontFamily: "serif",
                    fontSize: 16,
                    color:
                      data[key]["systolic"] >= 90 &&
                      data[key]["systolic"] <= 119 &&
                      data[key]["diastolic"] >= 60 &&
                      data[key]["diastolic"] <= 79
                        ? "#333"
                        : data[key]["systolic"] >= 120 &&
                          data[key]["systolic"] <= 129 &&
                          data[key]["diastolic"] >= 80 &&
                          data[key]["diastolic"] <= 84
                        ? "#333"
                        : data[key]["systolic"] >= 140 ||
                          data[key]["diastolic"] >= 90
                        ? "#333"
                        : "#fff",
                  }}
                >
                  Status :{" "}
                  {data[key]["systolic"] >= 90 &&
                  data[key]["systolic"] <= 119 &&
                  data[key]["diastolic"] >= 60 &&
                  data[key]["diastolic"] <= 79
                    ? "Normal"
                    : data[key]["systolic"] >= 120 &&
                      data[key]["systolic"] <= 129 &&
                      data[key]["diastolic"] >= 80 &&
                      data[key]["diastolic"] <= 84
                    ? "Elevated"
                    : data[key]["systolic"] >= 140 ||
                      data[key]["diastolic"] >= 90
                    ? "High Blood Pressure"
                    : "Hypertension"}
                </Text>
              </View>
            ))}
          </View>
        ) : (
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Text>No Data Recorded Yet</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 16,
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginVertical: 8,
    marginBottom: 10,
    padding: 8,
  },
  button: {
    width: "80%",
    backgroundColor: "darkgreen",
    padding: 12,
    alignItems: "center",
    marginTop: 16,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default TrackSugarCreate;
