import { Bot, GrammyError, HttpError } from "grammy"
import { BOT_API_KEY } from "./config/token.js"
import { START_MESSAGE, ERROR_MESSAGE } from "./config/messages.js"
import { createTables } from "./storage/sqlite.js"
import { registerUser } from "./handlers/register-user.js"
import { logger } from "./logger/logger.js"

createTables()

const bot = new Bot(BOT_API_KEY)

bot.command("start", async (ctx) => {
  const name = ctx.message?.from.first_name ?? "Гость"
  const id = ctx.message?.from.id
  if (!id) {
    await ctx.reply(ERROR_MESSAGE)
    return
  }

  registerUser(id as number, name)

  logger.info("user registred", ctx.message?.from)

  await ctx.reply(START_MESSAGE)
})

bot.catch((err) => {
  const ctx = err.ctx
  console.error(`Error while handling update ${ctx.update.update_id}:`)
  const e = err.error
  if (e instanceof GrammyError) {
    console.error("Error in request:", e.description)
  } else if (e instanceof HttpError) {
    console.error("Could not contact Telegram:", e)
  } else {
    console.error("Unknown error:", e)
  }
})

bot.start()
