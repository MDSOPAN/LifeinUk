import {
  useNavigation,
  StackActions,
  useRoute,
} from "@react-navigation/native";
import SvgComponent from "../home/SvgComp";
import { Header, Text, Button, Card } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
function ExResults() {
  let navigation = useNavigation();
  let route = useRoute();
  let { QuestionsLength, Right }: any = route.params;

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

      <View
        style={{
          backgroundColor: "white",
          flexGrow: 1,
          display: "flex",
          alignContent: "center",
          alignItems: "center",
          //   justifyContent: "center",
        }}
      >
        <Text
          h2
          style={{
            marginVertical: 25,
          }}
        >
          Well Done!
        </Text>
        {/* <SvgComponent
          percent={score}
          style={{
            marginVertical: 25,
          }}
        /> */}
        <AnimatedCircularProgress
          size={220}
          width={10}
          fill={score}
          tintColor="#318CE7"
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
                color: "#318CE7",
                position: "absolute",
                fontWeight: "400",
              }}
            >
              {`${score}%`}
            </Text>
          )}
        </AnimatedCircularProgress>
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
          onPress={() => {
            navigation.removeListener("beforeRemove", bafn1);
            navigation.dispatch(StackActions.popToTop());
          }}
        >
          Back to home
        </Button>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  heading: {
    color: "#318CE7",
    fontSize: 42,

    fontWeight: "bold",
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
