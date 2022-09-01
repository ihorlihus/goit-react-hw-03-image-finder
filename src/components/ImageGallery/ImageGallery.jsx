import ImageGalleryItem from '../ImageGalleryItem';

const ImageGallery = ({ images } = this.props.images) => {
  return (
    <ul className="ImageGallery">
      <ImageGalleryItem images={images} />
    </ul>
  );
};

export default ImageGallery;
