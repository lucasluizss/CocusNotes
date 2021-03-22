import { Component, OnInit } from '@angular/core';

import { NotificationService } from '../../services/notification.service';

@Component({
	selector: 'cn-notification',
	templateUrl: './notification.component.html',
})
export class NotificationComponent implements OnInit {
	constructor(private readonly notificationService: NotificationService) {}

	ngOnInit(): void {
		const snackbarContainer: any = document.querySelector('#cn-toast');

		this.notificationService.notification.subscribe(message => {
			const data = { message };
			snackbarContainer.MaterialSnackbar.showSnackbar(data);
		});
	}
}
