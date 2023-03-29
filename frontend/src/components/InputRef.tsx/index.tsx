import React, { useRef } from "react";

interface InputRefProps {
    nomeDoInput: string;
  }

function InputRef({ nomeDoInput }: InputRefProps) {
    const inputRef = useRef<HTMLInputElement>(null);
  
    const obterValorInput = () => {
      const valorInput = inputRef.current?.value;
      console.log(valorInput);
    };
  return (
    <div>
      <input type="text" name={nomeDoInput} ref={inputRef} />
      <button onClick={obterValorInput}>Obter valor do input</button>
    </div>
  );
}
export default InputRef;



