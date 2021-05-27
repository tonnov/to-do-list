
const inquirer = require('inquirer');
require('colors');

const menuOpts = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Que desea hacer?',
        choices: [
            {
                value: '1',
                name: `${'1.'.brightCyan} Crear tarea`
            },
            {
                value: '2',
                name: `${'2.'.brightCyan} Listar tareas`
            },
            {
                value: '3',
                name: `${'3.'.brightCyan} Listar tareas completadas`
            },
            {
                value: '4',
                name: `${'4.'.brightCyan} Listar tareas pendientes`
            },
            {
                value: '5',
                name: `${'5.'.brightCyan} Completar tarea(s)`
            },
            {
                value: '6',
                name: `${'6.'.brightCyan} Borrar tarea`
            },
            {
                value: '0',
                name: `${'0.'.brightCyan} Salir`
            },
        ]
    }
];

const inquirerMenu = async () => {

    console.clear();
    console.log('========================='.green);
    console.log('  Seleccione una opción  '.white);
    console.log('=========================\n'.green);

    const {opcion} = await inquirer.prompt(menuOpts);
    return opcion;
}

const pausa = async () => {

    // const confirm = inquirer.prompt([
    //     {
    //         name: 'confirma',
    //         type: 'confirm',
    //         message: '¿Desea continuar?'
    //     }
    // ]);
    // return confirm;

    console.log('\n');
    await inquirer.prompt([
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${ 'ENTER'.yellow } para continuar `
        }
    ]) 
}

const leerInput = async ( message ) => {
    
    console.log('\n');
    const { desc } = await inquirer.prompt([
        {
            type: 'input',
            name: 'desc',
            message,
            validate( value ){
                if(value.length === 0){
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ]) 

    return desc;

}

const listadoTareasBorrar = async( tareas = []) => {
    
    const choices = tareas.map( (tarea, idx) => {

        return {
            value: tarea.id,
            name: `${ ++idx } ${tarea.desc}`
        }

    });

    choices.unshift({
        value: '0',
        name: '0. Cancelar'
    });
    
    const { id } = await inquirer.prompt([
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ]);
    
    return id;
}

const listadoTareasChecklist = async( tareas = []) => {
    
    const choices = tareas.map( (tarea, idx) => {

        return {
            value: tarea.id,
            name: `${ ++idx } ${tarea.desc}`,
            checked: (tarea.completadoEn) ? true : false
        }

    });
    
    const { ids } = await inquirer.prompt([
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione',
            choices
        }
    ]);
    
    return ids;
}

const confirmar = async (message) => {

    const confirm = inquirer.prompt([
        {
            type: 'confirm',
            name: 'confirma',
            message
        }
    ]);

    return confirm;

}



module.exports = {
    inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar, listadoTareasChecklist
}