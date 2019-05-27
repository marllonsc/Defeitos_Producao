import { DataFormatada } from './../models/DataFormatada';
import {TabsPanels } from '../models/TabsPanels';
import { Texto } from 'app/models/Texto';
import { Defeito } from './../models/Defeito';
import { Component, OnInit } from '@angular/core';
import { RestDefectsService } from '../services/rest-defects.service';
import { stringify } from '@angular/core/src/util';

declare interface TableData {
  headerRow: String[];
  dataRows: any[][];
}


@Component({
  selector: 'app-data-table-defects',
  templateUrl: './data-table-defects.component.html',
  styleUrls: ['./data-table-defects.component.css']
})
export class DataTableDefectsComponent implements OnInit {

  texto: Texto;

  defeitos: Array<Defeito>;

  public ts: Array<TabsPanels>;

  public total: number;

  public filtro: string;
  public equipeFiltro: String;

  public tableData1: TableData;

  constructor(private defectsService: RestDefectsService) { 

    this.equipeFiltro = 'TODOS';
    this.filtro = '';
    this.getTexto();

    this.tableData1 = {
      headerRow: [ 'ID', 'EQUIPE', 'USER NAME', 'PRIORIZAÇÃO', 'CODIGO', 'SLA', 'OBSERVAÇÃO', 'DATA DA DATA', 'DATA ENTREGA', 'STATUS' , 'SUMARIO'],
      dataRows: []
  };
    this.ts = new Array<TabsPanels>();

    this.getDefects();

  }

  private getDefects(): void {
    this.defectsService.getDefeitos()
        .subscribe((data: Array<Defeito>) => {
          
          this.defeitos = data;
         
        }, 
        error => console.log(error))
        .add(() => {
          this.returnDefeitos();
        });
  }


  private getDefectsFiltroClickButon(equipe: String): void {
      this.returnDefeitosFiltro(equipe);
  }

  private getDefectsFiltro(equipe: String): void {
    this.defectsService.getDefeitos()
    .subscribe((data: Array<Defeito>) => {
      
      this.defeitos = data;
     
    }, 
    error => console.log(error))
    .add(() => {
      this.returnDefeitosFiltro(equipe);
    });
  }


  private getTexto(){
    this.defectsService.getTexto()
        .subscribe((data: Texto) => {
          this.texto = new Texto();
          this.texto.conteudo = data.conteudo;
        }, 
        error => console.log(error))
        .add(() => {
         // timplementar depois..
        });
  }


  private setText(): void {
    this.defectsService.setTexto(this.texto.conteudo)
        .subscribe((data: Boolean) => { }, 
        error => console.log(error))
        .add(() => {
         // o que acontece depois..
        });
  }

  filtroKeyUp(evento: KeyboardEvent){
    this.filtro = (<HTMLTextAreaElement> evento.target).value
    this.tableData1.dataRows = [];

      for (let element of this.defeitos) {
        if(this.checkFiltro(element, this.filtro) && (element.equipe == this.equipeFiltro || this.equipeFiltro == 'TODOS')){
          this.tableData1.dataRows.push([element.id ,element.equipe , element.userName, element.priorizacao ,element.codigo, element.SLA, element.observacao, element.dataDaData, element.dataEntrega, element.statusDesc, element.sumario]);
        }
      }
    }

    checkFiltro(defeito: Defeito, fil: string): boolean{
      if(defeito.id && defeito.id.toUpperCase().includes(fil.toUpperCase())){
        return true;
      }else if(defeito.equipe && defeito.equipe.toUpperCase().includes(fil.toUpperCase())){
        return true;
      }else if(defeito.userName && defeito.userName.toUpperCase().includes(fil.toUpperCase())){
        return true;
      }else if(defeito.priorizacao && defeito.priorizacao.toUpperCase().includes(fil.toUpperCase())){
        return true;
      }else if(defeito.codigo && defeito.codigo.toUpperCase().includes(fil.toUpperCase())){
        return true;
      }else if(defeito.SLA && defeito.SLA.toUpperCase().includes(fil.toUpperCase())){
        return true;
      }else if(defeito.observacao && defeito.observacao.toUpperCase().includes(fil.toUpperCase())){
        return true;
      }else if(defeito.dataDaData.dataFormatada.toUpperCase().includes(fil.toUpperCase())){
        return true;
      }else if(defeito.dataEntrega.dataFormatada.toUpperCase().includes(fil.toUpperCase())){
        return true;
      }else if(defeito.statusDesc && defeito.statusDesc.toUpperCase().includes(fil.toUpperCase())){
        return true;
      }else if(defeito.sumario && defeito.sumario.toUpperCase().includes(fil.toUpperCase())){
        return true;
      }

      return false;
    }


