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
define("Shared/Utilities/GxUtils", ["require", "exports"], function (require, exports) {
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
        return GxUtils;
    }());
    exports.GxUtils = GxUtils;
});
define("Shapes/Shape", ["require", "exports", "Shared/Utilities/GxUtils"], function (require, exports, GxUtils_1) {
    "use strict";
    exports.__esModule = true;
    var Shape = (function () {
        function Shape(Name) {
            this.Clone = function () {
                var clonedShape = JSON.parse(JSON.stringify(this));
                return clonedShape;
            };
            this.Move = function () {
            };
            this.Rotate = function () {
            };
            this.Zoom = function () {
            };
            this.Id = GxUtils_1.GxUtils.NewGuid();
            this.Name = Name;
        }
        return Shape;
    }());
    exports.Shape = Shape;
});
define("Shapes/Cube", ["require", "exports", "Shared/Point", "Shared/Plane", "Shapes/Shape"], function (require, exports, Point_1, Plane_1, Shape_1) {
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
                this.Planes = planes;
            };
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
define("Shapes/Polygon", ["require", "exports", "Shared/Point", "Shared/Plane", "Shared/Angle", "Shapes/Shape"], function (require, exports, Point_2, Plane_2, Angle_1, Shape_2) {
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
                this.Planes = planes;
            };
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
define("Shared/Utilities/GraphicsErrors", ["require", "exports"], function (require, exports) {
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
define("Shared/Graphics", ["require", "exports", "Shared/Utilities/GraphicsErrors"], function (require, exports, GraphicsErrors) {
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
define("Shared/ShapeAggregator", ["require", "exports", "Shared/Plane", "Shared/Point"], function (require, exports, Plane_3, Point_3) {
    "use strict";
    exports.__esModule = true;
    var ShapeAggregator = (function () {
        function ShapeAggregator(transformation) {
            this.Planes = new Array();
            this.Add = function (shape) {
                shape.SetPlanes();
                this.Planes = this.Planes.concat(shape.Planes);
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
