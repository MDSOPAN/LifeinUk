import { useNavigation, useRoute } from "@react-navigation/native";
import * as fs from "expo-file-system";
import { StatusBar } from "expo-status-bar";
import { Button, Header, Icon, ListItem, Text as Tx } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Platform,
  ScrollView,
} from "react-native";
import TouchableScale from "react-native-touchable-scale";
import { useQuery, useQueryClient } from "react-query";
// import { storage } from "../App";

const updreset = async (updid: any, setCompleted: any) => {
  let { exists } = await fs.getInfoAsync(fs.documentDirectory + "updid.txt");
  console.log(updid);
  if (exists) {
    let savedid = await fs.readAsStringAsync(
      fs.documentDirectory + "updid.txt"
    );

    if (savedid != updid) {
      await fs.writeAsStringAsync(fs.documentDirectory + "updid.txt", updid);
      await fs.deleteAsync(fs.documentDirectory + "ExCompleted.txt");
      await fs.deleteAsync(fs.documentDirectory + "ExLength.txt");
      setCompleted(new Set());
    }
  } else {
    await fs.writeAsStringAsync(fs.documentDirectory + "updid.txt", updid);
  }
};

const saveexamlenth = async (elen: number) => {
  await fs.writeAsStringAsync(
    fs.documentDirectory + "ExLength.txt",
    elen.toString()
  );
};

const getcompleted = async (setCompleted: any) => {
  let { exists } = await fs.getInfoAsync(
    fs.documentDirectory + "ExCompleted.txt"
  );

  if (exists) {
    let jsonstr = await fs.readAsStringAsync(
      fs.documentDirectory + "ExCompleted.txt"
    );
    console.log("JSON", jsonstr);
    let exno = JSON.parse(jsonstr);

    setCompleted(exno);
  } else {
    setCompleted(new Object());
  }
};

function Examshome() {
  let client = useQueryClient();
  let navigation: any = useNavigation();
  let route = useRoute();
  let lang = route.params;
  let [completed, setCompleted]: any = useState(new Object());
  useEffect(() => {
    getcompleted(setCompleted);
  }, []);
  const { isLoading, error, data }: any = useQuery("Exams", async () => {
    let res = await fetch("http://138.68.162.34:3000/api/app/getexams");
    // if (res.status == 500) {
    //   throw new Error("Database Not online");
    // }

    let ares = await res.json();
    if (ares.status == "Failed") {
      throw new Error("Could not connect to the database");
    }
    return ares;
  });
  let edata: any[] = [];
  let updid = "";
  if (!isLoading && !error) {
    edata = data.data;
  }
  useEffect(() => {
    if (!isLoading && !error) {
      if (data.updid) {
        updid = data.updid.value;
        updreset(updid, setCompleted);
      }
      saveexamlenth(edata.length * 1);
    }
  }, [isLoading, edata]);
  return (
    <>
      <ScrollView
        style={{
          backgroundColor: "#fff",
          flexGrow: 1,
        }}
      >
        <StatusBar style="dark" backgroundColor="#fff" />
        <Header
          leftContainerStyle={{
            alignSelf: "center",
          }}
          containerStyle={{
            borderBottomColor: "#fff",
          }}
          backgroundColor="#fff"
          centerComponent={{
            text: "Mock Tests",
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
        />
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
        {!isLoading && !error && edata.length != 0 && (
          <View
            style={{
              flexGrow: 1,
              margin: 9,
            }}
          >
            {edata.map((el, ind) => {
              if (!el.questions.length) {
                return;
              }
              return (
                <TouchableScale
                  key={ind}
                  friction={90}
                  tension={100}
                  style={{
                    margin: 5,
                  }}
                  activeScale={0.95}
                  onPress={() => {
                    navigation.navigate("ExQuestoins", {
                      Questions: el.questions,

                      Time: el.time,
                      lang: lang,
                    });
                  }}
                >
                  <ListItem
                    key={ind}
                    bottomDivider
                    containerStyle={[
                      styles.Ex,
                      completed.hasOwnProperty(ind + 1) &&
                        completed[ind + 1] == "pass" &&
                        styles.PassedEx,
                      completed.hasOwnProperty(ind + 1) &&
                        completed[ind + 1] == "fail" &&
                        styles.FailedEx,
                    ]}
                  >
                    <ListItem.Content>
                      <ListItem.Title
                        style={[
                          styles.title,
                          completed.hasOwnProperty(ind + 1) &&
                            completed[ind + 1] == "pass" &&
                            styles.titleright,
                          completed.hasOwnProperty(ind + 1) &&
                            completed[ind + 1] == "fail" &&
                            styles.titlewrong,
                        ]}
                      >{`Test ${ind + 1}`}</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron
                      color={
                        completed && completed.hasOwnProperty(ind + 1)
                          ? completed[ind + 1] == "pass"
                            ? "green"
                            : "red"
                          : "#000"
                      }
                      size={40}
                    />
                  </ListItem>
                </TouchableScale>
              );
            })}
          </View>
        )}
      </ScrollView>
      {edata.length == 0 && !isLoading && !error && (
        <View
          style={{
            flexGrow: 1,

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
    </>
  );
}
const styles = StyleSheet.create({
  heading: {
    color: "#318CE7",
    fontSize: 30,
    fontWeight: "bold",
  },
  ProgressText: {
    fontSize: 20,
    marginVertical: 10,
  },
  Ex: {
    marginTop: 10,
    borderTopWidth: 1,
    backgroundColor: "#fff",
    elevation: 5,
    shadowOffset: { width: -2, height: 4 },
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 3,
    height: 100,
    borderRadius: 10,
  },
  PassedEx: {
    elevation: 0,
    backgroundColor: "rgba(29, 200, 0, 0.5)",
  },
  FailedEx: {
    elevation: 0,
    backgroundColor: "rgba(245,0,0, 0.25)",
  },
  title: {
    fontSize: 25,
    color: "black",
  },

  titleright: {
    color: "green",
  },
  titlewrong: {
    color: "red",
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

export default Examshome;
