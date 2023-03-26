import { ProductGroup } from "./productGroup";
import { Supplier } from "./supplier";

export type Product =  {
    id: number;
    description:string;
    group: ProductGroup[];
    active: number;
    unit: string;
    obs: string ;
    purchasePrice: number;
    currentInventory: number;
    minimumStock: number;
    salePrice: number;
    priceValue:number;
    profitMargin: number;
    factoryIndex: number;
    listPrice:number;
    rebate: number;
    originalCode: string;
    originalCode1: string;
    quantityLastEntry: number;
    productLocation: string;
    lastSupplier: Supplier[];
    itemType: number;
    references: string;

}
  