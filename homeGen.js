import Home from './Components/home';
import CameraView from './Components/camera';
import Events from './Components/events';
import Profile from './Components/profile';
import {createBottomTabNavigator, createAppContainer} from 'react-navigation';

const MainNavigator = createBottomTabNavigator({
  Home :  Home,
  Camera:CameraView,
  Events:Events,
  Profile:Profile,
},
{
  initialRouteName: 'Home'
},
);

const homeGen = createAppContainer(MainNavigator);

export default homeGen;


