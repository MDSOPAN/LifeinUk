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
import { LinearProgress } from "@rneui/base";
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
          text: score > 75 ? "Congratulations":"Try Again",
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
          // height: '100%',
          // minHeight: '80%',
          // justifyContent:'space-between',
          alignItems: "center",
        }}
      > 
        
        {score > 75 && (
          <>
            <Passed />
            <Text
              h3
              style={{
                marginVertical: 25,
                color:'#000',
                maxWidth: "80%",
              }}
              numberOfLines={1}
              adjustsFontSizeToFit
            >
              Result: Passed
            </Text>
          </>
        )}
        {score < 75 && (
          <>
          
          <Text
            h3
            style={{
              marginVertical: 25,
              color:'#000',
              maxWidth: "80%",
            }}
            numberOfLines={1}
            adjustsFontSizeToFit
          >
            Result: Failed
          </Text>
          </>
        )}
        
        <View style={{
            backgroundColor: "#fff",
            elevation: 5,
            marginTop: 25,
            width: "90%",
            marginVertical:20,
            padding:10,
            borderRadius: 10,
          }}>
            <View style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
              <Text style={styles.ProgressText}>Result</Text>
              <Text style={{
                color: '#bbbbbb',
                fontSize: 20,
                
              }}>{score}%</Text>
            </View>
            <LinearProgress style={{ marginVertical: 15,width: "100%",height: 20,borderRadius: 25 }}
              // value={percent/100}
              value={score/100}
              color="#133279"
              trackColor="#F6F6F6"
              variant="determinate"/>
              
          </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            marginVertical: 25
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
            marginVertical: 5,
            marginTop: 30,
            borderRadius: 8,
            width:'95%'
          }}
          color={'#133279'}
          onPress={() => {
            // navigation.removeListener("beforeRemove", bafn1);
            navigation.navigate("ReEx", {
              Qdata,
              Answers,
              lang,
            });
          }}
        >
          <Text style={{
            fontSize: 20,
            color: '#fff',
            // borderRadius: 10,
          }}>Review</Text>
        </Button>
        <Button
          containerStyle={{
            marginVertical: 5,
            width: "95%",
            borderRadius: 8,

            // backgroundColor: '#29337A'
          }}
          color={'#133279'}
          onPress={() => {
            navigation.removeListener("beforeRemove", bafn1);
            navigation.dispatch(StackActions.popToTop());
          }}
        >
          <Text style={{
            fontSize: 20,
            color: '#fff',
            // borderRadius: 10,
          }}>Back to home</Text>
        </Button>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  // heading: {
  //   color: "#29337A",
  //   fontSize: 42,

  //   fontWeight: "bold",
  // },
  heading: {
    color: "#133279",
    fontSize:34,
    // marginLeft: 5,
    // flex: 1,
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
  rightcont: {
    marginLeft: 0,
    borderLeftWidth: 1,
    borderWidth: 0,
    elevation: 0,
    borderColor: "#bbb",

  },
  leftcont: {
    borderWidth: 0,
    elevation: 0,
    marginRight: 0,
  },
  retext: {
    textAlign: "center",
  },
});
export default ExResults;
