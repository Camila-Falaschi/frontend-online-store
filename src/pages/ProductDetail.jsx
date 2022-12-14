import PropTypes from 'prop-types';
import React from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import AvaliationForm from '../components/AvaliationForm';
import ProductRating from '../components/ProductRating ';
import { getProductData } from '../services/api';
import { handleSubmit, recoveryFromSection } from '../services/sessionStorage';

export default class ProductDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      productId: '',
      productName: '',
      image: '',
      price: '',
      aditionalInfo: [],
      data: [],
      avaliationData: [],
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    const data = await getProductData(id);
    this.setState({
      productId: id,
      productName: data.title,
      image: data.thumbnail,
      price: data.price,
      aditionalInfo: data.attributes,
      data,
      avaliationData: recoveryFromSection('avaliations'),
    });
  }

  handleClick = () => {
    const { data } = this.state;
    const { updateShoppingCart } = this.props;

    handleSubmit('shoppingCart', data);
    updateShoppingCart();
  };

  previousPage = () => {
    const { history } = this.props;
    history.push('/');
  };

  updateReviews = () => {
    this.setState({
      avaliationData: recoveryFromSection('avaliations'),
    });
  };

  render() {
    const {
      productName,
      image,
      price,
      aditionalInfo,
      productId,
      avaliationData,
    } = this.state;
    const { shoppingCartList } = this.props;
    return (
      <main>
        <span data-testid="shopping-cart-size">
          {shoppingCartList.length}
          <AiOutlineShoppingCart />
        </span>
        <header>
          <button type="button" onClick={ this.previousPage }>
            Voltar
          </button>
          <Link to="/shoppingCart" data-testid="shopping-cart-button">
            Carrinho
          </Link>
        </header>
        <main>
          <section>
            <h1 data-testid="product-detail-name">{productName}</h1>
            <img src={ image } alt={ productName } />
            <h3>{price}</h3>
            <div>
              {aditionalInfo.map((details) => (
                <p key={ details.id }>
                  {details.name}
                  :
                  {' '}
                  {details.value_name}
                </p>
              ))}
              <button
                data-testid="product-detail-add-to-cart"
                type="button"
                onClick={ this.handleClick }
              >
                Adicionar ao Carrinho
              </button>
            </div>
            <div>
              <Link to="/shoppingCart">Ir para o Carrinho</Link>
            </div>
          </section>
          <section>
            <div>
              <AvaliationForm
                id={ productId }
                data={ avaliationData }
                updateReviews={ this.updateReviews }
              />
              <ProductRating id={ productId } avaliationData={ avaliationData } />
            </div>
          </section>
        </main>
      </main>
    );
  }
}

ProductDetail.propTypes = {
  updateShoppingCart: PropTypes.func.isRequired,
  shoppingCartList: PropTypes.arrayOf(PropTypes.object).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
