import React, { useEffect, useState } from "react";
import { Text, Card, ButtonGroup, Button } from "@rneui/themed";
import ReOptions from "./ReOptions";
import { ActivityIndicator, Dimensions, Platform, ScrollView, View } from "react-native";
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
    <>
      <Text
        h3
        h3Style={{
          textAlign: "center",
          fontWeight: "100",  
          maxHeight: Math.floor(Dimensions.get("window").height * 0.25),
        }}
        adjustsFontSizeToFit
      >
        {question.body}
      </Text>
      
      {isLoading && lang != "en" && (
        <>
          <ActivityIndicator
            size={Platform.OS == "android" ? 45 : "small"}
            color="#29337A"
          />
        </>
      )}
      {!isLoading && !error && lang != "en" && (
        <Text
        h4
        h4Style={{
          textAlign: "left",

          marginVertical: 10,
          maxHeight: Math.floor(Dimensions.get("window").height * 0.12),
          color:'#676767',
          fontWeight: "100",
        }}
        adjustsFontSizeToFit
        >
          <Text style={{color:'#133279'}}>Translation: </Text>{data.data.trim()}
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
    </>
  );
}

export default Question;
