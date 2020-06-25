import { Visit } from './visit';

export interface Patient {
  govId: string;
  fname: string;
  lname: string;
  email: string;
  birthYear?: string;
  phone?: string;
  address?: string;
  visit?: Visit;
}
