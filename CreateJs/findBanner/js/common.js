var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var babyEye = {};
function anTarget(bg, lazy, glasses) {
    return bg ^ lazy ^ glasses;
}

function steInOut(bg, target, glasses) {
    return bg ^ target ^ glasses;
}

babyEye.average = function (arr) {
    var l = arr.length;
    var sum = arr.reduce(function (x, y) {
        return x + y;
    }, 0);
    return sum / l;
};

babyEye.distance = function (x1, y1, x2, y2) {
    var dx = Math.abs(x1 - x2);
    var dy = Math.abs(y1 - y2);
    return Math.sqrt(dx * dx + dy * dy);
};

babyEye.disSquare = function (x1, y1, x2, y2) {
    return Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2);
};

babyEye.randomRange = function (low, high) {
    return Math.floor(low + Math.random() * (high - low));
};

babyEye.randomExcept = function (low, high, except) {
    var result = babyEye.randomRange(low, high);
    return result == except ? babyEye.randomExcept(low, high, except) : result;
};

babyEye.shuffle = function (arr) {
    var i = 0;
    while (i < arr.length) {
        var j = babyEye.randomRange(0, i);
        var temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
        i++;
    }
};
//([1,2,3,4,5], 2) -> [[1,2],[3,4],[5]];
babyEye.bundle = function (arr, n) {
    var result = [];
    for (var i = 0; i < arr.length; i = i + n) {
        result.push(arr.slice(i, i + n));
    }
    return result;
};

babyEye.reversed = function (arr) {
    var result = [];
    for (var i = arr.length - 1; i >= 0; i--) {
        result.push(arr[i]);
    }
    return result;
};

babyEye.inRange = function (point, range) {
    return range[0] < point && point < range[1];
};

//new ImageSTE({image:xxx, colors:["red","blue"], delta:10}) -> image;

var ImageSTE = function ImageSTE(config) {
    _classCallCheck(this, ImageSTE);

    if (config.colors.indexOf("r") == -1 || config.colors.indexOf("gb") == -1) return;
    var img = config.image;
    var colors = config.colors;
    var delta = config.delta;
    var canvas = document.getElementById("img-canvas");
    canvas.width = img.width + delta;
    canvas.height = img.height;

    var ctx = canvas.getContext('2d');
    ctx.fillStyle = "rgba(0,0,0,0)";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, colors[0] == "r" ? 0 : delta, 0);
    var imageDataLeft = ctx.getImageData(0, 0, img.width + delta, img.height);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(img, colors[0] == "r" ? delta : 0, 0);
    var imageDataRight = ctx.getImageData(0, 0, img.width + delta, img.height);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    var result = ctx.createImageData(img.width + delta, img.height);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    var dataLength = imageDataRight.data.length;
    for (var i = 0; i < dataLength; i += 4) {
        imageDataRight.data[i] = 0;
    }

    for (var _i = 0; _i < dataLength; _i += 4) {
        imageDataLeft.data[_i + 1] = 0;
        imageDataLeft.data[_i + 2] = 0;
    }

    for (var _i2 = 0; _i2 < dataLength; _i2 += 4) {
        result.data[_i2] = imageDataLeft.data[_i2];
        result.data[_i2 + 1] = imageDataRight.data[_i2 + 1];
        result.data[_i2 + 2] = imageDataRight.data[_i2 + 2];
        result.data[_i2 + 3] = imageDataRight.data[_i2 + 3] + imageDataLeft.data[_i2 + 3];
    }
    ctx.putImageData(result, 0, 0);

    var imgDom = document.createElement("img");
    imgDom.src = canvas.toDataURL("image/png");
    imgDom.width = img.width + delta;
    imgDom.height = img.height;
    return imgDom;
};

//只取中间像素


