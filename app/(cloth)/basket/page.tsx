'use client'
import { useEffect, useState } from 'react'
import styles from './page.module.css'
import { getProductById } from '../../API/getProductById';
import { IProduct } from '../../../interfaces/product.interface';
import { OrderForm, ProductForm } from '../../components';
import { IProductForm } from '../../../interfaces/productForm.interface';

export default function Basket ():JSX.Element {

    const [productsArray, setProductsArray] = useState<IProduct[]>([])
    const [formData, setFormData] = useState<IProductForm[]>([])

    useEffect(() => {
        const cookie = document.cookie.split(';').find(c => c.trim().startsWith('product='));
    if (!cookie) {
        return;
    }
    const products = JSON.parse(cookie.split('=')[1]);

    const fetchProducts = async () => {
        const productData: IProduct[] = [];
        for (const product of products) {
            const data: IProduct = await getProductById(product);
            productData.push(data);
        }
        setProductsArray(productData);
    };

    fetchProducts();
    
        
    }, [])

    const onChangeForm = (data) => {
        setFormData(prevData => {
            const index = prevData.findIndex(item => item.id === data.id);
            
            if(index === -1) {
                // Якщо об'єкт з таким id не знайдено, додаємо новий об'єкт до formData
                return [...prevData, data];
            } else {
                // Якщо об'єкт з таким id вже існує, оновлюємо його значення
                return prevData.map(item => (item.id === data.id ? data : item));
            }
        });
        
    }
    
    return (
        <div className={styles.basket}>
            <div className={styles.productsContainer}>
                {productsArray.length > 0 && productsArray.map((product, index) => (
                    <ProductForm product={product} key={index} handleOnChange={onChangeForm}></ProductForm>
                ))}
            </div>
            <OrderForm products={formData}></OrderForm>
        </div>
    )
}