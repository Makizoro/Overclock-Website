import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {WelcomePageComponent} from './welcome-page/welcome-page.component';
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {SidebarComponent} from './sidebar/sidebar.component';
import {CsiTabsComponent} from './csi-tabs/csi-tabs.component';
import {UserPageComponent} from './user-page/user-page.component';
import {CsiPageComponent} from './csi-page/csi-page.component';
import {CsiSubmissionFormComponent} from './csi-submission-form/csi-submission-form.component';
import {AdminCsiAuthorisationComponent} from './admin-csi-authorisation/admin-csi-authorisation.component';
import {CsiForumComponent} from './csi-forum/csi-forum.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'sidebar', component: SidebarComponent, children: [
      { path: 'csi', component: CsiTabsComponent, outlet: 'routerSidebar'},
      { path: 'userPage', component: UserPageComponent, outlet: 'routerSidebar'},
      { path: 'csiPage/:name', component: CsiPageComponent, outlet: 'routerSidebar', children: [
          { path: 'csiForum', component: CsiForumComponent, outlet: 'routerForum'}
        ]},
      { path: 'welcome', component: WelcomePageComponent, pathMatch: 'full', outlet: 'routerSidebar'},
      { path: 'csiSubmissionForm', component: CsiSubmissionFormComponent, pathMatch: 'full', outlet: 'routerSidebar'},
      { path: 'adminCsiForm', component: AdminCsiAuthorisationComponent, pathMatch: 'full', outlet: 'routerSidebar'},
      { path: '', redirectTo: '/sidebar/(routerSidebar:welcome)', pathMatch: 'full'},
      { path: '**', redirectTo: '/sidebar/(routerSidebar:welcome)', pathMatch: 'full'}
    ]},
  { path: '**', redirectTo: 'sidebar', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRouteModule {
}
