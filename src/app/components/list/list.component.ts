import {
	Component,
	EventEmitter,
	Input,
	Output,
} from '@angular/core';
import { ExportToCsv } from 'export-to-csv';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import NoteModel from 'src/app/models/note.model';

@Component({
	selector: 'cn-list',
	templateUrl: './list.component.html',
})
export class ListComponent {
	public maxLength = 100;

	@Input() data: NoteModel[] = [];
	@Output() deleteNoteEvent = new EventEmitter<number>();
	@Output() editNoteEvent = new EventEmitter<NoteModel>();

	edit(note: NoteModel) {
		this.editNoteEvent.emit(note);
	}

	delete(id: number) {
		this.deleteNoteEvent.emit(id);
	}

	showAll = (note: NoteModel) => (this.maxLength = note.description.length);

	export(type?: string) {
		const docDefinition: any = {
			header: {
				text: 'Cocus Notes',
				bold: true,
				fontSize: 20,
				alignment: 'center',
			},
			content: [],
		};

		this.data.map(({ title, description, updatedAt }) => {
			docDefinition.content.push(
				{ text: title, bold: true },
				{
					text: `Last update at: ${updatedAt.toLocaleString()}`,
					italics: true,
					fontSize: 10,
				},
				description,
				'\n'
			);
		});

		switch (type) {
			case 'PDF':
				pdfMake.createPdf(docDefinition).download(`notes.pdf`);
				break;
			case 'PRINT':
				pdfMake.createPdf(docDefinition).print();
				break;
			case 'CSV':
				const options = {
					fieldSeparator: ';',
					quoteStrings: '',
					decimalSeparator: '.',
					showLabels: true,
					showTitle: false,
					useTextFile: false,
					useBom: true,
					useKeysAsHeaders: true,
				};
				const csvExporter = new ExportToCsv(options);
				csvExporter.generateCsv(this.data);
				break;
			default:
				pdfMake.createPdf(docDefinition).open();
				break;
		}
	}
}
