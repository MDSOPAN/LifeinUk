import React, { Component, useCallback, useEffect, useState } from "react";
import { setStatusBarStyle, StatusBar } from "expo-status-bar";
// import { AnimatedCircularProgress } from "react-native-circular-progress";
import { Button, Header, Card, ListItem, Icon, Text } from "@rneui/themed";
import * as fs from "expo-file-system";
import InAppReview from "react-native-in-app-review";
// @ts-ignore
import LIUT from '../assets/LIUT.svg'
// @ts-ignore
import Mock from '../assets/Mock.svg'
// @ts-ignore
import Practice from '../assets/Practice.svg'

import mobileAds from "react-native-google-mobile-ads";
import {
  ActivityIndicator,
  StyleSheet,
  Platform,
  View,
  TouchableOpacity,
  ScrollView,
  Modal,
  Image,
  Dimensions,
  TouchableWithoutFeedback
} from "react-native";

import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useQuery, useQueryClient } from "react-query";
import TouchableScale from "react-native-touchable-scale";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from "react-native-popup-menu";
import { app_url } from "../universal/app_constants";
import { Avatar, LinearProgress } from "@rneui/base";
import { SafeAreaView } from "react-native-safe-area-context";

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

const getlang = async (setLang: any) => {
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
    let exn: Object = JSON.parse(jsonstr);

    let Exlength: any = await fs.readAsStringAsync(
      fs.documentDirectory + "ExLength.txt"
    );
    if (Exlength != 0) {
      let vals = Object.values(exn);
      let len = 0;
      vals.forEach((el) => {
        if (el == "pass") {
          len = len + 1;
        }
      });
      setPercent(Math.floor((len / (Exlength * 1)) * 100));
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
      // live
      // let res = await fetch(
      //   `http://138.68.162.34:3000/api/app/getallquestions`
      // );

      //TODO:Test
      let res = await fetch(
        `http://${app_url}:3000/api/app/getallquestions`
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
      getlang(setLang)
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
      getlang(setLang);
    }
    mobileAds()
      .initialize()
      .then((adapterStatuses) => {
        console.log("Initialization complete!");
      });
  }, [isLoading, pdata]);
  return (
    <SafeAreaView style={styles.cont}>
      
      <StatusBar style="dark" backgroundColor="#133279" />
      <View style={{
          
          padding: 10,
          backgroundColor:"#133279",
          paddingBottom: "40%",
          position: "relative"
          // height: 200
        }}>
          <View style={{
            display:'flex',
            flexDirection: 'row',
            alignItems: 'center',
            alignContent: 'center',
            justifyContent:'center',
            
          }}>
            <Icon
              type="fontawesome"
              name="chevron-left"
              color="#000000"
              size={36}
              Component={TouchableScale}
              style={{
                alignSelf: "center",
              }}
              onPress={() => {
                navigation.pop();
              }}
            />
            <Text style={styles.heading}>
              LIUT
            </Text>
            
              <Icon
                size={30}
                color={'#fff'}
                name='globe'
                containerStyle={{
                  marginRight:7,
                }}
                type='feather'
                Component={TouchableWithoutFeedback}
                onPress={()=>{
                  navigation.navigate('settings',lang);
                }}
              />
              <Icon
                size={30}
                color={'#fff'}
                name='settings'
                type='material'
                Component={TouchableWithoutFeedback}
                onPress={()=>{
                  navigation.navigate('settings',lang);
                }}
              />
          </View>
          <View style={{
            backgroundColor: "#fff",
            elevation: 5,
            // width: "90%",
            padding:10,
            borderRadius: 10,
            position: 'absolute',
            bottom: "-100%",
            left: 15,
            right: 15,
            // zIndex: 100,

          }}>
            <View style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              
            }}>
              <Text style={styles.ProgressText}>Total Progress</Text>
              <Text style={{
                color: '#bbbbbb',
                fontSize: 20,
                
              }}>{percent}%</Text>
            </View>
            <LinearProgress style={{ marginVertical: 15,width: "100%",height: 20,borderRadius: 25 }}
              // value={percent/100}
              value={0.5}
              color="#133279"
              trackColor="#F6F6F6"
              variant="determinate"/>
              
          </View>
      </View>
      {(isLoading || !lang) && (
        <>
          <ActivityIndicator
            style={{
              flexGrow: 1,
            }}
            size={Platform.OS == "android" ? 65 : "large"}
            color="#29337A"
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

          //TODO:FIx this
            // containerStyle={styles.ProgressText}
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
            alignSelf:"stretch",
            width: "100%",
            // flex: 1
          }}
        >
          
          
         
          
          
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
              {/* <Card containerStyle={styles.card}>
                <Card.Title>Mock Test</Card.Title>
                <Card.Divider />
                <Text style={{ textAlign: "center" }}>
                  Start an exam with random questions and time limit
                </Text>
              </Card> */}
              <View
              style={[styles.testbutton,{
                marginTop: "15%"
              }]}>
                {/* <Image
                  source={require('../assets/Mock.png')}
                /> */}
                <View style={{
                  width: Dimensions.get('window').width *0.2,
                  height: Dimensions.get('window').width *0.2,
                  borderRadius: Dimensions.get('window').width *0.2/2,
                  display: 'flex',
                  alignContent: 'center',
                  justifyContent: 'center',
                  alignItems:'center',
                  backgroundColor: "#fff"
                }}>

                  <Mock />
                </View>
                <View>
                  <Text style={{
                    fontWeight: "bold",
                    fontSize: 20,
                    color:'#FFF',
                    marginLeft: 10
                  }} adjustsFontSizeToFit>Mock Tests</Text>
                  <Text style={{
                    // fontWeight: "bold",
                    fontSize: 13,
                    color:'#FFF',
                    marginLeft: 10,
                    width: "70%"
                  }} adjustsFontSizeToFit>Start an exam with ordered questions and limited time</Text>
                </View>
              </View>
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
              {/* <Card containerStyle={styles.card}>
                <Card.Title>Practice</Card.Title>
                <Card.Divider />
                <Text style={{ textAlign: "center" }}>
                  Start practice with ordered questions and unlimited time
                </Text>
              </Card> */}
              <View
              style={styles.testbutton}>
                {/* <Image
                  source={require('../assets/Practice.png')}
                /> */}
                <View style={{
                  width: Dimensions.get('window').width *0.2,
                  height: Dimensions.get('window').width *0.2,
                  borderRadius: Dimensions.get('window').width *0.2/2,
                  display: 'flex',
                  alignContent: 'center',
                  justifyContent: 'center',
                  alignItems:'center',
                  backgroundColor: "#fff"
                }}>

                  <Practice/>
                </View>
                
                <View>
                  <Text style={{
                    fontWeight: "bold",
                    fontSize: 20,
                    color:'#FFF',
                    marginLeft: 10
                  }} adjustsFontSizeToFit>Practice Tests</Text>
                  <Text style={{
                    // fontWeight: "bold",
                    fontSize: 13,
                    color:'#FFF',
                    marginLeft: 10,
                    width: "70%"
                  }} adjustsFontSizeToFit>Start an exam with random questions and unlimited time</Text>
                </View>
              </View>
            </TouchableScale>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  heading: {
    color: "#fff",
    fontSize:22,
    marginLeft: 5,
    flex: 1,
    fontWeight: "600",
    // marginRight: 'auto'
  },
  ProgressText: {
    fontSize: 20,
    fontWeight: '200',
    color: '#828282'
    // marginVertical: 10,
    // marginTop: 40,
  },
  cont: {
    display: "flex",
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
  },
  cardcontainer: {
    display: "flex",
    // backgroundColor: "red",
    width: "100%",
    justifyContent: "center",
    // alignSelf: "stretch",
    // flex: 1,
    marginVertical: 10,
  },
  // card: {
  //   alignSelf: "stretch",
  //   display: "flex",
  //   elevation: 5,
  //   shadowOffset: { width: -2, height: 4 },
  //   shadowColor: "#000",
  //   shadowOpacity: 0.2,
  //   shadowRadius: 3,
  // },
  testbutton: {
    display:"flex",
    flexDirection:"row",
    alignContent:"center",
    alignItems:'center',
    justifyContent:'flex-start',
    backgroundColor:"#133279",
    borderRadius: 10,
    // alignSelf: "stretch",
    // flex: 1,
    // width: width,
    margin: 10,
    padding: 10,
    paddingHorizontal: 25,
    paddingVertical: 25,
    marginVertical: 5,
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
