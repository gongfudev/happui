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
    this.sentir = 0.75;
    this.connaitre = 0.75;
    this.comprendre = 0.75;

    // Private properties
    this.__sproutRadius = 5.0;
    this.__strokeWidth = 3.0;
    this.__maxLength = 0.90;
    this.__minLength = 0.10;
  }

  render() {
    return svg`<svg viewBox="0 0 100 100" aria-label="${this.title}">
      <title>${this.title}</title>
      <style>
        --happ-ui-stroke-width: 3.0;
        .stem { stroke: black; stroke-width: var(--happ-ui-stroke-width); }
        .sprout { stroke: black; stroke-width: var(--happ-ui-stroke-width); fill-opacity: 0.0; }
      </style>
      <defs>
        <filter id="blur" color-interpolation-filters="linear" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="9"/>
        </filter>
        <mask id="circle">
          <circle cx="50" cy="50" r="50" fill="white"/>
        </mask>
      </defs>
      <g id="background-circle" mask="url(#circle)" filter="url(#blur)">
        <rect x="-10" width="110" height="110" fill="blue"/>
        <rect x="50" width="60" height="110" fill="yellow"/>
        <polygon points="50,50, 60,110, 40,110" fill="#0f8"/>
        <polygon points="0,0, 100,0, 100,20, 50,50, 0,20" fill="red"/>
        <polygon points="0,10, 50,50, 0,30" fill="#f0f"/>
        <polygon points="100,10, 100,30, 50,50" fill="#f80"/>
      </g>
      <g id="pistils">
        <g id="p0" transform="translate(50 50) rotate(30 0 0)">
          <line id="p0:stem" class="stem" x1="0" y1="0" x2="${this.sentir * 47.0 - this.__sproutRadius}" y2="0" />
          <circle id="p0:sprout" class="sprout" cx="${this.sentir * 47.0}" cy="0" r="${this.__sproutRadius}" />
        </g>
        <g id="p1" transform="translate(50 50) rotate(150 0 0)">
          <line id="p1:stem" class="stem" x1="0" y1="0" x2="${this.connaitre * 47.0 - this.__sproutRadius}" y2="0" />
          <circle id="p1:sprout" class="sprout" cx="${this.connaitre * 47.0}" cy="0" r="${this.__sproutRadius}" />
        </g>
        <g id="p2" transform="translate(50 50) rotate(270 0 0)">
          <line id="p2:stem" class="stem" x1="0" y1="0" x2="${this.comprendre * 47.0 - this.__sproutRadius}" y2="0" />
          <circle id="p2:sprout" class="sprout" cx="${this.comprendre * 47.0}" cy="0" r="${this.__sproutRadius}" />
        </g>
      </g>
    </svg>`;
  }
}
