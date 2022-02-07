import { Telegraf } from 'telegraf'
import { S3 } from 'aws-sdk'

export const handler = async (event) => {
  let body = JSON.parse(event.body)

  const bot = new Telegraf(process.env.BOT_TOKEN)
  const s3 = new S3()

  bot.on('photo', async (ctx) => {
    const { file_id: fileId } = ctx.update.message.photo[0];
    const fileUrl = await ctx.telegram.getFileLink(fileId);
    console.log(fileUrl);
    ctx.reply(fileUrl.toString());

    /*
    TODO: receber o arquivo pelo telegram e salvar no s3
    */
    //await s3.putObject()
  })

  await bot.handleUpdate(body)

  return {statusCode: 200, body: ''}
}