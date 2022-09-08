import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import Searchbar from './Searchbar/Searchbar'
import styles from './App.module.css';

export default function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [largeImageUrl, setLargeImageUrl] = useState('');
  const [largeImageAlt, setLargeImageAlt] = useState('');

  const handleFormSubmit = (handleSubmit) => {
    setQuery(handleSubmit.toLowerCase());
    setImages([]);
    setPage(1);
  };

  const loadNextPage = () => {
    setPage(prevState => prevState + 1);
  };

  const toggleModal = (url, alt) => {
    setShowModal(!showModal);
    setLargeImageUrl(url);
    setLargeImageAlt(alt);
  };

  useEffect(() => {
    if (query || page !== 1) {
      setStatus('pending');
      
      fetch(`https://pixabay.com/api/?q=${query}&page=${page}&key=28319602-4eb5fc2c807c8422daa970660&image_type=photo&orientation=horizontal&per_page=12`)
        // .then(response => response.json())
        .then(response => {
          if (response.ok) {
            return response.json()
          }
          return Promise.reject(
            new Error(`Photos with the name "${query}" do not exist`),
            toast.warning(`Photos with the name "${query}" do not exist`)
          )
        })
        .then(response => {
          if (response.hits.length > 0) {
            return response;
          }
          return Promise.reject(
            new Error(`Photos with the name "${query}" do not exist`),
            toast.warning(`Photos with the name "${query}" do not exist`)
          );
        })
        .then(response => {
          setImages(prevState => ([...prevState, ...response.hits]))
          setStatus('resolved')
        })
        .catch(newError => {
          setError(newError);
          setStatus('rejected');
        });
    };
  }, [page, query]);

  return (
    <main className={styles.App}>
      <Searchbar onSubmit={handleFormSubmit} />
      {status === 'rejected' && <div className={styles.ErrorBlock}>{error.message}</div>}
      <ImageGallery images={images} onClickImg={toggleModal} />
      {showModal && <Modal
        onClose={toggleModal}
        imgUrl={largeImageUrl}
        imgAlt={largeImageAlt}
      />}
      <ToastContainer autoClose={1500} />
      {status === 'pending' && <Loader />}
      {status === 'resolved' && <Button loadMore={loadNextPage} />}
    </main>
  );
};