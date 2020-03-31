// https://dev.to/link2twenty/litelement-using-web-components-580a

import { LitElement, html } from 'lit-element';

export class MySwitch extends LitElement {

  render() {
    return html`
      <label class="md_switch">
        <input type="checkbox" />
        <span class="md_switch__toggle"></span>
        <slot>what</slot>
      </label>
    `;
  }
  
}
  
//customElements.define('md-switch', MySwitch);
