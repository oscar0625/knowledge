# 一、场景
## 1. 创建
```
  const scene = new THREE.Scene();
```
## 2. api
* 见图 scene.png
### a. 常用
```
  .THREE.Scene.Add：用于向场景中添加对象
  ·THREE.Scene.Remove：用于移除场景中的对象
  ·THREE.Scene.children：用于获取场景中所有的子对象列表
  ·THREE.Scene.getObjectByName：利用name属性，用于获取场景中特定的对象
```
### b. THREE.Scene.traverse
* 深度遍历完场景树中的所有对象为止
### c. fog 雾化
* 场景中的物体离摄像机越远就会变得越模糊
```
  scene.fog = new THREE.Fog(0xffffff, 0.015, 100); // 雾的浓度是线性增长的
  scene.fog = new THREE.FogExp2( 0xffffff, 0.015 ); // 雾的浓度随着距离呈指数增长。
```
### d. overrideMaterial
* 当设置了overrideMaterial属性后，场景中所有的物体都会使用该属性指向的材质，即使物体本身也设置了材质。
```
  scene.overrideMaterial = new THREE.MeshLambertMaterial({color: 0xffffff});
```

# 二、相机
## 1. 透视投影相机 PerspectiveCamera
* 这一投影模式被用来模拟人眼所看到的景象，它是3D场景的渲染中使用得最普遍的投影模式。
```
    const camera = new THREE.PerspectiveCamera( 45, width / height, 1, 1000 );
    scene.add( camera );
    camera.lookAt(scene.position);
```
## 2. 正交投影相机 OrthographicCamera
* 在这种投影模式下，无论物体距离相机距离远或者近，在最终渲染的图片中物体的大小都保持不变。这对于渲染2D场景或者UI元素是非常有用的。
```
    const camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 1, 1000 );
    scene.add( camera );
    camera.lookAt(scene.position);
```
## 3. 如何使用鼠标选择场景中的对象（点击事件）
见 chapter-09/02-selecting-objects.html
```
  function onDocumentMouseDown(event) {

        var vector = new THREE.Vector3((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1, 0.5);
        vector = vector.unproject(camera);

        var raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
        var intersects = raycaster.intersectObjects(scene.children);
        // var intersects = raycaster.intersectObjects(cubeGroup.children);

        if (intersects.length > 0) {
            console.log(intersects[0]);
            intersects[0].object.material.transparent = true;
            intersects[0].object.material.opacity = 0.1;
        }
    }
```

