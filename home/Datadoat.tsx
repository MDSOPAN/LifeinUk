import React from "react";
import { View, StyleSheet, Linking } from "react-native";

import { Header, Icon, Text } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import TouchableScale from "react-native-touchable-scale";
function Datadoat() {
  const navigation: any = useNavigation();
  const [loaded] = useFonts({
    doat: require("../assets/fonts/datadoat.ttf"),
  });
  return (
    <>
      <Header
        backgroundColor="#fff"
        leftContainerStyle={{
          alignSelf: "center",
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
      <View
        style={{
          flex: 1,
          backgroundColor: "#fff",
        }}
      >
        <Text
          style={{
            // fontFamily: "doat",
            textAlign: "center",
            // marginTop: "2%",

            fontSize: 100,
            // fontWeight: "100",
            // color: "#318CE7",
            color: "#318CE7",

            fontWeight: "bold",
          }}
        >
          LIUT
        </Text>

        <Text
          style={{
            textAlign: "center",
          }}
        >
          This app is owned by The Internet & Experts Ltd
        </Text>
        <Text
          style={{
            textAlign: "center",
            fontSize: 20,
            marginVertical: 20,
          }}
        >
          Our trainers also provide professional online one to one training
          sessions, please contact us:
        </Text>
        <Text
          style={{
            textAlign: "center",
            fontSize: 20,
          }}
        >
          Email: mitukar@gmail.com
        </Text>

        <Text
          style={{
            textAlign: "center",
            fontSize: 20,
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Whatsapp: +447578404558
        </Text>
        {/* <TouchableScale
          friction={90}
          tension={100}
          activeScale={0.95}
          onPress={() => {
            Linking.openURL("http://www.datadoat.com");
          }}
        >
          <View
            style={{
              margin: 10,
              padding: 10,
              marginVertical: 50,
              flexDirection: "row",
              alignContent: "center",
              alignItems: "center",
              backgroundColor: "#318CE7",
            }}
          >
            <Icon
              name="link"
              size={28}
              color="#fff"
              style={{
                margin: 15,
              }}
            />
            <View
              style={{
                flexShrink: 1,
                flexGrow: 1,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  color: "#fff",
                }}
                numberOfLines={1}
                adjustsFontSizeToFit
              >
                Scale up your businesses with datadoat!
              </Text>
              <Text
                style={{
                  color: "rgba(255,255,255,0.7)",
                }}
              >
                Tap to visit our website
              </Text>
            </View>
          </View>
        </TouchableScale> */}
        <View
          style={{
            // flexDirection: "row",
            // position: "absolute",
            // width: "100%",
            // height: "10%",
            // justifyContent: "space-around",
            backgroundColor: "#318CE7",
            // alignItems: "center",
            // alignContent: "center",
            borderTopStartRadius: 25,
            borderTopEndRadius: 25,
            // bottom: 0,
            marginTop: "auto",
            padding: 10,
          }}
        >
          {loaded && (
            <>
              <Text
                style={{
                  color: "#fff",
                  textAlign: "center",
                }}
              >
                App designed & developed by:
              </Text>
              <Text
                style={{
                  fontFamily: "doat",
                  textAlign: "center",
                  marginTop: "2%",

                  fontSize: 50,
                  fontWeight: "100",
                  color: "#fff",
                }}
              >
                datadoat
              </Text>
            </>
          )}
          {/* <Icon
            color="#fff"
            name="facebook"
            type="material-community"
            size={40}
            onPress={() => {
              Linking.openURL("https://www.facebook.com/datadoatlabs");
            }}
          />
          <Icon
            color="#fff"
            name="linkedin"
            type="material-community"
            size={40}
            onPress={() => {
              Linking.openURL("https://www.linkedin.com/company/datadoat/");
            }}
          />
          <Icon
            color="#fff"
            name="instagram"
            type="material-community"
            size={40}
            onPress={() => {
              Linking.openURL("https://instagram.com/datadoatlabs");
            }}
          /> */}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  heading: {
    color: "#318CE7",
    fontSize: 30,
    fontWeight: "bold",
  },
});
export default Datadoat;
