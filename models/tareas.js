
const Tarea = require('./tarea');


class Tareas {

    _listado = {};

    get listadoArr(){
        
        const listado = [];
        Object.keys(this._listado).forEach( key => {
            const tarea = this._listado[key];
            listado.push( tarea );
        });
        
        return listado;
    }

    set listadoArr(tareasArr = []){

        tareasArr.forEach( tarea => this._listado[tarea.id] = tarea )

    }

    constructor() {
        this._listado = {};
    }

    crearTarea( desc = ''){
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto() {

        // let tasks = {};

        this.listadoArr.forEach( (tarea, index) => {

            const status = (tarea.completadoEn) ? 'Completada'.green : 'Pendiente'.red;

            console.log(`${ index + 1 }. ${ tarea.desc } \t\t:: ${status}`);

            // const status = (tarea.completadoEn) ? 'Completada' : 'Pendiente';
            // let idx =  index + 1;
            // tasks[idx] = {'Tarea': tarea.desc, 'Estado': status};

        })
        // console.table(tasks);

        // .filter( (tarea) => (completada) ? tarea.completadoEn : !tarea.completadoEn )
    }


    listarPorEstado(completada = true){
        
        let idx = 1;

        this.listadoArr
        .filter( (tarea) => Boolean(tarea.completadoEn) === completada )
        .map(tarea => {
            const status = (tarea.completadoEn) ? `${'Completada'.green} ${tarea.completadoEn.white}` : 'Pendiente'.red;
            console.log(`${ idx++ }. ${ tarea.desc } \t\t:: ${status}`);
        })

    }

    borrarTarea(id = ''){

        if (this._listado[id]) {
            delete this._listado[id];
        }
        
    }

    toggleCompletadas( ids = [] ){
        
        // const notoggle = this.listadoArr.filter( tarea => !ids.includes(tarea.id) )
        // return notoggle;

        this.listadoArr.forEach( tarea => {

            tarea.completadoEn = (ids.includes(tarea.id)) ? new Date().toISOString() : null;

        })
        
    }

}




module.exports = Tareas;