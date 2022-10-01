import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import Tester from "../test";
import FormValidation from "../FormValidation";

describe("Input element primary validation tests", () => {
  test("Email address should be invalid", async () => {
    render(
      <FormValidation>
        <Tester />
      </FormValidation>
    );
    fireEvent.submit(screen.getByTestId("form"));
    await waitFor(() => screen.getByTestId("errorList").children.item(0));
    expect(screen.getByTestId("errorList").children.item(0)).toHaveTextContent(
      "invalid email address"
    );
  });

  test("2 error list items should appear which one has custom msg", async () => {
    render(
      <FormValidation>
        <Tester />
      </FormValidation>
    );
    fireEvent.change(screen.getByTestId("tester"), {
      target: {
        value: "123",
      },
    });
    fireEvent.submit(screen.getByTestId("form"));
    await waitFor(() => screen.getByTestId("errorList").children.item(1));
    expect(screen.getByTestId("errorList").children.item(1)).toHaveTextContent(
      "bro this value must contain letters!"
    );
  });
});
