import { ListItem, Card } from "@rneui/themed";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { useQuery } from "react-query";
function Parent({ Parent, i }: any) {
  let [expanded, setExpanded] = useState(false);
  let urlend: String = Parent.Quiz_Name;
  urlend = urlend.replace(/\s/g, "%20");

  const { isLoading, error, data }: any = useQuery(
    `${Parent.Quiz_Name}`,
    async () => {
      let res = await fetch(
        `https://liut-362118.ew.r.appspot.com/api/getparentquiz?parent=${urlend}`
      );
      if (res.status == 500) {
        throw new Error("Database Not online");
      }
      res = await res.json();
      return res;
    }
  );
  let tdata: any[] = new Array();
  if (!isLoading) {
    tdata = data.data;
  }
  return (
    <Card>
      {/* <ListItem.Accordion
        key={i}
        style={styles.list}
        content={
          <>
            <Icon name="place" size={30} />
            <ListItem.Content>
              <ListItem.Title>{Parent.Quiz_Name}</ListItem.Title>
            </ListItem.Content>
          </>
        }
        isExpanded={expanded}
        onPress={() => {
          setExpanded(!expanded);
        }}
      >
        {!isLoading &&
          tdata.map((l, i) => {
            return (
              <ListItem key={i} style={styles.listch}>
                <ListItem.Content>
                  <ListItem.Title>{l.Quiz_Name}</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem>
            );
          })}
      </ListItem.Accordion> */}
    </Card>
  );
}

const styles = StyleSheet.create({
  list: {
    width: "100%",
  },
  listch: {
    width: "80%",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#000",
    marginLeft: "auto",
    padding: 1,
    backgroundColor: "#fff",
  },
});

export default Parent;
