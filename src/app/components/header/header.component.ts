import { Component, EventEmitter, Output } from '@angular/core';

@Component({
	selector: 'cn-header',
	templateUrl: './header.component.html',
})
export class HeaderComponent {
	@Output() searchEvent = new EventEmitter<string>();

	send($event) {
		this.searchEvent.emit($event);
	}
}
