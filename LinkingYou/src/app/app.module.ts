import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AppRouteModule } from './app.route';
import { SidebarComponent } from './sidebar/sidebar.component';
import {FormsModule} from '@angular/forms';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { CsiTabsComponent } from './csi-tabs/csi-tabs.component';
import { UserPageComponent } from './user-page/user-page.component';
import { CsiPageComponent } from './csi-page/csi-page.component';
import { CsiSubmissionFormComponent } from './csi-submission-form/csi-submission-form.component';
import { AdminCsiAuthorisationComponent } from './admin-csi-authorisation/admin-csi-authorisation.component';
import { CsiForumComponent } from './csi-forum/csi-forum.component';

const config = {
  apiKey: "AIzaSyBB7TkPj2vOImaJicfl2fZmI4MTZvWsM1s",
  authDomain: "linking-you.firebaseapp.com",
  databaseURL: "https://linking-you.firebaseio.com",
  projectId: "linking-you",
  storageBucket: "linking-you.appspot.com",
  messagingSenderId: "666490188669"
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    SidebarComponent,
    WelcomePageComponent,
    CsiTabsComponent,
    UserPageComponent,
    CsiPageComponent,
    CsiSubmissionFormComponent,
    AdminCsiAuthorisationComponent,
    CsiForumComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule,
    AppRouteModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
