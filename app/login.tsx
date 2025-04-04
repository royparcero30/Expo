import { useRouter } from "expo-router";
import React, { useState, useLayoutEffect } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet, ImageBackground, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const unstable_settings = {
  headerShown: false,
};

// Helper function to decode a JWT and return its payload
function parseJwt(token: string) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error("Error decoding JWT:", e);
    return null;
  }
}

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const handleLogin = async () => {
    console.log("Login pressed");
    setLoading(true);
    try {
      const response = await axios.post(
        "https://devapi-618v.onrender.com/api/auth/login",
        { username, password }
      );
      console.log("Login response:", response.data);

      if (response.data && response.data.token) {
        await AsyncStorage.setItem("token", response.data.token);
        let userId;
        if (response.data.user) {
          userId = response.data.user.id || response.data.user._id;
        } else {
          const payload = parseJwt(response.data.token);
          console.log("Decoded token payload:", payload);
          userId = payload && (payload.id || payload.userId || payload._id);
        }
        if (userId) {
          await AsyncStorage.setItem("userId", userId.toString());
          console.log("Stored userId:", userId);
          router.replace("/home");
        } else {
          console.error("UserId extraction failed:", userId);
          Alert.alert("Login Failed", "User id not found in token.");
        }
      } else {
        Alert.alert("Login Failed", "No token received from the server");
      }
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert("Login Failed", "An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground source={require("../assets/squid.jpg")} style={styles.background}>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Username:</Text>
        <TextInput
          value={username}
          onChangeText={setUsername}
          style={styles.input} color = "white"
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <Text style={styles.label}>Password:</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input} color ="white"
        />
        <Button
          title={loading ? "Logging in..." : "Login"}
          onPress={handleLogin}
          disabled={loading}
          color="black"
        />
        <TouchableOpacity onPress={() => router.push("/signup")}>
          <Text style={styles.signupLink}>No account? Sign up now!</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    backgroundColor: "rgba(212, 0, 0, 0.65)",
    padding: 20,
    borderRadius: 20,
    width: "95%",
    height: 400,
    justifyContent: "center",
  },
  label: {
    fontSize: 20,
    marginBottom: 5,
    color: "white",
  },
  input: {
    borderWidth: 1,
    borderColor: "white",
    marginBottom: 10,
    padding: 5,
    width: "100%",
    borderRadius: 5,
  },
  
  signupLink: {
    marginTop: 10,
    color: "white",
    textAlign: "center",
    textDecorationLine: "underline",
    fontSize: 18,
  },  
});
