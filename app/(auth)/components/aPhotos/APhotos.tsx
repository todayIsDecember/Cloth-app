'use client'

import { APhotosProps } from "./APhotosProps";
import cn from 'classnames'
import styles from './APhotos.module.css'
import { Alert, Button, H } from "../../../components";
import Image from 'next/image'
import { API } from "../../../../helpers/api";
import { useEffect, useState } from "react";
import DownloadImageIcon from '../../../../public/downloadImage.svg'

export const APhotos = ({images, product_id, className, ...props}: APhotosProps): JSX.Element => {
  const [selectedImages, setSelectedImages] = useState<string>('');
  const [uploadedFileUrl, setUploadedFileUrl] = useState<string>();
  const [uploadedFile, setUploadedFile] = useState<File>();
  const [error, setError] = useState<string>('');
  const [imagesArray, setImagesArray] = useState<string[]>(images);
  const [onMain, setOnMain] = useState<boolean>(false);
  const [onDelete, setOnDelete] = useState<boolean>(false);

  useEffect(() => {
    const sendFetch = async () => {
      if(uploadedFileUrl)
        {
          const response = await fetch(`${API.products.edit}/${product_id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              "photo": imagesArray
            })
          }).then(res => res.json())
          if(response.message) {
            setError(response.message)
            setTimeout(() => setError(''), 2000)
            return
          }
          setUploadedFile(undefined)
          setUploadedFileUrl(undefined)

        }
      if(onMain)
        {
          const response = await fetch(`${API.products.edit}/${product_id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              "photo": imagesArray
            })
          }).then(res => res.json())
          if(response.message) {
            setError(response.message)
            setTimeout(() => setError(''), 2000)
            return
          }
          setOnMain(false)
        }
      if(onDelete)
        {
          const response = await fetch(`${API.products.edit}/${product_id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              "photo": imagesArray
            })
          }).then(res => res.json())
          if(response.message) {
            setError(response.message)
            setTimeout(() => setError(''), 2000)
            return
          }
          setOnDelete(false)
          await fetch(API.image.delete, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              "fileName": selectedImages
            })
          })
          setSelectedImages('')
        }

    }

    sendFetch()
}, [imagesArray])

  const onClickImageHandler = (image: string) => {
    if(selectedImages === '')
      {
        setSelectedImages(image)
        return
      }
      else if(selectedImages !== image)
      {
        setSelectedImages(image)
        return
      }
      else
      {
        setSelectedImages('')
      }

  }

  const onChangeOnMainHandler = () => {
    if(selectedImages === '')
    {
      setError('Оберіть зображення')
      setTimeout(() => setError(''), 2000)
      return
    }
    else
    {
      if(imagesArray.indexOf(selectedImages) === 0) {
        setError('Це зображення є головним')
        setTimeout(() => setError(''), 2000)
        return
      }
      else {
        setImagesArray((array) => {
          const newImages = [...array]
          newImages.splice(newImages.indexOf(selectedImages), 1)
          newImages.unshift(selectedImages)
          setSelectedImages('')
          return newImages
        })
        setOnMain(true)
      }
    }
  }
  const onDeleteHandler = () => {
    if(selectedImages === '')
    {
      setError('Оберіть зображення')
      setTimeout(() => setError(''), 2000)
      return
    }
    else
    {
      setImagesArray((array) => {
        const newImages = [...array]
        newImages.splice(newImages.indexOf(selectedImages), 1)
        return newImages
      })
      setOnDelete(true)
    }
  }

  const handleImageUpload = (changeEvent:any) => {
    const image = changeEvent.target.files[0];

    setUploadedFile(image)

    if(image) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result;
        if(result && typeof result === 'string') {
          setUploadedFileUrl(reader.result as string)
        }else {
          setUploadedFileUrl(reader.result as string)
        }
      };
      reader.readAsDataURL(image)
    }
  }

  const onSaveImageHandler  = async () => {
    if(uploadedFile)
    {
      const date = new FormData();
      date.append('files', uploadedFile, uploadedFile.name)
      const response = await fetch(API.image.upload, {
        method: 'POST',
        body: date
      })
      const data = await response.json()
      if(data.message) {
        setError(data.message)
        setTimeout(() => setError(''), 2000)
        return
      }
      setUploadedFile(undefined)
      setImagesArray((array) => {
        const newImages = [...array]
        newImages.push(data[0].name)
        return newImages
      })
    }
  }



  return (
    <div className={cn(className, styles.wrapper)} {...props}>
      <H tag="h1">Фотографії</H>
      <div className={styles.photosContainer}>
        {imagesArray.map((image, index) => (
          <Image
            key={index}
            src={`${API.image.get}/${image}`}
            width={150}
            height={150}
            alt="image"
            onClick={() => onClickImageHandler(image)}
            className={cn({[styles.selected]: selectedImages === image})}
          ></Image>
        ))}
          <div className={styles.addImage}>
            <input
              type="file"
              id="file"
              hidden
              accept="image/*"
              onChange={handleImageUpload}
            />
            <label htmlFor="file">
              <DownloadImageIcon/>
            </label>
          </div>
          {
            uploadedFileUrl && <Image src={uploadedFileUrl} width={150} height={150} alt="image"/>
          }
      </div>
      <div className={styles.buttonsContainer}>
        <Button appearance="transparent" size="l" className={styles.button} isActive={selectedImages !== ''} onClick={onChangeOnMainHandler}>Зробити головною</Button>
        <Button appearance="transparent" size="l" className={styles.button} isActive={selectedImages !== ''} onClick={onDeleteHandler}>Видалити</Button>
        <Button appearance="transparent" size="l" className={styles.button} isActive={uploadedFileUrl !== undefined} onClick={onSaveImageHandler}>Зберегти фотографію</Button>
        {error && <Alert appearance="error">{error}</Alert>}
      </div>
    </div>
  )
}