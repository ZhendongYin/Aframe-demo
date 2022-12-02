function getDirection(camera, speed) {
    let myScene = document.getElementById('myScene');
    let myCamera = document.getElementById('avatar');
    var y = camera.getAttribute('rotation').y + 90;
    var x = camera.getAttribute('rotation').x;
    var moveX = Math.cos(y / 360 * (Math.PI * 2));
    var moveY = Math.sin(x / 360 * (Math.PI * 2));
    var moveZ = Math.sin(y / 360 * (Math.PI * 2));
    var moveXRatio = (Math.pow(moveX, 2)) / (Math.pow(moveX, 2) + Math.pow(moveZ, 2));
    var moveZRatio = (Math.pow(moveZ, 2)) / (Math.pow(moveX, 2) + Math.pow(moveZ, 2));
    if (moveX <= 0) {
        moveX = -Math.sqrt((1 - Math.pow(moveY, 2)) * moveXRatio);
    } else {
        moveX = Math.sqrt((1 - Math.pow(moveY, 2)) * moveXRatio);
    }
    if (moveZ <= 0) {
        moveZ = -Math.sqrt((1 - Math.pow(moveY, 2)) * moveZRatio);
    } else {
        moveZ = Math.sqrt((1 - Math.pow(moveY, 2)) * moveZRatio);
    }
    return { x: moveX * speed, y: moveY * speed, z: -moveZ * speed };
}


const shoot = () => {
    let myCamera = document.getElementById('avatar');
    let myScene = document.getElementById('myScene');
    const bullet = document.createElement('a-box');
    let pos = myCamera.getAttribute("position");
    bullet.setAttribute("position", pos);
    bullet.setAttribute("ammo-body", "type:kinematic");
    bullet.setAttribute("ammo-shape", "type: sphere;");
    bullet.setAttribute("class", 'ball')
    bullet.setAttribute("velocity", getDirection(myCamera, 30));
    bullet.setAttribute("gltf-model", "#ball");
    bullet.setAttribute("radius", 100000);
    bullet.setAttribute("scale", "0.5 0.5 0.5");
    myScene.appendChild(bullet);
};


document.onkeydown = event => {
    if (event.which == 32) {
        shoot();
    }
};
let count = 0;
AFRAME.registerComponent('hit', {
    init: function() {
        var el = this.el;
        console.log(el);
        el.addEventListener("collideend", function(event) {
            let myScene = document.getElementById('myScene');
            if (event.detail.targetEl.getAttribute('class') === 'ball') {
                myScene.removeChild(el);
                myScene.removeChild(event.detail.targetEl);
                count += 1;
                var a = myScene.querySelector("#hud");
                a.setAttribute("text", "width:3; value: " + count)
                console.log(count);
                if (count >= 3) {
                    location.href = "DanqiuFu.html";
                }
            }
        });
    }
})