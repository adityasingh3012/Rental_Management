// API services
export { default as productService } from './productService';
export { default as authService } from './authService';
export { default as quotationService } from './quotationService';
export { default as rentalService } from './rentalService';
export { default as operationsService } from './operationsService';
export { default as paymentService } from './paymentService';
export { default as userService } from './userService';
export { default as notificationService } from './notificationService';
export { default as reportsService } from './reportsService';

// Base API client
export { api } from './api';

// Service types
export type { FilterOptions, PaginationParams, CreateProductData, UpdateProductData } from './productService.new';
export type { QuotationFilters, CreateQuotationData, UpdateQuotationData } from './quotationService';
export type { RentalFilters, CreateRentalData, UpdateRentalData } from './rentalService';
export type { PickupFilters, ReturnFilters, SchedulePickupData, ScheduleReturnData } from './operationsService';
export type { PaymentFilters, InvoiceFilters, CreatePaymentData } from './paymentService';
export type { UserFilters, CreateUserData, UpdateUserData } from './userService';
export type { NotificationFilters, SendNotificationData } from './notificationService';
export type { RevenueReportFilters, ProductReportFilters, CustomerReportFilters } from './reportsService';
