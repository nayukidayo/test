setInterval(() => {
  process.send({ hello: 'world' })
}, 3e3)
