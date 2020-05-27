'use babel';

import AtomMascotCharView from './atom-mascot-char-view';
import { CompositeDisposable } from 'atom';
import * as configData from './debug_config.json'

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
  },

  deactivate() {
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

};
