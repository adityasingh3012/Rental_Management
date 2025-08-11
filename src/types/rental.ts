export type RentalStatus = 'quotation' | 'reserved' | 'pickedup' | 'returned';
export type InvoiceStatus = 'nothing_to_invoice' | 'to_invoice' | 'fully_invoiced';

export interface RentalOrder {
  id: string;
  orderReference: string;
  customer: string;
  customerName: string;
  createdBy: string;
  createdByUser: string;
  rentalStatus: RentalStatus;
  invoiceStatus: InvoiceStatus;
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
  items?: RentalItem[];
  notes?: string;
}

export interface RentalItem {
  id: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  duration: string;
}

export interface RentalFilters {
  rentalStatus?: RentalStatus[];
  invoiceStatus?: InvoiceStatus[];
  search?: string;
  customer?: string;
  dateRange?: {
    start: string;
    end: string;
  };
}

export interface RentalStats {
  all: number;
  quotation: number;
  reserved: number;
  pickedup: number;
  returned: number;
  fullyInvoiced: number;
  nothingToInvoice: number;
  toInvoice: number;
}

export type ViewMode = 'card' | 'list';