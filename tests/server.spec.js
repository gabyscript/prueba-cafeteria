const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
    it("Status Code 200 - Obtener un arreglo", async () => {
        const response = await request(server).get("/cafes").send();
        const status = response.statusCode;
        expect(status).toBe(200)

        const { body } = await request(server).get("/cafes").send();
        const producto = body ;
        expect(producto).toBeInstanceOf(Array);
    }),

    it("Status Code 404 - Eliminar cafe con ID inexistente", async () => {
        const jwt = "token";
        const idRandom = Math.floor(Math.random() * 999) ;
        
        const response = await request(server)
            .delete(`/cafes/${idRandom}`)
            .set("Authorization", jwt)
            .send();
        const status = response.statusCode;
        expect(status).toBe(404)
                      
    }),
     
    it("Status Code 201 - Agregar Cafe", async () => {
        const id = Math.floor(Math.random() * 999);
        const nuevoCafe = { id, nombre: "Nuevo Cafe" };

        const response = await request(server)
            .post("/cafes")
            .send(nuevoCafe)
        const status = response.statusCode;
        expect(status).toBe(201)
    }),

    
    it("Status Code 400 - Parametro ID distinto al ID del payload", async () => {
        const newCafe = {
            id: 5,
            nombre: 'Cafe nuevo'
        };

        const response = await request(server)
            .put('/cafes/:id')
            .send(newCafe)
        expect(response.statusCode).toBe(400)
    })
    
});
