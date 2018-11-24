define("Shared/Point", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var Point = (function () {
        function Point(X, Y, Z) {
            this.x = X;
            this.y = Y;
            this.z = Z;
        }
        return Point;
    }());
    exports.Point = Point;
});
define("Shared/Degree", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var Degree = (function () {
        function Degree(d) {
            this.Radian = function () {
                return this.Value * Math.PI / 180;
            };
            this.Value = d;
        }
        return Degree;
    }());
    exports.Degree = Degree;
});
define("Shared/Angle", ["require", "exports", "Shared/Degree"], function (require, exports, Degree_1) {
    "use strict";
    exports.__esModule = true;
    var Angle = (function () {
        function Angle(a, b, g) {
            this.alpha = new Degree_1.Degree(a);
            this.beta = new Degree_1.Degree(b);
            this.gamma = new Degree_1.Degree(g);
        }
        return Angle;
    }());
    exports.Angle = Angle;
});
define("Shared/Scale", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var Scale = (function () {
        function Scale(xS, yS, zS) {
            this.xScale = xS;
            this.yScale = yS;
            this.zScale = zS;
        }
        return Scale;
    }());
    exports.Scale = Scale;
});
define("Shared/Transformation", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var Transformation = (function () {
        function Transformation(translate, rotate, skew, zoom) {
            this.Translation = translate;
            this.Rotation = rotate;
            this.Skewness = skew;
            this.Zoom = zoom;
        }
        return Transformation;
    }());
    exports.Transformation = Transformation;
});
define("Shared/Color", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var Color = (function () {
        function Color(r, g, b, a) {
            if (a === void 0) { a = 1; }
            this.red = r;
            this.green = g;
            this.blue = b;
            this.alpha = a;
        }
        return Color;
    }());
    exports.Color = Color;
});
define("Shared/Plane", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var Plane = (function () {
        function Plane(pts, color) {
            this.Points = pts;
            this.Color = color;
        }
        return Plane;
    }());
    exports.Plane = Plane;
});
define("Interfaces/IShape", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
});
define("Shapes/Polygon", ["require", "exports", "Shared/Point", "Shared/Plane", "Shared/Angle"], function (require, exports, Point_1, Plane_1, Angle_1) {
    "use strict";
    exports.__esModule = true;
    var Polygon = (function () {
        function Polygon(sides, a, b, h, color, tAng, bAng) {
            if (tAng === void 0) { tAng = new Angle_1.Angle(0, 0, 0); }
            if (bAng === void 0) { bAng = new Angle_1.Angle(0, 0, 0); }
            this.Planes = function () {
                var planes = new Array();
                var theta = Math.PI * (1 / 2 - 1 / this.SidesCount);
                var R = this.A / 2 * 1 / Math.cos(theta);
                var topFacePoints = new Array();
                var bottomFacePoints = new Array();
                var origin = new Point_1.Point(0, 0, 0);
                for (var sideIdx = 0; sideIdx < this.SidesCount; sideIdx++) {
                    var topPt = new Point_1.Point(origin.x + R * Math.cos(sideIdx * theta), origin.y + this.H, origin.z + Math.sin(sideIdx * theta));
                    var pt = new Point_1.Point(origin.x + R * Math.cos(sideIdx * theta), origin.y, origin.z + Math.sin(sideIdx * theta));
                    topFacePoints[sideIdx] = topPt;
                    bottomFacePoints[sideIdx] = pt;
                }
                planes[planes.length] = new Plane_1.Plane(topFacePoints, this.Color);
                planes[planes.length] = new Plane_1.Plane(bottomFacePoints, this.Color);
                for (var sideIdx = 0; sideIdx < this.SidesCount; sideIdx++) {
                    var facePoints = new Array();
                    var idx1 = sideIdx;
                    var idx2 = ((sideIdx + 1) == this.SidesCount - 1) ? 0 : sideIdx + 1;
                    facePoints =
                        [
                            topFacePoints[idx1],
                            topFacePoints[idx2],
                            bottomFacePoints[idx1],
                            bottomFacePoints[idx2]
                        ];
                    planes[planes.length] = new Plane_1.Plane(facePoints, this.Color);
                }
                return planes;
            };
            this.SidesCount = sides;
            this.A = a;
            this.B = b;
            this.H = h;
            this.Color = color;
            this.TopFaceInclination = tAng;
            this.BottomFaceInclination = bAng;
        }
        return Polygon;
    }());
    exports.Polygon = Polygon;
});
