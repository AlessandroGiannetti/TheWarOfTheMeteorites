if (WEBGL.isWebGLAvailable() === false) {
    document.body.appendChild(WEBGL.getWebGLErrorMessage());
}

// FPS UI
(function () {
    var script = document.createElement('script');
    script.onload = function () {
        var stats = new Stats();
        document.body.appendChild(stats.dom);
        requestAnimationFrame(function loop() {
            stats.update();
            requestAnimationFrame(loop)
        });
    };
    script.src = '//mrdoob.github.io/stats.js/build/stats.min.js';
    document.head.appendChild(script);
})();
//============================================================================

//flag bullet swapping dx and sx
var sx = true;
var start = false;
var shooting = false;
var typeStartShip = 0;
var camera, controls, scene, renderer;
var width = window.innerWidth;
var height = window.innerHeight;
var lightBullet;
// mouse position
var mouseX = 0;
var mouseY = 0;
// stars array
var stars = [];
// Bullets array
var bullets = [];


function startGame() {
    start = !start;
    if (start === true) {
        document.getElementById("mainMenu").style.display = "none";
        document.body.style.cursor = "none";
    } else {
        document.getElementById("mainMenu").style.display = "block";
        document.body.style.cursor = "auto";
    }
    controls.reset();
    controls.enabled = false;
    switch (typeStartShip) {
        case 0:
            camera.position.z = 5;
            break;
        case 1:
            camera.position.z = 10;
            break;
        case 2:
            camera.position.z = 15;
            break;
    }
}

function returnMenu() {
    start = false;
    scene.remove(spaceShip);
    loadModel("star-wars-vader-tie-fighter");
    camera.position.z = 5;
    controls.enabled = true;
    document.getElementById("secondMenu").style.display = "none";
    document.getElementById("mainMenu").style.display = "block";
    document.body.style.cursor = "block";

    // button spaceShip underline
    var elem = document.getElementsByClassName("ship");
    for (var i = 0; i < elem.length; i++)
        elem[i].style.textDecoration = "none";
    document.getElementById("0").style.textDecoration = "underline";
    // ==========================
}

function switchShip(type) {
    // button spaceShip underline
    var elem = document.getElementsByClassName("ship");
    for (var i = 0; i < elem.length; i++)
        elem[i].style.textDecoration = "none";
    document.getElementById(type).style.textDecoration = "underline";
    // ==========================

    typeStartShip = type;
    scene.remove(spaceShip);
    if (type === 0) {
        //loadModelGLTF("interceptor-tie");
        loadModel("star-wars-vader-tie-fighter");
        camera.position.z = 5;
    }
    if (type === 1) {
        //loadModelGLTF("x-wing");
        loadModel("x-wing");
        camera.position.z = 10;
    }
    if (type === 2) {
        loadModel("star-wars-arc-170-pbr");
        camera.position.z = 15;
    }
    lightBullet = new THREE.PointLight(typeStartShip === 0 ? 0xff0000 : 0x00ff00, 0.5, 0, 2);
}

//=============================================================================

scene = new THREE.Scene();

//renderer
renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);

// event listener
window.addEventListener('resize', function () {
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});
document.addEventListener("keydown", function (event) {
    var keyCode = event.which;
    if (keyCode === 32) {
        turbo = true;
    }
    if (keyCode === 27) {
        if (start === true) {
            pause = !pause;
            if (pause === true) {
                document.getElementById("secondMenu").style.display = "block";
                document.body.style.cursor = "auto";
            } else {
                document.getElementById("secondMenu").style.display = "none";
                document.body.style.cursor = "none";
            }
        }
    }
}, false);
document.addEventListener("keyup", function (event) {
    var keyCode = event.which;
    if (keyCode === 32) {
        turbo = false;
    }
}, false);
document.addEventListener('mousemove', function (e) {
    mouseX = e.clientX - width / 2;
    mouseY = e.clientY - height / 2
}, false);
document.addEventListener('mousedown', function () {
    shooting = true;
}, false);
document.addEventListener('mouseup', function () {
    shooting = false;
}, false);
//===================================================================================================

controls = new THREE.OrbitControls(camera, renderer.domElement);


function starForge() {
    // The loop will move from z position of -1000 to z position 1000, adding a random particle at each position.
    for (var z = -1000; z < 1000; z += 5) {
        // Make a sphere (exactly the same as before).
        var geometry = new THREE.SphereGeometry(0.5, 32, 32);
        var material = new THREE.MeshPhongMaterial({color: 0xffffff});
        var sphere = new THREE.Mesh(geometry, material);
        // This time we give the sphere random x and y positions between -500 and 500
        sphere.position.x = Math.random() * 1000 - 500;
        sphere.position.y = Math.random() * 1000 - 500;
        // Then set the z position to where it is in the loop (distance of camera)
        sphere.position.z = z;
        // scale it up a bit
        sphere.scale.x = sphere.scale.y = 2;
        //add the sphere to the scene
        scene.add(sphere);
        //finally push it to the stars array
        stars.push(sphere);
    }
}

starForge();

var turbo = false;
var spaceShip = null;
var modelLoaded = false;
var pause = false;

//model
var objectLoader = new THREE.ObjectLoader();

