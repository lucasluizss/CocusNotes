import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class NotificationService {
	public readonly notification = new Subject();
	show = (message: string) => this.notification.next(message);
}
