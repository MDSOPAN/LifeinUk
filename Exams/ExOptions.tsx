import { Button } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

function ExOptions({
  option,
  setSelectedAnswers,
  ind,
  reset,
  setreset,
  setDisabled,
  disabled,
}: any) {
  let [pressed, setPressed] = useState(false);
  useEffect(() => {
    if (reset) {
      setPressed(false);
      setreset(false);
      setSelectedAnswers([]);
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
            if (value.length) {
              if (disabled) setDisabled(false);
            } else {
              if (!disabled) setDisabled(true);
            }
            return value;
          });
          setPressed(false);
        } else {
          setSelectedAnswers((value: String[]) => {
            value.push(ind);
            if (value.length) {
              if (disabled) setDisabled(false);
            } else {
              if (!disabled) setDisabled(true);
            }
            return value;
          });
          setPressed(true);
        }
      }}
      type={pressed ? "solid" : "outline"}
      containerStyle={{ borderWidth: 0, flex: 1 }}
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
    borderRadius: 7,
    marginVertical: 10,
  },
  btnpressed: {
    backgroundColor: "rgba(21,90,117,0.220)",
    elevation: 0,
  },
  title: {
    color: "black",
  },
  titlepressed: {
    color: "#09477e",
  },
});
export default ExOptions;
