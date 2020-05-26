import { html, svg, css, LitElement } from 'lit-element';

function happUiLogoDimensions(outerRadius) {
  const R = outerRadius;    // radius outer circle
  const inc = R / 10       // branch step
  const L1 = inc / 2        // branch line thickness
  const L2 = inc * 0.75     // lollipop line thickness
  const lolor = inc * 1.125 // lollipop radius
  const dbp = inc * 6.5     // default branch position
  const boxwh = R * 2      // box width and height
  const dimensions = {
    R: R,
    inc: inc,
    L1: L1,
    L2: L2,
    lolor: lolor,
    dbp: dbp,
    boxwh: boxwh
  }
  return dimensions;
}

// from http://www.petercollingridge.co.uk/tutorials/svg/interactive/dragging/
// and https://github.com/petercollingridge/code-for-blog/blob/36ba73c7b763022731a72813249cdc56e7dba8c0/svg-interaction/draggable/draggable_groups.svg?short_path=be4270d

function toRadians(degrees) {
  return degrees * Math.PI / 180
}

function displacement(pt1, pt2) {
  return {x: pt2.x - pt1.x, y: pt2.y - pt1.y}
}

function projection(pt, angledeg) {
  let a = toRadians(angledeg)
  return pt.x * Math.cos(a) + pt.y * Math.sin(a)
}

// Utility functions
function clamp( val, min, max) {
  return val <= min ? min : val >= max ? max : val;
}

// wheel4 matrix utilites

let MatrixProd = (A, B) =>
  A.map((row, i) =>
    B[0].map((_, j) =>
      row.reduce((acc, _, n) =>
        acc + A[i][n] * B[n][j], 0
      )
    )
  )

// return the mean value of a vector of numbers
function vectorMean(vector) {
  let n = vector.length
  let total = vector.reduce((acc, item) => acc + item)
  return total / n
}

// return the vector normalized so that max element <= norm
function vectorNorm(vector, norm) {
  let max = vector.reduce((acc, item) => acc < item ? item : acc)
  if (max > norm) {
    let factor = norm / max
    return vector.map((item) => item * factor)
  } else {
    return vector
  }
}

// return the max value of a vector of positive numbers
function vectorMax(vector) {
  return vector.reduce((acc, item) => acc < item ? item : acc)
}

// return the scalar product of vector by factor
function vectorMult(vector, factor) {
  return vector.map((item) => item * factor)
}

// return the weighted mean color from colorTriplet
function colorWeightedMean(weights, colorTriplet) {
  // weights: vecttor like [1, 1, 0]
  // colorTriplet: matrix like [ [ 255, 255, 0 ], [ 0, 255, 0 ], [ 0, 0, 255 ] ]
  // result: vector like [ 85, 170, 0 ]
  // let matrixWeights = MatrixProd([[1/3]], [weights])
  let matrixWeights = MatrixProd([[1.0]], [weights])
  return MatrixProd(matrixWeights, colorTriplet)[0]
}


// Web Component definition
export class HappUiExp extends LitElement {
  static get styles() {
    return css`
      :host {
        --happ-ui-text-color: #000;

        display: inline-block;
        padding: 0; margin: 0;
        color: var(--happ-ui-text-color);
      }
    `;
  }

  static get properties() {
    return {
      title: { type: String },
      sentir: { type: Number }, // Value in between 0.0 … 1.0
      connaitre: { type: Number }, // idem
      comprendre: { type: Number }, // idem
      variant: { String },
    };
  }

  constructor() {
    super();

    // Observed properties
    this.title = 'DragMe';
    this._sentir = 0.65;
    this._connaitre = 0.65;
    this._comprendre = 0.65;

    // Private properties
    this.__max = 0.90; // Maximum value of the properties { sentir, connaitre, comprendre }
    this.__min = 0.10; // Minimum value … idem …

    this._sentir_angle = 270;
    this._connaitre_angle = 30;
    this._comprendre_angle = 150;

    // wheel variants

    this._variant = "wheel1";
    this._variants = ["wheel1", "wheel2", "wheel3a", "wheel3b", "wheel4"];

    // dragging variables
    this._pistil_names = {'p0:sprout': 'sentir', 'p1:sprout': 'connaitre', 'p2:sprout': 'comprendre'}
    this._dragged_pistil_name = undefined
    this._offset = undefined
  }

  get variant() { return this._variant; }
  set variant(val) {
    let oldVal = this._variant;
    if (this._variants.includes(val)) {
      this._variant = val;
      this.requestUpdate( 'variant', oldVal);
    }
  }

