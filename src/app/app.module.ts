import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { UserIntroComponent } from './user/user-intro/user-intro.component';
import { UserSkillsComponent } from './user/user-skills/user-skills.component';
import { UserProjectsComponent } from './user/user-projects/user-projects.component';
import { UserCoverletterComponent } from './user/user-coverletter/user-coverletter.component';
import { UserFooterComponent } from './user/user-footer/user-footer.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,UserComponent,UserComponent,
    UserIntroComponent,
    UserSkillsComponent,
    UserProjectsComponent,
    UserCoverletterComponent,
    UserFooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,FormsModule,HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
