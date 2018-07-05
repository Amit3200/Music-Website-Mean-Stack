import { Component, OnInit } from '@angular/core';
import { UserService } from "src/app/user.service";

@Component({
  selector: 'app-napster',
  templateUrl: './napster.component.html',
  styleUrls: ['./napster.component.css'],
  providers:[UserService],
})

export class NapsterComponent implements OnInit {
  data:any;
  js:any;
  artists:any = [];
  songlinks:any = [];
  songname:any = [];
  albumid:any=[];
  constructor(private _obj: UserService) { }
  ngOnInit() {
    this._obj.getUser()
      .subscribe(resnap=>{
      this.data=resnap.text();
      this.js=JSON.parse(this.data);
      for(let i=0;i<this.js.meta.returnedCount;i++){
        console.log(this.js.tracks[i].name);
        this.songname.push(this.js.tracks[i].name);
        this.artists.push(this.js.tracks[i].artistName);
        this.songlinks.push(this.js.tracks[i].previewURL);
        this.albumid.push(this.js.tracks[i].albumId);
      }
      console.log(this.songname);
      console.log(this.artists);
      console.log(this.songlinks);
      console.log(this.albumid);
    });
    //console.log(this.data);
  }
}
