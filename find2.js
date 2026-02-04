use('bosch')

db.people.insertMany([
    {
      nome: "Ana Silva",
      telefone: "999912345",
      email: "ana.silva@gmail.com",
      cidade: "São Paulo",
      dataCadastro: new Date("2023-02-10")
    },
    {
      nome: "Bruno Costa",
      telefone: "41987654321",
      email: "bruno.costa@hotmail.com",
      cidade: "Curitiba",
      dataCadastro: new Date("2022-11-05")
    },
    {
      nome: "Amanda Souza",
      telefone: "988776655",
      email: "amanda.souza@gmail.com",
      cidade: "Rio de Janeiro",
      dataCadastro: new Date("2024-01-15")
    },
    {
      nome: "Carlos Pereira",
      telefone: "41911223344",
      email: "carlos@empresa.com",
      cidade: "Curitiba",
      dataCadastro: new Date("2023-06-20")
    },
    {
      nome: "Daniel Rocha",
      telefone: "977665544",
      email: "daniel.rocha@gmail.com",
      cidade: "São Paulo",
      dataCadastro: new Date("2021-09-30")
    }
])

use('bosch')

db.people.find({ nome: /^a/i})

use('bosch')

db.people.find({ telefone: /^9/})

use('bosch')

db.people.find({ email: /gmail\.com/})

use('bosch')

db.people.find({ cidade: /são paulo/i})

use('bosch')

db.people.find({ dataCadastro: { $gt: new Date("2023-01-01")}})

use('bosch')

