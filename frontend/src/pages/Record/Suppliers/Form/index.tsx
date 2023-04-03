import { AxiosRequestConfig } from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { requestBackend } from 'util/requests';
import { useEffect, useState } from 'react';
import './styles.css';
import { Supplier } from 'types/supplier';
import FindSupplierPersonType from 'components/FindSupplierPersonType';
import { useForm } from 'react-hook-form';

type UrlParams = {
  supplierId: string;
};

const Form = () => {
  const [selectedSupplierPersonType, setSelectedSupplierPersonType] =
    useState<string>();
  const [checked, setChecked] = useState<boolean>(true);

  const history = useHistory();

  const { supplierId } = useParams<UrlParams>();

  const isEditing = supplierId !== 'create';

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Supplier>();

  useEffect(() => {
    if (isEditing) {
      requestBackend({ url: `/suppliers/${supplierId}` }).then((response) => {
        const supplier = response.data as Supplier;
        setValue('name', supplier.name ? supplier.name : '');
        setValue(
          'fantasyName',
          supplier.fantasyName ? supplier.fantasyName : ''
        );
        setValue('active', supplier.active);
        setChecked(supplier.active ? true : false);
        setValue(
          'emailAddress',
          supplier.emailAddress ? supplier.emailAddress : ''
        );
        setValue('cpfCnpj', supplier.cpfCnpj ? supplier.cpfCnpj : '');
        setValue('personType', supplier.personType ? supplier.personType : '');
        setSelectedSupplierPersonType(supplier.personType);
        setValue(
          'stateRegistration',
          supplier.stateRegistration ? supplier.stateRegistration : ''
        );
        setValue('zipCode', supplier.zipCode ? supplier.zipCode : '');
        setValue('address', supplier.address ? supplier.address : '');
        setValue('district', supplier.district ? supplier.district : '');
        setValue('city', supplier.city ? supplier.city : '');
        setValue('state', supplier.state ? supplier.state : '');
        setValue(
          'phoneNumber',
          supplier.phoneNumber ? supplier.phoneNumber : ''
        );
        setValue('cellNumber', supplier.cellNumber ? supplier.cellNumber : '');
        setValue(
          'contactPerson',
          supplier.contactPerson ? supplier.contactPerson : ''
        );
        setValue('obs', supplier.obs ? supplier.obs : '');
        setValue(
          'registrationDate',
          supplier.registrationDate ? supplier.registrationDate : ''
        );
      });
    }
  }, [isEditing, supplierId, setValue]);

  const onSubmit = (formData: Supplier) => {
    const data = {
      ...formData,
      active: checked,
    };

    const config: AxiosRequestConfig = {
      method: isEditing ? 'PUT' : 'POST',
      url: isEditing ? `/suppliers/${supplierId}` : '/suppliers',
      data,
    };

    requestBackend(config)
      .then(() => {
        toast.info('Fornecedor cadastrado com sucesso');
      })
      .catch(() => {
        toast.error('Erro ao cadastrar fornecedor');
      });
    history.push('/record/suppliers');
  };

  const handleCancel = () => {
    history.push('/record/suppliers');
  };

  const handleSelectSupplierPersonType = (itemType: string) => {
    setSelectedSupplierPersonType(itemType);
  };

  return (
    <div>
      <div className="card my-3 mx-5">
        <div className="card-header">
          {isEditing ? (
            <h3>Dados do Fornecedor - Editar</h3>
          ) : (
            <h3>Dados do Fornecedor - Incluir</h3>
          )}{' '}
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="container">
              <div className="row">
                <div className="mb-3 col-12 col-md-4 col-lg-4">
                  <label htmlFor="description" className="form-label">
                    Razão Social
                  </label>
                  <input
                    {...register('name', {
                      required: 'Campo obrigatório',
                    })}
                    type="text"
                    className={`form-control  ${errors.name ? 'Inválido' : ''}`}
                    name="name"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                  />
                  <div className="invalid-feedback d-block">
                    {errors.name?.message}
                  </div>
                </div>
                <div className="mb-3 col-12 col-md-6 col-lg-4">
                  <label htmlFor="group" className="form-label">
                    Nome Fantasia
                  </label>
                  <input
                    {...register('fantasyName', {
                      required: 'Campo obrigatório',
                    })}
                    type="text"
                    className={`form-control  ${
                      errors.fantasyName ? 'Inválido' : ''
                    }`}
                    name="unit"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                  />
                  <div className="invalid-feedback d-block">
                    {errors.fantasyName?.message}
                  </div>
                </div>
                <div className="mb-3 col-lg-2 ">
                  <label htmlFor="unit" className="form-label">
                    Cadastramento
                  </label>
                  <input
                    {...register('registrationDate', {
                      required: 'Campo obrigatório',
                    })}
                    type="text"
                    className={`form-control  ${
                      errors.registrationDate ? 'Inválido' : ''
                    }`}
                    name="unit"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                  />
                  <div className="invalid-feedback d-block">
                    {errors.registrationDate?.message}
                  </div>
                </div>
                <div className="mb-3 col-lg-2 mt-3">
                  <div className="form-check form-switch pt-4">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      id="active"
                      {...register('active')}
                      checked={checked}
                      onChange={(event) => setChecked(event.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="active">
                      <span>{checked ? 'Ativo' : 'Inativo'}</span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="row">
                
                <div className="mb-3 col-12 col-md-4 col-lg-4">
                  <label htmlFor="originalCode1" className="form-label">
                    CPF / CNPJ
                  </label>
                  <input
                    {...register('cpfCnpj')}
                    type="text"
                    className={`form-control  ${
                      errors.cpfCnpj ? 'Inválido' : ''
                    }`}
                    name="cpfCnpj"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                  />
                  <div className="invalid-feedback d-block">
                    {errors.cpfCnpj?.message}
                  </div>
                </div>
                <div className="mb-3 col-12 col-md-4 col-lg-4">
                  <label htmlFor="originalCode" className="form-label">
                    Pessoa
                  </label>
                  <FindSupplierPersonType
                    onSelectSupplierPersonType={handleSelectSupplierPersonType}
                    selectedSupplierPersonType={selectedSupplierPersonType}
                    className="form-control"
                  />
                  <div className="invalid-feedback d-block">
                    {errors.personType?.message}
                  </div>
                </div>
                <div className="mb-3 col-4 col-md-4 col-lg-2">
                  <label htmlFor="zipCode" className="form-label">
                    CEP
                  </label>
                  <input
                    {...register('zipCode')}
                    type="text"
                    className={`form-control base-input-value  ${
                      errors.zipCode ? 'Inválido' : ''
                    }`}
                    name="zipCode"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                  />
                  <div className="invalid-feedback d-block">
                    {errors.zipCode?.message}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="mb-3 col-12 col-md-3">
                  <label htmlFor="minimumStock" className="form-label">
                    Endereço
                  </label>
                  <input
                    {...register('address')}
                    type="text"
                    className={`form-control   ${
                      errors.address ? 'Inválido' : ''
                    }`}
                    name="address"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                  />
                  <div className="invalid-feedback d-block">
                    {errors.address?.message}
                  </div>
                </div>
                <div className="mb-3 col-12 col-md-3">
                  <label htmlFor="district" className="form-label">
                    Bairro
                  </label>
                  <input
                    {...register('district')}
                    type="text"
                    className={`form-control base-input-value ${
                      errors.district ? 'Inválido' : ''
                    }`}
                    name="district"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    disabled
                  />
                  <div className="invalid-feedback d-block">
                    {errors.district?.message}
                  </div>
                </div>
                <div className="mb-3 col-12 col-md-6 col-lg-3">
                  <label htmlFor="itemType" className="form-label">
                    Cidade
                  </label>
                  <input
                    {...register('city')}
                    type="text"
                    className={`form-control  ${errors.city ? 'Inválido' : ''}`}
                    name="city"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                  />
                  <div className="invalid-feedback d-block">
                    {errors.city?.message}
                  </div>
                </div>
                <div className="mb-3 col-12 col-md-4 col-lg-2">
                  <label htmlFor="referenceCode" className="form-label">
                    Estado
                  </label>
                  <input
                    {...register('stateRegistration')}
                    type="text"
                    className={`form-control  ${
                      errors.stateRegistration ? 'Inválido' : ''
                    }`}
                    name="stateRegistration"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                  />
                  <div className="invalid-feedback d-block">
                    {errors.stateRegistration?.message}
                  </div>
                </div>
                <div className="mb-3 col-4 col-md-3 form-group">
                  <div className="mb-3 col-12 col-md-4 col-lg-2">
                    <label htmlFor="referenceCode" className="form-label">
                      E-mail
                    </label>
                    <input
                      {...register('emailAddress')}
                      type="text"
                      className={`form-control  ${
                        errors.emailAddress ? 'Inválido' : ''
                      }`}
                      name="emailAddress"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                    />
                    <div className="invalid-feedback d-block">
                      {errors.emailAddress?.message}
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="mb-3 col-4 col-md-6">
                  <label htmlFor="phoneNumber" className="form-label">
                    Telefone Fixo
                  </label>
                  <input
                    {...register('phoneNumber')}
                    type="text"
                    className={`form-control  ${errors.phoneNumber ? 'Inválido' : ''}`}
                    name="phoneNumber"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                  />
                  <div className="invalid-feedback d-block">
                    {errors.phoneNumber?.message}
                  </div>
                </div>
                <div className="mb-3 col-4 col-md-6">
                  <label htmlFor="cellNumber" className="form-label">
                    Celular
                  </label>
                  <input
                    {...register('cellNumber')}
                    type="text"
                    className={`form-control  ${errors.cellNumber ? 'Inválido' : ''}`}
                    name="cellNumber"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                  />
                  <div className="invalid-feedback d-block">
                    {errors.cellNumber?.message}
                  </div>
                </div>
                <div className="mb-3 col-4 col-md-6">
                  <label htmlFor="contactPerson" className="form-label">
                    Pessoa para contato
                  </label>
                  <input
                    {...register('contactPerson')}
                    type="text"
                    className={`form-control  ${errors.contactPerson ? 'Inválido' : ''}`}
                    name="contactPerson"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                  />
                  <div className="invalid-feedback d-block">
                    {errors.contactPerson?.message}
                  </div>
                </div>

                <div className="mb-3 col-4 col-md-6">
                  <label htmlFor="obs" className="form-label">
                    Observação
                  </label>
                  <input
                    {...register('obs')}
                    type="text"
                    className={`form-control  ${errors.obs ? 'Inválido' : ''}`}
                    name="obs"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                  />
                  <div className="invalid-feedback d-block">
                    {errors.obs?.message}
                  </div>
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
