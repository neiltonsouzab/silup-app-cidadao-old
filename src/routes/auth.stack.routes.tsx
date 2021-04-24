import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../pages/Home';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import CheckCode from '../pages/CheckCode';

const AuthStack = createStackNavigator();

const AuthStackRoutes: React.FC = () => (
  <AuthStack.Navigator
    initialRouteName="Home"
    screenOptions={{
      headerShown: false,
    }}
  >
    <AuthStack.Screen name="Home" component={Home} />
    <AuthStack.Screen name="SignIn" component={SignIn} />
    <AuthStack.Screen name="SignUp" component={SignUp} />
    <AuthStack.Screen name="CheckCode" component={CheckCode} />
  </AuthStack.Navigator>
);

export default AuthStackRoutes;
