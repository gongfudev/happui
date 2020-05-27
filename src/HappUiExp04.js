import { html, svg, css, LitElement } from 'lit-element';
import { HappUiControls } from './HappUiControls.js';

// Web Component definition
export class HappUiExp04 extends HappUiControls( LitElement) {
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
    const colorTriplet = [ [ 255, 255, 0 ], [ 0, 255, 255 ], [ 255, 0, 255 ] ]
    // find normalization factor
    const colorTripletVector = this.colorWeightedMean([1,1,1], colorTriplet)
    const colorTripletVectorMax = this.vectorMax(colorTripletVector)
    const factor = 255 / colorTripletVectorMax
    // compute current color
    const weights = [ this.sentir, this.connaitre, this.comprendre ]
    const colorVector = this.colorWeightedMean(weights, colorTriplet)
    const colorVectorNorm = this.vectorMult(colorVector, factor)
    const fillColor = `rgb(${colorVectorNorm[0]},${colorVectorNorm[1]},${colorVectorNorm[2]})`
    // console.log(colorVector)
    // console.log(colorVectorNorm)
    // console.log(fillColor)
    const flowerScale = this.vectorMean(weights)

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
      </style>

      <g  transform="translate(50, 50)">
        <circle cx="0" cy="0" r="50" fill="${fillColor}" transform='rotate(0)' />
      </g>

      <style>
        .pink { fill: #e630bc }
        .white { fill: #ffffff }
      </style>

      <defs>
        <path id="1p" stroke="#333333" stroke-width="1" d="M0,0 q50,-30 100,0 q-50,30 -100,0" />
        <path id="2p" stroke="#333333" stroke-width="1" d="M0,0 q50,-25 100,0 q-50,25 -100,0 q-50,25 -100,0 q50,-25 100,0" />
        <g id='6p'>
          <use href='#2p' transform='rotate(0)' />
          <use href='#2p' transform='rotate(60)' />
          <use href='#2p' transform='rotate(120)' />
        </g>
      </defs>
      <g id='flower' class='white' transform='translate(50, 50) scale(${flowerScale * 0.6})'>
        <use href='#6p' transform='scale(1.0)' />
        <use href='#6p' transform='rotate(30) scale(0.5)' />
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