import React from "react";
import { Header } from "@rneui/themed";
import { StyleSheet, Text, View } from "react-native";
import { Card } from "@rneui/themed";
import Svg, { Circle } from "react-native-svg";
// import SvgComponent from "./SvgComp";
function Home() {
  return (
    <>
      <Header
        leftComponent={{
          text: "LIUT",
          style: styles.heading,
        }}
      />
      {/* <SvgComponent /> */}
      <View style={styles.cardcontainer}>
        <Card containerStyle={styles.card}>
          <Card.Title>Practice Tests</Card.Title>
          <Card.Divider />

          <Text>View Practice Tests</Text>
        </Card>
        <Card containerStyle={styles.card}>
          <Card.Title>Mock Tests</Card.Title>
          <Card.Divider />
          <Text>Start a Mock Exam</Text>
        </Card>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  heading: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
  },
  cardcontainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
  },
  card: {
    flexGrow: 1,
  },
});
export default Home;
