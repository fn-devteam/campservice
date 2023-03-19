import { ReactComponent as SearchIcon } from 'assets/Images/search-icon.svg';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { User } from 'types/user';
import './styles.css';

export type UserFilterData = {
  firstName: string;
};

type Props = {
  users: User[];
  onSubmitFilter: (data: UserFilterData) => void;
};

const UserFilter = ({ users, onSubmitFilter }: Props) => {

  const { register, handleSubmit, setValue } =
    useForm<UserFilterData>();

  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  const onSubmit = (formData: UserFilterData) => {
    onSubmitFilter(formData);
  };

  const handleFormClear = () => {
    setValue('firstName', '');
    setFilteredUsers([]);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const filtered = users.filter(
      (user) =>
        user.firstName.toLowerCase().includes(value.toLowerCase()) ||
        user.lastName.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredUsers(filtered);
    console.log(filtered);
  };

  return (
    <div className="base-card user-filter-container">
      <form onSubmit={handleSubmit(onSubmit)} className="user-filter-form">
        <div className="user-filter-name-container">
          <input
            {...register('firstName', {
              onChange: handleSearch,
            })}
            type="text"
            className="form-control"
            placeholder="Nome do Usuario"
            name="firstName"
            
          />
         
          <button className="user-filter-search-icon">
            <SearchIcon />
          </button>
        </div>
        <div className="user-filter-bottom-container">
          <button
            onClick={handleFormClear}
            className="btn btn-outline-secondary btn-user-filter-clear"
          >
            LIMPAR<span className="btn-user-filter-word"> FILTRO</span>
          </button>
        </div>
      </form>
      {filteredUsers.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Sobrenome</th>
              <th>E-mail</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>
                  <button className="user-table-edit-button">
                  <FaEdit />
                  </button>
                  <button className="user-table-delete-button">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
    </div>
  );
};

export default UserFilter;