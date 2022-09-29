import {
  useNavigation,
  StackActions,
  useRoute,
} from "@react-navigation/native";
import SvgComponent from "../home/SvgComp";
import { Header, Text, Button, Card } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
function ExResults() {
  let navigation = useNavigation();
  let route = useRoute();
  let { QuestionsLength, Right }: any = route.params;

  let score = Math.floor((Right / QuestionsLength) * 100);

  let bafn = (e: any) => {
    e.preventDefault();
    navigation.removeListener("beforeRemove", bafn);
    navigation.dispatch(StackActions.popToTop());
  };

  useEffect(() => {
    navigation.addListener("beforeRemove", bafn);
  }, []);
  return (
    <>
      <Header
        containerStyle={{
          elevation: 5,
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
        <SvgComponent
          percent={score}
          style={{
            marginVertical: 25,
          }}
        />
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
            navigation.removeListener("beforeRemove", bafn);
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
