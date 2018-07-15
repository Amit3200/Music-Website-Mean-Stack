import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes,Router } from '@angular/router';
import { UserService } from "src/app/user.service";
import { PlayonService } from 'src/app/playon.service';
declare var swal: any;
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers:[UserService,PlayonService]
})
export class NavbarComponent implements OnInit {
  songname:any=[];
  albumid:any=[];
  artist:any=[];
  my:any=[];
  js:any;
  data:any;
  related:any=[];

  searcher:any;
  tempuser:any;
  c=0;
  constructor(public router:Router,public obj: UserService,public ob:PlayonService) { }
  metasearch(){
    console.log(this.searcher);
    if(this.searcher==undefined){
      swal("Nothing Entered","Please Enter Something to Search for");
      console.log("Please Enter Something to Search for");
    }
    else{
    for(var i = 0; i < this.songname.length; i++) {
      if(this.songname[i].search(this.searcher) > -1){
        console.log("Found "+this.songname[i]);
        this.c+=1;
        this.ob.playonclicklistsearch(i,this.songname,this.albumid,this.my,this.artist);
        return 0;
      }
      else{
       console.log("no");
       this.c=0;
      }
    }
    this.searcher="";
    //alert(this.c);
    if(this.c===0){
    swal("Sorry!","Couldn't Found Your Music");
    }
   //this.router.navigateByUrl('/dashboard');
    }
  }
  ngOnInit() {
    this.tempuser=localStorage.getItem('username');
    this.obj.getUser()
    .subscribe(resnap=>{
      this.data=resnap.text();
      this.js=JSON.parse(this.data);
      for(let i=0;i<this.js.meta.returnedCount;i++){
        //console.log(this.js.tracks[i].name);
        this.songname.push(this.js.tracks[i].name);
        this.artist.push(this.js.tracks[i].artistName);
        this.my.push(this.js.tracks[i].previewURL);
        this.albumid.push(this.js.tracks[i].albumId);
      }
    });
  }
  logout(){
    localStorage.removeItem('username');
    localStorage.removeItem('playlistId');
    localStorage.removeItem('token');
    localStorage.setItem('username',"Anonymous");
    swal("Logging Out!", "Logout Successfull");
    console.log("Logout Successfull");
    this.router.navigateByUrl("/mainpage");
}
calltolog(){
  alert("Hello");
}
}
