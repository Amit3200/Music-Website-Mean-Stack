import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PlayMusicPlayerComponent } from './play-music-player/play-music-player.component';
import { TrendingComponent } from './trending/trending.component';
import { RouterModule, Routes,Router } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PlayListComponent } from "./play-list/play-list.component";
import { CollectionsComponent } from './collections/collections.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { LoginComponent } from './login/login.component';
import { Nav2Component } from './nav2/nav2.component';
import { HttpModule } from '@angular/http';
import { NapsterComponent} from './napster/napster.component';
import { AboutComponent } from './about/about.component';
import { PlaylistviewComponent } from './playlistview/playlistview.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FavouritesComponent } from './favourites/favourites.component';

const appRoutes: Routes = [
  { path: '', redirectTo:'/mainpage', pathMatch: 'full' },
  { path: 'mainpage', component: Nav2Component },
  { path: 'navigation', component: NavbarComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'trendings', component: TrendingComponent  },
  { path: 'playlists', component: PlayListComponent  },
  { path: 'collections', component: CollectionsComponent  },  
  { path: 'signlog', component: LoginComponent},
  { path: 'apidta', component:NapsterComponent},
  { path: 'showtracks',component:PlaylistviewComponent},
  { path: 'aboutus',component:AboutComponent},
  { path: 'favorites',component:FavouritesComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PlayMusicPlayerComponent,
    TrendingComponent,
    DashboardComponent,
    PlayListComponent,
    CollectionsComponent,
    LandingpageComponent,
    LoginComponent,
    Nav2Component,
    NapsterComponent,
    AboutComponent,
    PlaylistviewComponent,
    FavouritesComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {   
  location: any;
  constructor(router: Router) { 
        
          // to print only path eg:"/login"
  }

}
  

