import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import Parent from "./Parent";
import { useQuery, useQueryClient } from "react-query";
import { Text, StatusBar as st } from "react-native";

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

function Home() {
  let client = useQueryClient();

  const { isLoading, error, data }: any = useQuery("ParentData", async () => {
    let res = await fetch(
      "https://liut-362118.ew.r.appspot.com/api/getallparent"
    );
    if (res.status == 500) {
      throw new Error("Database Not online");
    }
    res = await res.json();
    return res;
  });
  let pdata: any[] = [];
  if (!isLoading) {
    pdata = data["data"];
  }

  return (
    <>
      {!isLoading &&
        pdata.map((item, i) => <Parent Parent={item} idx={i} key={i} />)}

      <StatusBar style="dark" backgroundColor="#fff" />
    </>
  );
}

export default Home;
