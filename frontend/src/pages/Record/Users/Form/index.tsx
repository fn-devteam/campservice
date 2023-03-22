import { AxiosRequestConfig } from 'axios';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { User } from 'types/user';
import { requestBackend } from 'util/requests';
import './styles.css';

type UrlParams = {
  userId: string;
};

const Form = () => {
  const history = useHistory();

  const { userId } = useParams<UrlParams>();

  const isEditing = userId !== 'create';

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<User>();

  useEffect(() => {
    if (isEditing) {
      requestBackend({ url: `/users/${userId}` }).then((response) => {
        const user = response.data as User;

        setValue('firstName', user.firstName);
        setValue('lastName', user.lastName);
        setValue('email', user.email);
      });
    }
  }, [isEditing, userId, setValue]);

  const onSubmit = (formData: User) => {
    const data = {
      ...formData,
    };

    const config: AxiosRequestConfig = {
      method: isEditing ? 'PUT' : 'POST',
      url: isEditing ? `/users/${userId}` : '/users',
      data,
    };

    requestBackend(config)
      .then(() => {
        toast.info('Usuário cadastrado com sucess');
      })
      .catch(() => {
        toast.error('Erro ao cadastrar usuário');
      });
    history.push('/record/users');
  };

  const handleCancel = () => {
    history.push('/record/users');
  };

  return (
    <div >
      <div className="base-card user-crud-form card my-5 mx-5">
        <div className="card-header card-title  ">
          <h3>Dados do Usuário</h3>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div className="mb-3">
                <input
                  {...register('firstName', {
                    required: 'Campo obrigatório',
                  })}
                  type="text"
                  className={`form-control  ${
                    errors.firstName ? 'Inválido' : ''
                  }`}
                  placeholder="Nome"
                  name="firstName"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                />
                <div className="invalid-feedback d-block">
                  {errors.firstName?.message}
                </div>
              </div>
              <div className="mb-3">
                <input
                  {...register('lastName', {
                    required: 'Campo obrigatório',
                  })}
                  type="text"
                  className={`form-control  ${
                    errors.lastName ? 'Inválido' : ''
                  }`}
                  placeholder="Sobrenome"
                  name="lastName"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                />
              </div>
              <div className="mb-3">
                <input
                  {...register('email', {
                    required: 'Campo obrigatório',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Email inválido',
                    },
                  })}
                  type="text"
                  className={`form-control  ${errors.email ? 'Inválido' : ''}`}
                  placeholder="Email"
                  name="email"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                />
              </div>
            </div>

            <div className="d-grid gap-2 col-6 d-md-flex ">
              <div className="btn-cancelar">
                <button
                  className="btn btn-outline-danger btn-lg"
                  onClick={handleCancel}
                >
                  Cancelar
                </button>
              </div>
              <div className="btn-salvar">
                <button className="btn btn-primary btn-lg text-white">
                  {' '}
                  Salvar{' '}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
