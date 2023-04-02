import { useEffect, useState } from "react";
import { requestBackend } from "util/requests";

interface FindSupplierPersonTypeProps {
    onSelectSupplierPersonType: (supplierPersonType: string ) => void;
    selectedSupplierPersonType?: string;
    className?: string;
  }
  
  const FindSupplierPersonType = (props: FindSupplierPersonTypeProps) => {
    const [supplierPersonTypes, setSupplierPersonTypes] = useState<string[]>([]);
  
    const handleSelectSupplierPersonType = (supplierPersonType: string) => {
      const selectedSupplierPersonType = supplierPersonType ;
      props.onSelectSupplierPersonType(selectedSupplierPersonType);
    };
  
    useEffect(() => {
      const config = {
        method: 'GET',
        url: '/suppliers/personType',
      };

      requestBackend(config)
        .then((response) => {
          setSupplierPersonTypes(response.data);
        })
        .catch((error) => console.error(error));
    }, []);
  
    return (
      <select
        name="personType"
        onChange={(event) => handleSelectSupplierPersonType(event.target.value)}
        value={props.selectedSupplierPersonType}
        className={props.className}
      >
        <option value="">Selecione o tipo de pessoa</option>
        {supplierPersonTypes.map((personType) => (
          <option key={personType} value={personType}>
            {personType}
          </option>
        ))}
      </select>
    );
  };
  

export default FindSupplierPersonType;