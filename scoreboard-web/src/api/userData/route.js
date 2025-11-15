export function POST(req){
    const {name, age} =  req.json()
    console.log("Received user data:", { name, age });

}