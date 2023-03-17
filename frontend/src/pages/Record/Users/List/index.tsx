import { AxiosRequestConfig } from 'axios';
import Pagination from 'components/Pagination';
import { useCallback, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { User } from 'types/user';
import { SpringPage } from 'types/vendor/spring';
import { requestBackend } from 'util/requests';
import { FaEdit, FaTrash } from 'react-icons/fa';
import './styles.css';
import { UserFilterData } from 'components/UserFilter';
import ContentLoader from 'react-content-loader';


type ControlComponentsData = {
  activePage: number;
  filterData: UserFilterData;
};

  

const List = () => {

  const [page, setPage] = useState<SpringPage<User>>();
  const [filteredPage, setFilteredPage] = useState<SpringPage<User>>();
  const [searchTerm, setSearchTerm] = useState('');


  
  const history = useHistory();

  const handleDelete = ( userId: number) => {

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

  
  
  const [controlComponentsData, setControlComponentsData] =
  useState<ControlComponentsData>({
    activePage: 0,
    filterData: { firstname: ''},  });

    const handlePageChange = (pageNumber: number) => {
      setControlComponentsData({ activePage: pageNumber, filterData: controlComponentsData.filterData });
    };

    const handleSubmitFilter = (data: UserFilterData) => {
      setControlComponentsData({ activePage: 0, filterData: data });   
      const config: AxiosRequestConfig = {
        method: 'GET',
        url: '/users',
        params: {
          page: 0,
          size: 3,
          firstName: searchTerm
        },
      };
      requestBackend(config).then((response) => {
        setFilteredPage(response.data);
      });
    };
  
    const getUsers = useCallback((filterData: UserFilterData) => {
      const config: AxiosRequestConfig = {
        method: 'GET',
        url: '/users',
        params: {
          page: controlComponentsData.activePage,
          size: 5,
          searchTerm,
          ...(controlComponentsData.filterData || {}),
          ...filterData,
        },
        
      };
      requestBackend(config).then((response) => {
        setPage(response.data);
      });
    }, [controlComponentsData, searchTerm]);
    
    useEffect(() => {
      getUsers(controlComponentsData.filterData);
    }, [getUsers, controlComponentsData.filterData]);
    
  
    function handleEdit  (userId : number)  {

      history.push(`/record/users/${userId}`);
    };


    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
      const searchTerm = event.target.value;
      setSearchTerm(searchTerm);
    
      const config: AxiosRequestConfig = {
        method: 'GET',
        url: '/users',
        params: {
          page: 0,
          size: 5,
          searchTerm,
        },
      };
    
      requestBackend(config).then((response) => {
        setFilteredPage(response.data);
      });
    };
    const [searchResults, setSearchResults] = useState<User[]>([]);

    useEffect(() => {
      const filteredUsers = page?.content.filter(user =>
        user.firstName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filteredUsers || []);
    }, [page, searchTerm]);
    
    return (
      <><div className='input-container'>
      <Link to={`/record/users/create`}>
        <button className="btn btn-primary text-white btn-crud-add">
          Adicionar
        </button>
      </Link>
      <div className='search-container'>
        <input
          type='text'
          placeholder='Pesquisar por nome'
          value={searchTerm}
          onChange={handleSearch}
        />
        <button onClick={() => handleSubmitFilter({ firstname: searchTerm })}>
          Pesquisar
        </button>
      </div>
    </div>
    
        <div className="container">
          <h1>Lista de usuários</h1>
          <table className="table">
            <thead>
              <tr>
                <th>Nome</th>
                <th></th>
                <th>E-mail</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>{searchTerm !== '' && searchResults.map(user => (
  <tr key={user.id}>
    <td>{user.firstName}</td>
    <td>{user.lastName}</td>
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

{searchTerm === '' && (filteredPage || page)?.content.map(user => (
  <tr key={user.id}>
    <td>{user.firstName}</td>
    <td>{user.lastName}</td>
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
        {  <Pagination
            forcePage={page?.number}
            pageCount={filteredPage ? filteredPage.totalPages : (page ? page.totalPages : 0)}
            range={999}
            onChange={handlePageChange} />}
        </div>
      </>
    )
    
    
}

export default List;