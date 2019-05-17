import React, { Component } from 'react';
import { Container, Header, Content, Button, Text } from 'native-base';
export default class Logout extends Component {
  render() {
    return (
      <Container>
        <Header />
        <Content>
          <Button block onPress={()=>this.props.navigation.navigate("Login")}>
            <Text>Se Deconnecter</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}