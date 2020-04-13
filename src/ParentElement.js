import { LitElement, html } from 'lit-element';

import { NestedElement } from '../nested-element.js'

export class ParentElement extends LitElement {

    constructor() {
        super();
    }

    render() {
        return html`<div class="parent">
        <p>nested-elements</p>
        <nested-element>nested-in-parent</nested-element>
        <nested-element>nested-in-parent</nested-element>
        <nested-element>nested-in-parent</nested-element>
        <p>/nested-elements</p>
        </div>`;
    }
}
