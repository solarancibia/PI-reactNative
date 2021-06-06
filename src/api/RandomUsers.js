export async function getData() {
        try {
                const resultado = await fetch (  "https://randomuser.me/api/?results=5")
                const json = await resultado.json();
                return json.results;
        } catch(e){
            console.log(e);
        }
}

