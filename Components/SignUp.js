// SignUp.js
import React from 'react'
import {
  View,
  Button,
  TextInput,
  StyleSheet
} from 'react-native'

export default class SignUp extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      username: '',
      password: '',
      email: '',
      phone_number: ''
    }
  }
  // onChangeText = (key, val) => {
  //   this.setState({ [key]: val })
  // }
  // signUp = async () => {
  //   const { username, password, email, phone_number } = this.state
  //   try {
  //     // here place your signup logic
  //     console.log('user successfully signed up!: ', success)
  //   } catch (err) {
  //     console.log('error signing up: ', err)
  //   }
  // }
 
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder='Username'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={(username)=> this.setState({username})}
          value={this.state.username}
        />
        <TextInput
          style={styles.input}
          placeholder='Password'
          secureTextEntry={true}
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={(password)=> this.setState({password})}
          value={this.state.password}
        />
        <TextInput
          style={styles.input}
          placeholder='Email'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={(email)=> this.setState({email})}
          value={this.state.email}
        />
        <TextInput
          style={styles.input}
          placeholder='Phone Number'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={(phone_number)=> this.setState({phone_number})}
          value={this.state.phone_number}
        />
        <Button
          color="#000"
          title='Sign Up'
          onPress={this.signUp}
        />
        <Button
          color="#000"
          title='Return to login'
          onPress={()=> this.props.navigation.navigate("Login")}
        />
      </View>
    )
  }

  signUp = () => {
          fetch('http://192.168.1.15:9000/signup', {
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
                body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
                email: this.state.email,
                phone_number: this.state.phone_number,
            })
        })
        .then((response) => response.json())
        .then((res) => {
          alert("send successfully")
        }).catch((error) => {
          console.log(error)
        });
  
  }
}

const styles = StyleSheet.create({
  input: {
    width: 350,
    height: 55,
    backgroundColor: '#42A5F5',
    margin: 10,
    padding: 8,
    color: 'white',
    borderRadius: 14,
    fontSize: 18,
    fontWeight: '500',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})