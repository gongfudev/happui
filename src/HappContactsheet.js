
import { LitElement, html, css } from 'lit-element';
import { HappUi } from '../happ-ui.js'

export class HappContactsheet extends LitElement {
 
static get styles() {
  return css`
      :host {
        --happ-ui-text-color: #000;

        display: inline;
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

      <div>
      <happ-ui></happ-ui>
      <happ-ui></happ-ui>
      <happ-ui></happ-ui>
  
      </div>
      <p>/HappContactsheet</p>
    `;
  }
}
