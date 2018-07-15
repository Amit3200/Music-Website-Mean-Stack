import { Injectable } from '@angular/core';
import { Http,Response,Headers } from '@angular/http';
import { map, take } from 'rxjs/operators';


@Injectable()
export class UserService {
  data:any;
  js:any;
  artists:any = [];
  songlinks:any = [];
  songname:any = [];
  albumid:any=[];
  constructor(private http: Http) { }
  getUser() {
    return this.http.get("http://api.napster.com/v2.2/tracks/top?apikey=Y2JmZjc3ZTItYTA4MS00NzNlLWI5NjktN2QxOWMwMWE3OWM3&limit=200");
  }
  getPlaylist() {
    return this.http.get("http://api.napster.com/v2.2/playlists/featured?apikey=Y2JmZjc3ZTItYTA4MS00NzNlLWI5NjktN2QxOWMwMWE3OWM3&limit=5");
  }
  getTrackList(i){
    return this.http.get(i);
  }
  getFavorites(){
    var d=localStorage.getItem('token');
    var k=localStorage.getItem('playlistId');
    console.log(d);
    console.log(k);
    let headers=new Headers();
    headers.append('x-access-token',d);
    return this.http.get("http://localhost:3000/api/playlist/"+k,{headers:headers});
  }
}
