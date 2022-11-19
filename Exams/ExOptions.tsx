import { Button } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

function ExOptions({
  option,
  setSelectedAnswers,
  ind,
  reset,
  setreset,
  ispressed,
  selectedAnswers,
}: any) {
  let [pressed, setPressed] = useState(false);

  useEffect(() => {
    if (reset && !ispressed) {
      setPressed(false);
      setreset(false);
      setSelectedAnswers([]);
    } else {
      setPressed(ispressed);
      setreset(false);
    }
  }, [reset, ispressed]);
  return (
    <Button
      title={`${option}`}
      onPress={() => {
        if (pressed) {
          let value = [...selectedAnswers];
          let indx = value.indexOf(ind);
          if (indx != -1) value.splice(indx, 1);
          setSelectedAnswers(value);
          setPressed(false);
        } else {
          let value = [...selectedAnswers];

          value.push(ind);
          setSelectedAnswers(value);
          setPressed(true);
        }
      }}
      type={pressed ? "solid" : "outline"}
      containerStyle={{ borderWidth: 0, flexGrow: 1 }}
      buttonStyle={[styles.btn, pressed && styles.btnpressed]}
      titleStyle={[styles.title, pressed && styles.titlepressed]}
    />
  );
}

const styles = StyleSheet.create({
  btn: {
    borderColor: "#000",
    flexGrow: 1,
    backgroundColor: "white",
    elevation: 5,
    shadowOffset: { width: -2, height: 4 },
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderRadius: 7,
    marginVertical: 10,
  },
  btnpressed: {
    backgroundColor: "rgba(21,90,117,0.220)",
    elevation: 0,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
  },
  title: {
    color: "black",
  },
  titlepressed: {
    color: "#09477e",
  },
});
export default ExOptions;
