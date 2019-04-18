import { Component, OnInit, Input, Output } from '@angular/core';
import { Defeito } from '../models/Defeito';
import { RestDefectsService } from '../services/rest-defects.service';
import { Texto } from 'app/models/Texto';

@Component({
  selector: 'app-text-area-table',
   templateUrl: './text-area-table.component.html',
  styleUrls: ['./text-area-table.css']
})
export class TextAreaTableComponent implements OnInit {

  public texto: Texto;
  textoArea: boolean;

  constructor(private defectsService: RestDefectsService) { 
    this.texto = new Texto();
    this.texto.conteudo = '';
    this.getTexto(false);
  }

  private getTexto(checkVisible: boolean){
    this.defectsService.getTexto()
        .subscribe((data: Texto) => {
          this.texto = new Texto();
          this.texto.conteudo = data.conteudo;
        }, 
        error => console.log(error))
        .add(() => {
          this.textoArea = checkVisible;
        });
  }

  public cancelar(){
    this.getTexto(false);
  }

  public salvar(){
    this.setText(false);
  }

  public editar(){
    this.getTexto(true);
  }
    

  onKeyup(evento: KeyboardEvent){
    this.texto.conteudo = (<HTMLTextAreaElement> evento.target).value
  }

  private setText(checkVisible: boolean): void {
    this.defectsService.setTexto(this.texto.conteudo)
        .subscribe((data: Boolean) => {
          
        }, 
        error => console.log(error))
        .add(() => {
          this.textoArea = checkVisible;
        });
  }

  

  ngOnInit() {
    this.texto = new Texto();
    this.texto.conteudo = '';
    this.getTexto(false);
  }

   
}