# 三、光源
* 见图 不同种类光源用法.png
## 1. 环境光 AmbientLight
* 在创建THREE.AmbientLight时，颜色将会应用到全局。该光源并没有特别的来源方向，并且THREE.AmbientLight不会生成阴影。通常，不能将THREE.AmbientLight作为场景中唯一的光源，因为它会将场景中的所有物体渲染为相同的颜色，而不管是什么形状。
```
  var ambiColor = "#0c0c0c";
  var ambientLight = new THREE.AmbientLight(ambiColor);
  scene.add(ambientLight);
```
## 2. 聚光灯 SpotLight
* THREE.SpotLight（聚光灯光源）是最常使用的光源之一（特别是如果你想要使用阴影的话）。THREE.SpotLight是一种具有锥形效果的光源。你可以把它与手电筒或灯塔产生的光进行对比。
```
  var pointColor = "#ffffff";
  var spotLight = new THREE.SpotLight(pointColor);
  spotLight.position.set(-40, 60, -10);
  spotLight.castShadow = true;  //开启阴影
  spotLight.target = plane;   //光源瞄准目标Object3D  与lookAt不同 lookAt是光源相机的朝向
  scene.add(spotLight);
```
## 3. 点光源 PointLight
* Three.js库中的THREE.PointLight（点光源）是一种单点发光、照射所有方向的光源。夜空中的照明弹就是一个很好的点光源的例子。
```
  var pointColor = "#ccffcc";
  var pointLight = new THREE.PointLight(pointColor);
  pointLight.castShadow = true;
  pointLight.distance = 100; //distance属性的默认值为0，这意味着光线强度不会随着距离的增加而减弱。
  scene.add(pointLight);
```
## 4. 平行光 DirectionalLight
* THREE.DirectionalLight（平行光）。这种类型的光可以看作是距离很远的光。它发出的所有光线都是相互平行的。平行光的一个范例就是太阳光。
* THREE.DirectionalLight和我们之前看过的THREE.SpotLight之间的主要区别是：平行光不像聚光灯（可以通过distance和exponent属性来微调）那样离目标越远越暗淡。被平行光照亮的整个区域接收到的光强是一样的。
```
  var pointColor = "#ff5808";
  var directionalLight = new THREE.DirectionalLight(pointColor);
  directionalLight.position.set(-40, 60, -10);
  directionalLight.castShadow = true;
  directionalLight.shadow.camera.near = 2;
  directionalLight.shadow.camera.far = 80;
  directionalLight.shadow.camera.left = -30;
  directionalLight.shadow.camera.right = 30;
  directionalLight.shadow.camera.top = 30;
  directionalLight.shadow.camera.bottom = -30;
  directionalLight.intensity = 0.5;
  directionalLight.shadow.mapSize.width = 1024;
  directionalLight.shadow.mapSize.height = 1024;
  scene.add(directionalLight);

  
  // 平行光
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.copy(camera.position);
  directionalLight.lookAt(scene.position);
  scene.add(directionalLight);
```
## 5. 半球光光源 HemisphereLight
* 这种光源可以为户外场景创建更加自然的光照效果
* 半球光不能投射阴影
```
  var hemiLight = new THREE.HemisphereLight(0x0000ff, 0x00ff00, 0.6); // 天空颜色 地面颜色 光照强度
  hemiLight.position.set(0, 500, 0);
  scene.add(hemiLight);

  // 半球光
  const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.5);
  hemiLight.position.set(0, 0, 0);
  scene.add(hemiLight);
```
## 6. 平面光光源 RectAreaLight
* 平面光光源从一个矩形平面上均匀地发射光线。这种光源可以用来模拟像明亮的窗户或者条状灯光光源。
* 不支持阴影
```
  var areaLight1 = new THREE.RectAreaLight(0xff0000, 500, 4, 10);
  areaLight1.position.set(-10, 10, -35);
  scene.add(areaLight1);
```
## 7. 镜头光晕 Lensflare
```
  var textureLoader = new THREE.TextureLoader();
  var textureFlare0 = textureLoader.load("../../assets/textures/flares/lensflare0.png");
  var textureFlare3 = textureLoader.load("../../assets/textures/flares/lensflare3.png");

  var flareColor = new THREE.Color(0xffaacc);

  var lensFlare = new THREE.Lensflare();

  lensFlare.addElement(new THREE.LensflareElement(textureFlare0, 350, 0.0, flareColor));
  lensFlare.addElement(new THREE.LensflareElement(textureFlare3, 60, 0.6, flareColor));
  lensFlare.addElement(new THREE.LensflareElement(textureFlare3, 70, 0.7, flareColor));
  lensFlare.addElement(new THREE.LensflareElement(textureFlare3, 120, 0.9, flareColor));
  lensFlare.addElement(new THREE.LensflareElement(textureFlare3, 70, 1.0, flareColor));
  spotLight.add(lensFlare);
```

# 四、光源的阴影
## SpotLightShadow
* 将THREE.SpotLight对象的 castShadow 属性设置为true可以生成阴影。（当然，在场景中渲染THREE.Mesh对象时，要确保为要投射阴影的对象设置castShadow属性，为要显示阴影的对象设置 receiveShadow 属性。）
* 如果阴影看上去有点粗糙（如阴影形状的边缘呈块状），可以增加shadow.mapSize.width和shadow.mapSize.height属性的值，或者保证用于计算阴影的区域紧密包围在对象周围。可以通过shadow.camera.near、shadow.camera.far和shadow.camera.fov属性来配置这个区域。
* 记住，不仅要告诉光源生成阴影，而且还必须通过配置每个几何体的castShadow和receiveShadow属性来告诉几何体对象是否接收或投射阴影。
* 如果你在场景中使用薄对象，在渲染阴影时，可能会出现奇怪的渲染失真现象。通常可以使用shadow.bias属性轻微偏移阴影来修复这些问题。
* 如果想要阴影更柔和，可以在THREE.WebGLRenderer对象上设置不同的shadowMap-Type属性值。默认情况下，此属性的值为THREE.PCFShadowMap；如果将此属性设置为PCFSoftShadowMap，则会得到更柔和的阴影。
```
  var pointColor = "#ffffff";
  var spotLight = new THREE.SpotLight(pointColor);
  spotLight.position.set(-40, 60, -10);
  spotLight.castShadow = true;
  spotLight.shadow.camera.near = 2;
  spotLight.shadow.camera.far = 200;
  spotLight.shadow.camera.fov = 30;
  spotLight.shadow.mapSize.width = 1024;
  spotLight.shadow.mapSize.height = 1024;
  spotLight.target = plane;
  spotLight.distance = 0;
  spotLight.angle = 0.4;
```
## PointLightShadow (类似)
## DirectionalLightShadow (类似)

