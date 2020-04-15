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
        padding: 25px;
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
      </style>
      <defs>
        <filter id="blur" color-interpolation-filters="linear" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="9"/>
        </filter>
        <mask id="circle">
          <circle cx="50" cy="50" r="50" fill="white"/>
        </mask>
      </defs>
      <g id="background-circle" filter="url(#blur)" > <!--  mask="url(#circle)" -->
        <circle cx="30" cy="50" r="${5+15*this._connaitre}" fill="hsl(${this._connaitre*359},100%,50%)"/>
        <circle cx="70" cy="50" r="${5+15*this._sentir}" fill="hsl(${this._sentir*359},100%,50%)"/>
        <circle cx="50" cy="30" r="${5+15*this._comprendre}" fill="hsl(${this._comprendre*359},100%,50%)"/>
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
