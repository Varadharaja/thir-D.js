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