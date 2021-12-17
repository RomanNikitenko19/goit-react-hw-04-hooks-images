import { useState, useEffect } from 'react';
import { fetchData } from "../services/Api/api";
import LoaderSpinner from "../components/Loader/LoaderSpinner";
import Searchbar from "../components/Searchbar/Searchbar";
import ImageGallery from "../components/ImageGallery/ImageGallery";
import Button from "../components/Button/Button";
import Modal from "../components/Modal"
import "./App.module.css";

const App = () => {

  const [images, setImages] = useState([]);
  const [request, setRequest] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const dataFetch = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchData(request, page);
        setImages((prevImages) => (page === 1 ? data.hits : [...prevImages, ...data.hits]));
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    dataFetch();
  }, [request, page]);

  const addDataForRequest = value => {
    setRequest(value);
    setPage(1);
  }

  const increasePageRequest = () => {
    setPage(page + 1);
  }

  const toggleModal = event => {
    setIsOpen(!isOpen);
  }

  const getAPicture = value => {
    setLargeImageURL(value);
  }

  return (
      <>
        <Searchbar addDataForRequest={addDataForRequest} />
        <ImageGallery images={images} getAPicture={getAPicture} toggleModal={toggleModal} />
        {loading && <LoaderSpinner />}
        {images.length > 0 && <Button increasePageRequest={increasePageRequest} />}
        {isOpen && <Modal largeImageURL={largeImageURL} toggleModal={toggleModal} />}
      </>
  );
}

export default App;
