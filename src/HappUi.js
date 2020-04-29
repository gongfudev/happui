import { html, svg, css, LitElement } from 'lit-element';

// Utility functions
function clamp( val, min, max) {
  return val <= min ? min : val >= max ? max : val;
}

// Web Component definition
export class HappUi extends LitElement {
  static get styles() {
    return css`
      :host {
        --happ-ui-text-color: #000;

        display: inline-block;
        padding: 0; margin: 0;
        color: var(--happ-ui-text-color);
      }
    `;
  }

  static get properties() {
    return {
      title: { type: String },
      sentir: { type: Number }, // Value in between 0.0 … 1.0
      connaitre: { type: Number }, // idem
      comprendre: { type: Number }, // idem
    };
  }

  constructor() {
    super();
    
    // Observed properties
    this.title = 'Color Wheel';
    this._sentir = 0.75;
    this._connaitre = 0.75;
    this._comprendre = 0.75;

    // Private properties
    this.__max = 0.90; // Maximum value of the properties { sentir, connaitre, comprendre }
    this.__min = 0.10; // Minimum value … idem …
  }

  get sentir() { return this._sentir; }  
  set sentir( val) {
    let oldVal = this._sentir;
    this._sentir = clamp( val, this.__min, this.__max);
    this.requestUpdate( 'sentir', oldVal);
  }

  get connaitre() { return this._connaitre; }
  set connaitre( val) {
    let oldVal = this._connaitre;
    this._connaitre = clamp( val, this.__min, this.__max);
    this.requestUpdate( 'connaitre', oldVal);
  }

  get comprendre() { return this._comprendre; }
  set comprendre( val) {
    let oldVal = this._comprendre;
    this._comprendre = clamp( val, this.__min, this.__max);
    this.requestUpdate( 'comprendre', oldVal);
  }

  render() {    
    return svg`<svg viewBox="0 0 100 100" aria-label="${this.title}">
      <title>${this.title}</title>
      <style>
        .stem { stroke: white; stroke-width: 3.0; }
        .sprout { stroke: white; stroke-width: 3.0; fill-opacity: 0.0; }
        .frame { stroke: black; stroke-width: 0.5; fill: none; }

        .stop1 { stop-color: #da00ff; stop-opacity: 25%; }
        .stop2 { stop-color: #0007d4; stop-opacity: 25%; }

        .stop3 { stop-color: #00a2ff; stop-opacity: 25%; }
        .stop4 { stop-color: #00a500; stop-opacity: 25%; }

        .stop5 { stop-color: #cd0000; stop-opacity: 25%; }
        .stop6 { stop-color: #ff9000; stop-opacity: 25%; }
      </style>
      <defs>
        <linearGradient id="gradientSEN">
          <stop class="stop1" offset="0%"/>
          <stop class="stop2" offset="100%"/>
        </linearGradient>

        <linearGradient id="gradientCON">
          <stop class="stop3" offset="0%"/>
          <stop class="stop4" offset="100%"/>
        </linearGradient>

        <linearGradient id="gradientCOM">
          <stop class="stop5" offset="0%"/>
          <stop class="stop6" offset="100%"/>
        </linearGradient>
        <filter id="blur" color-interpolation-filters="linear" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="9"/>
        </filter>
        <mask id="circle">
          <circle cx="50" cy="50" r="50" fill="white"/>
        </mask>
      </defs>
      <g id="background" mask="url(#circle)" filter="url(#blur)">
        <rect x="0" y="0" width="100" height="100" fill="white" />
        <circle id="areaCON" cx="30" cy="50" r="${5+20*this._connaitre}" fill="url(#gradientCON)"/>
        <circle id="areaSEN" cx="70" cy="50" r="${5+20*this._sentir}" fill="url(#gradientSEN)"/>
        <circle id="areaCOM" cx="50" cy="30" r="${5+20*this._comprendre}" fill="url(#gradientCOM)"/>
      </g>
      <g id="pistils">
        <g id="p0" transform="translate(50 50) rotate(30 0 0)">
          <line id="p0:stem" class="stem" x1="0" y1="0" x2="${this._sentir * 47 - 5}" y2="0" />
          <circle id="p0:sprout" class="sprout" cx="${this._sentir * 47}" cy="0" r="5" />
        </g>
        <g id="p1" transform="translate(50 50) rotate(150 0 0)">
          <line id="p1:stem" class="stem" x1="0" y1="0" x2="${this._connaitre * 47 - 5}" y2="0" />
          <circle id="p1:sprout" class="sprout" cx="${this._connaitre * 47}" cy="0" r="5" />
        </g>
        <g id="p2" transform="translate(50 50) rotate(270 0 0)">
          <line id="p2:stem" class="stem" x1="0" y1="0" x2="${this._comprendre * 47 - 5}" y2="0" />
          <circle id="p2:sprout" class="sprout" cx="${this._comprendre * 47}" cy="0" r="5" />
        </g>
      </g>
    </svg>`;
  }
}
