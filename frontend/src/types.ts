export interface Class {
  id: string;
  professorName: string;
  className: string;
  day: 'saturday' | 'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday';
  startTime: string; // Format: "HH:mm"
  endTime: string; // Format: "HH:mm"
  room: string;
  color: string; // Added for unique class colors
}

export interface User {
  studentId: string;
  email: string;
  password: string;
}