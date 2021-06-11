export async function getData(cantidadDePersonas) {
        try {
                
                const resultado = await fetch (  "https://randomuser.me/api/?results=" + cantidadDePersonas)
                const json = await resultado.json();
                return json.results;
        } catch(e){
            console.log(e);
        }
}

