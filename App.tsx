import IndexQuiz from "./PracticeQuizes/IndexQuiz";
import Home from "./home/Home";
import { QueryClient, useQuery, QueryClientProvider } from "react-query";
import React from "react";
// import { MMKV } from "react-native-mmkv";
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
import Examshome from "./Exams/Examshome";
import IndexExQuestion from "./Exams/IndexExQuestion";
import ExResults from "./Exams/ExResults";

// export const storage = new MMKV();

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
              <Stack.Screen name="Practice Exam" component={IndexQuiz} />
              <Stack.Screen name="Exams" component={Examshome} />
              <Stack.Screen name="ExQuestoins" component={IndexExQuestion} />
              <Stack.Screen name="ExResults" component={ExResults} />
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