# 五、材质
* 见图 常用几种材质.png
## 1. 共有属性
* Three.js提供了一个材质基类THREE.Material，它列出了所有的共有属性。
* 基础属性：这些属性是最常用的。通过这些属性，可以控制物体的不透明度、是否可见以及如何被引用（通过ID或是自定义名称）。
* 融合属性：每个物体都有一系列的融合属性。这些属性决定了物体如何与背景融合。
* 高级属性：有一些高级属性可以控制底层WebGL上下文对象渲染物体的方式。大多数情况下是不需要使用这些属性的。
## 2. 简单的网格材质
* MeshBasicMaterial 一个以简单着色（平面或线框）方式来绘制几何体的材质。这种材质不考虑场景中光照的影响。
* MeshDepthMaterial 一种按深度绘制几何体的材质。使用这种材质的物体，其外观不是由光照或某个材质属性决定的，而是由物体到摄像机的距离决定的。
* MeshNormalMaterial 一种把法向量映射到RGB颜色的材质。每一面的颜色是由从该面向外指的法向量计算得到的。
## 3. 联合材质使用 
```
    var cubeMaterial = new THREE.MeshDepthMaterial();
    var colorMaterial = new THREE.MeshBasicMaterial({
        color: controls.color,
        transparent: true,
        blending: THREE.MultiplyBlending
    });
    var cube = new THREE.SceneUtils.createMultiMaterialObject(cubeGeometry, [colorMaterial,cubeMaterial]);
    cube.children[1].scale.set(0.99, 0.99, 0.99);
```
### a. 在单几何体上使用多种材质
* 为正方形六个面分别设置不同颜色材质
```
    var mats = [];
    mats.push(new THREE.MeshBasicMaterial({ color: 0x009e60 }));
    mats.push(new THREE.MeshBasicMaterial({ color: 0x0051ba }));
    mats.push(new THREE.MeshBasicMaterial({ color: 0xffd500 }));
    mats.push(new THREE.MeshBasicMaterial({ color: 0xff5800 }));
    mats.push(new THREE.MeshBasicMaterial({ color: 0xC41E3A }));
    mats.push(new THREE.MeshBasicMaterial({ color: 0xffffff }));
    var cubeGeom = new THREE.BoxGeometry(3, 3, 3);
    var cube = new THREE.Mesh(cubeGeom, mats);
```
## 4. 高级材质
* MeshStandardMaterial 一种基于物理的标准材质。这种材质使用更加正确的物理计算来决定物体表面如何与场景中的光源互动。这种材质能够更好地表现塑料质感和金属质感的表面（一般情况下，是你的最佳选择）
* MeshLambertMaterial 一种非光泽表面的材质，没有镜面高光。这种材质可以用来创建暗淡的并不光亮的表面。该材质非常易用，而且会对场景中的光源产生反应。
* MeshPhongMaterial 一种用于具有镜面高光的光泽表面的材质。可以创建一种光亮的材质。这种材质可使用的属性与暗淡材质（MeshLambertMaterial）可使用的属性基本一样。（若要使用高光贴图，则不得不使用）
* MeshPhysicalMaterial 该材质与（MeshStandardMaterial）非常相似，但提供了对反光度的更多控制，
* ShaderMaterial 是Three.js库中最通用、最复杂的材质之一。通过它，可以使用自己定制的着色器，高级功能见11章
## 5. 线性几何体的材质
* LineBasicMaterial 用于线段的基础材质，可以设置colors、linewidth、linecap和linejoin属性。
* LineDashedMaterial 它的属性与（LineBasicMaterial）的属性一样，但是可以通过指定虚线和空白间隙的长度来创建出虚线效果。

