import React from 'react';
import { Platform } from 'react-native';
import { Scene, Stack, Router, Actions, ActionConst } from 'react-native-router-flux';
import Signin from './components/auth/Signin';
import Home from './components/home/Home';
import ForgotPassword from './components/forgot/ForgotPassword';
import ChangePassword from './components/password/ChangePassword';

const RouterComponent = () => {

  const navBarStyle = (Platform.OS === 'android') ? styles.navBarAndroid : styles.navBar;

  return (
    <Router navigationBarStyle={navBarStyle}
      titleStyle={styles.navBarTitle}
      barButtonTextStyle={styles.barButtonTextStyle}
      barButtonIconStyle={styles.barButtonIconStyle}
      rightButtonTextStyle={styles.rightButtonTextStyle}
      sceneStyle={{ paddingTop: 65, backgroundColor: '#F5F7F9' }}>
      <Scene key="auth">
        <Scene key="signin" component={Signin} title="Login" initial />
        <Scene key="forgot" component={ForgotPassword} title="Forgot Password" />
      </Scene>

      <Scene key="main">
        <Scene
          onRight={() => Actions.auth()}
          rightTitle="Logout"
          key="home"
          component={Home}
          title="Home"
          initial
        />
        <Scene key="password" component={ChangePassword} title="Change Password" />
      </Scene>

    </Router>
  );
};

const styles = {
  navBar: {
    backgroundColor: '#F5F7F9'
  },
  navBarAndroid: {
    backgroundColor: '#F5F7F9',
    paddingTop: 20,
    height: 80
  },
  navBarTitle: {
    color: '#EB5424',
    fontSize: 20,
  },
  barButtonTextStyle: {
      color: '#EB5424'
  },
  barButtonIconStyle: {
      tintColor:'rgb(235,84,36)'
  },
  rightButtonTextStyle: {
      color: '#FF9A57'
  }

};

export default RouterComponent;
