import React, { Component } from 'react';
import './Post.css';
import firebase from './firebase';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {postID: this.props.postID, sameUser: '', comment: '', numComments: '', comments: [], numLikes: 0};
  }

  componentDidMount () {

    // const currUser = firebase.auth().currentUser;
    // if(currUser != null && currUser.email === this.props.user) {
    //   this.setState({sameUser: true})
    // } else{
    //   this.setState({sameUser: false})
    // }

    if(this.props.currUser !== '' && this.props.currUser === this.props.user) {
      this.setState({sameUser: true})
    } else{
      this.setState({sameUser: false})
    }
    /*console.log("same user?", this.state.sameUser);
    console.log("current user", this.props.currUser);
    console.log("post user", this.props.user);*/

    firebase.database().ref('posts/' + this.state.postID + '/comments').on("value", ((snapshot) => {
      const numComments = snapshot.numChildren();
      //console.log(this.state.postID, numComments);
      this.setState({numComments: numComments});
    }));
    //let likes = this.state.numLikes;
      firebase.database().ref('posts/' + this.state.postID + '/likes').once("value").then((snapshot) => {
      //console.log("likes before for loop", likes);
      snapshot.forEach((childSnapshot) => {
          console.log("snapshotval", childSnapshot.val());
          if(childSnapshot.val() === true) {
            //likes = likes + 1;
            this.setState(prevState => ({
              numLikes: prevState.numLikes + 1
            }));
      
            console.log("numLikes", this.state.numLikes);
            //console.log("likes", likes);
          }
      });
    });
  }
  
  onChange = (text) => {
    this.setState({comment: text.target.value});
  }


  render() {
    return (
      <div id="box indivpost" className="Post">
        <section className="title"><b>{this.props.title} </b>
        <span className="author" >by <i>{this.props.user}</i></span></section>
        <p className="content" id="content">{this.props.content}</p>
        <input onChange={this.onChange} className="text-muted text-left comment" type="text" id="comment" placeholder="Add a comment..."></input>
        <button className="btn btn-outline-primary btn-sm edit" onClick={() =>{
          this.props.addComment(this.state.postID, this.state.comment);
        }}>
        Add Comment</button>
        <button className="btn btn-outline-primary btn-sm edit" onClick={() => {
            {this.props.viewComments(this.state.postID)}
        }}>View {this.state.numComments} Comments</button>


        <button className="btn btn-outline-primary btn-sm edit" onClick={() => {
            {this.props.viewLikes(this.state.postID)}
        }}>{this.state.numLikes} Likes</button>

       {this.state.sameUser ? <button className="btn btn-outline-primary btn-sm edit" onClick={() =>
        {
          this.props.edit(this.state.postID);
        }}>Edit</button> : null }
        
        {this.state.sameUser ? <button className="btn btn-outline-danger btn-sm delete" onClick={() =>
        {
          this.props.deletePost(this.state.postID)
        }}>Delete</button> : null}
        
      </div>
    );
  }
}

export default Post;