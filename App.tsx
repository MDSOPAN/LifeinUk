import IndexQuiz from "./PracticeQuizes/IndexQuiz";
import Home from "./home/Home";
import { QueryClient, useQuery, QueryClientProvider } from "react-query";
import React, { useEffect } from "react";
// import { MMKV } from "react-native-mmkv";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MenuProvider } from "react-native-popup-menu";

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
import Qend from "./PracticeQuizes/Qend";
import ReIndex from "./Exams/ExReview/ReIndex";
import Datadoat from "./home/Datadoat";
import MockInfo from "./Exams/Modals/MockInfo";
import Settings from "./Settings/Settings";
import Tmenu from "./Settings/Modals/Tmenu";

// export const storage = new MMKV();

export default function App() {
  let client = new QueryClient();
  const Stack = createNativeStackNavigator();

  return (
    <SafeAreaProvider>
      <MenuProvider>
        <NavigationContainer>
          <QueryClientProvider client={client}>
            <SafeAreaView style={styles.container}>
              <Stack.Navigator
                screenOptions={{
                  headerShown: false,
                  gestureEnabled: false,
                }}
              >
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="datadoat" component={Datadoat} />
                <Stack.Screen name="settings" component={Settings} />
                <Stack.Screen name="Practice Exam" component={IndexQuiz} />
                <Stack.Screen name="Practice End" component={Qend} />
                <Stack.Screen name="Exams" component={Examshome} />
                <Stack.Screen name="ExQuestoins" component={IndexExQuestion} />
                <Stack.Screen name="ExResults" component={ExResults} />
                <Stack.Screen name="ReEx" component={ReIndex} />
                <Stack.Screen name="MockInfo" component={MockInfo} options={{ presentation: 'transparentModal',animation: 'fade_from_bottom' }}/>
                <Stack.Screen name="Menu" component={Tmenu} options={{ presentation: 'transparentModal',animation: 'fade_from_bottom' }}/>
              </Stack.Navigator>
            </SafeAreaView>
          </QueryClientProvider>
        </NavigationContainer>
      </MenuProvider>
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
