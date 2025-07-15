-- Admin Tables for Wildlife Guardians Platform
-- Run this after the main migration.sql

-- Admin Users Table
CREATE TABLE IF NOT EXISTS admin_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'moderator' CHECK (role IN ('super_admin', 'moderator', 'content_manager')),
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    is_active BOOLEAN DEFAULT true,
    last_login TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES admin_users(id)
);

-- Admin Sessions Table
CREATE TABLE IF NOT EXISTS admin_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    admin_id UUID NOT NULL REFERENCES admin_users(id) ON DELETE CASCADE,
    session_token VARCHAR(255) UNIQUE NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Audit Logs Table
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    admin_id UUID REFERENCES admin_users(id),
    action VARCHAR(100) NOT NULL,
    resource_type VARCHAR(50) NOT NULL,
    resource_id VARCHAR(255),
    old_values JSONB,
    new_values JSONB,
    ip_address INET,
    user_agent TEXT,
    severity VARCHAR(20) DEFAULT 'info' CHECK (severity IN ('low', 'medium', 'high', 'critical')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- System Settings Table
CREATE TABLE IF NOT EXISTS system_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key VARCHAR(100) UNIQUE NOT NULL,
    value JSONB NOT NULL,
    description TEXT,
    category VARCHAR(50) DEFAULT 'general',
    is_public BOOLEAN DEFAULT false,
    updated_by UUID REFERENCES admin_users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Content Management Table
CREATE TABLE IF NOT EXISTS content_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    content TEXT,
    type VARCHAR(50) NOT NULL CHECK (type IN ('page', 'article', 'tip', 'announcement')),
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    slug VARCHAR(255) UNIQUE,
    meta_description TEXT,
    tags TEXT[],
    featured_image TEXT,
    author_id UUID REFERENCES admin_users(id),
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Badge Management Table (extends existing badges)
ALTER TABLE badges ADD COLUMN IF NOT EXISTS created_by UUID REFERENCES admin_users(id);
ALTER TABLE badges ADD COLUMN IF NOT EXISTS updated_by UUID REFERENCES admin_users(id);
ALTER TABLE badges ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;
ALTER TABLE badges ADD COLUMN IF NOT EXISTS criteria TEXT;
ALTER TABLE badges ADD COLUMN IF NOT EXISTS icon_type VARCHAR(20) DEFAULT 'star';
ALTER TABLE badges ADD COLUMN IF NOT EXISTS color VARCHAR(7) DEFAULT '#10B981';

-- Security Events Table
CREATE TABLE IF NOT EXISTS security_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_type VARCHAR(50) NOT NULL,
    severity VARCHAR(20) NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),
    source_ip INET,
    user_agent TEXT,
    admin_id UUID REFERENCES admin_users(id),
    user_id UUID REFERENCES users(id),
    details JSONB,
    resolved BOOLEAN DEFAULT false,
    resolved_by UUID REFERENCES admin_users(id),
    resolved_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Database Backups Table
CREATE TABLE IF NOT EXISTS database_backups (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    backup_name VARCHAR(255) NOT NULL,
    backup_size BIGINT,
    backup_path TEXT,
    backup_type VARCHAR(20) DEFAULT 'full' CHECK (backup_type IN ('full', 'incremental')),
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'failed')),
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE,
    error_message TEXT,
    created_by UUID REFERENCES admin_users(id)
);

