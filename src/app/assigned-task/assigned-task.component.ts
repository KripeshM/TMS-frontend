import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assigned-task',
  templateUrl: './assigned-task.component.html',
  styleUrls: ['./assigned-task.component.css']
})
export class AssignedTaskComponent implements OnInit{

  allTasks: any = []
  email:any
  constructor(private api:ApiService,private router:Router){}
  
  ngOnInit(): void {
    if (!localStorage.getItem('email')) {
      alert("Please Login")
      this.router.navigateByUrl('')
    }
    this.email=localStorage.getItem('email')
    this.getassignedtask()
  }

  getassignedtask(){
    this.api.getassignedtask(this.email).subscribe((result:any)=>{
      this.allTasks=result
    },
    (result: any) => {
      console.log(result.error);
    })
  }

  markComplete(id: any) {
    this.api.assignmarkcomplete(id, this.email).subscribe((result: any) => {
      alert(result)
      this.getassignedtask()
    },
      (result: any) => {
        console.log(result.error);
      }
    )
  }
}
