'use client'

import { CreateProductFormProps } from "./CreateProductFormProps";
import cn from 'classnames';
import styles from './CreateProductForm.module.css'
import { Alert, Button, DropBox, Input, Textarea, H } from "../../../components";
import { useState } from "react";
import DownloadImageIcon from '../../../../public/downloadImage.svg'
import Image from 'next/image'
import { useFieldArray, useForm, Controller } from "react-hook-form";
import { IProduct } from "../../../../interfaces/product.interface";
import { API } from "../../../../helpers/api";
import AddIcon from '../../../../public/add.svg'

export const CreateProductForm = ({className, ...props}: CreateProductFormProps): JSX.Element => {
    const [uploadedFileUrl, setUploadedFileUrl] = useState<string>();
    const [uploadedFile, setUploadedFile] = useState<File>();
    const {register, handleSubmit, control} = useForm<Pick<IProduct, 'name' | 'description' | 'color' | 'price' | 'photo' | 'category' | 'type' | 'width' | 'height' | 'value'>>({
        defaultValues: {
            value: []
        }
    })
    const {fields, append, remove} = useFieldArray({
        control,
        name: 'value'
    })
    const [category, setCategory] = useState('')
    const [error, setError] = useState<string>('')
    const [success, setSuccess] = useState<boolean>(false)


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

    const onSubmit = async (data) => {
        const image = uploadedFile? `${uploadedFile.name.split('.')[0]}.webp` : ''
        data.category = category
        data.photo = [image]
        data.price = Number(data.price)
        data.width = 1;
        data.height = 2.9;
        const response = await fetch(API.products.create, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
        if(response.message) {
            setError(response.message)
            setTimeout(() => setError(''), 2000)
            return
        }
        setSuccess(true)
        setTimeout(() => setError(''), 2000)
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
            }

    }

    return (
        <form className={styles.form} {...props} onSubmit={handleSubmit(onSubmit)}>
            <Input inputValue="Назва" className={styles.name} createInput {...register('name')}/>
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
                uploadedFileUrl? <Image className={styles.image} src={uploadedFileUrl} width={320} height={320} alt="image"/>: <Image className={styles.image} src={'/empty.jpg'} width={320} height={320} alt="image"/>
            }
            <Input inputValue="Ціна" className={styles.price} createInput {...register('price')}/>
            <Input inputValue="Колір" className={styles.color} createInput {...register('color')}/>
            <Textarea value="Опис" className={styles.description} {...register('description')}/>
            <div className={styles.valueContainer}>
                <H tag="h3">Властивості:</H>
                <div className={styles.valueList}>
                    {fields.map((field, index) => (
                        <div key={field.id} className={styles.value}>
                            <Controller
                            name={`value.${index}.0`}
                            control={control}
                            render={({ field }) => <textarea {...field} placeholder="назва" className={styles.textarea}/>}
                            />
                            <Controller
                            name={`value.${index}.1`}
                            control={control}
                            render={({ field }) => <textarea {...field} placeholder="Значення"  className={styles.textarea}/>}
                            />
                            <Button appearance="black" size="l" onClick={() => remove(index)}>Видалити</Button>
                        </div>
                    ))}
                </div>
                <AddIcon onClick={() => append([''])}/>
            </div>
            <DropBox value="категорія" elements={['штори', 'тюлі']} isEditable onSave={(el) => {setCategory(el)}} className={styles.category}></DropBox>
            <Input inputValue="тип" className={styles.type} createInput {...register('type')}/>
            <Button appearance="black" size="l" className={styles.button}>Створити</Button>
            {error && <Alert appearance="error" >{error}</Alert>}
            {success && <Alert appearance="success" >Продукт успішно створено</Alert>}
        </form>
    )
}