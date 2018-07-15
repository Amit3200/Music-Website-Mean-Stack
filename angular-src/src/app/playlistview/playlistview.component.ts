import { Component, OnInit } from '@angular/core';
import {UserService}  from 'src/app/user.service';
import {IndplayService} from 'src/app/indplay.service';
import {PlayonService} from "src/app/playon.service";
import { Http,Response } from '@angular/http';
@Component({
  selector: 'app-playlistview',
  templateUrl: './playlistview.component.html',
  styleUrls: ['./playlistview.component.css'],
  providers:[UserService,IndplayService,PlayonService]
})
export class PlaylistviewComponent implements OnInit {
  songs:any=[];
  albumid:any=[];
  artistname:any=[];
  my:any=[];
  data:any;
  js:any;
  playlistname:any;
  picl:any;
  constructor(public _obj:IndplayService,public _ob:UserService,public _obj1:PlayonService) { }

  ngOnInit() {
   var x = localStorage.getItem('playlistnamer');
   var y = localStorage.getItem('linker');
   var z = localStorage.getItem('photoer');
   this.playlistname=x;
   this.picl=z;
    //this._obj.calltracks();
   console.log(y);
   y=y+"?apikey=Y2JmZjc3ZTItYTA4MS00NzNlLWI5NjktN2QxOWMwMWE3OWM3&limit=200";
   this._ob.getTrackList(y)
   .subscribe(resnap=>{
   this.data=resnap.text();
   this.js=JSON.parse(this.data);
   console.log(this.js)
   for(let i=0;i<this.js.meta.returnedCount;i++){
     //console.log(this.js.tracks[i].name);
     this.songs.push(this.js.tracks[i].name);
     this.artistname.push(this.js.tracks[i].artistName);
     this.my.push(this.js.tracks[i].previewURL);
     this.albumid.push(this.js.tracks[i].albumId);
     }
   });
   console.log(this.songs);
   console.log(this.playlistname);
   console.log(this.picl);
  }
  playme(i){
    console.log(i);
    this._obj1.playonclicklist(i,this.songs,this.albumid,this.my,this.artistname);
    //console.log(this._ob.my);
  }
}
