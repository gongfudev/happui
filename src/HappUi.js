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
      sentir: { type: Number },
      connaitre: { type: Number },
      comprendre: { type: Number },
    };
  }

  constructor() {
    super();
    
    // Observed properties
    this.title = 'Color Wheel';
    this.sentir = 75;
    this.connaitre = 75;
    this.comprendre = 75;

    // Private properties
    this.viewBoxWidth = 100.0;
    this.viewBoxHeight = 100.0;
    this.originX = this.viewBoxWidth / 2.0;
    this.originY = this.viewBoxHeight / 2.0;
    this.radius = 0.5;
    this.width = 0.3;
    this.maxLength = 90.0;
    this.minLength = 10.0;
    this.pistils = [
      { id: "p0", angle: 30, length: clamp( this.sentir },
      { id: "p1", angle: 150, length: this.connaitre },
      { id: "p2", angle: 270, length: this.comprendre },
    ];
  }

  render() {
    return svg`<svg viewBox="0 0 ${viewBoxWidth} ${viewBoxHeight}" aria-label="${this.title}">
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
            <g id="${pistil.id}" transform="rotate(${pistil.angle} ${this.originX} ${this.originY})">
              <line id="${pistil.id}" x1="${this.originX}" y1="${this.originY}" x2="${this.originX + pistil.length - this.radius}" y2="${this.originY}" style="stroke:rgb(0,0,0);stroke-width:${this.width}" />
              <circle class="circle" id="${pistil.id}" cx="${this.originX + pistil.length}" cy="${this.originY}" r="${this.radius}" stroke="black" stroke-width="${this.width}" fill-opacity=0.0
            />
      </g>
    </svg>`;
  }
}
