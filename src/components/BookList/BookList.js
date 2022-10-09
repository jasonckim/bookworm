import React from 'react';
import ReactDOM from 'react-dom/client';
import './BookList.css';
import BookCard from '../BookCard/BookCard';

const BookList = (props) => {

  return (
    <div className="bookList">
      {
        props.books.map((book, i)=>{
          return <BookCard
            key={i}
            image={book.volumeInfo.imageLinks.thumbnail}
            title={book.volumeInfo.title}
            author={book.volumeInfo.authors[0]}
            published={book.volumeInfo.publishedDate}
            description={book.volumeInfo.description}
          />
        })
      }
    </div>
  );
};

export default BookList;
