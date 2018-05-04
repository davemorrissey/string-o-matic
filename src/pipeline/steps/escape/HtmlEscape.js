import Step from '../Step';
import Data from '../../Data';
import {StringType} from '../../Types';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class HtmlEscapeForm extends Component {

  render() {
    return (
      <form className="form-inline row">
        <div className="material-group col-xs-4 col-sm-3 col-md-2">
          <label>Encode</label>
          <select onChange={this.onCharactersChange} value={this.props.step.characters}>
            <option value="minimal">&lt; &gt; &amp; &quot; &apos;</option>
            <option value="nonascii">Non-ASCII</option>
            <option value="all">All</option>
          </select>
        </div>
        <div className="material-group col-xs-4 col-sm-3 col-md-2">
          <label>Entities</label>
          <select onChange={this.onEncodingChange} value={this.props.step.encoding}>
            <option value="names-hex">Names, Hex</option>
            <option value="names-dec">Names, Decimal</option>
            <option value="hex">Hex</option>
            <option value="dec">Decimal</option>
          </select>
        </div>
        <div className="material-group col-xs-4 col-sm-3 col-md-2">
          <label>Line endings</label>
          <select onChange={this.onLinesChange} value={this.props.step.lines}>
            <option value="keep">Keep</option>
            <option value="encode">Encode</option>
            <option value="brx">&lt;br/&gt;</option>
            <option value="br">&lt;br&gt;</option>
            <option value="p">&lt;p&gt;...&lt;/p&gt;</option>
            <option value="strip">Strip</option>
          </select>
        </div>
      </form>
    );
  }

  onCharactersChange = (e) => {
    this.props.step.setCharacters(e.target.value);
    this.props.refresh();
  };

  onEncodingChange = (e) => {
    this.props.step.setEncoding(e.target.value);
    this.props.refresh();
  };

  onLinesChange = (e) => {
    this.props.step.setLines(e.target.value);
    this.props.refresh();
  };

}

/**
 * TODO Try https://github.com/mathiasbynens/he or use its entity list
 */
class HtmlEscape extends Step {

  static title = 'HTML Escape';
  static variantTitle = 'Escape';
  static supports = [ StringType ];
  static output = StringType;
  static form = HtmlEscapeForm;

  characters = 'minimal';
  encoding = 'names-hex';
  lines = 'keep';
  
  minimalEntities = {
    '<': 'lt',
    '>': 'gt',
    '&': 'amp',
    '"': 'quot',
    '\'': 'apos'
  };

