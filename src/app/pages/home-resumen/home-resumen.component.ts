import { Component, OnInit } from '@angular/core';
import { MT5Service } from 'src/app/services/m-t5.service';
import { ResumenExtractivoService } from 'src/app/services/resumen-extractivo.service';
import { SaveTextService } from 'src/app/services/save-text.service';

@Component({
  selector: 'app-home-resumen',
  templateUrl: './home-resumen.component.html',
  styleUrls: ['./home-resumen.component.css'],
  providers: [MT5Service,ResumenExtractivoService]
})

export class HomeResumenComponent implements OnInit {

  public textoNuevo: any;
  public textoResumenes: Array<any> = [];
  public porcentajeResumen: any;

  textPrevious: string= "";

  constructor(
    private _resumeServiceAbstractivo: MT5Service,
    private _resumeServiceExtractivo: ResumenExtractivoService,
    private data: SaveTextService
  ) {
      this.textoNuevo= {
        "porcentaje": "50",
        "texto": ""
      }
   }

  ngOnInit() {
    this.data.currentMessage.subscribe(textPrevious => this.textPrevious = textPrevious)
  }

  newTexto(){
    if (0 < this.textoNuevo.texto.length){
      this.data.changeText(this.textoNuevo.texto)
    }
  }

  getTextoPrevious(){
    this.textoNuevo.texto = this.textPrevious
  }
  
 

/* Funciones para cargar texto en la Api */
  cargarResumenAbstractivo(form: any){
    this._resumeServiceAbstractivo.getTexto(this.textoNuevo).subscribe(
      response => {

      console.log(response.length);
      if(response){
        this.hideloader();
      }
      this.textoResumenes = response;
      
    },
    error => {
      console.log(<any> error)
    }
  );
  }

  cargarResumenExtractivo(form: any){
    this._resumeServiceExtractivo.getTexto(this.textoNuevo).subscribe(
      response => {
        console.log(response.length);
        if(response){
          this.hideloader();
        }
        this.textoResumenes = response;
    },
    error => {
      console.log(<any> error)
    }
  );
  }
  /*------------------------------*/

  clearText(){
    this.textoNuevo.texto = '';
    this.textoResumenes = [];
  }
  
  //---------------------------------------------
  //---------------------------------------------
  displayBool: any;

  hideloader(){
    this.displayBool = false;
  }
  displaySpinner(){
    this.displayBool = true;
    
  }
}
