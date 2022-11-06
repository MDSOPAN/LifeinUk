import React, { useEffect, useState } from "react";
import { Text, Card, ButtonGroup, Button } from "@rneui/themed";
import ExOptions from "./ExOptions";
import { ScrollView, View } from "react-native";

function arraysEqual(a: any, b: any) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  // If you don't care about the order of the elements inside
  // the array, you should sort both arrays here.
  // Please note that calling sort on an array will modify that array.
  // you might want to clone your array first.

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}
function ExQuestions({ Question, nextQ, setRightans, Translation }: any) {
  let answers: Number[] = Question.answers.map((a: String) => {
    return a.charCodeAt(0) - 65;
  });

  const [selectedAnswers, setSelectedAnswers] = useState([]);
  let [disabled, setDisabled] = useState(true);

  const [reset, setreset] = useState(false);
  let options: any[] = Question.options;

  return (
    <>
      <ScrollView
        style={{
          // height: "100%",
          flexGrow: 1,
          backgroundColor: "#fff",
        }}
        contentContainerStyle={{
          padding: 20,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Text
          h3
          h3Style={{
            textAlign: "center",
            fontWeight: "100",
            maxHeight: "35%",
          }}
          adjustsFontSizeToFit
        >
          {Question.body}
        </Text>
        {Translation && (
          <Text
            h3
            h3Style={{
              textAlign: "center",
              marginTop: 20,
              fontWeight: "100",
              color: "#318CE7",
              maxHeight: "35%",
            }}
            adjustsFontSizeToFit
          >
            Translation:
          </Text>
        )}
        {Translation && (
          <Text
            h2
            h3Style={{
              textAlign: "center",

              marginVertical: 10,

              fontWeight: "100",
              maxHeight: "30%",
            }}
            adjustsFontSizeToFit
          >
            {Translation}
          </Text>
        )}
        {/* <View style={{ height: "50%", display: "flex" }}> */}
        {options.map((el, ind) => {
          return (
            <ExOptions
              key={ind}
              option={el}
              ind={ind}
              setDisabled={setDisabled}
              disabled={disabled}
              reset={reset ? true : false}
              setreset={setreset}
              setSelectedAnswers={setSelectedAnswers}
            />
          );
        })}
        {/* </View> */}
        <Button
          type="outline"
          buttonStyle={{
            borderWidth: 1.5,
          }}
          containerStyle={{
            marginBottom: 10,
          }}
          disabled={disabled}
          onPress={() => {
            let ans: any = selectedAnswers.sort((a, b) => (a > b ? 1 : -1));
            let isequal = arraysEqual(ans, answers);
            console.log(isequal);
            if (isequal) {
              setRightans((val: any) => {
                return val + 1;
              });
            }
            nextQ();
            setreset(true);
          }}
          size="md"
        >
          SUBMIT
        </Button>
      </ScrollView>
      {/* onDidFailToReceiveAdWithError={this.bannerError} */}
    </>
  );
}

export default ExQuestions;
