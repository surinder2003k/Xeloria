
-- Automation tables for Xeloria Blog System

-- Topics to be used for automated generation
CREATE TABLE app_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Log automated actions
CREATE TABLE automation_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  action TEXT NOT NULL,
  status TEXT NOT NULL, -- 'success', 'failed'
  details TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert default topics if not exists
INSERT INTO app_settings (key, value)
VALUES ('blog_topics', '["Mastering React in 2024", "The Future of AI in Recruitment", "How to Optimize Your Resume for Remote Jobs", "Building a Personal Brand as a Software Engineer"]')
ON CONFLICT (key) DO NOTHING;

-- Trigger for app_settings
CREATE TRIGGER update_app_settings_updated_at BEFORE UPDATE ON app_settings FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