  // TODO Move to utils
  allEntities = {
    '\u0022': 'quot',
    '\u0026': 'amp',
    '\u0027': 'apos',
    '\u003C': 'lt',
    '\u003E': 'gt',
    '\u0025': 'percent',
    '\u002B': 'add',
    '\u003D': 'equal',
    '\u00A0': 'nbsp',
    '\u00A1': 'iexcl',
    '\u00A2': 'cent',
    '\u00A3': 'pound',
    '\u00A4': 'curren',
    '\u00A5': 'yen',
    '\u00A6': 'brvbar',
    '\u00A7': 'sect',
    '\u00A8': 'uml',
    '\u00A9': 'copy',
    '\u00AA': 'ordf',
    '\u00AB': 'laquo',
    '\u00AC': 'not',
    '\u00AD': 'shy',
    '\u00AE': 'reg',
    '\u00AF': 'macr',
    '\u00B0': 'deg',
    '\u00B1': 'plusmn',
    '\u00B2': 'sup2',
    '\u00B3': 'sup3',
    '\u00B4': 'acute',
    '\u00B5': 'micro',
    '\u00B6': 'para',
    '\u00B7': 'middot',
    '\u00B8': 'cedil',
    '\u00B9': 'sup1',
    '\u00BA': 'ordm',
    '\u00BB': 'raquo',
    '\u00BC': 'frac14',
    '\u00BD': 'frac12',
    '\u00BE': 'frac34',
    '\u00BF': 'iquest',
    '\u00C0': 'Agrave',
    '\u00C1': 'Aacute',
    '\u00C2': 'Acirc',
    '\u00C3': 'Atilde',
    '\u00C4': 'Auml',
    '\u00C5': 'Aring',
    '\u00C6': 'AElig',
    '\u00C7': 'Ccedil',
    '\u00C8': 'Egrave',
    '\u00C9': 'Eacute',
    '\u00CA': 'Ecirc',
    '\u00CB': 'Euml',
    '\u00CC': 'Igrave',
    '\u00CD': 'Iacute',
    '\u00CE': 'Icirc',
    '\u00CF': 'Iuml',
    '\u00D0': 'ETH',
    '\u00D1': 'Ntilde',
    '\u00D2': 'Ograve',
    '\u00D3': 'Oacute',
    '\u00D4': 'Ocirc',
    '\u00D5': 'Otilde',
    '\u00D6': 'Ouml',
    '\u00D7': 'times',
    '\u00D8': 'Oslash',
    '\u00D9': 'Ugrave',
    '\u00DA': 'Uacute',
    '\u00DB': 'Ucirc',
    '\u00DC': 'Uuml',
    '\u00DD': 'Yacute',
    '\u00DE': 'THORN',
    '\u00DF': 'szlig',
    '\u00E0': 'agrave',
    '\u00E1': 'aacute',
    '\u00E2': 'acirc',
    '\u00E3': 'atilde',
    '\u00E4': 'auml',
    '\u00E5': 'aring',
    '\u00E6': 'aelig',
    '\u00E7': 'ccedil',
    '\u00E8': 'egrave',
    '\u00E9': 'eacute',
    '\u00EA': 'ecirc',
    '\u00EB': 'euml',
    '\u00EC': 'igrave',
    '\u00ED': 'iacute',
    '\u00EE': 'icirc',
    '\u00EF': 'iuml',
    '\u00F0': 'eth',
    '\u00F1': 'ntilde',
    '\u00F2': 'ograve',
    '\u00F3': 'oacute',
    '\u00F4': 'ocirc',
    '\u00F5': 'otilde',
    '\u00F6': 'ouml',
    '\u00F7': 'divide',
    '\u00F8': 'oslash',
    '\u00F9': 'ugrave',
    '\u00FA': 'uacute',
    '\u00FB': 'ucirc',
    '\u00FC': 'uuml',
    '\u00FD': 'yacute',
    '\u00FE': 'thorn',
    '\u00FF': 'yuml',
    '\u0152': 'OElig',
    '\u0153': 'oelig',
    '\u0160': 'Scaron',
    '\u0161': 'scaron',
    '\u0178': 'Yuml',
    '\u0192': 'fnof',
    '\u02C6': 'circ',
    '\u02DC': 'tilde',
    '\u0391': 'Alpha',
    '\u0392': 'Beta',
    '\u0393': 'Gamma',
    '\u0394': 'Delta',
    '\u0395': 'Epsilon',
    '\u0396': 'Zeta',
    '\u0397': 'Eta',
    '\u0398': 'Theta',
    '\u0399': 'Iota',
    '\u039A': 'Kappa',
    '\u039B': 'Lambda',
    '\u039C': 'Mu',
    '\u039D': 'Nu',
    '\u039E': 'Xi',
    '\u039F': 'Omicron',
    '\u03A0': 'Pi',
    '\u03A1': 'Rho',
    '\u03A3': 'Sigma',
    '\u03A4': 'Tau',
    '\u03A5': 'Upsilon',
    '\u03A6': 'Phi',
    '\u03A7': 'Chi',
    '\u03A8': 'Psi',
    '\u03A9': 'Omega',
    '\u03B1': 'alpha',
    '\u03B2': 'beta',
    '\u03B3': 'gamma',
    '\u03B4': 'delta',
    '\u03B5': 'epsilon',
    '\u03B6': 'zeta',
    '\u03B7': 'eta',
    '\u03B8': 'theta',
    '\u03B9': 'iota',
    '\u03BA': 'kappa',
    '\u03BB': 'lambda',
    '\u03BC': 'mu',
    '\u03BD': 'nu',
    '\u03BE': 'xi',
    '\u03BF': 'omicron',
    '\u03C0': 'pi',
    '\u03C1': 'rho',
    '\u03C2': 'sigmaf',
    '\u03C3': 'sigma',
    '\u03C4': 'tau',
    '\u03C5': 'upsilon',
    '\u03C6': 'phi',
    '\u03C7': 'chi',
    '\u03C8': 'psi',
    '\u03C9': 'omega',
    '\u03D1': 'thetasym',
    '\u03D2': 'upsih',
    '\u03D6': 'piv',
    '\u2002': 'ensp',
    '\u2003': 'emsp',
    '\u2009': 'thinsp',
    '\u200C': 'zwnj',
    '\u200D': 'zwj',
    '\u200E': 'lrm',
    '\u200F': 'rlm',
    '\u2013': 'ndash',
    '\u2014': 'mdash',
    '\u2015': 'horbar',
    '\u2018': 'lsquo',
    '\u2019': 'rsquo',
    '\u201A': 'sbquo',
    '\u201C': 'ldquo',
    '\u201D': 'rdquo',
    '\u201E': 'bdquo',
    '\u2020': 'dagger',
    '\u2021': 'Dagger',
    '\u2022': 'bull',
    '\u2026': 'hellip',
    '\u2030': 'permil',
    '\u2032': 'prime',
    '\u2033': 'Prime',
    '\u2039': 'lsaquo',
    '\u203A': 'rsaquo',
    '\u203E': 'oline',
    '\u2044': 'frasl',
    '\u20AC': 'euro',
    '\u2111': 'image',
    '\u2118': 'weierp',
    '\u211C': 'real',
    '\u2122': 'trade',
    '\u2135': 'alefsym',
    '\u2190': 'larr',
    '\u2191': 'uarr',
    '\u2192': 'rarr',
    '\u2193': 'darr',
    '\u2194': 'harr',
    '\u21B5': 'crarr',
    '\u21D0': 'lArr',
    '\u21D1': 'uArr',
    '\u21D2': 'rArr',
    '\u21D3': 'dArr',
    '\u21D4': 'hArr',
    '\u2200': 'forall',
    '\u2202': 'part',
    '\u2203': 'exist',
    '\u2205': 'empty',
    '\u2207': 'nabla',
    '\u2208': 'isin',
    '\u2209': 'notin',
    '\u220B': 'ni',
    '\u220F': 'prod',
    '\u2211': 'sum',
    '\u2212': 'minus',
    '\u2217': 'lowast',
    '\u221A': 'radic',
    '\u221D': 'prop',
    '\u221E': 'infin',
    '\u2220': 'ang',
    '\u2227': 'and',
    '\u2228': 'or',
    '\u2229': 'cap',
    '\u222A': 'cup',
    '\u222B': 'int',
    '\u2234': 'there4',
    '\u223C': 'sim',
    '\u2245': 'cong',
    '\u2248': 'asymp',
    '\u2260': 'ne',
    '\u2261': 'equiv',
    '\u2264': 'le',
    '\u2265': 'ge',
    '\u2282': 'sub',
    '\u2283': 'sup',
    '\u2284': 'nsub',
    '\u2286': 'sube',
    '\u2287': 'supe',
    '\u2295': 'oplus',
    '\u2297': 'otimes',
    '\u22A5': 'perp',
    '\u22C5': 'sdot',
    '\u2308': 'lceil',
    '\u2309': 'rceil',
    '\u230A': 'lfloor',
    '\u230B': 'rfloor',
    '\u2329': 'lang',
    '\u232A': 'rang',
    '\u25CA': 'loz',
    '\u2660': 'spades',
    '\u2663': 'clubs',
    '\u2665': 'hearts',
    '\u2666': 'diams'
  };
  