# 六、纹理
* 注意：在纹理更新时，记得将 needsUpdate 属性设置为true。
## 1. 将纹理应用于材质
* 可以使用任何你喜欢的图片来作为纹理使用，但是为了达到最好的效果，最好使用长宽大小为2的次方的正方形图片，例如大小为256×256、512×512的图片最合适。
### a. 用纹理为网格的每个像素指定颜色
* UV贴图，告诉渲染器将纹理的哪部分应用到指定的面上。
* 纹理最基础的用法是作为贴图被添加在材质上，当你使用这样的材质创建网格时，网格的颜色则来源于纹理。
* 除了使用THREE.TextureLoader方法加载标准格式的图片，Three.js还提供了一些自定义的加载器，以此来加载其他格式的纹理文件。
```
  const texture = new THREE.TextureLoader().load( 'textures/land_ocean_ice_cloud_2048.jpg' );
  // 立即使用纹理进行材质创建
  const material = new THREE.MeshBasicMaterial( { map: texture } );
```
### b. 用凹凸贴图创建褶皱
* 设置 bumpMap 属性。
* 另外，通过 bumpScale 属性，我们可以设置凹凸的高度（如果值为负数，则表示的是深度）
* demo中的凹凸贴图是一张灰度图，当然你也可以使用彩色图。像素的密集程度定义的是凹凸的高度，但是凹凸图只包含像素的相对高度，没有任何倾斜的方向信息。
```
  var cubeMaterial = new THREE.MeshStandardMaterial({
      map: textureLoader.load("../../assets/textures/stone/stone.jpg"),
      bumpMap:textureLoader.load("../../assets/textures/stone/stone-bump.jpg"),
      bumpScale:1
  });
```
### c. 用法向贴图创建更加细致的凹凸和褶皱
* 设置 normalMap 属性。
* 设置 normalScale 属性为 mat.normalScale.set(1，1) 来指定凹凸的程度，通过这两个参数，你可以沿着x轴和y轴进行缩放，但是最好的方式是将它们的值设置成一样。需要注意的是，如果设置的值为负数，那么高度就会反转。
* 使用法向贴图的最大问题是它们很难创建，需要使用比如Blender和Photoshop这样的特殊工具。
```
  var cubeMaterial = new THREE.MeshStandardMaterial({
    map: textureLoader.load("../../assets/textures/general/plaster.jpg"),
    normalMap: textureLoader.load("../../assets/textures/general/plaster-normal.jpg")
  });
  cubeMaterial.normalScale.set(1,1)
```
### d. 用移位贴图来改变顶点位置
* 法向贴图和凹凸贴图都只能在物体表面生成一种凹凸不平的假象，而移位贴图则能够根据贴图的内容，真正改变模型的形状。当使用法向贴图和凹凸贴图时，无论物体表面看起来如何凹凸不平，但其轮廓依然是平整的。这其实是这两种方法的一个缺憾，而移位贴图在这方面的表现则是完美的。
* 设置 displacementMap 属性。
* displacementScale 和 displacementBias 两个属性也可以用来控制顶点的移位程度。
* 贴图中越亮的颜色会使顶点移位越远（白色是最高的）
* 注意：模型必须具有大量顶点，否则其顶点移位效果看起来会与移位贴图并不相像。这是因为顶点过少的模型没有足够的顶点可以移动。
```
  var sphereMaterial = new THREE.MeshStandardMaterial({
      map: textureLoader.load("../../assets/textures/w_c.jpg"),
      displacementMap: textureLoader.load("../../assets/textures/w_d.png"),
      displacementScale: 1,
      displacementBias: 0
  });
```
### e. 用环境光遮挡贴图实现细节阴影
* 只能用于静态场景
* 环境光遮挡技术用于决定模型的哪一部分暴露于环境光之中。
* 设置 aoMap 属性。
* 可以通过调节 aoMapIntenisty 属性来指定影响程度
```
    var material = new THREE.MeshStandardMaterial({
      aoMap: textureLoader.load("../../assets/models/baymax/ambient.png"),
      aoMapIntensity: 2
    });
```
### f. 用光照贴图产生假阴影
* 只能用于静态场景
* 光照贴图里面的信息用于指出一个模型的特定部分应该从场景中接收多少光照 (与 aoMap 相反)
* 设置 lightMap 属性。
* 可以通过调节 lightMapIntensity 属性来指定影响程度
```
    var material = new THREE.MeshStandardMaterial({
      map: textureLoader.load("../../assets/textures/general/floor-wood.jpg"),
      lightMap: textureLoader.load("../../assets/textures/lightmap/lightmap.png"),
      lightMapIntensity: 1
    });
```
### g. 金属光泽度贴图和粗糙度贴图
* 通过仔细调节 MeshStandardMaterial 的 metalness 和 roughness 两个属性，我们可以生成大部分所需的表面质感。但也可以通过纹理贴图来设置。
* metalnessMap 该纹理的蓝色通道用于改变材质的金属度 如果还提供 metalness 则两个值相乘。
* roughnessMap 该纹理的绿色通道用于改变材质的粗糙度 如果还提供 roughness 则两个值相乘。
### h. Alpha贴图
* Alpha贴图用于控制物体表面的透明度。贴图中的纯黑色部分代表该部分表面完全透明，纯白色部分则代表完全不透明。
* alphaMap
```
  var sphereMaterial = new THREE.MeshStandardMaterial({
      alphaMap: textureLoader.load("../../assets/textures/alpha/partial-transparency.png"),
      alphaTest: 0.5
  });
```
### i. 自发光贴图
* 自发光贴图是一个控制模型表面实现自发光效果的纹理贴图，它的功能类似于前面介绍过的emissive属性，但后者只能将模型作为一个整体来控制。
* 自发光特性只能单独影响物体本身，却不能，使该物体变成光源。
```
  var cubeMaterial = new THREE.MeshStandardMaterial({
      emissive: 0xffffff,
      emissiveMap: textureLoader.load("../../assets/textures/emissive/lava.png"),
      normalMap: textureLoader.load("../../assets/textures/emissive/lava-normals.png"),
      metalnessMap: textureLoader.load("../../assets/textures/emissive/lava-smoothness.png"),
      metalness: 1,
      roughness: 0.4,
      normalScale: new THREE.Vector2(4,4)
  });
```
### j. 高光贴图
* 但是若要使用高光贴图，则不得不使用THREE.MeshPhongMaterial材质。
* 高光贴图用于指定物体表面中哪部分比较闪亮，或者哪部分相对暗淡，在贴图中，黑色部分表示完全没有高光效果，而白色部分则表示有完全的高光效果。
* specularMap
* 可以设置 specular（高光颜色）和 shiness（闪亮程度）属性。
```
  var earthMaterial = new THREE.MeshPhongMaterial({
      map: textureLoader.load("../../assets/textures/earth/Earth.png"),
      normalMap: textureLoader.load("../../assets/textures/earth/EarthNormal.png"),
      specularMap: textureLoader.load("../../assets/textures/earth/EarthSpec.png"),
      normalScale: new THREE.Vector2(6,6)
  });
```
### k. 环境贴图
* 计算镜面反射效果对CPU的耗费是非常大的，而且通常会使用光线追踪算法。在Three.js中你依然可以实现镜面反射效果，只不过是做一个假的。你可以通过创建一个对象所处环境的纹理来伪装镜面反射，并将它应用到指定的对象上。
* envMap
* 实现全景效果
* 用环境贴图创建伪镜面反射效果
```
  var urls = [
      '../../assets/textures/cubemap/flowers/right.png',
      '../../assets/textures/cubemap/flowers/left.png',
      '../../assets/textures/cubemap/flowers/top.png',
      '../../assets/textures/cubemap/flowers/bottom.png',
      '../../assets/textures/cubemap/flowers/front.png',
      '../../assets/textures/cubemap/flowers/back.png'
  ];
  var cubeLoader = new THREE.CubeTextureLoader();
  var cubeMap = cubeLoader.load(urls);
  scene.background = cubeMap;  // 创建全景
  var cubeMaterial = new THREE.MeshStandardMaterial({
      envMap: cubeMap,
      color: 0xffffff,
      metalness: 1,
      roughness: 0,
  });
```
## 2. 纹理的高级用途
### a. 自定义UV映射
* 见 chapter-10/20-uv-mapping-manual.html
### b. 重复纹理
* wrapS 属性定义的是纹理沿x轴方向的行为，warpT 属性定义的是纹理沿y轴方向的行为。
* 如果使用THREE.RepeatWrapping，可以设置repeat属性
* 当你修改repeat属性时，Three.js会自动更新纹理使用新的值来进行渲染。如果你将值从THREE.RepeatWrapping修改为THREE.ClampToEdgeWrapping时，你需要明确地更新纹理 needsUpdate
```
  const texture = new THREE.TextureLoader().load( "textures/water.jpg" );
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set( 4, 4 );
```
### C. 画布作为纹理
```
  var texture = new THREE.Texture(canvas);
  var sphereMesh = addGeometry(scene, sphere, 'sphere', texture, gui, controls);
```
### d. 视频作为纹理
```
  var video = document.getElementById( 'video' );
  var texture = new THREE.VideoTexture(video);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.format = THREE.RGBFormat;
```

