import { formatPrice } from 'util/formatters';
import './styles.css';

type Props = {
    price: number;
}

const ProductPrice = ( { price } : Props) => {

    return (
        <div >
            {/* <span>R$</span> */}
            {formatPrice(price)}
        </div>
    );
}

export default ProductPrice;
