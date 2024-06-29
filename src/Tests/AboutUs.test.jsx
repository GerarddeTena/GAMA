import {render, waitFor, screen, cleanup} from "@testing-library/react";
import { describe, it, expect, afterEach} from "vitest";
import AboutUs from "../views/AboutUs.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import About_Cards from "../components/Cards/About_Cards.jsx";
import Info_Cards from "../components/Cards/Info_Cards.jsx";

afterEach(cleanup);
describe('About us element render correctly', () => {
    it('Should render AboutUs component', () => {
        render(
            <Router>
                <AboutUs/>
            </Router>
        );
    });

    it('Should render About_Cards component with 4 cards', async () => {
        render(
            <Router>
                <About_Cards />
            </Router>
        );

        const aboutCards = await waitFor(() => screen.findAllByTestId('about-cards'));
        expect(aboutCards.length).toBe(4);
    });
    it('Should render Info_Cards component whit 5 cards', async () => {
        render(
            <Router>
                <Info_Cards/>
            </Router>
        );
        const infoCards = await waitFor(() => screen.findAllByTestId('info-cards'));
        expect(infoCards.length).toBe(5);
    })
});
