import {render, waitFor, screen, cleanup} from "@testing-library/react";
import { describe, it, expect, afterEach} from "vitest";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "../components/Navbar.tsx";

afterEach(cleanup);

describe('Should redirect correctly', () => {
    it('Should render Navbar Component', () => {
        render(
            <Router>
                <Navbar isVisible={isVisible} toggleNavbar={toggleNavbar} />
            </Router>
        )
    })
})