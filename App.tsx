import IndexQuiz from "./PracticeQuizes/IndexQuiz";
import Home from "./home/Home";
import { QueryClient, useQuery, QueryClientProvider } from "react-query";
import React, { useEffect, useRef, useState } from "react";
// import { MMKV } from "react-native-mmkv";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MenuProvider } from "react-native-popup-menu";
import * as fs from "expo-file-system";
import { SafeAreaProvider } from "react-native-safe-area-context";
// import * as SplashScreen from "expo-splash-screen";
//@ts-ignore
import Passed from "./assets/passed.svg";
import {
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar as st,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Pressable,
  StatusBar,
  Dimensions,
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
import AppIntroSlider from "react-native-app-intro-slider";
import { Button } from "@rneui/base";

// export const storage = new MMKV();

const getifOpened = async (setOpened: any) => {
  let { exists } = await fs.getInfoAsync(fs.documentDirectory + "opened.txt");

  if (exists) {
    setOpened(true);
  } else {
    await fs.writeAsStringAsync(fs.documentDirectory + "opened.txt", "true");
    setOpened(false);
  }
};
const slides = [
  {
    key: 1,
    // title: 'Title 1',
    image: require("./assets/intro_1.jpg"),
    text: "Practice your United kindom citizenship questions with LIUT",
    // backgroundColor: '#59b2ab',
  },
  {
    key: 2,
    title: "Title 2",
    text: "Test your knowledge with 5000+ questions",
    image: require("./assets/intro_2.jpg"),
    backgroundColor: "#febe29",
  },
  {
    key: 3,
    title: "Rocket guy",
    text: "Test yourself with more than 100 exams for free",
    image: require("./assets/intro_3.jpg"),
    backgroundColor: "#22bcb5",
  },
];

export default function App() {
  let client = new QueryClient();
  const Stack = createNativeStackNavigator();

  let slider: any = useRef(null);

  let [opened, setOpened] = useState(false);
  const onDone = () => {
    slider.current.goToSlide(0);
    setOpened(true);
  };
  const renderItem = ({ item }: any) => {
    return (
      <View
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          alignContent: "center",
          height: "100%",
          position: "relative",
        }}
      >
        <Pressable
          onPress={() => {
            setOpened(true);
          }}
          style={{
            position: "absolute",
            top: "2%",
            left: "4%",
          }}
        >
          <Text
            style={{
              color: "#bbb",
              fontSize: 16,
            }}
          >
            Skip
          </Text>
        </Pressable>
        {/* <Text>{item.title}</Text> */}
        <Image
          source={item.image}
          style={{
            aspectRatio: 1 / 1,
            height: "48%",
          }}
        />
        <Text
          style={{
            fontWeight: "400",
            fontSize: 26,
            width: Dimensions.get("window").width * 0.9,
            textAlign: "center",
            marginVertical: 40,
          }}
          adjustsFontSizeToFit
        >
          {item.text}
        </Text>
        <Button
          TouchableComponent={TouchableWithoutFeedback}
          onPress={() => {
            if (item.key == 3) {
              setOpened(true);
            } else {
              slider.current.goToSlide(item.key, true);
            }
          }}
          title={item.key == 3 ? "Done" : "Next"}
          type="solid"
          color={"#133279"}
          containerStyle={{
            width: "45%",
            borderRadius: 5,
            marginVertical: 20,
            position: "absolute",
            bottom: "5%",
          }}
        />
      </View>
    );
  };
  useEffect(() => {
    getifOpened(setOpened);
  }, []);

  return (
    <SafeAreaProvider>
      <MenuProvider>
        <NavigationContainer>
          <QueryClientProvider client={client}>
            <SafeAreaView style={styles.container}>
              {opened && (
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
                  <Stack.Screen
                    name="ExQuestoins"
                    component={IndexExQuestion}
                  />
                  <Stack.Screen name="ExResults" component={ExResults} />
                  <Stack.Screen name="ReEx" component={ReIndex} />
                  <Stack.Screen
                    name="MockInfo"
                    component={MockInfo}
                    options={{
                      presentation: "transparentModal",
                      animation: "fade_from_bottom",
                    }}
                  />
                  <Stack.Screen
                    name="Menu"
                    component={Tmenu}
                    options={{
                      presentation: "transparentModal",
                      animation: "fade_from_bottom",
                    }}
                  />
                </Stack.Navigator>
              )}
              {!opened && (
                <>
                  <StatusBar barStyle={"dark-content"} backgroundColor="#fff" />

                  <AppIntroSlider
                    activeDotStyle={{ backgroundColor: "#133279" }}
                    ref={slider}
                    showNextButton={false}
                    bottomButton
                    renderItem={renderItem}
                    showDoneButton={false}
                    data={slides}
                    onDone={onDone}
                  />
                </>
              )}
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
