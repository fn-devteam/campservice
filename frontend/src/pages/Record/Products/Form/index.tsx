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
  const [checked, setChecked] = useState<boolean>(false);

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
        const defaultSupplier = {
          id: 0,
          name: 'Fornecedor Padrão',
          active: 0,
          emailAddress: '',
          cpfCnpj: '',
          personType: 0,
          stateRegistration: '',
          zipCode: '',
          address: '',
          district: '',
          city: '',
          state: '',
          phoneNumber: '',
          cellNumber: '',
          contactPerson: '',
          obs: '',
          registrationDate: '',
          referenceCode: ''
        };

        const defaultGroup = {
          id: 1,
          groupName: 'Grupo Padrão',
          obs: '',
        };
        setValue('description', product.description ? product.description : '');

        setValue('group', product.group ? product.group : defaultGroup);
        setSelectedGroup(product.group);

        setValue('active', product.active);
        setValue('unit', product.unit ? product.unit : '');
        setValue('obs', product.obs ? product.obs : '');
        setValue(
          'purchasePrice',
          product.purchasePrice ? product.purchasePrice : 0
        );
        setValue(
          'currentInventory',
          product.currentInventory ? product.currentInventory : 0
        );
        setValue(
          'minimumStock',
          product.minimumStock ? product.minimumStock : 0
        );
        setValue('salePrice', product.salePrice ? product.salePrice : 0);
        setValue('priceValue', product.priceValue ? product.priceValue : 0);
        setValue(
          'profitMargin',
          product.profitMargin ? product.profitMargin : 0
        );
        setValue(
          'factoryIndex',
          product.factoryIndex ? product.factoryIndex : 0
        );
        setValue('listPrice', product.listPrice ? product.listPrice : 0);
        setValue('rebate', product.rebate ? product.rebate : 0);
        setValue(
          'originalCode',
          product.originalCode ? product.originalCode : ''
        );
        setValue(
          'originalCode1',
          product.originalCode1 ? product.originalCode1 : ''
        );
        setValue(
          'quantityLastEntry',
          product.quantityLastEntry ? product.quantityLastEntry : 0
        );
        setValue(
          'productLocation',
          product.productLocation ? product.productLocation : ''
        );
        setValue(
          'lastSupplier',
          product.lastSupplier ? product.lastSupplier : defaultSupplier
        );

        setValue('itemType', product.itemType ? product.itemType : '');
        setValue('referenceCode', product.referenceCode ? product.referenceCode : '');
      });
    }
  }, [isEditing, productId, setValue]);

  const onSubmit = (formData: Product) => {
    const data = {
      ...formData,
      group: selectedGroup,
      active: checked,
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
            <div className="container">
              <div className="row linha-1">
                <div className="mb-3 col-12 col-md-4 col-lg4 ">
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
                <div className="col-auto">
                  <label htmlFor="unit" className="form-label">
                    Unidade
                  </label>
                  <input
                    {...register('unit', {
                      required: 'Campo obrigatório',
                    })}
                    type="text"
                    className={`form-control  ${
                      errors.description ? 'Inválido' : ''
                    }`}
                    name="unit"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                  />
                  <div className="invalid-feedback d-block">
                    {errors.description?.message}
                  </div>
                </div>
                <div className="col-auto">
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      id="active"
                      {...register('active')}
                      onChange={(event) => setChecked(event.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="active">
                      <span>{checked ? 'Ativo' : 'Inativo'}</span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="container row align-items-start linha-2">
                <div className="mb-3 col-12 col-md-4 col-lg4 col  ">
                  <label htmlFor="originalCode" className="form-label">
                    Código original
                  </label>
                  <input
                    {...register('originalCode')}
                    type="text"
                    className={`form-control  ${
                      errors.originalCode ? 'Inválido' : ''
                    }`}
                    name="originalCode"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                  />
                  <div className="invalid-feedback d-block">
                    {errors.originalCode?.message}
                  </div>
                </div>
                <div className="mb-3 col-12 col-md-4 col-lg4 col ">
                  <label htmlFor="originalCode1" className="form-label">
                    Código original1
                  </label>
                  <input
                    {...register('originalCode1')}
                    type="text"
                    className={`form-control  ${
                      errors.originalCode1 ? 'Inválido' : ''
                    }`}
                    name="originalCode1"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                  />
                  <div className="invalid-feedback d-block">
                    {errors.originalCode1?.message}
                  </div>
                </div>
              </div>
              <div className="mb-3 col-12 col-md-4 col-lg4 col referencia ">
                <label htmlFor="referenceCode" className="form-label">
                  Referência
                </label>
                <input
                  {...register('referenceCode')}
                  type="text"
                  className={`form-control  ${
                    errors.referenceCode ? 'Inválido' : ''
                  }`}
                  name="referenceCode"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                />
                <div className="invalid-feedback d-block">
                  {errors.referenceCode?.message}
                </div>
              </div>
              <div className="d-grid gap-2 col-6 d-md-flex ">
                <button
                  className="btn btn-outline-danger"
                  onClick={handleCancel}
                >
                  Cancelar
                </button>
                <button className="btn btn-primary">Salvar</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
