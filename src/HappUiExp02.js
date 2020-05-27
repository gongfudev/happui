import { html, svg, css, LitElement } from 'lit-element';
import { HappUiControls } from './HappUiControls.js';

// Web Component definition
export class HappUiExp02 extends HappUiControls( LitElement) {
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
    this.title = 'DragMe';
    this._sentir = 0.65;
    this._connaitre = 0.65;
    this._comprendre = 0.65;

    // Private properties
    this.__max = 0.90; // Maximum value of the properties { sentir, connaitre, comprendre }
    this.__min = 0.10; // Minimum value … idem …
    this.__step = 0.05 // of R

    this._sentir_angle = 270;
    this._connaitre_angle = 30;
    this._comprendre_angle = 150;
  }

  get sentir() { return this._sentir; }
  set sentir( val) {
    let oldVal = this._sentir;
    this._sentir = this.clamp( val, this.__min, this.__max);
    this.requestUpdate( 'sentir', oldVal);
  }

  get connaitre() { return this._connaitre; }
  set connaitre( val) {
    let oldVal = this._connaitre;
    this._connaitre = this.clamp( val, this.__min, this.__max);
    this.requestUpdate( 'connaitre', oldVal);
  }

  get comprendre() { return this._comprendre; }
  set comprendre( val) {
    let oldVal = this._comprendre;
    this._comprendre = this.clamp( val, this.__min, this.__max);
    this.requestUpdate( 'comprendre', oldVal);
  }

  firstUpdated(changedProperties) {
    console.table(this.happUiLogoDimensions(100))
  }

  render() {
    const dims = this.happUiLogoDimensions(50)
    return html`<svg viewBox="0 0 100 100"
        aria-label="${this.title}"
        @mousedown="${this._mousedown}"
        @mousemove="${this._mousemove}"
        @mouseup="${this._mouseup}"
        @mouseleave="${this._mouseleave}"
        xmlns="http://www.w3.org/2000/svg"
      >
      <title>${this.title}</title>
      <style>
        .stem { stroke: white; stroke-width: 2.5; }
        .sprout { stroke: white; stroke-width: 3.75; fill-opacity: 0.0; }

        .stop1 { stop-color: #da00ff; stop-opacity: 15%; }
        .stop2 { stop-color: #0007d4; stop-opacity: 100%; }

        .stop3 { stop-color: #00a2ff; stop-opacity: 15%; }
        .stop4 { stop-color: #00a500; stop-opacity: 100%; }

        .stop5 { stop-color: #cd0000; stop-opacity: 15%; }
        .stop6 { stop-color: #ff9000; stop-opacity: 100%; }

        .sliders { margin: auto; }
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
      <g id="background" mask="url(#circle)" filter="url(#blur)" > <!--   -->
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

      <g id="pistils">
        <g id="p0" transform="translate(50 50) rotate(${this._sentir_angle} 0 0)">
          <title>sentir</title>
          <line id="p0:stem" class="stem" x1="0" y1="0" x2="${this._sentir * 47 - 5}" y2="0" />
          <circle id="p0:sprout" class="sprout" cx="${this._sentir * 47}" cy="0" r="5.625" />
        </g>
        <g id="p1" transform="translate(50 50) rotate(${this._connaitre_angle} 0 0)">
          <title>connaitre</title>
          <line id="p1:stem" class="stem" x1="0" y1="0" x2="${this._connaitre * 47 - 5}" y2="0" />
          <circle id="p1:sprout" class="sprout" cx="${this._connaitre * 47}" cy="0" r="5.625" />
        </g>
        <g id="p2" transform="translate(50 50) rotate(${this._comprendre_angle} 0 0)">
          <title>comprendre</title>
          <line id="p2:stem" class="stem" x1="0" y1="0" x2="${this._comprendre * 47 - 5}" y2="0" />
          <circle id="p2:sprout" class="sprout" cx="${this._comprendre * 47}" cy="0" r="5.625" />
        </g>
      </g>
    </svg>`;
  }
}