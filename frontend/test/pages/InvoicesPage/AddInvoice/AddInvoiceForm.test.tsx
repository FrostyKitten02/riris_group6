// AddInvoiceForm.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // for extended DOM matchers
jest.mock('../../../utils/RequestUtil', () => ({
    getBaseApiUrl: () => 'http://mocked-base-url',
    getDefaultRequestConfig: jest.fn().mockResolvedValue({ headers: { Authorization: 'Bearer mocked-token' } }),
}));
import AddInvoiceForm from '../../../../src/pages/InvoicesPage/AddInvoice/AddInvoiceForm';

describe('AddInvoiceForm Component', () => {
    beforeEach(() => {
        // Clear all mocks before each test
        jest.clearAllMocks();
    });

    it('renders all form fields', () => {
        render(<AddInvoiceForm />);

        // Check presence of input fields by label text
        expect(screen.getByLabelText('Uporabnik')).toBeInTheDocument();
        expect(screen.getByLabelText('Naziv')).toBeInTheDocument();
        expect(screen.getByLabelText('Znesek')).toBeInTheDocument();
        expect(screen.getByLabelText('Datum plačila')).toBeInTheDocument();
        expect(screen.getByLabelText('Rok plačila')).toBeInTheDocument();
        expect(screen.getByLabelText('Plačnik')).toBeInTheDocument();
        expect(screen.getByLabelText('Poslano?')).toBeInTheDocument();
        expect(screen.getByLabelText('Plačano?')).toBeInTheDocument();

        // Check the submit button
        expect(screen.getByRole('button', { name: /Dodaj račun/i })).toBeInTheDocument();
    });
});
