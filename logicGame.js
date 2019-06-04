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
var turbo = false;
var spaceShip = null;
var modelLoaded = false;
var pause = false;
var start = false;
var score = 0, health = 100, lvl = 1;
var shooting = false;
var typeSpaceShip = 0;
var camera, controls, scene, renderer;
var width = window.innerWidth;
var height = window.innerHeight;
var lightBullet;
// mouse position
var mouseX = 0, mouseY = 0;
// stars array
var stars = [];
// asteroid array
var asteroids = [];
// Bullets array
var bullets = [];

// loader variable
var loader = new THREE.TextureLoader();
var objectLoader = new THREE.ObjectLoader();

function startGame() {
    // !!important
    start = true;
    pause = false;

    // disable auto rotation and orbit controll
    controls.reset();
    controls.enabled = false;

    // reset the score
    score = 0;
    document.getElementById("score").innerHTML = "Score: " + score.toFixed(2);

    // hide the main menu
    document.getElementById("mainMenu").style.display = "none";
    // hide the cursor
    document.body.style.cursor = "none";
    // show the score (initialized)
    document.getElementById("score").style.display = "block";

    // set comera position based on the model loaded
    switch (typeSpaceShip) {
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

    // reload default spaceship
    scene.remove(spaceShip);
    loadModel("star-wars-vader-tie-fighter", 0);

    // enable auto rotation and drag control
    controls.enabled = true;

    // hide pause menu
    document.getElementById("secondMenu").style.display = "none";
    // show main menu
    document.getElementById("mainMenu").style.display = "block";
    // hide score
    document.getElementById("score").style.display = "none";
    // show the pointer
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

    typeSpaceShip = type;
    scene.remove(spaceShip);
    if (type === 0) {
        loadModel("star-wars-vader-tie-fighter", 0);
    }
    if (type === 1) {
        //loadModel("x-wing");
    }
    if (type === 2) {
        loadModel("star-wars-arc-170-pbr", 2);
    }

    // init of the light of the bullet for each spaceship
    lightBullet = new THREE.PointLight(typeSpaceShip === 0 ? 0xff0000 : 0x00ff00, 0.5, 0, 2);
}

function switchLvl(level) {
    var elem = document.getElementsByClassName("lvl");
    for (var i = 0; i < elem.length; i++)
        elem[i].style.textDecoration = "none";
    document.getElementById("lvl" + level).style.textDecoration = "underline";
    lvl = level;
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
    // space bar key
    if (keyCode === 32) {
        shooting = true;
    }
    // p key
    if (keyCode === 84) {
        turbo = true;
    }
    // escape key
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
    // p key
    if (keyCode === 84) {
        turbo = false;
    }
    // space bar key
    if (keyCode === 32) {
        shooting = false;
    }
}, false);
document.addEventListener('mousemove', function (e) {
    mouseX = e.clientX - width / 2;
    mouseY = e.clientY - height / 2
}, false);
//===================================================================================================

controls = new THREE.OrbitControls(camera, renderer.domElement);


