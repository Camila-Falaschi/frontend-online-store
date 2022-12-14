import PropTypes from 'prop-types';
import React from 'react';

export default class ProductRating extends React.Component {
  renderStar = (rating) => {
    const number = 5;
    const stars = [...Array(number)].map((element, index) => {
      index += 1;
      if (rating >= index) {
        return '★';
      }
      return '☆';
    });
    return stars;
  }

  render() {
    const { id, avaliationData } = this.props;
    return (
      <div>
        <h3>Avaliações</h3>
        {
          avaliationData.filter((avaliation) => avaliation.id === id)
            .map((element, index) => (
              <div key={ index }>
                <h4>{element.email}</h4>
                {this.renderStar(element.rating)}
                <p>{element.message}</p>
              </div>
            ))
        }
      </div>
    );
  }
}

ProductRating.propTypes = {
  id: PropTypes.string.isRequired,
  avaliationData: PropTypes.arrayOf(PropTypes.any.isRequired).isRequired,
};
