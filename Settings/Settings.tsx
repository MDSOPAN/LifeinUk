import { useNavigation } from "@react-navigation/native";
import { Icon, ListItem } from "@rneui/base";
import React from "react";
import {
  StyleSheet,
  View,
  StatusBar as st,
  Text,
  Dimensions,
  Linking,
  Alert
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// @ts-ignore
import Datadoat from '../assets/datadoat_labs.svg'
import { app_url } from "../universal/app_constants";


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
          backgroundColor:"#133279",
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
            color="#fff"
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
            <Icon name="google-translate" type="material-community" color="grey" />
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
        {/* <ListItem bottomDivider style={styles.menuitm}>
            <Icon name="shield-check" type="material-community" color="grey" />
            <ListItem.Content>
            <ListItem.Title>Permissions</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
        </ListItem> */}
        
        <ListItem style={styles.menuitm} onPress={async ()=>{
          let url=`https://www.termsfeed.com/live/12d92d4e-4da3-45ee-8f6a-b130d3526f59`;
          const supported = await Linking.canOpenURL(url);

          if (supported) {
            // Opening the link with some app, if the URL scheme is "http" the web link should be opened
            // by some browser in the mobile
            await Linking.openURL(url);
          } else {
            Alert.alert(`Could not open. Browser error`);
          }
        }}>
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
        <ListItem style={styles.menuitm} onPress={async ()=>{
          let url=`https://play.google.com/store/apps/details?id=com.liut.LifeinUk`;
          const supported = await Linking.canOpenURL(url);

          if (supported) {
            // Opening the link with some app, if the URL scheme is "http" the web link should be opened
            // by some browser in the mobile
            await Linking.openURL(url);
          } else {
            Alert.alert(`Could not open. Browser error`);
          }
        }}>
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
        <Text style={{
          textAlign: 'center',
          color: '#ABABAB',
          fontSize: 16
        }}>developed by</Text>
        <Datadoat style={{
          aspectRation: 1/1,
          maxWidth: Dimensions.get('window').width * 0.5,
        }}/>
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
        color: "#fff",
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
