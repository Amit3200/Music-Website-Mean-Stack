import { Component, OnInit } from '@angular/core';
import {UserService}  from 'src/app/user.service';
import {IndplayService} from 'src/app/indplay.service';
import {PlayonService} from "src/app/playon.service";
import { Http,Response } from '@angular/http';
@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css'],
  providers:[UserService,PlayonService,IndplayService]
})
export class FavouritesComponent implements OnInit {

  lister:any=[];
  songname:any=[];
  albumid:any=[];
  artist:any=[];
  my:any=[];
  data:any;
  js:any;
  maxsongs:any;
  indatabase:any=[];
  listerfav:any=[];
  data1:any;
  js1:any;
  js2:any=[];
  myfav:any=[];
  constructor(public _obj:UserService,private _ob:PlayonService,public http:Http) { }

  ngOnInit() {
    this.listerfav=localStorage.getItem("fav");
    this._obj.getFavorites()
    .subscribe(resnap=>{
    this.data1=resnap.text();
    this.js1=JSON.parse(this.data1);
    console.log(this.js1);
    this.js2 = this.js1.songs.filter(Number); 
      this.myfav=[...this.js2];
      console.log(this.myfav);
   });

    this._obj.getUser()
    .subscribe(resnap=>{
    this.data=resnap.text();
    this.js=JSON.parse(this.data);
    this.maxsongs=this.js.meta.returnedCount
    for(let i=0;i<this.js.meta.returnedCount;i++){
      //console.log(this.js.tracks[i].name);
      this.songname.push(this.js.tracks[i].name);
      this.artist.push(this.js.tracks[i].artistName);
      this.my.push(this.js.tracks[i].previewURL);
      this.albumid.push(this.js.tracks[i].albumId);
    }
 });

  }
  playme(i){
    console.log(i);
    this._ob.playonclicklist(i,this.songname,this.albumid,this.my,this.artist);
    //console.log(this._ob.my);
  }
  changer(i){
    this.myfav = this.myfav.filter((o,idx) => idx!=i);
    console.log(this.myfav);
    var k=localStorage.getItem('token');
    var t=localStorage.getItem('playlistId');
    this.http.post("http://localhost:3000/api/playlist/"+t,{"song":this.myfav}).subscribe(data => {
    let obj = data.json();
    console.log(obj);
  }, error => {
  console.log(JSON.stringify(error.json()));
  });
  }
}
