interface AuthContextType {
  isLoggedIn: boolean;
  login: (email: string, pass: string) => Promise<void>;
  logout: () => void;
}

interface AttendanceRecord {
  user_id: number;
  date: string;
  status: number;
}
interface UserType {
  id?: number;
  fname: string;
  lname: string;
  class: number;
  section: string;
  email: string;
  password?: string;
}

export type { AttendanceRecord, AuthContextType, UserType };
