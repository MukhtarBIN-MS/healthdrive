import { StatusBar } from 'expo-status-bar';
import { StyleSheet,  Text, View, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MyDontaions(){
    return(
      <View style={{ flex:1, alignItems:'center', justifyContent:'center'}}>
        <Text>No Donations Yet</Text>
      </View>
    )
  }