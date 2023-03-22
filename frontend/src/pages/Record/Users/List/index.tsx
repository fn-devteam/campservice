import { AxiosRequestConfig } from 'axios';
import Pagination from 'components/Pagination';
import { useCallback, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { User } from 'types/user';
import { SpringPage } from 'types/vendor/spring';
import { requestBackend } from 'util/requests';
import { FaEdit, FaTrash } from 'react-icons/fa';
import './styles.css';
import { debounce } from 'lodash';
import { Tooltip } from '@mui/material';

type UserFilterData = {
  searchTerm: string;
  property: string;
};

type ControlComponentsData = {
  activePage: number;
  filterData: UserFilterData;
};

const List = () => {
  const [page, setPage] = useState<SpringPage<User>>();
  const [controlComponentsData, setControlComponentsData] =
    useState<ControlComponentsData>({
      activePage: 0,
      filterData: {
        searchTerm: '',
        property: 'firstName',
      },
    });

  const history = useHistory();

  function handleEdit(userId: number) {
    history.push(`/record/users/${userId}`);
  }

  const handleDelete = (userId: number) => {
    if (!window.confirm('Tem certeza que deseja deletar?')) {
      return;
    }

    const config: AxiosRequestConfig = {
      method: 'DELETE',
      url: `/users/${userId}`,
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
    controlComponentsData.filterData.property = 'firstName';
    controlComponentsData.filterData.searchTerm = '';
    updateComponentData(controlComponentsData);
  };

  const updateComponentData = (
    componentData: ControlComponentsData
  ) => setControlComponentsData({ ...componentData });;

  const getUsers = (componentData: ControlComponentsData) => {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: '/users',
      params: {
        page: componentData.activePage,
        size: 5,
        ...(componentData.filterData || {}),
      },
    };

    requestBackend(config).then((response) => {
      setPage(response.data);
    });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceHandleSearch = useCallback(
    debounce((componentData) => getUsers(componentData), 500),
    []
  );

  useEffect(
    () => debounceHandleSearch(controlComponentsData),
    [controlComponentsData, debounceHandleSearch]
  );

  return (
    <>
      <div className="card my-3 mx-5">
        <div className="card-header"><h3>Filtro</h3></div>
        <div className="card-body">
          <div className='row mb-3'>
            <div className="col">
              <label htmlFor="search-input" className='form-label'>Pesquisar por</label>
              {/* <Tooltip title="Digite o que você procura !" arrow placement='top'> */}
                <input
                  placeholder="Pesquisar"
                  onChange={handleSearchTermChange}
                  value={controlComponentsData.filterData.searchTerm}
                  className="form-control"
                  id='search-input'
                  title='Digite o que você procura !'
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                />
              {/* </Tooltip> */}
            </div>

            <div className="col">
              <label htmlFor='property-input' className='form-label'>Filtrar por</label>
              <Tooltip title="Escolha o campo de pesquisa !" arrow placement='top'>
                <select
                  className="form-control"
                  onChange={handlePropertyFilterChange}
                  value={controlComponentsData.filterData.property}
                  id="property-input"
                >
                  <option value="firstName">Nome</option>
                  <option value="lastName">Sobrenome</option>
                  <option value="email">Email</option>
                </select>
              </Tooltip>
            </div>
          </div>

          <div className="row">
            <div className="col-2">
              <button
                className="btn btn-outline-secondary"
                onClick={handleFilterClear}>
                Limpar
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="card mb-5 mx-5">
        <div className="card-header">
          <h3>Lista de usuários</h3>
        </div>
        <div className="card-body">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Nome</th>
                <th>E-mail</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {page?.content.map((user) => (
                <tr key={user.id}>
                  <td>
                    {user.firstName} {user.lastName}
                  </td>
                  <td>{user.email}</td>
                  <td className='flex-row'>

                    <Tooltip title="Clique aqui para editar o usuário" arrow placement='top'>
                      <button
                        type="button"
                        onClick={() => handleEdit(user.id)}
                      >
                        <FaEdit />
                      </button>
                    </Tooltip>
                    <Tooltip title="Clique aqui para excluir o usuário" arrow placement='top'>
                      <button
                        type="button"
                        onClick={() => handleDelete(user.id)}
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

          <Link to={`/record/users/create`} className="btn btn-primary">
              Adicionar
          </Link>
        </div>
      </div>
    </>
  );
};

export default List;
