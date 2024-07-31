import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProductsScreen from '.';

export default function BottomNav() {
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={ProductsScreen} />
            <Tab.Screen name="Settings" component={ProductsScreen} />
        </Tab.Navigator>)
}