import { Component, OnInit,Input, Output, EventEmitter} from '@angular/core';
import { UserService } from "src/app/user.service";
import { PlayonService } from "src/app/playon.service";

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
  constructor(public _obj:UserService,private _ob:PlayonService) { }

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
        //console.log(this.songname);
        //console.log(this.artists);
        //console.log(this.songlinks);
        //console.log(this.albumid);
    });
  }
  playme(i){
    console.log(i);
    localStorage.setItem('songid', i);
    this._ob.playonclick(i);
    //console.log(this._ob.my);
  }

}
