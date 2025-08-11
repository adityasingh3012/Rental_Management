import { ID } from './common.types';
import { Product } from './product.types';
import { User } from './user.types';

export type RentalStatus = 'draft' | 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled' | 'overdue';
export type QuotationStatus = 'draft' | 'sent' | 'viewed' | 'accepted' | 'rejected' | 'expired';
export type PaymentStatus = 'pending' | 'paid' | 'partially_paid' | 'failed' | 'refunded';
export type DeliveryStatus = 'pending' | 'scheduled' | 'in_transit' | 'delivered' | 'returned' | 'failed';

export interface Rental {
  id: ID;
  quotationId?: ID;
  customerId: ID;
  customer: User;
  items: RentalItem[];
  status: RentalStatus;
  startDate: string;
  endDate: string;
  actualStartDate?: string;
  actualEndDate?: string;
  totalAmount: number;
  currency: string;
  deposit: number;
  lateFeesAmount: number;
  discountAmount: number;
  taxAmount: number;
  netAmount: number;
  paymentStatus: PaymentStatus;
  deliveryInfo: DeliveryInfo;
  returnInfo?: ReturnInfo;
  notes?: string;
  internalNotes?: string;
  contracts?: Contract[];
  timeline: RentalTimeline[];
  createdAt: string;
  updatedAt: string;
  createdBy: ID;
}

export interface RentalItem {
  id: ID;
  productId: ID;
  product: Product;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  discountAmount: number;
  accessories: SelectedAccessory[];
  insurance?: SelectedInsurance;
  notes?: string;
  condition: ItemCondition;
}

export interface SelectedAccessory {
  id: ID;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface SelectedInsurance {
  id: ID;
  name: string;
  coverage: string;
  price: number;
  priceType: 'percentage' | 'fixed' | 'daily';
}

export interface ItemCondition {
  beforeRental: ConditionReport;
  afterReturn?: ConditionReport;
}

export interface ConditionReport {
  rating: 1 | 2 | 3 | 4 | 5; // 1 = Poor, 5 = Excellent
  notes?: string;
  photos: string[];
  checkedBy: ID;
  checkedAt: string;
  damages?: Damage[];
}

export interface Damage {
  id: ID;
  description: string;
  severity: 'minor' | 'moderate' | 'major';
  photos: string[];
  repairCost?: number;
  isChargedToCustomer: boolean;
}

export interface DeliveryInfo {
  type: 'pickup' | 'delivery';
  status: DeliveryStatus;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    instructions?: string;
  };
  scheduledDate?: string;
  scheduledTimeSlot?: string;
  actualDate?: string;
  assignedStaffId?: ID;
  assignedStaff?: User;
  notes?: string;
  proofOfDelivery?: ProofOfDelivery;
}

export interface ReturnInfo {
  status: DeliveryStatus;
  scheduledDate?: string;
  scheduledTimeSlot?: string;
  actualDate?: string;
  assignedStaffId?: ID;
  assignedStaff?: User;
  notes?: string;
  proofOfReturn?: ProofOfReturn;
  isLateReturn: boolean;
  lateDays?: number;
  lateFeesApplied?: number;
}

export interface ProofOfDelivery {
  photos: string[];
  customerSignature?: string;
  staffSignature: string;
  timestamp: string;
  notes?: string;
}

export interface ProofOfReturn {
  photos: string[];
  customerSignature?: string;
  staffSignature: string;
  timestamp: string;
  notes?: string;
  itemsReturned: boolean[];
}

export interface Contract {
  id: ID;
  type: 'rental_agreement' | 'terms_conditions' | 'insurance_policy';
  title: string;
  content: string;
  version: string;
  signedBy?: ID;
  signedAt?: string;
  signature?: string;
  isRequired: boolean;
}

export interface RentalTimeline {
  id: ID;
  event: string;
  description: string;
  timestamp: string;
  performedBy: ID;
  performedByUser?: User;
  metadata?: Record<string, any>;
}

export interface Quotation {
  id: ID;
  customerId: ID;
  customer: User;
  items: QuotationItem[];
  status: QuotationStatus;
  validUntil: string;
  startDate: string;
  endDate: string;
  totalAmount: number;
  currency: string;
  deposit: number;
  discountAmount: number;
  taxAmount: number;
  netAmount: number;
  notes?: string;
  internalNotes?: string;
  sentAt?: string;
  viewedAt?: string;
  respondedAt?: string;
  createdAt: string;
  updatedAt: string;
  createdBy: ID;
}

export interface QuotationItem {
  id: ID;
  productId: ID;
  product: Product;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  discountAmount: number;
  accessories: SelectedAccessory[];
  insurance?: SelectedInsurance;
  notes?: string;
}

export interface RentalRequest {
  customerId?: ID;
  items: RentalRequestItem[];
  startDate: string;
  endDate: string;
  deliveryType: 'pickup' | 'delivery';
  deliveryAddress?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    instructions?: string;
  };
  notes?: string;
}

export interface RentalRequestItem {
  productId: ID;
  quantity: number;
  accessories: ID[];
  insurance?: ID;
  notes?: string;
}

export interface RentalFilter {
  status?: RentalStatus[];
  customerId?: ID;
  dateRange?: {
    start: string;
    end: string;
  };
  productId?: ID;
  assignedStaffId?: ID;
}

export interface QuotationFilter {
  status?: QuotationStatus[];
  customerId?: ID;
  dateRange?: {
    start: string;
    end: string;
  };
  validityStatus?: 'active' | 'expired';
}
