import React, { useEffect, useState } from "react";
import { Text, Card, ButtonGroup, Button } from "@rneui/themed";
import Options from "./Options";
import { ActivityIndicator, Platform, ScrollView, View } from "react-native";
import { QueryClient, useQuery } from "react-query";

function Question({ question, nextQ, lang }: any) {
  let answers: Number[] = question.answers.map((a: String) => {
    return a.charCodeAt(0) - 65;
  });

  // const [tr, setTr] = useState("");
  const client = new QueryClient();
  // useEffect(() => {
  //   console.log("run");
  //   client.refetchQueries("translation");
  // }, [question.body]);
  const { isLoading, error, data }: any = useQuery(
    ["translation", question.body, lang],
    async () => {
      let res = await fetch(
        "http://138.68.162.34:3000/api/app/translation/string",
        {
          method: "POST",
          body: JSON.stringify({
            translate: question.body,
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

  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [show, setShow] = useState(false);
  const [reset, setreset] = useState(false);

  let options: any[] = question.options;
  return (
    <ScrollView
      style={{
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
        {question.body}
      </Text>
      {lang != "en" && (
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
      {isLoading && lang != "en" && (
        <>
          <ActivityIndicator
            size={Platform.OS == "android" ? 65 : "large"}
            color="#318CE7"
          />
        </>
      )}
      {!isLoading && !error && lang != "en" && (
        <Text
          h3
          h3Style={{
            textAlign: "center",

            marginVertical: 10,

            fontWeight: "100",
            maxHeight: "35%",
          }}
          adjustsFontSizeToFit
        >
          {data.data}
        </Text>
      )}
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
    </ScrollView>
  );
}

export default Question;
