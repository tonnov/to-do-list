

require('colors');
const { guardarDB, leerDB } = require('./helpers/data');
const { inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar, listadoTareasChecklist } = require('./helpers/inquirer');

const Tareas = require('./models/tareas');



const main = async () =>{

    let opt = '';
    const tareas = new Tareas();
    
    const tareasDB = leerDB();

    if (tareasDB) {
        tareas.listadoArr = tareasDB;
    }

    do{
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                // Crear opcion
                const desc = await leerInput('Descripcion:');
                tareas.crearTarea( desc );
            break;
            case '2':
                // console.log(tareas.listadoArr);
                tareas.listadoCompleto();
            break;
            case '3':
                tareas.listarPorEstado(true);
            break;
            case '4':
                tareas.listarPorEstado(false);
            break;
            case '5':
                const ids = await listadoTareasChecklist( tareas.listadoArr );
                tareas.toggleCompletadas( ids );
            break;
            case '6':
                const id = await listadoTareasBorrar( tareas.listadoArr );
                if (id !== '0') {
                    const conf = await confirmar('¿Desea continuar con la eliminación?');
                    if (conf) {
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada');
                    }
                }
            break;

            default:
                break;
        }

        guardarDB(tareas.listadoArr);

        await pausa();

    } while (opt !=='0')
    
}


main();