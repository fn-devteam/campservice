import { useEffect, useState } from 'react';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';

interface CepData {
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
  cep: string;
}

interface FindByZipCodeProps {
  zipCode: string;
  onUpdate: (data: CepData) => void;
}

const FindByZipCode = ({ zipCode, onUpdate }: FindByZipCodeProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (zipCode.length < 8) return;
    console.log('cep chegou para consulta....',zipCode, "<==");
    
    console.log('onUpdate....',onUpdate, "<==");
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: `/cep/${zipCode}`
    };

    console.log('config....',config, "<==");
    requestBackend(config)
      .then((response) => {
        const data = response.data as CepData;
        onUpdate(data);
        setError(false);
        setLoading(true);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
        /* toast.error('Endereço não encontrado'); */
      });
  }, [zipCode, onUpdate]);

  if (loading) {
    return <p style={{ margin: '0px' }}></p>;
  }

  if (error) {
    return <p style={{ margin: '0px' }}></p>;
  }

  //return <p style={{ marginLeft: '10px', marginRight: '20px', marginTop: '0px', marginBottom: '15px' }}></p>;
  return <p style={{ margin: '0px' }}></p>;
};

export default FindByZipCode;
