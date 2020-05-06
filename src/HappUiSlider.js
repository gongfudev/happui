import { html, css, LitElement } from 'lit-element';

// Web Component definition
export class Slider extends LitElement {
  static get styles() {
    return css`
      :host {
        --happ-ui-text-color: #000;

        display: inline-block;
        padding: 0; margin: 0;
        color: var(--happ-ui-text-color);

        input#repr { width: 50px }
      }
    `;
  }

  static get properties() {
    return {
      value: { type: Number }, // Value in between 0.0 … 1.0
    };
  }

  constructor() {
    super();
    
    // Observed properties
    this.value = 0.5;
  }

  render() {    
    return html`<input id="slider" type="range" min="0.0" max="1.0" step="0.1" value="${this.value}">
      <input id="repr" type="number" step="0.5" value="${this.value}">`;
  }
}
