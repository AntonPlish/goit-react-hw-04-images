import { useState } from 'react';
import styles from './Searchbar.module.css'
import { ImSearch } from 'react-icons/im'
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Searchbar({ onSubmit }) {
  const [imageItems, setImageItems] = useState('');
  const [prevImagesItems, setPrevImagesItems] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (imageItems.trim() === '') {
      toast.error('Please enter a request');
      return;
    }

    if (imageItems.trim() !== prevImagesItems) {
      setPrevImagesItems(imageItems);
      onSubmit(imageItems);
      setImageItems('');
    } else if (imageItems.trim() === prevImagesItems) {
      toast.info('Please enter another request. This request is already shown');
    }
  };

  const handleNameChange = event => {
    setImageItems(event.currentTarget.value.toLowerCase());
  }

    return (
      <header className={styles.Searchbar}>
        <form onSubmit={handleSubmit} className={styles.SearchForm}>
          <button type="submit" className={styles.SearchFormButton}>
            <ImSearch />
            <span className={styles.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            className={styles.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={imageItems}
            onChange={handleNameChange}
          />
        </form>
      </header>
    );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};