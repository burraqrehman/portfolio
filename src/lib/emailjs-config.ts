// EmailJS Configuration
export const EMAILJS_CONFIG = {
  serviceId: 'service_km173ch',
  templateId: 'template_xjs973h',
  publicKey: 'HR7rpBXLjKpdNuxTn',
} as const;

// Email template parameters interface
export interface EmailTemplateParams {
  from_name: string;
  from_email: string;
  message: string;
  to_email?: string;
}

// Form data interface
export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}
