import { Component, ElementRef, ViewChild } from '@angular/core';

import NoteModel from 'src/app/models/note.model';
import { NotesService } from 'src/app/services/notes.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
	selector: 'cn-import',
	templateUrl: './import.component.html',
})
export class ImportComponent {
	@ViewChild('csvReader') csvReader: ElementRef;

	constructor(
		private readonly notesService: NotesService,
		private readonly notificationService: NotificationService
	) {}

	uploadListener($event: any): void {
		let files = $event.srcElement.files;

		if (this.isValidCSVFile(files[0])) {
			let input = $event.target;
			let reader = new FileReader();
			reader.readAsText(input.files[0]);

			reader.onload = () => {
				let csvData = reader.result;
				let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);

				const records = this.getDataRecordsArrayFromCSVFile(
					csvRecordsArray,
				);

				this.notesService.import(records);
				this.notificationService.show('CSV Imported!');
			};

			reader.onerror = () =>
				this.notificationService.show('error is occured while reading file!');
		} else {
			this.notificationService.show('Please import valid .csv file.');
			this.fileReset();
		}
	}
	private getDataRecordsArrayFromCSVFile(
		csvRecordsArray: any,
	): Array<NoteModel> {
		let csvArr: Array<NoteModel> = [];

		for (let currentRecord of csvRecordsArray) {
			if (csvRecordsArray.indexOf(currentRecord) === 0) continue;

			try {
				let fields = (<string>currentRecord).split(';');

				if (fields.length > 1 && currentRecord !== '') {
					csvArr.push({
						title: fields[0].trim(),
						description: fields[1].trim(),
						updatedAt: new Date(fields[2].trim()),
					});
				}
			} catch (err) {
				this.notificationService.show('Invalid format found in CSV');
			}
		}

		return csvArr;
	}

	private isValidCSVFile(file: any) {
		return file.name.endsWith('.csv');
	}

	private fileReset() {
		this.csvReader.nativeElement.value = '';
	}
}
