

import { Link } from 'react-router-dom';
import './styles.css';

const List = () =>

{
  return (
    <div className="product-crud-container">
      <div className="product-crud-bar-container">
        <Link to="/admin/products/create">
          <button className="btn btn-primary text-white btn-crud-add">
            ADICIONAR
          </button>
        </Link>
    </div>
   </div>
  );
};

export default List;
