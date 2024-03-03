import type { Signature } from '~/server/utils/drizzle'

export default eventHandler(async (event) => {
  const body: Signature = await readBody(event)

  body.social = JSON.stringify(body.social) as any

  try {
    const signature = await useDrizzle().insert(tables.signatures).values({
      ...body,
      createdAt: new Date(),
    }).returning().get()

    return signature
  }
  catch (error: any) {
    throw createError({
      statusCode: 400,
      message: error?.message.message,
    })
  }
})
