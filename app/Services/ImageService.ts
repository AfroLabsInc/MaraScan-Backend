import Imagekit from 'imagekit'
import Env from '@ioc:Adonis/Core/Env'
import { promisify } from 'util'
import fs from 'fs'

type File = {
  tmpPath: string
  fileName: string
  folder: string
}

class ImageService {
  private uploader: Imagekit

  constructor() {
    this.uploader = new Imagekit({
      publicKey: Env.get('IMAGEKIT_PUBLIC_KEY'),
      privateKey: Env.get('IMAGEKIT_PRIVATE_KEY'),
      urlEndpoint: `https://ik.imagekit.io/${Env.get('IMAGEKIT_ID')}`,
    })
  }

  private saveToCloud(file: any, fileName: string, folder: string) {
    return new Promise((resolve, reject) => {
      this.uploader.upload({ file, fileName, folder }, (error, result) => {
        if (error) {
          reject(error)
        }

        resolve(result)
      })
    })
  }
  public async uploadImage({ tmpPath, fileName, folder }: File) {
    const readFile = promisify(fs.readFile)
    const unlink = promisify(fs.unlink)
    const filePath = tmpPath
    const fileRead = await readFile(filePath)
    await unlink(filePath)

    const {
      url,
      thumbnailUrl,
      fileId,
      fileType,
      size,
      height,
      width,
      filePath: path,
    }: any = await this.saveToCloud(fileRead, fileName, folder)

    return { url, thumbnailUrl, fileId, fileType, size, height, width, filePath: path }
  }

  public async uploadManyImages(files: File[]) {
    const promiseToUploadFiles = files.map((file) => this.uploadImage(file))
    return Promise.all(promiseToUploadFiles)
  }

  public deleteImage(fileId: string) {
    return new Promise((resolve, reject) => {
      this.uploader.deleteFile(fileId, (error, result) => {
        if (error) reject(error)
        resolve(result)
      })
    })
  }
}

export default new ImageService()
