import React, { Component } from 'react';

class ImageGallery extends Component {
  state = {
    images: null,
    loading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    // this.setState({ loading: true });

    const prevName = prevProps.searchName;
    const nextName = this.props.searchName;
    if (prevName !== nextName) {
      console.log('update');
      fetch(
        `https://pixabay.com/api/?q=${nextName}&page=1&key=28400374-5eacf081d2efacca1adf31c1f&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(res => res.json())
        .then(images => this.setState({ images }))
        .finally(() => this.setState({ loading: false }));
    }
  }

  render() {
    return (
      <div>
        {this.state.loading && <h1>Загружаем...</h1>}
        {/* {this.state.images && (
          <ul>
            {this.state.images.map(image => {
              return (
                <li key={this.state.images.hits.id}>
                  {this.state.images.hits.webformatURL}
                </li>
              );
            })}
          </ul>
        )} */}
        <h1>{this.props.searchName}</h1>
      </div>
    );
  }
}

export default ImageGallery;
