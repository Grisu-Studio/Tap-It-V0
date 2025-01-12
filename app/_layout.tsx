import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer>
        {/* Home */}
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: "Home",
            title: "Home",
            drawerIcon: () => (
              <Ionicons name="home-outline" size={24} color="gray" />
            ),
          }}
        />

        {/* Time Trial */}
        <Drawer.Screen
          name="time-trial"
          options={{
            drawerLabel: "Time Trial",
            title: "Time Trial",
            drawerIcon: () => (
              <Ionicons name="time-outline" size={24} color="gray" />
            ),
          }}
        />

        {/* Endless Mode */}
        <Drawer.Screen
          name="endless"
          options={{
            drawerLabel: "Endless Mode",
            title: "Endless",
            drawerIcon: () => (
              <Ionicons name="infinite-outline" size={24} color="gray" />
            ),
          }}
        />

        {/* About */}
        <Drawer.Screen
          name="about"
          options={{
            drawerLabel: "About",
            title: "About",
            drawerIcon: () => (
              <Ionicons
                name="information-circle-outline"
                size={24}
                color="gray"
              />
            ),
          }}
        />

        {/* Leaderboard */}
        <Drawer.Screen
          name="leaderboard"
          options={{
            drawerLabel: "Leaderboard",
            title: "Leaderboard",
            drawerIcon: () => (
              <Ionicons name="trophy-outline" size={24} color="gray" />
            ),
          }}
        />

        {/* Settings */}
        <Drawer.Screen
          name="settings"
          options={{
            drawerLabel: "Settings",
            title: "Settings",
            drawerIcon: () => (
              <Ionicons name="settings-outline" size={24} color="gray" />
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
