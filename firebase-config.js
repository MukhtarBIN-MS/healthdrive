import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

 const firebaseConfig = {
  apiKey: "AIzaSyAtX80Sx_QaJ-rqj4dIATJokGd3I3eQb80",
  authDomain: "donordrive-9c333.firebaseapp.com",
  databaseURL: "https://donordrive-9c333-default-rtdb.firebaseio.com/",
  projectId: "donordrive-9c333",
  storageBucket: "donordrive-9c333.appspot.com",
  messagingSenderId: "610349332552",
  appId: "1:610349332552:web:53eecfbcfbf65ec4eac07d"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default app;
