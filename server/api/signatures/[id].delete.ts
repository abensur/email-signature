export default eventHandler(async (event) => {
  const { id } = getRouterParams(event)

  const deletedSignature = await useDrizzle().delete(tables.signatures).where(and(
    eq(tables.signatures.id, Number(id)),
  )).returning().get()

  if (!deletedSignature) {
    throw createError({
      statusCode: 404,
      message: 'Todo not found',
    })
  }
  return deletedSignature
})
