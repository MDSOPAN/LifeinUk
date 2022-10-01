import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Question from "./Question";
import { Header, Text as Tx } from "@rneui/themed";
import { useNavigation, useRoute } from "@react-navigation/native";

function IndexQuiz() {
  let route = useRoute();
  let Qdata: any = route.params;

  let navigation: any = useNavigation();
  let [question, setQuestion] = useState(0);
  return (
    <>
      <Header
        backgroundColor="#fff"
        centerComponent={{
          text: "Practice Quiz",
          style: styles.heading,
        }}
      />
      {Qdata.length != 0 && (
        <View>
          <Question
            Question={Qdata[question]}
            nextQ={() => {
              if (question + 1 >= Qdata.length) {
                navigation.navigate("Practice End");
              } else {
                setQuestion(question + 1);
              }
            }}
          />
          <StatusBar style="dark" backgroundColor="#fff" />
        </View>
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