  get sentir() { return this._sentir; }
  set sentir( val) {
    let oldVal = this._sentir;
    this._sentir = clamp( val, this.__min, this.__max);
    this.requestUpdate( 'sentir', oldVal);
  }

  get connaitre() { return this._connaitre; }
  set connaitre( val) {
    let oldVal = this._connaitre;
    this._connaitre = clamp( val, this.__min, this.__max);
    this.requestUpdate( 'connaitre', oldVal);
  }

  get comprendre() { return this._comprendre; }
  set comprendre( val) {
    let oldVal = this._comprendre;
    this._comprendre = clamp( val, this.__min, this.__max);
    this.requestUpdate( 'comprendre', oldVal);
  }

  firstUpdated(changedProperties) {
    console.table(happUiLogoDimensions(100))
  }

  _getMousePosition(evt) {
    let svg = evt.currentTarget
    let CTM = svg.getScreenCTM();
    let pt = svg.createSVGPoint();
    pt.x = evt.clientX; pt.y = evt.clientY;
    pt = pt.matrixTransform(CTM.inverse());
    return pt
  }

  _mousedown(evt) {
    //console.log('_mousedown', evt.target.id)
    let pistil_name = this._pistil_names[evt.target.id]
    if (pistil_name) {
      //console.log('_mousedown', evt.target.id)
      let mousePos = this._getMousePosition(evt)
      this._offset = mousePos
      this._dragged_pistil_name = pistil_name
    }
  }

  _mousemove(evt) {
    if (this._dragged_pistil_name) {
      let pistil_name = this._dragged_pistil_name
      //console.log('_mousemove move', evt.target.id)
      let mousePos = this._getMousePosition(evt)
      let displ = displacement(this._offset, mousePos)
      let proj = projection(displ, this[`_${pistil_name}_angle`])
      this._offset = mousePos
      const sprout_length = 47.0
      let new_length = this[pistil_name] + proj / sprout_length
      this[pistil_name] = new_length
      if (this[pistil_name] != new_length) {
        this._dragged_pistil_name = undefined
      }
    }
  }

  _mouseup(event) {
    //console.log('_mouseup', event)
    this._dragged_pistil_name = undefined
  }

  _mouseleave(event) {
    //console.log('_mouseleave', event)
    this._dragged_pistil_name = undefined
  }

  wheel1() {
    return svg`
      <rect_x x='0' y='0' width='200' height='200' fill= 'lightgray' />
      <defs>
        <filter id="blur" color-interpolation-filters="linear" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="9"/>
        </filter>
        <mask id="circle">
          <circle cx="50" cy="50" r="50" fill="white"/>
        </mask>
      </defs>

      <g id="background-circle" mask="url(#circle)" filter="url(#blur)" >
        <rect x="-10" width="110" height="110" fill="hsl(240,100%,${this._connaitre*52}%)"/> <!-- blue -->
        <rect x="50" width="60" height="110" fill="hsl(60,100%,${this._sentir*52}%)"/> <!-- yellow -->
        <polygon points="50,50, 60,110, 40,110" fill="hsl(150,100%,${(this._connaitre+this._sentir)*26}%)"/> <!-- #0f8 / green -->
        <polygon points="0,0, 100,0, 100,20, 50,50, 0,20" fill="hsl(0,100%,${this._comprendre*52}%)"/> <!-- red -->
        <polygon points="0,10, 50,50, 0,30" fill="hsl(300,100%,${(this._connaitre+this._comprendre)*26}%)"/> <!-- #f0f / magenta -->
        <polygon points="100,10, 100,30, 50,50" fill="hsl(30,100%,${(this._comprendre+this._sentir)*26}%)"/> <!-- #f80 / orange -->
      </g>
    `;
  } 

