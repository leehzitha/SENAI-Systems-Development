use('bosch')

db.people.updateOne(
    { nome: /ana silva/i },
    { $set: { telefone: 999999999 } }
)

use('bosch')
db.people.updateOne(
    { nome: /carlos pereira/i },
    { $set: { cidade: "Belo Horizonte" } }
)

use("bosch")
db.people.updateMany(
    { telefone: /^41/ },
    { $set: { cidade: "Curitiba" } }
)

