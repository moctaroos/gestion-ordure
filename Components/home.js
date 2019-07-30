import React, { Component } from 'react';
import { View, Text,Image,ScrollView,Textarea} from 'react-native';
import { Header, Title} from 'native-base';
let local = "http://192.168.1.15:9000/"
class Home extends Component {
  constructor(){
    super();
      this.state = {
        data: [],
        available: false
        }
    }

    componentDidMount() 
    {
      fetch("http://192.168.1.15:9000/details").
        then((Response) => Response.json()).
          then ((findresponse)=>
            {
              this.setState({
                data: findresponse.data, available: true
                  });
     
            }) 
    }

    render() 
    {
      return(
        <ScrollView >
        <View style={{flex: 1, backgroundColor:"#1e272e"}}>
        <Header />
                <View  style={{ flex:1, justifyContent:'center', alignItems:'center'}}>
                  {

                  this.state.data.map((valeur, i) => {
                    return(
                     
                      <View key={i} style={{padding: 20}}>
                          <Image source={{uri: local+valeur.uri}}  style={{width:150, height: 130}} />
                          <Text style={{fontSize:20,color:'#fff'}}>Nom:{valeur.name}</Text>
                          <Text style={{fontSize:20,color:'#fff'}}>Zone:{valeur.zone}</Text>
                          <Text style={{fontSize:20,color:'#fff'}}>Date:{valeur.date}</Text>
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

export default Home;