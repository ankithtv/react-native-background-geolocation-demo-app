/**
 * @format
 */

import {Platform, AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import BackgroundGeolocation from "react-native-background-geolocation";

AppRegistry.registerComponent(appName, () => App);

if(Platform.OS === 'android'){
    let HeadlessTask = async (event) => {
        let params = event.params;
    
        let location = await onLocation();
    
        const response = await fetch('http://192.168.43.45:3000/', { method: "POST", body: JSON.stringify(location) });
    
        const result = await response.json();
        
    }
    
    let onLocation = () => {
        return new Promise((resolve) => {
            BackgroundGeolocation.onLocation(
                (location) => {
                    resolve(location);
                }, (error) => {
                    resolve(error);
                });
        });
    };

    BackgroundGeolocation.registerHeadlessTask(HeadlessTask);
}



