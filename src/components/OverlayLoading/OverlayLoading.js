import React from 'react'

import styles from './OverlayLoading.module.scss'

const OverLayLoading = () => {
  return (
<div className={styles.loader}>
  <div className={styles.face}>
    <div className={styles.circle}></div>
  </div>
  <div className={styles.face}>
    <div className={styles.circle}></div>
  </div>
</div>
  )
}

export default OverLayLoading