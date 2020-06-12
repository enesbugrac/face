import * as React from 'react';
import {ActivityIndicator,View,Button,ScrollView} from 'react-native'
import { Feather,Entypo , MaterialIcons} from '@expo/vector-icons'; 
import { firestore} from "../firebase/firebase.utils"
import {connect } from "react-redux"
import { showcomment,updateItem } from '../redux/Card'
import Cards from "../components/postcard/postcard"
import Postit from "../components/postcard/postit"
import CommentView from '../components/commentview/comments'
function HomeScreen({ navigation,posts,isComment,setFocus,commentPost,u }) {
  const [loading,setloading]=React.useState(false)
  const usingItem = posts.find(item => item.id === commentPost)
  React.useEffect(() => {
    let a;
    a=firestore.collection("Posts")
    .onSnapshot({ includeMetadataChanges: false},function(snapshot) {
      let Array=[]
    
      setloading(true)
      snapshot.docChanges().forEach(function(change) {
            if (change.type === "added") {
                u({props:change.doc.data(),type:"added"})
               
                
            }
            if (change.type === "modified") {
                u({props:change.doc.data(),type:"modified"})
            }
            if (change.type === "removed") {
                u({props:change.doc.data(),type:"removed"})
            }
      });
    setloading(false)
    }, function(error) {
        //...
    });
   return () => {
        a()
    }
  }, [])



  const [open,setopen]=React.useState(false)
  const [postss,setPosts] = React.useState(posts)
  //console.log(open)
    return (
      isComment ? (<View style={{ flex: 1, }}>
            <View style={{height:50,backgroundColor:"white", display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center",padding:14}}>
            <Feather as={Button} onPress={() => navigation.openDrawer()} height={14}  name="menu" size={24} color="black" />
            <MaterialIcons name="cancel" size={24} color="black" onPress={()=>setFocus(false , 0)}/>
            </View>
            {loading?(<ActivityIndicator size="large" color="#0000ff" />):(

              <ScrollView>
                <CommentView post={usingItem}/>
              </ScrollView>
  
              )}
           
      </View>)
      :
     (<View style={{ flex: 1, }}>
        <View style={{height:50,backgroundColor:"white", display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center",padding:14}}>
            <Feather as={Button} onPress={() => navigation.openDrawer()} height={14}  name="menu" size={24} color="black" />
            <Entypo name="new-message" size={24} color="black" onPress={()=>setopen(true)}/>
        </View>
        <Postit open={open} setopen={setopen}></Postit>
            {loading?(<ActivityIndicator size="large" color="#0000ff" />):(

            <ScrollView>
              {posts.map(item=><Cards email={item.email} key={item.id} image={item.imgUrl} post={item.post} id={item.id} time={item.createdAt} name={item.name} likes={item.like} comment={item.comment}></Cards>)}
            </ScrollView>

            )}
      </View>)
    );
  }
const s=state=>({
  posts:state.cart.cartItems,
  isComment:state.cart.commentFocus,
  commentPost:state.cart.postId
})
const d=dispatch=>({
  setFocus:(payload,payload2) => dispatch(showcomment(payload,payload2)),
  u :(payload) => dispatch(updateItem(payload))
})
export default connect(s,d)(HomeScreen);