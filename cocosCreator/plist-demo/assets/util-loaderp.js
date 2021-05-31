/**
 * Extends cc with loaderp (promisified loader)
 */
if (cc && cc.loader) {
  const loader = cc.loader;
  const loaderp = cc.loaderp = {};

  var promisify = function (method) {
    return function (...args) {
      return new Promise((rs, rj) => {
        args.push((err, data) => {
          if (err) {
            rj(err);
          } else {
            rs(data);
          }
        });
        loader[method].apply(loader, args)
      })
    };
  };

  /**
   * Promisified cc.loader.loadRes
   */
  loaderp.loadRes = promisify('loadRes');

  /**
   * Promisified cc.loader.load
   */
  loaderp.load = promisify('load')

  /**
   * Load multiple resource
   * const resources = [
   *  ['atlas', cc.SpriteAtlas],
   *  ['json']
   * ];
   * cc.loaderp.loadResAll(resources).then(([atlas, json]) => {
   *   this.atlas = atlas;
   *   this.json = json;
   * })
   */
  loaderp.loadResAll = function (paramArray) {
    const promises = paramArray.map(args => cc.loaderp.loadRes.apply(cc.loaderp, args));
    return Promise.all(promises);
  };

  loaderp.loadAll = function (paramArray) {
    const promises = paramArray.map(args => cc.loaderp.load.apply(cc.loaderp, args));
    return Promise.all(promises);
  };

  /**
   * Load sprite atalas from remote url
   * @param  {String} url, url without extension
   * @return {Promise}
   */
  loaderp.loadAtalas = function (url1,url2) {
    return this.loadAll([[url1], [url2]]).then(([plist, texture]) => {
      if (!plist || !plist.frames) return;

      // create sprite frames from plist and texture
      const spriteFrames = {}
      for (let name in plist.frames) {
        let frame = plist.frames[name];
        let rect = plistArrayToCcType(frame.frame, cc.Rect);
        let offset = plistArrayToCcType(frame.offset, cc.Vec2);
        let originalSize = plistArrayToCcType(frame.sourceSize, cc.size);

        const spriteFrame = new cc.SpriteFrame();
        spriteFrame.name = name;
        spriteFrame.setTexture(texture, rect, frame.rotated, offset, originalSize);
        spriteFrames[name] = spriteFrame;
      }
      return spriteFrames;
    })
  };

  /**
   * Convert {x,y}, {{x,y}, {width, height}} to cc types (cc.Rect, cc.size, cc.Vec2, etc.)
   * @param  {String} plistArrayStr
   * @param  {Function} ctor
   * @return {Object}
   */
  const plistArrayToCcType = function plistArrayToCcType (plistArrayStr, ctor) {
    const ary = plistArrayStr.replace(/[^0-9,]/g, '').split(',').map(x => parseInt(x, 10));
    return new ctor(...ary);
  }
}