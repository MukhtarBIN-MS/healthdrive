import React, {createContext, useState, useEffect} from 'react';
import { getDatabase, ref, set } from "firebase/database";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '../firebase-config';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail,  signOut,  } from 'firebase/auth';


export const AuthContext = createContext();

const db = getDatabase();



export const AuthProvider = ({children}) =>{
  
   
const [ isLoading, setisLoading ] = useState(false);

const [ user, setUser] = useState(null);
const [ user_name, setUser_Name] = useState(null)
const [userImg, setUserImg] = useState(null)
const [error, setError] = useState(null);
const [ userToken, setUserToken ] = useState(null);
const [ userRole, setUserRole] = useState("");
const [ whichRole, setWhichRole] = useState("");
const [Page, setPage] = useState();
const [submitted, setSubmitted] = useState(false);
 

const Login = async (email, password) =>{
    try {
        setisLoading(true);
        await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          setUserToken(user.accessToken);             
          AsyncStorage.setItem('userToken', user.accessToken);
          AsyncStorage.setItem('userRole', 'Donor');
          setUserRole('Donor');
          setisLoading(false);
          setSubmitted(false);
        })
      } catch (error) {
        setisLoading(false);
        setError(alert('Invalid Credentials'))
        setSubmitted(false);
        console.log(`Error ${error}`);
      }

}

const LoginAsMed = async (email, password) =>{
  try {
      setisLoading(true);
      await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUserToken(user.accessToken);             
        AsyncStorage.setItem('MedUserToken', user.accessToken);
        AsyncStorage.setItem('userRole', 'Medical');
        setUserRole('Medical');
        setisLoading(false);
        setSubmitted(false);
      })
    } catch (error) {
      setisLoading(false);
      setError(alert('Invalid Credentials'))
      setSubmitted(false);
      console.log(`Error ${error}`);
    }

}
// const LoginWithGoogle = async () =>{
//   try {
//       setisLoading(true);
//       const provider = new GoogleAuthProvider();   
//       await signInWithPopup(auth, provider)
//       .then((result) => {
//         const credential = GoogleAuthProvider.credentialFromResult(result);
//         const token = credential.accessToken;
//         setUserToken(token);             
//         AsyncStorage.setItem('userToken', token);
//         setisLoading(false);
//         // ...
//       }).catch((error) => {
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         const email = error.customData.email;
//         const credential = GoogleAuthProvider.credentialFromError(error);
//         // ...
//       });
//     }
//       catch(error){
//         setisLoading(false);
//         setError(alert('Cant Access Google Account'))
//         console.log(`Error ${error}`);
//       }

      
// // }
// const LoginWithFacebook = async () =>{
//   try {
//       setisLoading(true);
//       const provider = new FacebookAuthProvider();  
//       await signInWithPopup(auth, provider)
//       .then((result) => {
//         const credential = FacebookAuthProvider.credentialFromResult(result);
//         const token = credential.accessToken;
//         setUserToken(token);             
//         AsyncStorage.setItem('userToken', token);
//         setisLoading(false);
//         // ...
//       }).catch((error) => {
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         const email = error.customData.email;
//         const credential = GoogleAuthProvider.credentialFromError(error);
//         // ...
//       });
//     }
//       catch(error){
//         setisLoading(false);
//         setError(alert('Cant Access Facebook Account'))
//         console.log(`Error ${error}`);
//       }

      
// }
// const LoginWithTwitter = async () =>{
//   try {
//       setisLoading(true);
//       const provider = new TwitterAuthProvider(); 
//       await signInWithPopup(auth, provider)
//       .then((result) => {
//         const credential = TwitterAuthProvider.credentialFromResult(result);
//         const token = credential.accessToken;
//         setUserToken(token);             
//         AsyncStorage.setItem('userToken', token);
//         setisLoading(false);
//         // ...
//       }).catch((error) => {
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         const email = error.customData.email;
//         const credential = TwitterAuthProvider.credentialFromError(error);
//         // ...
//       });
//     }
//       catch(error){
//         setisLoading(false);
//         setError(alert('Cant Access Twitter Account'))
//         console.log(`Error ${error}`);
//       }

      
// }
const Register  = async (email, password)=>{
    try {
        setisLoading(true);
        await createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
        const user = userCredential.user;
        set(ref(db, 'users/' + user.uid), {
          username: '',
          email: email,
          gender:'',
          blood_group:'',
          contact:'',
          state:'',
          profile_picture : ''
        });
        })
        setisLoading(false);
       
      } catch (e) {
        setisLoading(false);
        setError(alert('Email Already Exist'))
       console.log(`Error ${e}`);
      }

}
const RegisterAsMed  = async (email, password)=>{
  try {
      setisLoading(true);
      await createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
        const user = userCredential.user;
        set(ref(db, 'med-users/' + user.uid), {
          clinic_name: '',
          address:'',
          RC_NUMBER:'',
          state:'',
        });
        })

        setisLoading(false);
      
    } catch (e) {
      setisLoading(false);
      setError(alert('Error'))
     console.log(`Error ${e}`);
    }

}

const resetUserPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    setSubmitted(true);
    setError(null);
  } catch (error) {
    if (error.code === 'auth/user-not-found') {
      setError('User not found');
    } else {
      setError('There was a problem with your request');
    }
  }
};


const DonorClick = async () =>{
  await AsyncStorage.setItem('PageD', 'Donor');
  setPage(AsyncStorage.getItem('PageD'));
}
const MedClick = async () =>{
  await AsyncStorage.setItem('PageM', 'Med');
  setPage(AsyncStorage.getItem('PageM'));
}

const Logout = async ()=>{
    try {
        setisLoading(true);
        setUserToken(null);
        await signOut(auth);
        await AsyncStorage.removeItem('userToken');
        setisLoading(false);
      } catch (e) {
       console.log(`Error ${e}`);
      }

}
const LogoutAsMed = async () =>{
  try {
      setisLoading(true);
      setUserToken(null);
      await signOut(auth);
      await AsyncStorage.removeItem('MedUserToken');
      setisLoading(false);
    } catch (e) {
     console.log(`Error ${e}`);
    }

}
const isLoggedIn = async ()=>{
    try {
        setisLoading(true);
        let userToken = userRole === 'Donor' ? await AsyncStorage.getItem('userToken') : await AsyncStorage.getItem('MedUserToken');
        let userRoleString = userToken === 'userToken' ? 'Donor' : 'Med';
        setUserRole(userRoleString)
        setUserToken(userToken);
        setisLoading(false);
      } catch (e) {
       console.log(`Error ${e}`);
      }

}

useEffect(()=>{
       isLoggedIn();
}, [])

    return(
        <AuthContext.Provider value={{Login, Logout, LogoutAsMed, Register, LoginAsMed, DonorClick, MedClick, RegisterAsMed, resetUserPassword, setPage, setUser_Name, setUserImg, setWhichRole, whichRole, user_name, userImg, Page, user, submitted,  userRole, error, setUser, isLoading, userToken}} >
              {children}
        </AuthContext.Provider>
    )
}