import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { filter } from 'rxjs';
import { FilterPipe } from '../pipes/filter.pipe';

@Component({
  selector: 'app-task-manager',
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.css']
})
export class TaskManagerComponent implements OnInit {

  constructor(private taskFb: FormBuilder, private api: ApiService, private logoutRouter: Router) { }
  email: any
  currentUser:any
  allTasks: any = []
  addedTask: any = {}
  currentTask: any
  searchTerm:String=''

  ngOnInit(): void {
    if (!localStorage.getItem('email')) {
      alert("Please Login")
      this.logoutRouter.navigateByUrl('')
    }
    this.email = localStorage.getItem('email')
    this.currentUser=localStorage.getItem('currentUser')
    this.getalltask()
  }

  getalltask() {
    this.api.getalltask(this.email).subscribe((result: any) => {
      this.allTasks = result
    },
      (result: any) => {
        console.log(result.error);
      }
    )
  }

  taskForm = this.taskFb.group({
    taskid: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    taskTitle: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
    taskDesc: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9 ]*')]],
    date: ['', [Validators.required]]
  })

  addTask() {
    if (this.taskForm.valid) {
      console.log(this.taskForm);

      let taskid = this.taskForm.value.taskid
      let tasktitle = this.taskForm.value.taskTitle
      let taskdesc = this.taskForm.value.taskDesc
      let due_date = this.taskForm.value.date
      console.log(this.taskForm.value);

      
      this.api.addtask(taskid, this.email, tasktitle, taskdesc, due_date).subscribe((result: any) => {
        alert(result)
        this.getalltask()
        this.taskForm.reset()
      },
        (result: any) => {
          console.log(result.error);
          alert(result.error)
          this.taskForm.reset()
        }
      )
    }
    else {
      alert("Invalid data")
    }
  }


  gettask(id: any) {
    this.api.gettask(id, this.email).subscribe((result: any) => {
      this.addedTask = result
      // console.log(this.addedTask);
    },
      (result: any) => {
        console.log(result.error);
      }
    )
    this.currentTask = id;
    console.log(this.currentTask);
  }
  editTaskForm = this.taskFb.group({
    editedTaskTitle: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
    editedTaskDesc: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9 ]*')]],
    editedDate: ['', [Validators.required]]
  })

  editTask() {
    if (this.editTaskForm.valid) {      
      console.log(this.addedTask);
      console.log(this.editTaskForm);
      
      this.api.edittask(this.currentTask, this.email, this.addedTask.title, this.addedTask.description, this.addedTask.due_date).subscribe((result: any) => {
        alert(result)
        this.getalltask()
      },
        (result: any) => {
          alert(result.error)
          console.log(result.error);
        }
      )
    }
    else {
      alert("Invalid data")
    }
  }

  markComplete(id: any) {
    this.api.markcomplete(id, this.email).subscribe((result: any) => {
      alert(result)
      this.getalltask()
    },
      (result: any) => {
        console.log(result.error);
      }
    )
  }

  deletetask(id: any) {
    this.api.deletetask(id, this.email).subscribe((result: any) => {
      alert("Task deleted successfully")
      this.allTasks = result
    },
      (result: any) => {
        console.log(result.error);
      }
    )
  }


  search(event:any){
    this.searchTerm=event.target.value
    console.log(this.searchTerm);
  }

  assignTaskForm=this.taskFb.group({
    taskid: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    recieveremail:['',[Validators.required,Validators.email]],
    taskTitle: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
    taskDesc: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9 ]*')]],
    date: ['', [Validators.required]]
  })

  assigntask(){
    if(this.assignTaskForm.valid){
      let taskid = this.assignTaskForm.value.taskid
      let receiveremail=this.assignTaskForm.value.recieveremail
      let tasktitle = this.assignTaskForm.value.taskTitle
      let taskdesc = this.assignTaskForm.value.taskDesc
      let due_date = this.assignTaskForm.value.date 

      this.api.assigntask(taskid,this.email,receiveremail,tasktitle,taskdesc,due_date).subscribe((result:any)=>{
        alert(result)
        this.assignTaskForm.reset()
      },
      (result:any)=>{
        alert(result.error)
        this.assignTaskForm.reset()
        console.log(result.error);
        
      }
      )
    }
    else {
      alert("Invalid data")
    }

  }



  logout() {
    localStorage.clear()
    alert("Logged out successfully")
    this.logoutRouter.navigateByUrl('')
  }

  
}
