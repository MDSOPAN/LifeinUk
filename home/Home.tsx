import React, { useCallback, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Header } from "@rneui/themed";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Card } from "@rneui/themed";
import * as SplashScreen from "expo-splash-screen";
import SvgComponent from "./SvgComp";
import { useNavigation } from "@react-navigation/native";
import { useQuery, useQueryClient } from "react-query";

function Home() {
  let navigation: any = useNavigation();

  const { isLoading, error, data }: any = useQuery("QuestionData", async () => {
    let res = await fetch("http://192.168.1.106:3000/api/getallquestions");
    // if (res.status == 500) {
    //   throw new Error("Database Not online");
    // }
    res = await res.json();

    return res;
  });

  // console.log(isLoading);

  let pdata: any[] = [];
  const onLayoutRootView = async () => {
    await SplashScreen.hideAsync();
  };

  if (!isLoading) {
    pdata = data.data;
  }

  return (
    <View style={styles.cont} onLayout={onLayoutRootView}>
      <Header
        backgroundColor="#318CE7"
        leftComponent={{
          text: "LIUT",
          style: styles.heading,
        }}
      />
      <StatusBar style="light" backgroundColor="#318CE7" />
      <Text style={styles.ProgressText}>Total Progress</Text>
      <SvgComponent />
      <View style={styles.cardcontainer}>
        <Pressable
          onPress={() => {
            let Qdata = pdata;
            Qdata.sort((a: any, b: any) => {
              let min = -1;
              let max = 1;
              return Math.floor(Math.random() * (max - min) + min);
            });
            navigation.navigate("Practice Quiz", Qdata);
          }}
          style={({ pressed }) => [
            {
              opacity: pressed ? 0.5 : 1,
            },
          ]}
        >
          <Card containerStyle={styles.card}>
            <Card.Title>Practice Tests</Card.Title>
            <Card.Divider />
            <Text style={{ alignSelf: "center" }}>Completed 57 out of 100</Text>
          </Card>
        </Pressable>
        <Pressable>
          <Card containerStyle={styles.card}>
            <Card.Title>Mock Tests</Card.Title>
            <Card.Divider />
            <Text style={{ alignSelf: "center" }}>Start a Mock Exam</Text>
          </Card>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
  },
  ProgressText: {
    fontSize: 20,
    marginVertical: 10,
  },
  cont: {
    display: "flex",
    flex: 1,
    alignItems: "center",
  },
  cardcontainer: {
    display: "flex",
    justifyContent: "center",
    alignSelf: "stretch",
    marginVertical: 10,
  },

  card: {
    alignSelf: "stretch",
    display: "flex",
  },
});
export default Home;
