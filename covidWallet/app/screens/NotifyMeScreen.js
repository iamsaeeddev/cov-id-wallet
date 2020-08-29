import React, { useEffect } from 'react';
import { View, Image, Text, StyleSheet, BackHandler ,Alert} from 'react-native';
import { useState } from 'react';
import PrimaryButton from '../components/PrimaryButton';
import { PRIMARY_COLOR } from '../theme/Colors';
import ImageBoxComponent from '../components/ImageBoxComponent';
import TextComponent from '../components/TextComponent';
import {useRoute} from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import randomString from '../helpers/RandomString';

const img = require('../assets/images/notifications.png');

function NotifyMeScreen({ navigation }) {
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(( )=> {
    fetch(`http://70f01df43d79.ngrok.io/create_wallet`,
			{
				method: 'POST',
				headers: {
					'X-API-Key': 'secret',
					'Content-Type': 'application/json; charset=utf-8',
					'Server': 'Python/3.6 aiohttp/3.6.2'
        },
        body: JSON.stringify({
          wallet_name: randomString(8),
          seed: randomString(32)
        })
			}).then((
				resp => resp.json().then((data => {
          // save data in async storage
				}))))
  },[]);

  nextHandler = (isEnabled) => {
    if (isEnabled) {
      setIsEnabled(isEnabled)
    }
 
    navigation.navigate('MainScreen');
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ flex: 5, alignItems: 'center', justifyContent: 'center' }}>
        <ImageBoxComponent
          source={img}
        />
      </View>
      <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={styles.TextContainerHead}>Stay Notified</Text>
        <TextComponent onboarding={true} text="We use push notifications to deliver messages for important events,
          such as when you recieve a new vaccination certificate."/>

      </View>
      <View style={{ flex: 3, alignItems: 'center', justifyContent: 'center' }}>
        <PrimaryButton text="Enable Notifications" nextHandler={() => nextHandler(true)} />
        <Text style={styles.TextContainerEnd}
          onPress={() => nextHandler(false)} >Continue without alerts</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  TextContainerEnd: {
    alignItems: 'center', justifyContent: 'center', color: PRIMARY_COLOR, paddingTop: 15
  },
  TextContainerHead: {
    alignItems: 'center', justifyContent: 'center', color: 'black', fontWeight: 'bold',
    fontSize: 32, flexDirection: 'column',
  },
});

export default NotifyMeScreen;