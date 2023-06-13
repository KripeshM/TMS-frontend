import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export default class RegisterComponent implements OnInit{

  constructor(private regFB:FormBuilder,private api:ApiService,private regRouter:Router){}
  ngOnInit(): void {
  }

  registerForm=this.regFB.group({
    username:['',[Validators.required,Validators.pattern('[a-zA-Z]*')]],
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]

  })

  register(){
    if(this.registerForm.valid){
      let uname=this.registerForm.value.username
      let email=this.registerForm.value.email
      let password=this.registerForm.value.password

      this.api.register(uname,email,password).subscribe((result:any)=>{
        alert(result)
        this.regRouter.navigateByUrl('')
      },
      (result:any)=>{
        alert(result.error)
      }
      )
    }
    else{
      alert("Invalid data")
    }
  }
}
