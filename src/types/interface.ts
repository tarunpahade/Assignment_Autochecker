export interface SignUp  {
    email: string,
    password: string,
    userType: string,
    year: string,
    institute: string,
    personalAccessToken?:string,
}





export interface Repo {
    name: string;
    html_url: string,
    visibility: string
}
export interface assignments {
    name: string,
    description:string,
    dateUploaded: string,
    submissionDate: string,
    image?: string,
    uploadedBy: string,
    forYear:string,
    _id?:string,
    repoLink?:string,
    markedAs?:string,
    result?:string,
    uploadType?:string,
    submittedCode?:string
}

export interface completeAssignments{
    assignmentName:string,
    assignmentId:string,
    dateUploaded: string,
    submissionDate: string,
    uploadedBy:string,
    repoLink:string,
    completedCount:Number,
    completedBy?:any
}

