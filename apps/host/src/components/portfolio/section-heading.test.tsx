import { render, screen } from "@testing-library/react";
import { SectionHeading } from "@/components/portfolio/section-heading";

describe("SectionHeading", () => {
  it("renders eyebrow and title", () => {
    render(<SectionHeading eyebrow="About" title="My Story" />);

    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "My Story" })).toBeInTheDocument();
  });

  it("renders description when provided", () => {
    render(
      <SectionHeading
        eyebrow="Skills"
        title="Toolbox"
        description="Languages and frameworks I use daily."
      />,
    );

    expect(screen.getByText("Languages and frameworks I use daily.")).toBeInTheDocument();
  });

  it("omits description when not provided", () => {
    render(<SectionHeading eyebrow="Contact" title="Get in touch" />);

    expect(screen.queryByText(/languages/i)).not.toBeInTheDocument();
  });
});
