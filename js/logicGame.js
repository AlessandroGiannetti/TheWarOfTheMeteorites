var start = false;
var typeStartShip = 0;

function STARTGAME() {
    start = !start;
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

function switchShip(type) {
    typeStartShip = type;
    scene.remove(starShip);
    if (type === 0)
        loadModel("models/enemy.json");
    camera.position.z = 2;
    if (type === 1) {
        loadModel("models/star-wars-x-wing.json");
        camera.position.z = 10;
    }
    if (type === 2) {
        loadModel("models/star-wars-arc-170-pbr.json");
        camera.position.z = 15;
    }
}

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

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

window.addEventListener('resize', function () {
    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});

// gestione eventi
document.addEventListener("keydown", onDocumentKeyDown, false);
document.addEventListener("keyup", onDocumentKeyUp, false);

function onDocumentKeyDown(event) {
    var keyCode = event.which;
    if (keyCode === 32) {
        turbo = true;
    }
    if (keyCode === 79) {
        pause = false;
    }
    if (keyCode === 80) {
        pause = true;
    }
}

function onDocumentKeyUp(event) {
    var keyCode = event.which;
    if (keyCode === 32) {
        turbo = false;
    }
}

controls = new THREE.OrbitControls(camera, renderer.domElement);
var stars = [];

function starForge() {

    // The loop will move from z position of -1000 to z position 1000, adding a random particle at each position.
    for (var z = -1000; z < 1000; z += 5) {

        // Make a sphere (exactly the same as before).
        var geometry = new THREE.SphereGeometry(0.5, 32, 32);
        var material = new THREE.MeshBasicMaterial({color: 0xffffff});
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
var starShip;
var modelLoaded = false;
var pause = false;

//create the shape
var loader = new THREE.ObjectLoader();

function loadModel(url) {
    loader.load(
        // resource URL
        url,
        function (object) {
            starShip = object;
            scene.add(object);
        },
        // onProgress callback
        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            if (xhr.loaded === xhr.total)
                modelLoaded = true;
        },

        // onError callback
        function (err) {
            console.error('An error happened' + err);
        }
    );
}

loadModel("models/enemy.json");

var ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.3);
scene.add(ambientLight);

camera.position.z = 5;

//game Logic
var mouseX = 0;
var mouseY = 0;
var rot = 1;

var update = function () {

    var width = window.innerWidth;
    var height = window.innerHeight;

    document.addEventListener('mousemove', onMouseMove, false);

    function onMouseMove(e) {
        mouseX = e.clientX - width / 2;
        mouseY = e.clientY - height / 2
    }

    if (start === true) {
        if (modelLoaded === true) {

            camera.position.x = mouseX * 0.002;
            camera.position.y = (-mouseY) * 0.003;
            starShip.position.x = mouseX * 0.008;
            starShip.position.y = (-mouseY) * 0.01;
            starShip.rotation.z = mouseX * 0.0015;

            if (turbo === true) {
                if ((camera.position.z - starShip.position.z) < 8)
                    camera.position.z += 0.2;
            } else {
                if ((camera.position.z - starShip.position.z) > 5 && typeStartShip === 0)
                    camera.position.z -= 0.2;
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
    } else {
        controls.autoRotate = true;
        controls.update();
    }
};


// draw Scene
var render = function () {
    renderer.render(scene, camera);

};

// run game loop (update, render, repeat)
var GameLoop = function () {
    requestAnimationFrame(GameLoop);
    update();
    render();
};
// creation of the stars
GameLoop();