import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { emailChanged, passwordChanged, signin, cleardown } from '../../actions/auth';
import { Card, CardSection, Input, Button, Spinner, ImageView } from '../common';
import params from '../../auth0-params.json';

class Signin extends Component {

  componentWillMount() {
    this.props.cleardown();
  }

  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onButtonPress() {
    const { email, password } = this.props;
    this.props.signin({ email, password })
  }

  onForgotPasswordButtonPress() {
    Actions.forgot();
  }

  renderSubmitButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }

    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        LOGIN
      </Button>
    );
  }

  renderForgotButton() {
    if (this.props.loading) {
      return <View />
    }
    return (
      <CardSection>
        <Button style={{ backgroundColor: '#44C7F4' }} onPress={this.onForgotPasswordButtonPress.bind(this)}>
          FORGOT
        </Button>
      </CardSection>
    );
  }

  render() {
    return (
      <View>
        <Card style={{ borderWidth: 0 }}>
          <CardSection style={{ backgroundColor: '#222228',  borderColor: '#222228' }}>
            <ImageView />
          </CardSection>
        </Card>
        <Card>
          <CardSection>
            <Input
              label="Email"
              placeholder="email@gmail.com"
              onChangeText={this.onEmailChange.bind(this)}
              value={this.props.email}
            />
          </CardSection>

          <CardSection>
            <Input
              secureTextEntry
              label="Password"
              placeholder="password"
              onChangeText={this.onPasswordChange.bind(this)}
              value={this.props.password}
            />
          </CardSection>

          <Text style={styles.errorTextStyle}>
            {this.props.error}
          </Text>

          <CardSection>
            {this.renderSubmitButton()}
          </CardSection>
          {this.renderForgotButton()}

        </Card>
      </View>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 14,
    alignSelf: 'center',
    color: 'red'
  }
};

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading } = auth;
  return { email, password, error, loading };
};

export default connect(mapStateToProps, {
  emailChanged, passwordChanged, signin, cleardown
})(Signin);