# 七、几何体
* Geometry BufferGeometry 见 chapter-02/05-custom-geometry.html
## 1. 二维几何体
* PlaneGeometry 二维矩形
* CircleGeometry 二维圆（或部分圆）
* RingGeometry 二维圆环（或部分圆环）
* ShapeGeometry 自定义的二维图形 在创建THREE.ShapeGeometry对象之前，必须先创建THREE.Shape对象。
## 2. 三维几何体
* BoxGeometry 长方体
* SphereGeometry 球体（半球体、球体一部分）
* CylinderGeometry 圆柱替（类似圆柱的物体）
* ConeGeometry 圆锥体
* TorusGeometry 圆环体（甜甜圈）
* TorusKnotGeometry 环状扭结（环状扭结是一种比较特别的结，看起来就像一根管子绕自己转了几圈。）
* PolyhedronGeometry 自定义多面体
* TetrahedronGeometry 四面体
* OctahedronGeometry 八面体
* DodecahedronGeometry 十二面体
* IcosahedronGeometry 二十面体
## 3. 高级几何体
* ConvexGeometry （由三维的点创建体） 标准发布版中不包含，需额外引入ConvexGeometry.js
* LatheGeometry （由二维的线创建体） 从一条光滑曲线创建图形。此曲线是由多个点（也称为节点）定义的，通常称作样条曲线。这条样条曲线绕物体的中心z轴旋转，得到类似花瓶或铃铛的图形。
* ExtrudeGeometry （由二维的面创建体） 从一个二维图形创建出一个三维图形 如从SVG拉伸出三图形
* TubeGeometry （由三维的线创建体） 沿着一条三维的样条曲线拉伸出一根管
* ParametricGeometry 基于等式创建几何体 
## 4. 三维文本
* TextGeometry 渲染文本非常简单。你所要做的只是指定想要用的字体，以及我们在讨论THREE.ExtrudeGeometry时见过的基本拉伸属性。
```
  添加自定义字体
  FontLoader
  http://gero3.github.io/facetype.js/
  网站：可以将TrueType和OpenType字体转换为JavaScript文件或者JSON文件，以便在网页中的JavaScript程序中直接使用。
```
## 5. 两个几何体拼接成一个新几何体
* 引入扩展库 ThreeBSP
* intersect函数  相交 （两个几何体重叠部分）
* subtract函数 相减 （在第一个几何体中 移除两个几何体重叠部分后剩余部分）
* union函数 组合 （将两个几何体连成一体 THREE.Geometry.merge也实现了这个功能）

