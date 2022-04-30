const express = require("express");
const { json } = require("express/lib/response");
const { v4: uuidv4 } = require("uuid")
const cors = require('cors')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const app = express();

app.use(express.json());

app.use(cors())

function verificarQuadraExistente(request, response, next) {
    const { id } = request.headers;

    const quadra = await prisma.quadras.findUnique({
        where: {
            id: id
        }
    });

    if (!quadra)
        return response.status(400).json({ message: "Quadra não encontrada." });

    request.quadra = quadra;

    return next();
}

app.get("/quadras", (request, response) => {
    const { name } = request.query;

    if (name) {
        const quadraExistente = await prisma.quadras.findFirst({
            where: {
                name: name
            }
        });

        return response.json(quadraExistente)
    }

    return response.json(quadras);
});

app.get("/quadras/:id", (request, response) => {
    const { id } = request.params;
    return response.json({})
});

app.post("/quadras", async (request, response) => {
    const { name, description } = request.body;

    if (!name)
        return response.status(400).json({ message: "Nome da quadra é obrigatório." });

    const quadraExistente = await prisma.quadras.findFirst({
        where: {
            name: name
        }
    });

    if (quadraExistente)
        return response.status(400).json({ message: "Nome já cadastrado para uma quadra." });

    await prisma.quadras.create({
        data: {
            name: name,
            description: description
        }
    });

    return response.status(201).send();
});

app.put("/quadras/:id", verificarQuadraExistente, async (request, response) => {
    const { name, description } = request.body;
    const { id } = request.params;

    var result = await prisma.quadras.update({
        data: {
            name: name,
            description: description
        },
        where: {
            id: id
        }
    })

    return response.send();
});

app.delete("/quadras/:id", verificarQuadraExistente, async (request, response) => {
    const { id } = request.params;

    await prisma.quadras.delete({
        where: {
            id: id
        }
    });

    return response.send();
})

app.listen(3333);