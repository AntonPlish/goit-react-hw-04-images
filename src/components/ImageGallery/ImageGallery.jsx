import PropTypes from 'prop-types';
import styles from './ImageGallery.module.css';
import ImageGalleryItem from './ImageGalleryItem';

const ImageGallery = function ({ images, onClickImg }) {
    return (
        <ul className={styles.ImageGallery}>
            {images.map(image => (
                <li
                    key={image.id}
                    className={styles.ImageGalleryItem}
                    onClick={() => onClickImg(image.largeImageURL, image.tags)}
                >
                    <ImageGalleryItem url={image.webformatURL} alt={image.tags} />
                </li>
            ))}
        </ul>
    );
};

ImageGallery.propTypes = {
    images: PropTypes.array.isRequired,
    onClickImg: PropTypes.func.isRequired,
};

export default ImageGallery;