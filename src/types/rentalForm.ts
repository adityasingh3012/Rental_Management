import { RentalOrder, RentalStatus, InvoiceStatus } from './rental';

export interface RentalOrderFormData {
  id?: string;
  orderReference?: string;
  customer: string;
  customerName?: string;
  invoiceAddress: string;
  deliveryAddress: string;
  rentalTemplate: string;
  expiration: string;
  rentalOrderDate: string;
  pricelist: string;
  rentalPeriod: string;
  rentalDuration: string;
  orderLines: RentalOrderLine[];
  otherDetails: string;
  rentalNotes: string;
  termsAndConditions: string;
  rentalStatus: RentalStatus;
  invoiceStatus: InvoiceStatus;
}

export interface RentalOrderLine {
  id?: string;
  product: string;
  productName?: string;
  quantity: number;
  unitPrice: number;
  tax: number;
  subTotal: number;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  invoiceAddress: string;
  deliveryAddress: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  unitPrice: number;
  category: string;
  isRentable: boolean;
}

export interface RentalTemplate {
  id: string;
  name: string;
  description: string;
  termsAndConditions: string;
}

export interface Pricelist {
  id: string;
  name: string;
  description: string;
  validFrom: string;
  validTo: string;
}