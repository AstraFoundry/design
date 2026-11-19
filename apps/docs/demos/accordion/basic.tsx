"use client";

import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from "@astrafoundry/design/ui";

const faq = [
  ["Can I use Sunbeam outside AstraFoundry?", "Yes. It is MIT licensed."],
  [
    "Does it work without Tailwind?",
    "The tokens are plain CSS variables; the components need Tailwind v4.",
  ],
  ["Is there a native version?", "The MyGo package draws the same components in Go."],
];

export default function AccordionBasic() {
  return (
    <Accordion className="max-w-md" defaultValue={[faq[0]![0]]}>
      {faq.map(([q, a]) => (
        <AccordionItem key={q} value={q}>
          <AccordionTrigger>{q}</AccordionTrigger>
          <AccordionPanel>{a}</AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
