import React from 'react';
import { Text, StyleSheet, View, TextInput,TouchableOpacity,Image,AsyncStorage} from 'react-native'

export default class Login extends  React.Component{
    constructor(props){
        super(props)
        this.state={
            username : '',
            password : ''
        }
    }
    render(){
        return(
            <View style={styles.container}>
                {/* <Text style={styles.baseText}>Login To My App</Text> */}
                <Image
                style={{width: 250, height: 50, marginBottom:20}}
                source={{uri: 'https://www.loginbusiness.com/wp-content/uploads/2018/06/login-logo-web-transparent.png'}}
                />
                <TextInput 
                style={styles.textInput} 
                placeholder="Username"
                onChangeText={(username)=> this.setState({username})}
                value={this.state.username}
                />
                <TextInput 
                style={styles.textInput} 
                placeholder="Password"
                secureTextEntry
                onChangeText={(password)=> this.setState({password})}
                value={this.state.password}
                />
               
               <View style={styles.btnContainer}>
                        <TouchableOpacity 
                            style={styles.btn}
                            onPress={this.login}
                        >
                                <Text style={styles.btntxt}>Login</Text>
                            </TouchableOpacity >
                             
                            <TouchableOpacity 
                                style={styles.btn}
                                onPress={()=>this.props.navigation.navigate("SignUp")}
                            >
                                <Text style={styles.btntxt}>SignUp</Text>
                        </TouchableOpacity>
                </View>
                   
            </View>
        );
    }


    login = () => {

            fetch('http://192.168.1.15:9000/users', {
                method:'POST',
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                    body: JSON.stringify({
                    username: this.state.username,
                    password: this.state.password,
                })
            })
            
            .then((response) => response.json())
            .then((res) => {
                if(res.success){
                this.props.navigation.navigate("homeGen");
                }else{
                    alert(res.message);
                }

            })
            .done();

            
        
    }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#1e90ff',
      justifyContent: 'center',
      alignItems:'center'
    },
    baseText:{
        fontSize: 30,
        textAlign:'center',
        margin:10,
        color:'#fff'
    },
    textInput:{
        width:'90%',
        backgroundColor:'#fff',
        padding:15,
        marginBottom:10
    },
    btn:{
        backgroundColor:'#FFD700',
        padding:15,
        width:'45%'
    },
    btnContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        width:'90%'
    },
    btntxt:{
        fontSize:18,
        textAlign:'center'
    }
  });