# 八、网格
* 我们已经知道，创建一个网格需要一个几何体，以及一个或多个材质。
* 见图 网格对象的属性和方法.png
## 1. Mesh
```
  const geometry = new THREE.BoxGeometry( 1, 1, 1 );
  const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
  const mesh = new THREE.Mesh( geometry, material );
  scene.add( mesh );
```
## 2. 几何体组合与合并
### a. 组合
*注意：当三维物体被添加到组对象中后，它们自身的位置、缩放和旋转参数便都是相对于组对象的对应参数的。例如某组对象的位置参数为(10，0，0)，组内某物体的位置参数为(5，0，0)，当该组对象被直接添加到场景中时，该组内物体在场景中的位置为(15，0，0)。缩放和旋转参数与位置参数类似。
```
  sphere = createMesh(new THREE.SphereGeometry(5, 10, 10));
  cube = createMesh(new THREE.BoxGeometry(6, 6, 6));
  group.add(sphere);
  group.add(cube);
  scene.add(group);
```
### b. 合并（将多个网格合并成一个网格）
* THREE.Geometry.merge()
* 多数情况下使用组可以很容易地操纵和管理大量网格。但是当对象的数量非常多时，性能就会成为一个瓶颈。使用组，每个对象还是独立的，仍然需要对它们分别进行处理和渲染。
```
  var geometry = new THREE.Geometry();
  for (var i = 0; i < controls.numberOfObjects; i++) {
    var cubeMesh = addcube();
    cubeMesh.updateMatrix();
    geometry.merge(cubeMesh.geometry, cubeMesh.matrix);
  }
  scene.add(new THREE.Mesh(geometry, cubeMaterial));
```
## 3. 以Three.js的JSON格式保存和加载
* 你可以在两种情形下使用Three.js的JSON文件格式：用它来保存和加载单个THREE.Mesh，或者用它来保存和加载整个场景。
### a. 导出和加载THREE.Mesh
```
  <!-- 导出 -->
  var result = knot.toJSON();
  localStorage.setItem("json", JSON.stringify(result));
  <!-- 加载 -->
  var json = localStorage.getItem("json");
  if (json) {
    var loader = new THREE.ObjectLoader();
    loadedMesh = loader.parse(JSON.parse(json));
    loadedMesh.position.x -= 40;
    scene.add(loadedMesh);
  }
```
### b. 导出和加载场景（方法一样）
## 4. 导入三维格式文件
*Three.js支持大量的外部格式。使用这些格式加载器时，最好看看源码，并在回调函数中输出其接收到的信息。这将帮你理解正确获取模型网格所需的步骤，并设置正确的位置和缩放比例。如果模型不能正确显示，一般是材质设置导致的。可能是用了不兼容的纹理格式，透明度不正确，或者是该格式文件中指向纹理的连接有误。通常可以通过测试材质来检测这种错误，也可以在JavaScript控制台中输出材质信息，看看有没有比较意外的值。
```
  优先顺序
  * glTF
  *.obj, *.mtl
  *.fbx
  *.dae
```
### a. json格式
* 有很多三维软件可以用来创建复杂的网格。其中有一个流行的开源软件叫作Blender。Three.js库有一个Blender（以及Maya和3D Studio Max）导出器，可以直接将文件导出为Three.js的JSON格式。
* 见 /chapter-08/05-blender-from-json.html
### b. glTF格式
* https://www.webglstudy.com/article/1002625.html
* https://www.ai2news.com/blog/717465/
* glTF格式 （GL Transmission Format）是一种3D内容的格式标准，glTF目前最新版本为2.0已于2017年6月正式发布。相信gltf会成为3D模型界的jpg，mp3等流行主流格式。
* 一般来说gltf的模型有两类，一张是二进制压缩的glb，一种是一个主gltf格式的json说明文件+.bin的二进制数据文件。为了方便讲解我们主要讲解json+bin的文件格式。glb文件其实就是整个打包压缩成二进制文件。
```
  "buffers": [
    {
      "byteLength": 54995592,
      "uri": "scene.bin"
    }
  ],
  "images": [
    {
      "uri": "textures/Color_002.001_baseColor.png"
    }
  ]
```
### c. OBJ和MTL格式
* OBJ和MTL是相互配合的两种格式，经常一起使用。OBJ文件定义几何体，而MTL文件定义所用的材质。
### d. 加载Collada模型（文件扩展名为.dae）
* 非常通用的、用来定义场景和模型（以及动画，我们将在下一章讲述）的文件格式。Collada模型中不仅定义了几何体，也定义了材质，甚至还可以定义光源。
### e. PLY （从PLY模型中创建粒子系统）
* 见 /chapter-08/13-load-PLY.html
### f. 其他格式（还有很多）

