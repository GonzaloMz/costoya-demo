
export default class ScreenManager{
    /**
     * 
     * @param {HTMLElement} svgNode 
     */
    constructor(svgNode){
        svgNode.setAttribute("width", "100%");
        svgNode.setAttribute("height", "");
        this.svgNode = svgNode;
        this.viewBoxMap = createViewBoxMap(this.svgNode);
	if(this.viewBoxMap._P_HOME)
            this.svgNode.setAttribute("viewBox", this.viewBoxMap._P_HOME);
        configureButtons(this);
    }

    setSelectedScreen = (screen) => {
        let pattern =   /[_]+[0-9]+/g;
        let screenName=screen.replace(pattern, '');
        const viewBox = this.viewBoxMap[screen]? this.viewBoxMap[screen] : this.viewBoxMap[screenName];
        this.svgNode.setAttribute("viewBox", viewBox);
    }

    getViewBoxMap = () => {
        return this.viewBoxMap;
    }
}
/**
 * 
 * @param {HTMLElement} svg 
 */
function createViewBoxMap(svg) {
   let screens = svg.querySelectorAll("rect[id^=_P_]");
   let vbMap = {};
   screens.forEach((screen)=>{
       const id = screen.getAttribute("id");
       vbMap[id] = `${screen.getAttribute("x")} ${screen.getAttribute("y")} ${screen.getAttribute("width")} ${screen.getAttribute("height")}`
   })
    return vbMap;
}

/**
 * 
 * @param {ScreenManager} sm 
 */
function configureButtons(sm){
    let buttons = sm.svgNode.querySelectorAll("g[id^=_B_]");
    buttons.forEach(button => {
        const buttonTarget = button.getAttribute('id').replace('_B_', '_P_');

        button.addEventListener('click', ()=> {
            sm.setSelectedScreen(buttonTarget);
        })
    })
}
