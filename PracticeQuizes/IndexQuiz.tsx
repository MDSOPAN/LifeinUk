import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Question from "./Question";
import { Header, Icon, Text as Tx } from "@rneui/themed";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  BannerAd,
  BannerAdSize,
  TestIds,
  useInterstitialAd,
} from "react-native-google-mobile-ads";
// import {
//   BannerAd,
//   BannerAdSize,
//   InterstitialAd,
//   TestIds,
//   useInterstitialAd,
// } from "react-native-google-mobile-ads";

function IndexQuiz() {
  let route: any = useRoute();
  let Qdata: any = route.params.Qdata;
  let lang = route.params.lang;
  let adcountdown = useRef(3);
  let navigation: any = useNavigation();
  let [question, setQuestion] = useState(0);

  //AD

  const { isLoaded, isClosed, load, show, error } = useInterstitialAd(
    "ca-app-pub-4662143029142618/9782938015",
    {}
  );

  useEffect(() => {
    if (isLoaded) {
      show();
    }
  }, [isLoaded]);

  return (
    <>
      <Header
        backgroundColor="#fff"
        leftContainerStyle={{
          alignSelf: "center",
        }}
        centerComponent={{
          text: "Practice",
          style: styles.heading,
        }}
        leftComponent={
          <Icon
            type="ionicon"
            name="arrow-back-outline"
            color="#318CE7"
            size={34}
            style={{
              alignSelf: "center",
            }}
            onPress={() => {
              navigation.pop();
            }}
          />
        }
      />
      <StatusBar style="dark" backgroundColor="#fff" />
      <BannerAd
        unitId={"ca-app-pub-4662143029142618/9942720116"}
        onAdFailedToLoad={(er) => {
          console.log(er);
        }}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      />
      {Qdata.length != 0 && (
        <>
          <Question
            question={Qdata[question]}
            lang={lang}
            nextQ={() => {
              adcountdown.current = adcountdown.current - 1;
              console.log(adcountdown.current);
              if (adcountdown.current <= 0) {
                load();
                adcountdown.current = 3;
              }
              if (question + 1 >= Qdata.length) {
                navigation.navigate("Practice End");
              } else {
                setQuestion(question + 1);
              }
            }}
          />
        </>
      )}
      {Qdata.length == 0 && (
        <View
          style={{
            flexGrow: 1,
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#fff",
          }}
        >
          <Tx h2 h2Style={{ textAlign: "center" }}>
            Sorry!
          </Tx>
          <Tx h4 h4Style={{ textAlign: "center" }}>
            We are updating our questions
          </Tx>
          <Tx h4 h4Style={{ textAlign: "center" }}>
            Please try again later.
          </Tx>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  heading: {
    color: "#318CE7",
    fontSize: 30,
    fontWeight: "bold",
  },
});
export default IndexQuiz;
