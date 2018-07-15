import { Component, OnInit } from '@angular/core';
import { FormsModule,FormGroup,FormControl, Validators } from '@angular/forms';
import { Http,Response } from '@angular/http';
import {Router} from '@angular/router';
declare var swal:any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username:any;
  email:any;
  password:any;
  datatoken:any;
  tempuser:any;
  tokener:any;
  constructor(public http:Http,public router:Router) { 
      if(localStorage.getItem('username')!="Anonymous"){
        this.router.navigateByUrl('/dashboard');
      }


  }
userForm = new FormGroup({
    name: new FormControl(null,Validators.required),
    email: new FormControl(null,Validators.required),
    password: new FormControl(null,Validators.required),
}); 

loginForm = new FormGroup({
  username: new FormControl(null,Validators.required),
  pass: new FormControl(null,Validators.required),
});

  onloginSubmit(): void {
    if(!this.loginForm.valid){
      swal("Error!", "Invalid Credentials!", "warning");
    }
    else{
      console.log(this.loginForm.get('username').value);
      console.log(this.loginForm.get('pass').value);
      let body={
        "username":this.loginForm.get('username').value,
        "password":this.loginForm.get('pass').value
      }
      this.http.post("http://localhost:3000/api/auth/signin",body).subscribe(data => {
        let obj = data.json();
       localStorage.setItem('username', obj.username);
        localStorage.setItem('playlistId', obj.playlist);
        localStorage.setItem('token', obj.token);
        //console.log(localStorage.getItem('username'));
        this.router.navigateByUrl('/dashboard');
        this.tempuser=localStorage.getItem('username');
        this.tokener=localStorage.getItem('token');
        //console.log(localStorage.getItem('token'));
        console.log(this.tokener,this.tempuser);
        this.loginForm.reset();
        swal("Kudos!", "Login Successfull");
        this.username="";
        this.password="";
  }, error => {
      console.log(JSON.stringify(error.json()));
      swal("Error!", "Something Went Wrong!", "warning");
      this.loginForm.reset();
      this.username="";
      this.password="";
  });
    }
  }


  ngOnInit() {
  }
  onFormSubmit(): void {
    if(!this.userForm.valid){
      swal("Error!", "-Minimum 5 characters in Password\n-Use Proper Email Id", "warning");
    }
    else{
    this.username=this.userForm.get('name').value;
    this.email=this.userForm.get('email').value;
    this.password=this.userForm.get('password').value;
    let body={
      "username":this.username,
      "email":this.email,
      "password":this.password
    }
      this.http.post("http://localhost:3000/api/auth/signup",body).subscribe(data => {
      let obj = data.json();
      localStorage.setItem('username', obj.username);
      localStorage.setItem('playlistId', obj.playlist);
      localStorage.setItem('token', obj.token);
      console.log(localStorage.getItem('username'));
      this.username="";
      this.password="";
      this.email="";
      this.userForm.reset();
      swal("Kudos!", "Account Created Successfull");
      this.router.navigateByUrl("/dashboard");
}, error => {
    console.log(JSON.stringify(error.json()));
    swal("Error!", "Something Went Wrong!", "warning");
    this.username="";
    this.password="";
    this.email="";
    this.userForm.reset();
});
    } 
  }

}
