import React, { useContext, useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { auth } from "../firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthStack from "./AuthStack";
import AppStack from "./AppStack";
import { AuthContext } from "../Context/AuthContext";
import AppStackMed from "./AppStackMed";


export default function AppNav() {
  const { isLoading, userToken, user, userRole, setUser } =
    useContext(AuthContext);
  const [initializing, setInitialising] = useState(true);

  const onAuthStateChange = (user) => {
    setUser(user);
    if (initializing) setInitialising(false);
  };
  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, onAuthStateChange);
    return subscriber;
  }, []);

  if (initializing) return null;

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={27} />
        <Text>Loading</Text>
      </View>
    );
  }



  return (
    <NavigationContainer>
      {userToken && user ? userRole === "Donor" ? <AppStack /> : <AppStackMed /> : <AuthStack />}
    </NavigationContainer>
  );
}
