 export interface userData {
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    role: string;
    password: string;
  }

  export interface RegistrationErrorResponse {
    error: string;
    details?:{
        field?: string;
        message?: string;
    };
}
export interface RegistrationSuccessResponse {
    message: string;
    users: userData[];
}






  