import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  constructor(private loginFb:FormBuilder,private api:ApiService,private loginRouter:Router){}
  ngOnInit(): void {
  }

  loginForm=this.loginFb.group({
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
  })

  login(){
    if(this.loginForm.valid){
      console.log(this.loginForm);
      
      let email=this.loginForm.value.email
      let password=this.loginForm.value.password

      this.api.login(email,password).subscribe((result:any)=>{

        console.log(result);
        localStorage.setItem("email",result.user.email)
        localStorage.setItem("currentUser",result.user.username)
        
        alert("Successfully logged in");
        this.loginRouter.navigateByUrl('task-manager')
      },
      (result:any)=>{
        alert(result.error);
        
      }
      )
    }
    else{
      alert("Invalid data")
    }
  }
}
