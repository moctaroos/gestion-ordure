import React from 'react';
import {View,Text,TextInput,TouchableOpacity,ScrollView,Image} from 'react-native';
import { Header, Title, Right, Button} from 'native-base';
import FormData from 'form-data';
const axios = require("axios")


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
      fetch("http://192.168.1.15:8000/events")
      .then((Response) => Response.json())
      .then ((findresponse)=>
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
               <Text>Add An Event</Text>
            </Button>
       </Right>
      </Header>
                  <View style={{flex: 1,backgroundColor:"#1e272e"}}>
                    {

                    this.state.data.map((valeur, i) => {
                      return(
                        <View key={i}  style={{flex: 1,flexDirection: 'row',justifyContent:"center",alignItems:"center",padding:15}}>
                          <View   style={{width:150, height: 130}}>
                              <Image source={{uri: "https://agroballal.com/public/assets/tpl_front/images/equipe/vide.png"}}  style={{width:150, height: 130}} />
                          </View>
                          <View style={{width: 150, height: 130}}>
                                <Text style={{fontSize:20,color:'#fff'}}>Lieu:{valeur.lieu}</Text>
                                <Text style={{fontSize:20,color:'#fff'}}>Date:{valeur.date}</Text>
                                <Text style={{fontSize:20,color:'#fff'}}>Organi:{valeur.organisateur}</Text>
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
  constructor(props){
      super(props);

      this.state={
        lieu:'',
        date:'',
        organisateur: '',
      }
  }
  
  render(){
    return(
        <ScrollView >
              <View style={{flex: 1,justifyContent: "center", alignItems:"center", backgroundColor:"#535c68"}}>
                <Text style={{fontSize : 35, fontStyle: 'italic', color:'#fff'}}>Add An Event</Text>
                <TextInput 
                      style={{
                        width:'90%',
                        backgroundColor:'#fff',
                        padding:15,
                        marginBottom:10
                    }} 
                      placeholder="Lieu"
                      onChangeText={(lieu)=> this.setState({lieu})}
                      value={this.state.lieu}
                />
                <TextInput 
                      style={{
                        width:'90%',
                        backgroundColor:'#fff',
                        padding:15,
                        marginBottom:10
                    }} 
                      placeholder="JJ/MM/AAAA"
                      onChangeText={(date)=> this.setState({date})}
                      value={this.state.date}
                />
                <TextInput 
                      style={{
                        width:'90%',
                        backgroundColor:'#fff',
                        padding:15,
                        marginBottom:10
                    }} 
                      placeholder="Organisateur"
                      onChangeText={(organisateur)=> this.setState({organisateur})}
                      value={this.state.organisateur}
                />
                {/* <TextInput 
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
                /> */}
                <TouchableOpacity 
                                      style={{  backgroundColor:'#c0392b',
                                      padding:15,
                                      width:'90%'}}
                                      onPress={()=>this.add()}
                >
                                      <Text style={{fontSize:18,
                                        textAlign:'center'}}>Add</Text>
                </TouchableOpacity>
              </View>
          </ScrollView>

    )
  }
    add = () => {

          fetch('http://192.168.1.15:9000/events', {
              method:'POST',
              headers:{
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
              },
                  body: JSON.stringify({
                  lieu: this.state.lieu,
                  date: this.state.date,
                  organisateur: this.state.organisateur,
              })
          })
          
          .then((response) => response.json())
          .then((res) => {
              if(res.success){
                alert('successfully added');
              }else{
                  alert(res.message);
              }

          })
          .done();
    }
}



import {createStackNavigator, createAppContainer} from 'react-navigation';

const MainNavigator = createStackNavigator({
  Events: {screen: Events},
  AddEvent: {screen: AddEvent},
});

const App = createAppContainer(MainNavigator);

export default App;