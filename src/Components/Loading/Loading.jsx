import React from 'react';
import loading from './loading.svg';
import styles from './Loading.css'



const Loading = () => {
    return (
        <div className={styles.loader}>
            <img src={loading} alt="loading" />
        </div>
    );

}

export default Loading;
