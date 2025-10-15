
    
    const form = document.getElementById('miFormularioDeContacto');

    
    form.addEventListener('submit', function(event) {
        // evita la recarga de la pagina
        event.preventDefault();

        // esconde el contenedor del formulario usando la clase 'd-none'.
        document.getElementById('formulario-contenedor').classList.add('d-none');

        // alerta de exito 
        document.getElementById('alerta-exito').classList.remove('d-none');
    });

