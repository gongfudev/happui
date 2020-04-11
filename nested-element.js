import { LitElement, html } from 'lit-element';


export class NestedElement extends LitElement {

    constructor() {
        super();
    }

    render() {
        return html`<div class="nested">nested-element
        <svg height="20" width="20"><circle cx="10" cy="10" r="8" stroke="black" stroke-width="2" fill="green" /> </svg>
        /nested-element
        </div>`;
    }
}

customElements.define('nested-element', NestedElement);
