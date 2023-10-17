import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Question from "./ReQuestoins";
import { Header, Icon, Button, Text as Tx } from "@rneui/themed";
import { useNavigation, useRoute } from "@react-navigation/native";

function ReIndex() {
  let route: any = useRoute();
  let Qdata: any = route.params.Qdata;
  let lang = route.params.lang;
  let Answers = route.params.Answers;
  let adcountdown = useRef(3);
  let navigation: any = useNavigation();
  let [question, setQuestion] = useState(0);

  return (
    <>
      <Header
        backgroundColor="#fff"
        leftContainerStyle={{
          alignSelf: "center",
        }}
        centerComponent={{
          text: "Exam",
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
      {Qdata.length != 0 && (
        <>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              backgroundColor: "#fff",
              justifyContent: "flex-start",
            }}
          >
            <Button
              size="md"
              containerStyle={{
                maxWidth: "20%",
                borderRadius: 5,
                flexGrow: 1,
                margin: 10,
                // alignSelf: "flex-start",
              }}
              onPress={() => {
                if (question != 0) {
                  setQuestion(question - 1);
                }
              }}
            >
              <Icon type="ionicon" name="arrow-back-outline" color="white" />
            </Button>
            <Button
              size="md"
              containerStyle={{
                maxWidth: "20%",
                flexGrow: 1,
                marginLeft: "auto",
                borderRadius: 5,
                margin: 10,
              }}
              onPress={() => {
                if (question + 1 < Qdata.length) {
                  setQuestion(question + 1);
                }
              }}
            >
              <Icon type="ionicon" name="arrow-forward-outline" color="white" />
            </Button>
          </View>
          <Question
            question={Qdata[question]}
            selAns={Answers[question]}
            lang={lang}
            nextQ={() => {
              adcountdown.current = adcountdown.current - 1;
              console.log(adcountdown.current);
              if (adcountdown.current <= 0) {
                // load();
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
export default ReIndex;