function loadModel(name) {
    // BEGIN Clara.io JSON loader code
    objectLoader.load("models/" + name + ".json", function (obj) {
            scene.add(obj);
            spaceShip = obj;
            if (modelLoaded) {
                switch (typeStartShip) {
                    case 0:
                        spaceShip.position.y = -1;
                        spaceShip.position.x = -0.4;
                        break;
                    case 2:
                        spaceShip.position.y = -4.5;
                        spaceShip.position.x = -0.4;
                        break;
                }
            }
        },
        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            if ((xhr.loaded / xhr.total * 100) === 100) {
                modelLoaded = true;
            }
        },
        // called when loading has errors
        function (error) {
            console.log('An error happened' + error);
        });
    // END Clara.io JSON loader code
}

loadModel("star-wars-vader-tie-fighter");

// planet creation
var loader = new THREE.TextureLoader();
loader.load('./models/texture/sun.jpg', function (texture) {
    var geometry = new THREE.SphereBufferGeometry(240, 32, 32);
    var material = new THREE.MeshBasicMaterial({map: texture, overdraw: 0.5});
    var sphere = new THREE.Mesh(geometry, material);

    sphere.position.set(534, 48, -766);
    var light1 = new THREE.PointLight(0xfe8c21, 4, 0, 2);
    light1.position.set(534, 200, -766);
    light1.add(sphere);
    scene.add(light1);
});
loader.load('./models/texture/moon.jpg', function (texture) {
    var geometry = new THREE.SphereBufferGeometry(140, 32, 32);
    var material = new THREE.MeshPhongMaterial({map: texture, overdraw: 0.5, reflectivity: 0.4});
    var moon = new THREE.Mesh(geometry, material);

    moon.position.set(-1700, -90, -2183);
    scene.add(moon);
});
// =================================================================================================

camera.position.z = 5;
//game Logic

lightBullet = new THREE.PointLight(typeStartShip === 0 ? 0xff0000 : 0x00ff00, 0.5, 30, 2);

function update() {
    if (start === true && pause === false) {
        if (modelLoaded === true) {
            //camera.position.x = mouseX * 0.002;
            //camera.position.y = (-mouseY) * 0.008;
            spaceShip.position.x = mouseX * 0.008;
            spaceShip.position.y = (-mouseY) * 0.01 + (typeStartShip === 0 ? 0 : -5);
            spaceShip.rotation.z = mouseX * (typeStartShip === 0 ? 0.0007 : 0.00001);

            if (turbo === true) {
                if ((camera.position.z - spaceShip.position.z) < 8)
                    camera.position.z += 0.2;
            } else {
                if ((camera.position.z - spaceShip.position.z) > 5 && typeStartShip === 0)
                    camera.position.z -= 0.2;
            }

            // go through bullets array and update position
            // remove bullets when appropriate
            for (var index = 0; index < bullets.length; index += 1) {
                if (bullets[index] === undefined) continue;
                if (bullets[index].alive == false) {
                    bullets.splice(index, 1);
                    continue;
                }
                bullets[index].position.add(bullets[index].velocity);
            }
            if (shooting === true) {
                var geometry = new THREE.SphereBufferGeometry(0.05, 8, 8);
                var material;
                material = new THREE.MeshBasicMaterial({
                    color: (typeStartShip === 0 ? 0xff0000 : 0x00ff00),
                    refractionRatio: 0.98,
                    reflectivity: 0.9
                });
                var bullet = new THREE.Mesh(geometry, material);

                // position the bullet to come from the player's weapon
                if (sx === true) {
                    bullet.position.set(spaceShip.position.x + (typeStartShip === 0 ? 0.17 : -13.7), spaceShip.position.y + 0.57, spaceShip.position.z - (typeStartShip === 0 ? 0.8 : 9));
                    lightBullet.position.set(spaceShip.position.x + (typeStartShip === 0 ? 0.1 : -13.7), spaceShip.position.y + 0.57, spaceShip.position.z - (typeStartShip === 0 ? 0.7 : 9));
                } else {
                    bullet.position.set(spaceShip.position.x + (typeStartShip === 0 ? 0.45 : 13.7), spaceShip.position.y + 0.57, -(typeStartShip === 0 ? 0.8 : 9));
                    lightBullet.position.set(spaceShip.position.x + (typeStartShip === 0 ? 0.6 : 13.7), spaceShip.position.y + 0.57, -(typeStartShip === 0 ? 0.7 : 9));
                }

                sx = !sx;

                // set the velocity of the bullet
                bullet.velocity = new THREE.Vector3(
                    -Math.sin(spaceShip.rotation.y),
                    0,
                    -Math.cos(spaceShip.rotation.y)
                );
                // after 1000ms, set alive to false and remove from scene
                // setting alive to false flags our update code to remove
                // the bullet from the bullets array
                bullet.alive = true;
                setTimeout(function () {
                    bullet.alive = false;
                    scene.remove(bullet);
                }, 2000);

                // add to scene, array, and set the delay to 10 frames
                scene.add(bullet);
                bullets.push(bullet);
                scene.add(lightBullet);
            } else {
                scene.remove(lightBullet);
            }

            // loop through each star
            for (var i = 0; i < stars.length; i++) {
                star = stars[i];
                star.position.z += i / 10;
                if (turbo === true)
                    star.position.z += i / 10;

                // if the particle is too close move it to the back
                if (star.position.z > 1000) star.position.z = -1000;
            }
        }
    } else if (start === false) {
        controls.autoRotate = true;
        controls.update();
    }
}

// draw Scene
function render() {
    renderer.render(scene, camera);
}

// run game loop (update, render, repeat)
function GameLoop() {
    requestAnimationFrame(GameLoop);
    update();
    render();
}

// creation of the stars
GameLoop();