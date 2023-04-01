import { Tooltip } from '@mui/material';
import { AxiosRequestConfig } from 'axios';
import Pagination from 'components/Pagination';
import ProductPrice from 'components/ProductPrice';
import { debounce } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { FaCheck, FaEdit, FaTimes, FaTrash } from 'react-icons/fa';
import { Link, useHistory } from 'react-router-dom';
import { Product } from 'types/product';
import { SpringPage } from 'types/vendor/spring';
import { requestBackend } from 'util/requests';
import './styles.css';

type ProductFilterData = {
  searchTerm: string;
  property: string;
};

type ControlComponentsData = {
  activePage: number;
  filterData: ProductFilterData;
};

const List = () => {
  const [page, setPage] = useState<SpringPage<Product>>();
  const [controlComponentsData, setControlComponentsData] =
    useState<ControlComponentsData>({
      activePage: 0,
      filterData: {
        searchTerm: '',
        property: 'description',
      },
    });
  const history = useHistory();

  function handleEdit(productId: number) {
    history.push(`/record/products/${productId}`);
  }

  const handleDelete = (productId: number) => {
    if (!window.confirm('Tem certeza que deseja deletar?')) {
      return;
    }

    const config: AxiosRequestConfig = {
      method: 'DELETE',
      url: `/product/${productId}`,
    };

    requestBackend(config).then((response) => {
      setPage(response.data);
    });
  };

  const handlePageChange = (pageNumber: number) => {
    controlComponentsData.activePage = pageNumber;
    updateComponentData(controlComponentsData);
  };

  const handleSearchTermChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    controlComponentsData.filterData.searchTerm = event.target.value;
    updateComponentData(controlComponentsData);
  };

  const handlePropertyFilterChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    controlComponentsData.filterData.property = event.target.value;
    updateComponentData(controlComponentsData);
  };

  const handleFilterClear = () => {
    controlComponentsData.filterData.property = 'description';
    controlComponentsData.filterData.searchTerm = '';
    updateComponentData(controlComponentsData);
  };

  const updateComponentData = (componentData: ControlComponentsData) =>
    setControlComponentsData({ ...componentData });

  const getProducts = (componentData: ControlComponentsData) => {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: '/products',
      params: {
        page: componentData.activePage,
        size: 4,
        ...(componentData.filterData || {}),
      },
    };

    requestBackend(config).then((response) => {
      setPage(response.data);
    });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceHandleSearch = useCallback(
    debounce((componentData) => getProducts(componentData), 500),
    []
  );

  useEffect(
    () => debounceHandleSearch(controlComponentsData),
    [controlComponentsData, debounceHandleSearch]
  );

  return (
    <>
      <div className="card my-3 mx-5">
        <div className="card-header">
          <h3>Filtro</h3>
        </div>
        <div className="card-body">
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="search-input" className="form-label">
                Pesquisar por
              </label>
              <Tooltip
                title="Digite o que você procura !"
                arrow
                placement="top"
              >
                <input
                  placeholder="Pesquisar"
                  onChange={handleSearchTermChange}
                  value={controlComponentsData.filterData.searchTerm}
                  className="form-control"
                  id="search-input"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                />
              </Tooltip>
            </div>

            <div className="col">
              <label htmlFor="property-input" className="form-label">
                Filtrar por
              </label>
              <Tooltip
                title="Escolha o campo de pesquisa !"
                arrow
                placement="top"
              >
                <select
                  className="form-control"
                  onChange={handlePropertyFilterChange}
                  value={controlComponentsData.filterData.property}
                  id="property-input"
                >
                  <option value="description">Descrição</option>
                  <option value="originalCode">Código Original</option>
                  <option value="originalCode1">Código Original 1</option>
                </select>
              </Tooltip>
            </div>
          </div>

          <div className="row">
            <div className="col-2">
              <button
                className="btn btn-outline-secondary"
                onClick={handleFilterClear}
              >
                Limpar
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="card mb-5 mx-5 card-list ">
        <div className="card-header">
          <h3>Lista de produtos</h3>
        </div>
        <div className="card-body">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Descrição</th>
                <th>Grupo</th>
                <th className="td-active">Ativo</th>
                <th className="header-number ">Estoque</th>
                <th className="header-number ">R$ Venda</th>
                <th className="header-number ">R$ Liquido</th>
                <th className="header-actions">Ações</th>
              </tr>
            </thead>
            <tbody>
              {page?.content.map((product) => (
                <tr key={product.id}>
                  <td>{product.description}</td>
                  <td>{product.group.groupName} </td>
                  <td className="td-active">
                    {product.active ? (
                      <FaCheck color="green" />
                    ) : (
                      <FaTimes color="red" />
                    )}
                  </td>
                  <td className="td-number">{product.currentInventory}</td>
                  <td className="td-number">
                    {product && <ProductPrice price={product.salePrice} />}
                  </td>
                  <td className="td-number">
                    {product && <ProductPrice price={product.priceValue} />}
                  </td>
                  <div className="btn-actions-container ">
                    <td className="flex-row btn-actions">
                      <Tooltip
                        title="Clique aqui para editar o produto"
                        arrow
                        placement="top"
                      >
                        <button
                          
                          type="button"
                          onClick={() => handleEdit(product.id)}
                        >
                          <FaEdit />
                        </button>
                      </Tooltip>
                      <Tooltip
                        title="Clique aqui para excluir o produto"
                        arrow
                        placement="top"
                      >
                        <button
                          className='btn-trash'
                          type="button"
                          onClick={() => handleDelete(product.id)}
                        >
                          <FaTrash />
                        </button>
                      </Tooltip>
                    </td>
                  </div>
                </tr>
              ))}
            </tbody>
          </table>
          {
            <Pagination
              forcePage={page?.number}
              pageCount={page?.totalPages || 0}
              range={page?.size || 0}
              onChange={handlePageChange}
            />
          }

          <Link to={`/record/products/create`} className="btn btn-primary">
            Adicionar
          </Link>
        </div>
      </div>
    </>
  );
};

export default List;
