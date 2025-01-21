import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { CommonModule } from '@angular/common';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
