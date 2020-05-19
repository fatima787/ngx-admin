import { Component, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {TranslateService} from '@ngx-translate/core';
import defaultLanguage from "./../../../../../assets/i18n/en.json";
@Component({
  selector: 'ngx-lang',
  templateUrl: './lang.component.html',
  styleUrls: ['./lang.component.scss']
})
export class LangComponent implements OnInit {

   constructor(private translate: TranslateService) {
        translate.setDefaultLang('en');
    }

  ngOnInit() {
  }

 useLanguage(language: string) {
        this.translate.use(language);
    }
}
