import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home';
import { AboutComponent } from './components/about/about';
import { ServicesComponent } from './components/services/services';
import { ContactComponent } from './components/contact/contact';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'contact', component: ContactComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Default route
  { path: '**', redirectTo: '/home' } // Wildcard route for 404s
];