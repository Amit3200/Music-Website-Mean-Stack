import { Component, OnInit } from '@angular/core';
import { UserService } from "src/app/user.service";
import { IndplayService } from 'src/app/indplay.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-play-list',
  templateUrl: './play-list.component.html',
  styleUrls: ['./play-list.component.css'],
  providers:[UserService,IndplayService]
})
export class PlayListComponent implements OnInit {
  playlistname:any=[];
  playlistimages:any=[];
  playlistlinks:any=[];
  favouritecount:any=[];
  trackcount:any=[];
  data:any;
  js:any;
  constructor( public _obj:UserService,public _ob:IndplayService,public router:Router) { }

  ngOnInit() {
    console.log(localStorage.getItem('token'));
    if(localStorage.getItem('token')==null){
      this.router.navigateByUrl('/signlog');
    }
    this._obj.getPlaylist()
    .subscribe(resnap=>{
    this.data=resnap.text();
    this.js=JSON.parse(this.data);
    //console.log(this.js.playlists[0]);
    for(let i=0;i<this.js.meta.returnedCount;i++){
      
      this.playlistname.push(this.js.playlists[i].name);
      this.playlistimages.push(this.js.playlists[i].images[0].url);
      this.playlistlinks.push(this.js.playlists[i].links.tracks.href);
      this.trackcount.push(this.js.playlists[i].trackCount);
      this.favouritecount.push(this.js.playlists[i].favoriteCount);
    }

    console.log(this.playlistname);
    console.log(this.playlistimages);
    console.log(this.playlistlinks);
    console.log(this.favouritecount);
    console.log(this.trackcount);
      }
    )};
    playlistget(i){
      console.log(i);
      //alert(i);
      this._ob.showtracks(this.playlistimages[i],this.playlistlinks[i],this.playlistname[i]);
    }
}
