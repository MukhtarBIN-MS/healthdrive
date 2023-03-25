import { StatusBar } from 'expo-status-bar';
import { StyleSheet,  Text, View, Image, Button, TouchableOpacity } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import MyImage from '../assets/onboard-svg.png';

export default function Main({navigation}){

  const Done =({...props}) =>(
    <TouchableOpacity style={{marginHorizontal:8}} {...props}><Text style={{fontSize:16}}>Done</Text></TouchableOpacity>
  )
  const Dots =({selected}) =>{
    let backgroundColor;
    backgroundColor = selected ? 'rgba(0,0,0,0.8)' :'rgba(0,0,0,0.3)';
    return(
      <View style={{width:5, height:5,marginHorizontal:3,backgroundColor}}/>
    )
  }
    return (
      <Onboarding
      DoneButtonComponent={Done}
      onSkip={()=> navigation.replace('Welcome')}
      onDone={()=> navigation.navigate('Welcome')}
      DotComponent={Dots}
      pages={[
        {
          backgroundColor: '#a6e4d0',
          image: <Image style={{width:160, height:160}} source={require('../assets/logo.png')} />,
          title: 'Healthy Lives',
          subtitle: '“Healthy habits, healthy life. Get started \n with our health drive app today!”',
        },
        {
          backgroundColor: '#fedb93',
          image: <Image style={{width:160, height:160}}  source={require('../assets/logo.png')} />,
          title: 'Did you Know That ?',
          subtitle: '“Small steps, big results. Drive your health \n  and drive for others.”',
        },
        {
          backgroundColor: '#e9bcbe',
          image: <Image style={{width:160, height:160}}  source={require('../assets/logo.png')} />,
          title: 'Lets Go Hero',
          subtitle: '“Transform your health, transform your life. Start \n your journey with our health drive app now..”',
        },
 
      ]}
    />
    );
  }

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection:'column',
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    text:{
      fontSize:30,
      fontWeight:'bold',
      color:'#D10000'
    },
    button:{
      backgroundColor:'#D10000',
      padding:20,
      marginBottom:50,
      borderRadius:10,
      flexDirection:'row',
      justifyContent:'space-between'
    },
    text2:{
      fontWeight:'bold',
      fontStyle:'italic',
      fontSize:18,
      color:'white',
  
    }
  });