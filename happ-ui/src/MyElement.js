// https://lit-element.polymer-project.org/guide/templates

import { LitElement, html, customElement, property } from 'lit-element';

export class MyElement extends LitElement {
  constructor () {
    super()

    this.foo = "bar-bar"
    this.mood = "gloomy"
  }

  //static get properties() { return { mood: String }} // alternative?

  // Implement `render` to define a template for your element.
  render(){
    /**
     * Return a lit-html `TemplateResult`.
     *
     * To create a `TemplateResult`, tag a JavaScript template literal
     * with the `html` helper function.
     */
    return html`
      <div>
        <p>A paragraph: ${this.foo}  ${this.mood} </p>
      </div>
    `;
  }
}
//customElements.define('my-element', MyElement);
