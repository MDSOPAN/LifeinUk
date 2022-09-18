import IndexQuiz from "./PracticeQuizes/IndexQuiz";
import Home from "./home/Home";
import { QueryClient, useQuery, QueryClientProvider } from "react-query";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as SplashScreen from "expo-splash-screen";

import {
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar as st,
} from "react-native";

export default function App() {
  let client = new QueryClient();
  const Stack = createNativeStackNavigator();
  SplashScreen.preventAutoHideAsync();
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <QueryClientProvider client={client}>
          <SafeAreaView style={styles.container}>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="Practice Quiz" component={IndexQuiz} />
            </Stack.Navigator>
          </SafeAreaView>
        </QueryClientProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",

    // justifyContent: "center",
    // paddingTop: Platform.OS === "android" ? st.currentHeight : 0,
  },
});
