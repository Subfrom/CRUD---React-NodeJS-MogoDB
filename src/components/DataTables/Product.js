import React, { useEffect, useRef } from 'react';
import $ from 'jquery';
import 'datatables.net-bs5';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { GetData, Delete } from '../../functions/product';
import { toast } from 'react-toastify';

const Product = () => {
    const tableRef = useRef(null);

    const handleDelete = async (id) => {
        try {
            const response = await Delete(id);
            toast.success(response.data.name + ' is deleted', { position: "top-left" });
            // Refresh the table data after deleting an item
            $(tableRef.current).DataTable().ajax.reload();
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const table = $(tableRef.current).DataTable({
            responsive: true,
            serverSide: true,
            ajax: async (data, callback, settings) => {
                const response = await GetData(data.start, data.length, data.search.value, data.order);
                callback({
                    draw: data.draw,
                    recordsTotal: response.data.recordsTotal,
                    recordsFiltered: response.data.recordsFiltered,
                    data: response.data.data
                });
            },
            columns: [
                {
                    data: null,
                    title: 'ID',
                    render: (data, type, row, meta) => {
                        const pageInfo = $(tableRef.current).DataTable().page.info();
                        return pageInfo.start + meta.row + 1;
                    },
                    width: '5%'
                },
                { data: 'image', title: 'Image', orderable: false, searchable: false , render: (data) => `<img src="${data}" alt="product" width="100" height="100">`},
                { data: 'name', title: 'Name', width: '20%'},
                { data: 'detail', title: 'Detail', width: '30%'},
                { data: 'price', title: 'Price' , width: '10%'},
                {
                    data: null,
                    title: 'Option',
                    render: (data, type, row) => {
                        return `
                            <button class="btn btn-warning" data-id="${row._id}" style="color: #fff">
                                <i class="bi bi-pencil-fill"></i>
                                Edit
                            </button>
                            <button class="btn btn-danger" data-id="${row._id}">
                                <i class="bi bi-trash-fill"></i>
                                Delete
                            </button>
                        `;
                    }
                }
            ]
        });

        // Attach the handleDelete function to each delete button after the table is drawn
        table.on('draw', () => {
            $('.btn-danger').off('click').on('click', function() {
                const id = $(this).data('id');
                handleDelete(id);
            });

            $('.btn-warning').off('click').on('click', function() {
                const id = $(this).data('id');
                return window.location.href = '/edit/' + id;
            });

        });

        return () => table.destroy();
    }, []);

    return (
        <table ref={tableRef} id="table" className="table table-striped table-bordered table-hover"></table>
    );
};

export default Product;