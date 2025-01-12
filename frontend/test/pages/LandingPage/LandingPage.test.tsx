import React from "react";
import { render, screen } from "@testing-library/react";
import LandingPage from "../../../src/pages/LandingPage/LandingPage";
import '@testing-library/jest-dom';
describe("LandingPage", () => {
    it("renders the landing page with heading", () => {
        render(<LandingPage />);

        // Assert the heading is displayed
        const heading = screen.getByText("Invoice Manager");
        expect(heading).toBeInTheDocument();
    });

    it("renders the FontAwesome icon with the correct icon type", () => {
        render(<LandingPage />);

        // Get the landing container and check if it contains the SVG element
        const landingContainer = screen.getByTestId("landing-container");
        const icon = landingContainer.querySelector("svg");

        // Assert that the icon has the correct data-icon attribute (faCoins)
        expect(icon).toHaveAttribute("data-icon", "coins");
    });

    it("renders the FontAwesome icon with the correct viewBox", () => {
        render(<LandingPage />);

        // Check if the SVG icon has the correct 'viewBox' attribute
        const icon = screen.getByTestId("landing-container").querySelector("svg");
        expect(icon).toHaveAttribute("viewBox", "0 0 512 512");
    });

    it("renders the FontAwesome icon with the correct CSS class", () => {
        render(<LandingPage />);

        // Check if the SVG icon has the correct CSS class for styling
        const icon = screen.getByTestId("landing-container").querySelector("svg");
        expect(icon).toHaveClass("fa-coins");
    });

    it("renders the FontAwesome icon with the correct icon type", () => {
        render(<LandingPage />);

        // Get the landing container and check if it contains the SVG element
        const landingContainer = screen.getByTestId("landing-container");
        const icon = landingContainer.querySelector("svg");

        // Assert that the icon has the correct data-icon attribute (faCoins)
        expect(icon).toHaveAttribute("data-icon", "coins");
    });
});
