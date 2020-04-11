// Import the LitElement base class and html helper function
import { LitElement, html } from 'lit-element';

class ParentElement extends LitElement {

    constructor() {
        super();
    }

    render() {
        return html`<div class="parent">before<slot></slot>after
        
        <nested-element>nested-in-parent</nested-element>
        <nested-element>nested-in-parent</nested-element>
        <nested-element>nested-in-parent</nested-element>
        </div>`;
    }
}

customElements.define('parent-element', ParentElement);

class NestedElement extends LitElement {

    constructor() {
        super();
    }

    render() {
        return html`<div class="nested">child
        <svg height="20" width="20"><circle cx="10" cy="10" r="8" stroke="black" stroke-width="2" fill="green" /> </svg>
        </div>`;
    }
}

customElements.define('nested-element', NestedElement);
