import { AxiosRequestConfig } from 'axios';
import FindGroup from 'components/FindGroup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Product } from 'types/product';
import { ProductGroup } from 'types/productGroup';
import { requestBackend } from 'util/requests';
import './styles.css';

type UrlParams = {
  productId: string;
};

const Form = () => {
  
  const [selectedGroup, setSelectedGroup] = useState<ProductGroup | null>(null);

  const history = useHistory();

  const { productId } = useParams<UrlParams>();

  const isEditing = productId !== 'create';

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Product>();

  useEffect(() => {
    if (isEditing) {
      requestBackend({ url: `/products/${productId}` }).then((response) => {
        const product = response.data as Product;

        setValue('description', product.description);
        
        setValue('group', product.group);
        setSelectedGroup(product.group);

        setValue('active', product.active);
        setValue('unit', product.unit);
        setValue('obs', product.obs);
        setValue('purchasePrice', product.purchasePrice);
        setValue('currentInventory', product.currentInventory);
        setValue('minimumStock', product.minimumStock);
        setValue('salePrice', product.salePrice);
        setValue('priceValue', product.priceValue);
        setValue('profitMargin', product.profitMargin);
        setValue('factoryIndex', product.factoryIndex);
        setValue('listPrice', product.listPrice);
        setValue('rebate', product.rebate);
        setValue('originalCode', product.originalCode);
        setValue('originalCode1', product.originalCode1);
        setValue('quantityLastEntry', product.quantityLastEntry);
        setValue('productLocation', product.productLocation);
        setValue('lastSupplier', product.lastSupplier);
        setValue('itemType', product.itemType);
        setValue('references', product.references);
      });
    }
  }, [isEditing, productId, setValue]);

  const onSubmit = (formData: Product) => {
    const data = {
      ...formData,
      group: selectedGroup,
    };

    const config: AxiosRequestConfig = {
      method: isEditing ? 'PUT' : 'POST',
      url: isEditing ? `/products/${productId}` : '/products',
      data,
    };

    requestBackend(config)
      .then(() => {
        toast.info('Produto cadastrado com sucess');
      })
      .catch(() => {
        toast.error('Erro ao cadastrar produto');
      });
    history.push('/record/products');
  };

  const handleCancel = () => {
    history.push('/record/products');
  };

  const handleSelectGroup = (group: ProductGroup | null) => {
    setSelectedGroup(group);
  };

  return (
    <div>
      <div className="card my-3 mx-5">
        <div className="card-header">
          <h3>Dados do Produto</h3>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="mb-3 col-12 col-md-6 col-lg4">
                <label htmlFor="description" className="form-label">
                  Descrição
                </label>
                <input
                  {...register('description', {
                    required: 'Campo obrigatório',
                  })}
                  type="text"
                  className={`form-control  ${
                    errors.description ? 'Inválido' : ''
                  }`}
                  name="description"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                />
                <div className="invalid-feedback d-block">
                  {errors.description?.message}
                </div>
              </div>
              <div className="mb-3 col-12 col-md-6 col-lg-4">
        <label htmlFor="group" className="form-label">
          Grupo
        </label>
        <FindGroup
          onSelectGroup={handleSelectGroup}
          selectedGroup={selectedGroup}
          className="form-control"
        />
        {errors.group && (
          <div className="invalid-feedback d-block">
            {errors.group.message}
          </div>
        )}
      </div>
            </div>
            <div className="row">
              <div className="mb-3 col-12 col-md-6 col-lg4">
                <label htmlFor="active" className="form-label">
                  Ativo
                  <input
                    {...register('active', {
                      required: 'Campo obrigatório',
                    })}
                    type="bool"
                    className={`form-control  ${
                      errors.group ? 'Inválido' : ''
                    }`}
                    name="active"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                  />
                </label>
              </div>
            </div>

            <div className="d-grid gap-2 col-6 d-md-flex ">
              <button className="btn btn-outline-danger" onClick={handleCancel}>
                Cancelar
              </button>
              <button className="btn btn-primary">Salvar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
