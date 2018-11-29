import * as GraphicsErrors from "./Utilities/GraphicsErrors";

export class Graphics{

    GLContext: WebGLRenderingContext;

    initializeContext(canvasElementId: string) : void{

        try{
            
            var canvas = document.getElementById(canvasElementId) as HTMLCanvasElement;
            this.GLContext = canvas.getContext("webgl");
            if(this.GLContext == null){
                throw new GraphicsErrors.ContextInitializationError();
            }
        }
        catch(error){

            console.error(error);
        }
        
        
        
    }
}