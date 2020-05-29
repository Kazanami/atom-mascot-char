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
    let idx = filepath.lastIndexOf('.');
    let contentType;
    let extentions = filepath.substr(idx).replace('.', '');
    switch(extentions.toLowerCase()) {
      case "png": contentType = "image/png"; break;
      case "gif": contentType = "image/gif"; break;
      default: contentType = "image/jpeg";
    }
    this.subscriptions.add(atom.config.observe('atom-mascot-char', () => {
      this.refresh()
    }))
    let file2base64 = fs.readFileSync(filepath, 'base64');
    let data = `url("data:${contentType};base64,${file2base64}")`;
    this.element.style.backgroundImage = data
    this.element.style.display = "block"
    //this.element.style.backgroundSize = atom.config.get('atom-mascot-char.size');

  }

  refresh(){
    console.log("Refreshing Setting...")
    this.element.style.backgroundImage = atom.config.get('atom-mascot-char.imagePath')
    this.element.style.backgroundSize = atom.config.get('atom-mascot-char.size')
  }

  toggle(){
    if (this.element.style.display === "block") {
      this.element.style.display = "none"
    } else {
      this.element.style.display = "block"
    }
  }
}
