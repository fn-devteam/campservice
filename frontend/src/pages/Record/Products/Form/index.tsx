import { AxiosRequestConfig } from 'axios';
import FindGroup from 'components/FindGroup';
import FindProductType from 'components/FindProductType';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Product } from 'types/product';
import { ProductGroup } from 'types/productGroup';
import { requestBackend } from 'util/requests';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import CurrencyInput from 'react-currency-input-field';
import './styles.css';
import InputMask from 'components/InputMask';
import { upperCase } from 'lodash';

type UrlParams = {
  productId: string;
};

const Form = () => {
  const [selectedGroup, setSelectedGroup] = useState<ProductGroup | null>(null);
  const [selectedProductType, setSelectedProductType] = useState<string>();
  const [checked, setChecked] = useState<boolean>(true);
  const [valueMasked, setValueMasked] = useState("")

  const history = useHistory();

  const { productId } = useParams<UrlParams>();

  const isEditing = productId !== 'create';

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    control,
    
    
  } = useForm<Product>();

  useState()

  useEffect(() => {
    const defaultSupplier = {
      id: 1,
      name: 'Fornecedor Padrão',
      fantasyName: '',
      active: 0,
      emailAddress: '',
      cpfCnpj: '',
      personType: '',
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
      referenceCode: '',
    };


    const defaultGroup = {
      id: 1,
      groupName: 'Grupo Padrão',
      obs: '',
    };
    setValue('lastSupplier', defaultSupplier);

    

    if (isEditing) {
      requestBackend({ url: `/products/${productId}` }).then((response) => {
        const product = response.data as Product;
        setValue('description', product.description ? product.description : '');
        setValue('group', product.group ? product.group : defaultGroup);
        setSelectedGroup(product.group);

        setValue('active', product.active);
        setChecked(product.active ? true : false);

        setValue('unit', product.unit ? upperCase(valueMasked) : '');
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
        setSelectedProductType(product.itemType);

        setValue(
          'referenceCode',
          product.referenceCode ? product.referenceCode : ''
        );
      });
    }
  }, [isEditing, productId, setValue, valueMasked]);

  const onSubmit = (formData: Product) => {
    const data = {
      ...formData,
      group: selectedGroup,
      active: checked,
      purchasePrice: String(formData.purchasePrice).replace(',', '.'),
    };

    const config: AxiosRequestConfig = {
      method: isEditing ? 'PUT' : 'POST',
      url: isEditing ? `/products/${productId}` : '/products',
      data,
    };

    requestBackend(config)
      .then(() => {
        toast.info('Produto cadastrado com sucesso');
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

  const handleSelectProductType = (itemType: string) => {
    setSelectedProductType(itemType);
  };

  /* 
											WPr_perc_ganho = produto.PRO_PERCENTUAL_GANHO;
											WPr_Vlr = produto.PRO_PRECO_COMPRA;
											WPr_vend = (WPr_Vlr * (1 + ( WPr_perc_ganho / 100)));
											WPr_Abat = produto.PRO_PERCENTUAL_ABATE;
											mDesc = WPr_vend * (WPr_Abat / 100);
											WPR_liq = WPr_vend - mDesc; */

  function calcPurchasePrice() {
    const purchasePrice = getValues('purchasePrice');

    const profit = getValues('profitMargin');
    const discount = getValues('rebate');
    const sale = purchasePrice * (1 + profit / 100);
    const mdesc = sale * (discount / 100);
    const liq = sale - mdesc;
    setValue(`priceValue`, +liq.toFixed(2));
    setValue(`salePrice`, +sale.toFixed(2));
    console.log(`salePrice = ${sale}`);
  }

  return (
    <div>
      <div className="card my-3 mx-5">
        <div className="card-header">
          {isEditing ? (
            <h3>Dados do Produto - Editar</h3>
          ) : (
            <h3>Dados do Produto - Incluir</h3>
          )}
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="container">
              <div className="row">
                <div className="mb-3 col-12 col-md-4 col-lg-4">
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
                <div className="mb-3 col-lg-2 ">
                  <label htmlFor="unit" className="form-label">
                    Unidade
                  </label>
                  <InputMask
                    {...register('unit', {
                      required: 'Campo obrigatório',
                      
                    })}
                  

                    type="text"
                    className={`form-control  ${
                      errors.description ? 'Inválido' : ''
                    }`}
                    name="valueMasked"
                    mask={["AA"]}
                    onChange={setValueMasked}
                    value={valueMasked}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                  /> 
                  <div className="invalid-feedback d-block">
                    {errors.description?.message}
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
                <div className="mb-3 col-12 col-md-4 col-lg-4">
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
                <div className="mb-3 col-12 col-md-4 col-lg-2">
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
                <div className="mb-3 col-4 col-md-4 col-lg-2">
                  <label htmlFor="currentInventory" className="form-label">
                    Estoque
                  </label>
                  <input
                    {...register('currentInventory')}
                    type="text"
                    className={`form-control base-input-value  ${
                      errors.currentInventory ? 'Inválido' : ''
                    }`}
                    name="currentInventory"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                  />
                  <div className="invalid-feedback d-block">
                    {errors.currentInventory?.message}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="mb-3 col-12 col-md-3">
                  <label htmlFor="minimumStock" className="form-label">
                    Estoque Mínimo
                  </label>
                  <input
                    {...register('minimumStock')}
                    type="text"
                    className={`form-control base-input-value  ${
                      errors.minimumStock ? 'Inválido' : ''
                    }`}
                    name="minimumStock"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                  />
                  <div className="invalid-feedback d-block">
                    {errors.minimumStock?.message}
                  </div>
                </div>
                <div className="mb-3 col-12 col-md-3">
                  <label htmlFor="quantityLastEntry" className="form-label">
                    Qtde. da Última Entrada
                  </label>
                  <input
                    {...register('quantityLastEntry')}
                    type="text"
                    className={`form-control base-input-value ${
                      errors.quantityLastEntry ? 'Inválido' : ''
                    }`}
                    name="quantityLastEntry"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    disabled
                  />
                  <div className="invalid-feedback d-block">
                    {errors.quantityLastEntry?.message}
                  </div>
                </div>
                <div className="mb-3 col-12 col-md-6 col-lg-3">
                  <label htmlFor="itemType" className="form-label">
                    Tipo
                  </label>
                  <FindProductType
                    onSelectProductType={handleSelectProductType}
                    selectedProductType={selectedProductType}
                    className="form-control"
                  />
                  {errors.itemType && (
                    <div className="invalid-feedback d-block">
                      {errors.itemType.message}
                    </div>
                  )}
                </div>
                <div className="mb-3 col-4 col-md-3 form-group">
                  <label htmlFor="purchasePrice" className="form-label">
                    Preço de Compra R$
                  </label>
                  <Controller
                    name="purchasePrice"
                    rules={{ required: 'Campo obrigatório' }}
                    control={control}
                    render={({ field }) => (
                      <CurrencyInput
                        placeholder="Preço de compra"
                        className={`form-control base-input-value  ${
                          errors.purchasePrice ? 'Inválido' : ''
                        }`}
                        disableGroupSeparators={true}
                        value={field.value}
                        onValueChange={(value) => {
                          field.onChange(value);
                          calcPurchasePrice();
                        }}
                      />
                    )}
                  />
                  <div className="invalid-feedback d-block">
                    {errors.purchasePrice?.message}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="mb-3 col-4 col-md-4 col-lg-2">
                  <label htmlFor="profitMargin" className="form-label">
                    Margem %
                  </label>
                  <Controller
                    name="profitMargin"
                    rules={{ required: 'Campo obrigatório' }}
                    control={control}
                    render={({ field }) => (
                      <CurrencyInput
                        placeholder="Margem"
                        className={`form-control base-input-value  ${
                          errors.purchasePrice ? 'Inválido' : ''
                        }`}
                        disableGroupSeparators={true}
                        value={field.value}
                        onValueChange={(value) => {
                          field.onChange(value);
                          calcPurchasePrice();
                        }}
                      />
                    )}
                  />

                  <div className="invalid-feedback d-block">
                    {errors.profitMargin?.message}
                  </div>
                </div>
                <div className="mb-3 col-4 col-md-4 col-lg-2">
                  <label htmlFor="factoryIndex" className="form-label">
                    Índice de Fábrica %
                  </label>
                  <Controller
                    name="factoryIndex"
                    rules={{ required: 'Campo obrigatório' }}
                    control={control}
                    render={({ field }) => (
                      <CurrencyInput
                        placeholder="ìndice de Fábrica"
                        className={`form-control base-input-value  ${
                          errors.purchasePrice ? 'Inválido' : ''
                        }`}
                        disableGroupSeparators={true}
                        value={field.value}
                        onValueChange={(value) => {
                          field.onChange(value);
                          calcPurchasePrice();
                        }}
                      />
                    )}
                  />
                  <div className="invalid-feedback d-block">
                    {errors.factoryIndex?.message}
                  </div>
                </div>
                <div className="mb-3 col-4 col-md-4 col-lg-2">
                  <label htmlFor="rebate" className="form-label">
                    % de Desconto
                  </label>

                  <Controller
                    name="rebate"
                    rules={{ required: 'Campo obrigatório' }}
                    control={control}
                    render={({ field }) => (
                      <CurrencyInput
                        placeholder="% de Desconto"
                        className={`form-control base-input-value  ${
                          errors.purchasePrice ? 'Inválido' : ''
                        }`}
                        disableGroupSeparators={true}
                        value={field.value}
                        onValueChange={(value) => {
                          field.onChange(value);
                          calcPurchasePrice();
                        }}
                      />
                    )}
                  />

                  <div className="invalid-feedback d-block">
                    {errors.rebate?.message}
                  </div>
                </div>
                <div className="mb-3 col-4 col-md-4 col-lg-3">
                  <label htmlFor="salePrice" className="form-label">
                    Preço de Venda R$
                  </label>
                  <input
                    {...register('salePrice')}
                    type="text"
                    className={`form-control base-input-value ${
                      errors.salePrice ? 'Inválido' : ''
                    }`}
                    name="salePrice"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    disabled
                  />
                  <div className="invalid-feedback d-block">
                    {errors.salePrice?.message}
                  </div>
                </div>
                <div className="mb-3 col-12 col-md-3">
                  <label htmlFor="priceValue" className="form-label">
                    Preço Líquido
                  </label>
                  <input
                    {...register('priceValue')}
                    type="text"
                    className={`form-control base-input-value ${
                      errors.priceValue ? 'Inválido' : ''
                    }`}
                    name="priceValue"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    disabled
                  />
                  <div className="invalid-feedback d-block">
                    {errors.priceValue?.message}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="mb-3 col-12 col-md-3">
                  <label htmlFor="productLocation" className="form-label">
                    Local de Estoque
                  </label>
                  <input
                    {...register('productLocation')}
                    type="text"
                    className={`form-control  ${
                      errors.productLocation ? 'Inválido' : ''
                    }`}
                    name="productLocation"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                  />
                  <div className="invalid-feedback d-block">
                    {errors.productLocation?.message}
                  </div>
                </div>
                <div className="mb-3 col-4 col-md-3">
                  <label htmlFor="lastSupplierName" className="form-label">
                    Último fornecedor
                  </label>
                  <input
                    id="lastSupplierName"
                    {...register('lastSupplier.name')}
                    type="text"
                    className={`form-control  ${
                      errors.lastSupplier ? 'Inválido' : ''
                    }`}
                    disabled
                    name="lastSupplier.name"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                  />
                  <div className="invalid-feedback d-block">
                    {errors.lastSupplier?.message}
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
