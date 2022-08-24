// import instance from './../Modal/Modal';

const ImageGalleryItem = ({ images }) => {
  return images.map(image => (
    <li key={image.id}>
      <img src={image.webformatURL} alt="" width="240" />
    </li>
  ));
};

export default ImageGalleryItem;
