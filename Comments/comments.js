const comments =[];
const inputContainer = document.createElement('div');
const input = document.createElement('input');
const commentsContainer = document.querySelector('#comments-container');

input.classList.add('input');

input.addEventListener('keydown', e =>{
    handleEnter(e, null);

})

commentsContainer.appendChild(inputContainer);
inputContainer.appendChild(input);

function handleEnter(e, current){
    // Condicion para crear un comentario al preionar enter y solo si el input no esta vacio
    if (e.key === 'Enter' && e.target.value !== ''){
        // Creando objeto clave/valor para almacenar el comentario
        const newComment = {
            text: e.target.value,
            likes: 0,
            responses: []
        }

        if (current === null){
            comments.unshift(newComment);
        } else{
            current.responses.unshift(newComment);
        }

        e.target.value = '';
        commentsContainer.innerHTML = '';
        commentsContainer.appendChild(inputContainer);
        
        renderComments(comments, commentsContainer);
    }
    
}

function renderComments(array, parent){
    array.forEach(element => {
        const commentContainer = document.createElement('div');
        commentContainer.classList.add('comment-container');

        const responsesContainer = document.createElement('div');
        responsesContainer.classList.add('responses-container');

        const replyButton = document.createElement('button');
        const likeButton = document.createElement('button');

        const textContainer = document.createElement('div');
        textContainer.textContent = element.text;

        const actionsContainer = document.createElement('div');


        replyButton.textContent = 'Reply';
        likeButton.textContent = `${element.likes > 0? `${element.likes} Likes`: `Like` }`;

        replyButton.addEventListener('click', e =>{
            // Clona el inputContainer y mediante el true, clona tambien a los elementos hijos
            const newInput = inputContainer.cloneNode(true);
            // Al clonar el inputContainer lo hace con el texto que este contiene, por lo que es necesario limpiar
            newInput.value = '';
            newInput.focus();
            newInput.addEventListener('keydown', e =>{
                handleEnter(e, element)
            });
            commentContainer.insertBefore(newInput, responsesContainer);
        } );

        likeButton.addEventListener('click', e =>{
            element.likes++;
            likeButton.textContent = `${element.likes > 0? `${element.likes} Likes`: `Like` }`;
        } );

        // append, otro metodo alternativo al inherHTML
        commentContainer.appendChild(textContainer);
        commentContainer.appendChild(actionsContainer);
        actionsContainer.appendChild(replyButton);
        actionsContainer.appendChild(likeButton);

        commentContainer.appendChild(responsesContainer);
        
        // Recursividad (tecnica de programacion) ejecucion simultanea de la funcion renderComments, esta condicion define cuando detener el bucle forEach
        if(element.responses.length > 0){
            renderComments(element.responses, responsesContainer);
        }
        parent.appendChild(commentContainer);
    });
}
