import { LitElement, html, css } from 'lit-element';

export class VariousComponents extends LitElement {

  static get styles() {
    return css`
      :host { display: block; }
      .sliders { margin: 0 auto; }
    `;
  }

  render() {
    return html`<div class="sliders">
      <happ-ui-slider label="SEN" value="${this._sentir}" @slider-change="${this.handleChangeSEN}"></happ-ui-slider>
      <happ-ui-slider label="CON" value="${this._connaitre}" @slider-change="${this.handleChangeCON}"></happ-ui-slider>
      <happ-ui-slider label="COM" value="${this._comprendre}" @slider-change="${this.handleChangeCOM}"></happ-ui-slider>
    </div>`;
  }
}