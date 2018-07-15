import { Component, OnInit,Input, Output, EventEmitter} from '@angular/core';
import { UserService } from "src/app/user.service";
import { PlayonService } from "src/app/playon.service";
import { Http,Response } from '@angular/http';
@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.css'],
  providers:[UserService,PlayonService]
})
export class CollectionsComponent implements OnInit {
  @Output()
  change = new EventEmitter();
  songname:any=[];
  albumid:any=[];
  artist:any=[];
  my:any=[];
  data:any;
  js:any;
  maxsongs:any;
  indatabase:any=[];
  myfav:any=[];
  constructor(public _obj:UserService,private _ob:PlayonService,public http:Http) { }
  
  ngOnInit() {
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
        //this.meio();
        //console.log(this.songname);
        //console.log(this.artists);
        //console.log(this.songlinks);
        //console.log(this.albumid);
        
    });
    this._obj.getFavorites()
    .subscribe(resnap=>{
    var data1=resnap.text();
    var js1=JSON.parse(data1);
    console.log(js1);
   var js2 = js1.songs.filter(Number); 
      this.myfav=[...js2];
    });
  }
  playme(i){
    console.log(i);
    localStorage.setItem('songid', i);
    this._ob.playonclick(i);
    //console.log(this._ob.my);
  }
  isSpecial(i){
    return this.indatabase.find(o => o==i)>0;
  }
  changer(i){
  document.getElementById('doper'+i).style.color = '#F44336';
  var fav = localStorage.getItem('fav');
  this.indatabase = fav.split(',').map(o => Number.parseInt(o));
  if(this.indatabase==0){
    this.indatabase=[...this.myfav];
  }
  if(this.indatabase.find(o => o==i)>0)
  this.indatabase = this.indatabase.filter(o => i!=o);
  else
  this.indatabase.push(i);
  console.log(this.indatabase);
  if(localStorage.getItem('username')!='Anonymous'){
  var k=localStorage.getItem('token');
  var t=localStorage.getItem('playlistId');

  this.http.post("http://localhost:3000/api/playlist/"+t,{"song":this.indatabase}).subscribe(data => {
    let obj = data.json();
    console.log(obj);
}, error => {
  console.log(JSON.stringify(error.json()));
});
  console.log(k);
  console.log(t);
  }
  localStorage.setItem('fav',this.indatabase);
  console.log(this.indatabase);
  }
  meio(){
    console.log("hello");
    this._obj.getFavorites()
    .subscribe(resnap=>{
    var data1=resnap.text();
    var js1=JSON.parse(data1);
    console.log(js1);
   var js2 = js1.songs.filter(Number); 
      this.myfav=[...js2];
    });
      console.log(this.myfav);
    for(let i of this.myfav){
      document.getElementById('doper'+i).style.color = '#F44336';
      console.log(i);
    }
  }
}