  setCharacters(characters) {
    this.output = null;
    this.characters = characters;
    this.passInput();
  }

  setEncoding(encoding) {
    this.output = null;
    this.encoding = encoding;
    this.passInput();
  }

  setLines(lines) {
    this.output = null;
    this.lines = lines;
    this.passInput();
  }

  calculate(input) {
    let result = '';
    let data = input.data;
    // When encoding lines as breaks/paragraphs, replace windows new lines first
    if (this.lines === 'b' || this.lines === 'p') {
      data = data.replace(/\r\n/g, '\n');
    }
    for (let i = 0; i < data.length; i++) {
      const char = data.substring(i, i + 1);
      const int = data.charCodeAt(i);
      if (char === '\r' || char === '\n') {
        if (this.lines === 'keep') {
          result += char;
        } else if (this.lines === 'encode') {
          result += this.entity(int);
        } else if (this.lines === 'brx') {
          result += '\n<br/>\n';
        } else if (this.lines === 'br') {
          result += '\n<br>\n';
        } else if (this.lines === 'p') {
          result += '\n</p>\n<p>\n';
        }
      } else if (this.minimalEntities[char] || (int > 0x7F && this.characters === 'nonascii') || this.characters === 'all') {
        if (this.allEntities[char] && this.encoding.indexOf('names') > -1) {
          result += '&' + this.allEntities[char] + ';';
        } else if (int >= 0xD800 && int <= 0xDBFF && i < data.length - 1) {
          // Surrogate high byte. Combine this and the next.
          // NOTE No check if the second byte is in the low surrogate range 0xDC00 to 0xDFFF.
          const hi = int;
          const lo = data.charCodeAt(i + 1);
          const pair = (hi - 0xD800) * 0x400 + lo - 0xDC00 + 0x10000;
          result += this.entity(pair);
          i += 1;
        } else if (int <= 0xFFFF) {
          result += this.entity(int);
        } else {
          // Should never happen as utf16 character can't be above 0xFFFF
          result += char;
        }
      } else {
        result += char;
      }
    }
    if (this.lines === 'p') {
      result = '<p>\n' + result + '\n</p>';
    }
    return Data.string(result);
  }

  entity(int) {
    if (this.encoding.indexOf('hex') > -1) {
      return '&#x' + int.toString(16) + ';';
    } else {
      return '&#' + int.toString(10) + ';';
    }
  }

}

HtmlEscapeForm.propTypes = {
  step: PropTypes.instanceOf(HtmlEscape).isRequired,
  refresh: PropTypes.func.isRequired
};

export {HtmlEscapeForm};
export default HtmlEscape;
