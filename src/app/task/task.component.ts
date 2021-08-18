import { Component, OnInit } from '@angular/core';
import { SearchPipe } from '../common/pipe/search.pipe';
import { HttpService } from '../services/http.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  
  taskObj: any = {}
  taskId:string
  filterSearch: string;
  page = 1
  


  pageSize = 10
  data: any = []

  rows: any[] = []
  temp: any[] = []
  
  constructor(private http: HttpService,
    private searchPipe: SearchPipe, private route: Router) { }

  ngOnInit() {
    this.getAllTask()
  }


  search() {
    if (this.filterSearch.length == 0) {
      this.rows = this.temp;
      return;
    } else {
      this.rows = this.searchPipe.transform(this.temp, this.filterSearch);
    }
  }


  getAllTask() {
    this.http.getAllTask().subscribe(data => {

      let taskArr = []


      data.result.map(element => {

        taskArr.push(
          {

            'taskName': element.taskName,
           'taskDescription':element.taskDescription,
            'createdAt': element.createdAt,
            'taskId': element._id,
            'taskStatus':element.taskStatus
            
          })
      })
      this.rows = taskArr
      this.temp = taskArr
    }, err => {
      alert('Please login First')
    })
  }
  addModalData() {
    this.taskObj.addName = ''
    this.taskObj.addDescription = ''
  }

  editModalData(rowData) {
    this.taskObj.updateName = rowData.taskName
    this.taskObj.updateDescription = rowData.taskDescription
    this.taskObj.updateTaskStatus = rowData.taskStatus
    this.taskId = rowData.taskId
  }

  getTaskId(rowData) {

    this.taskId = rowData.taskId

  }

  AddTask() {

    let addTaskObj = {
      taskName: this.taskObj.addName,
      taskDescription:this.taskObj.addDescription
    }

    this.http.addTask(addTaskObj).subscribe(
      (resp) => {
      
        document.getElementById("addTask").click();
         if (resp.status == true) {
          alert('task added successfully')
         }
         else if (resp.status == false) {
           alert(resp.message)
        }
        this.getAllTask()
      },
      (err) => {
          alert(err.error.error.details[0].message)
        

      })
  }

  updateTask() {

    let updateTaskObj = {
      taskId: this.taskId,
      taskStatus:this.taskObj.updateTaskStatus
    }
   
    this.http.updateTask(updateTaskObj).subscribe(
      (resp) => {
        
        document.getElementById("updateTaskModal").click();
        this.getAllTask();
      },
      (err) => {
        if (err.error.status == false) {
          alert(err.error.message)
        }
      })
  }

  deleteTask() {

    this.http.deleteTask(this.taskId).subscribe(
      (resp) => {
        document.getElementById("deleteTask").click();
        this.getAllTask()
         if (resp.status == true) {
          alert('Task Deleted successfully')
        }
       
      },
      (error) => {
           if (error.error.status == false) {
          alert(error.error.message)
        }
        console.log(error);
      })
  }

  logout() {
    localStorage.removeItem('authToken')
     this.route
          .navigate([`../login/`])
  }
}
