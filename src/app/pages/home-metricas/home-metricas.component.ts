import { NONE_TYPE } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ScaleLinear, ScalePoint, ScaleTime } from 'd3-scale';
import { BaseType } from 'd3-selection';
import { MetricasService } from 'src/app/services/metricas.service';
import { SaveTextService } from 'src/app/services/save-text.service';

@Component({
  selector: 'app-home-metricas',
  templateUrl: './home-metricas.component.html',
  styleUrls: ['./home-metricas.component.css'],
  providers: [MetricasService]
})
export class HomeMetricasComponent implements OnInit {
 
  public textoNuevo: any;
  textoMetricas: Array<any> = [];
  public colorCardIn: string;
  public promedio_palabras: any;
  public statusInit: any;
  public statusLoad: any;
  public activeButtomR: any;
  public activeButtomE: any;
  public statusResumen: string;
  public palabras_dificiles: any;
  public statusEstadisticas: string;
  public nombramiento_entidades: any;

  public view: [number, number] = [580, 240];
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  /*------------------------------------*/
  textPrevious: string= "";
  /*------------------------------------*/

  // options
  color_Indice: string= '#FFFFFF'
  animations: boolean = true;
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = false;
  showXAxisLabel: boolean = true;
  yAxisLabel: string = '';
  showYAxisLabel: boolean = true;
  xAxisLabel: string = '';
  dataChart: any[] = [];

  constructor(
    private _metricasService: MetricasService,
    private data: SaveTextService
  ) {
    this.textoNuevo ={
      "text": ""
    }
    this.statusInit = "flex"
    this.statusLoad = "block"
    this.colorCardIn = ""
    this.activeButtomR = "border: solid; border-radius: 0.375rem; color: #0D6EFD;"
    this.statusResumen = "block"
    this.statusEstadisticas = "none"
    this.palabras_dificiles = []
    this.nombramiento_entidades = []

    var dataC = this.dataChart
    Object.assign(this, { dataC })
  }

  ngOnInit(){
    this.data.currentMessage.subscribe(textPrevious => this.textPrevious = textPrevious)
  }

  cargarTextoMetricas(form: any){
    
    this._metricasService.getTexto(this.textoNuevo).subscribe(
      response => {
        console.log('metricas')
        console.log(response);
        if(response){
          this.hideloader();
        }
        this.textoMetricas = response;
        this.updateParameters();
      },
      error => {
        console.log('metricas')
        console.log(<any>error);
      }
    );
    
  }
 
  /*------------------------------*/
  color_level:string = '';
  IFSZ:string = '';
  level_inflesz:string = '';
  n_oraciones:string = '';
  p_palabras:string = '';
  n_palabras:string = '';
  n_parrafos:string = '';
  p_oraciones_parrafo:string = '';
  p_palabras_parrafo:string = '';
  oracion_mas_larga:string = '';
  pdd_etiquetado:string = '';
  nombres_entidades:any[] =[];

  updateParameters(){
    this.color_level = this.textoMetricas[0].Result_Indice.color_level;
    this.IFSZ = this.textoMetricas[0].Result_Indice.IFSZ;
    this.level_inflesz = this.textoMetricas[0].Result_Indice.level_inflesz;
    this.n_oraciones= this.textoMetricas[0].numero_oraciones;
    this.p_palabras = this.textoMetricas[0].promedio_palabras;
    this.n_palabras = this.textoMetricas[0].Numero_palabras;
    this.n_parrafos = this.textoMetricas[0].Numero_parrafos;
    this.p_oraciones_parrafo = this.textoMetricas[0].Promedio_oraciones_parrafo;
    this.p_palabras_parrafo = this.textoMetricas[0].Promedio_palabras_parrafo;
    this.oracion_mas_larga = this.textoMetricas[0].oracion_mas_larga;
    this.pdd_etiquetado = this.textoMetricas[0].pdd_etiquetado;
    this.textoMetricas = this.textoMetricas[0].nombramiento_entidades;
  }
  /*------------------------------*/

  onSelect(event: any) {
    if(event.view.screen.width > 1600){
      this.view = [780, 240]
    }else if(event.view.screen.width < 1601){
      this.view = [580, 240]
    }else if(event.view.screen.width < 1281){
      this.view = [480, 240]
    }

  }

  resetText(){
    this.textoNuevo.text = ""
    this.statusLoad = "flex"
    this.statusInit = "none"
  }

  activeResumen(){
    this.activeButtomR = "border: solid; border-radius: 0.375rem; color: #0D6EFD;"
    this.activeButtomE = ""
    this.statusResumen = "block"
    this.statusEstadisticas = "none"
  }

  activeEstadisticas(){
    this.activeButtomE = "border: solid; border-radius: 0.375rem; color: #0D6EFD;"
    this.activeButtomR = ""
    this.statusEstadisticas = "block"
    this.statusResumen = "none"
  }

  /*---------------------------------------------------------------------*/
  /*---------------------------------------------------------------------*/
  clearText(){
    this.textoNuevo.texto = '';
    this.textoMetricas = [];
  }

  newTexto(){
    if (0 < this.textoNuevo.texto.length){
      this.data.changeText(this.textoNuevo.texto)
    }
  }

  getTextoPrevious(){
    this.textoNuevo.texto = this.textPrevious
  }

  displayBool: any;
  displayNav = false;
  displayAux = 'none';

  hideloader(){
    this.displayBool = false;
    this.displayNav = true;
    this.displayAux = 'true';
  }
  displaySpinner(){
    this.displayBool = true;
    
  }
}
