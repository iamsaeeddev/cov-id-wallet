import React, { useState,useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Alert,
  TouchableOpacity,

} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import QRCodeScanner from 'react-native-qrcode-scanner';
import { savePassCode, getPassCode } from '../helpers/Storage';
import AsyncStorage from '@react-native-community/async-storage';

class QRScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scan: true,
    }
    this.onAccept = this.onAccept.bind(this);
  }

  // componentWillMount(){
  //   AsyncStorage.removeItem('connection_credential')
  // }

  onAccept = data => {
  
  }

  onSuccess = async e => {
    let parsedData = JSON.parse(e.data);
    let stored_Data = await getPassCode('connection_credential').then(value=> {return value});
    if (!stored_Data) {
      savePassCode('connection_credential', JSON.stringify([parsedData]))
    }
else if (stored_Data.length) {
    let parsedStoredData = JSON.parse(stored_Data);
    let filtered_Data = parsedStoredData.filter(el=>el.data.invitation['@id']===parsedData.data.invitation['@id'])
    if (filtered_Data.length>0){
      Alert.alert('These credentials already exist')
      this.props.navigation.navigate('MainScreen')
    }
    else {
      let oldDataInstance = JSON.parse(stored_Data).slice()
      console.log(oldDataInstance,'oldghjhj')
      console.log(parsedData,'parsedData')
      oldDataInstance.push(parsedData);
      savePassCode('connection_credential', JSON.stringify(oldDataInstance))
      Alert.alert('Credentials saved successfully')
      this.props.navigation.navigate('MainScreen')
    }
  }
    // if (parsedData.data) {
    //   savePassCode('connection_credential')
    //   this.props.navigation.navigate('MainScreen')
    // }
    else {
      Alert.alert('Not valid QR');
      this.props.navigation.navigate('MainScreen')
    }
    // Alert.alert(
    //   'VACCIFY',
    //   'QR Code Result is ' + e.data,
    //   [
    //     { text: 'Reject', onPress: () => this.props.navigation.navigate('MainScreen') },
    //     { text: 'Accept', onPress: () => this.onAccept(e.data)}
    //   ],
    //   { cancelable: false }
    // );
    this.setState({ scan: (this.state.scan = false) })

  }


  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.MainContainer}>
        {this.state.scan &&
          <QRCodeScanner
            reactivate={true}
            showMarker={true}
            customMarker={
              <View style={
                {
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'transparent'
                }
              }>
                <View style={
                  {
                    height: 250,
                    width: 250,
                    borderWidth: 2,
                    borderColor: 'white',
                    backgroundColor: 'transparent'
                  }
                } />
              </View>
            }
            ref={(node) => { this.scanner = node }}
            onRead={this.onSuccess}
            topContent={
              <Text style={styles.textBold}>
                Point your camera to a QR code to scan
            </Text>
            }
            bottomContent={
              <TouchableOpacity style={styles.buttonTouchable} onPress={() => {
                navigate('MainScreen')
              }}>
                <Text style={styles.buttonText}>Cancel Scan</Text>
              </TouchableOpacity>
            }

          />
        }

      </View>
    );
  }
}

const styles = StyleSheet.create({
  sectionContainer: {
    backgroundColor: Colors.black,
  },
  textBold: {
    fontSize: 20,
    marginLeft: 70,
    marginRight: 70,
    zIndex: 10,
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: '600',
    color: '#fff'
  },
  buttonText: {
    fontSize: 21,
    color: '#4178CD'
  },
  buttonTouchable: {
    padding: 16
  },

  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: 'red',
  },

  MainContainer: {
    flex: 1,
    backgroundColor: Colors.black,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Imagesize: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 40
  },


  RoundButtonStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4178CD',
    borderWidth: 0.5,
    borderColor: '#fff',
    height: 40,
    width: 150,
    borderRadius: 20,
    margin: 5,
  },
  ImageIconStyle: {
    padding: 10,
    margin: 5,
    height: 15,
    width: 15,
    marginLeft: 15

  },
  TextGuide: {
    color: 'black',
    marginTop: 14,
    marginLeft: 5,
    marginBottom: 30,
  },
  TextStyle: {
    color: 'white',
    marginTop: 14,
    marginLeft: 5,
    marginBottom: 15,
  },
  SeparatorLine: {
    backgroundColor: '#fff',
    width: 1,
    height: 40,
  },
});

export default QRScreen;