  ngOnInit() {
    this.equipeFiltro = 'TODOS';
    this.filtro = '';
    this.getTexto();
    this.total = 0;
  }


  private returnDefeitos(){
    this.tableData1.dataRows = [];
    let qt: number = 0;
    let equipe: string = '';
    let equipe2: String ='';
    this.total = 0;
    for (let element of this.defeitos) {
      if(this.checkEquipes(element)){
        this.tableData1.dataRows.push([element.id ,element.equipe , element.userName, element.priorizacao ,element.codigo, element.SLA, element.observacao, element.dataDaData, element.dataEntrega, element.statusDesc, element.sumario]);
      }
      if(element.equipe != 'VALIDOS' && element.equipe != 'Total'){
        this.total = this.total + 1;
      }
      
      if(equipe != element.equipe && element.equipe != 'VALIDOS' && element.equipe != 'Total'){
        if(equipe2 != equipe){
          this.ts.push(new TabsPanels(equipe,qt+''));
          qt = parseInt(element.id);
          equipe2 = equipe;
        }
        equipe = element.equipe;
        qt = parseInt(element.id);
      }else{
      if(element.equipe == equipe){
        if(parseInt(element.id) > qt){
          qt = parseInt(element.id);
        }
      }else{
        if(equipe2 != equipe){
          this.ts.push(new TabsPanels(equipe,qt+''));
          qt = parseInt(element.id);
          equipe2 = equipe;
        }
      }
    }
    }
    
  }

  private checkTS(entrada: String) : boolean{
    this.ts.forEach(element => {
      if(element.tabs == entrada){
        return true;
      }
    });
    return false;
  }

  private returnDefeitosFiltro(equipe: String){
    this.equipeFiltro = equipe;
    this.tableData1.dataRows = [];
    for (let element of this.defeitos) {
      if(element.equipe == equipe || equipe == 'TODOS'){
        this.tableData1.dataRows.push([element.id ,element.equipe , element.userName, element.priorizacao ,element.codigo, element.SLA, element.observacao, element.dataDaData, element.dataEntrega, element.statusDesc, element.sumario]);
      }
    }
  }

  public changeTable(entrada: String){
    this.filtro = '';
     this.getDefectsFiltroClickButon(entrada);
  }

  public returnCor(cell:String): String{
    if(cell == 'ARQUITETURA S.'){
      return 'red';
    }else if(cell == 'CARE'){
      return '#5EADEF';
    }else if(cell == 'CORE'){
      return '#39C451';
    }else if(cell == 'INTERFACES(B2B)'){
      return 'pink';
    }else if(cell == 'INTERFACES(B2C)'){
      return '#C05BF0';
    }else if(cell == 'PARAMETRIZAÇÃO'){
      return '#FF9337';
    }else if(cell == 'TRIAGEM'){
      return '#FFD700';
    }
  }

  public checkPriorizacao(cell:String): String{
    if(cell == 'Priorizado'){
      return 'green';
    }else if(cell == 'Waiting'){
      return 'green';
    }
  }

  public checkDate(data: DataFormatada){
    if(!data){
      return '';
    }

    if (!data.maiorQuedataAtual) {
       return 'red';
    }
  }



  public formatData(data: Date): any{
    if(data){
     let temp: String =  data.toString();
     let ano = temp.substr(0,4);
     let mes = temp.substr(5,2);
     let dia = temp.substr(8,2);
     return (dia + '/' + mes + '/' + ano);
    }else{
      return ''
    }
  }

  public abreviar(st: String, qt: number): String{
    if(st.length > qt){
      return st.substr(0,qt) + '...';
    }else{
      return st;
    }
  }

  private checkEquipes(defeito: Defeito): boolean {
    if(defeito.equipe == 'ARQUITETURA S.'){
      return true;
    }else if(defeito.equipe == 'CARE'){
      return true;
    }else if(defeito.equipe == 'CORE'){
      return true;
    }else if(defeito.equipe == 'INTERFACES(B2B)'){
      return true;
    }else if(defeito.equipe == 'INTERFACES(B2C)'){
      return true;
    }else if(defeito.equipe == 'PARAMETRIZAÇÃO'){
      return true;
    }else if(defeito.equipe == 'TRIAGEM'){
      return true;
    }else if(defeito.equipe == 'VALIDOS'){
      return true;
    }else if(defeito.equipe == 'Total'){
      return true;
    }
    return false;
  }

}
