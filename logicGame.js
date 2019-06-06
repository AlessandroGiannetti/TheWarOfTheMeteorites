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

var shooting = false;
var camera, controls, scene, renderer;
var width = window.innerWidth;
var height = window.innerHeight;
// mouse position
var mouseX = 0, mouseY = 0;
// stars array
var stars = [];
// asteroid array
var asteroids = [];
// Bullets array
var bullets = [];

//flag bullet swapping dx and sx
var sx = true;
var turbo = false;
var spaceShip = null, typeSpaceShip = 0;
var modelLoaded = false;
var pause = false, start = false, gameOver = false;
var score = 0, health = 100, lvl = 1;

// textureLoader variable
var textureLoader = new THREE.TextureLoader();
var objectLoader = new THREE.ObjectLoader();

function startGame() {
    // !!important
    start = true;
    pause = false;
    gameOver = false;

    // init variable
    health = 100;
    score = 0;

    // disable auto rotation and orbit control
    controls.reset();
    controls.enabled = false;

    // reset the score and the health
    document.getElementById("score").innerHTML = "Score: " + score.toFixed(2);
    document.getElementById("health").innerHTML = "Health: " + health + ' / 100';

    // hide the main menu
    hideHtml("mainMenu", true);

    // show the score and health (initialized)
    showHtml("score", false);
    showHtml("health", false);

    // set camera position based on the model loaded
    switch (typeSpaceShip) {
        case 0:
            camera.position.z = 5;
            break;
        case 2:
            camera.position.z = 15;
            break;
    }
}

function returnMenu() {
    start = false;
    pause = false;
    gameOver = false;

    // init variable
    health = 100;
    health = 100;
    score = 0;
    // reload default spaceship
    scene.remove(spaceShip);
    loadModel("star-wars-vader-tie-fighter", 0);

    // enable auto rotation and drag control
    controls.enabled = true;

    // hide others menu
    hideHtml("secondMenu", false);
    hideHtml("gameOver", false);
    // hide score and health
    hideHtml("score", false);
    hideHtml("health", false);

    // show main menu
    showHtml("mainMenu", true);

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

    scene.remove(spaceShip);
    if (type === 0) {
        loadModel("star-wars-vader-tie-fighter", type);
    }
    if (type === 1) {
        //loadModel("x-wing");
    }
    if (type === 2) {
        loadModel("star-wars-arc-170-pbr", type);
    }
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
    // p key
    if (keyCode === 84) {
        turbo = true;
    }
    // escape key
    if (keyCode === 27) {
        if (start === true) {
            pause = !pause;
            if (pause === true)
                showHtml("secondMenu", true);
            else
                hideHtml("secondMenu", true);

        }
    }
}, false);
document.addEventListener("keyup", function (event) {
    var keyCode = event.which;
    // p key
    if (keyCode === 84) {
        turbo = false;
    }
}, false);
document.addEventListener('mousemove', function (e) {
    mouseX = e.clientX - width / 2;
    mouseY = e.clientY - height / 2
}, false);
document.addEventListener('click', function (e) {
    shooting = true;
}, false);
//prevent text selection with double click
document.addEventListener('mousedown', function (event) {
    if (event.detail > 1) {
        event.preventDefault();
    }
}, false);
//===================================================================================================

