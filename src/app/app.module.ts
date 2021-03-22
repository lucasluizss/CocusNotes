import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { DateAgoPipe } from './pipes/date-ago.pipe';
import { AddComponent } from './components/add/add.component';
import { SearchComponent } from './components/search/search.component';
import { ListComponent } from './components/list/list.component';
import { ShortenPipe } from './pipes/shorten.pipe';
import { NotificationComponent } from './components/notification/notification.component';
import { ImportComponent } from './components/import/import.component';

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		DateAgoPipe,
		ShortenPipe,
		AddComponent,
		SearchComponent,
		ListComponent,
		NotificationComponent,
		ImportComponent,
	],
	imports: [BrowserModule, FormsModule, ReactiveFormsModule],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
