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
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: `/cep/${zipCode}`,
    };

    requestBackend(config)
      .then((response) => {
        const data = response.data as CepData;
        onUpdate(data);
        setError(false);
        setLoading(true);

        /*  toast.info('Endereço encontrado'); */
      })
      .catch(() => {
        setError(true);
        setLoading(false);
        /* toast.error('Endereço não encontrado'); */
      });
  }, [zipCode, onUpdate,]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    console.log(zipCode, 'esse é o cep !');
    return <p>Informe um CEP válido.</p>;
  }

  return <p>Tudo certo ao carregar os dados do CEP.</p>;
};

export default FindByZipCode;
