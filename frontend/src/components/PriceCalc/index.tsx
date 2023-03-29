type Props = {
    purchasePrice: number,
    profitMargin: number
    factoryIndex: number
    rebate: number;
}
const PriceCalc = ({ purchasePrice, profitMargin,factoryIndex,rebate }  : Props) => {
  
  const price = 
  (purchasePrice + ((100 + profitMargin) / 100) * factoryIndex * (100 - rebate)) / 100;
 
  return <div>{price}</div>;
}

export default PriceCalc;
