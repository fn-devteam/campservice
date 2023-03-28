import { useEffect, useState } from "react";
import { requestBackend } from "util/requests";

interface FindProductTypeProps {
    onSelectProductType: (productType: string ) => void;
    selectedProductType?: string;
    className?: string;
  }
  
  const FindProductType = (props: FindProductTypeProps) => {
    const [productTypes, setProductTypes] = useState<string[]>([]);
  
    const handleSelectProductType = (productType: string) => {
      const selectedProductType = productType ;
      props.onSelectProductType(selectedProductType);
    };
  
    useEffect(() => {
      const config = {
        method: 'GET',
        url: '/products/itemType',
      };

      requestBackend(config)
        .then((response) => {
          setProductTypes(response.data);
        })
        .catch((error) => console.error(error));
    }, []);
  
    return (
      <select
        name="productType"
        onChange={(event) => handleSelectProductType(event.target.value)}
        value={props.selectedProductType}
        className={props.className}
      >
        <option value="">Selecione o tipo do item</option>
        {productTypes.map((productType) => (
          <option key={productType} value={productType}>
            {productType}
          </option>
        ))}
      </select>
    );
  };
  

export default FindProductType;