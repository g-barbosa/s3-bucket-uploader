import { Telegraf } from 'telegraf'
import { S3 } from 'aws-sdk'
import request from 'request-promise-native'

export const handler = async (event) => {
  let body = JSON.parse(event.body)

  const bot = new Telegraf(process.env.BOT_TOKEN)
  const s3 = new S3()

  bot.on('photo', async (ctx) => {
    const photos = ctx.update.message.photo;
    const { file_id: fileId } = photos[photos.length - 1];
    const fileUrl = await ctx.telegram.getFileLink(fileId);

    const filename = fileId + `.${fileUrl.toString().slice(-3)}`

    var options = {
      uri: fileUrl.toString(),
      encoding: null
    }

    const body = await request(options);

    ctx.reply('Fazendo upload da imagem...');

    await s3.upload({
      Bucket: process.env.BUCKET_NAME,
      Key: filename,
      ACL: 'public-read',
      Body: body
    }).promise()
  })

  await bot.handleUpdate(body)

  return {statusCode: 200, body: 'upload do arquivo feito com sucesso'}
}