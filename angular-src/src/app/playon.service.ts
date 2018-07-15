import { Injectable } from '@angular/core';
import {UserService}  from 'src/app/user.service';
declare var swal:any;
@Injectable({
  providedIn: 'root'
})
export class PlayonService {
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
  playonclick(i){
    //console.log(i);
    this.getthe();
    this.x = document.querySelector('#myAudio');
    this.pauseAudio();
    this.index=i;
    this.x.src=this.my[this.index];
    document.getElementById("megaimage").style.backgroundImage=`url(http://direct.napster.com/imageserver/v2/albums/${this.albumid[this.index]}/images/300x300.jpg)`;
    document.getElementById("megatitle").innerText=this.songname[this.index];
    document.getElementById("megaartist").innerText=this.artist[this.index];
    this.playAudio();
    return this.index;
  }
  playonclicklistsearch(i,newer,pic,links,artist){
    //console.log(i);
    this.x = document.querySelector('#myAudio');
    this.pauseAudio();
    this.index=i;
   swal("Found Your Music",newer[i]);
   console.log("Found Your Music",newer[i]);
    this.x.src=links[this.index];
    document.getElementById("megaimage").style.backgroundImage=`url(http://direct.napster.com/imageserver/v2/albums/${pic[this.index]}/images/300x300.jpg)`;
    document.getElementById("megatitle").innerText=newer[this.index];
    document.getElementById("megaartist").innerText=artist[this.index];
    this.playAudio();
    return this.index;
  }
  playonclicklist(i,newer,pic,links,artist){
    //console.log(i);
    this.x = document.querySelector('#myAudio');
    this.pauseAudio();
    this.index=i;
   //swal("Found Your Music",newer[i]);
   console.log("Found Your Music",newer[i]);
    this.x.src=links[this.index];
    document.getElementById("megaimage").style.backgroundImage=`url(http://direct.napster.com/imageserver/v2/albums/${pic[this.index]}/images/300x300.jpg)`;
    document.getElementById("megatitle").innerText=newer[this.index];
    document.getElementById("megaartist").innerText=artist[this.index];
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
  getthe() {
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
        // console.log(this.songname);
        // //console.log(this.artists);
        // //console.log(this.songlinks);
        // console.log(this.albumid);
    });
    this.x = document.querySelector('#myAudio');
    // var y = localStorage.getItem('songid');
    // console.log("Hello "+y);
    // console.log("Hello123");
    // console.log(this.my);
  }
}
