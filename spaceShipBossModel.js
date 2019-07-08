var body, head, leftWing, rightWing, baseCannon, cannon;

var SpaceShipBossModel = function (inName) {
    this.model = new THREE.Object3D();

    var body = this.createBody();
    body.position.set(0, -80, 0);
    this.model.add(body);

    var head = this.createHead();
    head.position.set(0, -0.6, 0);
    this.model.add(head);

    var leftWing = this.createLeftWing();
    this.model.add(leftWing);

    var rightWing = this.createRightWing();
    this.model.add(rightWing);

    var baseCannon = this.createBaseCannon();
    this.model.add(baseCannon);

    return this;
};

SpaceShipBossModel.texture = new THREE.ImageUtils.loadTexture('./texture/t3.jpg');
SpaceShipBossModel.materials = new THREE.MeshPhongMaterial({
    map: SpaceShipBossModel.texture,
    bumpMap: SpaceShipBossModel.texture,
    bumpScale: 0.3,
    color: 0xffffff
});
SpaceShipBossModel.material3 = new THREE.MeshPhongMaterial({map: SpaceShipBossModel.texture, bumpMap: SpaceShipBossModel.texture, bumpScale: 0.3});
SpaceShipBossModel.materials2 = new THREE.MeshPhongMaterial({
    map: SpaceShipBossModel.texture,
    bumpMap: SpaceShipBossModel.texture,
    bumpScale: 0.3,
    color: 0xffffff
});

SpaceShipBossModel.material4 = new THREE.MeshBasicMaterial({color: 0xffffff});

SpaceShipBossModel.prototype.createHead = function () {
    head = new THREE.Object3D();

    var skullGeometry = new THREE.CylinderGeometry(0.6, 0.99, 1.5, 40, 6);

    var skull = new THREE.Mesh(
        skullGeometry,
        SpaceShipBossModel.materials);
    skull.position.set(0, 3.7, 0);
    head.add(skull);
    head.add(body);

    head.name = "head";
    return head;
};

SpaceShipBossModel.prototype.createBody = function () {
    body = new THREE.Object3D();

    var mainBody = new THREE.CylinderBufferGeometry(1, 1, 6, 36);
    var mainBodyBox = new THREE.Mesh(mainBody,
        SpaceShipBossModel.material3);
    mainBodyBox.position.y = 80;
    body.add(mainBodyBox);

    var engineProtection = new THREE.TorusBufferGeometry(1, 0.4, 30, 30);
    var engineProtectionBox = new THREE.Mesh(engineProtection,
        SpaceShipBossModel.material3);
    engineProtectionBox.position.y = 77.1;
    engineProtectionBox.rotation.x = Math.PI / 2;
    body.add(engineProtectionBox);

    var engineGeometry = new THREE.CylinderBufferGeometry(0.29, 0.5, 1, 36);
    var engineBox = new THREE.Mesh(engineGeometry, SpaceShipBossModel.materials2);
    engineBox.position.y = 77.1;
    body.add(engineBox);

    // tetrahedron under body
    var cargoGeometry = new THREE.CylinderGeometry(0.84, 0.2, 4.3, 15);
    var cargoBox = new THREE.Mesh(cargoGeometry, SpaceShipBossModel.materials2);
    cargoBox.position.y = 80.5;
    cargoBox.position.x = 2.7;

    cargoBox.rotation.z = Math.PI / 2;
    body.add(cargoBox);

    var weightCargoGeometry = new THREE.CylinderGeometry(0.15, 0.3, 1.8, 15);
    var weightCargoBox = new THREE.Mesh(weightCargoGeometry, SpaceShipBossModel.materials2);
    weightCargoBox.position.y = 80.5;
    weightCargoBox.position.x = 5;

    body.add(weightCargoBox);

    body.name = "body";
    return body;
};

SpaceShipBossModel.prototype.createLeftWing = function () {
    leftWing = new THREE.Object3D();

    var wingGeometry = new THREE.BoxBufferGeometry(0.2, 1.2, 3.2);
    var wingBox = new THREE.Mesh(wingGeometry,
        SpaceShipBossModel.material3);
    wingBox.position.z = 2.5;
    leftWing.add(wingBox);

    var wingWeightGeometry = new THREE.CylinderBufferGeometry(0.2, 0.2, 1.5);
    var wingWeightBox = new THREE.Mesh(wingWeightGeometry,
        SpaceShipBossModel.material3);
    wingWeightBox.position.z = 4;
    leftWing.add(wingWeightBox);

    leftWing.name = "leftWing";
    return leftWing;
};

SpaceShipBossModel.prototype.createRightWing = function () {
    rightWing = new THREE.Object3D();

    var wingGeometry = new THREE.BoxBufferGeometry(0.2, 1.2, 3.2);
    var bodyBox = new THREE.Mesh(wingGeometry,
        SpaceShipBossModel.material3);
    bodyBox.position.z = -2.5;
    rightWing.add(bodyBox);

    var wingWeightGeometry = new THREE.CylinderBufferGeometry(0.2, 0.2, 1.5);
    var wingWeightBox = new THREE.Mesh(wingWeightGeometry,
        SpaceShipBossModel.material3);
    wingWeightBox.position.z = -4;
    rightWing.add(wingWeightBox);

    rightWing.name = "rightWing";
    return rightWing;
};

SpaceShipBossModel.prototype.createBaseCannon = function () {
    baseCannon = new THREE.Object3D();
    cannon = new THREE.Object3D();

    var baseCannonGeometry = new THREE.SphereBufferGeometry(0.8, 32);
    var bodyBox1 = new THREE.Mesh(baseCannonGeometry, SpaceShipBossModel.material3);
    bodyBox1.position.y = 1.62;
    bodyBox1.position.x = -0.9;
    baseCannon.add(bodyBox1);

    var CannonGeometry = new THREE.CylinderBufferGeometry(0.05, 0.18, 1.5);
    var bodyBox2 = new THREE.Mesh(CannonGeometry, SpaceShipBossModel.material3);
    bodyBox2.position.y = 2.5;
    bodyBox2.position.x = -1.4;

    baseCannon.add(bodyBox2);
    head.add(baseCannon);

    baseCannon.name = "baseCannon";
    return baseCannon;
};