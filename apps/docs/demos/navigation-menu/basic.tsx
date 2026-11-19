"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "@astrafoundry/design/ui";

const products = [
  ["Lyra", "Writes with you, in your voice."],
  ["Arion", "Runs your agents on your own machines."],
  ["Telo", "Keeps the team's knowledge in one place."],
];

export default function NavigationMenuBasic() {
  return (
    <NavigationMenu aria-label="Main">
      <NavigationMenuItem>
        <NavigationMenuTrigger>Products</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="grid w-[26rem] grid-cols-1 gap-0.5">
            {products.map(([name, text]) => (
              <li key={name}>
                <NavigationMenuLink href={`#${name}`}>
                  <span className="block font-medium">{name}</span>
                  <span className="block text-muted-foreground">{text}</span>
                </NavigationMenuLink>
              </li>
            ))}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuTrigger>Company</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="w-56">
            {["About", "Design", "Careers"].map((item) => (
              <li key={item}>
                <NavigationMenuLink href={`#${item}`}>{item}</NavigationMenuLink>
              </li>
            ))}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    </NavigationMenu>
  );
}
