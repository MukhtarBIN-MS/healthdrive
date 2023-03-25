import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import InputField from "../components/InputField";
import CustomButton from "../components/CustomButton";
import { AuthContext } from "../Context/AuthContext";

export default function ResetPassword({ navigation }) {
  const { Page, resetUserPassword, submitted } = useContext(AuthContext);
  const [email, setEmail] = useState();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        backgroundColor: "#fff",
      }}
    >
      <View>
        <Text style={{ color: "#333", marginBottom: 30, fontSize: 30 }}>
          Forgot Password ?
        </Text>
        <InputField
          label={"Enter your email to send password reset link"}
          value={email}
          autoCapitalize={"none"}
          onChangeText={(val) => setEmail(val)}
          icon={
            <MaterialIcons
              name="mail"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          keyboardType={"email-address"}
        />
      </View>
      {submitted ? (
        <Text>Please check your email for a reset password link.</Text>
      ) : (
        <View>
          <CustomButton label={"Send"} buttomFunction={() => resetUserPassword(email)} />
          <View style={{ flexDirection: "row" }}>
            <MaterialIcons
              name="arrow-back"
              size={20}
              color="#666"
              style={{ marginRight: 20 }}
            />
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(Page === "Med" ? "LoginMed" : "Login")
              }
            >
              <Text>Back to Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}
