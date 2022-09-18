import { Button } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
function Options({
  option,
  setSelectedAnswers,
  ind,
  right,
  show,
  reset,
  setreset,
}: any) {
  let [pressed, setPressed] = useState(false);
  useEffect(() => {
    if (reset) {
      setPressed(false);
      setreset(false);
    }
  }, [reset]);
  return (
    <Button
      title={`${option}`}
      onPress={() => {
        if (pressed) {
          setSelectedAnswers((value: String[]) => {
            let indx = value.indexOf(ind);
            if (indx != -1) value.splice(indx, 1);
            return value;
          });
          setPressed(false);
        } else {
          setSelectedAnswers((value: String[]) => {
            value.push(ind);
            return value;
          });
          setPressed(true);
        }
      }}
      type={pressed ? "solid" : "outline"}
      containerStyle={{ borderWidth: 0, flex: 1 }}
      buttonStyle={[
        styles.btn,
        pressed && styles.btnpressed,
        show && right && styles.btnright,
        pressed && show && right && styles.btnrightans,
        pressed && show && !right && styles.btnwrong,
      ]}
      titleStyle={[
        styles.title,
        pressed && styles.titlepressed,
        show && right && styles.titleright,
        pressed && show && !right && styles.titlewrong,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  btn: {
    borderColor: "#000",
    flexGrow: 1,
    backgroundColor: "transparent",
    borderRadius: 7,
    marginVertical: 10,
  },
  btnpressed: {
    backgroundColor: "rgba(21,90,117,0.220)",
  },
  btnright: {
    backgroundColor: "rgba(29, 245, 0, 0.25)",
  },
  btnrightans: {
    backgroundColor: "rgba(29, 200, 0, 0.5)",
  },
  btnwrong: {
    backgroundColor: "rgba(245,0,0, 0.25)",
  },
  title: {
    color: "black",
  },
  titlepressed: {
    color: "#09477e",
  },
  titleright: {
    color: "green",
  },
  titlewrong: {
    color: "red",
  },
});
export default Options;
