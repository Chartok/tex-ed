const { getDb, putDb } = require('./database.js');
const { header } = require('./header.js');

class Editor {
  constructor() {
    const localData = localStorage.getItem('content');

    // check if CodeMirror is loaded
    if (typeof CodeMirror === 'undefined') {
      throw new Error('CodeMirror is not loaded');
    }

    this.editor = CodeMirror(document.querySelector('#main'), {
      value: '',
      mode: 'javascript',
      theme: 'monokai',
      lineNumbers: true,
      lineWrapping: true,
      indentUnit: 2,
      tabSize: 2
    });

    (async () => {
    try {
      const data = await getDb();
      console.info('Loaded data from IndexedDB, injecting into editor');
      this.editor.setValue(data || localData || header);
    } catch (error) {
      console.error('There was an error loading data from IndexedDB');
      this.editor.setValue(localData || header);
    }
    })();

    this.editor.on('change', () => {
      localStorage.setItem('content', this.editor.getValue());
    });

    // Save the content of the editor when the editor itself is loses focus
    this.editor.on('blur', async () => {
      console.log('Lost focus; saving content to IndexedDB...');
      try {
        await putDb(localStorage.getItem('content'));
      } catch (error) {
        console.error('There was an error saving data to IndexedDB');
        throw error;
      }
    });
  }
}

module.exports = Editor;
