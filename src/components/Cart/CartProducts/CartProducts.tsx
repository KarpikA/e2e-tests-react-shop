import { ICartProduct } from 'models';
import CartProduct from './CartProduct';

import * as S from './style';

interface IProps {
  products: ICartProduct[];
}

const CartProducts = ({ products }: IProps) => {
  return (
    <S.Container>
      {products?.length ? (
        products.map((p) => <CartProduct data-cy='cart-product' product={p} key={p.sku} />)
      ) : (
        <S.CartProductsEmpty data-cy='cart-empty'>
          Add some products in the cart <br />
          :)
        </S.CartProductsEmpty>
      )}
    </S.Container>
  );
};

export default CartProducts;
