import { Component, OnInit } from '@angular/core';
import {MotivoService} from './motivo.service';
import {Motivo} from './motivo';
import {NgForm} from '@angular/forms';
import {assertNumber} from '@angular/core/src/render3/assert';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'testdetektorangular';
  motives: Motivo[];
  selectedMotive: Motivo = {ID: null, motive: null, state: null};
  edition = false;

  constructor(private motivoService: MotivoService) {}

  ngOnInit() {
    this.motivoService.getMotivos().subscribe((motives: Motivo[]) => {
      this.motives = motives;
      console.log(this.motives);
    });
  }

  addMotive(f) {
    const id_t: number = this.motives.length + 1;
    const temporal: Motivo = {
      ID: id_t, motive: f.value.motive, state: true
    };
    console.log(temporal);
    this.motivoService.createMotive(temporal).subscribe((motive: Motivo) => {
      console.log(`motivo creado: ${f.value.motive}`);
      this.motivoService.getMotivos().subscribe((motives: Motivo[]) => {
        this.motives = motives;
      });
    });
  }

  selectMotive(motive: Motivo) {
    this.selectedMotive = motive;
    this.edition = true;
  }

  deleteMotive(motive: Motivo) {
    motive.state = false;
    this.motivoService.updateMotive(motive).subscribe((f: Motivo) => {
      console.log(`motivo eliminado: ${motive.motive}`);
      this.motivoService.getMotivos().subscribe((motives: Motivo[]) => {
        console.log('Listo');
      });
    });
  }

  editMotive(f) {
    const temporal: Motivo = {
      ID: this.selectedMotive.ID, motive: f.value.motive, state: true
    };
    this.motivoService.updateMotive(temporal).subscribe((motive: Motivo) => {
      console.log(`motivo editado: ${f.value.motive}`);
      this.motivoService.getMotivos().subscribe((motives: Motivo[]) => {
        this.motives = motives;
        this.edition = false;
        this.selectedMotive.motive = null;
      });
    });

  }


}
