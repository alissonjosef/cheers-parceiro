import React, {useEffect} from 'react';
import { SafeAreaView, StatusBar,LogBox} from "react-native";
import Router from './routes';
import SplashScreen from 'react-native-splash-screen';
import KeyboardManager from 'react-native-keyboard-manager';
import { isIOS } from './Util/Commons';

export default function App() {
  useEffect(() => {
    LogBox.ignoreAllLogs();
    SplashScreen.hide();
    if(isIOS) {
      KeyboardManager.setEnable(true);
    }
  },[]);

  return (
    <>
      <StatusBar 
        barStyle="light-content"
        backgroundColor="#170028"
        setTranslucent="true"
      />
      <Router />
    </>
  );
}
