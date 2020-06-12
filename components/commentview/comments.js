import React from 'react';
import { StyleSheet, Text, View ,  Modal,TouchableHighlight,Image,Dimensions,TouchableOpacity} from 'react-native';
import { Title,Subheading ,Caption,Paragraph,Button} from 'react-native-paper';
import { Avatar, Card, IconButton,TextInput } from 'react-native-paper';
import profile from "../../assets/profil.png"
import ImageViewer from 'react-native-image-zoom-viewer';
import GallerySwiper from "react-native-gallery-swiper";
import Header from "../postcard/imageHeader"
import Footer from "../postcard/imagef"
import ImageView from "react-native-image-viewing";
import {connect } from "react-redux"
import moment from "moment"
import { firestore } from '../../firebase/firebase.utils';
import {showcomment} from '../../redux/Card'


function CommentView  ({post}) {
    const windowWidth = Dimensions.get('window').width;
    const [visible, setIsVisible] = React.useState(false);
    
    if(post.comment){
        return(
            <View>
                {post.comment.map(com => <Text>{com.comment}</Text>)}
            </View>
        )

    }else{
        return(null)
    }
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
export default CommentView;