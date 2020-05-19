import { Component } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';
import {TranslateService} from '@ngx-translate/core';
@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent {

  menu = MENU_ITEMS;
   constructor(private translate: TranslateService) {
        translate.setDefaultLang('en');
    }
	  useLanguage(language: string) {
    this.translate.use(language);
}


}
