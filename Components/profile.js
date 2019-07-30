
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
                backgroundColor: '#FFD700',
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

// import React, { Component } from 'react';
// import { View, Text,ScrollView} from 'react-native';

// class Profile extends Component {
//   constructor(){
//     super();
//       this.state = {
//         data: [],
//         available: false
//         }
//     }

//     componentDidMount() 
//     {
//       fetch("http://192.168.1.15:9000/signup").
//         then((Response) => Response.json()).
//           then ((findresponse)=>
//             {
//               this.setState({
//                 data: findresponse.data, available: true
//                   });
     
//             }) 
//     }

//     render() 
//     {
//       return(
//         <ScrollView >
//         <View style={{flex: 1, backgroundColor:"#1e272e"}}>
//                 <View  style={{ flex:1, justifyContent:'center', alignItems:'center'}}>
//                   {

//                   this.state.data.map((valeur, i) => {
//                     return(
                     
//                       <View key={i} style={{padding: 20}}>
//                           <Text style={{fontSize:20,color:'#fff'}}>Email:{valeur.email}</Text>
//                           <Text style={{fontSize:20,color:'#fff'}}>Password:{valeur.password}</Text>
//                       </View>
//                       );
//                   })

        
//                   }
//                 </View>
//         </View>
//         </ScrollView>
//         )
//     }
// }

// export default Profile;