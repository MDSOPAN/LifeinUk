import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Question from "./Question";
import { Header } from "@rneui/themed";
import { useRoute } from "@react-navigation/native";

// const renderparent = ({ item }: any) => {
//   console.log(item);
//   return (
//     <ListItem>
//       <ListItem.Content>
//         <ListItem.Title>Limited supply! Its like digital gold!</ListItem.Title>
//         <View style={styles.list}>
//           <Text>5 months ago</Text>
//         </View>
//       </ListItem.Content>
//     </ListItem>
//   );
// };

function IndexQuiz() {
  let route = useRoute();
  let Qdata: any = route.params;

  let [question, setQuestion] = useState(0);
  return (
    <View>
      <Header
        backgroundColor="#fff"
        centerComponent={{
          text: "Practice Quiz",
          style: styles.heading,
        }}
      />
      <Question
        Question={Qdata[question]}
        nextQ={() => {
          setQuestion(question + 1);
        }}
      />
      <StatusBar style="dark" backgroundColor="#fff" />
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    color: "#318CE7",
    fontSize: 30,
    fontWeight: "bold",
  },
});
export default IndexQuiz;
