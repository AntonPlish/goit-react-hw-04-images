import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import Searchbar from './Searchbar/Searchbar';
import styles from './App.module.css';

export default class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    status: 'idle',
    error: null,
    showModal: false,
    largeImageUrl: '',
    largeImageAlt: '',
  }

  componentDidUpdate(_, prevState) {
    if (prevState.query !== this.state.query || prevState.page !== this.state.page) {
      this.setState({
        images: [],
        status: 'pending',
      });
      
      fetch(`https://pixabay.com/api/?q=${this.state.query}&page=${this.state.page}&key=28319602-4eb5fc2c807c8422daa970660&image_type=photo&orientation=horizontal&per_page=12`)
        // .then(response => response.json())
        .then(response => {
          if (response.ok) {
            return response.json()
          }
          return Promise.reject(
            new Error(`Photos with the name "${this.state.query}" do not exist`),
            toast.warning(`Photos with the name "${this.state.query}" do not exist`)
          )
        })
        .then(response => {
          if (response.hits.length > 0) {
            return response;
          }
          return Promise.reject(
            new Error(`Photos with the name "${this.state.query}" do not exist`),
            toast.warning(`Photos with the name "${this.state.query}" do not exist`)
          );
        })
        .then(response => {
          this.setState({
            images: [...response.hits],
            status: 'resolved',
          });
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    };
  };

  handleFormSubmit = query => {
    this.setState({
      query: query.toLowerCase(),
      images: [],
      page: 1,
    });
  };

  loadNextPage = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  toggleModal = (url, alt) => {
    this.setState(state => ({
      showModal: !state.showModal,
    }))
    this.setState({
      largeImageUrl: url,
    })
    this.setState({
      largeImageAlt: alt,
    })
  };

  render() {
    const { images, status, showModal, largeImageUrl, largeImageAlt } = this.state;
    return (
      <main className={styles.App}>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {/* {status === 'rejected' && <div className={styles.ErrorBlock}>{error.message}</div>} */}
        <ImageGallery images={images} onClickImg={this.toggleModal} />
        {showModal && <Modal
            onClose={this.toggleModal}
            imgUrl={largeImageUrl}
            imgAlt={largeImageAlt}
        />}
        <ToastContainer autoClose={3000} />
        {status === 'pending' && <Loader />}
        {status === 'resolved' && <Button loadMore={this.loadNextPage} />}
      </main>
    );
  };
};