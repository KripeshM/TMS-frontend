import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

   base_url="http://localhost:5000"

   //https://tms-9iux.onrender.com

  register(username:any,email:any,password:any){
    const body={
      username,
      email,
      password
    }
    return this.http.post(`${this.base_url}/user/register`,body)
  }

  login(email:any,password:any){
    const body={
      email,
      password
    }
    return this.http.post(`${this.base_url}/user/login`,body)
  }

  getalltask(email:any){
    return this.http.get(`${this.base_url}/task/gettask/${email}`)
  }

  addtask(id:any,email:any,title:any,description:any,due_date:any){
    const body={
      id,
      email,
      title,
      description,
      due_date
    }
    return this.http.post(`${this.base_url}/task/addtask`,body)

  }

  gettask(id:any,email:any){
    return this.http.get(`${this.base_url}/task/gettask/${id}/${email}`)
  }


  edittask(id:any,email:any,title:any,description:any,due_date:any){

    const body={
      title,
      description,
      due_date
    }

    return this.http.put(`${this.base_url}/task/edittask/${id}/${email}`,body)

  }

  markcomplete(id:any,email:any){
    return this.http.get(`${this.base_url}/task/mark-complete/${id}/${email}`)
  }

  deletetask(id:any,email:any){
    return this.http.delete(`${this.base_url}/task/delete-task/${id}/${email}`)
  }

  assigntask(id:any,fromemail:any,toemail:any,title:any,description:any,due_date:any){
    const body={
      id,
      fromemail,
      toemail,
      title,
      description,
      due_date
    }
    return this.http.post(`${this.base_url}/task/assign-task`,body)
  }

  getassignedtask(email:any){
    return this.http.get(`${this.base_url}/task/get-assigned-task/${email}`)
  }

  assignmarkcomplete(id:any,email:any){
    return this.http.get(`${this.base_url}/task/assign-task-complete/${id}/${email}`)
  }
}
