import React from 'react';
import { Animated,StyleSheet, Text, View ,  Modal,TouchableHighlight,Alert,ActivityIndicator} from 'react-native';
import { Title,Subheading ,Caption,Paragraph,Button,Divider} from 'react-native-paper';
import { Avatar, Card, IconButton,TextInput } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import {connect} from "react-redux"
import firebase from "../../firebase/firebase.utils"
import {firestore} from "../../firebase/firebase.utils"














function App({open,setopen,user}) {
    const [ımgarray,setımg]=React.useState([])
   const[post,setpost]=React.useState("")
   const[loading,setloading]=React.useState(false)
  
    const uploadImage = async () => {

        setloading(true)
if(ımgarray){

    try {

      let Down=[]

      console.log("b")
      await Promise.all(
       
      
        ımgarray.map(async item => {
          console.log(item)
          console.log("baştaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")

          let result = await fetch(item);

          result = await result.blob();

          const number=Date.now()

          var ref = firebase.storage().ref().child(`images/${number}`);
        await ref.put(result)


       const url=   await ref.getDownloadURL()
              // Insert url into an <img> tag to "download"

       Down.push(url)



        })






      );

      const number2=Date.now()
      firestore.collection("Posts").doc(`${number2}`).set({
        name: user.name,
        post:post,
      imgUrl:Down,
      id:number2,
      like:[],
      comment:[],
      createdAt:number2
      ,email:user.email
      })
      .then(function() {
        Alert.alert("successfully!");
        
        setımg([])
        setloading(false)
        setopen(false)
      })
      .catch(function(error) {
        Alert.alert("Error writing document: ");
        setloading(false)
      });



    
    } catch (e) {
        Alert.alert(JSON.stringify(e.message))
        setloading(false)
    }
          



}else{
    const number=Date.now()
    firestore.collection("Posts").doc(`${number}`).set({
        name: user.name,
        post:post,
        imgUrl:"",
        like:[],
        comment:[],
        id:number,
        createdAt:number,
        email:user.email
    })
    .then(function() {
        Alert.alert("successfully!");
        
        setloading(false)
        setopen(false)
    })
    .catch(function(error) {
        Alert.alert("Error writing document: ");
        setloading(false)
    });


}

  
      }
    
    const pickImage = async () => {
        const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Sorry, we need camera roll permissions to make this work!');
        }else{

            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
              });
          
       
          
              if (!result.cancelled) {
                console.log(ımgarray)
setımg([...ımgarray,result.uri] )
               
              }


        }
   
       
      };


console.log(ımgarray)
console.log("bak")


  return (
    <View style={styles.container}>

<Modal
        animationType="slide"
        transparent={true}
        visible={open}
       
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          
          <AntDesign name="closecircleo" size={34} color="red" style={{position:"absolute",top:10,right:10}} onPress={()=>{setopen(false)
        setloading(false)
        }}/>
            <Title style={styles.modalText}>Post Something !</Title>
           
            <TextInput
            multiline
value          
            style={{width:"100%",marginBottom:40,maxHeight:200,marginTop:40}}
        label='Write Something'
        value={post}
        onChangeText={text => setpost(text)}
      
      />


{loading?(<ActivityIndicator size="large" color="#0000ff" />):(
    <View style={{display:"flex",flexDirection:"row",justifyContent:"space-between",width:"100%"}}>
<Button color="#1877F2" icon="camera" mode="contained" onPress={pickImage}>
    {ımgarray.length>0?"more":"Image"}
  </Button>
  <Button color="#1877F2" icon="share" mode="contained" onPress={uploadImage}>
    Post it!
  </Button>
  </View>
  )}








           
          </View>
        </View>
      </Modal>









    
     
    </View>
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
const s=state=>({
    user:state.user.user
})

export default connect(s)(App)