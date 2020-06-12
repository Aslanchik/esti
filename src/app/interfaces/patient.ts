export interface Patient {
  id: string;
  fname: string;
  lname: string;
  age: number;
  phone: string;
  email?: string;
  address: string;
  visit?: {
    addmissionTime?: string;
    wayOfAdmission?: string;
    state?: string;
    reason?: string;
    habits?: string;
  };
}
