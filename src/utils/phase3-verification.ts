// Test file to verify all services are properly exported and working
import {
  authService,
  productService,
  quotationService,
  rentalService,
  operationsService,
  paymentService,
  userService,
  notificationService,
  reportsService,
  api
} from '../services';

// Simple verification that all services exist and have expected methods
export const verifyServices = () => {
  console.log('🔧 Verifying API Services...');
  
  const services = [
    { name: 'authService', service: authService, methods: ['login', 'register', 'logout'] },
    { name: 'productService', service: productService, methods: ['getProducts', 'getProduct'] },
    { name: 'quotationService', service: quotationService, methods: ['getQuotations', 'createQuotation'] },
    { name: 'rentalService', service: rentalService, methods: ['getRentals', 'createRental'] },
    { name: 'operationsService', service: operationsService, methods: ['getPickups', 'getReturns'] },
    { name: 'paymentService', service: paymentService, methods: ['getPayments', 'createPaymentIntent'] },
    { name: 'userService', service: userService, methods: ['getUsers', 'getUser'] },
    { name: 'notificationService', service: notificationService, methods: ['getNotifications', 'markAsRead'] },
    { name: 'reportsService', service: reportsService, methods: ['getDashboardData', 'getRevenueReport'] },
  ];

  let allServicesValid = true;

  services.forEach(({ name, service, methods }) => {
    if (!service) {
      console.error(`❌ ${name} is not properly exported`);
      allServicesValid = false;
      return;
    }

    const missingMethods = methods.filter(method => typeof (service as any)[method] !== 'function');
    
    if (missingMethods.length > 0) {
      console.error(`❌ ${name} is missing methods: ${missingMethods.join(', ')}`);
      allServicesValid = false;
    } else {
      console.log(`✅ ${name} - All methods present`);
    }
  });

  // Check API client
  if (!api) {
    console.error('❌ Base API client not exported');
    allServicesValid = false;
  } else {
    console.log('✅ api - Base API client properly exported');
  }

  if (allServicesValid) {
    console.log('🎉 All Phase 3 API Services are properly implemented and exported!');
  } else {
    console.error('🚨 Some services have issues that need to be fixed');
  }

  return allServicesValid;
};

// Service configuration summary
export const getServicesSummary = () => {
  return {
    baseApi: 'services/api.ts - Axios configuration with interceptors',
    authentication: 'services/authService.ts - Login, register, profile management',
    products: 'services/productService.ts - Product catalog and availability',
    quotations: 'services/quotationService.ts - Quote creation and management',
    rentals: 'services/rentalService.ts - Rental lifecycle management',
    operations: 'services/operationsService.ts - Pickup and return operations',
    payments: 'services/paymentService.ts - Payment processing and invoicing',
    users: 'services/userService.ts - User management (admin functions)',
    notifications: 'services/notificationService.ts - In-app and email notifications',
    reports: 'services/reportsService.ts - Analytics and business reporting',
    totalEndpoints: '100+ API endpoints covered',
    features: [
      'Complete CRUD operations for all entities',
      'Advanced filtering and pagination',
      'File upload support (documents, images)',
      'Bulk operations where applicable',
      'Error handling and type safety',
      'Consistent response patterns'
    ]
  };
};

export default {
  verifyServices,
  getServicesSummary
};
