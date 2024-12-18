import React, {useEffect} from 'react';

import {Controller, useForm} from 'react-hook-form';
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';

import {Box, Modal, TextField, Typography} from '@mui/material';

import {IProduct, ProductInput} from '../../interfaces/product.ts';
import {modalStyle} from '../../styles/modalStyles.ts';
import {generateAriaAttributes} from '../../utils/generateAriaAttributes.ts';

import ActionButtons from '../common/ActionButtons.tsx';
import {BUTTON_TEXTS} from '../../constants/button.ts';

interface CreateEditProductModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (product: ProductInput) => void;
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

const CreateEditProductModal:
    React.FC<CreateEditProductModalProps> = (
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
        if (open && initialValues) {
            reset(initialValues);
        }
    }, [open, reset]);

    const handleClose = () => {
        onClose();
    };

    const submitHandler = (data: ProductInput) => {
        onSubmit(data);
        handleClose();
    };

    return (
        <Modal open={open} onClose={handleClose} {...generateAriaAttributes('create-edit-product-modal')}>
            <Box sx={modalStyle}>
                <Typography variant="h6" component="h2" mb={2} data-testid="create-edit-modal-title">
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
                                data-testid="name-field"
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
                                data-testid="price-field"
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
                                data-testid="currency-field"
                            />
                        )}
                    />
                    <ActionButtons
                        onConfirm={handleSubmit(submitHandler)}
                        onCancel={handleClose}
                        confirmText={initialValues.name ? BUTTON_TEXTS.SAVE_CHANGES : BUTTON_TEXTS.CREATE}
                    />
                </form>
            </Box>
        </Modal>
    );
};

export default CreateEditProductModal;