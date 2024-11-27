import React, {useEffect} from 'react';
import {Controller, useForm} from 'react-hook-form';
import * as Yup from 'yup';
import {Box, Button, Modal, TextField, Typography,} from '@mui/material';
import {IProduct} from '../interfaces/product';
import {yupResolver} from "@hookform/resolvers/yup";
import {BUTTON_TEXTS} from "../constants/buttonText.ts";
import {modalStyle} from "../styles/modalStyles.ts";

interface CreateEditProductModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (product: Omit<IProduct, 'id'>) => void;
    initialValues?: Omit<IProduct, 'id'>;
}

const validationSchema = Yup.object().shape({
    name: Yup.string()
        .required('Product name is required')
        .min(2, 'Name must be at least 2 characters'),
    price: Yup.number()
        .required('Price is required')
        .positive('Price must be a positive number')
        .typeError('Price must be a valid number'),
    currency: Yup.string()
        .required('Currency is required')
        .matches(/^[A-Z]{3}$/, 'Currency must be a valid 3-letter code (e.g., USD)'),
});

const CreateEditProductModal: React.FC<CreateEditProductModalProps> = (
    {
        open,
        onClose,
        onSubmit,
        initialValues = {
            name: '',
            price: 0,
            currency: ''
        },
    }) => {

    const {
        control,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm<Omit<IProduct, 'id'>>({
        defaultValues: initialValues,
        resolver: yupResolver(validationSchema),
    });

    useEffect(() => {
        if (initialValues && open) {
            reset(initialValues);
        }
    }, [initialValues]);

    const handleClose = () => {
        onClose();
    };

    const submitHandler = (data: Omit<IProduct, 'id'>) => {
        onSubmit(data);
        handleClose();
    };

    return (
        <Modal open={open} onClose={handleClose} aria-labelledby="create-edit-product-modal">
            <Box sx={modalStyle}>
                <Typography variant="h6" component="h2" mb={2}>
                    {initialValues.name ? 'Edit Product' : 'Create Product'}
                </Typography>
                <form onSubmit={handleSubmit(submitHandler)}>
                    <Controller
                        name="name"
                        control={control}
                        render={({field}) => (
                            <TextField
                                {...field}
                                label="Product Name"
                                variant="outlined"
                                fullWidth
                                error={!!errors.name}
                                helperText={errors.name?.message}
                                margin="normal"
                            />
                        )}
                    />
                    <Controller
                        name="price"
                        control={control}
                        render={({field}) => (
                            <TextField
                                {...field}
                                label="Price"
                                type="number"
                                variant="outlined"
                                fullWidth
                                error={!!errors.price}
                                helperText={errors.price?.message}
                                margin="normal"
                            />
                        )}
                    />
                    <Controller
                        name="currency"
                        control={control}
                        render={({field}) => (
                            <TextField
                                {...field}
                                label="Currency"
                                variant="outlined"
                                fullWidth
                                error={!!errors.currency}
                                helperText={errors.currency?.message}
                                margin="normal"
                            />
                        )}
                    />
                    <Box display="flex" justifyContent="flex-end" mt={2} gap={2}>
                        <Button variant="outlined" onClick={handleClose}>
                            {BUTTON_TEXTS.CANCEL}
                        </Button>
                        <Button variant="contained" type="submit">
                            {initialValues.name ? BUTTON_TEXTS.SAVE_CHANGES : BUTTON_TEXTS.CREATE}
                        </Button>
                    </Box>
                </form>
            </Box>
        </Modal>
    );
};

export default CreateEditProductModal;