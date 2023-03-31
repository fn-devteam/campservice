import { mask as masker, unMask } from "remask";
import React, { InputHTMLAttributes }  from "react";
import styled from "@emotion/styled";


const Input = styled.input`
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 12px;
  font-size: 1.1rem;
`;



interface InputMaskProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
    mask: string[]; // Ajuste na tipagem da propriedade mask
    onChange: (value: string) => void;
    value: string;
  }
  

const InputMask = ({ mask, onChange, value, ...props }: InputMaskProps) => {const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const originalValue = unMask(ev.target.value);
    const maskedValue = masker(originalValue, mask);
    onChange(maskedValue);
  };
  

  const handleValue = masker(value, mask);

  return <Input {...props} onChange={handleChange} value={handleValue} />;
};

export default InputMask;
