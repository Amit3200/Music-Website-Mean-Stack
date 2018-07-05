import { Injectable } from '@angular/core';
import { Http,Response } from '@angular/http';
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
    return this.http.get("http://api.napster.com/v2.2/tracks/top?apikey=Y2JmZjc3ZTItYTA4MS00NzNlLWI5NjktN2QxOWMwMWE3OWM3&limit=100");
  }
  getPlaylist() {
    return this.http.get("http://api.napster.com/v2.2/playlists/featured?apikey=Y2JmZjc3ZTItYTA4MS00NzNlLWI5NjktN2QxOWMwMWE3OWM3&limit=5");
  }
  getTrackList(i){
    return this.http.get(i);
  }
}
