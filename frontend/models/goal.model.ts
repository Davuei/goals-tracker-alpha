export interface NewGoal {
  id: number; 
  title: string; 
  startDate: Date; 
  endDate: Date
}

export interface GoalDates {
  startDate: string; 
  endDate: string
}

export interface Goal {
  id: number; 
  title: string; 
  startDate: string; 
  endDate: string
}