-- System Statistics Table
CREATE TABLE IF NOT EXISTS system_statistics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    metric_name VARCHAR(100) NOT NULL,
    metric_value NUMERIC,
    metric_data JSONB,
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(metric_name, recorded_at)
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_admin_sessions_admin_id ON admin_sessions(admin_id);
CREATE INDEX IF NOT EXISTS idx_admin_sessions_token ON admin_sessions(session_token);
CREATE INDEX IF NOT EXISTS idx_audit_logs_admin_id ON audit_logs(admin_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_audit_logs_action ON audit_logs(action);
CREATE INDEX IF NOT EXISTS idx_security_events_created_at ON security_events(created_at);
CREATE INDEX IF NOT EXISTS idx_security_events_severity ON security_events(severity);
CREATE INDEX IF NOT EXISTS idx_system_statistics_metric_name ON system_statistics(metric_name);
CREATE INDEX IF NOT EXISTS idx_system_statistics_recorded_at ON system_statistics(recorded_at);

-- Row Level Security (RLS) Policies
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE security_events ENABLE ROW LEVEL SECURITY;

-- Create policies for admin access
CREATE POLICY "Admin users can view all admin_users" ON admin_users
    FOR SELECT USING (true);

CREATE POLICY "Super admins can modify admin_users" ON admin_users
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM admin_users au 
            WHERE au.id = auth.uid() AND au.role = 'super_admin'
        )
    );

-- Insert default admin user (password: WildlifeAdmin2025!)
INSERT INTO admin_users (email, password_hash, role, first_name, last_name) 
VALUES (
    'admin@wildlifeguardians.com',
    '$2b$10$rQZnVHF8p9qGrOHQVzA1BugYmKF2lJ5uH6bDp8Q3hGxD2wF4vL6tO', -- WildlifeAdmin2025!
    'super_admin',
    'System',
    'Administrator'
) ON CONFLICT (email) DO NOTHING;

INSERT INTO admin_users (email, password_hash, role, first_name, last_name) 
VALUES (
    'moderator@wildlifeguardians.com',
    '$2b$10$HZQwKL8D5n2F9qGrOHQVzA1BugYmKF2lJ5uH6bDp8Q3hGxD2wF4vL', -- ModeratorPass2025!
    'moderator',
    'Content',
    'Moderator'
) ON CONFLICT (email) DO NOTHING;

-- Insert default system settings
INSERT INTO system_settings (key, value, description, category) VALUES
('site_name', '"Wildlife Guardians"', 'The name of the website', 'general'),
('site_description', '"Educational platform for wildlife conservation"', 'Site description', 'general'),
('maintenance_mode', 'false', 'Enable maintenance mode', 'general'),
('user_registration', 'true', 'Allow new user registration', 'general'),
('email_verification', 'true', 'Require email verification', 'general'),
('backup_frequency', '"daily"', 'Automatic backup frequency', 'database'),
('session_timeout', '1440', 'Session timeout in minutes', 'security'),
('max_login_attempts', '5', 'Maximum login attempts before lockout', 'security')
ON CONFLICT (key) DO NOTHING;

-- Create functions for audit logging
CREATE OR REPLACE FUNCTION create_audit_log(
    p_admin_id UUID,
    p_action VARCHAR(100),
    p_resource_type VARCHAR(50),
    p_resource_id VARCHAR(255) DEFAULT NULL,
    p_old_values JSONB DEFAULT NULL,
    p_new_values JSONB DEFAULT NULL,
    p_severity VARCHAR(20) DEFAULT 'info'
) RETURNS UUID AS $$
DECLARE
    audit_id UUID;
BEGIN
    INSERT INTO audit_logs (
        admin_id, action, resource_type, resource_id,
        old_values, new_values, severity
    ) VALUES (
        p_admin_id, p_action, p_resource_type, p_resource_id,
        p_old_values, p_new_values, p_severity
    ) RETURNING id INTO audit_id;
    
    RETURN audit_id;
END;
$$ LANGUAGE plpgsql;

-- Create function for recording system statistics
CREATE OR REPLACE FUNCTION record_system_stat(
    p_metric_name VARCHAR(100),
    p_metric_value NUMERIC DEFAULT NULL,
    p_metric_data JSONB DEFAULT NULL
) RETURNS UUID AS $$
DECLARE
    stat_id UUID;
BEGIN
    INSERT INTO system_statistics (metric_name, metric_value, metric_data)
    VALUES (p_metric_name, p_metric_value, p_metric_data)
    RETURNING id INTO stat_id;
    
    RETURN stat_id;
END;
$$ LANGUAGE plpgsql;
