System.register("Shared/Point", [], function (exports_1, context_1) {
    "use strict";
    var Point;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            Point = (function () {
                function Point(X, Y, Z) {
                    this.x = X;
                    this.y = Y;
                    this.z = Z;
                }
                return Point;
            }());
            exports_1("Point", Point);
        }
    };
});
System.register("Shared/Degree", [], function (exports_2, context_2) {
    "use strict";
    var Degree;
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [],
        execute: function () {
            Degree = (function () {
                function Degree(d) {
                    this.Radian = function () {
                        return this.Value * Math.PI / 180;
                    };
                    this.Value = d;
                }
                return Degree;
            }());
            exports_2("Degree", Degree);
        }
    };
});
System.register("Shared/Angle", ["Shared/Degree"], function (exports_3, context_3) {
    "use strict";
    var Degree_1, Angle;
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [
            function (Degree_1_1) {
                Degree_1 = Degree_1_1;
            }
        ],
        execute: function () {
            Angle = (function () {
                function Angle(a, b, g) {
                    this.alpha = new Degree_1.Degree(a);
                    this.beta = new Degree_1.Degree(b);
                    this.gamma = new Degree_1.Degree(g);
                }
                return Angle;
            }());
            exports_3("Angle", Angle);
        }
    };
});
System.register("Shared/Scale", [], function (exports_4, context_4) {
    "use strict";
    var Scale;
    var __moduleName = context_4 && context_4.id;
    return {
        setters: [],
        execute: function () {
            Scale = (function () {
                function Scale(xS, yS, zS) {
                    this.xScale = xS;
                    this.yScale = yS;
                    this.zScale = zS;
                }
                return Scale;
            }());
            exports_4("Scale", Scale);
        }
    };
});
System.register("Shared/Transformation", [], function (exports_5, context_5) {
    "use strict";
    var Transformation;
    var __moduleName = context_5 && context_5.id;
    return {
        setters: [],
        execute: function () {
            Transformation = (function () {
                function Transformation(translate, rotate, skew, zoom) {
                    this.Translation = translate;
                    this.Rotation = rotate;
                    this.Skewness = skew;
                    this.Zoom = zoom;
                }
                return Transformation;
            }());
            exports_5("Transformation", Transformation);
        }
    };
});
System.register("Shared/Color", [], function (exports_6, context_6) {
    "use strict";
    var Color;
    var __moduleName = context_6 && context_6.id;
    return {
        setters: [],
        execute: function () {
            Color = (function () {
                function Color(r, g, b, a) {
                    if (a === void 0) { a = 1; }
                    this.red = r;
                    this.green = g;
                    this.blue = b;
                    this.alpha = a;
                }
                return Color;
            }());
            exports_6("Color", Color);
        }
    };
});
System.register("Shared/Plane", [], function (exports_7, context_7) {
    "use strict";
    var Plane;
    var __moduleName = context_7 && context_7.id;
    return {
        setters: [],
        execute: function () {
            Plane = (function () {
                function Plane(pts, color) {
                    this.Points = pts;
                    this.Color = color;
                }
                return Plane;
            }());
            exports_7("Plane", Plane);
        }
    };
});
System.register("Interfaces/IShape", [], function (exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("Shapes/Polygon", ["Shared/Point", "Shared/Plane", "Shared/Angle"], function (exports_9, context_9) {
    "use strict";
    var Point_1, Plane_1, Angle_1, Polygon;
    var __moduleName = context_9 && context_9.id;
    return {
        setters: [
            function (Point_1_1) {
                Point_1 = Point_1_1;
            },
            function (Plane_1_1) {
                Plane_1 = Plane_1_1;
            },
            function (Angle_1_1) {
                Angle_1 = Angle_1_1;
            }
        ],
        execute: function () {
            Polygon = (function () {
                function Polygon(a, b, h, tAng, bAng) {
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
                    this.A = a;
                    this.B = b;
                    this.H = h;
                    this.TopFaceInclination = tAng;
                    this.BottomFaceInclination = bAng;
                }
                return Polygon;
            }());
            exports_9("Polygon", Polygon);
        }
    };
});
