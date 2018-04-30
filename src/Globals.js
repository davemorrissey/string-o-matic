import Data from './pipeline/Data';

class Globals {

  static steps = [];

  static inputSequence = 0;

  static inputType = 'text';
  static inputDirection = 'ltr';

  static textInput = 'Life is like a 📦 of 🍫';

  static file = null;
  static fileInput = Data.string('');
  static fileError = null;

  static reset() {
    Globals.steps = [];
    Globals.inputSequence = 0;
    Globals.textInput = '';
    Globals.file = null;
    Globals.fileInput = Data.string('');
    Globals.fileError =  null;
  }

  static noAutoComplete = {
    autoCapitalize: 'false',
    autoCorrect: 'false',
    autoComplete: 'false',
    spellCheck: 'false',
    'data-lpignore': 'true'
  };

}

export default Globals;