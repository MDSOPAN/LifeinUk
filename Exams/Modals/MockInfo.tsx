import React from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  StatusBar as st,
  Pressable,
} from "react-native";
//@ts-ignore
import Mock from "../../assets/mockinfo.svg";
import { Icon } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";
// import { StatusBar } from "expo-status-bar";

function MockInfo() {
  let navigation: any = useNavigation();

  return (
    <View
      style={{
        minHeight: "100%",
        display: "flex",
        backgroundColor: "#40404040",
      }}
    >
      {/* <StatusBar style="light" backgroundColor="#40404040" /> */}
      <Pressable
        style={{
          flexGrow: 1,
        }}
        onPress={() => {
          navigation.pop();
        }}
      ></Pressable>
      <View
        style={{
          backgroundColor: "white",
          marginTop: "auto",
          margin: 0,
          height: "50%",
          padding: 10,
          borderTopStartRadius: 25,
          borderTopEndRadius: 25,
        }}
      >
        <Icon
          type="material"
          name="close"
          color="rgba(0,0,0,0.5)"
          size={26}
          style={{
            marginLeft: "auto",
            marginBottom: "auto",
            marginTop: 10,
          }}
          onPress={() => {
            navigation.pop();
          }}
        />
        <ScrollView
          contentContainerStyle={{
            display: "flex",
          }}
        >
          <Mock
            style={{
              alignSelf: "center",
              marginTop: 20,
              marginBottom: 10,
            }}
          />
          <Text
            style={{
              marginHorizontal: 10,
              fontWeight: "700",
              fontSize: 20,
            }}
          >
            Mock Test
          </Text>
          <Text
            style={{
              marginHorizontal: 10,
              color: "#545454",
            }}
          >
            Select your favorite social network and share our icons with your
            contacts or friends. If you don’t have these social networks, simply
            copy the link and paste it in the one you use. For more information
            read the.
          </Text>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",

    // justifyContent: "center",
    // paddingTop: Platform.OS === "android" ? st.currentHeight : 0,
  },
});

export default MockInfo;
