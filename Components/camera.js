import React from 'react';
import { Text, View, Image,TextInput,ScrollView} from 'react-native';
import { Camera, Permissions } from 'expo';
import { Entypo, Ionicons,AntDesign} from '@expo/vector-icons';
import { Form, Container, Content, Item, Input, Label , Textarea,Button, Title,Header, Right } from 'native-base';
import FormData from 'form-data';
const axios = require("axios")
// Current Date
const date= new Date().getDate();
const month = new Date().getMonth() + 1;
const year = new Date().getFullYear(); //Current Year
export default class CameraView extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      showPhoto: false,
      hasCameraPermission: null,
      type: Camera.Constants.Type.back,
      fromCam: '',
      name:'',
      zone:'',
      date: date + '/' + month + '/' + year,
    }
  }

 

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  render() {

    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      if(this.state.showPhoto){
          return(
            // <ScrollView>
                   <View style={{flex:1, justifyContent:'center', alignItems:'center'}}> 
                        <Container>
                            <Header>
                              <Title>More Details</Title>
                                <Right>
                                  <Button bordered onPress={()=>this.retake()}>
                                    <Text>Retake</Text>
                                  </Button>
                                </Right>
                            </Header>
                            <Content>
                            <ScrollView>
                              <Form>
                              {/* <Text>montrer image</Text> */}
                              <View style={{justifyContent:'center', alignItems:'center'}}>
                                <Image source={{uri: this.state.fromCam}} style={{width: 300, height: 400}}/>
                              </View>
                              <View style={{justifyContent:'center', alignItems:'center'}}>
                              <Textarea rowSpan={3} bordered value={this.state.fromCam} disabled={true}/>
                              </View>

                              <Item floatingLabel>
                                <Label>Name</Label>
                                <Input onChangeText={(name)=> this.setState({name})}
                                  value={this.state.name}/>
                              </Item>
                              <Item floatingLabel last>
                                <Label>Zone</Label>
                                <Input onChangeText={(zone)=> this.setState({zone})}
                                    value={this.state.zone} />
                              </Item>
                              <Item floatingLabel last>
                                <Label>Date</Label>
                                <Input value={this.state.date}  disabled={true}/>
                              </Item>
                              </Form>
                              <Button block onPress={()=>this.send()}>
                                <Text style={{fontSize:20, color:'#fff'}}>Send To The Server</Text>
                              </Button>
                              </ScrollView>
                          </Content>
                        </Container>
                   </View> 
          );
      }
      return (
        <View style={{flex:1}}>
        <Camera style={{flex: 1}}
                type={this.state.camType}
                ref={ ref =>  this.camera = ref }
            >
            
                <View style={{
                    position: 'absolute',
                    height: 100,
                    width: '100%',
                    bottom:0,
                    flexDirection: 'row',
                }}>
                    <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                        <Ionicons 
                        onPress={() => this.switchCam()}
                            name='md-reverse-camera'
                            size={30}
                            color={'#fff'}
                        
                        />
                    </View>

                    <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                        <Entypo 
                            onPress={() => this.snap()}
                            name='camera'
                            size={45}
                            color={'#fff'}
                        />
                    </View>

                    <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                            <AntDesign 
                                onPress={() => this.viewPhoto()}
                                name='arrowright'
                                size={25}
                                color={'#fff'}
                            />
                    </View>
                    </View>

                </View>
            
            </Camera>
        </View>
    );
    }
  }
  
    snap = async () => {
      if (this.camera) {
        let photo = await this.camera.takePictureAsync({base64: true});
        this.setState({fromCam: photo.uri, showPhoto: true})
      }
    };
    
    retake =  () => {
      this.setState({showPhoto: false})
    };

    switchCam(){
        this.setState({
            camType: this.state.camType === Camera.Constants.Type.back ? 
            Camera.Constants.Type.front : Camera.Constants.Type.back
        })
    }

    send = async ()=>{

        let data = new FormData();
        data.append('image', {
          uri: this.state.fromCam,
          name:"taken.jpg",
          type: `image/jpg`,
          });

        // data.append('file',this.state.fromCam, file.fileName);
        data.append('name', this.state.name);
        data.append('zone', this.state.zone);
        data.append('date', this.state.date);


       const res = await axios.post("http://192.168.1.9:8000/details", data,{
        headers: {
          'accept': 'application/json',
          'Accept-Language': 'en-US,en;q=0.8',
          'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
        }
      })
      .then((res) => {
        alert("Ok")
      }).catch((error) => {
        console.log(error)
      });

    }
}