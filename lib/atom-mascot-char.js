'use babel';

import AtomMascotCharView from './atom-mascot-char-view';
import {
  CompositeDisposable
} from 'atom';
import * as configData from './config.json'

export default {

  atomMascotCharView: null,
  subscriptions: null,
  config: configData,

  activate(state) {
    this.atomMascotCharView = new AtomMascotCharView(state.atomMascotCharViewState);

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-mascot-char:toggle': () => this.toggle()
    }));

    /*atom.config.observe('atom-mascot-char', newConfig => {
      //reload()
      console.log(`Update_Config`);
      console.log(newConfig)
      this.reload(newConfig);
    })*/
    /*atom.config.onDidChange('atom-mascot-char.size', (newConfig, oldConfig) => {
      //reload()
    })*/

    atom.commands.dispatch(document.querySelector('atom-workspace'), 'atom-mascot-char:toggle')

  },

  deactivate() {
    this.subscriptions.dispose();
    this.atomMascotCharView.destroy();
  },

  serialize() {
    return {
      atomMascotCharViewState: this.atomMascotCharView.serialize()
    };
  },

  toggle() {
    console.log('AtomMascotChar was toggled!');
    return document.querySelector(".atom-mascot-char") != null ? this.atomMascotCharView.toggle() : this.init()
  },

  init() {
    atom.views.getView(atom.workspace).append(this.atomMascotCharView.getElement())
  }
  /*,

    reload(newValue){
      this.deactivate();
      //atom.config.set('atom-mascot-char.', value, options)
      atom.config.set('atom-mascot-char', newValue);
      this.init()
      atom.commands.dispatch(document.querySelector('atom-workspace'), 'atom-mascot-char:toggle')
    }*/
};
