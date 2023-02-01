import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { fetchImg } from '../helpers/ImagesFinderApi';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { SearchBar } from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';

export class App extends Component {
  state = {
    search: '',
    images: [],
    page: 1,
    totalHits: 0,
    isLoading: false,
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { search, page, images } = this.state;

    if (search !== prevState.search || page !== prevState.page) {
      this.setState({ isLoading: true });

      fetchImg(search, page).then(response => {
        if (!response.hits.length) {
          toast.error(`This request ${search} is not found`);

          return;
        }
        this.setState({
          images: [...images, ...response.hits],
          totalHits: response.totalHits,
          isLoading: false,
        });
      });
    }
  }

  handelSearch = text => {
    this.setState({
      search: text,
      images: [],
      page: 1,
      totalHits: 0,
    });
  };

  handelLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { images, totalHits, isLoading } = this.state;

    const { handelSearch, handelLoadMore } = this;

    return (
      <>
        <SearchBar onSubmit={handelSearch} />
        {isLoading && <Loader />}
        {/*<Loader />*/}
        {images && <ImageGallery images={images} />}
        {totalHits > 12 && (
          <>
            <Button onLOardMore={handelLoadMore} />
            <ToastContainer />
          </>
        )}
      </>
    );
  }
}
