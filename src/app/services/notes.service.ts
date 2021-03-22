import { Injectable } from '@angular/core';
import { ExportToCsv } from 'export-to-csv';
import { BehaviorSubject } from 'rxjs';

import NoteModel from '../models/note.model';

@Injectable({
	providedIn: 'root',
})
export class NotesService {
	private readonly key: string = '@CocusNotes:list';
	public readonly notes = new BehaviorSubject<Array<NoteModel>>(
		this.storageNotes
	);

	private get storageNotes(): Array<NoteModel> {
		const encryptedString = localStorage.getItem(this.key);
		const decriptedString = encryptedString && window.atob(encryptedString);
		const response = JSON.parse(decriptedString) || [];

		return response;
	}

	exists({ title }: NoteModel): boolean {
		return this.notes.value.some(item => {
			const itemData = `${item.title.toUpperCase()}`;
			return itemData.indexOf(title.toUpperCase()) > -1;
		});
	}

	list(search?: string): Array<NoteModel> {
		const filteredNotes = this.notes.value.filter(item => {
			const itemData = `${item.title.toUpperCase()} ${item.description.toUpperCase()}`;
			return itemData.indexOf(search.toUpperCase()) > -1;
		});

		return filteredNotes;
	}

	save(note: NoteModel): NoteModel {
		note.id = this.notes.value.length + 1;

		const notes = [note, ...this.notes.value];

		localStorage.setItem(this.key, window.btoa(JSON.stringify(notes)));

		this.notes.next(notes);

		return note;
	}

	edit(note: NoteModel): NoteModel {
		const updatedNotes = this.notes.value.map(n =>
			note.id === n.id ? note : n
		);

		localStorage.setItem(this.key, window.btoa(JSON.stringify(updatedNotes)));

		this.notes.next(updatedNotes);

		return note;
	}

	delete(id: number): void {
		const updatedNotes = this.notes.value.filter(n => n.id != id);

		localStorage.setItem(this.key, window.btoa(JSON.stringify(updatedNotes)));

		this.notes.next(updatedNotes);
	}

	export() {
		const options = {
			fieldSeparator: ';',
			quoteStrings: '"',
			decimalSeparator: '.',
			showLabels: true,
			showTitle: true,
			title: 'Cocus Notes',
			useTextFile: false,
			useBom: true,
			useKeysAsHeaders: true,
		};

		const csvExporter = new ExportToCsv(options);

		csvExporter.generateCsv(this.notes.value);
	}

	import(data: NoteModel[]) {
		const importedNotes = data.map(note => ({
			id: this.notes.value.length++,
			title: note.title,
			description: note.description,
			updatedAt: note.updatedAt,
		}));

		const notes = [...importedNotes, ...this.notes.value]
			.filter(note => !!note)
			.sort((a, b) => a.updatedAt.getTime() - b.updatedAt.getTime());

		localStorage.setItem(this.key, window.btoa(JSON.stringify(notes)));

		this.notes.next(notes);
	}
}
