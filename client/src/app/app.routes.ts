import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TodoComponent } from './components/todo/todo.component';

const routeConfig: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home page',
  },
  {
    path: 'todo/:id',
    component: TodoComponent,
    title: 'Todo tasks',
  },
];

export default routeConfig;
