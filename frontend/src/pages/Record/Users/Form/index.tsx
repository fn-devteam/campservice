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
      <div className="card my-3 mx-5">
        <div className="card-header">
          <h3>Dados do Usuário</h3>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="mb-3 col-12 col-md-6 col-lg4">
                <label htmlFor="firstName" className='form-label'>Nome</label>
                <input
                  {...register('firstName', {
                    required: 'Campo obrigatório',
                  })}
                  type="text"
                  className={`form-control  ${errors.firstName ? 'Inválido' : ''
                    }`}
                  name="firstName"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                />
                <div className="invalid-feedback d-block">
                  {errors.firstName?.message}
                </div>
              </div>
              <div className="mb-3 col-12 col-md-6 col-lg4">
                <label htmlFor="lastName" className='form-label'>Sobrenome</label>
                <input
                  {...register('lastName', {
                    required: 'Campo obrigatório',
                  })}
                  type="text"
                  className={`form-control  ${errors.lastName ? 'Inválido' : ''
                    }`}
                  name="lastName"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                />
              </div>
            </div>
            <div className="row">
              <div className="mb-3 col-12 col-md-6 col-lg4">
                <label htmlFor="email" className='form-label'>Email</label>
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
                  placeholder="email@example.com"
                  name="email"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                />
              </div>
            </div>

            <div className="d-grid gap-2 col-6 d-md-flex ">
              <button
                className="btn btn-outline-danger"
                onClick={handleCancel}
              >
                Cancelar
              </button>
              <button className="btn btn-primary">
                Salvar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
