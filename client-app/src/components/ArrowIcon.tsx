import * as React from 'react';
import Icon from '@mui/material/Icon';

interface IconProps {
    isUp: boolean;
}

const getArrowClassName = (isUp:boolean):string =>{
    return isUp ? 'fa-caret-up' : 'fa-caret-down'
}

const ArrowIcon: React.FC<IconProps> = ({ isUp }) => {
    return (
        <Icon baseClassName="fas" className={getArrowClassName(isUp)} />
    );
};

export default ArrowIcon
