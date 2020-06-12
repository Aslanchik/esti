export interface TaskItem {
  patientId: string;
  patientName: string;
  title: string;
  description?: string;
  type?: string; // ADD TYPE SUPPORT LATER - TYPE DETERMINES ICON
  link?: string; // WILL POINT TO PATIENT PROFILE
  isComplete: boolean; // WHEN DELETING
  isCollapsed: boolean;
}
