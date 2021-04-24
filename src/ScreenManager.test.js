import ScreenManager from './ScreenManager';


describe('ScreenManager',()=>{
    const svg = document.createElement('svg');
    svg.setAttribute("width", "100px");
    svg.setAttribute("height", "100px");

    const homeScreen = document.createElement('rect');
    homeScreen.setAttribute("id", "_P_HOME");
    homeScreen.setAttribute("x", "1");
    homeScreen.setAttribute("y", "1");
    homeScreen.setAttribute("width", "1");
    homeScreen.setAttribute("height", "1");
    svg.append(homeScreen);

    const secondScreen = document.createElement('rect');
    secondScreen.setAttribute("id", "_P_SECOND");
    secondScreen.setAttribute("x", "2");
    secondScreen.setAttribute("y", "2");
    secondScreen.setAttribute("width", "1");
    secondScreen.setAttribute("height", "1");
    svg.append(secondScreen);

    const button = document.createElement('g');
    button.setAttribute('id', '_B_SECOND');
    svg.append(button);

    it('dado un svg blanquea su alto y acho', ()=>{
        new ScreenManager(svg);

        expect(svg.getAttribute("height")).toEqual("");
        expect(svg.getAttribute("width")).toEqual("100%");
    })

    it('dado un svg crea el mapa de pantallas de la forma {id: svgNodeViewBox}', ()=>{
        let sm =new ScreenManager(svg);

        expect(sm.getViewBoxMap()).toEqual({_P_HOME:"1 1 1 1", _P_SECOND: "2 2 1 1"})
    })

    it('dado un svg guarda la pantalla home como la seleccionada', ()=>{
        let sm =new ScreenManager(svg);

        expect(svg.getAttribute('viewBox')).toEqual(sm.getViewBoxMap()._P_HOME);
    })

    it('configura los botones dentro del svg para cargar la pantalla target al hacerle click', ()=>{
        let sm = new ScreenManager(svg);

        button.click();

        expect(svg.getAttribute('viewBox')).toEqual(sm.getViewBoxMap()._P_SECOND);
    })

    it('no hace nada si no hay pantallas', ()=>{
        new ScreenManager(document.createElement('svg'));
    })

    it('soporta el fix de corel para ids duplicados', ()=>{
        const button2 = document.createElement('g');
        button2.setAttribute('id', '_B_SECOND_0');
        svg.append(button2);
        let sm = new ScreenManager(svg);

        button2.click();

        expect(svg.getAttribute('viewBox')).toEqual(sm.getViewBoxMap()._P_SECOND);
    })
})