import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import ExcelImporter from "../../../../src/pages/InvoicesPage/ExcelImporter/ExcelImporter";
import { jest } from '@jest/globals';
//@ts-ignore
import React from 'react';
// Mock the XLSX library
test('should call importInvoices when a file is selected', async () => {
    // Mock the importInvoices function
    const importInvoicesMock = jest.fn();

    // Render the component with the mock function as a prop
    render(<ExcelImporter importInvoices={importInvoicesMock} />);

    // Get the file input element by its test id or label
    const input = screen.getByPlaceholderText('Uvoz računov');  // You can also use screen.getByTestId if you set a test ID

    // Create a mock file
    const file = new File(['invoice'], 'invoice.xlsx', { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    // Trigger the file input's onChange event
    fireEvent.change(input, { target: { files: [file] } });

    // Wait for the importInvoices function to be called
    await waitFor(() => expect(importInvoicesMock).toHaveBeenCalledTimes(1));
});
