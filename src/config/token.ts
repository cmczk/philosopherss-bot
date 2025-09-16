import "dotenv/config"

const requireBotApiKey = (): string => {
  const token = process.env.BOT_API_KEY
  if (!token) {
    throw new Error("can't read BOT_API_KEY environment variable")
  }

  return token
}

export const BOT_API_KEY = requireBotApiKey()
