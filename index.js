// Import Babylon.js modules
import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';

document.addEventListener("DOMContentLoaded", function () {
    var canvas = document.getElementById("renderCanvas") // Explicitly specify the type
    var engine = new BABYLON.Engine(canvas, true);
    var scene = new BABYLON.Scene(engine);

    // Create a camera
    var camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0, 5, -10), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, true);

    // Create a light
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

    // Load the model from the URL
    BABYLON.SceneLoader.ImportMesh("", "https://raw.githubusercontent.com/HawkXH/models/main/", "Magikarp.glb", scene, function (meshes) {
        // Do something with the loaded meshes if needed
        console.log("Model loaded successfully!");
    });


    // Run the engine
    engine.runRenderLoop(function () {
        scene.render();
    });

    // Handle window resize
    window.addEventListener("resize", function () {
        engine.resize();
    });

    // Start the asset manager
    assetsManager.load();
});
