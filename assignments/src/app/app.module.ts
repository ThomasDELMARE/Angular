import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AssignmentsComponent } from './assignments/assignments.component';
import { AssignmentDetailComponent } from './assignments/assignment-detail/assignment-detail.component';
import { AddAssignmentComponent } from './assignments/add-assignment/add-assignment.component';
import { Routes }  from '@angular/router';
import { RouterModule } from '@angular/router';
import { EditAssignmentComponent } from './assignments/edit-assignment/edit-assignment.component';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MaterialModules } from '../material.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { LoginComponent } from './login/login.component';
import { LoginGuard } from './shared/guards/login.guard';
import { AuthGuard } from './shared/guards/auth.guard';
import { AdminGuard } from './shared/guards/admin.guard';
import { AuthService } from './shared/services/auth.service';
import { MenubarComponent } from './menubar/menubar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate:[LoginGuard]
  },
  {
    path: 'home',
    component: AssignmentsComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'add',
    component: AddAssignmentComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'assignment/:id',
    component: AssignmentDetailComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'assignment/:id/edit',
    component: EditAssignmentComponent,
    canActivate:[AdminGuard]
  }
]

@NgModule({
  declarations: [
    AppComponent,
    AssignmentsComponent,
    AssignmentDetailComponent,
    AddAssignmentComponent,
    EditAssignmentComponent,
    LoginComponent,
    MenubarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, FormsModule,
    ReactiveFormsModule,
    MatButtonModule, MatIconModule, MatDividerModule,
    MatFormFieldModule, MatInputModule, MatDatepickerModule,
    MatNativeDateModule, MatListModule, MatCardModule,
    MatCheckboxModule, MatSlideToggleModule,
    MatTableModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    Ng2SearchPipeModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MaterialModules
  ],
  providers: [
    AuthService, AuthGuard, AdminGuard, LoginGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