# 九、粒子和精灵
## 1. Points 和 Sprite
* 通过THREE.Sprite，你可以非常容易地创建一组对象并在场景中移动它们。当你使用少量的对象时，这很有效.
* 但是当你想使用大量的THREE.Sprite对象时，你会很快遇到性能问题，因为每个对象需要分别由Three.js进行管理。
* Three.js提供了另一种方式来处理大量的粒子，这需要使用THREE.Points。通过THREE.Points，Three.js不再需要管理大量单个的THREE.Sprite对象，而只需管理THREE.Points实例。
* 注意1：一个THREE.Points只能有一种材质。如果要使用多个材质，那么只能使用多个THREE.Points实例
* 注意2：粒子重叠时，有时会有错误的透明效果。想要保证粒子不重叠，你将不得不自行实现排序功能，或者修改材质的alphaTest或depthWrite属性。
### a. Points
```
  var cloud = new THREE.Points(new THREE.Geometry(), new THREE.PointsMaterial());
  cloud.name = "particles";
  scene.add(cloud);
```
### b. Sprite
```
  var material = new THREE.SpriteMaterial({
    color: Math.random() * 0xffffff
  });
  var sprite = new THREE.Sprite(material);
  sprite.position.set(0,0,0);
  scene.add(sprite);
```
## 2. 使用HTML5画布样式化粒子
### a. CanvasRenderer
* Sprite SpriteCanvasMaterial
```
  function createSprites() {
    var material = new THREE.SpriteCanvasMaterial({
      program: getTexture
    });

    material.rotation = Math.PI;

    var range = 500;
    for (var i = 0; i < 1500; i++) {
      var sprite = new THREE.Sprite(material);
      sprite.position.set(Math.random() * range - range / 2, Math.random() * range - range / 2, Math.random() *
        range - range / 2);
      sprite.scale.set(0.1, 0.1, 0.1);
      scene.add(sprite);
    }
  }
```
### b. WebGLRenderer
* 在 WebGLRenderer 中使用HTML画布，可以采取两种不同的方法。
* 可以使用THREE.Points和THREE.PointsMaterial的map属性。
* 也可以使用THREE.Sprite和THREE.SpriteMaterial的map属性。
```
  <!-- 方式一 -->
  function createPoints(size, transparent, opacity, sizeAttenuation, color) {
    var geom = new THREE.Geometry();
    var material = new THREE.PointsMaterial({
      size: size,
      transparent: transparent,
      opacity: opacity,
      map: createGhostTexture(),
      sizeAttenuation: sizeAttenuation,
      color: color
    });
    var range = 500;
    for (var i = 0; i < 5000; i++) {
      var particle = new THREE.Vector3(Math.random() * range - range / 2, Math.random() * range - range / 2,
        Math.random() * range - range / 2);
      geom.vertices.push(particle);
    }
    cloud = new THREE.Points(geom, material);
    cloud.name = 'points';
    scene.add(cloud);
  }

  <!-- 方式二 -->
  function createSprites() {
    var material = new THREE.SpriteMaterial({
      map: createGhostTexture(),
      color: 0xffffff
    });
    var range = 500;
    for (var i = 0; i < 1500; i++) {
      var sprite = new THREE.Sprite(material);
      sprite.position.set(Math.random() * range - range / 2, Math.random() * range - range / 2, Math.random() *
        range - range / 2);
      sprite.scale.set(4, 4, 4);
      scene.add(sprite);
    }
  }
```
## 3. 使用一张雪碧图贴图
* 见 chapter-07/09-sprites.html
## 4. 从高级几何体创建THREE.Points
* 见 /chapter-07/11-create-particle-system-from-model.html

