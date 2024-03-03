export default eventHandler(async () => {
  const todos = await useDrizzle().select().from(tables.signatures).all()

  return todos
})
