import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css']
})
export class LandingpageComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
    if(localStorage.getItem('username')!='Anonymous'){
      this.router.navigateByUrl('/dashboard');
    }
  }

}
