export interface Activity {
  id: string;
  title: string;
  description: string;
  icon: string;
  banner: string;
  created: Date;
  lastPlayed: Date | null;
  lastSessionStart: Date | null;
  isRunning: boolean;
  timeSpent: number | null;
  category_id: string | null;
}

export interface ActivityState {
  activities: Activity[];
  selectedActivityId: string | null;
}