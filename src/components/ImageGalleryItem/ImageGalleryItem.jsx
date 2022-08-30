import React, { Component } from 'react';
import Modal from '../Modal';

class ImageGalleryItem extends Component {
  state = {
    showModal: false,
    modalImage: null,
    modalAlt: null,
  };

  handleImageShow = (modalImage, modalAlt) => {
    this.setState({ modalImage, modalAlt });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    const images = this.props.images;
    const { toggleModal, handleImageShow } = this;
    const { showModal, modalImage, modalAlt } = this.state;

    return images.map(image => (
      <li className="ImageGalleryItem" key={image.id}>
        <img
          className="ImageGalleryItem-image"
          src={image.webformatURL}
          alt=""
          width="240"
          onClick={() => {
            handleImageShow(image.largeImageURL, image.tags);
            toggleModal();
          }}
        />
        {showModal && (
          <Modal onClose={toggleModal}>
            <img src={modalImage} alt={modalAlt} />
          </Modal>
        )}
      </li>
    ));
  }
}

export default ImageGalleryItem;
