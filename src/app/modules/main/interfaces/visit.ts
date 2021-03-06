export interface Visit {
  how: string;
  time: string;
  attendingNurse: string;
  medical: {
    state: string;
    allergies: string;
    habits: {
      smoking: boolean;
      drinking: boolean;
      drugs: boolean;
      drugsDescription?: string;
    };
    reasonOfVisit: string;
    caseStory: string;
    symptoms: string;
    hasHappenedBefore: {
      hasIt: boolean;
      description?: string;
    };
    history: {
      isThere: boolean;
      description?: string;
    };
    vitals: {
      pulse: number;
      bp: string;
      temp: number;
      weight: number;
      bloodSugar: number;
      respRate: number;
    };
    treatmentPlan: {
      diagnosis: string;
      medication?: string[];
      tasks?: {
        procedures?: [{ title?: string; isComplete?: boolean }];
        tests?: [{ title?: string; isComplete?: boolean }];
      };
      notes?: string;
    };
  };
}
