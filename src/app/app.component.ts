/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { SeoService } from './@core/utils/seo.service';
import {TranslateService} from '@ngx-translate/core';
@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {



  constructor(private analytics: AnalyticsService, private seoService: SeoService,private translate: TranslateService) {
	   translate.setDefaultLang('en');
  }
  

  ngOnInit(): void {
    this.analytics.trackPageViews();
    this.seoService.trackCanonicalChanges();
  }
  useLanguage(language: string) {
        this.translate.use(language);
    }
}
