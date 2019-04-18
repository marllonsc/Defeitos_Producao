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


  public tableData1: TableData;

  constructor(private defectsService: RestDefectsService) { 

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




  ngOnInit() {
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
      this.tableData1.dataRows.push([element.id ,element.equipe , element.userName, element.priorizacao ,element.codigo, element.SLA, element.observacao, element.dataDaData, element.dataEntrega, element.statusDesc, element.sumario]);
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
    console.log(equipe);
    }
    
  }

  private checkTS(entrada: String) : boolean{
    this.ts.forEach(element => {
      console.log(element.tabs);
      console.log(entrada);
      if(element.tabs == entrada){
        return true;
      }
    });
    return false;
  }

  private returnDefeitosFiltro(equipe: String){
    this.tableData1.dataRows = [];
    for (let element of this.defeitos) {
      if(element.equipe == equipe || equipe == 'TODOS'){
        this.tableData1.dataRows.push([element.id ,element.equipe , element.userName, element.priorizacao ,element.codigo, element.SLA, element.observacao, element.dataDaData, element.dataEntrega, element.statusDesc, element.sumario]);
      }
    }
  }

  public changeTable(entrada: String){
     this.getDefectsFiltro(entrada);
  }

  public returnCor(cell:String): String{
    if(cell == 'ARQUITETURA S.'){
      return 'red';
    }else if(cell == 'CARE'){
      return '#5EADEF'
    }else if(cell == 'CORE'){
      return '#39C451'
    }else if(cell == 'INTERFACES(B2B)'){
      return 'pink'
    }else if(cell == 'INTERFACES(B2C)'){
      return '#C05BF0'
    }else if(cell == 'PARAMETRIZAÇÃO'){
      return '#FF9337'
    }else if(cell == 'TRIAGEM'){
      return '#FFD700'
    }
  }

  public checkPriorizacao(cell:String): String{
    if(cell == 'Priorizado'){
      return 'green';
    }else if(cell == 'Waiting'){
      return 'green';
    }
  }

  public checkDate(data: Date){
    let now = new Date();
    let newData = new Date(data);
    
    if(!data){
      return '';
    }

    if (now.toLocaleTimeString() <= newData.toLocaleTimeString()) {
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

}
