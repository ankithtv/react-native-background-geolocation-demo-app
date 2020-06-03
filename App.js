/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';

import BackgroundGeolocation from "react-native-background-geolocation";


const App = () => {
  
  useEffect(() => {
    (async () => {
      BackgroundGeolocation.onLocation((location) => {
        console.log(location);
        fetch('http://192.168.43.45:3000/', { method: "POST", body: JSON.stringify(location) }).then((res) => res.json).then(res = {})
      }, (err) => {
        console.log(err)
      })

      await BackgroundGeolocation.setConfig({
        distanceFilter: 100
      });

      BackgroundGeolocation.ready({
        reset: false,
        enableHeadless: true,
        stopOnTerminate: false,
        disableElasticity: true,
        distanceFilter: 100,
        autoSync: false,
        stopTimeout: 1,
        debug: true,
        startOnBoot: true,
      }, (state) => {

        if (!state.enabled) {
          BackgroundGeolocation.start(function () {
            console.log("- Start success");
          });
        }
      });
    })()
    return () => {
      BackgroundGeolocation.removeListeners();
    }
  }, []);


  return (
    <>

    </>
  );
};


export default App;
