export interface User {
  id: string;
  username: string;
  email: string;
  phone_number: string;
  role: 'client' | 'professional';
  is_verified: boolean;
  location?: {
    latitude: number;
    longitude: number;
    address: string;
  };
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  icon?: string;
}

export interface SubCategory {
  id: string;
  category_id: string;
  name: string;
  description?: string;
}

export interface ProfessionalJob {
  id: string;
  user_id: string;
  category_id: string;
  category_price: number;
  location?: {
    latitude: number;
    longitude: number;
    address: string;
  };
  created_at: string;
  updated_at: string;
  category: Category;
  sub_categories: JobSubCategoryPricing[];
}

export interface JobSubCategoryPricing {
  id: string;
  job_id: string;
  sub_category_id: string;
  price: number;
  sub_category: SubCategory;
}

export interface ProfessionalDocument {
  id: string;
  user_id: string;
  national_id_document_url?: string;
  work_clearance_document_url?: string;
  verification_status: 'pending' | 'verified' | 'failed';
  verification_otp?: string;
  verified_name?: string;
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  message_text: string;
  timestamp: string;
  is_read: boolean;
  sender: User;
  receiver: User;
}

export interface Review {
  id: string;
  client_id: string;
  professional_id: string;
  rating: number;
  review_text: string;
  timestamp: string;
  client: User;
  professional: User;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, username: string, phone: string) => Promise<void>;
  signOut: () => Promise<void>;
  verifyEmail: (token: string) => Promise<void>;
  updateUserRole: (role: 'client' | 'professional') => Promise<void>;
}