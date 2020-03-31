// https://dev.to/link2twenty/litelement-using-web-components-580a

import { LitElement, html } from 'lit-element';

export class MySwitch extends LitElement {
    render() {
      return html`
        <p>Hello world!</p>
      `;
    }
  }
  
  customElements.define('md-switch', MySwitch);