function starForge() {
    // The loop will move from z position of -1000 to z position 1000, adding a random particle at each position.
    for (var z = -1000; z < 1000; z += 20) {
        // Make a sphere (exactly the same as before).
        var geometry = new THREE.SphereGeometry(0.5, 32, 32);
        var material = new THREE.MeshPhongMaterial({color: 0xffffff, reflectivity: 0.1});
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

function asteroidForge() {
    // The loop will move from z position of -1000 to z position 1000, adding a random particle at each position.
    var i = -5000;
    for (var z = -10000; z < -100; z += (60 / lvl)) {
        // Make a sphere (exactly the same as before).
        loader.load('./models/texture/asteroid.png', function (texture) {
            var geometry = new THREE.SphereBufferGeometry(28, Math.random() * 4 + 3, Math.random() * 6 + 5); // 3 32
            var material = new THREE.MeshPhongMaterial({map: texture, reflectivity: 0.1});
            var asteroid = new THREE.Mesh(geometry, material);

            // This time we give the sphere random x and y positions between -500 and 500
            asteroid.position.x = Math.random() * 300 - 100;
            asteroid.position.y = Math.random() * 300 - 100;
            // Then set the z position to where it is in the loop (distance of camera)
            asteroid.position.z = i;
            //add the sphere to the scene
            scene.add(asteroid);
            //finally push it to the stars array
            asteroids.push(asteroid);
            i += 30;
        });
    }
}

starForge();
asteroidForge();

//model
function loadModel(name, typeStartShip) {
    // BEGIN Clara.io JSON loader code
    objectLoader.load("models/" + name + ".json", function (obj) {
            scene.add(obj);
            spaceShip = obj;
            if (modelLoaded) {
                switch (typeStartShip) {
                    case 0:
                        spaceShip.position.y = -1;
                        spaceShip.position.x = -0.4;
                        camera.position.z = 5;
                        break;
                    case 2:
                        spaceShip.position.y = -4.5;
                        spaceShip.position.x = -0.4;
                        camera.position.z = 15;
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
loader.load('./models/texture/sun.jpg', function (texture) {
    var geometry = new THREE.SphereBufferGeometry(280, 32, 32);
    var material = new THREE.MeshBasicMaterial({map: texture});
    var sphere = new THREE.Mesh(geometry, material);

    sphere.position.set(534, 48, -966);
    var light1 = new THREE.PointLight(0xfe8c21, 3, 0, 2);
    light1.position.set(534, 200, -966);
    light1.add(sphere);
    scene.add(light1);
});
loader.load('./models/texture/moon.jpg', function (texture) {
    var geometry = new THREE.SphereBufferGeometry(210, 32, 32);
    var material = new THREE.MeshPhongMaterial({map: texture, reflectivity: 0.2});
    var moon = new THREE.Mesh(geometry, material);

    moon.position.set(-1700, -90, -2183);
    scene.add(moon);
});
// =================================================================================================

camera.position.z = 5;

//game Logic
lightBullet = new THREE.PointLight(typeSpaceShip === 0 ? 0xff0000 : 0x00ff00, 0.5, 30, 2);

function update() {

    if (start === true && pause === false) {
        if (modelLoaded === true) {
            spaceShip.position.x = mouseX * 0.008;
            spaceShip.position.y = (-mouseY) * 0.01 + (typeSpaceShip === 0 ? 0 : -5);
            spaceShip.rotation.z = mouseX * (typeSpaceShip === 0 ? 0.0007 : 0.00001);

            if (turbo === true) {
                if ((spaceShip.position.z) > -5)
                    spaceShip.position.z -= 0.2;
            } else {
                if ((spaceShip.position.z) < 0)
                    spaceShip.position.z += 0.2;
            }

            // loop through each star
            for (var i = 0; i < stars.length; i++) {
                stars[i].position.z += i / 10;

                if (turbo === true)
                    stars[i].position.z += i / 10;
                // if the particle is too close move it to the back
                if (stars[i].position.z > 1000) stars[i].position.z = -1000;
            }

            // loop through each asteroids
            for (var x = 0; x < asteroids.length; x++) {
                asteroids[x].position.z += lvl * 10;
                asteroids[x].rotation.x += x / 5100;
                asteroids[x].rotation.z += x / 5500;
                if (turbo === true)
                    asteroids[x].position.z += 10;
                // if the particle is too close move it to the back
                if (asteroids[x].position.z > 1000) asteroids[x].position.z = -5000;
            }

            // go through bullets array and update position
            // remove bullets when appropriate
            for (var index = 0; index < bullets.length; index += 1) {

                // if the bullets position on z axis > 1000 ill remove it
                if (bullets[index].position.z < -200) {
                    scene.remove(bullets[index]);
                    bullets[index].alive = false;
                }
                if (bullets[index] === undefined) continue;
                if (bullets[index].alive === false) {
                    bullets.splice(index, 1);
                    continue;
                }
                bullets[index].position.add(bullets[index].velocity);
                // computation of the Euclidian distance for the bullet detection
                for (var i = 0; i < asteroids.length; i++) {
                    if (asteroids[i].position.distanceTo(bullets[index].position) <= (0.06 + 30)) {
                        //update score
                        score += 0.1;
                        document.getElementById("score").innerHTML = "Score: " + score.toFixed(2);

                        // target hit - remove the bullet
                        scene.remove(bullets[index]);
                        // place the asteroids in the init position
                        asteroids[i].position.z = -8000;
                        bullets[index].alive = false;
                    }
                }


            }
            // space bar pressed - user shoot
            if (shooting === true) {
                var geometry = new THREE.SphereBufferGeometry(0.06, 8, 8);
                var material;
                material = new THREE.MeshBasicMaterial({
                    color: (typeSpaceShip === 0 ? 0xff0000 : 0x00ff00),
                    refractionRatio: 0.98,
                    reflectivity: 0.9
                });
                var bullet = new THREE.Mesh(geometry, material);

                // position the bullet to come from the player's weapon
                if (sx === true) {
                    bullet.position.set(spaceShip.position.x + (typeSpaceShip === 0 ? 0.17 : -13.7), spaceShip.position.y + 0.57, spaceShip.position.z - (typeSpaceShip === 0 ? 0.8 : 9));
                    lightBullet.position.set(spaceShip.position.x + (typeSpaceShip === 0 ? 0.1 : -13.7), spaceShip.position.y + 0.57, spaceShip.position.z - (typeSpaceShip === 0 ? 0.7 : 9));
                } else {
                    bullet.position.set(spaceShip.position.x + (typeSpaceShip === 0 ? 0.45 : 13.7), spaceShip.position.y + 0.57, spaceShip.position.z - (typeSpaceShip === 0 ? 0.8 : 9));
                    lightBullet.position.set(spaceShip.position.x + (typeSpaceShip === 0 ? 0.6 : 13.7), spaceShip.position.y + 0.57, spaceShip.position.z - (typeSpaceShip === 0 ? 0.7 : 9));
                }
                sx = !sx;

                // set the velocity of the bullet
                bullet.velocity = new THREE.Vector3(
                    -Math.sin(spaceShip.rotation.x),
                    0,
                    -Math.cos(spaceShip.rotation.x)
                );
                bullet.alive = true;
                // add to scene, array, and set the delay to 10 frames
                scene.add(bullet);
                bullets.push(bullet);
                scene.add(lightBullet);
            } else scene.remove(lightBullet)
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