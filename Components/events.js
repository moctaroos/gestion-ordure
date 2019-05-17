import React from 'react';
import {View,Text,TextInput,TouchableOpacity,ScrollView,Image} from 'react-native';
import { Header, Title, Right, Button} from 'native-base';

class Events extends React.Component{
  constructor(){
    super();
      this.state = {
        data: [],
        available: false
        }
    }

    componentDidMount() 
    {
      fetch("http://192.168.1.9:8000/events").
        then((Response) => Response.json()).
          then ((findresponse)=>
            {
              this.setState({
                data: findresponse.data, available: true
                  });
     
            }) 
    }

  render(){
    return(

      <ScrollView >
      <View style={{flex: 1}}>
      <Header>
        <Right>
            <Button bordered onPress={()=>{this.props.navigation.navigate("AddEvent")}}>
               <Text>ADD EVENT</Text>
            </Button>
       </Right>
      </Header>
                  <View style={{flex: 1,backgroundColor:"#535c68"}}>
                    {

                    this.state.data.map((valeur, i) => {
                      return(
                        <View key={i}  style={{flex: 1,flexDirection: 'row',justifyContent:"center",alignItems:"center",padding:15}}>
                          <View   style={{width:150, height: 130}}>
                              <Image source={{uri: "http://192.168.1.9:8000/1557768424252-taken.jpg"}}  style={{width:150, height: 130}} />
                          </View>
                          <View style={{width: 150, height: 130}}>
                                <Text style={{fontSize:20,color:'#fff'}}>{valeur.lieu}</Text>
                                <Text style={{fontSize:20,color:'#fff'}}>{valeur.date}</Text>
                                <Text style={{fontSize:20,color:'#fff'}}>{valeur.organisateur}</Text>
                                <Text style={{fontSize:20,color:'#fff'}}>{valeur.status}</Text>
                          </View>
                        </View>
                        );
                    })
                    }
                </View>
     </View>
     </ScrollView>
    )
  }
}



class AddEvent extends React.Component{
  render(){
    return(
        <ScrollView >
              <View style={{flex: 1,justifyContent: "center", alignItems:"center", backgroundColor:"#535c68"}}>
                <Text style={{fontSize : 35, fontStyle: 'italic', color:'#fff'}}>ADD EVENT</Text>
                <TextInput 
                      style={{
                        width:'90%',
                        backgroundColor:'#fff',
                        padding:15,
                        marginBottom:10
                    }} 
                      placeholder="Lieu"
                />
                <TextInput 
                      style={{
                        width:'90%',
                        backgroundColor:'#fff',
                        padding:15,
                        marginBottom:10
                    }} 
                      placeholder="JJ/MM/AAAA"
                />
                <TextInput 
                      style={{
                        width:'90%',
                        backgroundColor:'#fff',
                        padding:15,
                        marginBottom:10
                    }} 
                      placeholder="Organisateur"
                />
                <TextInput 
                      style={{
                        width:'90%',
                        backgroundColor:'#fff',
                        padding:15,
                        marginBottom:10
                    }} 
                      placeholder="Photo"
                />
                <TextInput 
                      style={{
                        width:'90%',
                        backgroundColor:'#fff',
                        padding:15,
                        marginBottom:10
                    }} 
                      placeholder="Status = 'Passer' or 'En Cours' or 'Annuler'"
                />
                <TouchableOpacity 
                                      style={{  backgroundColor:'#c0392b',
                                      padding:15,
                                      width:'90%'}}
                                      onPress={()=> alert('Event Added')}
                >
                                      <Text style={{fontSize:18,
                                        textAlign:'center'}}>Add Event</Text>
                </TouchableOpacity>
              </View>
          </ScrollView>

    )
  }
}



import {createStackNavigator, createAppContainer} from 'react-navigation';

const MainNavigator = createStackNavigator({
  Events: {screen: Events},
  AddEvent: {screen: AddEvent},
});

const App = createAppContainer(MainNavigator);

export default App;