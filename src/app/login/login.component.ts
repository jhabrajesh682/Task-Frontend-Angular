import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { ToastrService } from "ngx-toastr";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  loginObj: any = {}
  filterSearch: string;
  registerObj: any = {}
  page = 1
  pageSize = 10
  data: any = []
  rows: any[] = []
  temp: any[] = []
  rowData: any[] = [];
  modalId: any[] = [];
  constructor(private http: HttpService, private toast: ToastrService,
    private route: Router) { }

  ngOnInit() {
  }

  login() {

    let finalObj = {
      Email: this.loginObj.email,
      password: this.loginObj.password
    }
    this.http.login(finalObj).subscribe(
      (resp) => {
         if (resp.status == true) {
        let jwttoken = resp.token
        localStorage.setItem("authToken", jwttoken);
        this.route
          .navigate([`../task/`])
        }
       
      },
      (err) => {
       
        console.log(err);
       
         if (err.error.status == false) {
          alert('Please Enter correct Email or Password')
        }
      })
  }

  signup() {
    let signupObj = {
      Name: this.registerObj.name,
      roleName: this.registerObj.Addrole,
      Email: this.registerObj.addEmail,
      username: this.registerObj.addusername,
      password: this.registerObj.addPassword
    }
   
    
    
    this.http.signup(signupObj).subscribe(
      (resp) => {
       
        if (resp.status === true) {
          alert('You have successfully Registered Please login to continue')
        }
        
        document.getElementById("registerModal").click();
      },
      (err) => {
        if (err.error.status == false) {
          alert(err.error.result.details[0].message)
        }
        console.log(err);

      })

  }

}
