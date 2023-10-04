//userSchema For A userType Student

interface teacherSchema {
    name: string;
    rollNo?: number;
    institute: "DITMS" | "College",
    email: string;
    userType: "Student" | "teacher" | "admin"
}
