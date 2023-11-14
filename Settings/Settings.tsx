import { useNavigation } from "@react-navigation/native";
import { Icon, ListItem } from "@rneui/base";
import React from "react";
import {
  StyleSheet,
  View,
  StatusBar as st,
  Text
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// @ts-ignore
import Datadoat from '../assets/datadoat.svg'


export default function Settings() {
  
  let navigation: any = useNavigation();
  
  return (
    <SafeAreaView style={styles.safearea}>
      <View style={{
          display:'flex',
          flexDirection: 'row',
          alignItems: 'center',
          alignContent: 'center',
          justifyContent:'center',
          backgroundColor:"#fff",
          margin: 0,
          padding: 15,
          borderBottomWidth: 5,
            borderColor: '#F0F0F0'
        //   marginBottom: 10,
          // height: 200
        }}>
          <Icon
            type="fontawesome"
            name="chevron-left"
            color="#000000"
            size={36}
            style={{
              alignSelf: "center",
            }}
            onPress={() => {
              navigation.pop();
            }}
          />

          <Text style={styles.heading}>
            Settings
          </Text>
      </View>
      
      <View style={{
        backgroundColor: 'white',
        marginTop: 5,
        borderBottomWidth: 5,
        borderColor: '#F0F0F0'
      }}>
        <Text style={{color:'#8F8F8F',margin: 10}}>Language</Text>  
        {/* <ListItem bottomDivider style={styles.menuitm}>
            <Icon name="user" type="font-awesome" color="grey" />
            <ListItem.Content>
            <ListItem.Title>Inbox</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
        </ListItem> */}
        
        <ListItem style={styles.menuitm} onPress={()=>{
          navigation.navigate('Menu');
        }}>
            <Icon name="earth" type="material-community" color="grey" />
            <ListItem.Content>
            <ListItem.Title>Translation</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
        </ListItem>
      </View>

      <View style={{
        backgroundColor: 'white',
        marginTop: 5,
        borderBottomWidth: 5,
        borderColor: '#F0F0F0'
      }}>
        <Text style={{color:'#8F8F8F',margin: 10}}>Help and Policy</Text>  
        <ListItem bottomDivider style={styles.menuitm}>
            <Icon name="contact-support" type="material" color="grey" />
            <ListItem.Content>
            <ListItem.Title>Help</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
        </ListItem>
        
        <ListItem style={styles.menuitm}>
            <Icon name="assignment-turned-in" type="material" color="grey" />
            <ListItem.Content>
            <ListItem.Title>Privacy Policy</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
        </ListItem>
      </View>
      <View style={{
        backgroundColor: 'white',
        marginTop: 5
      }}>
        <Text style={{color:'#8F8F8F',margin: 10}}>Other</Text>  
        <ListItem style={styles.menuitm}>
            <Icon name="star" type="material" color="grey" />
            <ListItem.Content>
            <ListItem.Title>Rate Us</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
        </ListItem>
        
      </View>
      <View style={{
        marginTop:'auto',
        marginRight: 'auto',
        marginLeft: 'auto',
        margin: 10
      }}>
        <Datadoat />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    safearea:{
        flex: 1,
        backgroundColor: "#fff",
        minHeight: '100%'
    },
    heading: {
        color: "#000000",
        fontSize:22,
        marginLeft: 5,
        flex: 1,
        fontWeight: "600",
        marginRight: 'auto'
    },
    menuitm: {
        marginHorizontal: 10
    }
});
