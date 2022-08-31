import Loader from 'components/Loader';
import React, { Component } from 'react';
import ImageGalleryItem from '../ImageGalleryItem';
import Button from '../Button';

class ImageGallery extends Component {
  state = {
    images: [],
    error: null,
    status: 'idle',
    page: 1,
  };

  async componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.searchName;
    const nextName = this.props.searchName;
    if (prevName !== nextName || prevState.page !== this.state.page) {
      this.setState({ status: 'pending' });
      await fetch(
        `https://pixabay.com/api/?q=${nextName}&page=${this.state.page}&key=28400374-5eacf081d2efacca1adf31c1f&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(
            new Error(`Нет картинки с именем ${nextName}, введите другое`)
          );
        })
        .then(res =>
          this.setState(prevState => ({
            images: [...prevState.images, ...res.hits],
            status: 'resolved',
          }))
        )
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
    setTimeout(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }, 500);
  };

  render() {
    const { images, error, status } = this.state;

    if (status === 'pending') {
      return <Loader />;
    }

    if (status === 'reject') {
      return <h1>{error.message}</h1>;
    }

    if (status === 'resolved') {
      return (
        <>
          <ul className="ImageGallery">
            <ImageGalleryItem images={images} />
          </ul>
          {images.length !== 0 && <Button onClick={this.handleLoadMore} />}
        </>
      );
    }
  }
}

export default ImageGallery;