var ImageMidSTE = function ImageMidSTE(config) {
    _classCallCheck(this, ImageMidSTE);

    if (config.colors.indexOf("r") == -1 || config.colors.indexOf("gb") == -1) return;
    var img = config.image;
    var colors = config.colors;
    var delta = config.delta;
    var canvas = document.getElementById("img-canvas");
    canvas.width = img.width + delta;
    canvas.height = img.height;

    var ctx = canvas.getContext('2d');
    ctx.fillStyle = "rgba(0,0,0,0)";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, colors[0] == "r" ? 0 : delta, 0);
    var imageDataLeft = ctx.getImageData(0, 0, img.width + delta, img.height);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(img, colors[0] == "r" ? delta : 0, 0);
    var imageDataRight = ctx.getImageData(0, 0, img.width + delta, img.height);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    var result = ctx.createImageData(img.width + delta, img.height);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    var dataLength = imageDataRight.data.length;
    for (var i = 0; i < dataLength; i += 4) {
        imageDataRight.data[i] = 0;
    }

    for (var _i3 = 0; _i3 < dataLength; _i3 += 4) {
        imageDataLeft.data[_i3 + 1] = 0;
        imageDataLeft.data[_i3 + 2] = 0;
    }

    for (var _i4 = 0; _i4 < dataLength; _i4 += 4) {
        result.data[_i4] = imageDataLeft.data[_i4];
        result.data[_i4 + 1] = imageDataRight.data[_i4 + 1];
        result.data[_i4 + 2] = imageDataRight.data[_i4 + 2];
        result.data[_i4 + 3] = imageDataRight.data[_i4 + 3] && imageDataLeft.data[_i4 + 3];
    }
    ctx.putImageData(result, 0, 0);

    var imgDom = document.createElement("img");
    imgDom.src = canvas.toDataURL("image/png");
    imgDom.width = img.width + delta;
    imgDom.height = img.height;
    return imgDom;
};

var FilteredImg = function () {
    function FilteredImg(imgElement, filters) {
        _classCallCheck(this, FilteredImg);

        this.img = imgElement;
        this.filters = filters;
        this.canvas = document.getElementById("img-canvas");
        this.stage = new c.Stage("img-canvas");
        c.Touch.enable(this.stage);
        this.buildWorld();
    }

    _createClass(FilteredImg, [{
        key: "buildWorld",
        value: function buildWorld() {
            this.bitmap = new c.Bitmap(this.img);
            this.bitmap.filters = this.filters;
            this.bitmap.cache(0, 0, this.bitmap.image.width, this.bitmap.image.height);
            this.stage.addChild(this.bitmap);

            this.canvas.width = this.bitmap.image.width;
            this.canvas.height = this.bitmap.image.height;
            this.stage.update();

            var img = document.createElement("img"); // Create an <img> element
            img.src = this.canvas.toDataURL(); // Set its src attribute
            this.img = img;
        }
    }, {
        key: "getImg",
        value: function getImg() {
            return this.img;
        }
    }]);

    return FilteredImg;
}();

var MinPQ = function () {
    function MinPQ(compare) {
        _classCallCheck(this, MinPQ);

        this.compare = compare;
        this.size = 0;
        this.pq = [null];
    }

    _createClass(MinPQ, [{
        key: "min",
        value: function min() {
            return this.pq[1];
        }
    }, {
        key: "insert",
        value: function insert(obj) {
            this.size++;
            this.pq.push(obj);
            this.swim(this.size);
            return this.size;
        }
    }, {
        key: "delMin",
        value: function delMin() {
            var min = this.pq[1];
            this.exch(this.size, 1);
            this.size--;
            this.pq.length = this.size + 1;
            this.sink(1);
            return min;
        }
    }, {
        key: "swim",
        value: function swim(k) {
            while (k > 1 && this.more(this.divideInt(k, 2), k)) {
                var j = this.divideInt(k, 2);
                this.exch(j, k);
                k = j;
            }
        }
    }, {
        key: "sink",
        value: function sink(k) {
            while (2 * k <= this.size) {
                var j = 2 * k;
                if (this.pq[j + 1] && this.more(j, j + 1)) {
                    j++;
                }
                if (!this.more(k, j)) {
                    break;
                }
                this.exch(k, j);
                k = j;
            }
        }
    }, {
        key: "more",
        value: function more(k1, k2) {
            return this.compare(this.pq[k1], this.pq[k2]) > 0;
        }
    }, {
        key: "divideInt",
        value: function divideInt(n1, n2) {
            return Math.floor(n1 / n2);
        }
    }, {
        key: "exch",
        value: function exch(k1, k2) {
            var temp = this.pq[k1];
            this.pq[k1] = this.pq[k2];
            this.pq[k2] = temp;
        }
    }, {
        key: "reveal",
        value: function reveal() {
            return this.pq;
        }
    }, {
        key: "isMinPQ",
        value: function isMinPQ() {
            var arr = this.reveal();
            for (var i = 1; i * 2 + 1 <= this.size; i++) {
                if (arr[i] <= arr[2 * i] && arr[i] <= arr[2 * i + 1]) {
                    continue;
                } else {
                    return false;
                }
            }
            return true;
        }
    }]);

    return MinPQ;
}();

window.handleResize = function () {
    if (window.innerWidth < window.innerHeight * 1024 / 768) {
        $("#game-canvas").css({
            "height": "auto",
            "width": "99vw"
        });
    } else {
        $("#game-canvas").css({
            "height": "99vh",
            "width": "auto"
        });
    };
};

window.addEventListener('resize', handleResize, false);
window.handleResize();