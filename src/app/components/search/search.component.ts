import { Component, EventEmitter, Output } from '@angular/core';

@Component({
	selector: 'cn-search',
	templateUrl: './search.component.html',
})
export class SearchComponent {
	@Output() searchEvent = new EventEmitter<string>();
	public search: string;

	filter() {
		this.searchEvent.emit(this.search);
	}
}
