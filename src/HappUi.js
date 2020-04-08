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
      <g transform="scale( 0.125)">
        <path id="backcircle" d="M800,400c0,220.91-179.09,400-400,400S0,620.91,0,400,179.09,0,400,0,800,179.09,800,400ZM400,60C212.22,60,60,212.22,60,400S212.22,740,400,740,740,587.78,740,400,587.78,60,400,60Z"/>
        <path id="comprendre" d="M256.32,492.77a50.54,50.54,0,0,1-47.45,67.57,51,51,0,0,1-13.15-1.74A50.5,50.5,0,1,1,248,478l147.78-85.32,8.5,14.72Zm-25.44,4.3a25.5,25.5,0,1,0-44.17,25.5h0a25.5,25.5,0,0,0,44.17-25.5Z"/>
        <path id="sentir" d="M408.5,229.36V400h-17V229.18a50.47,50.47,0,1,1,17,.18ZM426,179.5A25.5,25.5,0,1,0,400.5,205,25.53,25.53,0,0,0,426,179.5Z"/>
        <path id="connaitre" d="M634.44,535.93a50.5,50.5,0,0,1-90.91-43.25L395.75,407.36l8.5-14.72L552.18,478a50.5,50.5,0,0,1,82.26,57.89Zm-31-47.33a25.5,25.5,0,1,0,9.33,34.83h0a25.49,25.49,0,0,0-9.33-34.83Z"/>
      </g>
    </svg>`;
  }
}
