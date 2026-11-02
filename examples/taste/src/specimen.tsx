import { Container, LinkButton } from "@astrafoundry/design/ui";
import sunbeam from "@astrafoundry/design/tokens/sunbeam.json";

const accent = sunbeam.scales["yellow-500"];

/**
 * A taste specimen. Copy is passed in; the accent is the shared Sunbeam token.
 * Add further examples under examples/, each importing @astrafoundry/design.
 */
export function TasteSpecimen({
  title,
  action,
  href,
}: {
  title: string;
  action: string;
  href: string;
}) {
  return (
    <Container className="bg-background text-foreground">
      <p className="font-display" style={{ color: accent }}>
        {title}
      </p>
      <LinkButton href={href}>{action}</LinkButton>
    </Container>
  );
}
