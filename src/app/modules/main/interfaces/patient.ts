import { Visit } from './visit';

export interface Patient {
  govId: string;
  fname: string;
  lname: string;
  email: string;
  birthDate?: string;
  phone?: string;
  address?: string;
  visit?: Visit;
}
