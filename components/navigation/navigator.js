import * as React from 'react';
import { Button, View } from 'react-native';
import {DrawerItemList, createDrawerNavigator,DrawerItem ,DrawerContentScrollView} from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import UserScreen from '../../pages/userscreen'
import HomeScreen from '../../pages/homescreen';
import SingInScreen from '../../pages/signinscreen';
import SingUpScreen from '../../pages/signupscreen';
import {connect} from "react-redux"
import {auth} from "../../firebase/firebase.utils"
import {adduser} from "../../redux/user"
const Drawer = createDrawerNavigator();
 function Navigator({add,user}) {
  
React.useEffect(() => {
  auth.onAuthStateChanged(function(user) {
    if (user) {
    // console.log(user)
   
      // User is signed in.
      add({email:user.email,name:user.displayName})
    } else {
      add()
      // No user is signed in.
    }
  });
}, [])
  
  
  
 


 
    function CustomDrawerContent(props) {
      return (
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />
          <DrawerItem label="Log out" onPress={() =>{ auth.signOut()
          add()
          
          
          }} />
        </DrawerContentScrollView>
      );
    }    


    return( <NavigationContainer>

{user?(
 <Drawer.Navigator
 drawerContent={props => <CustomDrawerContent {...props} />}
 initialRouteName="User Page">
 <Drawer.Screen name="User Page" component={UserScreen}/>
</Drawer.Navigator>

):(
 <Drawer.Navigator initialRouteName="Sign In" >

 <Drawer.Screen name="Sign Up" component={SingUpScreen} style={{marginTop:50}}/>
 <Drawer.Screen name="Sign In" component={SingInScreen} />
</Drawer.Navigator>





)}

       
      </NavigationContainer>)
}

const d=dispatch=>({
  add:(p)=>dispatch(adduser(p))
})

const s=state=>({
  user:state.user.user
})

export default connect(s,d)(Navigator)