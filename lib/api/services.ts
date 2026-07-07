import axiosInstance from './axiosInstance';

// --- Types (Based on PRD Schema) ---

export interface PayPlan {
  sqid: string;
  title: string;
  description: string;
  amount: string;
  currency: string;
  frequency: 'DAILY' | 'WEEKLY' | 'MONTHLY';
  status: 'DRAFT' | 'ACTIVE_RENEWING' | 'ACTIVE_NON_RENEWING' | 'PAST_DUE' | 'CANCELLED';
  receiver_name: string;
  creator_name: string;
  payment_link_token: string;
  next_billing_date: string;
}

// --- Auth Services ---

export const login = async (credentials: any) => {
  const { data } = await axiosInstance.post('/api/auth/login', credentials);
  return data;
};

export const signup = async (userData: any) => {
  const { data } = await axiosInstance.post('/api/auth/signup', userData);
  return data;
};

// --- Plan Services ---

export const getPlans = async (): Promise<PayPlan[]> => {
  const { data } = await axiosInstance.get('/api/plans/');
  return data;
};

export const getPlanDetails = async (sqid: string): Promise<PayPlan> => {
  const { data } = await axiosInstance.get(`/api/plans/${sqid}`);
  return data;
};

export const createSelfFundedPlan = async (planData: any) => {
  const { data } = await axiosInstance.post('/api/plans/self-funded/create', planData);
  return data;
};

export const createLinkFundedPlan = async (planData: any) => {
  const { data } = await axiosInstance.post('/api/plans/link-funded/create', planData);
  return data;
};

export const cancelPlanAutoRenew = async (sqid: string) => {
  // Simulating the cancellation endpoint that changes state to ACTIVE_NON_RENEWING
  const { data } = await axiosInstance.post(`/api/plans/${sqid}/confirm-cancellation`, {
    role: 'creator',
    code: 'DEMO'
  });
  return data;
};

export const resolveGuestPayment = async (paymentData: any) => {
  const { data } = await axiosInstance.post('/api/plans/link-funded/resolve', paymentData);
  return data;
};

export const recoverFailedPayment = async (recoveryData: any) => {
  // Using the resolve-bank endpoint to simulate Nomba transfer recovery
  const { data } = await axiosInstance.post('/api/plans/resolve-bank', recoveryData);
  return data;
};
