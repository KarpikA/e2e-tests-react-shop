import formatPrice from 'utils/formatPrice';
import CartProducts from './CartProducts';

import { useCart } from 'contexts/cart-context';

import * as S from './style';

const Cart = () => {
  const { products, total, isOpen, openCart, closeCart } = useCart();

  const handleCheckout = () => {
    if (total.productQuantity) {
      alert(
        `Checkout - Subtotal: ${total.currencyFormat} ${formatPrice(
          total.totalPrice,
          total.currencyId
        )}`
      );
    } else {
      alert('Add some product in the cart!');
    }
  };

  const handleToggleCart = (isOpen: boolean) => () =>
    isOpen ? closeCart() : openCart();

  return (
    <S.Container isOpen={isOpen}>
      <S.CartButton data-cy='cart-button' onClick={handleToggleCart(isOpen)}>
        {isOpen ? (
          <span>X</span>
        ) : (
          <S.CartIcon>
            <S.CartQuantity title="Products in cart quantity">
              {total.productQuantity}
            </S.CartQuantity>
          </S.CartIcon>
        )}
      </S.CartButton>

      {isOpen && (
        <S.CartContent data-cy='cart-content'>
          <S.CartContentHeader>
            <S.CartIcon large>
              <S.CartQuantity>{total.productQuantity}</S.CartQuantity>
            </S.CartIcon>
            <S.HeaderTitle data-cy='cart-title'>Cart</S.HeaderTitle>
          </S.CartContentHeader>

          <CartProducts products={products} />

          <S.CartFooter>
            <S.Sub>SUBTOTAL</S.Sub>
            <S.SubPrice>
              <S.SubPriceValue data-cy='cart-subtotal'>{`${total.currencyFormat} ${formatPrice(
                total.totalPrice,
                total.currencyId
              )}`}</S.SubPriceValue>
              <S.SubPriceInstallment>
                {total.installments ? (
                  <span>
                    {`OR UP TO ${total.installments} x ${
                      total.currencyFormat
                    } ${formatPrice(
                      total.totalPrice / total.installments,
                      total.currencyId
                    )}`}
                  </span>
                ) : null}
              </S.SubPriceInstallment>
            </S.SubPrice>
            <S.CheckoutButton data-cy='cart-checkout-button' onClick={handleCheckout} autoFocus>
              Checkout
            </S.CheckoutButton>
          </S.CartFooter>
        </S.CartContent>
      )}
    </S.Container>
  );
};

export default Cart;
