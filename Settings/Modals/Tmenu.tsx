import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View, Text, Pressable } from "react-native";
import { StatusBar } from "expo-status-bar";
//@ts-ignore
import Mock from "../../assets/mockinfo.svg";
import { Icon, ListItem } from "@rneui/base";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as fs from "expo-file-system";

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

function Tmenu() {
  let navigation: any = useNavigation();

  let [lang, setLang] = useState("");

  useEffect(() => {
    if (!lang) {
      getlang(setLang);
    }
  }, []);
  return (
    <View
      style={{
        minHeight: "100%",
        display: "flex",
        backgroundColor: "#40404040",
      }}
    >
      <StatusBar style="light" backgroundColor="#40404040" />
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
          <Pressable
            style={{
              borderBottomWidth: 0.2,
              borderBottomColor: "#F0F0F0",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 15,
            }}
            onPress={() => {
              settrlang(setLang, "en");
              navigation.pop();
            }}
          >
            <Text
              style={{
                fontSize: 16,
              }}
            >
              No Translation
            </Text>
            {lang == "en" && (
              <>
                <Icon name="check" type="material" color="#29337A" />
              </>
            )}
          </Pressable>
          <Pressable
            style={{
              borderBottomWidth: 0.2,
              borderBottomColor: "#F0F0F0",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 15,
            }}
            onPress={() => {
              settrlang(setLang, "bn");
              navigation.pop();
            }}
          >
            <Text
              style={{
                fontSize: 16,
              }}
            >
              Bangla
            </Text>
            {lang == "bn" && (
              <>
                <Icon name="check" type="material" color="#29337A" />
              </>
            )}
          </Pressable>
          <Pressable
            style={{
              borderBottomWidth: 0.2,
              borderBottomColor: "#F0F0F0",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 15,
            }}
            onPress={() => {
              settrlang(setLang, "hi");
              navigation.pop();
            }}
          >
            <Text
              style={{
                fontSize: 16,
              }}
            >
              Hindi
            </Text>

            {lang == "hi" && (
              <>
                <Icon name="check" type="material" color="#29337A" />
              </>
            )}
          </Pressable>
          <Pressable
            style={{
              borderBottomWidth: 0.2,
              borderBottomColor: "#F0F0F0",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 15,
            }}
            onPress={() => {
              settrlang(setLang, "ur");
              navigation.pop();
            }}
          >
            <Text
              style={{
                fontSize: 16,
              }}
            >
              Urdu
            </Text>

            {lang == "ur" && (
              <>
                <Icon name="check" type="material" color="#29337A" />
              </>
            )}
          </Pressable>
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

export default Tmenu;
