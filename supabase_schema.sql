-- Attendora Database Schema (Supabase PostgreSQL)

-- 1. Companies Table
CREATE TABLE companies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  address TEXT,
  subscription_plan TEXT CHECK (subscription_plan IN ('6_month', 'yearly')),
  subscription_status TEXT DEFAULT 'inactive',
  subscription_expiry TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Users Table (Master Admin, Company Owner, Sub Admin, Employee)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID REFERENCES companies(id),
  name TEXT NOT NULL,
  mobile TEXT UNIQUE NOT NULL,
  pin_hash TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('master_admin', 'company_owner', 'sub_admin', 'employee')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Attendance Records Table
CREATE TABLE attendance (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employee_id UUID REFERENCES users(id) NOT NULL,
  company_id UUID REFERENCES companies(id) NOT NULL,
  type TEXT CHECK (type IN ('check-in', 'check-out')),
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  selfie_url TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Payments Table
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID REFERENCES companies(id),
  razorpay_order_id TEXT,
  razorpay_payment_id TEXT,
  amount INTEGER, -- in paise
  status TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_attendance_employee ON attendance(employee_id);
CREATE INDEX idx_attendance_company ON attendance(company_id);
CREATE INDEX idx_users_mobile ON users(mobile);
CREATE INDEX idx_users_company ON users(company_id);
