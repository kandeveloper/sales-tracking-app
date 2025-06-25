export interface Product {
  id: string;
  name: string;
  manufacturer: string;
  style: string;
  purchasePrice: number;
  salePrice: number;
  qtyOnHand: number;
  commissionPercentage: number;
}

export interface SalesPerson {
  id: string;
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  startDate: string;
  terminationDate?: string; // optional
  manager: string;
}

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  startDate: string;
}

export interface Sale {
  id: string;
  productId: string;
  salesPersonId: string;
  customerId: string;
  date: string;

  // Related nested entities
  product: Product;
  salesPerson: SalesPerson;
  customer: Customer;
}
