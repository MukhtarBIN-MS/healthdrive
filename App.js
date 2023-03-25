import 'react-native-gesture-handler';
import { LogBox } from 'react-native';

import { AuthProvider } from './Context/AuthContext';
import AppNav from './Navigation/AppNav';



export default function App(){

LogBox.ignoreAllLogs();
  return (
    <AuthProvider>
      <AppNav/>
    </AuthProvider>
  );
}




