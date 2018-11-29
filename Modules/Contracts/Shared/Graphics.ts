import * as GraphicsErrors from "./Utilities/GraphicsErrors";
import { Polygon } from "../Shapes/Polygon";

export class Graphics{

    context: WebGLRenderingContext;

    initializeContext(canvasElementId: string) : void{

        try{
            
            var canvas = document.getElementById(canvasElementId) as HTMLCanvasElement;
            this.context = canvas.getContext("webgl");
            if(this.context == null){
                throw new GraphicsErrors.ContextInitializationError();
            }
        }
        catch(error){

            console.error(error);
        }
    };

    static initializeShaderProgram(glContext:WebGLRenderingContext, vertexShaderSource: string, fragmentShaderSource: string){

        var vertexShader = Graphics.loadShader(glContext, glContext.VERTEX_SHADER, vertexShaderSource);
        var fragmentShader = Graphics.loadShader(glContext, glContext.FRAGMENT_SHADER, fragmentShaderSource);

        var shaderProgram = glContext.createProgram();
        glContext.attachShader(shaderProgram, vertexShader);
        glContext.attachShader(shaderProgram, fragmentShader);
        glContext.linkProgram(shaderProgram);

        if(!glContext.getProgramParameter(shaderProgram, glContext.LINK_STATUS)){

            throw new GraphicsErrors.ShaderProgramInitializationError(glContext, shaderProgram);
        }

        return shaderProgram;
    }

    static loadShader(glContext: WebGLRenderingContext, shaderType: GLenum, shaderSource: string){

        var shader = glContext.createShader(shaderType);
        glContext.shaderSource(shader, shaderSource);
        glContext.compileShader(shader);

        if(!glContext.getShaderParameter(shader, glContext.COMPILE_STATUS)){

            throw new GraphicsErrors.ShaderLoadError(glContext, shader);
        }

        return shader;
    }

    renderPolygon(polygon: Polygon){
        
    }
}