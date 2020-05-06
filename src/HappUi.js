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
    return html`<svg viewBox="0 0 100 100" aria-label="${this.title}" xmlns="http://www.w3.org/2000/svg">
      <title>${this.title}</title>
      <style>
        .stem { stroke: white; stroke-width: 3.0; }
        .sprout { stroke: white; stroke-width: 3.0; fill-opacity: 0.0; }

        .stop1 { stop-color: #da00ff; stop-opacity: 15%; }
        .stop2 { stop-color: #0007d4; stop-opacity: 100%; }

        .stop3 { stop-color: #00a2ff; stop-opacity: 15%; }
        .stop4 { stop-color: #00a500; stop-opacity: 100%; }

        .stop5 { stop-color: #cd0000; stop-opacity: 15%; }
        .stop6 { stop-color: #ff9000; stop-opacity: 100%; }
      </style>
      <defs>
        <linearGradient id="gradientSEN">
          <stop class="stop1" offset="0%"/>
          <stop class="stop2" offset="75%"/>
        </linearGradient>

        <linearGradient id="gradientCON">
          <stop class="stop3" offset="0%"/>
          <stop class="stop4" offset="75%"/>
        </linearGradient>

        <linearGradient id="gradientCOM">
          <stop class="stop5" offset="0%"/>
          <stop class="stop6" offset="75%"/>
        </linearGradient>
        <filter id="blur" color-interpolation-filters="linear" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="9"/>
        </filter>
        <mask id="circle">
          <circle cx="50" cy="50" r="50" fill="white"/>
        </mask>
      </defs>
      <g id="background" mask="url(#circle)" filter="url(#blur)"> <!--   -->
        <rect x="0" y="0" width="100" height="100" fill="none" stroke="none" />
        <g id="backSEN" transform="translate(50 50) rotate(270 0 0)">
          <circle id="backSEN:color" fill="url(#gradientSEN)"
            cx="${30 - this._sentir * 5}" cy="0"
             r="${10 + this._sentir * 50}" />
        </g>
        <g id="backCON" transform="translate(50 50) rotate(30 0 0)">
          <circle id="backCON:color" fill="url(#gradientCON)"
            cx="${30 - this._connaitre * 5}" cy="0"
             r="${10 + this._connaitre * 50}" />
        </g>
        <g id="backCOM" transform="translate(50 50) rotate(150 0 0)">
          <circle id="backCOM:color" fill="url(#gradientCOM)"
            cx="${30 - this._comprendre * 5}" cy="0"
             r="${10 + this._comprendre * 50}" />
        </g>
      </g>
      <g id="branches">
        <g id="branchSEN" transform="translate(50 50) rotate(270 0 0)">
          <line id="branchSEN:stem" class="stem" x1="0" y1="0" x2="${this._sentir * 47 - 5}" y2="0" />
          <circle id="branchSEN:sprout" class="sprout" cx="${this._sentir * 47}" cy="0" r="5" />
        </g>
        <g id="branchCON" transform="translate(50 50) rotate(30 0 0)">
          <line id="branchCON:stem" class="stem" x1="0" y1="0" x2="${this._connaitre * 47 - 5}" y2="0" />
          <circle id="branchCON:sprout" class="sprout" cx="${this._connaitre * 47}" cy="0" r="5" />
        </g>
        <g id="branchCOM" transform="translate(50 50) rotate(150 0 0)">
          <line id="branchCOM:stem" class="stem" x1="0" y1="0" x2="${this._comprendre * 47 - 5}" y2="0" />
          <circle id="branchCOM:sprout" class="sprout" cx="${this._comprendre * 47}" cy="0" r="5" />
        </g>
      </g>
    </svg>
    <happ-ui-slider label="SEN" value="${this._sentir}" @slider-change="${this.handleChangeSEN}"></happ-ui-slider>
    <happ-ui-slider label="CON" value="${this._connaitre}" @slider-change="${this.handleChangeCON}"></happ-ui-slider>
    <happ-ui-slider label="COM" value="${this._comprendre}" @slider-change="${this.handleChangeCOM}"></happ-ui-slider>`;
  }

  handleChangeSEN( e) {
    const newValue = e.detail.value;
    console.log( "changeSEN: " + newValue);
    this.sentir = newValue;
  }
  handleChangeCON( e) {
    const newValue = e.detail.value;
    console.log( "changeCON: " + newValue);
    this.connaitre = newValue;
  }
  handleChangeCOM( e) {
    const newValue = e.detail.value;
    console.log( "changeCOM: " + newValue);
    this.comprendre = newValue;
  }
}
