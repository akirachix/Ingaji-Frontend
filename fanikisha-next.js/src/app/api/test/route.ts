export async function GET() {
    try{
        const response = await fetch('https://fanikisha-3beb7fcefffe.herokuapp.com/api/farmers')
        const data = await response.json()

        return new Response(JSON.stringify(data), {
            status:200
        })
    }
    catch(error){
        const errors =  (error as Error).message
        console.log({errors});
        return new Response(errors, {
            status: 500
        })
        
    }
}