  wheel2() {
    return svg`
    <style>

      .stop1 { stop-color: #da00ff; stop-opacity: 15%; }
      .stop2 { stop-color: #0007d4; stop-opacity: 100%; }

      .stop3 { stop-color: #00a2ff; stop-opacity: 15%; }
      .stop4 { stop-color: #00a500; stop-opacity: 100%; }

      .stop5 { stop-color: #cd0000; stop-opacity: 15%; }
      .stop6 { stop-color: #ff9000; stop-opacity: 100%; }

      .sliders { margin: auto; }
    </style>
    <defs>
      <linearGradient id="gradientSEN">
        <stop class="stop1" offset="0%"/>
        <stop class="stop2" offset="75%"/>
      </linearGradient>

      <linearGradient id="gradientCON">
        <stop class="stop3" offset="0%"/>
        <stop class="stop4" offset="75%"/>
      </linearGradient>

      <linearGradient id="gradientCOM">
        <stop class="stop5" offset="0%"/>
        <stop class="stop6" offset="75%"/>
      </linearGradient>
      <filter id="blur" color-interpolation-filters="linear" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="9"/>
      </filter>
      <mask id="circle">
        <circle cx="50" cy="50" r="50" fill="white"/>
      </mask>
    </defs>
    <g id="background" mask="url(#circle)" filter="url(#blur)" > <!--   -->
      <rect x="0" y="0" width="100" height="100" fill="none" stroke="none" />
      <g id="backSEN" transform="translate(50 50) rotate(270 0 0)">
        <circle id="backSEN:color" fill="url(#gradientSEN)"
          cx="${30 - this._sentir * 5}" cy="0"
          r="${10 + this._sentir * 50}" />
      </g>
      <g id="backCON" transform="translate(50 50) rotate(30 0 0)">
        <circle id="backCON:color" fill="url(#gradientCON)"
          cx="${30 - this._connaitre * 5}" cy="0"
          r="${10 + this._connaitre * 50}" />
      </g>
      <g id="backCOM" transform="translate(50 50) rotate(150 0 0)">
        <circle id="backCOM:color" fill="url(#gradientCOM)"
          cx="${30 - this._comprendre * 5}" cy="0"
          r="${10 + this._comprendre * 50}" />
      </g>
    </g>
    `;
  }
  
  wheel3a() {
    return svg`
    <style>
      .mbm { mix-blend-mode: screen; }
    </style>

    <defs>
      <radialGradient id="RadialGradient-R1" fx="75%" fy="50%" fr="17%" cx="75%" cy="50%" r="70%">
        <stop offset="0%" style='stop-color: red; stop-opacity: 0.0;' />
        <stop offset="100%" style='stop-color: red; stop-opacity: ${this._connaitre};' />
      </radialGradient>
      <radialGradient id="RadialGradient-G1" fx="75%" fy="50%" fr="17%" cx="75%" cy="50%" r="70%">
        <stop offset="0%" style='stop-color: lime; stop-opacity: 0.0;' />
        <stop offset="100%" style='stop-color: lime; stop-opacity: ${this._comprendre};' />
      </radialGradient>
      <radialGradient id="RadialGradient-B1" fx="75%" fy="50%" fr="17%" cx="75%" cy="50%" r="70%">
        <stop offset="0%" style='stop-color: blue; stop-opacity: 0.0;' />
        <stop offset="100%" style='stop-color: blue; stop-opacity: ${this._sentir};' />
      </radialGradient>
    </defs>

    <g  transform="translate(50, 50)">
      <circle id="background"  cx="0" cy="0" r="50" style="background: black; " />
      <circle class="mbm" cx="0" cy="0" r="50" fill="url(#RadialGradient-R1)" transform='rotate(${this._connaitre_angle})' />
      <circle class="mbm" cx="0" cy="0" r="50" fill="url(#RadialGradient-G1)" transform='rotate(${this._comprendre_angle})' />
      <circle class="mbm" cx="0" cy="0" r="50" fill="url(#RadialGradient-B1)" transform='rotate(${this._sentir_angle})' />
    </g>
    `;
  }

  wheel3b() {
    return svg`
    <style>
      .mbm { mix-blend-mode: screen; }
    </style>

    <defs>
      <radialGradient id="RadialGradient-R1" fx="${45 * (1 + this._connaitre)}%" fy="50%" fr="10%" cx="50%" cy="50%" r="50%">
        <stop offset="0%" style='stop-color: hsl(0,${45 * (1 + this._connaitre)}%,50%); ' />
        <stop offset="100%" style='stop-color: hsl(0,10%,10%); ' />
      </radialGradient>
      <radialGradient id="RadialGradient-G1" fx="${45 * (1 + this._comprendre)}%" fy="50%" fr="10%" cx="50%" cy="50%" r="50%">
        <stop offset="0%" style='stop-color: hsl(120,${45 * (1 + this._comprendre)}%,50%); ' />
        <stop offset="100%" style='stop-color: hsl(120,10%,10%); ' />
      </radialGradient>
      <radialGradient id="RadialGradient-B1" fx="${45 * (1 + this._sentir)}%" fy="50%" fr="10%" cx="50%" cy="50%" r="50%">
        <stop offset="0%" style='stop-color: hsl(240,${45 * (1 + this._sentir)}%,50%); ' />
        <stop offset="100%" style='stop-color: hsl(240,10%,10%); ' />
      </radialGradient>
    </defs>

    <g transform="translate(50, 50)">
      <circle id="background"  cx="0" cy="0" r="50" style="background: black; " />
      <circle class="mbm" cx="0" cy="0" r="50" fill="url(#RadialGradient-R1)" transform='rotate(${this._connaitre_angle})' />
      <circle class="mbm" cx="0" cy="0" r="50" fill="url(#RadialGradient-G1)" transform='rotate(${this._comprendre_angle})' />
      <circle class="mbm" cx="0" cy="0" r="50" fill="url(#RadialGradient-B1)" transform='rotate(${this._sentir_angle})' />
    </g>
    `;
  }

