
import styled from "@emotion/styled";
import { useState } from "react";
import { mask as masker, unMask } from "remask";

const Layout = styled.div`
  padding: 12px;
`;

const Input = styled.input`
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 12px;
  font-size: 1.1rem;
`;

const InputMask = ({ mask, onChange, value }) => {
  const handleChange = (ev) => {
    const originalValue = unMask(ev.target.value);
    onChange(originalValue);
  };

  const handleValue = masker(value, mask);

  return <Input onChange={handleChange} value={handleValue} />;
};

export default function App() {
  const [purchasePrice, setPurchasePrice] = useState("");
  
  const handlePurchasePriceChange = (e) => {
    setPurchasePrice(e.target.value);
  };

  return (
    <Layout>
      <div className="mb-3 col-4 col-md-3 form-group">
        <label htmlFor="purchasePrice" className="form-label">
          Preço de Compra
        </label>
        <InputMask
          mask={[/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '.', /\d/, /\d/]}
          onChange={handlePurchasePriceChange}
          value={purchasePrice}
          className={`form-control item  ${
            errors.purchasePrice ? 'Inválido' : ''
          }`}
          placeholder="Preço de compra"
          name="purchasePrice"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
        />
        <div className="invalid-feedback d-block">
          {errors.purchasePrice?.message}
        </div>
      </div>
    </Layout>
  );
}
