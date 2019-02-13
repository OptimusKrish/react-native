import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
// import { Animated, Easing } from 'react-native';
// import LottieView from 'lottie-react-native';
import { Root } from "native-base";
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
    // progress: new Animated.Value(0)
  };

  // componentDidMount() {
  //   Animated.timing(this.state.progress, {
  //     toValue: 1,
  //     duration: 5000,
  //     easing: Easing.linear,
  //   }).start();
  // }

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <Root>
          <AppLoading
            startAsync={this._loadResourcesAsync}
            onError={this._handleLoadingError}
            onFinish={this._handleFinishLoading}
          />
        </Root>
      );
    } 
    // else if (!this.state.progress && this.state.progress > 5000){
    //   return(
    //     <LottieView 
    //           source={require('../src/assets/lottie/camera-scanning.json')} 
    //           progress={this.state.progress}
    //     />
    //   );
    // } 
    else {
      return (
        <Root>
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <AppNavigator/>
        </View>
        </Root>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/icon.png'),
        require('./assets/images/icon.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
        'Roboto_medium': require('./assets/fonts/Roboto_Medium.ttf')
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
