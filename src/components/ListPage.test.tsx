import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ListPage from "./ListPage";
import { WidgetCollection } from "../model/widget";

// Stub implementation of getWidgetsAsync
const stubGetWidgetsAsync = async (): Promise<WidgetCollection> => {
  return {
    items: [
      { id: "1", name: "Test Widget 1", cost: 10, weight: 5 },
      { id: "2", name: "Test Widget 2", cost: 20, weight: 10 },
      { id: "3", name: "Test Widget 3", cost: 30, weight: 15 },
    ],
  };
};

test("renders list of widgets using stub", async () => {
  render(
    <BrowserRouter>
      <ListPage getWidgetsAsync={stubGetWidgetsAsync} />
    </BrowserRouter>
  );

  // Initially shows loading state
  expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

  // Wait for widgets to load
  await waitFor(() => {
    expect(screen.getByText(/Test Widget 1/i)).toBeInTheDocument();
  });

  // Verify all widgets are rendered
  expect(screen.getByText(/Test Widget 1/i)).toBeInTheDocument();
  expect(screen.getByText(/Test Widget 2/i)).toBeInTheDocument();
  expect(screen.getByText(/Test Widget 3/i)).toBeInTheDocument();
});

test("handles error from stub gracefully", async () => {
  const errorStub = async (): Promise<WidgetCollection> => {
    throw new Error("Network error");
  };

  render(
    <BrowserRouter>
      <ListPage getWidgetsAsync={errorStub} />
    </BrowserRouter>
  );

  // Should show the Create Widget link even on error (returns empty list)
  await waitFor(() => {
    expect(screen.getByText(/Create Widget/i)).toBeInTheDocument();
  });
});
