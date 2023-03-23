import { AxiosRequestConfig } from 'axios';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ProductGroup } from 'types/productGroup';
import { requestBackend } from 'util/requests';
import './styles.css';

type UrlParams = {
  productGroupId: string;
};

const Form = () => {
  const history = useHistory();

  const { productGroupId } = useParams<UrlParams>();
  console.log(productGroupId, "<== Form antes")
  const isEditing = productGroupId !== 'create';

  console.log(productGroupId, "<== Form")
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ProductGroup>();

  useEffect(() => {
    if (isEditing) {
      requestBackend({ url: `/product_groups/${productGroupId}` }).then((response) => {
        const productGroup = response.data as ProductGroup;
        setValue('name', productGroup.name);
        setValue('obs', productGroup.obs);
      });
    }
  }, [isEditing, productGroupId, setValue]);

  const onSubmit = (formData: ProductGroup) => {
    const data = {
      ...formData,
    };

    const config: AxiosRequestConfig = {
      method: isEditing ? 'PUT' : 'POST',
      url: isEditing ? `/product_groups/${productGroupId}` : '/product_groups',
      data,
    };

    requestBackend(config)
      .then(() => {
        toast.info('Grupo cadastrado com sucesso');
      })
      .catch(() => {
        toast.error('Erro ao cadastrar grupo');
      });
    history.push('/record/productsGroups');
  };

  const handleCancel = () => {
    history.push('/record/productsGroups');
  };

  return (
    <div >
      <div className="card my-3 mx-5">
        <div className="card-header">
          <h3>Dados do Grupo</h3>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="mb-3 col-12 col-md-6 col-lg4">
                <label htmlFor="name" className='form-label'>Descrição</label>
                <input
                  {...register('name', {
                    required: 'Campo obrigatório',
                  })}
                  type="text"
                  className={`form-control  ${errors.name ? 'Inválido' : ''
                    }`}
                  name="name"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                />
                <div className="invalid-feedback d-block">
                  {errors.name?.message}
                </div>
              </div>
              <div className="mb-3 col-12 col-md-6 col-lg4">
                <label htmlFor="obs" className='form-label'>Observação</label>
                <input
                  {...register('obs', {
                    required: 'Campo obrigatório',
                  })}
                  type="text"
                  className={`form-control  ${errors.obs ? 'Inválido' : ''
                    }`}
                  name="obs"
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
