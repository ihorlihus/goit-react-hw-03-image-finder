import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import '../styles.css';

export class App extends Component {
  state = {
    searchName: '',
  };

  handleFormSubmit = searchName => {
    this.setState({ searchName });
  };

  render() {
    const { searchName } = this.state;
    return (
      <div className="App">
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery searchName={searchName} />
        <ToastContainer
          position="top-center"
          autoClose={3000}
          theme="colored"
        />
      </div>
    );
  }
}
