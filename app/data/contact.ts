import { churchInfo } from '@/app/constants/church';

export interface ContactReason {
  value: string;
  label: string;
  /** Correo que atiende este motivo */
  email: string;
}

const { emails } = churchInfo;

export const contactReasons: ContactReason[] = [
  { value: 'general', label: 'Consulta General', email: emails.general },
  { value: 'prayer', label: 'Petición de Oración', email: emails.pastoral },
  { value: 'visit', label: 'Primera Visita', email: emails.general },
  { value: 'ministry', label: 'Unirse a un Ministerio', email: emails.general },
  { value: 'counseling', label: 'Consejería Pastoral', email: emails.pastoral },
  { value: 'youth', label: 'Grupo de Jóvenes', email: emails.youth },
  { value: 'event', label: 'Información de Eventos', email: emails.general },
];

export type ContactChannel = 'whatsapp' | 'email';

export interface ContactFormData {
  reason: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export const initialContactForm: ContactFormData = {
  reason: 'general',
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
};
