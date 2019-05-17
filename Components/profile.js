
import React from 'react';
import { Text, View,AsyncStorage,TouchableOpacity } from 'react-native';

export default class Profile extends React.Component {
  constructor(props){
    super(props);
  }

  static navigationOptions = {
    header: null
  };

    render() {
      return (
        <View style={{
          flex: 1,
          backgroundColor: '#F3FCFF',
          justifyContent: 'center',
        }}>
          <Text style={{
            fontSize: 20,
            textAlign: 'center',
            backgroundColor: '#F5FCFF',
            padding: 10
          }}>Profile!</Text>
          <TouchableOpacity style={{
                justifyContent: 'center',
                flexDirection : 'row',
                backgroundColor: '#428AF8',
                alignItems : 'center',
                marginLeft: 15,
                marginRight: 15,
                padding: 10}}
                onPress={this._logout}
                >

                  <Text style={{
                    color: '#ffffff',
                    fontWeight: '700',
                  }}>LOG OUT</Text>

              </TouchableOpacity>
      
        </View>
      );
    }

    _logout = async () => {
      // await AsyncStorage.clear();
      await AsyncStorage.getAllKeys().then(AsyncStorage.multiRemove);
      this.props.navigation.navigate("Login");
    }
  }