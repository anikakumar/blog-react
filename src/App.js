import React, { Component } from 'react';
import './App.css';
import Login from './Login';
import Register from './Register';
import Post from './Post';
import NewPost from './NewPost';
import firebase from './firebase';
import fire from './firebase';
import Suggestions from './Suggestions';
import Autosuggest from 'react-autosuggest';
import Search from './Search';
import Likes from './Likes';

class App extends Component {
 //fire = firebase.database();
  constructor() {
    super();
    this.state = {account: '', loggedin: '', posts: [], value: '', titles: [], uid: ''};


  }

  register = (email, password) => {

   /* firebase.database().ref('users/' + user).on('value', function(snapshot) {
      if(snapshot.exists()) {
        console.log("username taken");
      } else {
        console.log("username availale");
        firebase.database().ref('users/' + user).set({
          username: user, 
          password: pass
        });
        console.log("registered with username: " + user + ", and password: " + pass);
        //this.setState({account: user});
      }
      });
      */
      let success = true;
     firebase.auth().createUserWithEmailAndPassword(email, password).catch((error) => {
        // Handle Errors here.
        success = false;
        const errorCode = error.code;
        const errorMessage = error.message;
        if(errorCode === 'auth/email-already-in-use') {
          alert('This email is already registered');
        } else {
          alert(errorMessage);
          console.log(errorMessage)
        }
        this.loggedinState();
      });
      if(success === true) {
      this.accountState(email);
      }
      let query = firebase.database().ref('posts/').orderByKey();
    query.once("value")
    .then((snapshot) => {
      
    snapshot.forEach((childSnapshot) => {
      //let key = childSnapshot.key; // unique key for each post
      //console.log("key", childSnapshot.key);
      // childData will be the actual contents of the child
      //let childData = childSnapshot.val();
      // author = chilData.author...
      //console.log("childData", childData.author);
      //console.log("pre firebase:", this);
      this.setState({posts: [...this.state.posts, childSnapshot]});
      //console.log(childSnapshot.val().author);
      });
    });  
  }

  deletePost = (postID) => {
    firebase.database().ref('posts/' + postID).remove();

    this.setState({posts: []});
    let query = firebase.database().ref('posts/').orderByKey();
    query.once("value")
    .then((snapshot) => {
      
    snapshot.forEach((childSnapshot) => {
      //let key = childSnapshot.key; // unique key for each post
      //console.log("key", childSnapshot.key);
      // childData will be the actual contents of the child
      //let childData = childSnapshot.val();
      // author = chilData.author...
      //console.log("childData", childData.author);
      //console.log("pre firebase:", this);
      this.setState({posts: [...this.state.posts, childSnapshot]});
      //console.log(childSnapshot.val().author);
      });
    });  
  }

  loggedinState = () =>  {
    this.setState({loggedin: false});
  }

