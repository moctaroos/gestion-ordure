import Login from './Components/login';
import SignUp from './Components/SignUp';
import homeGen from './homeGen';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';

const MainNavigator = createSwitchNavigator({

  homeGen: {screen: homeGen},
  Login: {screen: Login},
  SignUp: {screen: SignUp}

},
{
  initialRouteName: 'Login'
}


);

const App = createAppContainer(MainNavigator);

export default App;

