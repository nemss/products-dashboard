import React, {useMemo} from 'react';

import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import {ColDef} from 'ag-grid-community';

import {Box} from '@mui/material';

import {IProduct} from '../../interfaces/product.ts';

import GridActionButtons from './GridActionButtons.tsx';

interface ProductGridProps {
    products: IProduct[];
    onDelete: (product: IProduct) => void;
    onEdit: (product: IProduct) => void;
    permissions: string[];
}

const ProductGrid: React.FC<ProductGridProps> = ({products, permissions, onDelete, onEdit}) => {
    const columnDefs: ColDef[] = useMemo(() => [
        {headerName: 'Name', field: 'name', filter: true},
        {headerName: 'Price', field: 'price', filter: true},
        {headerName: 'Currency', field: 'currency', filter: true},
        {
            headerName: 'Actions', field: 'actions',
            cellRenderer: GridActionButtons,
            cellRendererParams: {
                onEdit,
                onDelete,
                permissions
            },
            filter: true
        }
    ], [permissions]);

    return (
        <Box>
            <div className="ag-theme-alpine" style={{height: '33rem', width: '100%'}}>
                <AgGridReact
                    rowData={products}
                    columnDefs={columnDefs}
                    pagination={true}
                    paginationPageSize={10}
                    paginationPageSizeSelector={[5, 10, 20, 30]}
                    animateRows
                    domLayout="autoHeight"
                    suppressCellFocus={true}
                />
            </div>
        </Box>
    );
};

export default ProductGrid;