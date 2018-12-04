export class GraphicsError extends Error{

    constructor(message: string){
        super(message);
    }
}

export class ContextInitializationError extends GraphicsError{

    constructor(message?: any){

        if(message == undefined || message == null)
            message = "Unable to initialize WebGL. Your browser may not support it.";

        super(message);
    }
}

export class ShaderLoadError extends GraphicsError{

    constructor(glContext:WebGLRenderingContext, shader:WebGLShader){

        var message = glContext.getShaderInfoLog(shader);
        super(message);
        glContext.deleteShader(shader);
    }
}

export class ShaderProgramInitializationError extends GraphicsError{

    constructor(glContext:WebGLRenderingContext, program:WebGLProgram){

        var message = glContext.getProgramInfoLog(program);
        super(message);
        glContext.deleteProgram(program);
    }
}