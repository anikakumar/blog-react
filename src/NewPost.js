import React, { Component } from 'react';
import './NewPost.css';

class NewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {title: '', content: ''};
  }
  
  onTitleChange = (text) => {
    this.setState({title: text.target.value});
  }
  
  onContentChange = (text) => {
    this.setState({content: text.target.value});
  }
  
  render() {
    return (
      <div id="box" className="NewPost">
        <input className="mr-2" type="text" id="newposttitle" placeholder="Post Title" onChange={this.onTitleChange} />
        <br></br>
        <textarea className="mt-2" rows="5" cols="20" id="newpostcontent" name="content" placeholder="Post Content" onChange={this.onContentChange} ></textarea>
        <br></br>
        <button className="btn btn-outline-dark btn-sm mt-2" id="submit_btn" onClick={() =>
          {
            this.props.postFunction(this.state.title, this.state.content)
            //console.log(this.state.title, this.state.content, this.state.name);
          }}
          >Create Post</button>
      </div>
    );
  }
}

export default NewPost;
