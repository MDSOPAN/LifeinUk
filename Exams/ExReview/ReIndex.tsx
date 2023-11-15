import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import { ScrollView, StyleSheet, View, Text, Pressable, Dimensions, TouchableWithoutFeedback } from "react-native";
import Question from "./ReQuestoins";
import { Header, Icon, Button, Text as Tx } from "@rneui/themed";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

function ReIndex() {
  let route: any = useRoute();
  let Qdata: any = route.params.Qdata;
  let lang = route.params.lang;
  let Answers = route.params.Answers;
  let adcountdown = useRef(3);
  let navigation: any = useNavigation();
  let [question, setQuestion] = useState(0);

  return (
    <SafeAreaView style={styles.safearea}>
      {/* <Header
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
      /> */}
      <View style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: "#fff",
        margin: 10
        // height: 200
      }}>
        <Icon
          type="fontawesome"
          name="chevron-left"
          color="#133279"
          size={36}
          style={{
            alignSelf: "center",
          }}
          onPress={() => {
            navigation.pop();
          }}
        />

        <Text style={styles.heading}>
          Test {Qdata[0].ExamNo} Review
        </Text>
      </View>
      <StatusBar style="dark" backgroundColor="#fff" />
      {Qdata.length != 0 && (
        <ScrollView style={{
          flexGrow: 1,
          backgroundColor: "#fff",
        }}
        contentContainerStyle={{
          padding: 10,
        }}
        showsVerticalScrollIndicator={false}>
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
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              backgroundColor: "#fff",
              // marginBottom: 'auto',
              marginVertical:10,
              justifyContent: "flex-start",
            }}
          >
            <Pressable onPress={(prevQ => {
              if (question != 0) {
                setQuestion(question - 1);
              }
            })}
            >
              <View style={{
                // width: Dimensions.get('window').width * 0.12,
                // height: Dimensions.get('window').width * 0.12,
                borderRadius: 10,
                display: 'flex',
                flexDirection: 'row',
                alignContent: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: 10,
                paddingVertical:10,
                paddingHorizontal:15,
                paddingLeft: 0,
                backgroundColor: "#133279",
              }}>
                

                <Icon
                  size={45}
                  color={'#fff'}
                  name='chevron-left'
                  type='material-community'
                  Component={TouchableWithoutFeedback}
                  onPress={() => {
                    if (question != 0) {
                      setQuestion(question - 1);
                    }
                  }}
                />
                <Text style={{
                  color:"#fff",
                  fontSize: 18
                }}>Previous</Text>
              </View>
            </Pressable>
            {/* <Button
              size="md"
              containerStyle={{
                maxWidth: "20%",
                borderRadius: 5,
                flexGrow: 1,
                margin: 10,
                // alignSelf: "flex-start",
              }}
              color={'#29337A'}
              onPress={() => {
                if (question != 0) {
                  setQuestion(question - 1);
                }
              }}
            >
              <Icon type="ionicon" name="arrow-back-outline" color="white" />
            </Button> */}
            {/* <Button
              size="md"
              containerStyle={{
                maxWidth: "20%",
                flexGrow: 1,
                marginLeft: "auto",
                borderRadius: 5,
                margin: 10,
              }}
              color={'#29337A'}
              onPress={() => {
                if (question + 1 < Qdata.length) {
                  setQuestion(question + 1);
                }
              }}
            >
              <Icon type="ionicon" name="arrow-forward-outline" color="white" />
            </Button> */}
            <Pressable onPress={() => {
              if (question + 1 < Qdata.length) {
                setQuestion(question + 1);
              }
            }} style={{
              marginLeft:'auto'
            }}>
              <View style={{
                // width: Dimensions.get('window').width * 0.12,
                // height: Dimensions.get('window').width * 0.12,
                borderRadius: 10,
                display: 'flex',
                flexDirection: 'row',
                alignContent: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: 10,
                paddingVertical:10,
                paddingHorizontal:15,
                backgroundColor: "#133279",
              }}>
                <Text style={{
                  color:"#fff",
                  fontSize: 18
                }}>Next</Text>

                <Icon
                  size={45}
                  color={'#fff'}
                  name='chevron-right'
                  type='material-community'
                  Component={TouchableWithoutFeedback}
                  onPress={() => {
                    if (question + 1 < Qdata.length) {
                      setQuestion(question + 1);
                    }
                  }}
                />
              </View>
            </Pressable>
          </View>
        </ScrollView>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  heading: {
    color: "#133279",
    fontSize: 22,
    marginLeft: 5,
    flex: 1,
    fontWeight: "600",
    // marginRight: 'auto'
  },
  safearea: {
    flex: 1,
    backgroundColor: "#fff"
  },
});
export default ReIndex;
