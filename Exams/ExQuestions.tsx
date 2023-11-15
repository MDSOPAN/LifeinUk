import React, { useEffect, useState } from "react";
import { Text, Card, ButtonGroup, Button } from "@rneui/themed";
import ExOptions from "./ExOptions";
import { Dimensions, Pressable, ScrollView, TouchableWithoutFeedback, View } from "react-native";
import { Icon } from "@rneui/base";

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
function ExQuestions({
  Question,
  nextQ,
  setRightans,
  selectedAns,
  rightans,
  Translation,
  setAnsArr,
  AnsArr,
  quesind,
  prevQ
}: any) {
  let answers: Number[] = Question.answers.map((a: String) => {
    return a.charCodeAt(0) - 65;
  });
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  useEffect(() => {
    setSelectedAnswers(selectedAns);
  }, [selectedAns]);

  let [isdisabled, setDisabled] = useState(true);
  useEffect(() => {
    if (selectedAnswers.length == answers.length) {
      setDisabled(false);
    } else {
      if (isdisabled == false) setDisabled(true);
    }
  }, [selectedAnswers]);
  const [reset, setreset] = useState(false);
  let options: any[] = Question.options;

  return (
    <>
      <View
        style={{
          // height: "100%",
          flexGrow: 1,
          backgroundColor: "#fff",
          padding: 20,
        }}
      // contentContainerStyle={{
      //   padding: 20,
      // }}
      // showsVerticalScrollIndicator={false}
      >
        <Text
          h3
          h3Style={{
            textAlign: "center",
            fontWeight: "100",
            maxHeight: Math.floor(Dimensions.get("window").height * 0.2),
            marginBottom: 10
          }}
          adjustsFontSizeToFit
        >
          {Question.body.trim()}
        </Text>
        {/* {Translation && (
          
        )} */}
        {Translation && (
          // <Text
          //   h4
          //   h4Style={{
          //     textAlign: "left",

          //     marginVertical: 10,

          //     fontWeight: "100",
          //   }}
          //   adjustsFontSizeToFit
          // >
          // <Text
          //   h4
          //   h4Style={{
          //     textAlign: "left",
          //     marginTop: 20,
          //     fontWeight: "100",
          //     // alignSelf: 'flex-start',
          //     color: "#29337A",

          //     maxHeight: Math.floor(Dimensions.get("window").height * 0.2),
          //   }}
          //   adjustsFontSizeToFit
          // >Translation: </Text>{Translation.trim()}
          // </Text>
          <>


            <Text
              h4
              h4Style={{
                textAlign: "left",

                marginVertical: 10,
                maxHeight: Math.floor(Dimensions.get("window").height * 0.15),
                color: '#676767',
                fontWeight: "100",
              }}
              adjustsFontSizeToFit
            >
              <Text style={{ color: '#133279' }} adjustsFontSizeToFit>Translation:</Text> {Translation.trim()}
            </Text>
          </>
        )}
        {/* <View style={{ height: "50%", display: "flex" }}> */}
        {options.map((el, ind) => {
          return (
            <ExOptions
              key={ind}
              option={el}
              ind={ind}
              ispressed={selectedAns.includes(ind)}
              selectedAnswers={selectedAnswers}
              reset={reset ? true : false}
              setreset={setreset}
              setSelectedAnswers={setSelectedAnswers}
            />
          );
        })}
        {/* </View> */}
        {/* <Button
          color={'#29337A'}
          type="solid"
          buttonStyle={{
            // borderWidth: 1.5,
          }}
          containerStyle={{
            marginVertical: 10,
          }}
          disabled={isdisabled}
          onPress={() => {
            let ans: any = selectedAnswers.sort((a: any, b: any) =>
              a > b ? 1 : -1
            );
            let isequal = arraysEqual(ans, answers);
            if (AnsArr.length > quesind) {
              setAnsArr((val: any) => {
                val.splice(quesind, 1, ans);

                return val;
              });
            } else {
              setAnsArr((val: any) => {
                val.push(ans);

                return val;
              });
            }

            if (isequal) {
              setRightans((val: any) => {
                val.add(quesind);
                return val;
              });
            } else if (rightans.has(quesind)) {
              setRightans((val: any) => {
                val.delete(quesind);
                return val;
              });
            }
            nextQ();
            setreset(true);
          }}
          size="md"
        >
          SUBMIT
        </Button> */}
        <View style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: "center"
        }}>
          <Pressable onPress={prevQ}
            disabled={quesind == 0}>
            <View style={{
              width: Dimensions.get('window').width * 0.12,
              height: Dimensions.get('window').width * 0.12,
              borderRadius: Dimensions.get('window').width * 0.12 / 2,
              display: 'flex',
              alignContent: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              
              backgroundColor: quesind != 0 ? "#133279" : "#bbbbbb",
            }}>
              <Icon
                size={45}
                color={'#fff'}
                name='chevron-left'
                type='material-community'
                Component={TouchableWithoutFeedback}
                onPress={prevQ}
              />
            </View>
          </Pressable>
          <Button
            type="solid"

            disabled={isdisabled}
            color={'#29337A'}
            buttonStyle={{
              // borderWidth: 1.5,
              borderRadius: 5,
            }}
            containerStyle={{
              marginVertical: 10,
              marginLeft: 10,
              flex: 1,
              borderRadius: 8
            }}
            onPress={() => {
              let ans: any = selectedAnswers.sort((a: any, b: any) =>
                a > b ? 1 : -1
              );
              let isequal = arraysEqual(ans, answers);
              if (AnsArr.length > quesind) {
                setAnsArr((val: any) => {
                  val.splice(quesind, 1, ans);

                  return val;
                });
              } else {
                setAnsArr((val: any) => {
                  val.push(ans);

                  return val;
                });
              }

              if (isequal) {
                setRightans((val: any) => {
                  val.add(quesind);
                  return val;
                });
              } else if (rightans.has(quesind)) {
                setRightans((val: any) => {
                  val.delete(quesind);
                  return val;
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
      </View>
      {/* onDidFailToReceiveAdWithError={this.bannerError} */}
    </>
  );
}

export default ExQuestions;
