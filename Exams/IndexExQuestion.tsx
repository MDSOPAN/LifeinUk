import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";

import {
  ActivityIndicator,
  Alert,
  Platform,
  StyleSheet,
  View,
} from "react-native";
import CountDown from "react-native-countdown-component";

import * as fs from "expo-file-system";
import { Button, Header, Icon, LinearProgress, Text } from "@rneui/themed";
import {
  StackActions,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
// import {
//   BannerAd,
//   BannerAdSize,
//   TestIds,
// } from "react-native-google-mobile-ads";
import ExQuestions from "./ExQuestions";
import { QueryClient, useQuery } from "react-query";
import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads";

function IndexExQuestion() {
  let route = useRoute();
  let navigation: any = useNavigation();
  let Qdata: any = route.params;
  let time = Qdata.Time;
  let lang = Qdata.lang;
  Qdata = Qdata.Questions;
  const client = new QueryClient();
  //For translation
  let qbodys = new Array();
  Qdata.forEach((el: any) => {
    qbodys.push(el.body);
  });

  const { isLoading, error, data }: any = useQuery(
    ["Extranslation", Qdata],
    async () => {
      let res = await fetch(
        "http://138.68.162.34:3000/api/app/translation/array",
        {
          method: "POST",
          body: JSON.stringify({
            translate: qbodys,
            lang: lang,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );

      let ares = await res.json();
      if (ares.status == "Failed") {
        throw new Error("Could not connect to the database");
      }
      return ares;
    },
    { enabled: lang != "en" }
  );

  let [rightans, setRightans] = useState(new Set());
  let [AnsArr, setAnsArr] = useState(new Array());
  let [question, setQuestion] = useState(0);

  let [fin, setFin] = useState(false);
  let baf = (e: any) => {
    e.preventDefault();
    if (fin == false || fin == undefined || fin == null) {
      Alert.alert(
        "Are youre you want to leave?",
        "You will lose your proggress in this exam",
        [
          { text: "Don't leave", style: "cancel", onPress: () => {} },
          {
            text: "Leave",
            style: "destructive",
            // If the user confirmed, then we dispatch the action we blocked earlier
            // This will continue the action that had triggered the removal of the screen
            onPress: () => {
              navigation.dispatch(e.data.action);
              navigation.removeListener("beforeRemove", baf);
            },
          },
        ]
      );
    }
  };
  //For Obstructio from leaving
  useEffect(() => {
    if (!fin) {
      navigation.addListener("beforeRemove", baf);
    }
    return () => {
      navigation.removeListener("beforeRemove", baf);
    };
  }, [fin]);
  //TO get to the result screen
  useEffect(() => {
    if (fin) {
      navigation.navigate("ExResults", {
        Right: rightans.size,
        Answers: AnsArr,
        Qdata: Qdata,
        QuestionsLength: Qdata.length,
        lang,
      });
    }
  }, [rightans, fin]);

  return (
    <View
      style={{
        display: "flex",
        flex: 1,
        backgroundColor: "#FFF",
      }}
    >
      <Header
        containerStyle={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderBottomColor: "#fff",
        }}
        leftComponent={{
          icon: "close",
          onPress: (e) => {
            navigation.dispatch(StackActions.pop());
          },
          size: 40,
        }}
        backgroundColor="#fff"
        centerComponent={{
          text: `Test ${Qdata[0].ExamNo}`,
          style: styles.heading,
        }}
        rightComponent={
          <CountDown
            until={60 * time}
            size={17}
            running={!isLoading && !error}
            onFinish={() => {
              setFin(true);
              // navigation.navigate("ExResults", {
              //   Right: rightans,
              //   QuestionsLength: Qdata.length,
              // });
            }}
            digitStyle={{ backgroundColor: "white" }}
            showSeparator
            digitTxtStyle={{ color: "#000", fontSize: 25 }}
            timeToShow={["M", "S"]}
            timeLabels={{ m: "", s: "" }}
          />
        }
      />

      <LinearProgress
        style={{ marginVertical: 10 }}
        value={question / Qdata.length}
        variant={"determinate"}
        animation={{
          duration: 500,
        }}
        color="#318CE7"
      />
      {isLoading && (
        <>
          <ActivityIndicator
            style={{
              flexGrow: 1,
            }}
            size={Platform.OS == "android" ? 65 : "large"}
            color="#318CE7"
          />
        </>
      )}
      {!isLoading && !error && (
        <>
          <Button
            size="md"
            containerStyle={{
              maxWidth: "20%",
              borderRadius: 5,
              margin: 10,
            }}
            onPress={() => {
              if (question != 0) {
                setQuestion(question - 1);
              }
            }}
          >
            <Icon type="ionicon" name="arrow-back-outline" color="white" />
          </Button>
          <ExQuestions
            Question={Qdata[question]}
            quesind={question}
            Translation={lang != "en" ? data.data[question] : false}
            setRightans={setRightans}
            rightans={rightans}
            selectedAns={AnsArr[question] != undefined ? AnsArr[question] : []}
            setAnsArr={setAnsArr}
            AnsArr={AnsArr}
            nextQ={async () => {
              if (question + 1 >= Qdata.length) {
                let { exists } = await fs.getInfoAsync(
                  fs.documentDirectory + "ExCompleted.txt"
                );
                if (!exists) {
                  let exno: any = new Object();
                  if (rightans.size > Qdata.length * 0.75) {
                    exno[Qdata[0].ExamNo] = "pass";
                  } else {
                    exno[Qdata[0].ExamNo] = "fail";
                  }

                  await fs.writeAsStringAsync(
                    fs.documentDirectory + "ExCompleted.txt",
                    JSON.stringify(exno)
                  );
                } else {
                  let jsonstr = await fs.readAsStringAsync(
                    fs.documentDirectory + "ExCompleted.txt"
                  );
                  let exno = JSON.parse(jsonstr);
                  if (rightans.size > Qdata.length * 0.75) {
                    exno[Qdata[0].ExamNo] = "pass";
                  } else {
                    exno[Qdata[0].ExamNo] = "fail";
                  }

                  await fs.writeAsStringAsync(
                    fs.documentDirectory + "ExCompleted.txt",
                    JSON.stringify(exno)
                  );
                }
                setFin(true);
              } else {
                setQuestion(question + 1);
              }
            }}
          />
        </>
      )}
      {error && (
        <View style={styles.errview}>
          <Text style={styles.errtext}>Cannnot connect to server</Text>
          <Text style={styles.errtext}>
            Please check your internet connection
          </Text>
          <Button
            containerStyle={styles.ProgressText}
            buttonStyle={styles.errbtn}
            title="Retry"
            type="outline"
            size="md"
            onPress={() => {
              client.invalidateQueries("QuestionData");
            }}
          />
        </View>
      )}
      <View
        style={{
          marginBottom: "auto",
          alignSelf: "center",
        }}
      >
        <BannerAd
          unitId={TestIds.BANNER}
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        />
      </View>
      <StatusBar style="dark" backgroundColor="#fff" />
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    color: "#318CE7",
    fontSize: 30,
    fontWeight: "bold",
  },
  errview: {
    display: "flex",
    flexGrow: 1,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  errtext: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 5,
  },
  ProgressText: {
    fontSize: 20,
    marginVertical: 10,
  },
  errbtn: {
    paddingHorizontal: 25,
  },
});

export default IndexExQuestion;
