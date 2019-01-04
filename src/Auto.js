import React, { Component } from 'react';
import firebase from './firebase';
import Autocomplete from 'react-autocomplete';
import Autosuggest from 'react-autosuggest';

/*
function getSuggestions(value) {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    return inputLength === 0 ? [] : this.props.titles.filter(title => title.toLowerCase().slice(0, inputLength) === inputValue);
  }
  
  function getSuggestionValue(suggestion) {
    return suggestion.name;
  }
  
  function renderSuggestion(suggestion) {
    return (
      <span>{suggestion.name}</span>
    );
  }
  */


class Auto extends Component {
    constructor(props) {
        super(props);
        this.state = {value: '', titles: this.props.titles, suggestions: []};
    }

    getSuggestions = (value) => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
        return inputLength === 0 ? [] : this.props.titles.filter(title => title.toLowerCase().slice(0, inputLength) === inputValue);
    }

    getSuggestionValue = (suggestion) => {
        return suggestion;
      }

    renderSuggestion = (suggestion) => {
        return (
          <span>{suggestion.name}</span>
        );
      }

    onChange = (event, { newValue, method }) => {
        this.setState({
          value: newValue
        });
      };
      
    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: this.getSuggestions(value)
        });
    };

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    
    render() {
        const { value, suggestions } = this.state;
        const inputProps = {
            value,
            onChange: this.onChange
        };
        return (
            <Autosuggest 
                suggestions={this.state.suggestions} 
                onSuggestionsFetchRequest={this.onSuggestionsFetchRequest} 
                onSuggestionsClearRequest={this.onSuggestionsFetchRequestClear} 
                getSuggestionValue={this.getSuggestionValue} 
                renderSuggestion={this.renderSuggestion} 
                inputProps={this.inputProps}
            />
        )
    }
}

export default Auto;