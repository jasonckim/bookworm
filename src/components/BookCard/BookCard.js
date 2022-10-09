import React from 'react';
import './BookCard.css';
import Button from 'react-bootstrap/Button';

const BookCard = (props) => {
  const [isShow, setShow] = React.useState(false);
  const handleToggle=()=>{
    setShow(!isShow);
  };

  return (
    <div className="card-container">
      <img className="card-image" src={props.image} alt="book images"/>
      <div className="bookInfo">
        <h2>{props.title}</h2>
        <h4>By: {props.author}</h4>
        <h6>Released: {props.published}</h6>
        <div className="toggleShow">
          <Button variant="secondary" onClick={handleToggle} type="button">Description</Button>
          <br/>
          {isShow ? props.description: null}
        </div>
      </div>
    </div>
    )
};

export default BookCard;
