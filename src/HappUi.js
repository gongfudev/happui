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
      stem {
        stroke: #000;
        stroke-width:3.0
      }
    `;
  }

  static get properties() {
    return {
      title: { type: String },
      sentir: { type: Number },
      connaitre: { type: Number },
      comprendre: { type: Number },
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
    this.radius = 0.5;
    this.width = 0.3;
    this.maxLength = 0.90;
    this.minLength = 0.10;
    this.pistils = [
      { id: "p0", angle: 30, length: clamp( this.sentir, this.minLength, this.maxLength) },
      { id: "p1", angle: 150, length: clamp( this.connaitre, this.minLength, this.maxLength) },
      { id: "p2", angle: 270, length: clamp( this.comprendre, this.minLength, this.maxLength) },
    ];
  }

  render() {
    return svg`<svg viewBox="0 0 100 100" aria-label="${this.title}">
      <title>${this.title}</title>
      <defs>
        <filter id="blur" color-interpolation-filters="linear" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="9"/>
        </filter>
        <mask id="circle">
          <circle cx="50" cy="50" r="50" fill="white"/>
        </mask>
      </defs>
      <g mask="url(#circle)" filter="url(#blur)">
        <rect x="-10" width="110" height="110" fill="blue"/>
        <rect x="50" width="60" height="110" fill="yellow"/>
        <polygon points="50,50, 60,110, 40,110" fill="#0f8"/>
        <polygon points="0,0, 100,0, 100,20, 50,50, 0,20" fill="red"/>
        <polygon points="0,10, 50,50, 0,30" fill="#f0f"/>
        <polygon points="100,10, 100,30, 50,50" fill="#f80"/>
      </g>
      <g>
        ${this.pistils.map(
          pistil => svg`
            <g id="${pistil.id}" transform="translate(50.0 50.0) rotate(${pistil.angle} 0 0)">
              <line id="${pistil.id}" class="stem" x1="0" y1="0" x2="${pistil.length * 50.0}" y2="0" />
              <circle id="${pistil.id}" cx="${pistil.length * 50.0}" cy="0" r="${this.radius}" stroke="black" stroke-width="${this.width}" fill-opacity=0.0
            />
          `)}
      </g>
    </svg>`;
  }
}
