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
            this.red = r / 255;
            this.green = g / 255;
            this.blue = b / 255;
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
define("Shapes/Cube", ["require", "exports", "Shared/Point", "Shared/Plane"], function (require, exports, Point_1, Plane_1) {
    "use strict";
    exports.__esModule = true;
    var Cube = (function () {
        function Cube(l, w, h, clr) {
            this.Planes = function () {
                var planes = new Array();
                var topFacePoints = new Array();
                var bottomFacePoints = new Array();
                var origin = this.Transformation != null && this.Transformation.Translation != null ? this.Transformation.Translation : new Point_1.Point(0, 0, 0);
                topFacePoints = [
                    new Point_1.Point(origin.x, origin.y, origin.z),
                    new Point_1.Point(origin.x + this.L, origin.y, origin.z),
                    new Point_1.Point(origin.x + this.L, origin.y, origin.z + this.W),
                    new Point_1.Point(origin.x, origin.y, origin.z + this.W)
                ];
                bottomFacePoints = [
                    new Point_1.Point(origin.x, origin.y + this.H, origin.z),
                    new Point_1.Point(origin.x + this.L, origin.y + this.H, origin.z),
                    new Point_1.Point(origin.x + this.L, origin.y + this.H, origin.z + this.W),
                    new Point_1.Point(origin.x, origin.y + this.H, origin.z + this.W)
                ];
                planes[planes.length] = new Plane_1.Plane(topFacePoints, this.Color);
                planes[planes.length] = new Plane_1.Plane(bottomFacePoints, this.Color);
                for (var sideIdx = 0; sideIdx < 4; sideIdx++) {
                    var facePoints = new Array();
                    var idx1 = sideIdx;
                    var idx2 = ((sideIdx + 1) == 4) ? 0 : sideIdx + 1;
                    facePoints =
                        [
                            topFacePoints[idx1],
                            topFacePoints[idx2],
                            bottomFacePoints[idx2],
                            bottomFacePoints[idx1]
                        ];
                    planes[planes.length] = new Plane_1.Plane(facePoints, this.Color);
                }
                return planes;
            };
            this.L = l;
            this.W = w;
            this.H = h;
            this.Color = clr;
        }
        return Cube;
    }());
    exports.Cube = Cube;
});
define("Shapes/Polygon", ["require", "exports", "Shared/Point", "Shared/Plane", "Shared/Angle"], function (require, exports, Point_2, Plane_2, Angle_1) {
    "use strict";
    exports.__esModule = true;
    var Polygon = (function () {
        function Polygon(sides, a, b, h, color, tAng, bAng) {
            if (tAng === void 0) { tAng = new Angle_1.Angle(0, 0, 0); }
            if (bAng === void 0) { bAng = new Angle_1.Angle(0, 0, 0); }
            this.Planes = function () {
                var planes = new Array();
                var theta = Math.PI * (1 / 2 - 1 / this.SidesCount);
                var R1 = this.A / 2 * 1 / Math.cos(theta);
                var R2 = this.B / 2 * 1 / Math.cos(theta);
                var alpha = 2 * Math.PI / this.SidesCount;
                var topFacePoints = new Array();
                var bottomFacePoints = new Array();
                var origin = this.Transformation != null && this.Transformation.Translation != null ? this.Transformation.Translation : new Point_2.Point(0, 0, 0);
                for (var sideIdx = 0; sideIdx < this.SidesCount; sideIdx++) {
                    var topPt = new Point_2.Point(origin.x + R1 * Math.cos(sideIdx * alpha), origin.y + this.H, origin.z + R1 * Math.sin(sideIdx * alpha));
                    var pt = new Point_2.Point(origin.x + R2 * Math.cos(sideIdx * alpha), origin.y, origin.z + R2 * Math.sin(sideIdx * alpha));
                    topFacePoints[sideIdx] = topPt;
                    bottomFacePoints[sideIdx] = pt;
                }
                planes[planes.length] = new Plane_2.Plane(topFacePoints, this.Color);
                planes[planes.length] = new Plane_2.Plane(bottomFacePoints, this.Color);
                for (var sideIdx = 0; sideIdx < this.SidesCount; sideIdx++) {
                    var facePoints = new Array();
                    var idx1 = sideIdx;
                    var idx2 = ((sideIdx + 1) == this.SidesCount) ? 0 : sideIdx + 1;
                    facePoints =
                        [
                            topFacePoints[idx1],
                            topFacePoints[idx2],
                            bottomFacePoints[idx2],
                            bottomFacePoints[idx1]
                        ];
                    planes[planes.length] = new Plane_2.Plane(facePoints, this.Color);
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
define("Shared/ShapeAggregator", ["require", "exports", "Shared/Plane", "Shared/Point"], function (require, exports, Plane_3, Point_3) {
    "use strict";
    exports.__esModule = true;
    var ShapeAggregator = (function () {
        function ShapeAggregator(transformation) {
            this.Planes = new Array();
            this.Add = function (shape) {
                this.Planes = this.Planes.concat(shape.Planes());
            };
            this.AddPlanes = function (planes) {
                this.Planes = this.Planes.concat(planes);
            };
            this.TransformedPlanes = function () {
                var aggPlanes = new Array();
                for (var plCnt = 0; plCnt < this.Planes.length; plCnt++) {
                    var pts = new Array();
                    for (var ptCnt = 0; ptCnt < this.Planes[plCnt].Points.length; ptCnt++) {
                        var pt = this.Planes[plCnt].Points[ptCnt];
                        pts.push(new Point_3.Point(pt.x * this.Transformation.Zoom.xScale, pt.y * this.Transformation.Zoom.yScale, pt.z * this.Transformation.Zoom.zScale));
                    }
                    aggPlanes.push(new Plane_3.Plane(pts, this.Planes[plCnt].Color));
                }
                return aggPlanes;
            };
            this.Transformation = transformation;
        }
        return ShapeAggregator;
    }());
    exports.ShapeAggregator = ShapeAggregator;
});
