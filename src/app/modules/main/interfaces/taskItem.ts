export interface TaskItem {
  govId: string;
  fname: string;
  lname: string;
  task: {
    type: string;
    title: string;
    isComplete: boolean;
  };
  attendingNurse: string;
  notes: string;
  link?: string;
  isCollapsed?: boolean;
}
