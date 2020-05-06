import { html, css, LitElement } from 'lit-element';

// Web Component definition
export class Slider extends LitElement {
  static get styles() {
    return css`
      :host {
        --happ-ui-text-color: #000;

        display: inline-block; padding: 0; margin: 0;
        color: var(--happ-ui-text-color); }

      input.repr { width: 3rem }
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
    return html`
      <input type="range" value="${this.value}" @input="${this.handleChange}" min="0.0" max="1.0" step="0.05" class="slider">
      <input type="number" value="${this.value}" @change="${this.handleChange}" min="0.0" max="1.0" step="0.05" class="repr">
    `;
  }
  
  handleChange( e) {
    console.log( e.target.value);
    this.value = parseFloat( e.target.value);
  }
}
