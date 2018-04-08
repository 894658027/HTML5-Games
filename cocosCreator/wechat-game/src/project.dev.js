require = function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var a = "function" == typeof require && require;
        if (!u && a) return a(o, !0);
        if (i) return i(o, !0);
        var f = new Error("Cannot find module '" + o + "'");
        throw f.code = "MODULE_NOT_FOUND", f;
      }
      var l = n[o] = {
        exports: {}
      };
      t[o][0].call(l.exports, function(e) {
        var n = t[o][1][e];
        return s(n || e);
      }, l, l.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  var i = "function" == typeof require && require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
}({
  game_01: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "fa36aY0wmVCaYgCQih/CC1E", "game_01");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        hero: cc.Node,
        isCompleted: true,
        isCompleteds: true,
        panner: cc.Node
      },
      onLoad: function onLoad() {
        var getScaleHero;
        this.gameInit();
      },
      gameInit: function gameInit() {
        var _this = this;
        this.hero.on("touchstart", function(ev) {
          var finished = cc.callFunc(function(ev) {
            _this.panner.runAction(cc.moveTo(2, cc.p(-400, 0)).easing(cc.easeInOut(3)));
            console.log(2);
          }, _this);
          if (_this.isCompleted) {
            _this.isCompleted = false;
            _this.hero.runAction(cc.spawn(cc.scaleTo(1, 2, 2), cc.scaleTo(1, 8, 8), finished));
            _this.otherHero = cc.find("Canvas/heroGloup");
            _this.otherHero.opacity = 0;
            console.log(1);
          }
        }, this);
        this.rotateAction();
      },
      rotateAction: function rotateAction() {
        var _this2 = this;
        this.getScaleHero = cc.find("Canvas/heroGloup/2");
        this.getScaleHero.on("touchstart", function(ev) {
          _this2.getScaleHero.runAction(cc.spawn(cc.scaleBy(.5, 1), cc.scaleBy(.5, -1, 1))).repeatForever();
        });
        var getRunBtn = cc.find("Canvas/heroGloup/stopBtn");
        getRunBtn.on("touchstart", function(ev) {
          console.log(1);
          _this2.getScaleHero.stopAllActions();
        });
      }
    });
    cc._RF.pop();
  }, {} ],
  "hero-control": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "97361ccBcJPcpmSkpqcWy03", "hero-control");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        cameraNode: cc.Node,
        speed: 0,
        plane: {
          default: null,
          type: cc.Node
        },
        panner: cc.Node,
        mvvm: cc.Node
      },
      setInputControl: function setInputControl() {
        this.schedule(function() {
          var _this = this;
          this.camer = this.cameraNode.getComponent(cc.Camera);
          this.camer.zoomRatio = this.camer.zoomRatio + 2;
          console.log(this.camer.zoomRatio);
          if (9 == this.camer.zoomRatio) {
            this.camer.zoomRatio = 9;
            this.unscheduleAllCallbacks();
            this.plane.on("touchstart", function(ev) {
              _this.panner.runAction(cc.moveTo(2, cc.p(-700, 0)).easing(cc.easeInOut(3)));
            });
          }
        }, .5);
        var self = this;
        var listener = {
          event: cc.EventListener.KEYBOARD,
          onKeyPressed: function onKeyPressed(keyCode, event) {
            switch (keyCode) {
             case cc.KEY.a:
              self.accLeft = true;
              break;

             case cc.KEY.d:
              self.accRight = true;
              break;

             case cc.KEY.w:
              self.accUp = true;
              break;

             case cc.KEY.s:
              self.accDown = true;
            }
          },
          onKeyReleased: function onKeyReleased(keyCode, event) {
            switch (keyCode) {
             case cc.KEY.a:
              self.accLeft = false;
              break;

             case cc.KEY.d:
              self.accRight = false;
              break;

             case cc.KEY.w:
              self.accUp = false;
              break;

             case cc.KEY.s:
              self.accDown = false;
            }
          }
        };
        cc.eventManager.addListener(listener, self.node);
      },
      onLoad: function onLoad() {
        this.accLeft = false;
        this.accRight = false;
        this.accUp = false;
        this.accDown = false;
        var camer;
        this.setInputControl();
        this.clickMvvm();
      },
      clickMvvm: function clickMvvm() {
        var _this2 = this;
        this.mvvm.on("touchstart", function(ev) {
          _this2.camer.zoomRatio = 1;
          console.log(1);
        });
      },
      update: function update(dt) {
        this.accLeft && (this.plane.x -= this.speed);
        this.accRight && (this.plane.x += this.speed);
        this.accUp && (this.plane.y += this.speed);
        this.accDown && (this.plane.y -= this.speed);
      }
    });
    cc._RF.pop();
  }, {} ]
}, {}, [ "game_01", "hero-control" ]);