import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG, EmailTemplateParams, ContactFormData } from './emailjs-config';

// Email sending result interface
export interface EmailResult {
  success: boolean;
  message: string;
  error?: string;
}

// Validation result interface
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

/**
 * Validates contact form data
 */
export const validateContactForm = (data: ContactFormData): ValidationResult => {
  const errors: string[] = [];

  // Name validation
  if (!data.name || data.name.trim().length === 0) {
    errors.push('Name is required');
  } else if (data.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long');
  }

  // Email validation
  if (!data.email || data.email.trim().length === 0) {
    errors.push('Email is required');
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email.trim())) {
      errors.push('Please enter a valid email address');
    }
  }

  // Message validation
  if (!data.message || data.message.trim().length === 0) {
    errors.push('Message is required');
  } else if (data.message.trim().length < 10) {
    errors.push('Message must be at least 10 characters long');
  } else if (data.message.trim().length > 1000) {
    errors.push('Message must be less than 1000 characters');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Sends email using EmailJS
 */
export const sendEmail = async (formData: ContactFormData): Promise<EmailResult> => {
  try {
    console.log('Starting email send process...');
    console.log('Form data:', formData);
    console.log('EmailJS Config:', EMAILJS_CONFIG);

    // Validate form data first
    const validation = validateContactForm(formData);
    if (!validation.isValid) {
      console.log('Validation failed:', validation.errors);
      return {
        success: false,
        message: 'Validation failed',
        error: validation.errors.join(', ')
      };
    }

    // Check if EmailJS is properly configured
    if (!EMAILJS_CONFIG.templateId || EMAILJS_CONFIG.templateId === 'template_your_template_id') {
      console.log('Template ID not configured');
      return {
        success: false,
        message: 'Email template not configured',
        error: 'Please set up your EmailJS template ID'
      };
    }

    // Prepare template parameters
    const templateParams: EmailTemplateParams = {
      from_name: formData.name.trim(),
      from_email: formData.email.trim(),
      message: formData.message.trim(),
      to_email: 'burrraqdeveloper@gmail.com'
    };

    console.log('Template parameters:', templateParams);

    // Send email using EmailJS
    console.log('Sending email via EmailJS...');
    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      templateParams,
      EMAILJS_CONFIG.publicKey
    );

    console.log('EmailJS response:', response);

    // Check if email was sent successfully
    if (response.status === 200) {
      console.log('Email sent successfully!');
      return {
        success: true,
        message: 'Message sent successfully! I\'ll get back to you soon.'
      };
    } else {
      console.log('EmailJS returned non-200 status:', response.status);
      return {
        success: false,
        message: 'Failed to send message',
        error: `EmailJS returned status: ${response.status}`
      };
    }

  } catch (error) {
    console.error('EmailJS Error Details:', error);
    
    // Handle specific EmailJS errors
    if (error instanceof Error) {
      console.log('Error message:', error.message);
      
      if (error.message.includes('Invalid template ID')) {
        return {
          success: false,
          message: 'Email template not configured',
          error: 'Please set up your EmailJS template ID in the config'
        };
      } else if (error.message.includes('Invalid service ID')) {
        return {
          success: false,
          message: 'Email service not configured',
          error: 'Please check your EmailJS service ID'
        };
      } else if (error.message.includes('Invalid public key')) {
        return {
          success: false,
          message: 'Email service not configured',
          error: 'Please check your EmailJS public key'
        };
      } else if (error.message.includes('Network Error')) {
        return {
          success: false,
          message: 'Network error',
          error: 'Please check your internet connection and try again'
        };
      }
    }

    return {
      success: false,
      message: 'Failed to send message',
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
};

/**
 * Test EmailJS configuration
 */
export const testEmailJSConfig = (): EmailResult => {
  console.log('Testing EmailJS Configuration...');
  console.log('Service ID:', EMAILJS_CONFIG.serviceId);
  console.log('Template ID:', EMAILJS_CONFIG.templateId);
  console.log('Public Key:', EMAILJS_CONFIG.publicKey);

  if (!EMAILJS_CONFIG.serviceId || EMAILJS_CONFIG.serviceId === 'service_your_service_id') {
    return {
      success: false,
      message: 'Service ID not configured',
      error: 'Please set up your EmailJS service ID'
    };
  }

  if (!EMAILJS_CONFIG.templateId || EMAILJS_CONFIG.templateId === 'template_your_template_id') {
    return {
      success: false,
      message: 'Template ID not configured',
      error: 'Please set up your EmailJS template ID'
    };
  }

  if (!EMAILJS_CONFIG.publicKey || EMAILJS_CONFIG.publicKey === 'your_public_key') {
    return {
      success: false,
      message: 'Public Key not configured',
      error: 'Please set up your EmailJS public key'
    };
  }

  return {
    success: true,
    message: 'EmailJS configuration looks good!'
  };
};

/**
 * Utility function to copy email to clipboard
 */
export const copyEmailToClipboard = async (): Promise<EmailResult> => {
  try {
    await navigator.clipboard.writeText('muzamilfaisal46@gmail.com');
    return {
      success: true,
      message: 'Email address copied to clipboard!'
    };
  } catch (error) {
    return {
      success: false,
      message: 'Failed to copy email',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};
