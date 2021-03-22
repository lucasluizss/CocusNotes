import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
	selector: 'cn-search',
	templateUrl: './search.component.html',
})
export class SearchComponent implements OnInit {
	@Output() searchEvent = new EventEmitter<string>();
	public search: string;

	constructor() {}

	ngOnInit(): void {}

	filter() {
		this.searchEvent.emit(this.search);
	}
}
