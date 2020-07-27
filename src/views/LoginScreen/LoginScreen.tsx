import React, { Component } from 'react';
import Logo from './Logo';
import Form from './Form';
import Wallpaper from './Wallpaper';
import ButtonSubmit from './ButtonSubmit';
import SignupSection from './SignupSection';

interface Props {
  navigation: any
}

interface State {
  login: String,
  password: String,
}

export class LoginScreen extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      password: '',
    }
  }

  render() {
    return (
      <Wallpaper>
        <Logo />
        <Form onChangeLoginText={this.onChangeLoginText} onChangePasswordText={this.onChangePasswordText} />
        <SignupSection />
        <ButtonSubmit login={this.state.login} password={this.state.password} navigation={this.props.navigation} />
      </Wallpaper>
    );
  }

  onChangeLoginText = (text) => {
    this.setState({ login: text });
  }

  onChangePasswordText = (text) => {
    this.setState({ password: text });
  }
}
