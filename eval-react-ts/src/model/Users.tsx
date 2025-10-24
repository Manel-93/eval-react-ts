export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string; 
  image: string; 

  age: number;        
  gender: string;     
  phone: string;      
  company: {
  address: {
  city: string;  
    }
  };
}