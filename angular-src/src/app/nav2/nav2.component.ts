import { Component, OnInit } from '@angular/core';
import { UserService } from "src/app/user.service";
import { PlayonService } from 'src/app/playon.service';
declare var swal:any;
@Component({
  selector: 'app-nav2',
  templateUrl: './nav2.component.html',
  styleUrls: ['./nav2.component.css'],
  providers:[UserService,PlayonService]
})
export class Nav2Component implements OnInit {
  songname:any=[];
  albumid:any=[];
  artist:any=[];
  my:any=[];
  js:any;
  data:any;
  c=0;

  searcher:any;
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
  constructor(public obj: UserService,public ob:PlayonService) { }

  ngOnInit() {
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
}
