import { Injectable } from '@angular/core';
import { UserService } from "src/app/user.service";

@Injectable({
  providedIn: 'root'
})
export class IndplayService {
  pic:any;
  linker:any;
  name:any;
  songs:any=[];
  albumid:any=[];
  artistname:any=[];
  my:any=[];
  data:any;
  js:any;
  

  constructor(public _obj:UserService) { }
  showtracks(a,b,c){
    console.log(a);
    console.log(b);
    console.log(c);
    this.pic=a;
    this.linker=b;
    this.name=c;
    localStorage.setItem('linker', b);
    localStorage.setItem('photoer', a);
    localStorage.setItem('playlistnamer', c);
    this.calltracks();
  }
  calltracks(){
    this.linker=this.linker+"?apikey=Y2JmZjc3ZTItYTA4MS00NzNlLWI5NjktN2QxOWMwMWE3OWM3&limit=200";
    this._obj.getTrackList(this.linker)
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
  }
}
