import { Component } from 'react';
import styles from './Searchbar.module.css'
import { ImSearch } from 'react-icons/im'
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class Searchbar extends Component {
  state = {
    imageItems: '',
    prevImagesItems: '',
  }

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.imageItems.trim() === '') {
      toast.error('Please enter a request');
      return;
    };

    if (this.state.imageItems.trim() !== this.state.prevImagesItems) {
      this.setState({ prevImagesItems: this.state.imageItems });
      this.props.onSubmit(this.state.imageItems);
      this.setState({ imageItems: '' });
    } else if (this.state.imageItems.trim() === this.state.prevImagesItems) {
      toast.info('Please enter another request. This request is already shown');
    }
  }

  handleNameChange = event => {
    this.setState({ imageItems: event.currentTarget.value.toLowerCase() });
  }

  render() {
    return (
      <header className={styles.Searchbar}>
        <form onSubmit={this.handleSubmit} className={styles.SearchForm}>
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
            value={this.state.imageItems}
            onChange={ this.handleNameChange}
          />
        </form>
      </header>
    );
  };
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};