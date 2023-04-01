import { Tooltip } from '@mui/material';
import { AxiosRequestConfig } from 'axios';
import Pagination from 'components/Pagination';
import { debounce } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { FaCheck, FaEdit, FaTimes, FaTrash } from 'react-icons/fa';
import { Link, useHistory } from 'react-router-dom';
import { SpringPage } from 'types/vendor/spring';
import { requestBackend } from 'util/requests';
import './styles.css';
import { Supplier } from 'types/supplier';
import CpfCnpjMask from 'components/CpfCnpjMask';
import FoneMask from 'components/FoneMask';

type SupplierFilterData = {
  searchTerm: string;
  property: string;
};

type ControlComponentsData = {
  activePage: number;
  filterData: SupplierFilterData;
};

const List = () => {

    

  const [page, setPage] = useState<SpringPage<Supplier>>();
  const [controlComponentsData, setControlComponentsData] =
    useState<ControlComponentsData>({
      activePage: 0,
      filterData: {
        searchTerm: '',
        property: 'name',
      },
    });
  const history = useHistory();

  function handleEdit(supplierId: number) {
    history.push(`/record/supplier/${supplierId}`);
  }

  const handleDelete = (supplierId: number) => {
    if (!window.confirm('Tem certeza que deseja deletar?')) {
      return;
    }

    const config: AxiosRequestConfig = {
      method: 'DELETE',
      url: `/supplier/${supplierId}`,
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
    controlComponentsData.filterData.property = 'name';
    controlComponentsData.filterData.searchTerm = '';
    updateComponentData(controlComponentsData);
  };

  const updateComponentData = (componentData: ControlComponentsData) =>
    setControlComponentsData({ ...componentData });

  const getSuppliers = (componentData: ControlComponentsData) => {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: '/suppliers',
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
    debounce((componentData) => getSuppliers(componentData), 500),
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
                  <option value="name">Nome</option>
                  <option value="fantasyName">Nome fantasia</option>
                  <option value="cpfCnpj">CPF/CNPJ</option>
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
          <h3>Lista de fornecedores</h3>
        </div>
        <div className="card-body">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Nome</th>
                <th>CPF/CNPJ</th>
                <th className="td-active">Ativo</th>
                <th >Número Celular</th>
                <th >Email</th>
                <th >Pessoa de Contato </th>
                <th className="header-actions">Ações</th>
              </tr>
            </thead>
            <tbody>
              {page?.content.map((supplier) => (
                <tr key={supplier.id}>
                  <td>{supplier.name}</td>
                  <td>  <CpfCnpjMask value={supplier.cpfCnpj} /></td>
                  <td className="td-active">
                    {supplier.active ? (
                      <FaCheck color="green" />
                    ) : (
                      <FaTimes color="red" />
                    )}
                  </td>
                  <td ><FoneMask value={supplier.cellNumber}/></td>
                  <td > {supplier.emailAddress} </td>
                  <td >{supplier.contactPerson}</td>
                  <div className="btn-actions-container ">
                    <td className="flex-row btn-actions">
                      <Tooltip
                        title="Clique aqui para editar o fornecedor"
                        arrow
                        placement="top"
                      >
                        <button
                          
                          type="button"
                          onClick={() => handleEdit(supplier.id)}
                        >
                          <FaEdit />
                        </button>
                      </Tooltip>
                      <Tooltip
                        title="Clique aqui para excluir o fornecedor"
                        arrow
                        placement="top"
                      >
                        <button
                          className='btn-trash'
                          type="button"
                          onClick={() => handleDelete(supplier.id)}
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

          <Link to={`/record/suppliers/create`} className="btn btn-primary">
            Adicionar
          </Link>
        </div>
      </div>
    </>
  );
};

export default List;
