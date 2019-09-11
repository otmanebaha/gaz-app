import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { GazModel } from '../../models/gaz.model';
import { GazService } from '../../service/gaz.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { File } from '@ionic-native/file/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { NFC, Ndef } from '@ionic-native/nfc/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  gaz: GazModel = new GazModel();
  photoTag: string;
  photoEmp: string;
  photoStore: string;
  cadeaux1 = [];
  cadeaux2 = [];
  constructor(public platform: Platform, private file: File, private webview: WebView,
              private camera: Camera, private geolocation: Geolocation,
              private gazService: GazService, private nfc: NFC, private ndef: Ndef,
              private iab: InAppBrowser) {
              }
  ngOnInit() {
  }
  save() {
    const finalCSV = {
        nom: this.gaz.nom,
        telephone: this.gaz.telephone,
        activite: this.gaz.activite,
        transaction: this.gaz.transaction,
        emplacement: this.gaz.emplacement,
        nombreVisites: this.gaz.nombreVisites,
        tissirPresentoir: this.gaz.tissirPresentoir,
        tissirChariot: this.gaz.tissirChariot,
        totalPresentoir: this.gaz.totalPresentoir,
        totalChariot: this.gaz.totalChariot,
        butaPresentoir: this.gaz.butaPresentoir,
        butaChariot: this.gaz.butaChariot,
        afriquiaPresentoir: this.gaz.afriquiaPresentoir,
        afriquiaChariot: this.gaz.afriquiaChariot,
        besoinClients: this.gaz.besoinClients,
        note: this.gaz.note,
        tissirPartMarche: this.gaz.tissirPartMarche,
        totalPartMarche: this.gaz.totalPartMarche,
        butaPartMarche: this.gaz.butaPartMarche,
        afriquiaPartMarche: this.gaz.afriquiaPartMarche,
        photoTag: this.gaz.photoTag,
        photoEmp: this.gaz.photoEmp,
        photoStore: this.gaz.photoStore,
        nfc: this.gaz.nfc,
        ville: this.gaz.ville,
        quartier: this.gaz.quartier,
        lat: this.gaz.lat,
        long: this.gaz.long,
        cadeau1: this.gaz.cadeau1,
        cadeau2: this.gaz.cadeau2,
        cadeau3: this.gaz.cadeau3
      };
    /*this.gaz.nom + ';' + this.gaz.telephone + ';' + this.gaz.activite + ';' +
    this.gaz.transaction + ';' + this.gaz.emplacement + ';' + this.gaz.tissirPresentoir + ';' +
    this.gaz.tissirChariot + ';' + this.gaz.totalPresentoir + ';' + this.gaz.totalChariot + ';' +
    this.gaz.butaPresentoir + ';' + this.gaz.butaChariot + ';' + this.gaz.afriquiaPresentoir + ';' +
    this.gaz.afriquiaChariot + ';' + this.gaz.besoinClients + ';' + this.gaz.note + ';' +
    this.gaz.tissirPartMarche + ';' + this.gaz.totalPartMarche + ';' + this.gaz.butaPartMarche + ';' +
    this.gaz.afriquiaPartMarche + ';' + this.gaz.nfc + ';' + this.gaz.adresse + ';' +
    this.gaz.cadeaux + ';';
    alert(finalCSV);
    this.file.writeFile('file:///storage/emulated/0/PicturesgazMobile/', 'hello.txt', 'finalCSV', {append: true, replace: true});
    */
    this.gazService.save(finalCSV).subscribe(data => {
      if (this.gaz.nom === '' || this.gaz.nfc === '') {
        alert('Veuillez vérifier vos informations');
      } else {
        alert('Enregistrement réussi');
        this.gaz = new GazModel();
      }
    }, err => {
      alert('Erreur d\'enregistrement');
    });
   }
  getLocation() {
            this.geolocation.getCurrentPosition().then((resp) => {
              this.gaz.lat = resp.coords.latitude;
              this.gaz.long = resp.coords.longitude;
             }).catch((error) => {
               console.log(JSON.stringify(error));
             });
  }
  takePicture() {
    const options: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.CAMERA,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: false,
      saveToPhotoAlbum: true
    };
    this.camera.getPicture(options).then((imageData) => {
       this.photoTag = this.webview.convertFileSrc(imageData);
       this.gaz.photoTag = imageData.substr(36);
    }, (err) => {
      console.log(err);
    });
  }
  takePicture2() {
    const options: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.CAMERA,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: false,
      saveToPhotoAlbum: true
    };
    this.camera.getPicture(options).then((imageData) => {
      this.photoEmp = this.webview.convertFileSrc(imageData);
      this.gaz.photoEmp = imageData.substr(36);
    }, (err) => {
    });
  }
  takePicture3() {
    const options: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.CAMERA,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: false,
      saveToPhotoAlbum: true
    };
    this.camera.getPicture(options).then((imageData) => {
      this.photoStore = this.webview.convertFileSrc(imageData);
      this.gaz.photoStore = imageData.substr(36);
    }, (err) => {
    });
  }
  getNCF() {
    this.nfc.addNdefListener().subscribe(data => {
      if (data && data.tag && data.tag.id) {
          if (data.tag.ndefMessage) {
              alert('Tag NFC trouvé');
              const payload = data.tag.ndefMessage[0].payload;
              const tagContent = this.nfc.bytesToString(payload).substring(3);
              this.gaz.nfc = tagContent;
              // console.log(tagContent);
          } else {
            alert('Tag NFC non trouvé');
          }
      }
  });
  }
  genererXLS() {
    window.open('http://seventrade.ma/tamtam/xls/data.xls.php', '_system', 'location=yes');
    // this.iab.create('http://seventrade.ma/tamtam/xls/data.xls.php');
   // alert('4');
   // window.location.href = 'http://seventrade.ma/tamtam/xls/data.xls.php';
   // alert('5');
  }
}
