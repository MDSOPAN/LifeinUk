import React, { useState } from "react";
import { Text, Card, ButtonGroup, Button } from "@rneui/themed";
import Options from "./Options";
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
function Question({ Question, nextQ }: any) {
  let answers: Number[] = Question.answers.map((a: String) => {
    return a.charCodeAt(0) - 65;
  });

  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [show, setShow] = useState(false);
  const [reset, setreset] = useState(false);
  let options: any[] = Question.options;
  return (
    <>
      <Card
        containerStyle={{
          height: "100%",
        }}
      >
        <Card.Title>
          <Text
            h3
            h3Style={{
              fontWeight: "100",
            }}
          >
            {Question.body}
          </Text>
        </Card.Title>
        {/* <ButtonGroup
          buttons={options}
          selectMultiple
          selectedIndexes={selectedIndexes}
          onPress={(value) => {
            setSelectedIndexes(value);
          }}
          vertical
          innerBorderStyle={{
            width: 0,
          }}
          textStyle={{
            fontSize: 16,
            margin: 10,
          }}
          buttonStyle={{
            borderWidth: 1,

            borderStyle: "solid",
            borderRadius: 10,
            // padding: 10,
          }}
          containerStyle={{
            height: "70%",
            borderWidth: 0,
          }}
          selectedButtonStyle={{
            backgroundColor: "rgba(21,90,117,0.220)",
          }}
          selectedTextStyle={{
            color: "#09477e",
          }}
          buttonContainerStyle={{
            marginVertical: 10,
            // height: "10%",
            flexGrow: 1,
            borderWidth: 0,
          }}
        /> */}
        <View style={{ height: "65%", display: "flex" }}>
          {options.map((el, ind) => {
            return (
              <Options
                key={ind}
                option={el}
                right={answers.includes(ind) ? true : false}
                show={show}
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
            setShow(true);
          }}
          size="md"
        >
          SUBMIT
        </Button>

        <Button
          type="outline"
          containerStyle={{
            opacity: show ? 1 : 0,
          }}
          buttonStyle={{
            borderWidth: 1.5,
          }}
          disabled={show ? false : true}
          onPress={() => {
            setShow(false);
            nextQ();
            setreset(true);
          }}
          size="md"
        >
          NEXT
        </Button>
      </Card>
    </>
  );
}

export default Question;
