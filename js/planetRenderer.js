import * as THREE from 'https://unpkg.com/three/build/three.module.js';
                const scene = new THREE.Scene();
                const loader = new THREE.TextureLoader();

                var smallPlanetTexture;
                var largePlanetTexture
                var atmTexture;
                var ringTexture;
                var planetSize;

                //camera
                const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
                camera.position.z = 5;

                //light
                const light = new THREE.DirectionalLight( 0xffffff, 1 );
                light.position.set(-5, 6, 3);
                light.castShadow = true;
                scene.add( light );

                const globalLight = new THREE.AmbientLight(0xffffff, 0.15);
                scene.add(globalLight);

                //light shadow properties
                light.shadow.mapSize.width = 512;
                light.shadow.mapSize.height = 512;
                light.shadow.camera.near = 0.5;
                light.shadow.camera.far = 500;


                //load texture
                try{
                const planetName = document.getElementById("planetName").innerHTML;
                switch(planetName){
                    case "Earth":
                        smallPlanetTexture = loader.load('');
                        largePlanetTexture = loader.load('../img/earth/2k_earth_daymap.jpg');
                        atmTexture = loader.load('../img/earth/2k_earth_clouds.jpg')
                        ringTexture = loader.load('');
                        planetSize = 1;
                        break;
                    case "Mars":
                        smallPlanetTexture = loader.load('');
                        largePlanetTexture = loader.load('../img/mars/2k_mars.jpg');
                        atmTexture = loader.load('')
                        ringTexture = loader.load('');
                        planetSize = 1;
                        break;
                    case "Saturn":
                        smallPlanetTexture = loader.load('../img/saturn/2k_saturn.jpg');
                        largePlanetTexture = loader.load('');
                        atmTexture = loader.load('')
                        ringTexture = loader.load('../img/saturn/2k_saturn_ring_alpha_round.png');
                        planetSize = 0;

                        camera.rotation.z = 0.3;
                        break;
                }
                }
                catch{
                    smallPlanetTexture = loader.load('');
                    largePlanetTexture = loader.load('img/earth/2k_earth_daymap.jpg');
                    atmTexture = loader.load('img/earth/2k_earth_clouds.jpg')
                    ringTexture = loader.load('');
                    planetSize = 1;
                    
                }
                
                

                //renderer
                const renderer = new THREE.WebGLRenderer({alpha: true});
                renderer.setClearColor(0x000000, 0);
                renderer.setSize( window.innerWidth , window.innerHeight );
                renderer.shadowMap.enabled = true;
                renderer.shadowMap.type = THREE.PCFSoftShadowMap;
                document.getElementById("render").appendChild( renderer.domElement );
                
                window.addEventListener('resize', resize);
                function resize(){
                    camera.aspect = window.innerWidth / window.innerHeight;
                    renderer.setSize( window.innerWidth , window.innerHeight );

                    camera.updateProjectionMatrix();
                }

                //planet
                //small planet
                const smallPlanetGeometry = new THREE.SphereGeometry( 1.7, 64, 32 );
                const smallPlanetMaterial = new THREE.MeshPhongMaterial();
                smallPlanetMaterial.map = smallPlanetTexture; 
                const smallPlanet = new THREE.Mesh( smallPlanetGeometry, smallPlanetMaterial );
                smallPlanet.castShadow = true;
                smallPlanet.receiveShadow = true;

                smallPlanet.rotation.y = 1.2;
                  
                //ring layer
                const ringGeometry = new THREE.PlaneGeometry( 6, 6.3,);
                const ringMaterial = new THREE.MeshPhongMaterial();
                ringMaterial.map = ringTexture;
                ringMaterial.transparent = true;
                ringMaterial.opacity = 1.2;
                const ring = new THREE.Mesh( ringGeometry, ringMaterial );
                ring.receiveShadow = true;
                ring.position.y = 0.3;
                ring.rotation.x = -1.4;  
                //large planet
                const largePlanetGeometry = new THREE.SphereGeometry( 2.4, 64, 32 );
                const largePlanetMaterial = new THREE.MeshPhongMaterial();
                largePlanetMaterial.map = largePlanetTexture; 
                largePlanetMaterial.transparent = true;
                const largePlanet = new THREE.Mesh( largePlanetGeometry, largePlanetMaterial );
                largePlanet.castShadow = true;
                largePlanet.receiveShadow = true;
                 
                //atmosphere layer
                const atmGeometry = new THREE.SphereGeometry( 2.42, 64, 32 );
                const atmMaterial = new THREE.MeshPhongMaterial();
                atmMaterial.map = atmTexture;
                atmMaterial.transparent = true;
                atmMaterial.alphaMap = atmTexture;
                const atm = new THREE.Mesh( atmGeometry, atmMaterial );
                
                if (planetSize == 1)
                {
                    scene.add(largePlanet);
                    scene.add(atm);
                }
                else
                {
                    scene.add(smallPlanet);
                    scene.add(ring);
                }

                //const helper = new THREE.CameraHelper( light.shadow.camera );
                //scene.add( helper );

                function animate() {
                    requestAnimationFrame( animate );
                    //atm.rotation.x += 0.0005;
                    atm.rotation.y += 0.0009;
                    smallPlanet.rotation.y += 0.002;
                    largePlanet.rotation.y += 0.0007;
                    renderer.render( scene, camera );
                }
            
                animate();