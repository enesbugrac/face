import React from 'react';
import { StyleSheet, Text, View ,  Modal,TouchableHighlight,Image,Dimensions,TouchableOpacity} from 'react-native';
import { Title,Subheading ,Caption,Paragraph,Button} from 'react-native-paper';
import { Avatar, Card, IconButton,TextInput } from 'react-native-paper';
import profile from "../../assets/profil.png"
import ImageViewer from 'react-native-image-zoom-viewer';
import GallerySwiper from "react-native-gallery-swiper";
import Header from "./imageHeader"
import Footer from "./imagef"
import ImageView from "react-native-image-viewing";
import {connect } from "react-redux"
import moment from "moment"
import { firestore } from '../../firebase/firebase.utils';
import {showcomment} from '../../redux/Card'



function App({name,time,image,id,email,user,post,likes,comment,setFocus}) {

  const windowWidth = Dimensions.get('window').width;
  
const [imagess,setimages]=React.useState([])
const [likess,setLikes]=React.useState(likes)
const [commentt,setComment]=React.useState(comment)






React.useEffect(() => {
const newimg=[]

     image.map(item=>
       newimg.push({uri:item,
      })
    )
    
    setimages(newimg)
}, [])


const likeIt =async () => {
  var existingMail = false;
  const newlikes = []
  likess.map(emailUser => {
    if(user.email === emailUser){
      existingMail = true;
    }
    newlikes.push(emailUser)
  })
  if(existingMail == false){
  const nemail =  user.email
  newlikes.push(nemail)
  setLikes([...likess, nemail])
  firestore
  .collection("Posts")
  .doc(`${id}`)
  .set({
  like: newlikes,
  },{ merge: true }
 );
  }
  
}
const handleChange = event => {
  const textcomment = 
    {
      name:user.email,
      comment:event.nativeEvent.text
    }
  setComment([...commentt,textcomment])
}
const handleComment = () => {
  firestore
  .collection("Posts")
  .doc(`${id}`)
  .set({
  like: likes,
  comment:commentt,
  name: name,
  post:post,
  imgUrl:image,
  id:id,
  createdAt:id
  ,email:email
  }
 );
}
 
const del=()=>{
  firestore.collection("Posts").doc(`${id}`).delete().then(function() {
    console.log("Document successfully deleted!");
}).catch(function(error) {
    console.error("Error removing document: ", error);
});
  


}

const [visible, setIsVisible] = React.useState(false);
 
  return (
    (imagess?(
  <View style={{width:"100%",backgroundColor:"white",marginTop:40}}>
      <Card.Title
    title={name}
    subtitle={moment(time).fromNow()}
    left={(props) => <Avatar.Image size={40} source={profile} />}
    right={(props) => user.email===email&&<IconButton {...props} icon="delete" onPress={del} />}
  />
        
  <View style={{width:"95%",alignSelf:"center",marginTop:20,marginBottom:20}}>
  <Paragraph>{post}</Paragraph>
  <View flexDirection='row' alignItems='center' justifyContent='center'>
  <Button onPress = {likeIt}>
    Like
  </Button>
  <Text>{likess.length}</Text>
  <Button onPress={() => setFocus(true,id)}>Show Comments</Button>
  </View>
  <View>
    <TextInput placeholder='enter comment' value={commentt} onChange={handleChange}/>
    <Button onPress={handleComment}>Comment</Button>
  </View>
  </View>
 {imagess.length?(
 <TouchableOpacity  onPress={()=>setIsVisible(true)} style={{height:windowWidth*3/4}}>

<Image source={{uri:imagess[0].uri}} style={{width:windowWidth,height:windowWidth*3/4}} onPress={()=>console.log("n")}></Image>

 <ImageView
 
  images={imagess}
  imageIndex={0}
  visible={visible}
  onRequestClose={() => setIsVisible(false)}
  
  FooterComponent={({ imageIndex }) => (
    <Footer imageIndex={imageIndex} imagesCount={imagess.length} />
  )}
/>
</TouchableOpacity> 


 ):(null)}
 
      </View>

):(<ActivityIndicator size="large" color="#0000ff" />)

    )
      
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    width:"80%",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});
const d=dispatch=>({
  setFocus:(payload,payload2) => dispatch(showcomment(payload,payload2))
})
const s=state=>({
  user:state.user.user
})
export default connect(s,d)(React.memo(App));