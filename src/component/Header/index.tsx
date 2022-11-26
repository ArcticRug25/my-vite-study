import styles from './index.module.scss'
// import imgTest from '@assets/img/test.png'
import { ReactComponent as ReactLogo } from '@assets/icons/react.svg'
// import Worker from './example.js?worker'
// const worker = new Worker()
// worker.addEventListener('message', (e) => {
//   console.log(e)
// })

export function Header() {
  return (
    <div>
      <ReactLogo />
      <p className={styles.header}>This is Header</p>
    </div>
  )
}
