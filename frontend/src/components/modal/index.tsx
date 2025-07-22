import React, { useState } from 'react';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
} from '@mui/material';

type Props = {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
};

const CustomModal: React.FC<Props> = ({ onClose, onConfirm, open }) => {

    return (
        <>
            <Dialog open={open} onClose={onClose}>
                <DialogTitle>Konfirmasi</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Apakah kamu yakin ingin menghapus item ini?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={onClose}
                        size="large"
                        variant="contained"
                        sx={{
                            width: '16.66%',
                            backgroundColor: '#15803d',
                            marginRight: '10px',
                            textTransform: 'none',
                            '&:hover': {
                                backgroundColor: '#15803d',
                            },
                        }}
                    >
                        Batal
                    </Button>
                    <Button
                        onClick={onConfirm}
                        size="large"
                        variant="contained"
                        sx={{
                            width: '16.66%',
                            backgroundColor: '#ff0505',
                            textTransform: 'none',
                            '&:hover': {
                                backgroundColor: '#ff0505',
                            },
                        }}
                    >
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default CustomModal;
