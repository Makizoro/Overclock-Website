import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {WelcomePageComponent} from './welcome-page/welcome-page.component';
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {SidebarComponent} from './sidebar/sidebar.component';
import {CsiTabsComponent} from './csi-tabs/csi-tabs.component';
import {UserPageComponent} from './user-page/user-page.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'sidebar', component: SidebarComponent, children: [
      { path: 'csi', component: CsiTabsComponent, outlet: 'routerSidebar'},
      { path: 'userPage', component: UserPageComponent, outlet: 'routerSidebar'},
      { path: '', component: WelcomePageComponent, pathMatch: 'full', outlet: 'routerSidebar'}
    ]},
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRouteModule {
}
