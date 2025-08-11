import { api } from './api';

export interface PickupFilters {
  staffId?: string;
  status?: 'pending' | 'scheduled' | 'in_progress' | 'completed' | 'failed';
  date?: string;
  customerId?: string;
}

export interface ReturnFilters {
  staffId?: string;
  status?: 'pending' | 'scheduled' | 'in_progress' | 'completed' | 'failed';
  date?: string;
  customerId?: string;
}

export interface SchedulePickupData {
  rentalId: string;
  scheduledDate: string;
  scheduledTime: string;
  staffId?: string;
  vehicleId?: string;
  notes?: string;
  customerContactInfo?: {
    phone: string;
    alternatePhone?: string;
    preferredContactMethod: 'phone' | 'email' | 'sms';
  };
}

export interface ScheduleReturnData {
  rentalId: string;
  scheduledDate: string;
  scheduledTime: string;
  staffId?: string;
  vehicleId?: string;
  notes?: string;
  expectedCondition?: string;
}

export interface PickupCompletionData {
  actualStartTime: string;
  actualEndTime: string;
  itemsPickedUp: {
    productId: string;
    quantity: number;
    condition: 'excellent' | 'good' | 'fair' | 'poor';
    notes?: string;
    photos?: string[];
  }[];
  customerSignature?: string;
  photos?: string[];
  notes?: string;
  issues?: string[];
}

export interface ReturnCompletionData {
  actualReturnTime: string;
  itemsReturned: {
    productId: string;
    quantity: number;
    condition: 'excellent' | 'good' | 'fair' | 'poor';
    damageNotes?: string;
    photos?: string[];
  }[];
  damageAssessment?: {
    hasDamage: boolean;
    damageItems?: {
      productId: string;
      damageType: string;
      severity: 'minor' | 'moderate' | 'major';
      repairCost?: number;
      description: string;
      photos: string[];
    }[];
    totalDamageCost?: number;
  };
  customerSignature?: string;
  lateFees?: number;
  notes?: string;
}

export const operationsService = {
  // GET /pickups?staffId=&status=&date=
  getPickups: async (filters?: PickupFilters) => {
    const response = await api.get('/pickups', { params: filters });
    return response.data;
  },

  // GET /pickups/:id
  getPickup: async (id: string) => {
    const response = await api.get(`/pickups/${id}`);
    return response.data;
  },

  // POST /pickups
  schedulePickup: async (pickupData: SchedulePickupData) => {
    const response = await api.post('/pickups', pickupData);
    return response.data;
  },

  // PUT /pickups/:id/complete
  completePickup: async (id: string, completionData: PickupCompletionData) => {
    const response = await api.put(`/pickups/${id}/complete`, completionData);
    return response.data;
  },

  // GET /returns?staffId=&status=&date=
  getReturns: async (filters?: ReturnFilters) => {
    const response = await api.get('/returns', { params: filters });
    return response.data;
  },

  // GET /returns/:id
  getReturn: async (id: string) => {
    const response = await api.get(`/returns/${id}`);
    return response.data;
  },

  // POST /returns
  scheduleReturn: async (returnData: ScheduleReturnData) => {
    const response = await api.post('/returns', returnData);
    return response.data;
  },

  // PUT /returns/:id/complete
  completeReturn: async (id: string, completionData: ReturnCompletionData) => {
    const response = await api.put(`/returns/${id}/complete`, completionData);
    return response.data;
  },

  // Additional useful methods
  // GET /pickups/today
  getTodayPickups: async (staffId?: string) => {
    const response = await api.get('/pickups/today', { 
      params: { staffId } 
    });
    return response.data;
  },

  // GET /returns/today
  getTodayReturns: async (staffId?: string) => {
    const response = await api.get('/returns/today', { 
      params: { staffId } 
    });
    return response.data;
  },

  // PUT /pickups/:id/reschedule
  reschedulePickup: async (id: string, newDate: string, newTime: string, reason?: string) => {
    const response = await api.put(`/pickups/${id}/reschedule`, { 
      newDate, 
      newTime, 
      reason 
    });
    return response.data;
  },

  // PUT /returns/:id/reschedule
  rescheduleReturn: async (id: string, newDate: string, newTime: string, reason?: string) => {
    const response = await api.put(`/returns/${id}/reschedule`, { 
      newDate, 
      newTime, 
      reason 
    });
    return response.data;
  },

  // PUT /pickups/:id/assign-staff
  assignPickupStaff: async (id: string, staffId: string) => {
    const response = await api.put(`/pickups/${id}/assign-staff`, { staffId });
    return response.data;
  },

  // PUT /returns/:id/assign-staff
  assignReturnStaff: async (id: string, staffId: string) => {
    const response = await api.put(`/returns/${id}/assign-staff`, { staffId });
    return response.data;
  },

  // GET /operations/route-optimization
  getOptimizedRoute: async (date: string, staffId?: string) => {
    const response = await api.get('/operations/route-optimization', { 
      params: { date, staffId } 
    });
    return response.data;
  },

  // POST /operations/bulk-schedule
  bulkScheduleOperations: async (operations: { type: 'pickup' | 'return'; data: any }[]) => {
    const response = await api.post('/operations/bulk-schedule', { operations });
    return response.data;
  },
};

export default operationsService;
