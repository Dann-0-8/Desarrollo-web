import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([ (req, next) => {
        const token = localStorage.getItem('edu_token');
        return next(token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` }}) : req);
      } ])
    )
  ]
});
