import { AxiosRequestConfig } from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { requestBackend } from 'util/requests';
import { useCallback, useEffect, useState } from 'react';
import { Supplier } from 'types/supplier';
import { Controller, useForm } from 'react-hook-form';
import InputMaskCustom from 'components/InputMaskCustom';
import FindByZipCode from 'components/FindByZipCode';
import moment from 'moment';
import './styles.css';
import 'react-datepicker/dist/react-datepicker.css';

type UrlParams = {
  supplierId: string;
};

interface CepData {
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
  cep: string;
}
const Form = () => {
  const [zipCodeComponent, setZipCodeComponent] = useState('');
  const { supplierId } = useParams<UrlParams>();
  const isEditing = supplierId !== 'create';

  const history = useHistory();

  const handleCpfCnpjChange = (value: string) => {
    const personType = value.length <= 14 ? 'FISICA' : 'JURIDICA';
    setValue('personType', personType);
  };

  const handlePhoneNumberChange = (phoneNumber: string) => {
    setValue("phoneNumber", phoneNumber.replace(/\D+/g, ''));
  };

  const handleCellNumberChange = (cellNumber: string) => {
    setValue("cellNumber", cellNumber.replace(/\D+/g, ''));
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    control,
  } = useForm<Supplier>({
    defaultValues: {
      registrationDate: moment.utc(Date.now()).format('DD-MM-YYYY')
    }
  });

  const handleZipCodeChange = (zipCode: string) => {
    if (zipCode.length === 10) {
      setZipCodeComponent(zipCode);
      console.log('cep enviado para consulta....', zipCode, '<==');
    }
    return;
  };

  const handleZipCodeUpdate = useCallback(
    (dataCep: CepData) => {
      setValue('address', dataCep.logradouro);
      setValue('district', dataCep.bairro);
      setValue('city', dataCep.localidade);
      setValue('state', dataCep.uf);
      setValue('zipCode', dataCep.cep.replace(/[.-]/g, ''));
    },
    [setValue]
  );

  useEffect(() => {
    if (isEditing) {

      requestBackend({ url: `/suppliers/${supplierId}` }).then((response) => {
        const supplier = response.data as Supplier;

        setValue('name', supplier.name);
        setValue('fantasyName', supplier.fantasyName);

        const registrationDate = supplier.registrationDate || Date.now();
        setValue('registrationDate', moment.utc(registrationDate).format('DD-MM-YYYY'));

        setValue('active', supplier.active);
        setValue('cpfCnpj', supplier.cpfCnpj);
        setValue('personType', supplier.personType);
        setValue('stateRegistration', supplier.stateRegistration);
        setValue('zipCode', supplier.zipCode?.replace(/[.-]/g, ''));
        setValue('address', supplier.address);
        setValue('district', supplier.district);
        setValue('city', supplier.city);
        setValue('state', supplier.state);
        setValue('emailAddress', supplier.emailAddress);
        setValue('phoneNumber', supplier.phoneNumber);
        setValue('cellNumber', supplier.cellNumber);
        setValue('contactPerson', supplier.contactPerson);
        setValue('obs', supplier.obs);
      });
    }
  }, [
    setValue,
    getValues,
    isEditing,
    supplierId
  ]);

  const handleInputChange = (value: string) => {
    setValue('registrationDate', value);
  };

  const onSubmit = (formData: Supplier) => {
    const dateRecord = moment.utc(formData.registrationDate, 'DD/MM/YYYY').format('YYYY-MM-DD');
    const [year, month, day] = dateRecord.split('-');
    const cpfCnpjRecord = formData.cpfCnpj.replace(/[.\-/?]/g, '');
    const zipCodeRecord = formData.zipCode.replace(/[.\-/?]/g, '');

    const data = {
      ...formData,
      toEdit: isEditing,
      registrationDate: new Date(
        Date.UTC(parseInt(year), parseInt(month) - 1, parseInt(day))
      ),
      cpfCnpj: cpfCnpjRecord,
      zipCode: zipCodeRecord,
    };

    const config: AxiosRequestConfig = {
      method: isEditing ? 'PUT' : 'POST',
      url: isEditing ? `/suppliers/${supplierId}` : '/suppliers',
      data,
    };

    requestBackend(config)
      .then(() => toast.info('Fornecedor cadastrado com sucesso'))
      .catch(() => toast.error('Erro ao cadastrar fornecedor'));
    history.push('/record/suppliers');
  };

  const handleCancel = () => {
    history.push('/record/suppliers');
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
                    {...register("name", {
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
                    className={`form-control  ${errors.fantasyName ? 'Inválido' : ''}`}
                    name="fantasyName"
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
                        {...field}
                        mask={['99/99/9999']}
                        type="text"
                        className={`form-control base-input-value ${errors.registrationDate ? 'Inválido' : ''
                          }`}
                        name="registrationDate"
                        data-bs-toggle="tooltip"
                        value={field.value}
                        onChange={handleInputChange}
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
                      onChange={(event) => setValue('active', event.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="active">
                      <span>{getValues('active') ? 'Ativo' : 'Inativo'}</span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="mb-3 col-12 col-md-4 col-lg-3">
                  <div className="d-flex justify-content-between">
                    <label htmlFor="cpfCnpj" className="form-label">
                      CPF / CNPJ
                    </label>
                    <Controller 
                      name='personType'
                      control={control}
                      render={({field}) => (
                        <div className="text-danger">{field.value === 'FISICA' ? 'Física' : 'Jurídica'}</div>
                      )}
                    />

                  </div>
                  <Controller
                    name="cpfCnpj"
                    rules={{ required: 'Campo obrigatório' }}
                    control={control}
                    render={({ field }) => (
                      <InputMaskCustom
                        {...field}
                        mask={['999.999.999-99', '99.999.999/9999-99']}
                        type="text"
                        className={`form-control  ${errors.cpfCnpj ? 'Inválido' : ''
                          }`}
                        name="cpfCnpj"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        value={field.value}
                        onChange={(value) => {
                          setValue('cpfCnpj', value);
                          handleCpfCnpjChange(value);
                        }}
                      />
                    )}
                  />
                  <div className="invalid-feedback d-block">
                    {errors.cpfCnpj?.message}
                  </div>
                </div>

                <div className="mb-3 col-12 col-md-4 col-lg-3">
                  <label htmlFor="stateRegistration" className="form-label">
                    Inscrição Estadual
                  </label>
                  <Controller
                    name="stateRegistration"
                    control={control}
                    render={({ field }) => (
                      <InputMaskCustom
                        {...field}
                        mask={['999999999999']}
                        type="text"
                        className={`form-control  ${errors.state ? 'Inválido' : ''
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
                <div className="mb-3 col-4 col-md-4 col-lg-2">
                  <label htmlFor="zipCode" className="form-label">
                    CEP
                  </label>
                  <FindByZipCode
                    zipCode={zipCodeComponent?.replace(/[.-]/g, '')}
                    onUpdate={handleZipCodeUpdate}
                  />
                  <Controller
                    name="zipCode"
                    rules={{ required: 'Campo obrigatório' }}
                    control={control}
                    render={({ field }) => (
                      <InputMaskCustom
                        {...field}
                        mask={['99.999-999']}
                        type="text"
                        className={`form-control  ${errors.zipCode ? 'CEP Inválido' : ''
                          }`}
                        defaultValue={field.value}
                        name="zipCode"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        value={field.value}
                        onChange={(value) => {
                          if (value?.length === 10) {
                            handleZipCodeChange(value);
                          }
                        }}
                      />
                    )}
                  />
                  <div className="invalid-feedback d-block">
                    {errors.zipCode?.message}
                  </div>
                </div>
                <div className="mb-3 col-12 col-md-4">
                  <label htmlFor="address" className="form-label">
                    Endereço
                  </label>
                  <input
                    {...register('address')}
                    type="text"
                    className={`form-control   ${errors.address ? 'Inválido' : ''
                      }`}
                    name="address"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                  />
                  <div className="invalid-feedback d-block">
                    {errors.address?.message}
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="mb-3 col-12 col-md-4 col-lg-4">
                  <label htmlFor="district" className="form-label">
                    Bairro
                  </label>
                  <input
                    {...register('district')}
                    type="text"
                    className={`form-control  ${errors.district ? 'Inválido' : ''
                      }`}
                    name="district"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
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
                  <label htmlFor="state" className="form-label">
                    Estado
                  </label>
                  <Controller
                    name="state"
                    rules={{ required: 'Campo obrigatório' }}
                    control={control}
                    render={({ field }) => (
                      <InputMaskCustom
                        {...field}
                        mask={['AA']}
                        type="text"
                        className={`form-control  ${errors.state ? 'Inválido' : ''
                          }`}
                        name="state"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        value={field.value}
                        onChange={(value) => setValue('state', value)}
                      />
                    )}
                  />
                  <div className="invalid-feedback d-block">
                    {errors.state?.message}
                  </div>
                </div>

                <div className="mb-3 col-12 col-md-4">
                  <label htmlFor="emailAddress" className="form-label">
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
                    className={`form-control  ${errors.emailAddress ? 'Inválido' : ''
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
              <div className="row">
                <div className="mb-3 col-4 col-md-3">
                  <label htmlFor="phoneNumber" className="form-label">
                    Telefone Fixo
                  </label>
                  <Controller
                    name="phoneNumber"
                    control={control}
                    render={({ field }) => (
                      <InputMaskCustom
                        {...field}
                        mask={['(99) 9999 - 9999']}
                        type="text"
                        className={`form-control  ${errors.phoneNumber ? 'Inválido' : ''
                          }`}
                        name="phoneNumber"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        value={field.value}
                        onChange={(value) => {
                          handlePhoneNumberChange(value);
                        }}
                      />
                    )}
                  />

                  <div className="invalid-feedback d-block">
                    {errors.phoneNumber?.message}
                  </div>
                </div>
                <div className="mb-3 col-4 col-md-3">
                  <label htmlFor="cellNumber" className="form-label">
                    Celular
                  </label>
                  <Controller
                    name="cellNumber"
                    control={control}
                    render={({ field }) => (
                      <InputMaskCustom
                        {...field}
                        mask={['(99) 9999 - 9999', '(99) 9 9999 - 9999']}
                        type="text"
                        className={`form-control  ${errors.cellNumber ? 'Inválido' : ''
                          }`}
                        name="cellNumber"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        value={field.value}
                        onChange={(value) => {
                          handleCellNumberChange(value);
                        }}
                      />
                    )}
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
                    className={`form-control  ${errors.contactPerson ? 'Inválido' : ''
                      }`}
                    name="contactPerson"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                  />
                  <div className="invalid-feedback d-block">
                    {errors.contactPerson?.message}
                  </div>
                </div>

                <div className="mb-3 col-4 col-md-12">
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
