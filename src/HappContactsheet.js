
import { LitElement, html, css } from 'lit-element';
import { HappUi } from '../happ-ui.js'
import { NestedElement } from '../nested-element.js'

export class HappContactsheet extends LitElement {
 
static get styles() {
  return css`
      :host {
        --happ-ui-text-color: #000;

        display: inline-block;
        padding: 25px;
        color: var(--happ-ui-text-color);

        body { background: #0a0afa; }
        happ-ui { width: 25%; height: 25%; }
      }
    `;
  }

  render() {
    return html`
      <!-- template content -->
      <p>HappContactsheet</p>
      <svg height="20" width="20">
        <circle cx="10" cy="10" r="8" stroke="black" stroke-width="2" fill="red" />
      </svg>

      <nested-element></nested-element>

      <div>
      <happ-ui></happ-ui>
      <happ-ui></happ-ui>
      <happ-ui></happ-ui>
  
      </div>
      <p>/HappContactsheet</p>
    `;
  }
}
