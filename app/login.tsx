import { useRouter } from "expo-router";
import React, { useState, useLayoutEffect } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const unstable_settings = {
  headerShown: false,
};

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
    setLoading(true);
    try {
      const response = await axios.post(
        "https://devapi-618v.onrender.com/api/auth/login",
        { username, password }
      );
      if (response.data && response.data.token) {
        await AsyncStorage.setItem("token", response.data.token);
        router.replace("/home");
      } else {
        Alert.alert("Login Failed", "No token received from the server");
      }
    } catch (error) {
      Alert.alert("Login Failed", "An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground source={require("../assets/backmage.jpg")} style={styles.background}>
      <View style={styles.rowContainer}>
        {/* Removed the image */}
        <View style={styles.formContainer}>
          <Text style={styles.label}>Username:</Text>
          <TextInput
            value={username}
            onChangeText={setUsername}
            style={styles.input}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <Text style={styles.label}>Password:</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
          />
          <Button
            title={loading ? "Logging in..." : "Login"}
            onPress={handleLogin}
            disabled={loading}
            color="#66bb6a"
          />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: 20,
  },
  formContainer: {
    backgroundColor: "rgba(209, 3, 37, 0.73)", // Keeping the same background color
    padding: 20,
    borderRadius: 10,
    width: "60%",  // Adjusted width as the image is removed
    height: 250,
    justifyContent: "center",
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "white",
  },
  input: {
    borderWidth: 1,
    borderColor: "blue",
    marginBottom: 10,
    padding: 5,
    width: "100%",
    borderRadius: 5,
  },
});
