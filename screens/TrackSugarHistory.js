import { View, Text } from 'react-native'
import React from 'react'

export default function TrackSugarHistory() {
  return (
    <View>
      <Text>TrackSugarHistory</Text>
    </View>
  )
}

// import React, { useState, useEffect } from "react";
// import firebase from "firebase";
// import { View, Text, FlatList } from "react-native";

// const TrackingSugarLevel = () => {
//   const [sugarLevels, setSugarLevels] = useState([]);

//   useEffect(() => {
//     const userId = firebase.auth().currentUser.uid;
//     const sugarLevelsRef = firebase.database().ref(`users/${userId}/sugarLevels`);
//     sugarLevelsRef.on("value", snapshot => {
//       setSugarLevels(snapshot.val());
//     });
//     return () => {
//       sugarLevelsRef.off();
//     };
//   }, []);

//   return (
//     <View>
//       <Text>Tracking Sugar Level</Text>
//       <FlatList
//         data={Object.values(sugarLevels)}
//         renderItem={({ item }) => <Text>{item.value}</Text>}
//         keyExtractor={item => item.timestamp}
//       />
//     </View>
//   );
// };

// export default TrackingSugarLevel;
