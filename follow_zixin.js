// this is a simple component to get a static object to follow another object, usually the avatar
//  call it as follow="target:#avbox; speed:1"

AFRAME.registerComponent('follow', {
    schema: {
        target: { type: 'selector' }, // entity to follow
        speed: { type: 'number' }, // speed to follow at
        url: { type: 'string' }, // url to go to when target is hit
        dist: { type: 'number', default: 5 } // distance where following starts
    },


    init: function() {
        // here we just initialize the directionVec3 variable
        this.directionVec3 = new THREE.Vector3();
        console.log("initializing the follow component")
        this.avatar = document.querySelector("#avatar")
        console.dir(this.avatar)
        this.collisionHandler = (e) => {
            console.log('just collided with something')
            console.dir(e.detail)
            component.otherBody = e.detail.body
            document.alert('collided')
        }
        this.el.addEventListener('collide', this.collisionHandler);
    },






    tick: function(time, timeDelta) {
        var directionVec3 = this.directionVec3;


        // Grab position vectors (THREE.Vector3) from the entities' three.js objects.
        var targetPosition = this.data.target.object3D.position; // avatar's location
        var currentPosition = this.el.object3D.position; // the following objects location
            //alert(targetPosition.x+" "+targetPosition.y+" "+targetPosition.z+"\n"+currentPosition.x+" "+currentPosition.y+" "+currentPosition.z)

        
        // Subtract the vectors to get the direction the entity should head in.
        directionVec3.copy(targetPosition).sub(currentPosition);

        // Calculate the distance.
        var distance = directionVec3.length();

        var x = targetPosition.x;
        var y = targetPosition.y;
        var z = targetPosition.z;

        //alert(y)
        // If the target is close, then end the game!
        if (Math.abs(z+50) <= 0.5 && x >= -33 && x <= -27 && this.data.url) {
            //alert(targetPosition.x+" "+targetPosition.y+" "+targetPosition.z+"\n"+currentPosition.x+" "+currentPosition.y+" "+currentPosition.z)
            window.location.href = "gameover.html";
        } else if (y < -5 || (x <= -20 && x >= -50 && z <= 0 && z >= -30 && y < 5.05) || (x <= 30 && x >= -10 && z <= -20 && z >= -30 && y < 5.05)) {
            window.location.href = "ZixinZhang.html";
        } else if (distance > this.data.dist) {
            return
        }

        // Scale the direction vector's magnitude down to 1...
        directionVec3['x'] /= distance
        directionVec3['y'] /= distance
        directionVec3['z'] /= distance
            // 

        // calculate a factor so the movement is independent of refresh rate or computer speed
        var factor = this.data.speed * (timeDelta / 1000);

        directionVec3['x'] *= factor
        directionVec3['y'] *= factor
        directionVec3['z'] *= factor


        // here we move the following object toward the target
        if (this.el.object3D) {
            let d = directionVec3
            let p = this.el.object3D.position
            this.el.object3D.position.set(p.x + d.x, p.y + d.y, p.z + d.z)
        }
    }
});