import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import NotificationList from '../pages/Notification/List';
import NotificationCreateCreated from '../pages/Notification/Create/Created';
import NotificationCreateSelectLocation from '../pages/Notification/Create/SelectLocation';
import NotificationCreateSearchLocation from '../pages/Notification/Create/SearchLocation';
import NotificationCreateSelectTypeAndImage from '../pages/Notification/Create/SelectTypeAndImage';

import Header from '../components/Header';
import App from '../App';

const AppStack = createStackNavigator();

const AppStackRoutes: React.FC = () => (
  <AppStack.Navigator
    initialRouteName="NotificationList"
    screenOptions={{
      headerShown: false,
    }}
  >
    <AppStack.Screen name="NotificationList" component={NotificationList} />

    <AppStack.Screen
      options={{
        headerShown: true,
        header: () => <Header title="Informe a localização do problema" />,
      }}
      initialParams={undefined}
      name="NotificationCreateSelectLocation"
      component={NotificationCreateSelectLocation}
    />

    <AppStack.Screen
      options={{
        headerShown: true,
        header: () => <Header title="Pesquise a localização do problema" />,
      }}
      name="NotificationCreateSearchLocation"
      component={NotificationCreateSearchLocation}
    />

    <AppStack.Screen
      name="NotificationCreateSelectTypeAndImage"
      component={NotificationCreateSelectTypeAndImage}
    />

    <AppStack.Screen
      name="NotificationCreateCreated"
      component={NotificationCreateCreated}
    />
  </AppStack.Navigator>
);

export default AppStackRoutes;
