import React, { Component } from 'react';


class Suggestions extends Component {
    render () {
        return (
        <div id="box indivpost" className="Post">
            <section className="title"><b>{this.props.name.val().title} </b>
            <span className="author" >by <i>{this.props.name.val().author}</i></span></section>
            <p className="content" id="content">{this.props.name.val().content}</p>
        </div> 
        )
    }
  }
export default Suggestions;

/* 

      

      <div>
                {this.props.name.val().title}
            </div>

*/