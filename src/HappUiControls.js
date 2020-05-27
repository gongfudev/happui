// Mixin definition
export function HappUiControls( superclass) {
  return class extends superclass {

    constructor() {
      super();

      // dragging and click variables
      this._pistil_from_stem = {'p0:stem': 'sentir', 'p1:stem': 'connaitre', 'p2:stem': 'comprendre'};
      this._pistil_from_sprout = {'p0:sprout': 'sentir', 'p1:sprout': 'connaitre', 'p2:sprout': 'comprendre'};
      this._dragged_pistil = undefined;
      this._offset = undefined;
      this._move_count = 0;
    }

    happUiLogoDimensions(outerRadius) {
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

    toRadians(degrees) {
      return degrees * Math.PI / 180
    }

    displacement(pt1, pt2) {
      return {x: pt2.x - pt1.x, y: pt2.y - pt1.y}
    }

    projection(pt, angledeg) {
      let a = this.toRadians(angledeg)
      return pt.x * Math.cos(a) + pt.y * Math.sin(a)
    }

    // Utility functions
    clamp( val, min, max) {
      return val <= min ? min : val >= max ? max : val;
    }

    // wheel4 matrix utilites

    MatrixProd( A, B) {
      A.map((row, i) =>
        B[0].map((_, j) =>
          row.reduce((acc, _, n) =>
            acc + A[i][n] * B[n][j], 0
          )
        )
      )
    }

    // return the mean value of a vector of numbers
    vectorMean(vector) {
      let n = vector.length
      let total = vector.reduce((acc, item) => acc + item)
      return total / n
    }

    // return the vector normalized so that max element <= norm
    vectorNorm(vector, norm) {
      let max = vector.reduce((acc, item) => acc < item ? item : acc)
      if (max > norm) {
        let factor = norm / max
        return vector.map((item) => item * factor)
      } else {
        return vector
      }
    }

    // return the max value of a vector of positive numbers
    vectorMax(vector) {
      return vector.reduce((acc, item) => acc < item ? item : acc)
    }

    // return the scalar product of vector by factor
    vectorMult(vector, factor) {
      return vector.map((item) => item * factor)
    }

    // return the weighted mean color from colorTriplet
    colorWeightedMean(weights, colorTriplet) {
      // weights: vecttor like [1, 1, 0]
      // colorTriplet: matrix like [ [ 255, 255, 0 ], [ 0, 255, 0 ], [ 0, 0, 255 ] ]
      // result: vector like [ 85, 170, 0 ]
      // let matrixWeights = MatrixProd([[1/3]], [weights])
      let matrixWeights = this.MatrixProd([[1.0]], [weights])
      return this.MatrixProd(matrixWeights, colorTriplet)[0]
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
      console.log('_mousedown', evt.target.id)
      let pistil_name = this._pistil_from_sprout[evt.target.id]
      if (pistil_name) {
        //console.log('_mousedown', evt.target.id)
        let mousePos = this._getMousePosition(evt)
        this._offset = mousePos
        this._dragged_pistil = pistil_name
      }
    }

    _mousemove(evt) {
      if (this._dragged_pistil) {
        let pistil_name = this._dragged_pistil
        //console.log('_mousemove move', evt.target.id)
        let mousePos = this._getMousePosition(evt)
        let displ = this.displacement(this._offset, mousePos)
        let proj = this.projection(displ, this[`_${pistil_name}_angle`])
        this._offset = mousePos
        const sprout_length = 47.0
        let new_length = this[pistil_name] + proj / sprout_length
        this[pistil_name] = new_length
        if (this[pistil_name] != new_length) {
          this._dragged_pistil = undefined
        }
        this._move_count += 1
      }
    }

    _mouseup(event) {
      console.log('_mouseup', this._move_count)
      this._dragged_pistil = undefined
      if (this._move_count < 5) {
        this._handleClick(event)
      }
      this._move_count = 0
    }

    _mouseleave(event) {
      //console.log('_mouseleave', event)
      this._dragged_pistil = undefined
    }

    _handleClick(event) {
      console.log(event.target.id)
      const sprouts = {'p0:sprout': 'sentir', 'p1:sprout': 'connaitre', 'p2:sprout': 'comprendre'}
      let pistil_from_sprout = sprouts[event.target.id]
      if (pistil_from_sprout) {
        this[pistil_from_sprout] += this.__step
        console.log('_handleClick', this[pistil_from_sprout])
      }
      const stems = {'p0:stem': 'sentir', 'p1:stem': 'connaitre', 'p2:stem': 'comprendre'}
      let pistil_from_stem = stems[event.target.id]
      if (pistil_from_stem) {
        this[pistil_from_stem] -= this.__step
        console.log('_handleClick', this[pistil_from_stem])
      }
    }
  }
}