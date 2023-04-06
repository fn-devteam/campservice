import { AxiosRequestConfig } from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { requestBackend } from 'util/requests';

import { useEffect, useState } from 'react';
import './styles.css';
import { Supplier } from 'types/supplier';
import FindSupplierPersonType from 'components/FindSupplierPersonType';
import { Controller, useForm } from 'react-hook-form';
import InputMaskCustom from 'components/InputMaskCustom';

import './styles.css';

type UrlParams = {
  supplierId: string;
};

type findedCep = {
  address: string;
  city: string;
  state: string;
  district: string;
  error: boolean;
};

const Form = () => {
  const [enderecos, setEnderecos] = useState<findedCep>();
  const [zipCode, setZipCode] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    control,
  } = useForm<Supplier>();

  const [selectedCep, setSelectedCep] = useState<string>();

  const handleZipCodeChange = async (codeZip: string) => {
    if (codeZip.length === 8) {
      setSelectedCep(codeZip);
    }
  };
  useEffect(() => {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: `/cep/${selectedCep}`,
    };

    requestBackend(config)
      .then((response) => {
        const enderecos = response.data as findedCep;
        setValue('address', enderecos.address);
        setValue('district', enderecos.district);
        setValue('city', enderecos.city);
        setValue('state', enderecos.state);
       // setEnderecos(response.data);
      
       console.log(enderecos);
      
        toast.info('Endereço encontrado');
      })
      .catch(() => {
        toast.error('Endereço não encontrado');
      });
  }, [selectedCep,setValue, enderecos]);
  
  const [selectedSupplierPersonType, setSelectedSupplierPersonType] =
    useState<string>();
  const [checked, setChecked] = useState<boolean>(true);

  const history = useHistory();

  const { supplierId } = useParams<UrlParams>();

  const isEditing = supplierId !== 'create';

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
        const registrationDate = supplier.registrationDate || '';
        setValue(
          'registrationDate',
          getValues('registrationDate') || registrationDate
        );
      });
    }
  }, [
    isEditing,
    supplierId,
    setValue,
    getValues,
    setSelectedSupplierPersonType,
    setChecked,
  ]);

  const [currentDate, setCurrentDate] = useState('');
  const [registrationDate, setRegistrationDate] = useState<string>('');

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear().toString().slice(-2);

    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    const currentDate = `${day}${month}${year}`;
    setRegistrationDate(currentDate);
  }, []);

  useEffect(() => {
    if (!registrationDate) {
      setValue('registrationDate', currentDate);
    }
  }, [currentDate, registrationDate, setValue]);

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
                  <label htmlFor="name" className="form-label">
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
                  <label htmlFor="fantasyName" className="form-label">
                    Nome Fantasia
                  </label>
                  <input
                    {...register('fantasyName')}
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
                  <label htmlFor="registrationDate" className="form-label">
                    Cadastramento
                  </label>
                  <Controller
                    name="registrationDate"
                    rules={{ required: 'Campo obrigatório' }}
                    control={control}
                    render={({ field }) => (
                      <InputMaskCustom
                        {...register('registrationDate', {
                          required: 'Campo obrigatório',
                        })}
                        mask={['99/99/99']}
                        type="text"
                        className={`form-control base-input-value ${
                          errors.registrationDate ? 'Inválido' : ''
                        }`}
                        name="registrationDate"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        value={field.value || registrationDate}
                        onChange={(value) =>
                          setValue('registrationDate', value)
                        }
                      />
                    )}
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
                  <label htmlFor="cpfCnpj" className="form-label">
                    CPF / CNPJ
                  </label>
                  <Controller
                    name="cpfCnpj"
                    rules={{ required: 'Campo obrigatório' }}
                    control={control}
                    render={({ field }) => (
                      <InputMaskCustom
                        {...register('cpfCnpj', {
                          required: 'Campo obrigatório',
                        })}
                        // mask={field.value.length <= 11 ? ['999.999.999-99'] : ['99.999.999/9999-99']}
                        mask={['999.999.999-99', '99.999.999/9999-99']}
                        type="text"
                        className={`form-control  ${
                          errors.cpfCnpj ? 'Inválido' : ''
                        }`}
                        name="cpfCnpj"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        value={field.value}
                        onChange={(value) => setValue('cpfCnpj', value)}
                      />
                    )}
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
                  <Controller
                    name="zipCode"
                    rules={{ required: 'Campo obrigatório' }}
                    control={control}
                    render={({ field }) => (
                      <InputMaskCustom
                        {...register('zipCode', {
                          required: 'Campo obrigatório',
                        })}
                        mask={['99.999-999']}
                        type="text"
                        className={`form-control  ${
                          errors.zipCode ? 'Inválido' : ''
                        }`}
                        name="zipCode"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        value={field.value}
                        onChange={(event) => {
                          const newValue = event;
                          console.log(newValue);
                          setZipCode(newValue);
                          handleZipCodeChange(newValue.replace(/[.-]/g, ''));
                        }}
                      />
                    )}
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
                  <label htmlFor="city" className="form-label">
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
                <div className="mb-3 col-12 col-md-4 col-lg-1">
                  <label htmlFor="stateRegistration" className="form-label">
                    Estado
                  </label>
                  <Controller
                    name="stateRegistration"
                    rules={{ required: 'Campo obrigatório' }}
                    control={control}
                    render={({ field }) => (
                      <InputMaskCustom
                        {...register('stateRegistration', {
                          required: 'Campo obrigatório',
                        })}
                        mask={['AA']}
                        type="text"
                        className={`form-control  ${
                          errors.stateRegistration ? 'Inválido' : ''
                        }`}
                        name="stateRegistration"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        value={field.value}
                        onChange={(value) =>
                          setValue('stateRegistration', value)
                        }
                      />
                    )}
                  />
                  <div className="invalid-feedback d-block">
                    {errors.stateRegistration?.message}
                  </div>
                </div>
                <div className="mb-3 col-4 col-md-3 form-group">
                  <div className="mb-3 col-12 col-md-4 col-lg-12">
                    <label htmlFor="referenceCode" className="form-label">
                      E-mail
                    </label>
                    <input
                      {...register('emailAddress', {
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Email inválido',
                        },
                      })}
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
                    className={`form-control  ${
                      errors.phoneNumber ? 'Inválido' : ''
                    }`}
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
                    className={`form-control  ${
                      errors.cellNumber ? 'Inválido' : ''
                    }`}
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
                    className={`form-control  ${
                      errors.contactPerson ? 'Inválido' : ''
                    }`}
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
