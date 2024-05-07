import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import * as jQuery from 'jquery';

import { AppModule } from './app/app.module';


(window as any)['jQuery'] = jQuery;


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
