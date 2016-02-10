// MAIN Control FILE
// control.ts 
// Derek Wong
// Last Modified By: Derek Wong
// Date Last Modified: 2/10/2016
// Defines the control
/*Revision History
  2/10/2016- Initialized Control
*/
var objects;
(function (objects) {
    var Control = (function () {
        //Instantiates the control class
        function Control(rotateXAxis, rotateYAxis, rotateZAxis) {
            this.rotateXAxis = rotateXAxis;
            this.rotateYAxis = rotateYAxis;
            this.rotateZAxis = rotateZAxis;
        }
        return Control;
    })();
    objects.Control = Control;
})(objects || (objects = {}));

//# sourceMappingURL=control.js.map
