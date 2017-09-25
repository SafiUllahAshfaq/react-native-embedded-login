import React from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Card, CardSection, Button, ImageView } from '../common';

class Home extends React.Component {

  onChangePasswordButtonPress() {
    Actions.password();
  }

  render() {
    const { idToken, accessToken } = this.props;
    return (
      <View>
        <Card style={{ borderWidth: 0 }}>
          <CardSection style={{ backgroundColor: '#222228',  borderColor: '#222228' }}>
            <ImageView />
          </CardSection>
        </Card>
        <Card>
        <CardSection>
          <Button style={{ backgroundColor: '#44C7F4' }} onPress={this.onChangePasswordButtonPress.bind(this)}>
            Password
          </Button>
        </CardSection>
      </Card>
    </View>
    );
   }

}

const mapStateToProps = ({ auth }) => {
  const { idToken, accessToken } = auth;
  return { idToken, accessToken };
};

export default connect(mapStateToProps, {})(Home);
