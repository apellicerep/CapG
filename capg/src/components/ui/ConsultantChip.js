import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';


/**
 * Chip comoponent that represents a consultant
 */
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