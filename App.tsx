import Home from "./Home";
import { QueryClient, useQuery, QueryClientProvider } from "react-query";
import React from "react";
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
    <QueryClientProvider client={client}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <Home />
        </SafeAreaView>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",

    // justifyContent: "center",
    paddingTop: Platform.OS === "android" ? st.currentHeight : 0,
  },
});
