import { Icon } from "@/components";
import styles from './styles.module.css'

type SearchProps = {
  valueSearch: string
  onSubmit: (value: string) => void
  setValue: (value: boolean) => void
  value: boolean
}

export function InputSearch({ valueSearch, onSubmit, setValue, value }: SearchProps) {
  return (
    <div className={styles.container}>
      <div className={styles.inputSearch}>
        <Icon name="IconSVGSearch" size={24} />
        <input name="query" placeholder='Procure seu Pokemon' value={valueSearch} onChange={(e) => onSubmit(e.target.value)} />

        <button onClick={() => onSubmit('')} type="button" className={styles.buttonClose}>
          <Icon name="IconSVGClose" size={24} />
        </button>
      </div>

      <button type="button" onClick={() => setValue(!value)} className={styles.button}>Pesquisar</button>
    </div>
  )
}