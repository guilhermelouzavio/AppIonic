import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { PadariaProvider, Padaria } from '../../providers/padaria/padaria';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  padarias: any[] = [];
  constructor(public navCtrl: NavController, private toast: ToastController, private padariaProvider: PadariaProvider) {

  }

  ionViewDidEnter() {
    this.getAllPadarias();
  }

  getAllPadarias() {
    this.padariaProvider.getAll()
      .then((result: any[]) => {
        this.padarias = result;
      })
  }

  addPadaria() {
    this.navCtrl.push('EditPadariaPage');
  }

  editPadaria(id: number) {
    this.navCtrl.push('EditPadariaPage', { id: id });
  }

  removePadaria(padaria: Padaria) {
    this.padariaProvider.remover(padaria.id)
      .then(() => {
        //Removendo do array de produtos
        var index = this.padarias.indexOf(padaria);
        this.padarias.splice(index, 1);
        this.toast.create({ message: 'Padaria removida', duration: 3000 , position: 'botton' }).present();


      })
  }

}
