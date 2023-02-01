import { Component } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Searchbar,
  SearchForm,
  SearchButton,
  SearchInput,
} from './Searchbar.styled';

export class SearchBar extends Component {
  state = {
    query: '',
    page: 1,
  };

  handleSearchQueryChange = element => {
    this.setState({ query: element.currentTarget.value.toLowerCase() });
  };

  handelSubmit = element => {
    element.preventDefault();

    const { query } = this.state;
    const { onSubmit } = this.props;

    if (query.trim() === '') {
      console.log(22222222);
      return toast.error('Please enter a search value');
    }

    onSubmit(query);
  };

  render() {
    const { handleSearchQueryChange, handelSubmit } = this;
    const { query } = this.state;

    return (
      <Searchbar>
        <SearchForm onSubmit={handelSubmit}>
          <SearchButton type="submit">
            <AiOutlineSearch size="2rem" />
          </SearchButton>

          <SearchInput
            value={query}
            onChange={handleSearchQueryChange}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchForm>
        <ToastContainer autoClose={false} draggable={false} />
      </Searchbar>
    );
  }
}
