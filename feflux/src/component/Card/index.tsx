import { Card as BaseCard } from 'antd';
import { ReactNode } from 'react';

interface Props {
    title?: string;
    children: ReactNode;
}

const Card  = ({ title, children} : Props) => {

    return (
        <BaseCard className='dark:bg-slate-700 dark:text-slate-400' title={title}>
            {children}
        </BaseCard>
    )
}

export default Card