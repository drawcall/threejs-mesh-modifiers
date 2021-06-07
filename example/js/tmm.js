(function() {
  var modifier, prevMod;
  var noise, cloth, twist, taper, bloat, breaks, userDefined;

  function addModifier(mesh) {
    modifier = new ModifierStack(mesh);

    noise = new Noise(0);
    noise.frc = 15;

    cloth = new Cloth(1, 0);
    cloth.setForce(0.2, -0.2, -0.2);

    twist = new Twist(0);
    twist.vector = new Vector3(0, 1, 0);

    taper = new Taper(2);
    taper.setFalloff(0.2, 0.5);

    bloat = new Bloat();
    bloat.center = mesh.position.clone();
    bloat.center.y += 100;
    bloat.radius = 200;

    breaks = new Break(0.7, 5);

    var angle = 0;
    userDefined = new UserDefined();
    userDefined.renderVector = function(vec, i, length) {
      var radius = 10;
      vec.setValue(ModConstant.Z, vec.z + Math.sin(i * 0.2 + angle) * radius);
      vec.setValue(ModConstant.Y, vec.y + Math.sin(i * 0.2 + angle) * radius);
    };
    userDefined.addEventListener("CHANGE", function() {
      angle += 0.2;
    });

    changeModifier(noise);

    return modifier;
  }

  function changeModifier(mod) {
    if (prevMod) {
      modifier.removeModifier(prevMod);
      TweenMax.killTweensOf(prevMod);
    }

    modifier.addModifier(mod);
    prevMod = mod;
  }

  function initGUI() {
    var params = {
      Noise: function() {
        changeModifier(noise);
        noise.frc = 15;
        TweenMax.to(noise, 0.2, {
          frc: 50,
          delay: 0.5,
          yoyo: true,
          repeat: 4,
          onComplete: function() {
            noise.frc = 15;
          }
        });
      },
      Cloth: function() {
        modifier.reset();
        changeModifier(cloth);
        cloth.lockXMin(0.15);
        cloth.lockYMin(1 - 0.15);
        cloth.lockZMin(1 - 0.15);
      },
      Twist: function() {
        changeModifier(twist);
        TweenMax.fromTo(
          twist,
          2,
          { angle: -Math.PI / 2 },
          {
            angle: Math.PI / 2,
            ease: Cubic.easeInOut,
            yoyo: true,
            repeat: 999
          }
        );
      },
      Taper: function() {
        changeModifier(taper);
        TweenMax.fromTo(
          taper,
          1,
          {
            frc: 0
          },
          {
            frc: 1,
            ease: Back.easeInOut,
            yoyo: true,
            repeat: 999
          }
        );
      },
      Bloat: function() {
        changeModifier(bloat);
        TweenMax.fromTo(
          bloat,
          1,
          {
            radius: 0
          },
          {
            radius: 200,
            yoyo: true,
            repeat: 999
          }
        );
      },
      Break: function() {
        changeModifier(breaks);
        TweenMax.fromTo(
          breaks,
          1,
          {
            angle: -Math.PI / 3
          },
          {
            angle: Math.PI / 3,
            ease: Cubic.easeInOut,
            yoyo: true,
            repeat: 999
          }
        );
      },
      UserDefined: function() {
        changeModifier(userDefined);
      },
      computeNormals: false
    };

    var gui = new dat.GUI();
    gui.add(params, "Noise");
    gui.add(params, "Twist");
    gui.add(params, "Taper");
    gui.add(params, "Bloat");
    gui.add(params, "Break");
    gui.add(params, "Cloth");
    gui.add(params, "UserDefined");
    return gui;
  }

  window.addModifier = addModifier;
  window.initGUI = initGUI;
})();
