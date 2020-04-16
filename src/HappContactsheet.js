
import { LitElement, html, css } from 'lit-element';
import { HappUi } from '../happ-ui.js'

export class HappContactsheet extends LitElement {
 
static get styles() {
  return css`
      :host {
        --happ-ui-text-color: #000;

        display: block;
        padding: 10px;
        color: var(--happ-ui-text-color);

        body { background: #fafafa; }
        happ-ui { width: 10%; height: 10%; }
      }
      button {
        background-color: #5B2E44;
        border: none;
        color: white;
        padding: 0.5em 1em;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 12px;
        font-family: "Lucida Console", Monaco, monospace;
        border-radius: 8px;
      }
    `;
  }

  render() {
    function happui() {
      return html`<happ-ui sentir="${Math.random()}" comprendre="${Math.random()}" connaitre="${Math.random()}"></happ-ui>`
    }
    function happui8x5() {
      let htmlArr = []
      for (let i = 0; i < 5; ++i) {
        htmlArr.push(html`<div>`)
        for (let j = 0; j < 8; ++j) {
          htmlArr.push(happui())
        }
        htmlArr.push(html`</div>`)
      };
      return htmlArr;
    }
    return html`
      <div>
        <button @click=${this._randomize}>randomize</button>
        <p></p>
      </div>
      ${happui8x5()}
    `;
  }

  _randomize() {
    this.requestUpdate();
  }
}
