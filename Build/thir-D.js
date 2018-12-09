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
define("Contracts/Shared/Transformation", ["require", "exports"], function (require, exports) {
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
define("Contracts/Interfaces/IShape", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
});
define("Contracts/Shared/Utilities/GxUtils", ["require", "exports", "Contracts/Shared/Point"], function (require, exports, Point_1) {
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
            var centroid = new Point_1.Point(0, 0, 0);
            var planeCentroids = new Array();
            Planes.forEach(function (plane) {
                var planeCentroid = new Point_1.Point(0, 0, 0);
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
            var rotatedPt = new Point_1.Point(pt.x, pt.y, pt.z);
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
        return GxUtils;
    }());
    exports.GxUtils = GxUtils;
});
define("Contracts/Shapes/Shape", ["require", "exports", "Contracts/Shared/Utilities/GxUtils", "Contracts/Shapes/ShapeTypes"], function (require, exports, GxUtils_1, ShapeTypes_1) {
    "use strict";
    exports.__esModule = true;
    var Shape = (function () {
        function Shape(Name) {
            this.Move = function () {
            };
            this.Rotate = function () {
            };
            this.Zoom = function () {
            };
            this.Id = GxUtils_1.GxUtils.NewGuid();
            this.Name = Name;
            this.Type = ShapeTypes_1.ShapeTypes.CUSTOM;
        }
        return Shape;
    }());
    exports.Shape = Shape;
});
define("Contracts/Shapes/Cube", ["require", "exports", "Contracts/Shared/Point", "Contracts/Shared/Plane", "Contracts/Shapes/Shape", "Contracts/Shapes/ShapeTypes"], function (require, exports, Point_2, Plane_1, Shape_1, ShapeTypes_2) {
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
                var origin = this.Transformation != null && this.Transformation.Translation != null ? this.Transformation.Translation : new Point_2.Point(0, 0, 0);
                topFacePoints = [
                    new Point_2.Point(origin.x, origin.y, origin.z),
                    new Point_2.Point(origin.x + this.L, origin.y, origin.z),
                    new Point_2.Point(origin.x + this.L, origin.y, origin.z + this.W),
                    new Point_2.Point(origin.x, origin.y, origin.z + this.W)
                ];
                bottomFacePoints = [
                    new Point_2.Point(origin.x, origin.y + this.H, origin.z),
                    new Point_2.Point(origin.x + this.L, origin.y + this.H, origin.z),
                    new Point_2.Point(origin.x + this.L, origin.y + this.H, origin.z + this.W),
                    new Point_2.Point(origin.x, origin.y + this.H, origin.z + this.W)
                ];
                planes[planes.length] = new Plane_1.Plane(topFacePoints, this.Color, this.Id);
                planes[planes.length] = new Plane_1.Plane(bottomFacePoints, this.Color, this.Id);
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
                    planes[planes.length] = new Plane_1.Plane(facePoints, this.Color, this.Id);
                }
                this.Planes = planes;
            };
            _this.Clone = function () {
                var cube = new Cube(this.name, this.L, this.W, this.H, this.Color);
                return cube;
            };
            _this.Type = ShapeTypes_2.ShapeTypes.CUBE;
            _this.L = l;
            _this.W = w;
            _this.H = h;
            _this.Color = clr;
            return _this;
        }
        return Cube;
    }(Shape_1.Shape));
    exports.Cube = Cube;
});
define("Contracts/Shapes/Polygon", ["require", "exports", "Contracts/Shared/Point", "Contracts/Shared/Plane", "Contracts/Shared/Angle", "Contracts/Shapes/Shape", "Contracts/Shapes/ShapeTypes"], function (require, exports, Point_3, Plane_2, Angle_1, Shape_2, ShapeTypes_3) {
    "use strict";
    exports.__esModule = true;
    var Polygon = (function (_super) {
        __extends(Polygon, _super);
        function Polygon(name, sides, a, b, h, color, tAng, bAng) {
            if (tAng === void 0) { tAng = new Angle_1.Angle(0, 0, 0); }
            if (bAng === void 0) { bAng = new Angle_1.Angle(0, 0, 0); }
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
            };
            _this.Clone = function () {
                var cloneShape = new Polygon(this.Name, this.SidesCount, this.A, this.B, this.H, this.Color);
                return cloneShape;
            };
            _this.Type = ShapeTypes_3.ShapeTypes.POLYGON;
            _this.SidesCount = sides;
            _this.A = a;
            _this.B = b;
            _this.H = h;
            _this.Color = color;
            _this.TopFaceInclination = tAng;
            _this.BottomFaceInclination = bAng;
            return _this;
        }
        return Polygon;
    }(Shape_2.Shape));
    exports.Polygon = Polygon;
});
define("Contracts/Shapes/Sphere", ["require", "exports", "Contracts/Shapes/Shape", "Contracts/Shapes/ShapeTypes", "Contracts/Shared/Plane", "Contracts/Shared/Point"], function (require, exports, Shape_3, ShapeTypes_4, Plane_3, Point_4) {
    "use strict";
    exports.__esModule = true;
    var Sphere = (function (_super) {
        __extends(Sphere, _super);
        function Sphere(name, r, xParts, yParts, clr) {
            var _this = _super.call(this, name) || this;
            _this.SetPlanes = function () {
                var origin = this.Transformation != null && this.Transformation.Translation != null ? this.Transformation.Translation : new Point_4.Point(0, 0, 0);
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
                        var pt = new Point_4.Point(x, y, z);
                        points[points.length] = pt;
                    }
                    var plane = new Plane_3.Plane(points, this.Color, this.Id);
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
                        var pln = new Plane_3.Plane(pts, this.Color, this.Id);
                        this.Planes[this.Planes.length] = pln;
                    }
                }
                this.Planes[this.Planes.length] = planes[0];
                this.Planes[this.Planes.length] = planes[planes.length - 1];
            };
            _this.Type = ShapeTypes_4.ShapeTypes.SPHERE;
            _this.Radius = r;
            _this.xPartitions = xParts;
            _this.yPartitions = yParts;
            _this.Color = clr;
            return _this;
        }
        return Sphere;
    }(Shape_3.Shape));
    exports.Sphere = Sphere;
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
define("Contracts/Shared/ShapeAggregator", ["require", "exports", "Contracts/Shared/Plane", "Contracts/Shared/Transformation", "Contracts/Shared/Point", "Contracts/Shared/Utilities/GxUtils", "Contracts/Shared/RepeatHint"], function (require, exports, Plane_4, Transformation_1, Point_5, GxUtils_2, RepeatHint_1) {
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
                    this.Planes = this.Planes.concat(shape.Planes);
                }
            };
            this.AddShapeWithRepeatHints = function (shape, repeatHints) {
                if (this.ShapeIds.length > 0) {
                    throw new Error("Aggregator " + this.Name + " already has a shape associated. Please define a separate Shape Aggregator.");
                }
                else {
                    var xRepeatHint = new RepeatHint_1.RepeatHint();
                    var yRepeatHint = new RepeatHint_1.RepeatHint();
                    var zRepeatHint = new RepeatHint_1.RepeatHint();
                    repeatHints.forEach(function (hint) {
                        switch (hint.Axis) {
                            case "X":
                                xRepeatHint = hint;
                                break;
                            case "Y":
                                yRepeatHint = hint;
                                break;
                            case "Z":
                                zRepeatHint = hint;
                                break;
                        }
                    });
                    for (var xRepeater = 0; xRepeater < xRepeatHint.RepeatTimes; xRepeater++) {
                        for (var yRepeater = 0; yRepeater < yRepeatHint.RepeatTimes; yRepeater++) {
                            for (var zRepeater = 0; zRepeater < zRepeatHint.RepeatTimes; zRepeater++) {
                                var repeatShape = shape.Clone();
                                var x = shape.Transformation.Translation.x + (xRepeater * xRepeatHint.SpaceDistance);
                                var y = shape.Transformation.Translation.y + (yRepeater * yRepeatHint.SpaceDistance);
                                var z = shape.Transformation.Translation.z + (zRepeater * zRepeatHint.SpaceDistance);
                                repeatShape.Transformation = new Transformation_1.Transformation(new Point_5.Point(x, y, z), null, null, null);
                                repeatShape.SetPlanes();
                                this.Planes = this.Planes.concat(repeatShape.Planes);
                            }
                        }
                    }
                }
            };
            this.AddPlanes = function (planes) {
                this.Planes = this.Planes.concat(planes);
            };
            this.TransformedPlanes = function () {
                var centroid = GxUtils_2.GxUtils.GetCentroid(this.Planes);
                var aggPlanes = new Array();
                for (var plCnt = 0; plCnt < this.Planes.length; plCnt++) {
                    var pts = new Array();
                    for (var ptCnt = 0; ptCnt < this.Planes[plCnt].Points.length; ptCnt++) {
                        var pt = this.Planes[plCnt].Points[ptCnt];
                        if (this.Transformation.Zoom != null) {
                            pts.push(new Point_5.Point(pt.x * this.Transformation.Zoom.xScale, pt.y * this.Transformation.Zoom.yScale, pt.z * this.Transformation.Zoom.zScale));
                        }
                        else if (this.Transformation.Rotation != null) {
                            var rotatedPt = GxUtils_2.GxUtils.Rotate(pt, centroid, this.Transformation.Rotation);
                            pts.push(rotatedPt);
                        }
                    }
                    aggPlanes.push(new Plane_4.Plane(pts, this.Planes[plCnt].Color));
                }
                return aggPlanes;
            };
            this.Transformation = transformation;
            this.Id = GxUtils_2.GxUtils.NewGuid();
        }
        ;
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
