import { HappUi } from './src/HappUi.js';
export { HappUi };

import { Slider } from './src/HappUiSlider.js';

window.customElements.define('happ-ui-slider', Slider);
window.customElements.define('happ-ui', HappUi);
