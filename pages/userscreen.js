import * as React from 'react';
import {ActivityIndicator,View,Button,Dimensions,Image} from 'react-native'
import { Feather,Entypo , MaterialIcons} from '@expo/vector-icons'; 
import { auth } from "../firebase/firebase.utils"
import firebase from "../firebase/firebase.utils"
import {connect } from "react-redux"
import { showcomment,updateItem } from '../redux/Card'
import Cards from "../components/postcard/postcard"
import SetPP from "../components/ppsetter/userselect"
import CommentView from '../components/commentview/comments'
function UserScreen({ navigation,user}) {
  const [open,setopen]=React.useState(false)
  const windowWidth = Dimensions.get('window').width;
  let pp;
  const deneme = async () => {
    let userUid = await auth.currentUser.uid
    firebase.firestore().collection("users").doc(`${userUid}`).get().then(doc => 
        //getting user photoURL 
        pp = doc.data().photoURL)
  }
  deneme();
    return (<View style={{ flex: 1, }}>
            <View style={{height:50,backgroundColor:"white", display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center",padding:14}}>
                <Feather as={Button} onPress={() => navigation.openDrawer()} height={14}  name="menu" size={24} color="black" />
                <Entypo name="new-message" size={24} color="black" onPress={()=>setopen(true)}/>
            </View>
            <SetPP open={open} setopen={setopen}></SetPP>
            
        </View>)
    }
const s = state => ({
    user:state.user.user
})
export default connect(s)(UserScreen);