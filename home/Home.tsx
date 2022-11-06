import React, { Component, useCallback, useEffect, useState } from "react";
import { setStatusBarStyle, StatusBar } from "expo-status-bar";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { Button, Header, Card, ListItem, Icon } from "@rneui/themed";
import * as fs from "expo-file-system";

// import mobileAds from "react-native-google-mobile-ads";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  Platform,
  View,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";

import * as SplashScreen from "expo-splash-screen";
import SvgComponent from "./SvgComp";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useQuery, useQueryClient } from "react-query";
import TouchableScale from "react-native-touchable-scale";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from "react-native-popup-menu";

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

const getlang = async (setLang: any, client: any) => {
  let { exists } = await fs.getInfoAsync(fs.documentDirectory + "lang.txt");

  if (exists) {
    let lang = await fs.readAsStringAsync(fs.documentDirectory + "lang.txt");

    setLang(lang);
  } else {
    await fs.writeAsStringAsync(fs.documentDirectory + "lang.txt", "en");
    setLang("en");
  }
};

const settrlang = async (setLang: any, lang: any) => {
  await fs.writeAsStringAsync(fs.documentDirectory + "lang.txt", lang);
  setLang(lang);
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
  let [lang, setLang] = useState("");
  let [chlang, setchlang] = useState(false);

  const { isLoading, error, data }: any = useQuery(
    lang && "QuestionData",
    async () => {
      let res = await fetch(
        `http://138.68.162.34:3000/api/app/getallquestions`
      );
      // if (res.status == 500) {
      //   throw new Error("Database Not online");
      // }

      let ares = await res.json();
      if (ares.status == "Failed") {
        throw new Error("Could not connect to the database");
      }
      return ares;
    }
  );

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

    if (data.updid) {
      updid = data.updid.value;
    }
  }
  useEffect(() => {
    if (!isLoading && !error && updid) {
      updreset(updid, setPercent);
    }
    if (!lang) {
      getlang(setLang, client);
    }
    // mobileAds()
    //   .initialize()
    //   .then((adapterStatuses) => {
    //     console.log("Initialization complete!");
    //   });
  }, [isLoading, pdata]);
  return (
    <View style={styles.cont}>
      <Header
        containerStyle={{
          elevation: 5,
          shadowOffset: { width: -2, height: 4 },
          shadowColor: "#000",

          alignItems: "center",
          justifyContent: "center",
          shadowOpacity: 0.2,
          shadowRadius: 3,
        }}
        backgroundColor="#fff"
        leftComponent={{
          text: "LIUT",

          style: styles.heading,
        }}
        // leftContainerStyle={{
        //   display: "flex",
        //   justifyContent: "center",
        // }}
        rightComponent={
          <>
            <Menu onSelect={(value) => settrlang(setLang, value)}>
              <MenuTrigger
                customStyles={{
                  TriggerTouchableComponent: TouchableOpacity,
                }}
              >
                <Icon
                  name="language"
                  size={38}
                  type="material"
                  color="#318CE7"
                />
              </MenuTrigger>
              <MenuOptions
                optionsContainerStyle={{
                  marginTop: "13%",

                  display: "flex",
                }}
              >
                <MenuOption
                  value={"en"}
                  style={{
                    flexGrow: 1,
                  }}
                >
                  <ListItem bottomDivider>
                    <ListItem.Title>
                      <Text
                        style={{ color: lang == "en" ? "#318CE7" : "#000000" }}
                      >
                        No Translation
                      </Text>
                    </ListItem.Title>
                  </ListItem>
                </MenuOption>
                <MenuOption
                  value={"hi"}
                  style={{
                    flexGrow: 1,
                  }}
                >
                  <ListItem bottomDivider>
                    <ListItem.Title>
                      <Text
                        style={{ color: lang == "hi" ? "#318CE7" : "#000000" }}
                      >
                        Hindi
                      </Text>
                    </ListItem.Title>
                  </ListItem>
                </MenuOption>
                <MenuOption
                  value={"ur"}
                  style={{
                    flexGrow: 1,
                  }}
                >
                  <ListItem bottomDivider>
                    <ListItem.Title>
                      <Text
                        style={{ color: lang == "ur" ? "#318CE7" : "#000000" }}
                      >
                        Urdu
                      </Text>
                    </ListItem.Title>
                  </ListItem>
                </MenuOption>
                <MenuOption
                  value={"bn"}
                  style={{
                    flexGrow: 1,
                  }}
                >
                  <ListItem>
                    <ListItem.Title>
                      <Text
                        style={{ color: lang == "bn" ? "#318CE7" : "#000000" }}
                      >
                        Bangla
                      </Text>
                    </ListItem.Title>
                  </ListItem>
                </MenuOption>
              </MenuOptions>
            </Menu>
          </>
        }
        rightContainerStyle={{
          display: "flex",
          justifyContent: "center",
          marginTop: 5,
        }}
      />
      <StatusBar style="dark" backgroundColor="#fff" />

      {(isLoading || !lang) && (
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
      {!isLoading && !error && lang && (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={styles.ProgressText}>Total Progress</Text>
          {/* <SvgComponent percent={percent} /> */}
          <AnimatedCircularProgress
            size={220}
            width={10}
            fill={percent}
            tintColor="#318CE7"
            // onAnimationComplete={() => console.log("onAnimationComplete")}
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
                {`${percent}%`}
              </Text>
            )}
          </AnimatedCircularProgress>
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
                navigation.navigate("Exams", lang);
              }}
            >
              <Card containerStyle={styles.card}>
                <Card.Title>Practice Exam</Card.Title>
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
                navigation.navigate("Practice Exam", { Qdata, lang });
              }}
            >
              <Card containerStyle={styles.card}>
                <Card.Title>Exam</Card.Title>
                <Card.Divider />
                <Text style={{ textAlign: "center" }}>
                  Start an exam with random questions and unlimited time
                </Text>
              </Card>
            </TouchableScale>
          </View>
        </ScrollView>
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
    shadowOffset: { width: -2, height: 4 },
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 3,
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
