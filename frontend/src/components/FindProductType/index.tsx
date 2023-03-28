import { useEffect, useState } from "react";

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
      fetch('/products/enums')
        .then((response) => response.json())
        .then((data) => {
          setProductTypes(data.productType);
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
        <option value="">Selecione um tipo de produto</option>
        {productTypes.map((productType) => (
          <option key={productType} value={productType}>
            {productType}
          </option>
        ))}
      </select>
    );
  };
  

export default FindProductType;