  wheel4() {
    const colorTriplet = [ [ 255, 255, 0 ], [ 0, 255, 255 ], [ 255, 0, 255 ] ]
    // find normalization factor
    const colorTripletVector = colorWeightedMean([1,1,1], colorTriplet)
    const colorTripletVectorMax = vectorMax(colorTripletVector)
    const factor = 255 / colorTripletVectorMax
    // compute current color
    const weights = [ this.sentir, this.connaitre, this.comprendre ]
    const colorVector = colorWeightedMean(weights, colorTriplet)
    const colorVectorNorm = vectorMult(colorVector, factor)
    const fillColor = `rgb(${colorVectorNorm[0]},${colorVectorNorm[1]},${colorVectorNorm[2]})`
    // console.log(colorVector)
    // console.log(colorVectorNorm)
    // console.log(fillColor)
    const flowerScale = vectorMean(weights)
    return svg`
    <g  transform="translate(50, 50)">
      <circle cx="0" cy="0" r="50" fill="${fillColor}" transform='rotate(0)' />
    </g>

    <style>
      .pink { fill: #e630bc }
      .white { fill: #ffffff }
    </style>
  
    <defs>
      <path id="1p" stroke="#333333" stroke-width="1" d="M0,0 q50,-30 100,0 q-50,30 -100,0" />
      <path id="2p" stroke="#333333" stroke-width="1" d="M0,0 q50,-25 100,0 q-50,25 -100,0 q-50,25 -100,0 q50,-25 100,0" />
      <g id='6p'>
        <use href='#2p' transform='rotate(0)' />
        <use href='#2p' transform='rotate(60)' />
        <use href='#2p' transform='rotate(120)' />
      </g>
    </defs>
    <g id='flower' class='white' transform='translate(50, 50) scale(${flowerScale * 0.6})'>
      <use href='#6p' transform='scale(1.0)' />
      <use href='#6p' transform='rotate(30) scale(0.5)' />
    </g>
    `;
  }

  wheel() {
    if (this.variant == 'wheel1') {
      return this.wheel1()
    } else if (this.variant == 'wheel2') {
      return this.wheel2()
    } else if (this.variant == 'wheel3a') {
      return this.wheel3a()    
    } else if (this.variant == 'wheel3b') {
      return this.wheel3b()
    } else if (this.variant == 'wheel4') {
      return this.wheel4()
    } else {
      return svg``;
    }
  }

  render() {
    const dims = happUiLogoDimensions(50)
    return html`<svg viewBox="0 0 100 100"
        aria-label="${this.title}"
        @mousedown="${this._mousedown}"
        @mousemove="${this._mousemove}"
        @mouseup="${this._mouseup}"
        @mouseleave="${this._mouseleave}"
      >
      <title>${this.title}</title>
      <style>
        .stem { stroke: white; stroke-width: 2.5; }
        .sprout { stroke: white; stroke-width: 3.75; fill-opacity: 0.0; }
      </style>

      ${this.wheel()} 
      <g id="pistils">
        <g id="p0" transform="translate(50 50) rotate(${this._sentir_angle} 0 0)">
          <title>sentir</title>
          <line id="p0:stem" class="stem" x1="0" y1="0" x2="${this._sentir * 47 - 5}" y2="0" />
          <circle id="p0:sprout" class="sprout" cx="${this._sentir * 47}" cy="0" r="5.625" />
        </g>
        <g id="p1" transform="translate(50 50) rotate(${this._connaitre_angle} 0 0)">
          <title>connaitre</title>
          <line id="p1:stem" class="stem" x1="0" y1="0" x2="${this._connaitre * 47 - 5}" y2="0" />
          <circle id="p1:sprout" class="sprout" cx="${this._connaitre * 47}" cy="0" r="5.625" />
        </g>
        <g id="p2" transform="translate(50 50) rotate(${this._comprendre_angle} 0 0)">
          <title>comprendre</title>
          <line id="p2:stem" class="stem" x1="0" y1="0" x2="${this._comprendre * 47 - 5}" y2="0" />
          <circle id="p2:sprout" class="sprout" cx="${this._comprendre * 47}" cy="0" r="5.625" />
        </g>
      </g>
    </svg>`;
  }
}
