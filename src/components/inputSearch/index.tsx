"use client"
import Form from 'next/form'
import styles from './styles.module.css'
import { Icon } from "@/components";

type SearchProps = {
  valueSearch: string
  onSubmit: (value: string) => void
}

export function InputSearch({valueSearch, onSubmit}: SearchProps) {

  return (
    <Form action="/search" className={styles.inputSearch}>
      <Icon name="IconSVGSearch" size={24}/>
      <input name="query" placeholder='Search Pokemon' value={valueSearch} onChange={(e) => onSubmit(e.target.value)}/> 
    </Form>
  )
}