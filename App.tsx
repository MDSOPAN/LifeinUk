// import IndexQuiz from "./PracticeQuizes/IndexQuiz";
import Home from "./home/Home";
import { QueryClient, useQuery, QueryClientProvider } from "react-query";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import {
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar as st,
} from "react-native";

export default function App() {
  let client = new QueryClient();

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <QueryClientProvider client={client}>
          <SafeAreaView style={styles.container}>
            <Home />
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
