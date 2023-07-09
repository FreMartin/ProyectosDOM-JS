const inputCard = document.querySelector('#inputCard')
const inputDate = document.querySelector('#inputDate')
const inputCVV = document.querySelector('#inputCVV')

//Definiendo un patron a modo de formato para identificar y reemplazar mas adelante
const maskNumber = '####-####-####-####'
const maskDate = '##/##'
const maskCVV = '###'

let current = "" 
let cardNumber = [] 
let dateNumber = []
let cvvNumber = []

// Agregando un evento con la propiedad 'keydown' que hace referencia al momento que se presiona una tecla
inputCard.addEventListener('keydown', e =>{
    //Condicional cuando se presiona la tecla 'Tab' no aplica ningun cambio en el input
    if (e.key === 'Tab'){
        return
    }

    // 'preventDefault' elimina la funcionalidad nativa de 'keydown' en este caso
    e.preventDefault()

    //Funcion con parametros (Lo que se mostrará en el input, la tecla presionada, el valor del array que contiene los números de tarjeta digitados)
    handleInput(maskNumber, e.key, cardNumber)
    //Almacena lo ingresado en el input dentro de el arreglo que contiene cada numero de la tarjeta ingresado y lo separa con un espacio en blanco mediante la propiedad 'join'
    inputCard.value = cardNumber.join("")
} )


//Funcion para definir el formato reemplazando los valores de #, -, /, definidos por default
function handleInput(mask, key, array){
    //Definiendo un arreglo que contiene los valores admisibles para relizar la comparacion con lo ingresado por el usuario
    let numbers =["0","1", "2", "3", "4","5","6","7","8","9"]
    //Condicion para borrar caracteres
    if (key === 'Backspace' && array.length > 0){
        array.pop()
        return
    }
    //Condicion para validar caracteres ingresados en base al patron definido
    if (numbers.includes(key) && array.length+1 <= mask.length){
        //Condicion cuando se llegue al separador definido
        if(mask[array.length] === '-' || mask[array.length] === '/'){
            //Si se encuentra con un separador, lo conserva
            array.push(mask[array.length], key)
        }else{
            array.push(key)
        }
    }

}

inputDate.addEventListener('keydown', e => {
    if (e.key === 'Tab'){
        return
    }
    e.preventDefault()
    handleInput(maskDate, e.key, dateNumber)
    inputDate.value = dateNumber.join("")
})

inputCVV.addEventListener('keydown', e => {
    if (e.key === 'Tab'){
        return
    }
    e.preventDefault()
    handleInput(maskCVV, e.key, cvvNumber)
    inputCVV.value = cvvNumber.join("")
})

// Tratando de generar una funcion para ingresar fecha válida sin éxito :(
function handleInputDate(mask, key, array){
    let numbers =["0","1", "2", "3", "4","5","6","7","8","9"]
    
    if (key === 'Backspace' && array.length > 0){
        array.pop()
        return
    }
    if (numbers.includes(key) && array.length+1 <= mask.length){
        if(array[0] === 0 || (array[1] >=0 && array.length[1]<13)){
            if(mask[array.length] === '-' || mask[array.length] === '/'){
                array.push(mask[array.length], key)
            }else{
                array.push(key)
            } 
        }
    }
}
