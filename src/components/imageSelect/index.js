import React from 'react';
import {View, ImageBackground, Alert} from 'react-native';
import {TouchableRipple, Text} from 'react-native-paper';
import {launchImageLibrary} from 'react-native-image-picker';

import {style} from './style';
import noImage from '../../assets/img/noImage.png';
import {BASE_URL} from '../../Util/Constants';

export default function ImageCard({img, stateImg, title = ''}) {
  const launchImage = async () => {
    try {
      const result = await launchImageLibrary({mediaType: 'photo'});
      if (!result.didCancel) {
        let [{uri, fileName, type}] = result.assets;
        stateImg({
          originalname: fileName,
          uri: uri,
          mimetype: type,
        });
        return;
      }
    } catch (error) {
      true;
    }
  };

  return (
    <View style={{flex: 1}}>
      <Text style={style.title}>{title}</Text>
      <TouchableRipple
        style={{
          flex: 1,
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        rippleColor="rgba(0, 0, 0, .32)"
        onPress={() => launchImage()}>
        {img != '' && img.uri ? (
          <ImageBackground
            source={{uri: img.uri}}
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              width: '100%',
            }}
          />
        ) : img != '' && !img.uri ? (
          <ImageBackground
            source={{uri: BASE_URL + img}}
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              width: '100%',
            }}
          />
        ) : (
          <ImageBackground
            source={noImage}
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              width: '100%',
            }}
          />
        )}
      </TouchableRipple>
    </View>
  );
}
