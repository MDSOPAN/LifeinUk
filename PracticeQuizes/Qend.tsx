import { useNavigation, StackActions } from "@react-navigation/native";

import { Header, Text, Button } from "@rneui/themed";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
function Qend() {
  let navigation = useNavigation();

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
          text: "Result",
          style: styles.heading,
        }}
      />

      <View
        style={{
          backgroundColor: "white",
          flexGrow: 1,
          display: "flex",
          alignContent: "center",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          h2
          style={{
            marginVertical: 25,
          }}
        >
          Well Done!
        </Text>

        <Text
          h3
          style={{
            textAlign: "center",
            marginVertical: 25,
          }}
        >
          You have answered all the available questions!
        </Text>
        <Button
          containerStyle={{
            marginVertical: 25,
          }}
          onPress={() => {
            navigation.dispatch(StackActions.popToTop());
          }}
        >
          Back to home
        </Button>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  heading: {
    color: "#29337A",
    fontSize: 42,

    fontWeight: "bold",
  },
  rightcont: {
    marginLeft: 0,
    borderWidth: 0,
  },
  leftcont: {
    borderWidth: 0,
    marginRight: 0,
  },
  retext: {
    textAlign: "center",
  },
});
export default Qend;
