import React, { useEffect, useState } from "react";
import { Text, Card, ButtonGroup, Button } from "@rneui/themed";
import ReOptions from "./ReOptions";
import { ActivityIndicator, Platform, ScrollView, View } from "react-native";
import { QueryClient, useQuery } from "react-query";
import { app_url } from "../../universal/app_constants";

function Question({ question, nextQ, lang, selAns }: any) {
  let answers: Number[] = question.answers.map((a: String) => {
    return a.charCodeAt(0) - 65;
  });

  const client = new QueryClient();

  const { isLoading, error, data }: any = useQuery(
    ["translation", question.body, lang],
    async () => {
      let res = await fetch(
        `http://${app_url}:3000/api/app/translation/string`,
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

  const selectedAnswers = selAns;
  console.log(selAns);
  const show = true;
  const [reset, setreset] = useState(false);
  useEffect(() => {
    setreset(true);
  }, [question]);
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
          h4
          h4Style={{
            textAlign: "center",

            marginVertical: 10,

            fontWeight: "100",
            maxHeight: "30%",
          }}
          adjustsFontSizeToFit
        >
          {data.data}
        </Text>
      )}
      {options.map((el, ind) => {
        return (
          <ReOptions
            key={ind}
            option={el}
            right={answers.includes(ind) ? true : false}
            show={show}
            ind={ind}
            selectedAnswers={selectedAnswers}
            reset={reset ? true : false}
            setreset={setreset}
          />
        );
      })}
    </ScrollView>
  );
}

export default Question;
