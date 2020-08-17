import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacityBase } from 'react-native';
import FlatCard from '../components/FlatCard';
import ImageBoxComponent from '../components/ImageBoxComponent';
import TextComponent from '../components/TextComponent';
import HeadingComponent from '../components/HeadingComponent';
import { themeStyles } from '../theme/Styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ModalComponent from '../components/ModalComponent';
import { getPassCode } from '../helpers/Storage';

const image = require('../assets/images/visa.jpg')

function ActionsScreen(props) {
  const [isAction, setAction] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);
  const [actionsList, setActionsList] = useState([]);

  useEffect(()=>{
    getPassCode('credential').then(value=>console.log(value))
  },[])


  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={themeStyles.mainContainer}>
      {isAction &&
        <View>
          <HeadingComponent text="Actions" />
          <ModalComponent data={data} isVisible={isModalVisible} toggleModal={toggleModal} />
          {
            actions.map((v, i) => {
              return  <TouchableOpacity key={i} onPress={() => toggleModal()}>
                        <FlatCard image={image} heading={v.heading} text={v.text} />
                      </TouchableOpacity>
            })
          }
        </View>
      }
      {!isAction &&
        <View style={styles.EmptyContainer}>
          <ImageBoxComponent source={require('../assets/images/action.gif')} />
          <TextComponent text="There are no actions to complete, Please scan a QR code to either get a vaccination certificate or to prove it." />
        </View>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  EmptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  Imagesize: {
    marginBottom: 50,
    height: 300,
    width: 300,
    resizeMode: 'contain'
  },
});

export default ActionsScreen;