# 十、动画
## 1. 基础动画
* 我们可以通过改变物体的旋转、缩放、位置、材质、顶点、面以及其他你所能想到的属性来实现动画。
* 也可通过类似 Tween.js 动画库来实现
## 2. 使用摄像机
* Three.js提供了一些摄像机控件 见图 摄像机控件.png
* 都需使用 Clock 对象
### a. TrackballControls （轨迹球控制器） 常用
* 鼠标控制移动场景和缩放
```
  var trackballControls = new THREE.TrackballControls(camera);
  trackballControls.rotateSpeed = 1.0;
  trackballControls.zoomSpeed = 1.0;
  trackballControls.panSpeed = 0.1;

  var clock = new THREE.Clock();

  render();
  function render() {
    stats.update();
    trackballControls.update(clock.getDelta());
    requestAnimationFrame(render);
    renderer.render(scene, camera)
  }   
```
### b. FlyControls （飞行控制器）
* 使用FlyControls你可以实现像飞行模拟器一样在场景中飞行。
### c. FirstPersonControls （第一视角控制器）
* 你可以像第一视角射击游戏那样控制摄像机。
### d. OrbitControl（轨道控制器）
* 可以用于控制场景中的对象围绕场景中心旋转和平移 如地球
## 3. 变形动画和骨骼动画
* 待续

# 十一、公共类
## 1. THREE.Object3D 三维物体
* 这是Three.js中大部分对象的基类，提供了一系列的属性和方法来对三维空间中的物体进行操纵。
## 2. THREE.Group 组
* 它几乎和Object3D是相同的，其目的是使得组中对象在语法上的结构更加清晰。
```
  const group = new THREE.Group();
  group.add( cubeA );
  group.add( cubeB );
```
## 3. THREE.Vector3 三维向量
*  一个三维向量表示的是一个有顺序的、三个为一组的数字组合（标记为x、y和z）, 可被用来表示很多事物，例如：
*  一个位于三维空间中的点
*  一个在三维空间中的方向与长度的定义。在three.js中，长度总是从(0, 0, 0)到(x, y, z)的 Euclidean distance（欧几里德距离，即直线距离）， 方向也是从(0, 0, 0)到(x, y, z)的方向。
*  任意的、有顺序的、三个为一组的数字组合
```
  const a = new THREE.Vector3( 0, 1, 0 );
```
## 4. THREE.Vector2 二维向量
*  一个二维向量是一对有顺序的数字（标记为x和y），可用来表示很多事物，例如：
*  一个位于二维空间中的点（例如一个在平面上的点）。
*  一个在平面上的方向与长度的定义。在three.js中，长度总是从(0, 0)到(x, y)的 Euclidean distance（欧几里德距离，即直线距离）， 方向也是从(0, 0)到(x, y)的方向。
*  任意的、有顺序的一对数字。
```
  const a = new THREE.Vector2( 0, 1 );
```
## 5. THREE.Color 颜色
```
  const color1 = new THREE.Color( 0xff0000 );
  const color2 = new THREE.Color( Math.random() * 0xffffff );
  const color3 = new THREE.Color("rgb(255, 0, 0)");
  const color4 = new THREE.Color( 1, 0, 0 );
```

# 十二、辅助类
## 1. dat.GUI
* npm install --save dat.gui
* import dat from "dat.gui";
```
    var gui = new dat.GUI();
    gui.add()
    gui.addFolder()
    gui.addColor(controls, 'ambientColor').onChange(function (e) {});
```
## 2. stats.js
* npm install stats.js --save
* import Stats from "stats.js";
## 3. 辅助对象
* AxesHelper CameraHelper SpotLightHelper PointLightHelper 等等
## 4. 音频
* AudioListener 用一个虚拟的listener表示在场景中所有的位置和非位置相关的音效
### a. Audio 全局音频
```
  const listener = new THREE.AudioListener();
  camera.add( listener );

  // 创建一个全局audio对象
  const sound = new THREE.Audio( listener );

  const audioLoader = new THREE.AudioLoader();
  audioLoader.load( 'sounds/ambient.ogg', function( buffer ) {
    sound.setBuffer( buffer );
    sound.setLoop(true);
    sound.setVolume(0.5);
    sound.play();
  });
```
### b. PositionalAudio 和位置相关的音频对象
```
  const listener = new THREE.AudioListener();
  camera.add( listener );

  // 创建一个位置相关的音频对象
  const sound = new THREE.PositionalAudio( listener );

  const audioLoader = new THREE.AudioLoader();
  audioLoader.load( 'sounds/song.ogg', function( buffer ) {
    sound.setBuffer( buffer );
    sound.setLoop(true);
    sound.setRefDistance( 30 ); // 该属性指定声音从距离声源多远的位置开始衰减其音量。
    sound.setRolloffFactor(10); // 该属性指定声源音量随着距离衰减的速度。
    sound.play();
  });
```

# 待续
# 1.三维软件（创建复杂的网格）
* Blender
# 2.后期处理
* 景深效果 使得仅有一部分场景处于聚焦范围内，从而可以获得清晰的图像，而其他部分场景则变得模糊。
# 3.自定义着色器
# 4.添加物理效果