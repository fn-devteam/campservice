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
  const [controlComponentsData, setControlComponentsData] = useState<ControlComponentsData>({
    activePage: 0,
    filterData: { 
      searchTerm: '',
      property: 'firstName'
    },
  });

  const history = useHistory();

  function handleEdit(userId: number) {
    history.push(`/record/users/${userId}`);
  };

  const handleDelete = (userId: number) => {

    if (!window.confirm("Tem certeza que deseja deletar?")) {
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
    controlComponentsData.activePage = pageNumber
    updateComponentDataAndHandleSearch(controlComponentsData)
  };

  const handleSearchTermChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    controlComponentsData.filterData.searchTerm = event.target.value
    updateComponentDataAndHandleSearch(controlComponentsData)
  };

  const handlePropertyFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    controlComponentsData.filterData.property = event.target.value;
    updateComponentDataAndHandleSearch(controlComponentsData)
  }

  const handleFilterClear = () => {
    controlComponentsData.filterData.property = "firstName"
    controlComponentsData.filterData.searchTerm = "";
    updateComponentDataAndHandleSearch(controlComponentsData)
  }

  const updateComponentDataAndHandleSearch = (componentData: ControlComponentsData) => {
    setControlComponentsData({ ...componentData });
    debounceHandleSearch(componentData)
  }

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

  const debounceHandleSearch = useCallback(
    debounce(componentData => getUsers(componentData), 500)
  ,[])

  useEffect(() => getUsers(controlComponentsData), []);

  return (
    <><div className='input-container'>
      <Link to={`/record/users/create`}>
        <button className="btn btn-primary text-white btn-crud-add">
          Adicionar
        </button>
      </Link>
      <div className='user-search-container'>
       <div className='term-select'>
          <input
            type='text'
            placeholder='Pesquisar'
            onChange={handleSearchTermChange}
            value={controlComponentsData.filterData.searchTerm}
          />
          
            <select 
              onChange={handlePropertyFilterChange}
              value={controlComponentsData.filterData.property}
              >
              <option value="firstName">Nome</option>
              <option value="lastName">Sobrenome</option>
              <option value="email">Email</option>
            </select>
         
          <button className='btn btn-secondary text-white btn-user-filter-clear' onClick={handleFilterClear}>Limpar</button>
          </div>
      </div>
    </div>

      <div className="container">
        <h1>Lista de usuários</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {page?.content.map(user => (
              <tr key={user.id}>
                <td>{user.firstName} {user.lastName}</td>
                <td>{user.email}</td>
                <td>
                  <button type="button" onClick={() => handleEdit(user.id)} style={{ marginRight: '10px' }}>
                    <FaEdit />
                  </button>
                  <button type="button" onClick={() => handleDelete(user.id)} style={{ marginRight: '10px' }}>
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}

          </tbody>
        </table>
        {<Pagination
          forcePage={page?.number}
          pageCount={(page?.totalPages || 0)}
          range={page?.size || 0}
          onChange={handlePageChange} />}
      </div>
    </>
  )


}

export default List;