  accountState = (user) => {
    console.log(user);
    this.setState({account: user});
    this.setState({loggedin: true});
    console.log(this.state.account);
    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        const uid = firebase.auth().currentUser.uid;
        this.setState({uid: uid});
      } else {}
    });
  }

  checkLogin  = async (email, password) => {
    console.log("check login", email);
    // let loggedin = false;
    /*firebase.database().ref('users/' + user + '/password').on('value', function(snapshot) {
      if(password === snapshot.val()) {
        console.log(user + " is logged in");
       // loggedin = true;
        // console.log(this.state.account);
       self.accountState(user);
       //this.setState({account: user});

      } else {
        console.log("username or password is incorrect, try again");
      }
    }); */
    /*
    console.log(loggedin);
    if(loggedin) {
      this.accountState(user);
      console.log("account: " + this.state.account);
    }
    */
    let success = true;
    //console.log("pre firebase:", this);
    await firebase.auth().signInWithEmailAndPassword(email, password).catch((error) => {
      // Handle Errors here.
      success = false;
      const errorCode = error.code;
      const errorMessage = error.message;
      if(errorCode === 'auth/user-not-found') {
        alert("This email has not been registered");
      } else if(errorCode === 'auth/wrong-password') {
        alert("Wrong password, try again");
      } else {
        alert(errorMessage);
      }
      this.loggedinState();
    });
    if(success === true) {
    this.accountState(email);
    console.log(email);
    //console.log("firebase user", firebase.auth().currentUser);
    //console.log("email", firebase.auth().currentUser.email);
    //console.log("uid", firebase.auth().currentUser.uid);

    let query = await firebase.database().ref('posts/').orderByKey();
    await query.once("value")
    .then((snapshot) => {
      
    snapshot.forEach((childSnapshot) => {
      //let key = childSnapshot.key; // unique key for each post
      //console.log("key", childSnapshot.key);
      // childData will be the actual contents of the child
      //let childData = childSnapshot.val();
      // author = chilData.author...
      //console.log("childData", childData.author);
      //console.log("pre firebase:", this);
      this.setState({posts: [...this.state.posts, childSnapshot]});
      //console.log(childSnapshot.val().author);
      });
    });  
    }
    console.log(this.state.titles);
  }

  submitEdit(title, content, postID, snapshot) {
    console.log("entered sumbitEdit");
    console.log("entered with this postID:", postID);
    //console.log(content);
    const postInfo = {
      title: title, 
      content: content, 
      author: snapshot.val().author
    };
    firebase.database().ref('posts/' + postID).update(postInfo);


    
     let query = firebase.database().ref('posts/').orderByKey();
     query.once("value")
     .then((snapshot) => {
       this.setState({posts: []});
     snapshot.forEach((childSnapshot) => {
    //   //let key = childSnapshot.key; // unique key for each post
     //  console.log("In query key", childSnapshot.key);
    //   // childData will be the actual contents of the child
    //   //let childData = childSnapshot.val();
    //   // author = chilData.author...
    //   //console.log("childData", childData.author);
    //   //console.log("pre firebase:", this);
       this.setState(prevState => ({
         posts: [...prevState.posts, childSnapshot]
       }));
    //   //console.log(childSnapshot.val().author);
       });
     });  

     console.log("end of submit function:", postID);
     {this.state.posts.map((post) => {
      console.log(post.key)
      })}

  }

  editPost = (postID) => {
    console.log("editPost:", postID);
    firebase.database().ref('posts/' + postID).on("value", ((snapshot) => {
      console.log("edited key", snapshot.key);
      let title = snapshot.val().title;
      let content = snapshot.val().content;
      let edited = prompt(title, content);
      this.submitEdit(title, edited, postID, snapshot);
    }));
    //this.submitEdit("a", "b", postID, "c");
  }

  newPost = (title, content) => {
    const postKey = firebase.database().ref().child('posts').push().key;
    console.log(postKey);
    const postInfo = {
      title: title, 
      content: content, 
      author: this.state.account
    };
    firebase.database().ref('posts/' + postKey).set(postInfo);
    //firebase.database().ref('post/' + postKey + '/comments').set({hascomments: false});
    // let posts = {};
    // posts['posts/' + postKey] = postInfo;
    // return firebase.database().ref('posts/' + postKey);
    this.setState({posts: []});
    firebase.database().ref('posts/').on("child_added", (snapshot) => {
      console.log("snapshot", snapshot.val());
      //const newPost = snapshot.val();
      this.setState(prevState => ({
        posts: [snapshot, ...prevState.posts]
      }));

      this.setState(preState => ({
        titles: [snapshot.val().title, ...preState.titles]
      }));
     // this.setState({posts: [snapshot, ...this.state.posts]});
      // console.log("------- added new post -------");
      // this.state.posts.map((post) =>
      //     console.log(post.val().title)
      //   );
      /*console.log("Author: " + newPost.author);
      console.log("Title: " + newPost.title);
      console.log("Content: " + newPost.content);*/
    });
    document.getElementById("newposttitle").value = '';
    document.getElementById("newpostcontent").value = '';

  }

  concatcomment(comments) {
    alert(comments);
  }

  displayComments = async (commentarr) => {
    let comments = 'comments: ';
    for(let i = 0; i < commentarr.length; i++){
      let query = await firebase.database().ref("/comments/" + commentarr[i]).orderByKey();
      await query.once("value").then((snapshot) => {
          let name = snapshot.val().author;
          let comment = snapshot.val().comment;
          comments = comments.concat("\n");
          comments = comments.concat(name + ": " + comment);
          //console.log("for loop", comments);
      });
    // if (i == commentarr.length -1) {
    //     console.log("if", comments);
    // }
    }
      this.concatcomment(comments);
  }

  viewLikes = (postID) => {
    const uid = firebase.auth().currentUser.uid;
    const account = this.state.account;
    const commentID = firebase.database().ref().child('posts/' + postID + '/likes').push().account;
    firebase.database().ref('posts/' + postID + '/likes/' + uid).set(true);
    //firebase.database().ref('posts/' + postID + '/likes/' + uid).once("value").then((snapshot)=> {console.log(snapshot.val())});
  }


  viewComments = (postID) => {
    let commentarr = [];

    let query = firebase.database().ref('posts/' + postID + "/comments/").orderByKey();
    query.once("value")
    .then((snapshot) => {
    snapshot.forEach((childSnapshot) => {
      let key = childSnapshot.val(); // unique key for each post
      commentarr.push(key);
      });
      //console.log(commentarr);
      this.displayComments(commentarr);
    });  

    
  }

  addComment = (postID, commentcontent) => {
    //console.log(commentcontent);
    const commentID = firebase.database().ref().child('comments').push().key;
    const idid = firebase.database().ref().child('posts/comments').push().key;
    //console.log(commentID);
    const commentInfo = {
      comment: commentcontent, 
      author: this.state.account
    };
    firebase.database().ref('comments/' + commentID).set(commentInfo);
    //const jsoncommentid = {id: [...commentarray, commentID]};
    //firebase.database().ref('posts/' + postID + '/comments').update(jsoncommentid);
    firebase.database().ref('posts/' + postID + '/comments/' + idid).set(commentID);

    /*
    firebase.database().ref('post/' + postID + '/comments/hascomments').once('value').then(function(snapshot) {
      if(snapshot.val() == true) {
        console.log("has child");
        let query = firebase.database().ref('posts/' + postID + "/comments/id").orderByKey();
        query.once("value")
        .then((snapshot) => {
        snapshot.forEach((childSnapshot) => {
          let arr = childSnapshot.val(); // unique key for each post
          firebase.database().ref('posts/' + postID + '/comments/').update({id: [...arr, commentID]});
          });
    
        });  
      } else {
        firebase.database().ref('posts/' + postID + '/comments').set({id: [commentID]});
        console.log("new comment");
        firebase.database().ref('post/' + postID + '/comments').update({hascomments: true});
      }
      
    });
    */
    document.getElementById("comment").value = '';
  }

  /*componentWillMount () {

    const currUser = firebase.auth().currentUser;
    if(currUser != null) {

    const self = this;
    /*
    firebase.database().ref('posts/').on("child_added", function(snapshot) {
      const newPost = snapshot.val();
      self.setState({posts: [...self.state.posts, newPost]});
      /*console.log("Author: " + newPost.author);
      console.log("Title: " + newPost.title);
      console.log("Content: " + newPost.content);*/
      //console.log(snapshot.child);
   // });
    /*
    let query = firebase.database().ref('posts/').orderByKey();
    query.once("value")
    .then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      let key = childSnapshot.key; // unique key for each post
      //console.log("key", childSnapshot.key);
      // childData will be the actual contents of the child
      let childData = childSnapshot.val();
      // author = chilData.author...
      //console.log("childData", childData.author);
      self.setState({posts: [...self.state.posts, childSnapshot]});
      //console.log(childSnapshot.val().author);
      });
    });   
  } 
  }*/

  deleteUser = async () => {
    const user = firebase.auth().currentUser;
    console.log(user);
    user.delete().then(() => {
      console.log("delted user")
    }).catch((error) => {
      console.log(error);
    });

    let query = await firebase.database().ref('posts/').orderByKey();
    await query.once("value")
    .then((snapshot) => {
    snapshot.forEach((childSnapshot) => {
      if(childSnapshot.val().author === this.state.account) {
        this.deletePost(childSnapshot.key);
      }
      });
    });
      
    this.setState({posts: []});
    this.setState({loggedin: false}); 
    this.setState({account: ''});
    this.setState({uid: ''});
  }

  render() {
    //console.log("State: ", this.state);
    return (
      <div className="App">
        <h1>React + Firebase Blog</h1>
        <div className="signout">
        {this.state.loggedin ? <button className="btn btn-danger btn-sm delete" onClick={() =>
        {

          firebase.auth().signOut().then(() => {
            console.log("signed out");
            this.setState({posts: []});
            this.setState({uid: ''});
            this.setState({loggedin: false}); 
            this.setState({account: ''});
          },  (error) => {
            console.log("Sign out error", error);
          })
        }}>Signout</button> : null}</div>
        <div className="signout">
        {this.state.loggedin ? <button className="btn btn-danger btn-sm delete" onClick={() =>
        {
          this.deleteUser();
        }}>Delete User</button> : null}</div>
        {this.state.loggedin ? null : <Login loginFunction={this.checkLogin} /> }
        {this.state.loggedin ? null : <Register regFunction={this.register} /> }
        {this.state.loggedin ? 
        <div>
        <ul className="nav nav-tabs nav-justified" id="myTab" role="tablist">
            <li className="nav-item">
              <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Homepage</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">New Post</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">Search By Title</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" id="likes-tab" data-toggle="tab" href="#likes" role="tab" aria-controls="likes" aria-selected="false">Likes</a>
            </li>
          </ul>
          <div className="tab-content" id="myTabContent">
            <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
            {this.state.posts.map((post) => {
            //console.log(post)
            //console.log(post.val())
            return <Post viewLikes={this.viewLikes} viewComments={this.viewComments} currUser={this.state.account} addComment={this.addComment} deletePost={this.deletePost} edit={this.editPost} postID={post.key} title={post.val().title} content={post.val().content} user={post.val().author}/>
            })}
            </div>
            <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
            {this.state.loggedin ?  <NewPost postFunction={this.newPost} /> : null }
            </div>
            <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
              <Search titles={this.state.posts} />
            </div>
            <div className="tab-pane fade" id="likes" role="tabpanel" aria-labelledby="likes-tab">
              {this.state.posts.map((post) => {
            //console.log(post)
            //console.log(post.val())
            return <Likes uid={this.state.uid} viewLikes={this.viewLikes} viewComments={this.viewComments} currUser={this.state.account} addComment={this.addComment} deletePost={this.deletePost} edit={this.editPost} postID={post.key} title={post.val().title} content={post.val().content} user={post.val().author}/>
            })}
            </div>
          </div>
            
          </div>
          : null}

      </div>
    );
  }
}

export default App;
