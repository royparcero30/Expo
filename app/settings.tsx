import React, { useState } from "react";
import { View, Text, Switch, Button, Alert, StyleSheet, ImageBackground } from "react-native";
import { useRouter } from "expo-router";

export default function SettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const router = useRouter();

  const toggleNotifications = () => setNotificationsEnabled(previous => !previous);
  const toggleDarkMode = () => setDarkModeEnabled(previous => !previous);

  const handleLogout = () => {
    // Implement your logout logic here.
    Alert.alert("Logged Out", "You have been logged out.");
    router.push("/login");
  };

  return (
    <ImageBackground source={require("../assets/squid.jpg")} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.settingsContainer}>
          <Text style={styles.title}>Settings</Text>
          <View style={styles.settingItem}>
            <Text style={styles.label}>Enable Notifications</Text>
            <Switch value={notificationsEnabled} onValueChange={toggleNotifications} />
          </View>
          <View style={styles.settingItem}>
            <Text style={styles.label}>Dark Mode</Text>
            <Switch value={darkModeEnabled} onValueChange={toggleDarkMode} />
          </View>
          <Button title="Logout" color="black" onPress={handleLogout} />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  settingsContainer: {
    backgroundColor: "rgba(179, 0, 0, 0.9)",
    padding: 25,
    borderRadius: 20,
    width: "95%",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: "white",
    textAlign: "center",
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: "white",
  },
});
