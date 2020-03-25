import { html, svg, css, LitElement } from 'lit-element';

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
      counter: { type: Number },
    };
  }

  constructor() {
    super();
    this.title = 'Hey there';
    this.counter = 5;
  }

  __increment() {
    this.counter += 1;
  }

  render() {
    return svg`<svg viewBox="0 0 100 100" aria-label="${this.title}">
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
    </svg>`;
  }
}
