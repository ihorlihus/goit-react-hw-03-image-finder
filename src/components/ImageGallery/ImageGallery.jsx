import Loader from 'components/Loader';
import React, { Component } from 'react';
import ImageGalleryItem from '../ImageGalleryItem';

class ImageGallery extends Component {
  state = {
    images: null,
    error: null,
    status: 'idle',
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.searchName;
    const nextName = this.props.searchName;
    if (prevName !== nextName) {
      this.setState({ status: 'pending' });
      fetch(
        `https://pixabay.com/api/?q=${nextName}&page=1&key=28400374-5eacf081d2efacca1adf31c1f&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(
            new Error(`Нет картинки с именем ${nextName}, введите другое`)
          );
        })
        .then(images => this.setState({ images, status: 'resolved' }))
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  render() {
    const { images, error, status } = this.state;

    if (status === 'idle') {
      return <h2>Введите запрос</h2>;
    }

    if (status === 'pending') {
      return <Loader />;
    }

    if (status === 'reject') {
      return <h1>{error.message}</h1>;
    }

    if (status === 'resolved') {
      return (
        <ul className="ImageGallery">
          <ImageGalleryItem images={images.hits} />
        </ul>
      );
    }
  }
}

export default ImageGallery;
