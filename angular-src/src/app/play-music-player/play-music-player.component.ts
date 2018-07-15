import { Component, OnInit } from '@angular/core';
import { UserService } from "src/app/user.service";


@Component({
  selector: 'app-play-music-player',
  templateUrl: './play-music-player.component.html',
  styleUrls: ['./play-music-player.component.css'],
  providers:[UserService]
})
export class PlayMusicPlayerComponent implements OnInit {
  songname:any=[];
  albumid:any=[];
  artist:any=[];
  my:any=[];
  data:any;
  js:any;
  constructor(public _obj:UserService) { }
  index:number=0;
  incop:number;
  x: any;
  next(){
    this.pauseAudio();
    this.index=this.index+1;
    this.x.src=this.my[this.index];
    document.getElementById("megaimage").style.backgroundImage=`url(http://direct.napster.com/imageserver/v2/albums/${this.albumid[this.index]}/images/300x300.jpg)`;
    document.getElementById("megatitle").innerText=this.songname[this.index];
    document.getElementById("megaartist").innerText=this.artist[this.index];
    this.playAudio();
    return this.index;
  }  
  
  previous(){
    this.pauseAudio();
    this.index=this.index-1;
    this.x.src=this.my[this.index];
    document.getElementById("megaimage").style.backgroundImage=`url(http://direct.napster.com/imageserver/v2/albums/${this.albumid[this.index]}/images/300x300.jpg)`;
    document.getElementById("megatitle").innerText=this.songname[this.index];
    document.getElementById("megaartist").innerText=this.artist[this.index];
    this.playAudio();
    return this.index;
  } 


  
  playAudio() { 
    document.getElementById("p1").style.display = 'none';
    document.getElementById("p2").style.display = 'block';
    console.log("play audio x=",this.x);
    this.x.play(); 
  } 
  
  pauseAudio() { 
    document.getElementById("p2").style.display = 'none';
    document.getElementById("p1").style.display = 'block';
    console.log("pause audio x=",this.x);
    this.x.pause(); 
  } 
  ngOnInit() {
      this._obj.getUser()
        .subscribe(resnap=>{
        this.data=resnap.text();
        this.js=JSON.parse(this.data);
        for(let i=0;i<this.js.meta.returnedCount;i++){
         // console.log(this.js.tracks[i].name);
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
    this.x = document.querySelector('#myAudio');
    var y = localStorage.getItem('songid');
    //console.log("Hello "+y);
    
  }
}
