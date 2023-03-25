import { View, Image} from 'react-native';
export default function BannerSlider({ data }){
    return(
      <View>
      
        <Image  source={data.image} style={{ height:210, width:290, borderRadius: 10}}  />
      </View>
    )
  }