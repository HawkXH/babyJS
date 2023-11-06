// Import Babylon.js modules
import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';

document.addEventListener("DOMContentLoaded", function () {
    var canvas = document.getElementById("renderCanvas"); // Explicitly specify the type
    var engine = new BABYLON.Engine(canvas, true);
    var scene = new BABYLON.Scene(engine);

    // Create a camera
    var camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0, 5, -10), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, true);

    // Create a light
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 1; // Adjust the intensity as needed
    light.position = new BABYLON.Vector3(0, 10, 0); // Adjust the position as needed
    light.diffuse = new BABYLON.Color3(1, 1, 1); // White color, adjust as needed

    // Load the model from the URL
    BABYLON.SceneLoader.ImportMesh("", "https://raw.githubusercontent.com/HawkXH/models/main/", "Magikarp.glb", scene, function (loadedMeshes) {
        // Do something with the loaded meshes if needed
        console.log("Model loaded successfully!");

        // Assuming there's only one mesh in the loaded model
        var magikarp = loadedMeshes[0];

        // Set the scaling to make the Magikarp bigger
        magikarp.scaling = new BABYLON.Vector3(2, 2, 2); // Adjust the values as needed

        // Animation to move the Magikarp up and down rapidly
        var animationUpDown = new BABYLON.Animation("animationUpDown", "position.y", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

        // Define keyframes for up-and-down motion
        var keysUpDown = [];
        keysUpDown.push({ frame: 0, value: 0 });
        keysUpDown.push({ frame: 30, value: 2 });
        keysUpDown.push({ frame: 60, value: 0 });

        // Add keyframes to the up-and-down animation
        animationUpDown.setKeys(keysUpDown);

        // Animation to add a random wiggle effect using Quaternion
        var animationWiggle = new BABYLON.Animation("animationWiggle", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

        // Define keyframes for wiggle motion with random values
        var keysWiggle = [];
        keysWiggle.push({ frame: 0, value: new BABYLON.Quaternion.RotationAxis(BABYLON.Axis.Y, 0) });

        // Generate random values for the wiggle
        for (var i = 1; i <= 180; i++) {
            var randomAngleX = Math.random() * Math.PI / 8;
            var randomAngleY = Math.random() * Math.PI / 8;
            var quaternion = new BABYLON.Quaternion.RotationYawPitchRoll(randomAngleY, randomAngleX, 0);
            keysWiggle.push({ frame: i, value: quaternion });
        }

        // Add keyframes to the wiggle animation
        animationWiggle.setKeys(keysWiggle);

        // Combine all animations in an array
        var animations = [animationUpDown, animationWiggle];

        // Run the animations
        scene.beginDirectAnimation(magikarp, animations, 0, 60, true);
    });

    var angle = 0;

    // set background color to clear
    scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);

    // Run the engine
    engine.runRenderLoop(function () {
        // Rotate the camera around the Magikarp
        var radius = 5;
        angle += engine.getDeltaTime() * 0.001; // Adjust the multiplier for rotation speed
        camera.position.x = Math.sin(angle) * radius;
        camera.position.z = Math.cos(angle) * radius;
        camera.setTarget(BABYLON.Vector3.Zero());

        // Render the scene
        scene.render();
    });

    // Handle window resize
    window.addEventListener("resize", function () {
        engine.resize();
    });
});
