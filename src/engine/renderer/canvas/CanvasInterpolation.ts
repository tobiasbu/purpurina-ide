import { InterpolationType } from "../RendererProperties";

const CanvasInterpolation = {

    crisp : function(canvas: HTMLCanvasElement)
    {
        var types = [ 'optimizeSpeed', 'crisp-edges', '-moz-crisp-edges', '-webkit-optimize-contrast', 'optimize-contrast', 'pixelated' ];
        types.forEach(function (type)
        {
            canvas.style['image-rendering'] = type;
        });
        canvas.style['msInterpolationMode'] = 'nearest-neighbor';
        return canvas;
    },

    bicubic : function(canvas: HTMLCanvasElement)
    {
        canvas.style['image-rendering'] = 'auto';
        canvas.style['msInterpolationMode'] = 'bicubic';
        return canvas;
    },

    set : function(canvas: HTMLCanvasElement, type: InterpolationType) {
        switch(type) {
            case InterpolationType.Auto: {
                this.bicubic(canvas);
                break;
            }
            case InterpolationType.CrispEdges: {
                this.crisp(canvas);
                break;
            }
        }
    }
};

Object.freeze(CanvasInterpolation);

export default CanvasInterpolation;