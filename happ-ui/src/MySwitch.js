// https://dev.to/link2twenty/litelement-using-web-components-580a

import { LitElement, html } from 'lit-element';

export class MySwitch extends LitElement {
  static get properties() {
    return {
      checked:  { type: Boolean, attribute: true },
      disabled: { type: Boolean, attribute: true }
    };
  }

  updateChecked(e) {
    this.checked = e.target.checked;
    console.log("${this.checked}")
  }

  render() {
    return html`
      <label class="md_switch">
      <input
      @change="${this.updateChecked}"
      ?checked="${this.checked}"
      ?disabled="${this.disabled}"
      type="checkbox" />
        <span class="md_switch__toggle"></span>
        <slot>what</slot>
      </label>
    `;
  }
  
}
  
//customElements.define('md-switch', MySwitch);
