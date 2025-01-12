import {fireEvent, render, screen, waitFor} from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect';
import React from "react";
import PageSelectModal from "../../../../src/pages/InvoicesPage/Table/PageSelectModal";

// Mock the setPage and onCloseModal functions
const mockSetPage = jest.fn();
const mockOnCloseModal = jest.fn();

it('should call setPage and onCloseModal when Go To Page is clicked', async () => {
    render(
        <PageSelectModal
            showModal={true}
            setPage={mockSetPage}
            onCloseModal={mockOnCloseModal}
        />
    );

    const input = screen.getByPlaceholderText("1");
    fireEvent.change(input, {target: {value: '3'}});

    const button = screen.getByText("Go To Page");
    fireEvent.click(button);

    // Check if setPage was called with the correct argument
    await waitFor(() => {
        expect(mockSetPage).toHaveBeenCalledWith(3);
    });

    // Check if onCloseModal was called
    expect(mockOnCloseModal).toHaveBeenCalled();
});

it('should call onCloseModal when Close button is clicked', async () => {
    render(
        <PageSelectModal
            showModal={true}
            setPage={mockSetPage}
            onCloseModal={mockOnCloseModal}
        />
    );

    const button = screen.getByText("Close");
    fireEvent.click(button);

    // Check if onCloseModal was called
    expect(mockOnCloseModal).toHaveBeenCalled();
});

it('should not show modal when showModal is false', () => {
    render(
        <PageSelectModal
            showModal={false}
            setPage={mockSetPage}
            onCloseModal={mockOnCloseModal}
        />
    );

    // Ensure modal is not rendered
    expect(screen.queryByText("Izberite stran")).toBeNull();
});