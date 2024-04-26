//Boton calcular
//FUNCIONAIENTO CON HTML Y JS
var boton = document.getElementById('btnCalcular');
boton.addEventListener('click',calcular);

function calcular(){
    //guardamos el valor del input en una variable n
    var n = parseInt(document.getElementById('numero').value);
    //capturamos el tiempo antes de ejecutar la función
    var t0 = performance.now()   
    //ejecutamos la función
    var resultado = deBruijn(n,k,A);
    //capturamos el tiempo después de ejecutar la función
    var t1 = performance.now();
    //calculamos el tiempo que tardó la función
    var tiempo = t1 - t0;
    //imprimimos en el html la serie mandandola a llamar
    document.getElementById('TxtSerie').innerText = resultado;
    //imprimimos en el html el tiempo que tardó la función
    document.getElementById('tiempo').innerText = "Tiempo de ejecución: " + tiempo + " milisegundos.";

}

//FUNCIONAMIENTO LOGICO

//Se declaran 2 variables globales
//Almacena un conjunto de cadenas de caracteres que ya hemos visto
//Set es una estructura de datos que nos permite almacenar elementos únicos
var elementosVistos = new Set(); 
//Almacena el numero de conexiones(aristas) entre dos nodos
var secuenciasGeneradas = []; 

/*k se establece en 2 porque representa el número de 
caracteres diferentes que se utilizarán en la secuencia "0" "1"
*/
var k = 2; 
// La variable A representa los elementos que se ocupan "0" y "1"
var A = "01"; 

/* La función es una búsqueda en profundidad 
Toma tres parámetros: nodo (la subcadena actual), k=2 y A=[0,1]
*/
function dfs(nodo, k, A) 
{
    // bucle que recorre cada elemento de A .
    //comienza con i igual a 0 y continúa hasta que i es menor que 2
    //En cada iteración del bucle, i se incrementa en 1. Se utiliza para iterar sobre cada elemento del array
	for (var i = 0; i < k; ++i) 
	{ 
        //guardamos en una variable la concatenacion de dos cadenas de texto: nodo y A[i].
        //Ejemplo
        /*En la primera iteración de nuestro bucle, i es 0, por lo que A[i] es 0. Entonces, al hacer nodo + A[i], estamos añadiendo el carácter 0 al final de nuestro nodo, resultando en 0000.
        En la siguiente iteración, i es 1, por lo que A[i] es 1. Entonces, al hacer nodo + A[i], estamos añadiendo el carácter 1 al final de nuestro nodo, resultando en 0001.*/		
        var str = nodo + A[i]; 
        //Se verifica si la cadena str ya ha sido vista. Si no ha sido vista, entonces entramos en el bloque de código dentro de esta condición.
		if (!elementosVistos.has(str)) 
		{ 
            // Se añade la cadena str al conjunto elementosVistos para llevar un registro de todas las subsecuencias únicas que se han generado.
			elementosVistos.add(str); 
            // Se realiza una llamada recursiva a la función dfs con el siguiente nodo, que es la cadena str sin el primer carácter, para continuar generando subsecuencias a partir de ese punto.
			dfs(str.substring(1), k, A); 
            // Se guarda el índice del elemento actual i en el arreglo secuenciasGeneradas. 
			secuenciasGeneradas.push(i); 
		} 
	} 
} 

// Función para encontrar una secuencia de de Bruijn 
//Toma 3 parametros n(longitud de las secuencias que quieres generar) 
//k(número de símbolos diferentes que puedes usar 2) 
//A(array con los símbolos 1 y 0 que puedes usar)
function deBruijn(n, k, A) 
{ 
	// Reinicio de variables globales poninedo un conjunto vacio

    //Almacena las secuencias que ya se han visitado durante la busqueda
	elementosVistos = new Set(); 
    //almacena las secuencias generadas.
	secuenciasGeneradas = []; 
    //se crea una variable llamada nodoInicio y se le asigna una secuencia inicial.
    //A[0] selecciona el primer elemento del array A
    //.repeat(n-1) método de JavaScript que crea una nueva cadena de texto que contiene las copias de la cadena original
    //En este caso, está repitiendo el primer símbolo n-1 veces.
    //si el conjunto de símbolos es ['0', '1'] y n es 3, entonces nodoInicio sería '00'
	var nodoInicio = A[0].repeat(n-1); 
    //se llama a la función busqueda para generar todas las secuencias posibles a partir del nodo inicial
    dfs(nodoInicio, k, A); 
	return secuenciasGeneradas; 
} 




/*Boton combinaciones*/

var botonCombinaciones = document.getElementById('btnCombinaciones');
botonCombinaciones.addEventListener('click',imprimirCombinaciones);

function imprimirCombinaciones(){
    var n = parseInt(document.getElementById('numero').value);
    var resultado = deBruijn(n,k,A);
    let tamañoArray = resultado.length;
    let txtCombinaciones = document.getElementById('TxtCombinaciones');

    let TxtFormula = document.getElementById('formula');
    let resultadoFormula = 2**n;
    TxtFormula.innerText = "2 a la " + n + " = " + resultadoFormula;

    // Borrar todos los elementos existentes
    while (txtCombinaciones.firstChild) {
        txtCombinaciones.removeChild(txtCombinaciones.firstChild);
    }

    for (let i = 0; i < tamañoArray; i++) {
        let combination = '';
        for (let j = 0; j < n; j++) {
            combination += resultado[(i + j) % tamañoArray];
        }
        let divCol = document.createElement('div');
        divCol.className = 'col';
        let span = document.createElement('span');
        span.className = 'fs-6 badge text-bg-success';
        span.textContent = combination;
        divCol.appendChild(span);
        txtCombinaciones.appendChild(divCol);        
    }
}



