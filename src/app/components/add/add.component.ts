import {
	ChangeDetectorRef,
	Component,
	EventEmitter,
	Input,
	OnChanges,
	Output,
	SimpleChange,
	SimpleChanges,
} from '@angular/core';
import { FormBuilder, ValidationErrors, Validators } from '@angular/forms';

import NoteModel from 'src/app/models/note.model';
import { NotificationService } from '../../services/notification.service';

@Component({
	selector: 'cn-add',
	templateUrl: './add.component.html',
})
export class AddComponent implements OnChanges {
	@Input() note: NoteModel;
	@Output() addedNoteEvent = new EventEmitter<NoteModel>();

	public form = this.fb.group({
		title: ['', [Validators.required]],
		description: ['', [Validators.required]],
		updatedAt: [''],
	});

	constructor(
		private readonly fb: FormBuilder,
		private readonly cd: ChangeDetectorRef,
		private readonly notificationService: NotificationService
	) {}

	reset() {
		this.form.reset();
		this.note = null;
	}

	ngOnChanges(changes: SimpleChanges) {
		const currentItem: SimpleChange = changes.note;

		if (currentItem.currentValue) {
			const { title, description } = currentItem.currentValue;

			this.form.patchValue({
				title,
				description,
			});
		}
	}

	onSubmit() {
		if (this.form.invalid) {
			this.showValidationErrors();
			return;
		}

		let noteData: NoteModel = { ...this.form.value, updatedAt: new Date() };

		if (this.note) {
			noteData.id = this.note.id;
		}

		this.reset();
		this.addedNoteEvent.emit(noteData);
	}

	private showValidationErrors() {
		Object.keys(this.form.controls).forEach(key => {
			const controlErrors: ValidationErrors = this.form.get(key).errors;
			if (controlErrors != null) {
				Object.keys(controlErrors).forEach(keyError => {
					this.notificationService.show(`Field ${key} ${keyError}`);
				});
			}
		});
	}
}
