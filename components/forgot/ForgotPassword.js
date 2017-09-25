import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { emailChanged, forgotPassword, cleanup } from '../../actions/forgot';
import { Card, CardSection, Input, Button, Spinner, ImageView } from '../common';
import params from '../../auth0-params.json';

class ForgotPassword extends Component {

  componentWillMount() {
    this.props.cleanup();
  }

  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onButtonPress() {
    const { email, password } = this.props;
    this.props.forgotPassword({ email });
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }

    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        Send
      </Button>
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

          <Text style={styles.errorTextStyle}>
            {this.props.error}
          </Text>

          <Text style={styles.messageTextStyle}>
            {this.props.message}
          </Text>

          <CardSection>
            {this.renderButton()}
          </CardSection>
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
  },
  messageTextStyle: {
    fontSize: 14,
    alignSelf: 'center',
    color: 'green'
  }
};

const mapStateToProps = ({ forgot }) => {
  const { email, error, loading, message } = forgot;
  return { email, error, loading, message };
};

export default connect(mapStateToProps, {
  emailChanged, forgotPassword, cleanup
})(ForgotPassword);
