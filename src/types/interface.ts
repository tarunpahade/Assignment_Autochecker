import { ObjectId } from "mongodb";

export interface SignUp {
  name: string;
  password: number;
  rollno?: number;
  department: string; // CSE || BCA
  userType: string;
  semester: number;
  college: string;
  university: string;
  subject?: string;
}
export interface classProps {
  createdBy: string;
  department: string;
  college: string;
  university: string;
  semester: number;
  teacherCount: number;
  studentCount: number;
  teachers: any[];
  _id?: any;
}

export interface assignments {
  name: string;
  description: string;
  dateUploaded: string;
  submissionDate: string;
  image?: string;
  uploadedBy: string;
  semester: string;
  _id?:  ObjectId | string | undefined | any;
  uploadType?: string;
  department: string;
  subject: string;
}
// markedAs?:string,
//     result?:string,
export interface completeAssignments {
  assignmentName: string;
  assignmentId: string;
  dateUploaded: string;
  submissionDate: string;
  uploadedBy: string;
  completedCount: Number;
  completedBy?: any;
}

export interface attendance {
  date: string;
  userDetails: [
    {
      name: string;
      rollno: number;
    }
  ];
  semester: number;
  college: string;
  university: string;
  userType: string;
}
