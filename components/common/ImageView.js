import React from 'react';
import { Image } from 'react-native';
import { View, ActivityIndicator } from 'react-native';


const ImageView = (props) => {
  return (
    <View style={styles.imageViewStyle}>
      <Image style={{width: 70, height: 70}} source={require('./img/logo.gif')} />
    </View>
  );
};

const styles = {
  imageViewStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
};

export { ImageView };
