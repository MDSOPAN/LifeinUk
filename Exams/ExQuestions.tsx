import React, { useState } from "react";
import { Text, Card, ButtonGroup, Button } from "@rneui/themed";
import ExOptions from "./ExOptions";
import { View } from "react-native";

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
function ExQuestions({ Question, nextQ, setRightans }: any) {
  let answers: Number[] = Question.answers.map((a: String) => {
    return a.charCodeAt(0) - 65;
  });

  const [selectedAnswers, setSelectedAnswers] = useState([]);

  const [reset, setreset] = useState(false);
  let options: any[] = Question.options;

  return (
    <>
      <View
        style={{
          height: "100%",
          backgroundColor: "#fff",
          padding: 20,
        }}
      >
        <Text
          h3
          h3Style={{
            textAlign: "center",
            fontWeight: "100",
          }}
        >
          {Question.body}
        </Text>

        <View style={{ height: "50%", display: "flex" }}>
          {options.map((el, ind) => {
            return (
              <ExOptions
                key={ind}
                option={el}
                ind={ind}
                reset={reset ? true : false}
                setreset={setreset}
                setSelectedAnswers={setSelectedAnswers}
              />
            );
          })}
        </View>
        <Button
          type="outline"
          buttonStyle={{
            borderWidth: 1.5,
          }}
          containerStyle={{
            marginBottom: 10,
          }}
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
      </View>
    </>
  );
}

export default ExQuestions;
