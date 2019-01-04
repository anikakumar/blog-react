import React, { Component } from 'react';
import Suggestions from './Suggestions';
import './NewPost.css';


class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            results: this.props.titles
          }
    }


      updateSearch = (event) => {
          this.setState({query: event.target.value});
      }

 render() {
     // https://www.youtube.com/watch?v=OlVkYnVXPl0 : React search filter tutorial 
     let filtered = this.props.titles.filter(
         (post) => {
             return post.val().title.toLowerCase().indexOf(this.state.query.toLowerCase()) !== -1;
         }
     );
     // end of react search filter tutorial
   return (
       <div>
           <input className="search d-flex justify-content-center" placeholder="Search..." type="text" value={this.state.query} onChange={this.updateSearch.bind(this)} />
           <ul>
               {filtered.map((post) => {
                   return <Suggestions name={post} />
               })}
           </ul>
       </div>

   )
 }
}

export default Search;