//userSchema For A userType Student

interface teacherSchema {
    name: string;
    rollNo?: number;
    institute: "DITMS" | "College",
    email: string;
    userType: "Student" | "teacher" | "admin"
}
[
    {
    "name": "TEST TEACHER",
    "semester": "8",
    "subject": "IT",
    "department": "CSE",
    "college": "Dummy College",
    "userType": "teacher",
     "university": "Dummy University"
  },
   {
    "name": "TEST ADMIN",
    "college": "Dummy College",
    "userType": "Admin",
    "university": "Dummy University"
   }
  ]
  
