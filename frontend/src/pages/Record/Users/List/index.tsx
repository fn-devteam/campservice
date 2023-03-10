import { AxiosRequestConfig } from 'axios';
import Pagination from 'components/Pagination';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { User } from 'types/user';
import { SpringPage } from 'types/vendor/spring';
import { requestBackend } from 'util/requests';
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
        {page?.content.map(user => (
          <div key={user.id} className="user-name-container">
          <h6>{user.firstName}</h6>
          <h6>{user.lastName} </h6>
          <h6>{user.email} </h6>
          onDelete={}
          </div>
        ))}
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