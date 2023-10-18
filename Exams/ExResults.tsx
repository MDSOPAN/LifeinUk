import {
  useNavigation,
  StackActions,
  useRoute,
} from "@react-navigation/native";
//@ts-ignore
import Passed from '../assets/passed.svg'
//@ts-ignore
import Failed from '../assets/failed.svg'
import { Header, Text, Button, Card } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
// import { AnimatedCircularProgress } from "react-native-circular-progress";
function ExResults() {
  let navigation: any = useNavigation();
  let route = useRoute();
  let { QuestionsLength, Right, Qdata, Answers, lang }: any = route.params;

  let score = Math.floor((Right / QuestionsLength) * 100);

  let bafn1 = (e: any) => {
    e.preventDefault();
    navigation.removeListener("beforeRemove", bafn1);
    navigation.dispatch(StackActions.popToTop());
  };

  useEffect(() => {
    navigation.addListener("beforeRemove", bafn1);
  }, []);
  return (
    <>
      <Header
        containerStyle={{
          elevation: 5,
          shadowOffset: { width: -2, height: 4 },
          shadowColor: "#000",
          shadowOpacity: 0.2,
          shadowRadius: 3,
        }}
        backgroundColor="#fff"
        centerComponent={{
          text: "Result",
          style: styles.heading,
        }}
      />

      <ScrollView
        style={{
          backgroundColor: "white",
          flexGrow: 1,

          //   justifyContent: "center",
        }}
        contentContainerStyle={{
          display: "flex",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        {score > 75 && (
          <>
            <Passed />
            <Text
              h2
              style={{
                marginVertical: 25,
                color:'#29337A'
              }}
            >
              Congratulations
            </Text>
          </>
        )}
        {score < 75 && (
          <>
          <Failed />
          <Text
            h2
            style={{
              marginVertical: 25,
              color:'#29337A',
              maxWidth: "80%",
            }}
            numberOfLines={1}
            adjustsFontSizeToFit
          >
            Try Again
          </Text>
          </>
        )}
        {/* <SvgComponent
          percent={score}
          style={{
            marginVertical: 25,
          }}
        /> */}
        {/* <AnimatedCircularProgress
          size={220}
          width={10}
          fill={score}
          tintColor={score > 75 ? "#318CE7" : "red"}
          style={{
            marginVertical: 25,
          }}
          rotation={0}
          backgroundColor="#f5f5f5"
        >
          {(fill) => (
            <Text
              style={{
                fontSize: 24,
                color: score > 75 ? "#318CE7" : "red",
                position: "absolute",
                fontWeight: "400",
              }}
            >
              {`${score}%`}
            </Text>
          )}
        </AnimatedCircularProgress> */}
        <View
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Card containerStyle={styles.leftcont}>
            <Card.Title>Correct</Card.Title>
            <Text style={styles.retext}>{Right}</Text>
          </Card>
          <Card containerStyle={styles.rightcont}>
            <Card.Title>Incorrect</Card.Title>
            <Text style={styles.retext}>{QuestionsLength - Right}</Text>
          </Card>
        </View>
        <Button
          containerStyle={{
            marginVertical: 25,
          }}
          color={'#29337A'}
          onPress={() => {
            // navigation.removeListener("beforeRemove", bafn1);
            navigation.navigate("ReEx", {
              Qdata,
              Answers,
              lang,
            });
          }}
        >
          Review
        </Button>
        <Button
          containerStyle={{
            marginVertical: 25,
            width: "95%",
            // backgroundColor: '#29337A'
          }}
          color={'#29337A'}
          onPress={() => {
            navigation.removeListener("beforeRemove", bafn1);
            navigation.dispatch(StackActions.popToTop());
          }}
        >
          <Text style={{
            fontSize: 24,
            color: '#fff',
            borderRadius: 10,
          }}>Back to home</Text>
        </Button>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  // heading: {
  //   color: "#318CE7",
  //   fontSize: 42,

  //   fontWeight: "bold",
  // },
  heading: {
    color: "#000000",
    fontSize:26,
    // marginLeft: 5,
    // flex: 1,
    fontWeight: "600",
    // marginRight: 'auto'
  },
  rightcont: {
    marginLeft: 0,
    borderWidth: 0,
  },
  leftcont: {
    borderWidth: 0,
    marginRight: 0,
  },
  retext: {
    textAlign: "center",
  },
});
export default ExResults;
