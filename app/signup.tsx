export const unstable_settings = {
    headerShown: false,
  };
  
  import { useRouter } from "expo-router";
  import React, { useState } from "react";
  import {
    View,
    Text,
    TextInput,
    Alert,
    StyleSheet,
    ImageBackground,
    Image,
    TouchableOpacity,
  } from "react-native";
  import axios from "axios";
  
  export default function SignupScreen() {
    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
  
    const handleSignup = async () => {
      if (!fullName || !username || !password) {
        Alert.alert("Validation Error", "Please fill in all fields");
        return;
      }
  
      setLoading(true);
      try {
        const { data } = await axios.post(
          "https://devapi-618v.onrender.com/api/auth/register",
          { fullname: fullName, username, password, type_id: 1 },
          { headers: { "Content-Type": "application/json" } }
        );
        console.log("Signup response:", data);
        // Registration successful; navigate to login
        router.push("/login");
      } catch (error) {
        console.error("Error during signup:", error.response?.data || error.message);
        const errorMessage = error.response?.data?.error || error.response?.data?.message;
        if (errorMessage && errorMessage.includes("Duplicate entry")) {
          Alert.alert("Sign Up Failed", "Username already taken. Please choose a different one.");
        } else {
          Alert.alert("Sign Up Failed", errorMessage || "An error occurred during sign up.");
        }
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <ImageBackground source={require("../assets/squid.jpg")} style={styles.background}>
        {/* Arrow button in the top right */}
        <TouchableOpacity style={styles.loginButtonContainer} onPress={() => router.push("/login")}>
          <Text style={styles.arrow}>&larr;</Text>
        </TouchableOpacity>
  
        <View style={styles.container}>
          <View style={styles.formContainer}>
            <Text style={styles.label}>Full Name:</Text>
            <TextInput
              value={fullName}
              onChangeText={setFullName}
              style={styles.input}
              placeholder="Enter your full name"
              placeholderTextColor="white"
            />
            <Text style={styles.label}>Username:</Text>
            <TextInput
              value={username}
              onChangeText={setUsername}
              style={styles.input}
              placeholder="Enter a username"
              placeholderTextColor="white"
            />
            <Text style={styles.label}>Password:</Text>
            <TextInput
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={styles.input}
              placeholder="Enter a password"
              placeholderTextColor="white"
            />
  
            <TouchableOpacity style={styles.signupButton} onPress={handleSignup} disabled={loading}>
              <Text style={styles.signupButtonText}>{loading ? "Signing up..." : "Sign Up"}</Text>
            </TouchableOpacity>
  
            <TouchableOpacity onPress={() => router.push("/login")}>
              <Text style={styles.loginLink}>Already have an account? Login now!</Text>
            </TouchableOpacity>
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
    loginButtonContainer: {
      position: "absolute",
      top: 40,
      right: 20,
      zIndex: 1,
    },
    arrow: {
      fontSize: 24,
      color: "black",
    },
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    formContainer: {
      backgroundColor: "rgba(121, 0, 0, 0.9)",
      padding: 25,
      borderRadius: 10,
      width: "40%",
      alignItems: "stretch",
    },
    label: {
      fontSize: 16,
      marginBottom: 5,
      color: "black",
    },
    input: {
      borderWidth: 1,
      borderColor: "white",
      marginBottom: 15,
      padding: 10,
      borderRadius: 5,
      fontSize: 16,
      color: "white",
    },
    signupButton: {
      backgroundColor: "white",
      paddingVertical: 10,
      alignItems: "center",
      borderRadius: 5,
      marginTop: 5,
    },
    signupButtonText: {
      color: "white",
      fontSize: 16,
    },
    loginLink: {
      marginTop: 15,
      color: "white",
      textAlign: "center",
      textDecorationLine: "underline",
      fontSize: 16,
    },
  });
  