import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private masterApiUrl
  private baseV1 = "v1/";
  masterApiUrl1


  constructor(private _http: HttpClient) {
    this.masterApiUrl = "http://localhost:8080/api/";
    this.masterApiUrl1 = "http://localhost:8080/api/";
  }

   private getHeader() {
    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("authToken"),
      }),
    };
    return httpOptions;
   }

  private getblobHeader() {
    let httpOptions = {
      headers: new HttpHeaders({
        'x-auth-token': localStorage.getItem('authToken'),
      }),
    };
    return httpOptions;
  }

  private getHeaderWithoutToken() {
    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    };
    return httpOptions;
  }

  login(finalObj) {
    let httpOptions = this.getHeaderWithoutToken();
    console.log(this.masterApiUrl + this.baseV1 + 'users/auth');

    return this._http.post<any>(
      this.masterApiUrl + this.baseV1 + 'user/auth',
      finalObj,
      httpOptions
    );
  }


  signup(signupObj) {
  
    return this._http.post<any>(this.masterApiUrl + this.baseV1 + `user`, signupObj)
  }

  addTask(finalObj) {
    let httpOptions = this.getblobHeader();
    return this._http.post<any>(this.masterApiUrl1 + this.baseV1 + `task/createTask`, finalObj, httpOptions)
  }

  getAllTask() {
    let httpOptions = this.getblobHeader();
    return this._http.get<any>(this.masterApiUrl1 + this.baseV1 + `task/getAllTask`, httpOptions)
  }


  updateTask(updateObj) {
    let httpOptions = this.getblobHeader();
    return this._http.put<any>(this.masterApiUrl1 + this.baseV1 + `task/updateStatusOfTask`, updateObj,httpOptions)
  }

  deleteTask(id) {
    let httpOptions = this.getHeader();
    return this._http.delete<any>(
      this.masterApiUrl1 + this.baseV1 + `task/deleteTask/${id}`,
      httpOptions
    );
  }
}
