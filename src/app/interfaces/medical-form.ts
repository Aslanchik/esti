export interface MedicalForm {
  visit: {
    state: '';
    allergies: '';
    habits: {
      smoking: boolean;
      drinking: boolean;
      drugs: boolean;
      whichDrugs?: string;
      vegan: boolean;
    };
    reasonOfVisit: '';
  };
}
