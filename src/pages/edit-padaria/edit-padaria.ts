import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { PadariaProvider, Padaria } from '../../providers/padaria/padaria';

@IonicPage()
@Component({
  selector: 'page-edit-padaria',
  templateUrl: 'edit-padaria.html',
})
export class EditPadariaPage {
  model: Padaria;
  categories: any[];

  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    private toast: ToastController, private padariaProvider: PadariaProvider) {

    this.model = new Padaria();

    if (this.navParams.data.id) {
      this.padariaProvider.get(this.navParams.data.id)
        .then((result: any) => {
          this.model = result;
        });
    }
  }

  save() {
    this.savePadaria()
      .then(() => {
        this.toast.create({ message: 'Padaria salva.', duration: 3000, position: 'botton' }).present();
        this.navCtrl.pop();
      })
      .catch(() => {
        this.toast.create({ message: 'Erro ao salvar a padaria.', duration: 3000, position: 'botton' }).present();
      });
  }

  private savePadaria() {
    if (this.model.id) {
      return this.padariaProvider.update(this.model);
    } else {
      return this.padariaProvider.insert(this.model)
    }
  }
   
  }
