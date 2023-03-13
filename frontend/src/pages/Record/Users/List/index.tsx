import { AxiosRequestConfig } from 'axios';
import Pagination from 'components/Pagination';
import { useCallback, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { User } from 'types/user';
import { SpringPage } from 'types/vendor/spring';
import { requestBackend } from 'util/requests';
import { FaEdit, FaTrash } from 'react-icons/fa';
import './styles.css';

type ControlComponentsData = {
  activePage: number;
};

  

const List = () => {

  const [page, setPage] = useState<SpringPage<User>>();
  
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
    activePage: 0  });

    const handlePageChange = (pageNumber: number) => {
      setControlComponentsData({ activePage: pageNumber });
    };

    const getUsers = useCallback(() => {
      const config: AxiosRequestConfig = {
        method: 'GET',
        url: '/users',
        params: {
          page: controlComponentsData.activePage,
          size: 5
        },
      };
      requestBackend(config).then((response) => {
        setPage(response.data);
      });
    }, [controlComponentsData]);
  
    useEffect(() => {
      getUsers();
    }, [getUsers]);

  
    function handleEdit  (userId : number)  {

      history.push(`/record/users/${userId}`);
    };


    return (
    
    <><div className='input-container'>
        <Link to={`/record/users/create`}>
          <button className="btn btn-primary text-white btn-crud-add">
            Adicionar
          </button>
        </Link>
        <div className='base-card user-search-container'>
          Pesquisar
        </div>
      </div>
        <div className="container">
          <h1>Lista de usuários</h1>
          <table className="table">
            <thead>
              <tr>
                <th >Nome</th>
                <th ></th>
                <th >E-mail</th>
                <th >Ações</th>
              </tr>
            </thead>
            <tbody>
              <div >

                {page?.content.map(user => (
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
              </div>
            </tbody>
          </table>
          <Pagination
            forcePage={page?.number}
            pageCount={page ? page.totalPages : 0}
            range={5}
            onChange={handlePageChange} />


        </div></>
    )
    
}

export default List;