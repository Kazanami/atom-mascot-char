'use babel';
import { CompositeDisposable } from 'atom';
import fs from 'fs'

export default class AtomMascotCharView {

  constructor(serializedState) {
    // Create root element
    this.subscriptions = new CompositeDisposable()
    this.element = document.createElement('div');
    this.element.classList.add('atom-mascot-char');
    this.setMascot(atom.config.get('atom-mascot-char.imagePath'));
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }

  setMascot(filepath){

    this.subscriptions.add(atom.config.observe('atom-mascot-char', () => {
      this.refresh()
    }))
    this.element.style.backgroundImage = this.encode(filepath);
    this.element.style.display = "block"
    this.element.style.opacity = atom.config.get('atom-mascot-char.opacity')
    //this.element.style.backgroundSize = atom.config.get('atom-mascot-char.size');

  }

  encode(file){
    let idx = file.lastIndexOf('.');
    let contentType;
    let extentions = file.substr(idx).replace('.', '');
    switch(extentions.toLowerCase()) {
      case "png": contentType = "image/png"; break;
      case "gif": contentType = "image/gif"; break;
      default: contentType = "image/jpeg";
    }
    let file2base64 = fs.readFileSync(file, 'base64');
    let data = `url("data:${contentType};base64,${file2base64}")`;
    return data
  }

  refresh(){
    console.log("Refreshing Setting...")
    this.element.style.backgroundImage = this.encode(atom.config.get('atom-mascot-char.imagePath'));
    this.element.style.backgroundSize = atom.config.get('atom-mascot-char.size')
    this.element.style.opacity = atom.config.get('atom-mascot-char.opacity')
  }

  toggle(){
    if (this.element.style.display === "block") {
      this.element.style.display = "none"
    } else {
      this.element.style.display = "block"
    }
  }
}
