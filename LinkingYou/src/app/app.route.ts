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
import {CsiForumTopicComponent} from './csi-forum-topic/csi-forum-topic.component';
import {CsiForumCreateTopicComponent} from './csi-forum-create-topic/csi-forum-create-topic.component';
import {CsiEventDetailsComponent} from './csi-event-details/csi-event-details.component';
import {CsiEditPageComponent} from './csi-edit-page/csi-edit-page.component';
import {CsiManageSubscriptionsComponent} from './csi-manage-subscriptions/csi-manage-subscriptions.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, pathMatch: 'full'},
  { path: 'register', component: RegisterComponent, pathMatch: 'full'},
  { path: 'sidebar', component: SidebarComponent, children: [
      { path: 'csi', component: CsiTabsComponent, outlet: 'routerSidebar'},
      { path: 'userPage', component: UserPageComponent, outlet: 'routerSidebar'},
      { path: 'csiSubscriptions', component: CsiManageSubscriptionsComponent, pathMatch: 'full', outlet: 'routerSidebar'},
      { path: 'csiEditPage', component: CsiEditPageComponent, pathMatch: 'full', outlet: 'routerSidebar'},
      { path: 'welcome', component: WelcomePageComponent, pathMatch: 'full', outlet: 'routerSidebar'},
      { path: 'myCsiPage', component: CsiPageComponent, pathMatch: 'full', outlet: 'routerSidebar'},
      { path: 'csiSubmissionForm', component: CsiSubmissionFormComponent, pathMatch: 'full', outlet: 'routerSidebar'},
      { path: 'adminCsiForm', component: AdminCsiAuthorisationComponent, pathMatch: 'full', outlet: 'routerSidebar'},
      { path: '', redirectTo: '/sidebar/(routerSidebar:welcome)', pathMatch: 'full'},
      { path: '**', redirectTo: '/sidebar/(routerSidebar:welcome)', pathMatch: 'full'}
    ]},
  { path: '', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRouteModule {
}
