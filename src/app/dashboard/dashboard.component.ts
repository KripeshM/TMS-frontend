import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  constructor(private api: ApiService){}
  allTasks:any=[]
  email:any
  pendingTask:any=[]
  sortedPendingTask:any=[]
  completedTask:any=[]
  ngOnInit(): void {
   this.email=localStorage.getItem('email')
    this.getalltask()
  }

  getalltask() {
    this.api.getalltask(this.email).subscribe((result: any) => {
      console.log(result);
      
      this.allTasks = result
      this.allTasks.forEach((task:any)=>{
        if(task.status=='pending'){
          this.pendingTask.push(task)
        }
        else{
          this.completedTask.push(task)
        }
      })
      this.sortedPendingTask=this.pendingTask.sort((task1:any,task2:any)=>task1.due_date-task2.due_date)
      console.log(this.sortedPendingTask);


    },
      (result: any) => {
        console.log(result.error);

      }
    )
  }

}
