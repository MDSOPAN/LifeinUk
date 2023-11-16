import React, { useEffect, useState } from "react";
import { Text, Card, ButtonGroup, Button, Icon } from "@rneui/themed";
import Options from "./Options";
import {
  ActivityIndicator,
  Dimensions,
  Platform,
  Pressable,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { QueryClient, useQuery } from "react-query";
import { app_url } from "../universal/app_constants";

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

  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [isdisabled, setDisabled] = useState(true);

  useEffect(() => {
    if (selectedAnswers.length == answers.length) {
      setDisabled(false);
    } else {
      if (isdisabled == false) setDisabled(true);
    }
  }, [selectedAnswers]);
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
          maxHeight: Math.floor(Dimensions.get("window").height * 0.28),
        }}
        adjustsFontSizeToFit
      >
        {question.body.trim()}
      </Text>
      {/* {lang != "en" && (
        <View style={{
          backgroundColor: '#29337A',
          padding: 15,
          width: 'auto',
        }}>
          <Text
            h3
            h3Style={{
              textAlign: "left",
              marginTop: 5,
              fontWeight: "100",
              backgroundColor: 'rgba(41,51,122,0.8)',
              padding: 6,
              width: 'auto',
              fontSize: 16,
              alignSelf: 'flex-start',
              color: "#fff",
            }}
            adjustsFontSizeToFit
          >
            
          </Text>
        </View>
      )} */}
      {isLoading && lang != "en" && (
        <>
          <ActivityIndicator
            size={Platform.OS == "android" ? 65 : "large"}
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
          <Text style={{color:"#133279"}} adjustsFontSizeToFit>Translation:</Text> {data.data.trim()}
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
            selectedAnswers={selectedAnswers}
            setSelectedAnswers={setSelectedAnswers}
          />
        );
      })}

      <View style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:"center"
      }}>
        <Button
          type="solid"
          
          disabled={isdisabled || show}
          color={'#29337A'}
          buttonStyle={{
            // borderWidth: 1.5,
            borderRadius: 5,
          }}
          containerStyle={{
            marginVertical: 10,
            flex: 1
          }}
          onPress={() => {
            let ans: any = selectedAnswers.sort((a, b) => (a > b ? 1 : -1));
            setShow(true);
          }}
          size="md"
        >
          SUBMIT
        </Button>
        <Pressable onPress={() => {
          setShow(false);
          nextQ();
          setreset(true);
        }}
        disabled={!show}>
          <View style={{
            width: Dimensions.get('window').width *0.12,
            height: Dimensions.get('window').width *0.12,
            borderRadius: Dimensions.get('window').width *0.12/2,
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'center',
            alignItems:'center',
            marginLeft: 10,
            backgroundColor: show ? "#133279":"#bbbbbb",
          }}>
            <Icon
              size={45}
              color={'#fff'}
              name='chevron-right'
              type='material-community'
              Component={TouchableWithoutFeedback}
              onPress={() => {
                setShow(false);
                nextQ();
                setreset(true);
              }}
            />
            </View>
          </Pressable>
      </View>
      {/* <Button
        type="outline"
        containerStyle={{
          opacity: show ? 1 : 0,
        }}
        buttonStyle={{
          borderWidth: 1.5,
        }}
        color={'#29337A'}
        disabled={show ? false : true}
        onPress={() => {
          setShow(false);
          nextQ();
          setreset(true);
        }}
        size="md"
      >
        NEXT
      </Button> */}
    </ScrollView>
  );
}

export default Question;
