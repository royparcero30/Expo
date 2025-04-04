import { useRouter } from "expo-router";
import React, { useLayoutEffect, useState, useEffect } from "react";
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const unstable_settings = {
  headerShown: false,
};

export default function HomeScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  useEffect(() => {
    // Retrieve the userId from AsyncStorage (stored during login)
    const fetchUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem("userId");
        setUserId(storedUserId);
      } catch (error) {
        console.error("Failed to fetch userId:", error);
      }
    };

    fetchUserId();
  }, []);

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("userId");
      router.replace("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <ImageBackground
      source={require("../assets/tabagwang.jpg")}
      style={styles.background}
    >
      {/* Drawer Menu Icon */}
      <TouchableOpacity style={styles.drawerIcon} onPress={toggleDrawer}>
        <Text style={styles.drawerIconText}>☰</Text>
      </TouchableOpacity>

      {/* Drawer Dropdown Menu */}
      {drawerVisible && (
        <View style={styles.menuContainer}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              setDrawerVisible(false);
              // Navigate to ProfileScreen with userId as parameter
              if (userId) {
                router.push("/profile", { id: userId });
              } else {
                Alert.alert("Error", "User ID not found.");
              }
            }}
          >
            <Text style={styles.menuItemText}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              setDrawerVisible(false);
              handleLogout();
            }}
          >
            <Text style={styles.menuItemText}>Logout</Text>
          </TouchableOpacity>
          
        </View>
      )}

      <View style={styles.container}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Welcome to Home Screen!</Text>
          {userId && <Text style={styles.text}>Your ID: {userId}</Text>}
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
  drawerIcon: {
    position: 'absolute',
    top: 40,
    right: 20,
    padding: 10,
    zIndex: 10,
  },
  drawerIconText: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
  },
  menuContainer: {
    position: 'absolute',
    top: 70,
    right: 20,
    backgroundColor: "rgba(122, 0, 0, 0.9)",
    borderRadius: 5,
    overflow: "hidden",
    zIndex: 10,
  },
  menuItem: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "white",
  },
  menuItemText: {
    color: "white",
    fontSize: 16,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  formContainer: {
    backgroundColor: "rgba(95, 2, 2, 0.84)",
    padding: 50,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
  title: {
    fontSize: 25,
    marginBottom: 12,
    color: "white",
    textAlign: "center",
  },
  text: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
    marginBottom: 5,
  },
});
