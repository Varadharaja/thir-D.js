var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define("Contracts/Shared/Point", ["require", "exports"], function (require, exports) {
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
define("Contracts/Shared/Degree", ["require", "exports"], function (require, exports) {
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
define("Contracts/Shared/Angle", ["require", "exports", "Contracts/Shared/Degree"], function (require, exports, Degree_1) {
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
define("Contracts/Shared/Scale", ["require", "exports"], function (require, exports) {
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
define("Contracts/Shared/Transformation", ["require", "exports", "Contracts/Shared/Point", "Contracts/Shared/Angle", "Contracts/Shared/Scale"], function (require, exports, Point_1, Angle_1, Scale_1) {
    "use strict";
    exports.__esModule = true;
    var Transformation = (function () {
        function Transformation(translate, rotate, skew, zoom) {
            this.Translation = translate;
            this.Rotation = rotate;
            this.Skewness = skew;
            this.Zoom = zoom;
        }
        Transformation.Import = function (txm) {
            if (txm != null) {
                var angle = void 0;
                var pt = void 0;
                var zoom = void 0;
                if (txm.Rotation != null) {
                    angle = new Angle_1.Angle(txm.Rotation.alpha, txm.Rotation.beta, txm.Rotation.gamma);
                }
                if (txm.Translation != null) {
                    pt = new Point_1.Point(txm.Translation.x, txm.Translation.y, txm.Translation.z);
                }
                if (txm.Zoom != null) {
                    zoom = new Scale_1.Scale(txm.Zoom.xScale, txm.Zoom.yScale, txm.Zoom.zScale);
                }
                return new Transformation(pt, angle, null, zoom);
            }
            else {
                return null;
            }
        };
        return Transformation;
    }());
    exports.Transformation = Transformation;
});
define("Contracts/Shared/Color", ["require", "exports"], function (require, exports) {
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
        Color.Import = function (clr) {
            var color = new Color(clr.red, clr.green, clr.blue);
            return color;
        };
        return Color;
    }());
    exports.Color = Color;
});
define("Contracts/Shared/Plane", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var Plane = (function () {
        function Plane(pts, color, shapeId) {
            if (shapeId === void 0) { shapeId = ""; }
            this.ShouldHide = false;
            this.Points = pts;
            this.Color = color;
            if (shapeId != "") {
                this.ShapeId = shapeId;
            }
        }
        return Plane;
    }());
    exports.Plane = Plane;
});
define("Contracts/Shapes/ShapeTypes", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var ShapeTypes;
    (function (ShapeTypes) {
        ShapeTypes[ShapeTypes["CUBE"] = 0] = "CUBE";
        ShapeTypes[ShapeTypes["POLYGON"] = 1] = "POLYGON";
        ShapeTypes[ShapeTypes["SPHERE"] = 2] = "SPHERE";
        ShapeTypes[ShapeTypes["CUSTOM"] = 3] = "CUSTOM";
    })(ShapeTypes = exports.ShapeTypes || (exports.ShapeTypes = {}));
});
define("Contracts/Shared/Range", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var NumRange = (function () {
        function NumRange() {
        }
        NumRange.Import = function (rng) {
            var opRng = new NumRange();
            if (rng != null) {
                opRng.from = rng.from;
                opRng.to = rng.to;
            }
            return opRng;
        };
        return NumRange;
    }());
    exports.NumRange = NumRange;
    var NumRanges = (function () {
        function NumRanges() {
        }
        NumRanges.Import = function (rngs) {
            var outputRngs = new Array();
            if (rngs != null) {
                rngs.forEach(function (rng) {
                    outputRngs.push(NumRange.Import(rng));
                });
            }
            return outputRngs;
        };
        return NumRanges;
    }());
    exports.NumRanges = NumRanges;
});
define("Contracts/Shared/PlaneColor", ["require", "exports", "Contracts/Shared/Color", "Contracts/Shared/Range"], function (require, exports, Color_1, Range_1) {
    "use strict";
    exports.__esModule = true;
    var PlaneColor = (function () {
        function PlaneColor() {
        }
        return PlaneColor;
    }());
    exports.PlaneColor = PlaneColor;
    var PlaneColors = (function () {
        function PlaneColors() {
        }
        PlaneColors.Import = function (plColors) {
            var outputColors = new Array();
            if (plColors != null && plColors.length > 0) {
                plColors.forEach(function (e, i) {
                    var plColor = new PlaneColor();
                    plColor.Color = Color_1.Color.Import(e.Color);
                    plColor.Planes = e.Planes;
                    if (e.Range != null) {
                        plColor.Range = Range_1.NumRange.Import(e.Range);
                    }
                    outputColors.push(plColor);
                });
            }
            return outputColors;
        };
        return PlaneColors;
    }());
    exports.PlaneColors = PlaneColors;
});
define("Contracts/Interfaces/IShape", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
});
define("Contracts/Shapes/Sphere", ["require", "exports", "Contracts/Shapes/Shape", "Contracts/Shared/Color", "Contracts/Shapes/ShapeTypes", "Contracts/Shared/Plane", "Contracts/Shared/Point", "Contracts/Shared/Transformation", "Contracts/Shared/PlaneColor", "Contracts/Shared/Range"], function (require, exports, Shape_1, Color_2, ShapeTypes_1, Plane_1, Point_2, Transformation_1, PlaneColor_1, Range_2) {
    "use strict";
    exports.__esModule = true;
    var Sphere = (function (_super) {
        __extends(Sphere, _super);
        function Sphere(name, r, xParts, yParts, clr) {
            var _this = _super.call(this, name) || this;
            _this.SetPlanes = function () {
                var origin = new Point_2.Point(0, 0, 0);
                var planes = new Array();
                this.yPartStart = this.yPartStart == null ? 0 : this.yPartStart;
                this.yPartEnd = this.yPartEnd == null ? this.yPartitions : this.yPartEnd;
                for (var yParts = this.yPartStart; yParts <= this.yPartEnd; yParts++) {
                    var points = new Array();
                    for (var xParts = 0; xParts <= this.xPartitions; xParts++) {
                        var theta = 2 * Math.PI * xParts / this.xPartitions;
                        var z = origin.z - this.Radius + (2 * this.Radius * yParts / this.yPartitions);
                        var r = 0;
                        r = Math.sqrt(this.Radius * this.Radius - z * z);
                        var x = origin.x + r * Math.cos(theta);
                        var y = origin.y + r * Math.sin(theta);
                        var pt = new Point_2.Point(x, y, z);
                        points[points.length] = pt;
                    }
                    var plane = new Plane_1.Plane(points, this.Color, this.Id);
                    planes[planes.length] = plane;
                }
                this.Planes = new Array();
                for (var plCnt = 0; plCnt < planes.length; plCnt++) {
                    for (var ptsCnt = 0; ptsCnt < planes[plCnt].Points.length; ptsCnt++) {
                        var pts = new Array();
                        if (plCnt == planes.length - 1) {
                            pts[pts.length] = planes[plCnt].Points[ptsCnt];
                            pts[pts.length] = planes[0].Points[ptsCnt];
                            if (ptsCnt == planes[plCnt].Points.length - 1) {
                                pts[pts.length] = planes[0].Points[0];
                                pts[pts.length] = planes[plCnt].Points[0];
                            }
                            else {
                                pts[pts.length] = planes[0].Points[ptsCnt + 1];
                                pts[pts.length] = planes[plCnt].Points[ptsCnt + 1];
                            }
                        }
                        else {
                            pts[pts.length] = planes[plCnt].Points[ptsCnt];
                            pts[pts.length] = planes[plCnt + 1].Points[ptsCnt];
                            if (ptsCnt == planes[plCnt].Points.length - 1) {
                                pts[pts.length] = planes[plCnt + 1].Points[0];
                                pts[pts.length] = planes[plCnt].Points[0];
                            }
                            else {
                                pts[pts.length] = planes[plCnt + 1].Points[ptsCnt + 1];
                                pts[pts.length] = planes[plCnt].Points[ptsCnt + 1];
                            }
                        }
                        var pln = new Plane_1.Plane(pts, this.Color, this.Id);
                        this.Planes[this.Planes.length] = pln;
                    }
                }
                this.Planes[this.Planes.length] = planes[0];
                this.Planes[this.Planes.length] = planes[planes.length - 1];
                var txl = this.Transformation.Translation;
                if (txl != null) {
                    this.Planes.forEach(function (element) {
                        element.Points.forEach(function (pt) {
                            pt.x += txl.x;
                            pt.y += txl.y;
                            pt.z += txl.z;
                        });
                    });
                }
                this.ApplyPlaneColors();
            };
            _this.Clone = function () {
                var cloneShape = new Sphere(this.Name, this.Radius, this.xPartitions, this.yPartitions, this.Color);
                return cloneShape;
            };
            _this.Type = ShapeTypes_1.ShapeTypes.SPHERE;
            _this.Radius = r;
            _this.xPartitions = xParts;
            _this.yPartitions = yParts;
            _this.Color = clr;
            return _this;
        }
        Sphere.Import = function (shp) {
            var sphere = new Sphere(shp.Name, shp.Radius, shp.xPartitions, shp.yPartitions, Color_2.Color.Import(shp.Color));
            sphere.Transformation = Transformation_1.Transformation.Import(shp.Transformation);
            sphere.yPartStart = shp.yPartStart;
            sphere.yPartEnd = shp.yPartEnd;
            sphere.HiddenPlanes = shp.HiddenPlanes;
            sphere.PlaneColors = PlaneColor_1.PlaneColors.Import(shp.PlaneColors);
            sphere.HiddenRanges = Range_2.NumRanges.Import(shp.HiddenRanges);
            sphere.VisibleRanges = Range_2.NumRanges.Import(shp.VisibleRanges);
            return sphere;
        };
        return Sphere;
    }(Shape_1.Shape));
    exports.Sphere = Sphere;
});
define("Contracts/Shapes/Polygon", ["require", "exports", "Contracts/Shared/Point", "Contracts/Shared/Transformation", "Contracts/Shared/Plane", "Contracts/Shared/Angle", "Contracts/Shared/Color", "Contracts/Shapes/Shape", "Contracts/Shapes/ShapeTypes", "Contracts/Shared/Utilities/GxUtils", "Contracts/Shared/PlaneColor", "Contracts/Shared/Range"], function (require, exports, Point_3, Transformation_2, Plane_2, Angle_2, Color_3, Shape_2, ShapeTypes_2, GxUtils_1, PlaneColor_2, Range_3) {
    "use strict";
    exports.__esModule = true;
    var Polygon = (function (_super) {
        __extends(Polygon, _super);
        function Polygon(name, sides, a, b, h, color, tAng, bAng) {
            if (tAng === void 0) { tAng = new Angle_2.Angle(0, 0, 0); }
            if (bAng === void 0) { bAng = new Angle_2.Angle(0, 0, 0); }
            var _this = _super.call(this, name) || this;
            _this.SetPlanes = function () {
                var planes = new Array();
                var theta = Math.PI * (1 / 2 - 1 / this.SidesCount);
                var R1 = this.A / 2 * 1 / Math.cos(theta);
                var R2 = this.B / 2 * 1 / Math.cos(theta);
                var alpha = 2 * Math.PI / this.SidesCount;
                var topFacePoints = new Array();
                var bottomFacePoints = new Array();
                var origin = this.Transformation != null && this.Transformation.Translation != null ? this.Transformation.Translation : new Point_3.Point(0, 0, 0);
                for (var sideIdx = 0; sideIdx < this.SidesCount; sideIdx++) {
                    var topPt = new Point_3.Point(origin.x + R1 * Math.cos(sideIdx * alpha), origin.y + this.H, origin.z + R1 * Math.sin(sideIdx * alpha));
                    var pt = new Point_3.Point(origin.x + R2 * Math.cos(sideIdx * alpha), origin.y, origin.z + R2 * Math.sin(sideIdx * alpha));
                    topFacePoints[sideIdx] = topPt;
                    bottomFacePoints[sideIdx] = pt;
                }
                if (this.TopFaceInclination != null) {
                    topFacePoints = GxUtils_1.GxUtils.TransformPlanes([new Plane_2.Plane(topFacePoints, null)], new Transformation_2.Transformation(null, this.TopFaceInclination, null, null))[0].Points;
                }
                if (this.BottomFaceInclination != null) {
                    bottomFacePoints = GxUtils_1.GxUtils.TransformPlanes([new Plane_2.Plane(bottomFacePoints, null)], new Transformation_2.Transformation(null, this.BottomFaceInclination, null, null))[0].Points;
                }
                planes[planes.length] = new Plane_2.Plane(topFacePoints, this.Color, this.Id);
                planes[planes.length] = new Plane_2.Plane(bottomFacePoints, this.Color, this.Id);
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
                    planes[planes.length] = new Plane_2.Plane(facePoints, this.Color, this.Id);
                }
                this.Planes = planes;
                this.ApplyPlaneColors();
            };
            _this.Clone = function () {
                var cloneShape = new Polygon(this.Name, this.SidesCount, this.A, this.B, this.H, this.Color);
                return cloneShape;
            };
            _this.Type = ShapeTypes_2.ShapeTypes.POLYGON;
            _this.SidesCount = sides;
            _this.A = a;
            _this.B = b;
            _this.H = h;
            _this.Color = color;
            _this.TopFaceInclination = tAng;
            _this.BottomFaceInclination = bAng;
            return _this;
        }
        Polygon.Import = function (shp) {
            var poly = new Polygon(shp.Name, shp.SidesCount, shp.A, shp.B, shp.H, Color_3.Color.Import(shp.Color));
            poly.Transformation = Transformation_2.Transformation.Import(shp.Transformation);
            poly.HiddenPlanes = shp.HiddenPlanes;
            poly.PlaneColors = PlaneColor_2.PlaneColors.Import(shp.PlaneColors);
            if (shp.TopFaceInclination != null) {
                poly.TopFaceInclination = new Angle_2.Angle(shp.TopFaceInclination.alpha, shp.TopFaceInclination.beta, shp.TopFaceInclination.gamma);
            }
            if (shp.BottomFaceInclination != null) {
                poly.BottomFaceInclination = new Angle_2.Angle(shp.BottomFaceInclination.alpha, shp.BottomFaceInclination.beta, shp.BottomFaceInclination.gamma);
            }
            poly.VisibleRanges = Range_3.NumRanges.Import(shp.VisibleRanges);
            return poly;
        };
        return Polygon;
    }(Shape_2.Shape));
    exports.Polygon = Polygon;
});
define("Contracts/Shared/Utilities/GxUtils", ["require", "exports", "Contracts/Shared/Plane", "Contracts/Shared/Point"], function (require, exports, Plane_3, Point_4) {
    "use strict";
    exports.__esModule = true;
    var GxUtils = (function () {
        function GxUtils() {
        }
        GxUtils.NewGuid = function () {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        };
        GxUtils.GetCentroid = function (Planes) {
            var centroid = new Point_4.Point(0, 0, 0);
            var planeCentroids = new Array();
            Planes.forEach(function (plane) {
                var planeCentroid = new Point_4.Point(0, 0, 0);
                plane.Points.forEach(function (pt) {
                    planeCentroid.x += pt.x;
                    planeCentroid.y += pt.y;
                    planeCentroid.z += pt.z;
                });
                planeCentroid.x /= plane.Points.length;
                planeCentroid.y /= plane.Points.length;
                planeCentroid.z /= plane.Points.length;
                planeCentroids.push(planeCentroid);
            });
            planeCentroids.forEach(function (plCentroid) {
                centroid.x += plCentroid.x;
                centroid.y += plCentroid.y;
                centroid.z += plCentroid.z;
            });
            centroid.x /= planeCentroids.length;
            centroid.y /= planeCentroids.length;
            centroid.z /= planeCentroids.length;
            return centroid;
        };
        GxUtils.Rotate = function (pt, around, angle) {
            var rotatedPt = new Point_4.Point(pt.x, pt.y, pt.z);
            if (angle.alpha.Radian() > 0) {
                var coords = GxUtils.Rotate2DPoint(around.y, around.z, pt.y, pt.z, angle.alpha.Radian());
                rotatedPt.y = coords[0];
                rotatedPt.z = coords[1];
            }
            if (angle.beta.Radian() > 0) {
                var coords = GxUtils.Rotate2DPoint(around.z, around.x, pt.z, pt.x, angle.beta.Radian());
                rotatedPt.z = coords[0];
                rotatedPt.x = coords[1];
            }
            if (angle.gamma.Radian() > 0) {
                var coords = GxUtils.Rotate2DPoint(around.x, around.y, pt.x, pt.y, angle.gamma.Radian());
                rotatedPt.x = coords[0];
                rotatedPt.y = coords[1];
            }
            return rotatedPt;
        };
        GxUtils.Rotate2DPoint = function (x0, y0, x1, y1, theta) {
            var s = Math.sin(theta);
            var c = Math.cos(theta);
            var x2 = x1;
            var y2 = y1;
            x2 -= x0;
            y2 -= y0;
            var xnew = x2 * c - y2 * s;
            var ynew = x2 * s + y2 * c;
            x2 = Math.round((xnew + x0) * 1000) / 1000;
            y2 = Math.round((ynew + y0) * 1000) / 1000;
            return [x2, y2];
        };
        GxUtils.TransformPlanes = function (planes, transformation) {
            var centroid = GxUtils.GetCentroid(planes);
            var txedPlanes = new Array();
            for (var plCnt = 0; plCnt < planes.length; plCnt++) {
                var pts = new Array();
                for (var ptCnt = 0; ptCnt < planes[plCnt].Points.length; ptCnt++) {
                    var pt = planes[plCnt].Points[ptCnt];
                    var newPt = pt;
                    if (transformation.Rotation != null) {
                        newPt = GxUtils.Rotate(pt, centroid, transformation.Rotation);
                    }
                    if (transformation.Zoom != null && transformation.Translation != null) {
                        newPt.x -= transformation.Translation.x;
                        newPt.y -= transformation.Translation.y;
                        newPt.z -= transformation.Translation.z;
                        newPt.x *= transformation.Zoom.xScale;
                        newPt.y *= transformation.Zoom.yScale;
                        newPt.z *= transformation.Zoom.zScale;
                        newPt.x += transformation.Translation.x;
                        newPt.y += transformation.Translation.y;
                        newPt.z += transformation.Translation.z;
                    }
                    pts.push(newPt);
                }
                var newPl = new Plane_3.Plane(pts, planes[plCnt].Color);
                newPl.ShapeId = planes[plCnt].ShapeId;
                newPl.ShouldHide = planes[plCnt].ShouldHide;
                newPl.Color = planes[plCnt].Color;
                txedPlanes.push(newPl);
            }
            return txedPlanes;
        };
        GxUtils.ApplyRepeatTransform = function (Planes, transformation) {
            var planes = JSON.parse(JSON.stringify(Planes));
            var txedPlanes = new Array();
            for (var plCnt = 0; plCnt < planes.length; plCnt++) {
                var pts = new Array();
                for (var ptCnt = 0; ptCnt < planes[plCnt].Points.length; ptCnt++) {
                    var pt = planes[plCnt].Points[ptCnt];
                    var newPt = pt;
                    if (transformation.Translation != null) {
                        newPt.x += transformation.Translation.x;
                        newPt.y += transformation.Translation.y;
                        newPt.z += transformation.Translation.z;
                    }
                    pts.push(newPt);
                }
                var newPl = new Plane_3.Plane(pts, planes[plCnt].Color);
                newPl.ShapeId = planes[plCnt].ShapeId;
                newPl.ShouldHide = planes[plCnt].ShouldHide;
                newPl.Color = planes[plCnt].Color;
                txedPlanes.push(newPl);
            }
            return txedPlanes;
        };
        GxUtils.ComputeDistance = function (pointA, pointB) {
            return Math.sqrt(Math.pow(pointA.x - pointB.x, 2) + Math.pow(pointA.y - pointB.y, 2) + Math.pow(pointA.z - pointB.z, 2));
        };
        return GxUtils;
    }());
    exports.GxUtils = GxUtils;
});
define("Contracts/Shapes/Shape", ["require", "exports", "Contracts/Shared/Utilities/GxUtils", "Contracts/Shapes/ShapeTypes"], function (require, exports, GxUtils_2, ShapeTypes_3) {
    "use strict";
    exports.__esModule = true;
    var Shape = (function () {
        function Shape(Name) {
            this.ShouldHide = false;
            this.Move = function () {
            };
            this.Rotate = function () {
            };
            this.Zoom = function () {
            };
            this.TransformedPlanes = function () {
                return GxUtils_2.GxUtils.TransformPlanes(this.Planes, this.Transformation);
            };
            this.ApplyPlaneColors = function () {
                if (this.PlaneColors != null && this.PlaneColors.length > 0) {
                    var planes_1 = this.Planes;
                    this.PlaneColors.forEach(function (plColor, i) {
                        var pColor = plColor.Color;
                        if (plColor.Range != null) {
                            for (var cnt = plColor.Range.from; cnt <= plColor.Range.to; cnt++) {
                                planes_1[cnt].Color = pColor;
                            }
                        }
                        else {
                            plColor.Planes.forEach(function (plIdx) {
                                planes_1[plIdx].Color = pColor;
                            });
                        }
                    });
                }
                var planes = this.Planes;
                if (this.HiddenRanges != null && this.HiddenRanges.length > 0) {
                    this.HiddenRanges.forEach(function (range) {
                        for (var cnt = range.from; cnt <= range.to; cnt++) {
                            planes[cnt].ShouldHide = true;
                        }
                    });
                }
                if (this.VisibleRanges != null && this.VisibleRanges.length > 0) {
                    for (var cnt = 0; cnt < planes.length; cnt++) {
                        planes[cnt].ShouldHide = true;
                    }
                    this.VisibleRanges.forEach(function (range) {
                        for (var cnt = range.from; cnt <= range.to; cnt++) {
                            planes[cnt].ShouldHide = false;
                        }
                    });
                }
            };
            this.Id = GxUtils_2.GxUtils.NewGuid();
            this.Name = Name;
            this.Type = ShapeTypes_3.ShapeTypes.CUSTOM;
        }
        return Shape;
    }());
    exports.Shape = Shape;
});
define("Contracts/Shapes/Cube", ["require", "exports", "Contracts/Shared/Point", "Contracts/Shared/Transformation", "Contracts/Shared/Plane", "Contracts/Shared/Color", "Contracts/Shapes/Shape", "Contracts/Shapes/ShapeTypes", "Contracts/Shared/PlaneColor"], function (require, exports, Point_5, Transformation_3, Plane_4, Color_4, Shape_3, ShapeTypes_4, PlaneColor_3) {
    "use strict";
    exports.__esModule = true;
    var Cube = (function (_super) {
        __extends(Cube, _super);
        function Cube(name, l, w, h, clr) {
            var _this = _super.call(this, name) || this;
            _this.SetPlanes = function () {
                var planes = new Array();
                var topFacePoints = new Array();
                var bottomFacePoints = new Array();
                var origin = this.Transformation != null && this.Transformation.Translation != null ? this.Transformation.Translation : new Point_5.Point(0, 0, 0);
                topFacePoints = [
                    new Point_5.Point(origin.x, origin.y, origin.z),
                    new Point_5.Point(origin.x + this.L, origin.y, origin.z),
                    new Point_5.Point(origin.x + this.L, origin.y, origin.z + this.W),
                    new Point_5.Point(origin.x, origin.y, origin.z + this.W)
                ];
                bottomFacePoints = [
                    new Point_5.Point(origin.x, origin.y + this.H, origin.z),
                    new Point_5.Point(origin.x + this.L, origin.y + this.H, origin.z),
                    new Point_5.Point(origin.x + this.L, origin.y + this.H, origin.z + this.W),
                    new Point_5.Point(origin.x, origin.y + this.H, origin.z + this.W)
                ];
                planes[planes.length] = new Plane_4.Plane(topFacePoints, this.Color, this.Id);
                planes[planes.length] = new Plane_4.Plane(bottomFacePoints, this.Color, this.Id);
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
                    planes[planes.length] = new Plane_4.Plane(facePoints, this.Color, this.Id);
                }
                this.Planes = planes;
                this.ApplyPlaneColors();
            };
            _this.Clone = function () {
                var cube = new Cube(this.name, this.L, this.W, this.H, this.Color);
                return cube;
            };
            _this.Type = ShapeTypes_4.ShapeTypes.CUBE;
            _this.L = l;
            _this.W = w;
            _this.H = h;
            _this.Color = clr;
            return _this;
        }
        Cube.Import = function (shp) {
            var cube = new Cube(shp.Name, shp.L, shp.W, shp.H, Color_4.Color.Import(shp.Color));
            cube.Transformation = Transformation_3.Transformation.Import(shp.Transformation);
            cube.HiddenPlanes = shp.HiddenPlanes;
            cube.PlaneColors = PlaneColor_3.PlaneColors.Import(shp.PlaneColors);
            return cube;
        };
        return Cube;
    }(Shape_3.Shape));
    exports.Cube = Cube;
});
define("Contracts/Shared/Utilities/GraphicsErrors", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var GraphicsError = (function (_super) {
        __extends(GraphicsError, _super);
        function GraphicsError(message) {
            return _super.call(this, message) || this;
        }
        return GraphicsError;
    }(Error));
    exports.GraphicsError = GraphicsError;
    var ContextInitializationError = (function (_super) {
        __extends(ContextInitializationError, _super);
        function ContextInitializationError(message) {
            var _this = this;
            if (message == undefined || message == null)
                message = "Unable to initialize WebGL. Your browser may not support it.";
            _this = _super.call(this, message) || this;
            return _this;
        }
        return ContextInitializationError;
    }(GraphicsError));
    exports.ContextInitializationError = ContextInitializationError;
    var ShaderLoadError = (function (_super) {
        __extends(ShaderLoadError, _super);
        function ShaderLoadError(glContext, shader) {
            var _this = this;
            var message = glContext.getShaderInfoLog(shader);
            _this = _super.call(this, message) || this;
            glContext.deleteShader(shader);
            return _this;
        }
        return ShaderLoadError;
    }(GraphicsError));
    exports.ShaderLoadError = ShaderLoadError;
    var ShaderProgramInitializationError = (function (_super) {
        __extends(ShaderProgramInitializationError, _super);
        function ShaderProgramInitializationError(glContext, program) {
            var _this = this;
            var message = glContext.getProgramInfoLog(program);
            _this = _super.call(this, message) || this;
            glContext.deleteProgram(program);
            return _this;
        }
        return ShaderProgramInitializationError;
    }(GraphicsError));
    exports.ShaderProgramInitializationError = ShaderProgramInitializationError;
});
define("Contracts/Shared/Graphics", ["require", "exports", "Contracts/Shared/Utilities/GraphicsErrors"], function (require, exports, GraphicsErrors) {
    "use strict";
    exports.__esModule = true;
    var Graphics = (function () {
        function Graphics() {
        }
        Graphics.prototype.initializeContext = function (canvasElementId) {
            try {
                var canvas = document.getElementById(canvasElementId);
                this.context = canvas.getContext("webgl");
                if (this.context == null) {
                    throw new GraphicsErrors.ContextInitializationError();
                }
            }
            catch (error) {
                console.error(error);
            }
        };
        ;
        Graphics.initializeShaderProgram = function (glContext, vertexShaderSource, fragmentShaderSource) {
            var vertexShader = Graphics.loadShader(glContext, glContext.VERTEX_SHADER, vertexShaderSource);
            var fragmentShader = Graphics.loadShader(glContext, glContext.FRAGMENT_SHADER, fragmentShaderSource);
            var shaderProgram = glContext.createProgram();
            glContext.attachShader(shaderProgram, vertexShader);
            glContext.attachShader(shaderProgram, fragmentShader);
            glContext.linkProgram(shaderProgram);
            if (!glContext.getProgramParameter(shaderProgram, glContext.LINK_STATUS)) {
                throw new GraphicsErrors.ShaderProgramInitializationError(glContext, shaderProgram);
            }
            return shaderProgram;
        };
        Graphics.loadShader = function (glContext, shaderType, shaderSource) {
            var shader = glContext.createShader(shaderType);
            glContext.shaderSource(shader, shaderSource);
            glContext.compileShader(shader);
            if (!glContext.getShaderParameter(shader, glContext.COMPILE_STATUS)) {
                throw new GraphicsErrors.ShaderLoadError(glContext, shader);
            }
            return shader;
        };
        Graphics.default3DShader = function () {
            return "";
        };
        Graphics.prototype.renderPolygon = function (polygon) {
        };
        return Graphics;
    }());
    exports.Graphics = Graphics;
});
define("Contracts/Shared/RepeatHint", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var RepeatHint = (function () {
        function RepeatHint() {
            this.RepeatTimes = 1;
            this.SpaceDistance = 0;
        }
        return RepeatHint;
    }());
    exports.RepeatHint = RepeatHint;
});
define("Contracts/Shared/ShapeAggregator", ["require", "exports", "Contracts/Shared/Transformation", "Contracts/Shared/Point", "Contracts/Shared/Utilities/GxUtils", "Contracts/Shared/RepeatHint"], function (require, exports, Transformation_4, Point_6, GxUtils_3, RepeatHint_1) {
    "use strict";
    exports.__esModule = true;
    var ShapeAggregator = (function () {
        function ShapeAggregator(transformation) {
            this.ShapeIds = new Array();
            this.Planes = new Array();
            this.AddShape = function (shape) {
                if (this.ShapeRepeatHints != null) {
                    throw new Error("Aggregator " + this.Name + " already has a shape associated with Repeat Hints. Please define a separate Shape Aggregator.");
                }
                else {
                    this.ShapeIds[this.ShapeIds.length] = shape.Id;
                    shape.SetPlanes();
                    var hiddenPlanes = shape.HiddenPlanes;
                    var planes = this.Planes;
                    shape.Planes.forEach(function (pl, idx) {
                        if (hiddenPlanes != null && hiddenPlanes.length > 0 && hiddenPlanes.indexOf(idx) > -1) {
                            pl.ShouldHide = true;
                        }
                    });
                    if (shape.Transformation != null && shape.Transformation.Rotation != null) {
                        this.Planes = this.Planes.concat(shape.TransformedPlanes());
                    }
                    else {
                        this.Planes = this.Planes.concat(shape.Planes);
                    }
                }
            };
            this.AddShapeWithRepeatTransformationHint = function (shape, repeatHint) {
                if (this.ShapeIds.length > 0) {
                    throw new Error("Aggregator " + this.Name + " already has a shape associated. Please define a separate Shape Aggregator.");
                }
                else {
                    shape.SetPlanes();
                    var planes = new Array();
                    if (shape.Transformation != null) {
                        planes = shape.TransformedPlanes();
                    }
                    else {
                        planes = shape.Planes;
                    }
                    this.Planes = this.Planes.concat(planes);
                    for (var repeatCnt = 0; repeatCnt < repeatHint.RepeatTimes - 1; repeatCnt++) {
                        var txedPlanes = GxUtils_3.GxUtils.ApplyRepeatTransform(planes, repeatHint.Transformation);
                        this.Planes = this.Planes.concat(txedPlanes);
                        planes = txedPlanes;
                    }
                }
            };
            this.AddShapeWithRepeatHints = function (shape, repeatHints) {
                if (this.ShapeIds.length > 0) {
                    throw new Error("Aggregator " + this.Name + " already has a shape associated. Please define a separate Shape Aggregator.");
                }
                else {
                    var xRepeatHint_1 = new RepeatHint_1.RepeatHint();
                    var yRepeatHint_1 = new RepeatHint_1.RepeatHint();
                    var zRepeatHint_1 = new RepeatHint_1.RepeatHint();
                    repeatHints.forEach(function (hint) {
                        switch (hint.Axis) {
                            case "X":
                                xRepeatHint_1 = hint;
                                break;
                            case "Y":
                                yRepeatHint_1 = hint;
                                break;
                            case "Z":
                                zRepeatHint_1 = hint;
                                break;
                        }
                    });
                    for (var xRepeater = 0; xRepeater < xRepeatHint_1.RepeatTimes; xRepeater++) {
                        for (var yRepeater = 0; yRepeater < yRepeatHint_1.RepeatTimes; yRepeater++) {
                            for (var zRepeater = 0; zRepeater < zRepeatHint_1.RepeatTimes; zRepeater++) {
                                var repeatShape = shape.Clone();
                                var x = shape.Transformation.Translation.x + (xRepeater * xRepeatHint_1.SpaceDistance);
                                var y = shape.Transformation.Translation.y + (yRepeater * yRepeatHint_1.SpaceDistance);
                                var z = shape.Transformation.Translation.z + (zRepeater * zRepeatHint_1.SpaceDistance);
                                repeatShape.Transformation = new Transformation_4.Transformation(new Point_6.Point(x, y, z), shape.Transformation.Rotation, shape.Transformation.Skewness, shape.Transformation.Zoom);
                                repeatShape.SetPlanes();
                                if (repeatShape.Transformation != null && repeatShape.Transformation.Rotation != null) {
                                    this.Planes = this.Planes.concat(repeatShape.TransformedPlanes());
                                }
                                else {
                                    this.Planes = this.Planes.concat(repeatShape.Planes);
                                }
                            }
                        }
                    }
                }
            };
            this.AddPlanes = function (planes) {
                this.Planes = this.Planes.concat(planes);
            };
            this.TransformedPlanes = function () {
                return GxUtils_3.GxUtils.TransformPlanes(this.Planes, this.Transformation);
            };
            this.Transformation = transformation;
            this.Id = GxUtils_3.GxUtils.NewGuid();
        }
        return ShapeAggregator;
    }());
    exports.ShapeAggregator = ShapeAggregator;
});
define("Infra/Project", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var Project = (function () {
        function Project() {
        }
        return Project;
    }());
    exports.Project = Project;
});
define("Infra/Studio", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var Studio = (function () {
        function Studio() {
        }
        return Studio;
    }());
    exports.Studio = Studio;
});
