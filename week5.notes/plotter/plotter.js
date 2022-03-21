
const minX =  0;
const maxX =  6;
const minY = -1;
const maxY =  1;

function start() {
    const userFunction = document.getElementById('user_function');
    const canvas       = document.getElementById('canvas');

    // how to display?
    //display(canvas, x => eval(userFunction) ); //doesn't work
    //display(canvas, x => Math.sin(x) ); // try out with using the funciton it slef
   //display(canvas, x => eval('Math.sin(x)' )); // using with eval
    //display(canvas, x => eval(userFunction.value )); //is called x times
    //const f = Function("x","return " + userFunction.value) + ";"; // introduce the Function to avoid using eval
    const makeF = () => Function("x","return " + userFunction.value + ";"); // f has tu be changeble in the listener onchenge

    userFunction.onchange = _ => display(canvas, makeF()); //_ sag nichts machechen
    //display(canvas, x => f(x)); //apply eta reduction
    //display(canvas, f); //apply eta reduction
    display(canvas, makeF()); // use now makeF() to use the listener above

}

function display(canvas, f) {
    // clear
    const context     = canvas.getContext("2d");
    context.fillStyle = "papayawhip";
    context.fillRect(0, 0, canvas.width, canvas.height);
    // draw the function plot
    const normx = normalizeX(canvas.width);
    const normy = normalizeY(canvas.height);

    context.fillStyle = "black";
    context.beginPath();
    context.moveTo(normx(minX), normy(f(minX)));

    const stride = (maxX - minX) / 100; // 100 Stützstellen
    for (let x = minX; x <= maxX; x += stride) {
        context.lineTo(normx(x), normy(f(x)));
        context.stroke();
    }
}

const normalizeY = height => y => {
    const scaleFactor = height / (maxY - minY);
    return height - (y - minY) * scaleFactor;
};

const normalizeX = width => x => {
    const scaleFactor = width / (maxX - minX);
    return ( x - minX) * scaleFactor;
};
