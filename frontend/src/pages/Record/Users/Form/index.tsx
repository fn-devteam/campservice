
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
    setValue
  } = useForm<User>();

  

  useEffect(() => {if (isEditing) {
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
      ...formData
  };   

    const config: AxiosRequestConfig = {
      method: isEditing ? 'PUT' : 'POST',
      url: isEditing ? `/users/${userId}` : '/users',
      data
    };
  
    requestBackend(config)
    .then(() => {
      toast.info('Usuário cadastrado com sucess');
      console.log('Usuário cadastrado com sucess');
    })
    .catch(() => {
      toast.error('Erro ao cadastrar usuário');
    });
    history.push("/record/users")
  };

      
  const handleCancel = () => {
    history.push("/record/users")
  };




    return (
        <div className="user-crud-container"> 
            <div className="base-card user-crud-form">
              <h1 className="user-crud-form-title" >Dados do Usuário</h1>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className='user-crud-inputs-left-container'>
                   <div className='user-crud-input'>
                      <input
                        {...register('firstName', {
                          required: 'Campo obrigatório'
                        })}
                        type="text"
                        className={`form-control base-input ${errors.firstName ? 'is-invalid' : ''}`}
                        placeholder="Nome"
                        name="firstName"
                      />
                   <div className="invalid-feedback d-block">{errors.firstName?.message}</div>
                  </div>
                  <div className='user-crud-input'>
                    <input
                      {...register('lastName', {
                        required: 'Campo obrigatório'
                      })}
                      type="text"
                      className={`form-control base-input ${errors.lastName? 'is-invalid' : ''}`}
                      placeholder="Sobrenome"
                      name="lastName"
                    />
                  </div>
                  <div className='user-crud-input'>
                    <input
                      {...register('email', {
                        required: 'Campo obrigatório',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Email inválido'
                        }
                      })}
                      type="text"
                      className={`form-control base-input ${errors.email ? 'is-invalid' : ''}`}
                      placeholder="Email"
                      name="email"
                    />
                  </div>
                </div>
                <div className='user-crud-buttons-container'>
                  <button className='btn btn-outline-danger user-crud-button' 
                    onClick={handleCancel}>
                    Cancelar
                  </button> 
                  <button className='btn btn-primary user-crud-button text-white'>
                    Salvar
                  </button>   
                </div>
              </form>
            </div>
         </div>   
        
    )
}

export default Form;