// controls command in the main menu
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
        textureLoader.load('./models/texture/asteroid.png', function (texture) {
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

//model textureLoader
function loadModel(name, typeSShip) {
    // BEGIN Clara.io JSON textureLoader code
    objectLoader.load("models/" + name + ".json", function (obj) {
            scene.add(obj);
            typeSpaceShip = typeSShip;
            spaceShip = obj;
            if (modelLoaded) {
                switch (typeSShip) {
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
    // END Clara.io JSON textureLoader code
}

loadModel("star-wars-vader-tie-fighter", typeSpaceShip);

// planet creation
textureLoader.load('./models/texture/sun.jpg', function (texture) {
    var geometry = new THREE.SphereBufferGeometry(280, 32, 32);
    var material = new THREE.MeshBasicMaterial({map: texture});
    var sphere = new THREE.Mesh(geometry, material);

    sphere.position.set(100, 700, -1000);
    var light1 = new THREE.PointLight(0xffb04a, 4, 0, 2);
    light1.position.set(534, 200, -966);
    light1.add(sphere);
    scene.add(light1);
});
textureLoader.load('./models/texture/moon.jpg', function (texture) {
    var geometry = new THREE.SphereBufferGeometry(210, 32, 32);
    var material = new THREE.MeshPhongMaterial({map: texture, reflectivity: 0.2});
    var moon = new THREE.Mesh(geometry, material);

    moon.position.set(-1700, -90, -2183);
    scene.add(moon);
});
// =================================================================================================

// lights
var light = new THREE.AmbientLight(0x404040); // soft white light
scene.add(light);
var directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
scene.add(directionalLight);

// init camera position
camera.position.z = 5;

//game Logic
function update() {

    if (modelLoaded === true) {
        if (start === true && pause === false && gameOver === false) {
            if (health <= 0) {
                spaceShip.rotation.y += 0.2;
                spaceShip.position.y -= 0.05;
                spaceShip.position.z -= 0.2;
                spaceShip.position.x += 0.1;
                setTimeout(function () {
                    if (health <= 0 && gameOver === false) {
                        gameOver = true;
                    }
                }, 5000);
                showHtml("gameOver", true);
            } else {
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
            }

            // loop through each star
            for (var iSta = 0; iSta < stars.length; iSta++) {
                stars[iSta].position.z += iSta / 10;

                if (turbo === true)
                    stars[iSta].position.z += iSta / 10;
                // if the particle is too close move it to the back
                if (stars[iSta].position.z > 1000) stars[iSta].position.z = -1000;
            }

            // loop through each asteroids
            for (var iAst = 0; iAst < asteroids.length; iAst++) {
                asteroids[iAst].position.z += lvl * 10;
                asteroids[iAst].rotation.x += iAst / 5100;
                asteroids[iAst].rotation.z += iAst / 5500;
                if (turbo === true)
                    asteroids[iAst].position.z += 10;
                // if the particle is too close move it to the back
                if (asteroids[iAst].position.z > 1000) asteroids[iAst].position.z = -5000;

                if (asteroids[iAst].position.distanceTo(spaceShip.position) <= (4.5 + 30)) {
                    health -= 10;
                    if (health >= 0)
                        document.getElementById("health").innerHTML = "Health: " + health + ' / 100';
                }
            }

            // go through bullets array and update position
            // remove bullets when appropriate
            for (var iBull = 0; iBull < bullets.length; iBull += 1) {

                // if the bullets position on z axis < -200 ill remove it
                if (bullets[iBull].position.z < -200) {
                    scene.remove(bullets[iBull]);
                    bullets[iBull].alive = false;
                }
                if (bullets[iBull] === undefined) continue;
                if (bullets[iBull].alive === false) {
                    bullets.splice(iBull, 1);
                    continue;
                }
                bullets[iBull].position.add(bullets[iBull].velocity);


                for (iAst = 0; iAst < asteroids.length; iAst++) {
                    // computation of the Euclidian distance for the bullet detection
                    if (asteroids[iAst].position.distanceTo(bullets[iBull].position) <= (0.06 + 30)) {
                        //update score
                        score += 0.1;
                        document.getElementById("score").innerHTML = "Score: " + score.toFixed(2);

                        // target hit - remove the bullet
                        scene.remove(bullets[iBull]);
                        // place the asteroids in the init position
                        asteroids[iAst].position.z = -8000;
                        bullets[iBull].alive = false;
                    }
                }
            }
            // space bar pressed - user shoot
            if (shooting === true && health > 0) {
                var geometry = new THREE.CylinderGeometry(0.05, 0.05, 3, 12);
                var material = new THREE.MeshBasicMaterial({
                    //color: (typeSpaceShip === 0 ? 0xff0000 : 0x00ff00),
                    color: 0x00ff00,
                    refractionRatio: 0.98,
                    reflectivity: 0.9
                });
                var bullet = new THREE.Mesh(geometry, material);
                bullet.rotation.x = Math.PI / 2;
                //lightBullet.position.set(spaceShip.position.x + (typeSpaceShip === 0 ? 0.1 : -13.7), spaceShip.position.y + 0.57, spaceShip.position.z - (typeSpaceShip === 0 ? 0.7 : 9));
                // position the bullet to come from the player's weapon
                if (sx === true)
                    bullet.position.set(spaceShip.position.x + (typeSpaceShip === 0 ? 0.17 : -13.7), spaceShip.position.y + 0.6, spaceShip.position.z - (typeSpaceShip === 0 ? 2.5 : 9));
                else
                    bullet.position.set(spaceShip.position.x + (typeSpaceShip === 0 ? 0.45 : 13.7), spaceShip.position.y + 0.6, spaceShip.position.z - (typeSpaceShip === 0 ? 2.5 : 9));

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
            }
            if (sx === false)
                shooting = false;

        } else if (start === false) {
            controls.autoRotate = true;
            controls.update();
        }
    }

}

function showHtml(id, cursor) {
    document.getElementById(id).style.display = "block";
    if (cursor)
        document.body.style.cursor = "auto";
}

function hideHtml(id, cursor) {
    document.getElementById(id).style.display = "none";
    if (cursor)
        document.body.style.cursor = "none";
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