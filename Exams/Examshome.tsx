import { useNavigation } from "@react-navigation/native";
import * as fs from "expo-file-system";

import { Button, Header, ListItem } from "@rneui/themed";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Platform,
} from "react-native";
import TouchableScale from "react-native-touchable-scale";
import { useQuery, useQueryClient } from "react-query";
// import { storage } from "../App";

const saveexamlenth = async (elen: number) => {
  await fs.writeAsStringAsync(
    fs.documentDirectory + "ExLength.txt",
    elen.toString()
  );
};

function Examshome() {
  let client = useQueryClient();
  let navigation: any = useNavigation();
  const { isLoading, error, data }: any = useQuery("Exams", async () => {
    let res = await fetch("http://192.168.1.107:3000/api/app/getexams");
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
  if (!isLoading && !error) {
    edata = data.data;
    saveexamlenth(edata.length * 1);
    // storage.set("ExLength", edata.length);
  }
  return (
    <>
      <Header
        backgroundColor="#fff"
        centerComponent={{
          text: "Exams",
          style: styles.heading,
        }}
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
      {!isLoading && !error && (
        <View>
          {edata.map((el, ind) => {
            return (
              <TouchableScale
                key={ind}
                friction={90}
                tension={100}
                activeScale={0.95}
                onPress={() => {
                  navigation.navigate("ExQuestoins", {
                    Questions: el.questions,
                    Time: el.time,
                  });
                }}
              >
                <ListItem
                  key={ind}
                  bottomDivider
                  containerStyle={{
                    marginTop: 10,
                    borderTopWidth: 1,
                    elevation: 5,
                    height: 125,
                    borderRadius: 10,
                  }}
                >
                  <ListItem.Content>
                    <ListItem.Title
                      style={{
                        fontSize: 25,
                      }}
                    >{`Exam ${ind + 1}`}</ListItem.Title>
                  </ListItem.Content>
                  <ListItem.Chevron color="black" size={40} />
                </ListItem>
              </TouchableScale>
            );
          })}
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
