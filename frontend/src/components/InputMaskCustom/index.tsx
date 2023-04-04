import { mask as masker, unMask } from "remask";
import React, { InputHTMLAttributes, useState, useEffect } from "react";
import styled from "@emotion/styled";

const Input = styled.input`
  ${({ className }) => className && `
  ${className}`}
`;

interface InputMaskProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
    mask: string[]; // Ajuste na tipagem da propriedade mask
    onChange: (value: string) => void;
    value?: string;
    classname? : string;
}

const InputMaskCustom = ({ mask, onChange, value, ...props }: InputMaskProps) => {
  const [unmaskedValue, setUnmaskedValue] = useState<string>(value ? unMask(value) : '');

  useEffect(() => {
    setUnmaskedValue(value ? unMask(value) : '');
  }, [value]);

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const currentValue = ev.target.value;
    const originalValue = unMask(currentValue);
    setUnmaskedValue(originalValue);
    const maskedValue = masker(originalValue, mask).toUpperCase();
    onChange(maskedValue);
  };

  const handleValue = masker(unmaskedValue, mask);

  return <Input {...props} onChange={handleChange} value={handleValue} />;
};

export default InputMaskCustom;
