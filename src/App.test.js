import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

jest.mock("redux-persist/integration/react", () => ({
  PersistGate: ({ children }) => children,
}));

test("renders fallback UI", async () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  // adjust text or use testid depending on your CustomFallbackUi
  expect(await screen.findByText(/loading/i)).toBeInTheDocument();
});
