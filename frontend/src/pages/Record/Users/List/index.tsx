import { AxiosRequestConfig } from 'axios';
import Pagination from 'components/Pagination';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { User } from 'types/user';
import { SpringPage } from 'types/vendor/spring';
import { requestBackend } from 'util/requests';
import { FaEdit, FaTrash } from 'react-icons/fa';
import './styles.css';

type ControlComponentsData = {
  activePage: number;
};

//type Props = {
//  user: User;
//  onDelete: Function;
//};
const List = () => {
 // { user, onDelete }: Props

  const [page, setPage] = useState<SpringPage<User>>();

  const handleDelete = ( userId: number) => {

    if (!window.confirm("Tem certeza que deseja deletar?")) {
      return;
    }

    const config: AxiosRequestConfig = {
      method: 'DELETE',
      url: `/users/${userId}`,
    };

    requestBackend(config).then((response) => {
      setPage(response.data);
      console.log(response);
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
          size: 3
        },
      };
      requestBackend(config).then((response) => {
        setPage(response.data);
      });
    }, [controlComponentsData]);
  
    useEffect(() => {
      getUsers();
    }, [getUsers]);
  
    const handleEdit = (userId: number) => {
      // Lógica para editar um item
      //console.log(`Editando item ${}`);
    };


    return (
    
    <><div className='input-container'>
        <Link to="/register/users/create">
          <button className="btn btn-primary text-white btn-crud-add">
            Adicionar
          </button>
        </Link>
        <div className='base-card user-search-container'>
          Pesquisar
        </div>
      </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h1>Lista de usuários</h1>
          <table>
            <thead>
              <tr>
                <th style={{ position: 'sticky', top: '0' }}>Nome</th>
                <th style={{ position: 'sticky', top: '0' }}></th>
                <th style={{ position: 'sticky', top: '0' }}>E-mail</th>
                <th style={{ position: 'sticky', top: '0' }}>Ações</th>
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
            range={3}
            onChange={handlePageChange} />


        </div></>
    )
    
}

export default List;

/*
import { AxiosRequestConfig } from 'axios';
import Pagination from 'components/Pagination';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
          size: 3
        },
      };
      requestBackend(config).then((response) => {
        setPage(response.data);
      });
    }, [controlComponentsData]);
  
    useEffect(() => {
      getUsers();
    }, [getUsers]);
  
    const handleEdit = (userId: number) => {
      // Lógica para editar um item
      //console.log(`Editando item ${}`);
    };
  
    const handleDelete = (userId: number) => {
      // Lógica para excluir um item
      //console.log(`Excluindo item ${}`);
    };


    return (
    <>
    <div className='input-container'>
      <Link to="/register/users/create">
        <button className="btn btn-primary text-white btn-crud-add">
          Adicionar
        </button>
      </Link>
      <div className='base-card user-search-container'>
            Pesquisar
      </div> 
       
    </div>       
    <div className="user-list-header">
        <div>Nome </div>
        <div>E-mail</div>
    </div>   
    <div className="user-list-detail column">
      <form>
        {page?.content.map(user => (
          <><div key={user.id} className="user-name-container">
            <div>
              <h6>{user.firstName}</h6>
            </div>
            <div className='user-lastName'>
              <h6>{user.lastName} </h6></div>
            <div className='user-email'>
              <h6>{user.email} </h6></div>
            <div className='list-buttons-container'>
              <div className='list-buttons'>
                <button type="button" onClick={() => handleEdit(user.id)} style={{ marginRight: '10px' }}>
                    <FaEdit />
                </button>
                <button type="button" onClick={() => handleDelete(user.id)}>
                    <FaTrash />
                </button>
              </div>
            </div>
          </div>
          </>
         
         
        ))} 
        </form>
    </div>
      <Pagination
        forcePage={page?.number}
        pageCount={page ? page.totalPages : 0}
        range={3}
        onChange={handlePageChange}
      />
      <div className="user-buttons-container">
        <button
         // onClick={() => handleDelete(user.id)}
        //  className="btn btn-outline-danger user-button user-button-first"
        >
          EXCLUIR
        </button>
        <Link to={`/record/users}`}>
          <button className="btn btn-outline-secondary user-button">
            EDITAR
          </button>
        </Link>
      </div>
    </>
    )
    
}

export default List;
*/