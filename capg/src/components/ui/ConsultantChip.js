import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';


export default function ConsultantChip({ name }) {
    return (
        <Chip
            avatar={<Avatar>{name[0]}</Avatar>}
            label={name}
            size='small'
            variant="outlined"
        />
    )
}