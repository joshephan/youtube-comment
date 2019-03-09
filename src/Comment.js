import React from 'react';
import PropTypes from 'prop-types';
import './Comment.css';

function Comment ({img, title, text, alt, voting}) {
    return (
        <div className="Comments">
            <img src={img} alt={alt}/>
            <h5>{title}</h5>
            <p>{text}</p>
            {voting !== 0 && <p className="voting"><i className="far fa-thumbs-up"></i> {voting}</p>}
        </div>
    )
}

Comment.propTypes = {
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
}


export default Comment;
