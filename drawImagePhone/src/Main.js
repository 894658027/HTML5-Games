//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        _super.call(this);
        this.sourceMaskHeight = 0;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var d = __define,c=Main,p=c.prototype;
    p.onAddToStage = function (event) {
        ls.GameUILayer.init(this.stage);
        this.onPreResourceLoad();
    };
    /**
     * 预加载资源
     */
    p.onPreResourceLoad = function () {
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/resource.json", "resource/");
    };
    //配置加载完成
    p.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        var groups = RES.getGroupByName("preload");
        if (groups == null || groups.length == 0) {
            this.onMergeResourceLoad();
        }
        else {
            //开始加载组
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onPreloadGroupComplete, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onPreloadGroupError, this);
            RES.loadGroup("preload");
        }
    };
    //预览图标加载完成    
    p.onPreloadGroupComplete = function (event) {
        if (event.groupName == "preload") {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onPreloadGroupComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onPreloadGroupError, this);
            //开始图标渲染            
            this.onPreloadRender();
        }
    };
    p.onPreloadRender = function () {
        var stageW = ls.GameUILayer.stage.stageWidth;
        var stageH = ls.GameUILayer.stage.stageHeight;
        this.preIcon = new egret.Bitmap();
        var preTexture = RES.getRes("egretIcon");
        this.preIcon.texture = preTexture;
        //缩小为40%
        var scaleRate = 0.4;
        var stageScale = stageW / stageH;
        var preIconScale = preTexture.textureWidth / preTexture.textureHeight;
        var realScale;
        if (stageScale > preIconScale)
            realScale = scaleRate * stageH / preTexture.textureHeight; //以高度为准
        else
            realScale = scaleRate * stageW / preTexture.textureWidth; //以宽度为准
        this.preIcon.width = realScale * preTexture.textureWidth;
        this.preIcon.height = realScale * preTexture.textureHeight;
        this.preIcon.x = (stageW - this.preIcon.width) >> 1;
        this.preIcon.y = ((stageH - this.preIcon.height) >> 1) - 30;
        ls.GameUILayer.preContainer.addChild(this.preIcon);
        this.preIconMask = new egret.Bitmap();
        this.preIconMask.texture = RES.getRes("egretIcon");
        this.preIconMask.width = this.preIcon.width;
        this.preIconMask.height = this.preIcon.height;
        this.preIconMask.x = this.preIcon.x;
        this.preIconMask.y = this.preIcon.y;
        ls.GameUILayer.preContainer.addChild(this.preIconMask);
        this.beMaskShape = new egret.Shape();
        this.beMaskShape.graphics.beginFill(0x32d0d9);
        this.beMaskShape.graphics.drawRect(0, 0, this.preIconMask.width, 1);
        this.beMaskShape.graphics.endFill();
        this.beMaskShape.x = this.preIconMask.x;
        this.beMaskShape.y = this.preIconMask.y;
        this.sourceMaskHeight = this.preIconMask.height;
        ls.GameUILayer.preContainer.addChild(this.beMaskShape);
        this.beMaskShape.mask = this.preIconMask;
        var limitGroups = RES.getGroupByName("limit");
        this.isHasLimitResource = !(limitGroups == null || limitGroups.length == 0);
        this.onMergeResourceLoad();
    };
    //预加载图标加载错误    
    p.onPreloadGroupError = function (event) {
        if (event.groupName == "preload") {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onPreloadGroupComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onPreloadGroupError, this);
            this.onMergeResourceLoad();
        }
    };
    //加载合并的位图    
    p.onMergeResourceLoad = function () {
        var groups = RES.getGroupByName("resourceMerge");
        if (groups == null || groups.length == 0) {
            //加载限制大小组
            if (!this.onLimitResourceLoad()) {
                //启动
                this.onStart();
            }
        }
        else {
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onMergeResourceLoadComplete, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onMergeResourceLoadError, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onMergeResourceProgress, this);
            RES.loadGroup("resourceMerge");
        }
    };
    p.onMergeResourceLoadComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onMergeResourceLoadComplete, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onMergeResourceLoadError, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onMergeResourceProgress, this);
        var groups = RES.getGroupByName("resourceMerge");
        if (groups == null || groups.length == 0)
            return;
        for (var i = 0; i < groups.length; i++) {
            var resourceItem = groups[i];
            if (resourceItem.type == "json") {
                var jsonData = RES.getRes(resourceItem.name);
                var imageFile = jsonData.file;
                var imageTexture = RES.getRes(imageFile);
                this.decodeMerge(jsonData, imageTexture);
            }
        }
        //加载限制大小组
        if (!this.onLimitResourceLoad()) {
            //启动
            this.onStart();
        }
    };
    p.decodeMerge = function (json, texture) {
        if (json && texture) {
            var spriteSheetFrames = json.frames;
            var spritesheet = new egret.SpriteSheet(texture);
            for (var key in spriteSheetFrames) {
                var spriteObject = spriteSheetFrames[key];
                var itemTexture = spritesheet.createTexture(key, spriteObject.x, spriteObject.y, spriteObject.sourceW, spriteObject.sourceH, spriteObject.offX, spriteObject.offY);
                ls.LayoutDecoder.spriteSheetDatas["resource/userAsset/" + key] = { offsetX: spriteObject.offX, offsetY: spriteObject.offY, texture: itemTexture };
            }
        }
    };
    p.onMergeResourceLoadError = function (event) {
        //加载限制大小组
        if (!this.onLimitResourceLoad()) {
            //启动
            this.onStart();
        }
    };
    p.onMergeResourceProgress = function (event) {
        this.updateMask(event.itemsLoaded, event.itemsTotal, 0);
    };
    p.updateMask = function (itemsLoaded, itemsTotal, type) {
        if (this.beMaskShape) {
            this.beMaskShape.graphics.clear();
            this.beMaskShape.graphics.beginFill(0x32d0d9);
            if (type == 0) {
                if (this.isHasLimitResource)
                    this.beMaskShape.graphics.drawRect(0, 0, this.preIconMask.width, itemsLoaded / itemsTotal * this.sourceMaskHeight * 0.7);
                else
                    this.beMaskShape.graphics.drawRect(0, 0, this.preIconMask.width, itemsLoaded / itemsTotal * this.sourceMaskHeight);
            }
            else {
                this.beMaskShape.graphics.drawRect(0, 0, this.preIconMask.width, (itemsLoaded / itemsTotal + 0.7) * this.sourceMaskHeight);
            }
            this.beMaskShape.graphics.endFill();
        }
    };
    p.onLimitResourceLoad = function () {
        var groups = RES.getGroupByName("limit");
        if (groups == null || groups.length == 0)
            return false;
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onLimitResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onLimitResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onLimitResourceProgress, this);
        RES.loadGroup("limit");
        return true;
    };
    p.onLimitResourceLoadComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onLimitResourceLoadComplete, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onLimitResourceLoadError, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onLimitResourceProgress, this);
        var groups = RES.getGroupByName("limit");
        if (groups == null || groups.length == 0)
            return;
        for (var i = 0; i < groups.length; i++) {
            var resourceItem = groups[i];
            var imageTexture = RES.getRes(resourceItem.name);
            ls.LayoutDecoder.spriteSheetDatas["resource/userAsset/" + resourceItem.name] = { offsetX: 0, offsetY: 0, texture: imageTexture };
        }
        //启动
        this.onStart();
    };
    p.onLimitResourceLoadError = function (event) {
        this.onStart();
    };
    p.onLimitResourceProgress = function (event) {
        this.updateMask(event.itemsLoaded, event.itemsTotal, 1);
    };
    p.onStart = function () {
        ls.GameUILayer.preContainer.alpha = 1;
        var self = this;
        var tween = egret.Tween.get(ls.GameUILayer.preContainer);
        tween.wait(500);
        tween.to({ "alpha": 0 }, 250).call(function () {
            if (ls.GameUILayer.preContainer.parent)
                ls.GameUILayer.preContainer.parent.removeChild(ls.GameUILayer.preContainer);
            ls.StartUp.execute(self);
        });
    };
    return Main;
}(egret.DisplayObjectContainer));
egret.registerClass(Main,'Main');
//# sourceMappingURL=Main.js.map