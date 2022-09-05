import PropTypes from 'prop-types';
import styles from './ImageGalleryItem.module.css'

const ImageGalleryItem = function ({ url, alt }) {
  return <img className={styles.ImageGalleryItemImage} src={url} alt={alt} />;
};

ImageGalleryItem.ImageGalleryItem = {
  url: PropTypes.string.isRequired,
  alt: PropTypes.array.isRequired,
};

export default ImageGalleryItem;