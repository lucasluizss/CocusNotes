import { Component, OnInit } from '@angular/core';
import { NotificationService } from './services/notification.service';

import NoteModel from './models/note.model';
import { NotesService } from './services/notes.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
	public notes: NoteModel[] = [];
	public editNote: NoteModel | null;

	constructor(
		private readonly notesService: NotesService,
		private readonly notificationService: NotificationService
	) {}

	ngOnInit(): void {
		this.notesService.notes.subscribe(list => (this.notes = list));
	}

	save(note: NoteModel) {
		if (note.id) {
			this.notesService.edit(note);
			this.notificationService.show('Note updated!');
		} else {
			if (this.notesService.exists(note)) {
				this.notificationService.show('This note already exists!');
				return;
			}

			this.notesService.save(note);
			this.notificationService.show('Note saved!');
		}
	}

	delete(id: number) {
		this.notesService.delete(id);
		this.notificationService.show('Note deleted!');
	}

	filter(search: string) {
		this.notes = this.notesService.list(search);
	}
}
