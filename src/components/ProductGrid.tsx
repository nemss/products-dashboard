import React, {useMemo} from 'react';

import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import {ColDef} from 'ag-grid-community';

import {Box} from '@mui/material';

import {IProduct} from '../interfaces/product';

import ActionButtons from './ActionButtons';

interface ProductGridProps {
    products: IProduct[];
    onDelete: (id: number) => void;
    onEdit: (product: IProduct) => void;
    permissions: string[];
}

const ProductGrid: React.FC<ProductGridProps> = ({products, permissions}) => {
    const columnDefs: ColDef[] = useMemo(() => [
        {headerName: 'Name', field: 'name', filter: true},
        {headerName: 'Price', field: 'price', filter: true},
        {headerName: 'Currency', field: 'currency', filter: true},
        {
            headerName: 'Actions', field: 'actions',
            cellRenderer: ActionButtons,
            cellRendererParams: {
                onEdit: console.log,
                onDelete: console.log,
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
                    suppressCellFocus={true}
                />
            </div>
        </Box>
    );
};

export default ProductGrid;