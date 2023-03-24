import { AxiosRequestConfig } from 'axios';
import Pagination from 'components/Pagination';
import { useCallback, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { SpringPage } from 'types/vendor/spring';
import { requestBackend } from 'util/requests';
import { FaEdit, FaTrash } from 'react-icons/fa';
import './styles.css';
import { debounce } from 'lodash';
import { Tooltip } from '@mui/material';
import { ProductGroup } from 'types/productGroup';

type GroupFilterData = {
  searchTerm: string;
  property: string;
};

type ControlComponentsData = {
  activePage: number;
  filterData: GroupFilterData;
};

const List = () => {
  const [page, setPage] = useState<SpringPage<ProductGroup>>();
  const [controlComponentsData, setControlComponentsData] =
    useState<ControlComponentsData>({
      activePage: 0,
      filterData: {
        searchTerm: '',
        property: 'name',
      },
    });

  const history = useHistory();

  function handleEdit(productGroupId: number) {
    console.log(productGroupId, "<== handleedit");
    history.push(`/record/productsGroups/${productGroupId}`);
  }

  const handleDelete = (productGroupId: number) => {
    if (!window.confirm('Tem certeza que deseja deletar?')) {
      return;
    }

    const config: AxiosRequestConfig = {
      method: 'DELETE',
      url: `/product_groups/${productGroupId}`,
    };

    requestBackend(config).then((response) => {
      history.go(0);
      setPage(response.data);
      history.go(0);
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
    controlComponentsData.filterData.property = 'name';
    controlComponentsData.filterData.searchTerm = '';
    updateComponentData(controlComponentsData);
  };

  const updateComponentData = (componentData: ControlComponentsData) =>
    setControlComponentsData({ ...componentData });

  const getGroups = (componentData: ControlComponentsData) => {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: '/product_groups',
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
    debounce((componentData) => getGroups(componentData), 500),
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
                  <option value="name">Descrição</option>
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
          <h3>Lista de grupos</h3>
        </div>
        <div className="card-body">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Descrição</th>
                <th>Obsevação</th>
              </tr>
            </thead>
            <tbody>
              {page?.content.map((productGroup) => (
                <tr key={productGroup.id}>
                  <td>
                    {productGroup.name} 
                  </td>
                  <td>{productGroup.obs}</td>
                  <td className="flex-row">
                    <Tooltip
                      title="Clique aqui para editar o grupo"
                      arrow
                      placement="top"
                    >
                      <button type="button" onClick={() => handleEdit(productGroup.id)}>
                        <FaEdit />
                      </button>
                    </Tooltip>
                    <Tooltip
                      title="Clique aqui para excluir o grupo"
                      arrow
                      placement="top"
                    >
                      <button
                        type="button"
                        onClick={() => handleDelete(productGroup.id)}
                      >
                        <FaTrash />
                      </button>
                    </Tooltip>
                  </td>
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

          <Link to={`/record/productsGroups/create`} className="btn btn-primary">
            Adicionar
          </Link>
        </div>
      </div>
    </>
  );
};

export default List;
