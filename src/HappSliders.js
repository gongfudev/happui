import { LitElement, html, css } from 'lit-element';

export class HappSliders extends LitElement {

  static get styles() {
    return css`
      :host { display: block; }
      .sliders { margin: 0 auto; }
    `;
  }

  static get properties() {
    return {
      // Same properties as the ‹happ-ui› component
      sentir: { type: Number, reflect: true }, // Value in between 0.0 … 1.0
      connaitre: { type: Number, reflect: true }, // idem
      comprendre: { type: Number, reflect: true }, // idem
    };
  }

  constructor() {
    super();
    this.sentir = 0.65;
    this.connaitre = 0.65;
    this.comprendre = 0.65;
  }

  render() {
    return html`<div class="sliders">
      <happ-slider label="SEN" value="${this.sentir}" @slider-change="${this.handleChangeSEN}"></happ-slider>
      <happ-slider label="CON" value="${this.connaitre}" @slider-change="${this.handleChangeCON}"></happ-slider>
      <happ-slider label="COM" value="${this.comprendre}" @slider-change="${this.handleChangeCOM}"></happ-slider>
    </div>`;
  }

  handleChangeSEN( e) {
    const newValue = e.detail.value;
    this.sentir = newValue;
  }

  handleChangeCON( e) {
    const newValue = e.detail.value;
    this.connaitre = newValue;
  }

  handleChangeCOM( e) {
    const newValue = e.detail.value;
    this.comprendre = newValue;
  }

  dispatchChange( e) {

    let myChangeEvent = new CustomEvent( "slider-change", { 
      detail: { value: newValue }, bubbles: true, composed: true });
    this.dispatchEvent(myChangeEvent);

  
}