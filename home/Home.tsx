import React, { useCallback, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Button, Header, Card } from "@rneui/themed";
import * as fs from "expo-file-system";

import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  Platform,
  Image,
  View,
} from "react-native";

import * as SplashScreen from "expo-splash-screen";
import SvgComponent from "./SvgComp";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useQuery, useQueryClient } from "react-query";
import TouchableScale from "react-native-touchable-scale";

const updreset = async (updid: any, setPercent: any) => {
  let { exists } = await fs.getInfoAsync(fs.documentDirectory + "updid.txt");
  console.log(updid);
  if (exists) {
    let savedid = await fs.readAsStringAsync(
      fs.documentDirectory + "updid.txt"
    );
    console.log(savedid);
    if (savedid != updid) {
      await fs.writeAsStringAsync(fs.documentDirectory + "updid.txt", updid);
      await fs.deleteAsync(fs.documentDirectory + "ExCompleted.txt");
      await fs.deleteAsync(fs.documentDirectory + "ExLength.txt");
      setPercent(0);
    }
  } else {
    await fs.writeAsStringAsync(fs.documentDirectory + "updid.txt", updid);
  }
};

const getpercent = async (setPercent: any) => {
  let { exists } = await fs.getInfoAsync(
    fs.documentDirectory + "ExCompleted.txt"
  );

  if (exists) {
    let jsonstr = await fs.readAsStringAsync(
      fs.documentDirectory + "ExCompleted.txt"
    );
    let exn = JSON.parse(jsonstr);

    let Exlength: any = await fs.readAsStringAsync(
      fs.documentDirectory + "ExLength.txt"
    );
    if (Exlength != 0) {
      setPercent(Math.floor((exn.length / (Exlength * 1)) * 100));
    } else {
      setPercent(0);
    }
  } else {
    setPercent(0);
  }
};

function Home() {
  let navigation: any = useNavigation();
  let client = useQueryClient();
  let [percent, setPercent] = useState(0);
  const { isLoading, error, data }: any = useQuery("QuestionData", async () => {
    let res = await fetch("http://192.168.1.107:3000/api/app/getallquestions");
    // if (res.status == 500) {
    //   throw new Error("Database Not online");
    // }

    let ares = await res.json();
    if (ares.status == "Failed") {
      throw new Error("Could not connect to the database");
    }
    return ares;
  });

  const onLayoutRootView = async () => {
    await SplashScreen.hideAsync();
  };

  useFocusEffect(
    React.useCallback(() => {
      getpercent(setPercent);
      client.invalidateQueries("QuestionData");
    }, [])
  );

  let pdata: any[] = [];
  let updid = "";
  if (!isLoading && !error) {
    pdata = data.data;
    updid = data.updid.value;
  }
  useEffect(() => {
    if (!isLoading && !error) {
      updreset(updid, setPercent);
    }
  }, [isLoading, pdata]);
  return (
    <View style={styles.cont} onLayout={onLayoutRootView}>
      <Header
        containerStyle={{
          elevation: 5,
        }}
        backgroundColor="#fff"
        leftComponent={{
          text: "LIUT",

          style: styles.heading,
        }}
      />
      <StatusBar style="auto" backgroundColor="#fff" />
      {isLoading && (
        <>
          <ActivityIndicator
            style={{
              flexGrow: 1,
            }}
            size={Platform.OS == "android" ? 65 : "large"}
            color="#318CE7"
          />
        </>
      )}
      {error && (
        <View style={styles.errview}>
          <Text style={styles.errtext}>Cannnot connect to server</Text>
          <Text style={styles.errtext}>
            Please check your internet connection
          </Text>
          <Button
            containerStyle={styles.ProgressText}
            buttonStyle={styles.errbtn}
            title="Retry"
            type="outline"
            size="md"
            onPress={() => {
              client.invalidateQueries("QuestionData");
            }}
          />
        </View>
      )}
      {!isLoading && !error && (
        <>
          <Text style={styles.ProgressText}>Total Progress</Text>
          <SvgComponent percent={percent} />
          <View style={styles.cardcontainer}>
            {/* <Pressable
              onPress={() => {
                navigation.navigate("Exams");
              }}
            > */}
            <TouchableScale
              friction={90}
              tension={100}
              activeScale={0.95}
              onPress={() => {
                navigation.navigate("Exams");
              }}
            >
              <Card containerStyle={styles.card}>
                <Card.Title>Exam</Card.Title>
                <Card.Divider />
                <Text style={{ textAlign: "center" }}>
                  Start an Exam with ordered questions and limited time
                </Text>
              </Card>
            </TouchableScale>

            <TouchableScale
              friction={90}
              tension={100}
              activeScale={0.95}
              onPress={() => {
                let Qdata = pdata;
                Qdata.sort((a: any, b: any) => {
                  let min = -1;
                  let max = 1;
                  return Math.floor(Math.random() * (max - min) + min);
                });
                navigation.navigate("Practice Exam", Qdata);
              }}
            >
              <Card containerStyle={styles.card}>
                <Card.Title>Practice Exam</Card.Title>
                <Card.Divider />
                <Text style={{ textAlign: "center" }}>
                  Start an exam with random questions and unlimited time
                </Text>
              </Card>
            </TouchableScale>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    color: "#318CE7",
    fontSize: 42,
    width: "200%",
    fontWeight: "bold",
  },
  ProgressText: {
    fontSize: 20,
    marginVertical: 10,
  },
  cont: {
    display: "flex",
    flex: 1,
    backgroundColor: "#fff",
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
    elevation: 5,
  },
  errview: {
    display: "flex",
    flexGrow: 1,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  errtext: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 5,
  },
  errbtn: {
    paddingHorizontal: 25,
  },
});

export default Home;
