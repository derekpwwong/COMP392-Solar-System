// MAIN Control FILE
// control.ts 
// Derek Wong
// Last Modified By: Derek Wong
// Date Last Modified: 2/10/2016
// Defines the control
/*Revision History
  2/10/2016- Initialized Control
*/
module objects {
	export class Control {
        //Control Attributes
		rotateXAxis: number;
		rotateYAxis: number;
        rotateZAxis: number;
        //Instantiates the control class
		constructor(rotateXAxis: number,rotateYAxis: number,rotateZAxis: number) {
			this.rotateXAxis = rotateXAxis;
			this.rotateYAxis = rotateYAxis;
            this.rotateZAxis = rotateZAxis;
		}
	}
}
