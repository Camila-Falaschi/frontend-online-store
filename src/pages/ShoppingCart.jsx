import React from 'react';
import { Link } from 'react-router-dom';
import { recoveryFromSection } from '../services/sessionStorage';

class ShoppingCart extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      unityProducts: [],
    };
  }

  componentDidMount() {
    this.getProducts();
  }

  getProducts = () => {
    const products = recoveryFromSection('shoppingCart');
    const ids = products.map((product) => product.id);
    this.setState({
      data: products,
      totalPrice: products.reduce(
        (totalprice, product) => totalprice + product.price,
        0,
      ),
      unityProducts: products.filter(
        ({ id }, index) => !ids.includes(id, index + 1),
      ),
    });
  };

  // handleAddButtonClick = async (id) => {
  //   const idProducts = recoveryFromSection('shoppingCart');
  //   const newIdProducts = [...idProducts, id];
  //   handleSubmit('shoppingCart', id);
  //   const result = newIdProducts.map((ids) => getProductData(ids));
  //   const array = await Promise.all(result);
  //   this.setState({
  //     data: array,
  //     totalPrice: array.reduce(
  //       (totalprice, product) => totalprice + product.price,
  //       0,
  //     ),
  //   });
  // };

  // handleRemoveButtonClick = (id) => {
  //   const idProducts = recoveryFromSection('shoppingCart');
  //   const resultId = idProducts.filter((product) => product === id);
  //   console.log(resultId);
  // };

  render() {
    const { data, totalPrice, unityProducts } = this.state;
    return (
      <div>
        {data.length === 0
        && <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>}
        {unityProducts.map((item, index) => (
          <div key={ index }>
            <h1 data-testid="shopping-cart-product-name">{item.title}</h1>
            <h3>{item.price}</h3>
            <h3 data-testid="shopping-cart-product-quantity">
              <button
                type="button"
                onClick={ () => this.handleRemoveButtonClick(item.id) }
              >
                Remove 1 produto
              </button>
              {data.filter(({ id }) => id === item.id).length}
              <button
                type="button"
                onClick={ () => this.handleAddButtonClick(item.id) }
              >
                Adiciona 1 produto
              </button>
            </h3>
            <button type="button">
              <Link
                to="/finishPayment"
                data-testid="checkout-products"
              >
                Finalizar Pedido

              </Link>
            </button>
          </div>
        ))}
        <div>{totalPrice}</div>
      </div>
    );
  }
}

export default ShoppingCart;
