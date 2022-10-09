import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import './Search.css';
import BookList from '../BookList/BookList';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

class Search extends React.Component{
  constructor(props:any){
    super(props);

    this.state = {
      books: [],
      searchBooks: '',
      sort: ''
    }

    this.handleSearchTerm = this.handleSearchTerm.bind(this);
    this.searchBooks = this.searchBooks.bind(this);
    this.handleSort = this.handleSort.bind(this);
  }

  handleSearchTerm(e) {
    this.setState({
      searchBooks : e.target.value
    })
  }

  handleSort(e) {
    this.setState({
      sort : e.target.value
    })
  }

  searchBooks(query){
    axios({
      method: 'get',
      url: `https://www.googleapis.com/books/v1/volumes?q=${query}&key=AIzaSyBXtqcGyMEsQl4DSWKLneCAQEnGj7mBz1Y`,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      console.log(response.data.items)
      const cleanData = this.cleanData(response.data)
      this.setState({books:cleanData})
    })
  }

  cleanData(data){
    const cleanData = data.items.map((book) =>{
      if(book.volumeInfo.hasOwnProperty('publishedDate') === false){
        book.volumeInfo['publishedDate'] = '0000';
      }
      else if(book.volumeInfo.hasOwnProperty('imageLinks')=== false){
        book.volumeInfo['imageLinks'] = {thumbnail: 'http://books.google.com/books/content?id=akW7DwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'}
      }
      return book;
    })
    return cleanData;
  }

  render(){
    const sortedBooks = this.state.books.sort((a, b) =>{
      if(this.state.sort === 'Newest'){
        return parseInt(b.volumeInfo.publishedDate.substring(0,4)) - parseInt(a.volumeInfo.publishedDate.substring(0,4))
      }
      else if(this.state.sort === 'Oldest'){
        return parseInt(a.volumeInfo.publishedDate.substring(0,4)) - parseInt(b.volumeInfo.publishedDate.substring(0,4))
      }
    })

    return(
      <div className="search-bar">
        <div className="search-input">
          <InputGroup className="">
            <Form.Control
              placeholder="Search Users"
              onChange={e => this.handleSearchTerm(e)}
              value={this.state.searchBooks}
              className="search-input"
            />
            <Button
              variant="primary"
              className="search-button"
              onClick={()=>this.searchBooks(this.state.searchBooks)}>Search
            </Button>
          </InputGroup>
        </div>
        <div className="form-submit">
          <Form.Select defaultValue="Sort" onChange={(e)=>this.handleSort(e)}>
            <option disabled value="Sort">Sort By:</option>
            <option value="Newest">Newest</option>
            <option value="Oldest">Oldest</option>
          </Form.Select>
        </div>
        <BookList books={sortedBooks}/>
      </div>
    );
  }
}

export default Search;
