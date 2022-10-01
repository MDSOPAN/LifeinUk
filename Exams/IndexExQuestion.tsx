import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";

import { Alert, StyleSheet, View } from "react-native";
import CountDown from "react-native-countdown-component";

import * as fs from "expo-file-system";
import { Dialog, Header, Icon, Text } from "@rneui/themed";
import {
  StackActions,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import ExQuestions from "./ExQuestions";

function IndexExQuestion() {
  let route = useRoute();
  let navigation: any = useNavigation();
  let Qdata: any = route.params;
  let time = Qdata.Time;
  Qdata = Qdata.Questions;

  let [rightans, setRightans] = useState(0);
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
  useEffect(() => {
    if (!fin) {
      navigation.addListener("beforeRemove", baf);
    }
    return () => {
      navigation.removeListener("beforeRemove", baf);
    };
  }, [fin]);
  useEffect(() => {
    if (fin) {
      navigation.navigate("ExResults", {
        Right: rightans,
        QuestionsLength: Qdata.length,
      });
    }
  }, [rightans, fin]);

  return (
    <View>
      <Header
        containerStyle={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
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
          text: `Exam ${Qdata[0].ExamNo}`,
          style: styles.heading,
        }}
        rightComponent={
          <CountDown
            until={60 * time}
            size={17}
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

      <ExQuestions
        Question={Qdata[question]}
        setRightans={setRightans}
        nextQ={async () => {
          if (question + 1 >= Qdata.length) {
            let { exists } = await fs.getInfoAsync(
              fs.documentDirectory + "ExCompleted.txt"
            );

            if (!exists) {
              let exno = new Set();
              exno.add(Qdata[0].ExamNo);
              let exarr = Array.from(exno);
              await fs.writeAsStringAsync(
                fs.documentDirectory + "ExCompleted.txt",
                JSON.stringify(exarr)
              );
            } else {
              let jsonstr = await fs.readAsStringAsync(
                fs.documentDirectory + "ExCompleted.txt"
              );
              let exn = JSON.parse(jsonstr);
              let exno = new Set(exn);

              exno.add(Qdata[0].ExamNo);
              let exarr = Array.from(exno);

              await fs.writeAsStringAsync(
                fs.documentDirectory + "ExCompleted.txt",
                JSON.stringify(exarr)
              );
            }

            setFin(true);
          } else {
            setQuestion(question + 1);
          }
        }}
      />
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
});

export default IndexExQuestion;
