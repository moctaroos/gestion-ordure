import Login from './Components/login';
import homeGen from './homeGen';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';

const MainNavigator = createSwitchNavigator({

  homeGen: {screen: homeGen},
  Login: {screen: Login},

},
{
  initialRouteName: 'homeGen'
}


);

const App = createAppContainer(MainNavigator);

export default App;

