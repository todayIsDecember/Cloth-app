'use client'

import { AutoComplitProps } from "./AutoComplitProps";
import cn from 'classnames';
import styles from './AutoComplit.module.css'
import { MouseEventHandler, useState } from "react";
import { Input } from "../input/Input";
import { getAddresses } from "../../API/getAddresses";
import { getWarehouses } from "../../API/getWarehouses";

export const AutoComplit = ({className, type, onSave, city, getResponse, ...props}: AutoComplitProps): JSX.Element => {
  const [searchValue, setSearchValue] = useState('');
  const [results, setResults] = useState<string[]>([]);

  const handleInputChange = async (e: any) => {
    const value = e.target.value
    setSearchValue(value);
    if(value.length >= 3 || type === 'відділення') {
      try {
        const response = type === 'населений пункт' ?  await getResponse(value): await getWarehouses(value, city)
        setResults(response);
      } catch (error) {
        console.error('Error fetching autocomplete results:', error);
      }
    }else {
      setResults([])
    }
  }

  const onClickHandler = (e: any) => {
    setSearchValue(e.target.textContent);
    onSave(e.target.textContent);
    setResults([]);
  }

    return (
      <div className={cn(className, styles.autoComplit)} {...props}>
        <Input inputValue={type} onChange={handleInputChange} value={searchValue} onClick={handleInputChange}/>
        <ul className={styles.list}>
          {results.map((result, index) => (
            <li key={index} className={styles.item} onClick={onClickHandler} >{result}</li>
          ))}
        </ul>
      </div>
    )
}